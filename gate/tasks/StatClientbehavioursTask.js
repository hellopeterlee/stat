var async = require('async');
var moment = require('moment');
var path = require('path');
var myUtil = require('../../utils/util.js');

var statModulDir = path.join(__dirname, '../../');
var statorm = require(path.join(statModulDir, 'db/orm'));
var domainDir = path.join(statModulDir, 'db', 'domain');

var ClientLog = statorm.import(domainDir + "/ClientLog");
var Clientbehaviour = statorm.import(domainDir + "/Clientbehaviour");


var StatTask = function () {
};


StatTask.buildDateBetweenStrConditionToday = function (fieldName, statDate) {
    var start = moment().add(-1, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    var end = moment().add(-1, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')

    return  '(' + fieldName + ' between \'' + start + '\' and \'' + end + '\')';
}

//console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
//console.log(moment().add(-1,'days').format('YYYY-MM-DD HH:mm:ss'));
//console.log(moment().add(-1,'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'));

StatTask.groupSessions = function (resultCB) {
    statorm.query(
            "select distinct sessionId from ClientLogs where sessionId is not null and sessionId <>'undefined' and "
            + StatTask.buildDateBetweenStrConditionToday('operationTime')
    ).success(function (result) {
            resultCB(result);
    });
}

StatTask.insertClientbehaviours = function(sessions,resultCB){
    var fnInsertClientbehaviour = function(sessionId){
        return function(callback){
            var clientbehaviours = [];
            var userId = "";
            ClientLog.findAll(
                {
                    where: "sessionId = '" + sessionId + "'"
                }
            ).success(function (clientLogs) {
                async.eachSeries(clientLogs, function (item, next) {
                    if(!userId && item['info']['userId']){
                        userId = item['info']['userId'];
                    }
                    clientbehaviours.push({'protocol':item['protocol'],'timeAt':item['operationTime']});
                    next();
                }, function (err) {
                    if(!err){
                        Clientbehaviour.create({'sessionId':sessionId,'userId':userId,'behaviours':JSON.stringify(clientbehaviours)}).success(function(){
                            callback(null,null);
                        });
                    }
                });
            });
        }
    }

    var fnAsyncs = [];
    for (i in sessions) {
        fnAsyncs.push(fnInsertClientbehaviour(sessions[i]['sessionId']));
    }

    async.parallel(fnAsyncs,
        function (err, results) {
            if (err) {
                resultCB("error",null);
            } else {
                resultCB(null,null);
            }
        }
    );
}

StatTask.runTask = function(completeCB) {
    myUtil.logger.info("StatClientbehavioursTask.runTask start at : " + moment().format('YYYY-MM-DD HH:mm:ss'));
    async.waterfall([
        function (callback) {
            StatTask.groupSessions(function (sessions) {
                callback(null,sessions);
            });
        },
        function (sessions, callback) {
            StatTask.insertClientbehaviours(sessions,function(){
                callback(null,1);
            });
        }
    ], function (err, result) {
        myUtil.logger.info("StatClientbehavioursTask.runTask complete at :" + moment().format('YYYY-MM-DD HH:mm:ss'));
        completeCB && completeCB(null);
    });
};

//StatTask.runTask();
//StatTask.groupSessions(function(sessions){
//    console.log(JSON.stringify(sessions));
//    StatTask.insertClientbehaviours(sessions,function(){
//        console.log('insertClientbehaviours finished');
//    });
//});


module.exports = StatTask;