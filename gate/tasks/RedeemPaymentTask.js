var async = require('async');
var moment = require('moment');
var path = require('path');
var util = require('util');
var myUtil = require('../../utils/util.js');

var statModulDir = path.join(__dirname, '../../');
var statorm = require(path.join(statModulDir, 'db/orm'));
var domainDir = path.join(statModulDir, 'db', 'domain');

var ClientLog = statorm.import(domainDir + "/ClientLog");
var PaymentLog = statorm.import(domainDir + "/PaymentLog");
var UserSystem = statorm.import(domainDir + "/UserSystem");

var gameProtocol = require(path.join(__dirname, '../../../../shared/Protocol'));
var gameConfig = require(path.join(__dirname, '../../../../shared/Config'));
var gameProduct = gameConfig.product;

var StatTask = function () {
};

StatTask.statByPage = function (resultCB) {
    var _count = 0;
    var limit = ClientLog.pageLimit();
    var pageNum = 1;

    var where = myUtil.buildDateBetweenStrCondition('operationTime',-1);
    where += util.format(" and protocol in ( %d ,%d )",gameProtocol.REQUEST_REDEEM_PAYMENT,gameProtocol.REQUEST_REDEEM_PAYMENT_FOR_ANDROID);

    ClientLog.count({ where: where }).success(function (c) {
        myUtil.logger.info("ClientLog count >> " + c);
        var totalPages = ClientLog.totalPages(c).length;
        var insertCount = 0;
        async.doWhilst(
            function (callback) {
                var offset = ClientLog.pageOffset(pageNum);
                console.log("offset >>>" +offset);
                var redeemPaymentLogs = [];
                ClientLog.findAll({ where: where, offset: offset, limit: limit}).success(function (clientLogs) {
                    //console.log(JSON.stringify(clientLogs));

                    var fun = function(_clientLog){
                        return function(_callback){
                            var info = JSON.parse(_clientLog['info']);
                            var protocol = _clientLog['protocol'];
                            var userId = 0;
                            var channel = 0;
                            var productId = 0;
                            if( protocol == gameProtocol.REQUEST_REDEEM_PAYMENT ){
                                userId = info['userId'];
                                channel = info['channel'];
                                productId = info['productId'];
                            }else if( protocol == gameProtocol.REQUEST_REDEEM_PAYMENT_FOR_ANDROID ){
                                userId = info['game_user_id'];
                                channel = info['channel_number'];
                                productId = info['product_id'];
                            }

                            //console.log(JSON.stringify(gameProduct));
                            console.log(util.format("userId[%s],channel[%s],productId[%s]",userId,channel,productId))

                            var diamond = 0;
                            var rmb = 0;
                            try{
                                var product = gameProduct[channel][productId];
                                var diamond = product[0];
                                var rmb = product[1];
                            }catch(e){
                                console.log('err');
                            }

                            UserSystem.find({ where: {userId: userId} }).success(function(userSystem) {
                                var nickname = "unknown";
                                if(userSystem && userSystem['nickname']){
                                    nickname = userSystem['nickname'];
                                }
                                redeemPaymentLogs.push({
                                    "userId":info['userId'],
                                    "nickName":nickname,
                                    "channelNum":channel,
                                    "productId":productId,
                                    "diamond":diamond,
                                    "rmb":rmb,
                                    "timeAt":_clientLog['operationTime']
                                });
                                _callback();
                            })
                        }
                    }

                    var fnAsyncs = [];
                    for(i in clientLogs){
                        fnAsyncs.push(fun(clientLogs[i]));
                    }

                    async.parallel(fnAsyncs,
                        function (err, results) {
                            if (err) {
                                callback(err);
                            } else {
                                PaymentLog.bulkCreate(redeemPaymentLogs).success(function() {
                                    pageNum++;
                                    insertCount += redeemPaymentLogs.length;
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

StatTask.runTask = function(completeCB) {
    myUtil.logger.info("RedeemPaymentTask.runTask start at : " + moment().format('YYYY-MM-DD HH:mm:ss'));

    StatTask.statByPage(function () {
        myUtil.logger.info("RedeemPaymentTask.runTask complete at :" + moment().format('YYYY-MM-DD HH:mm:ss'));
        completeCB && completeCB(null);
    });
};

//StatTask.runTask();

module.exports = StatTask;