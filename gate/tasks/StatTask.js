var myUtil = require('../../../GoldMiner/server/util/util');
var statOrm = require('../../db/orm');
var async = require('async');
require('date-utils');

var later = require('later');
require('date-utils');
var DM = require('../service/dm');
var statDB = require('../../db/db');

//require('../../../../../UserSystem/trunk/server/db/orm');
var userSystemModuleDir = '../../../../../UserSystem/trunk/';
var userSystemOrm = require(userSystemModuleDir + 'server/db/orm');
var userSystemDomainDir = userSystemModuleDir + 'server/db/domain/';
var Loginlog = userSystemOrm.import(userSystemDomainDir+"Loginlog"),
    Onlineinfo = userSystemOrm.import(userSystemDomainDir+"Onlineinfo"),
    GameUser = userSystemOrm.import(userSystemDomainDir+"User");

var gameModulDir = '../../../';
var gameOrm = require(gameModulDir + 'server/db/orm');
var gameDomainDir = gameModulDir + 'server/db/domain/';
var Role = gameOrm.import(gameDomainDir+"Role"),
    User = gameOrm.import(gameDomainDir+"User");

var HourArray = [
    '00','01','02','03','04','05','06','07','08','09','10','11',
    '12','13','14','15','16','17','18','19','20','21','22','23'
];

var StatTask = function(){};

/*
 statDate : string类型,格式:"2014-09-24"
* */

StatTask.firstSecPostFix = " 00:00:01";
StatTask.lastSecPostFix = " 23:59:59";

StatTask.firstSecInHourPostFix = ":00:01";
StatTask.lastSecInHourPostFix = ":59:59";

StatTask.buildDateBetweenStrCondition = function(fieldName,statDate){
    var start = statDate + StatTask.firstSecPostFix;
    var end = statDate + StatTask.lastSecPostFix;

    return  '(' + fieldName + ' between \''+start+'\' and \''+end + '\')' ;
}

StatTask.buildDateBetweenLongCondition = function(fieldName,statDate){
    var start = new Date(Date.parse(statDate+StatTask.firstSecPostFix, 'y-M-d H:m:s')).getTime();
    var end = new Date(Date.parse(statDate+StatTask.lastSecPostFix, 'y-M-d H:m:s')).getTime();

    return  '(' + fieldName + ' between \''+start+'\' and \''+end + '\')' ;
}

StatTask.buildHouDateBetweenLongCondition = function(fieldName,statDate){
    var start = new Date(Date.parse(statDate+StatTask.firstSecInHourPostFix, 'y-M-d H:m:s')).getTime();
    var end = new Date(Date.parse(statDate+StatTask.lastSecInHourPostFix, 'y-M-d H:m:s')).getTime();

    return  '(' + fieldName + ' between \''+start+'\' and \''+end + '\')' ;
}

StatTask.statUserRegCount = function(statDate){
    GameUser.count(
        {where:StatTask.buildDateBetweenLongCondition('createTime',statDate)}
    ).success(function(c) {
        console.log('there are ' + c + ' users reged at '+statDate);
    });
}

StatTask.statUserIpCount = function(statDate){
    var query = "select count(*) as ipcount from (";
    query += "select count(referIp) as _count from users where 1=1";
    query += " and " + StatTask.buildDateBetweenLongCondition('createTime',statDate);
    query += " group by referIp) a";

    userSystemOrm.query(query).success(function(result){
        console.log('result >>>'+JSON.stringify(result));
    });
}

StatTask.statOnlineUserCount = function(statDate,resultCb){
    console.log('statOnlineUserCount>>'+statDate);
    var _data = new Date(Date.parse(statDate, 'y-M-d'));
    var fixedStatDate = _data.toFormat('YYYYMMDD');
    var query = "select sum(onlineMaxCount) as onlineCount from onlineinfoes where 1=1 ";
    query += " and (left(dataAt,8) = '"+fixedStatDate+"')";

    userSystemOrm.query(query).success(function(result){
        if(result){
            console.log('result >>>'+JSON.stringify(result));
            resultCb(result);
        }else{
            console.log('result count >>0');
        }
    });
}

StatTask.stateOnlineUserCountByHourDistribution = function(statDate,resultCb){
    console.log('stateOnlineUserCountByHourDistribution>>'+statDate);

    var _data = new Date(Date.parse(statDate, 'y-M-d'));
    var fixedStatDate = _data.toFormat('YYYYMMDD');
    var query = "select onlineMaxCount as onlineCount from onlineinfoes where 1=1 ";

    var result = {};
    async.eachSeries(HourArray,function(hour,callback){
        var _fixedStatDate = fixedStatDate + hour;
        var _query = query + " and dataAt = '"+_fixedStatDate+"'";

        userSystemOrm.query(_query).success(function(_result){
            if(_result){
                if(_result.length>0){
                    result[hour] = _result[0].onlineCount;
                }else{
                    result[hour] = 0;
                }
//              console.log('result >>>'+JSON.stringify(_result));
            }else{
                result[hour] = 0;
            }
            callback();
        });
    },function(e){
        if(e){
            console.error(e.toString());
        }else{
            console.log("result >>>" + JSON.stringify(result));
            resultCb(result);
        }
    });

    function success(result){
        console.log('success result >>>'+JSON.stringify(result));
    }
}

StatTask.statRegCountByHourDistribution = function(statDate,resultCb){
    var _data = new Date(Date.parse(statDate, 'y-M-d'));
    var result = {};
    async.eachSeries(HourArray,function(hour,callback){
        var fixedStatDate = _data.toFormat('YYYY-MM-DD') + " " + hour;
        var _query = StatTask.buildHouDateBetweenLongCondition('createTime',fixedStatDate);
        GameUser.count({where:_query})
        .success(function(c) {
            console.log('there are ' + c + ' users reged at '+fixedStatDate);
                result[hour] = c;
                callback();
        });
    },function(e){
        if(e){
            console.error(e.toString());
        }else{
            console.log("result >>>" + JSON.stringify(result));
            resultCb(result);
        }
    });
}

StatTask.statUserIpCountByHourDistribution = function(statDate,resultCb){
    var _data = new Date(Date.parse(statDate, 'y-M-d'));
    var result = {};
    async.eachSeries(HourArray,function(hour,callback){
        var fixedStatDate = _data.toFormat('YYYY-MM-DD') + " " + hour;
        var query = "select count(*) as ipcount from (";
        query += "select count(referIp) as _count from users where 1=1";
        query += " and " + StatTask.buildHouDateBetweenLongCondition('createTime',fixedStatDate);
        query += " group by referIp) a";

        console.log(query);
        userSystemOrm.query(query).success(function(_result){
            if(_result){
                if(_result.length>0){
                    result[hour] = _result[0].ipcount;
                }else{
                    result[hour] = 0;
                }
              console.log('result >>>'+JSON.stringify(_result));
            }else{
                result[hour] = 0;
            }
            callback();
        });
    },function(e){
        if(e){
            console.error(e.toString());
        }else{
            console.log("result >>>" + JSON.stringify(result));
            resultCb(result);
        }
    });
}

StatTask.statLoginCountByHourDistribution = function(statDate,resultCb){
    var _data = new Date(Date.parse(statDate, 'y-M-d'));
    var result = {};
    async.eachSeries(HourArray,function(hour,callback){
        var fixedStatDate = _data.toFormat('YYYY-MM-DD') + " " + hour;
        var _query = StatTask.buildHouDateBetweenLongCondition('loginTime',fixedStatDate);
        Loginlog.count({where:_query})
            .success(function(c) {
                console.log('there are ' + c + ' users login at '+fixedStatDate);
                result[hour] = c;
                callback();
            });
    },function(e){
        if(e){
            console.error(e.toString());
        }else{
            console.log("result >>>" + JSON.stringify(result));
            resultCb(result);
        }
    });
}

StatTask.statOnlineDurationByUserId = function(userId,statDate){
    var query = "select avg(logoutTime-loginTime) as onlineDuration from loginlogs";
    query += " where userId = " + userId;
    query += " and " + StatTask.buildDateBetweenLongCondition('loginTime',statDate);

    userSystemOrm.query(query).success(function(result){
        console.log("result >>>" + JSON.stringify(result));
    });
}

StatTask.statOnlineDurationAll = function(statDate,resultCb){
    var query = "select avg(logoutTime-loginTime) as onlineDuration from loginlogs where 1 = 1 ";
    query += " and " + StatTask.buildDateBetweenLongCondition('loginTime',statDate);
    userSystemOrm.query(query).success(function(result){
        console.log("result >>>" + JSON.stringify(result));
        resultCb(result);
    });
}

StatTask.statUserLoginLogByUserId = function(userId){
    var _query = "select FROM_UNIXTIME(loginTime/1000, '%Y-%m-%d %H:%i:%S') as _loginTime from loginlogs where userId = " + userId;
    userSystemOrm.query(_query).success(function(result){
        console.log("result >>>" + JSON.stringify(result));
    });
}

StatTask.statFinalRankOnUserReg = function(userId){
    var now = Date.today();
    Role.find({'where':{'userId':userId}}).success(function(role){
        console.log(role);
    });
}

//StatTask.statUserRegCount("2014-09-26");
//StatTask.statUserIpCount("2014-09-27");
//StatTask.statOnlineUserCount("2014-09-27");
//StatTask.stateOnlineUserCountByHourDistribution("2014-09-27");
//StatTask.statRegCountByHourDistribution("2014-09-27");
//StatTask.statLoginCountByHourDistribution("2014-09-27");
//StatTask.statOnlineDurationAll();
//StatTask.statUserLoginLogByUserId(2);
//StatTask.statFinalRankOnUserReg(1);
//StatTask.statUserIpCountByHourDistribution("2014-09-27");

//////////////////////////////////////////////////////////////////////////////////////////
StatTask.runTask = function(){
    var today = Date.today();
    var _yesterday = Date.yesterday();
    console.log('today :' + today.toFormat('YYYY-MM-DD'));
    console.log('yesterday :' + yesterday);

    var yesterday = _yesterday.toFormat('YYYY-MM-DD');
    var dbYesterday = _yesterday.toFormat('YYYYMMDD');

    async.series([
        function(callback){
            //注册账号统计,精确到到小时
            console.log('注册账号统计,精确到到小时');
            StatTask.statRegCountByHourDistribution(yesterday,function(result){
                console.log('注册账号统计,精确到到小时,result >>>> ' + JSON.stringify(result));
                var succcesCount = 0;
                for( i in result ){
                    (function(_i){
                        var dataAt = dbYesterday + _i ;
                        var regCount = result[_i];
                        console.log('dataAt='+dataAt+',regCount='+regCount);
                        statDB.StatEveryDay.findOrCreate(
                            {'data_at':dataAt},
                            {'data_at':dataAt,'reg_count':regCount}
                        ).success(function(existItem,create){
                                if(!create){
                                    existItem.reg_count = regCount;
                                    existItem.save();
                                }
                                if( ++succcesCount >= 24 ){
                                    callback();
                                }
                            });
                    })(i);
                }
            });
        },function(callback){
            //玩家登陆的数量,精确到到小时
            console.log('玩家登陆的数量,精确到到小时');
            StatTask.statLoginCountByHourDistribution(yesterday,function(result){
                var succcesCount = 0;
                for( i in result ){
                    (function(_i){
                        var dataAt = dbYesterday + _i ;
                        var login_count = result[_i];
                        console.log('dataAt='+dataAt+',login_count='+login_count);
                        statDB.StatEveryDay.findOrCreate(
                            {'data_at':dataAt},
                            {'data_at':dataAt,'login_count':login_count}
                        ).success(function(existItem,create){
                                if(!create){
                                    existItem.login_count = login_count;
                                    existItem.save();
                                }
                                if( ++succcesCount >= 24 ){
                                    callback();
                                }
                            });
                    })(i);
                }
            });
        },function(callback){
            //独立ip,精确到到小时
            console.log('独立ip,精确到到小时');
            StatTask.statUserIpCountByHourDistribution(yesterday,function(result){
                var succcesCount = 0;
                for( i in result ){
                    (function(_i){
                        var dataAt = dbYesterday + _i ;
                        var ip_count = result[_i];
                        console.log('dataAt='+dataAt+',ip_count='+ip_count);
                        statDB.StatEveryDay.findOrCreate(
                            {'data_at':dataAt},
                            {'data_at':dataAt,'ip_count':ip_count}
                        ).success(function(existItem,create){
                                if(!create){
                                    existItem.ip_count = ip_count;
                                    existItem.save();
                                }
                                if( ++succcesCount >= 24 ){
                                    callback();
                                }
                            });
                    })(i);
                }
            });
        },function(callback){
            //在线人数时间段分布
            console.log('在线人数时间段分布');
            StatTask.stateOnlineUserCountByHourDistribution(yesterday,function(result){
                var succcesCount = 0;
                for( i in result ){
                    (function(_i){
                        var dataAt = dbYesterday + _i ;
                        var max_online_count = result[_i];
                        console.log('dataAt='+dataAt+',max_online_count='+max_online_count);
                        statDB.StatEveryDay.findOrCreate(
                            {'data_at':dataAt},
                            {'data_at':dataAt,'max_online_count':max_online_count}
                        ).success(function(existItem,create){
                                if(!create){
                                    existItem.max_online_count = max_online_count;
                                    existItem.save();
                                }
                                if( ++succcesCount >= 24 ){
                                    callback();
                                }
                            });
                    })(i);
                }
            });
        },function(callback){
            //所有玩家平均在线时长
            console.log('所有玩家平均在线时长');
            StatTask.statOnlineDurationAll(yesterday,function(result){
                var dataAt = dbYesterday + '00' ;
                if(result){
                    var avg_online_duration = result[0].onlineDuration ? result[0].onlineDuration : 0;
                    console.log('dataAt='+dataAt+',avg_online_duration='+avg_online_duration);

                    statDB.StatEveryDay.update(
                        {'avg_online_duration':avg_online_duration},
                        {'data_at':dataAt}
                    ).success(function(){
                            callback();
                        });
                }
            });
        }
    ],function(err, results){
        console.log('------------------task complete------------------------'+err);
    });
}

module.exports = StatTask;