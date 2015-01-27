var util = require('util');
require('date-utils');
var myUtil = require('../../utils/util.js');
var request = require('request');
var comPort = require('../../../../shared/Config').comPort;
var statsOrm = require('../../db/orm');
var Announcement = statsOrm.import('../../db/domain/Announcement');
var myNetwork = require('../../../common/network');
var async = require('async');
var StatusSendTask = function(){};
var nodemailer = require('nodemailer');

var noResponseRecord = {};
for(var i = 0; i < comPort.length; i++){
    var noIp = comPort[i].ip + ":" + comPort[i].port;
    noResponseRecord[noIp] = comPort[i];
    noResponseRecord[noIp].noResponseCount = 0;
    noResponseRecord[noIp].lock = 0;
}

StatusSendTask.runStatusTask = function(){
    var msg = {};
    msg.protocol = 26;
    msg.json = {};
    var status = [];
    async.eachSeries(comPort,
        function(port,next){
            myNetwork.httpGet(port.ip, port.port, msg, function(result) {
                if (result) {
                    noResponseRecord[port.ip+":"+port.port].lock = 0;
                    status.push(result.info);
                    next();
                }
                else {
                    if(noResponseRecord[port.ip+":"+port.port].noResponseCount + 1 >= 2 && noResponseRecord[port.ip+":"+port.port].lock === 0){

                        statsOrm.query("select * from Emails").success(function (results) {
                            var emails = "";
                            for(var i = 0; i < results.length; i++){
                                emails += (results[i].email + ',');
                            }
                            var transporter = nodemailer.createTransport({
                                host: "smtp.qq.com",
                                secureConnection: true, // use SSL
                                port: 25, // port for secure SMTP
                                auth: {
                                    user: '1831088458@qq.com',
                                    pass: 'ilovexuanlan1'
                                }
                            });
                            transporter.sendMail({
                                from: '1831088458@qq.com',
                                to: emails,
                                subject: '游戏服务器',
                                text: port.name + "  " + port.ip + ":" + port.port
                            });
                            noResponseRecord[port.ip+":"+port.port].noResponseCount = 0;
                            noResponseRecord[port.ip+":"+port.port].lock = 1;
                        })
                    }
                    else{
                        noResponseRecord[port.ip+":"+port.port].noResponseCount += 1;

                    };
                    status.push(-2);
                    next();
                }
            })
        },
        function(e){
            if(e){
                myUtil.logger.info('game server response failed');
                return status;
            }else{
                myUtil.logger.info('all game server response success');
                return status;
            }
        }
    )
}

StatusSendTask.runTask = function(){
    StatusSendTask.runStatusTask();
}


module.exports = StatusSendTask;