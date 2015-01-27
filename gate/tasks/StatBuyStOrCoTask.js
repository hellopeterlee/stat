var async = require('async');
var moment = require('moment');
var path = require('path');
var myUtil = require('../../utils/util.js');

var statModulDir = path.join(__dirname, '../../');
var statorm = require(path.join(statModulDir, 'db/orm'));
var domainDir = path.join(statModulDir, 'db', 'domain');

var ClientLog = statorm.import(domainDir + "/ClientLog");
var ByStOrCoLog = statorm.import(domainDir + "/ByStOrCoLog");
var UserSystem = statorm.import(domainDir + "/UserSystem");

var gameProtocol = require(path.join(__dirname, '../../../../shared/Protocol'));

var StatTask = function () {
};

StatTask.statByPage = function (resultCB) {
    console.log("--------StatTask.statByPage---------");
    var _count = 0;
    var limit = ClientLog.pageLimit();
    var pageNum = 1;

    var where = myUtil.buildDateBetweenStrCondition('operationTime',-1);
    where += " and protocol = " + gameProtocol.REQUEST_BUY_ST_OR_CO;

    ClientLog.count({ where: where }).success(function (c) {
        myUtil.logger.info("ClientLog count >> " + c);
        var totalPages = ClientLog.totalPages(c).length;
        myUtil.logger.info("ClientLog totalPages >> " + totalPages);
        var insertCount = 0;
        async.doWhilst(
            function (callback) {
                var offset = ClientLog.pageOffset(pageNum);
                console.log("offset >>>" +offset);
                var buyStOrCoLogs = [];
                ClientLog.findAll({ where: where, offset: offset, limit: limit}).success(function (clientLogs) {
                    //console.log(JSON.stringify(clientLogs));

                    var fun = function(_clientLog){
                        return function(_callback){
                            try{
                                var info = JSON.parse(_clientLog['info']);
                                var userId = info['userId'];

                                UserSystem.find({ where: {userId: userId} }).success(function(userSystem) {
                                    var nickname = "unknown";
                                    if(userSystem && userSystem['nickname']){
                                        nickname = userSystem['nickname'];
                                    }
                                    buyStOrCoLogs.push({
                                        "userId":info['userId'],
                                        "nickName":nickname,
                                        "type":info['type'],
                                        "diamond":info['diamond'],
                                        "timeAt":_clientLog['operationTime']
                                    });
                                    console.log("buyStOrCoLogs size >>>" + buyStOrCoLogs.length);
                                    _callback(null,null);
                                })
                            }catch(e){
                                _callback(null,null);
                            }
                        }
                    }

                    var fnAsyncs = [];
                    for(i in clientLogs){
                        console.log("clientLog >>>" + JSON.stringify(clientLogs[i]));
                        fnAsyncs.push(fun(clientLogs[i]));
                    }

                    async.parallel(fnAsyncs,
                        function (err, results) {
                            if (err) {
                                callback(err);
                            } else {
                                ByStOrCoLog.bulkCreate(buyStOrCoLogs).success(function() {
                                    pageNum++;
                                    insertCount += buyStOrCoLogs.length;
                                    callback(null);
                                })
                            }
                        }
                    );
                });
            },
            function () {
                return insertCount < c;
            },
            function (err) {
                resultCB(err);
            }
        );
    })
}

StatTask.runTask = function (completeCB) {
    myUtil.logger.info("StatRechargeTask.runTask start at : " + moment().format('YYYY-MM-DD HH:mm:ss'));

    StatTask.statByPage(function () {
        myUtil.logger.info("StatRechargeTask.runTask complete at :" + moment().format('YYYY-MM-DD HH:mm:ss'));
        completeCB && completeCB(null);
    });
};

//StatTask.runTask();

module.exports = StatTask;