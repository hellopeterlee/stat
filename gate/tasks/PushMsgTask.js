var async = require('async');
var util = require('util');
require('date-utils');
var myUtil = require('../../utils/util.js');
var request = require('request');
var chatServer = require('../../../../shared/Config.js').chatServer;
var statsOrm = require('../../db/orm');
var PushMsg = statsOrm.import('../../db/domain/PushMsg');
var gameProtocol = require('../../../../shared/Protocol');

var PushMsgTask = function(){};

PushMsgTask.scanWhetherNeedPush = function(){
    var now = new Date();
    var nowTime = now.toFormat('YYYY-MM-DD HH24:MI:SS');
    var currentDayOfWeek = now.getDay();
    if(currentDayOfWeek == 0){
        currentDayOfWeek = 7;
    }

    var query = util.format("select * from PushMsgs where nextPushTime < '%s' and pushFlag = 1 and pushDayOfWeek like '%"+ currentDayOfWeek +"%' order by rand() limit 1 ",nowTime);
    myUtil.logger.info("PushMsgTask.scanWhetherNeedPush ==>" + query);
    statsOrm.query(query).success(function(result){
        myUtil.logger.info('query result >>>' + JSON.stringify(result));
        //return;
        for( var i in result ){
            result[i].nextPushTime = now.getTime() + result[i].pushRate * 1000 + 3600 * 8 * 1000;
            for( var port in chatServer){
                if(chatServer[port].port != 9000){
                    var json = {"msg":result[i].msg,"nickname":result[i].nickname,"level":result[i].level,"icon":result[i].icon};
                    var req = util.format("http://%s:%d?protocol=%d&json=%s",chatServer[port].local_ip,chatServer[port].localPort,gameProtocol.REQUEST_CHAT,JSON.stringify(json));
                    myUtil.logger.info('发送随机推送:' + req);
                    request(req, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            PushMsg.update(result[i], {'id':result[i].id}).success(function(results){
                                myUtil.logger.info('push PushMsgTask success');
                            });
                        }
                    })
                }
            }
        }
    });
}

PushMsgTask.runTask = function(){
    PushMsgTask.scanWhetherNeedPush();
}

//PushMsgTask.runTask();

module.exports = PushMsgTask;