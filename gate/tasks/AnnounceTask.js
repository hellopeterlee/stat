var async = require('async');
var util = require('util');
require('date-utils');
var myUtil = require('../../utils/util.js');
var request = require('request');
var chatServer = require('../../../../shared/Config.js').chatServer;
var statsOrm = require('../../db/orm');
var Announcement = statsOrm.import('../../db/domain/Announcement');

var AnnouncementTask = function(){};

AnnouncementTask.scanWhetherNeedPushAnnouncement = function(){
    var now = new Date();
    var nowTime = now.toFormat('YYYY-MM-DD HH24:MI:SS');
    var currentDayOfWeek = now.getDay();
    if(currentDayOfWeek == 0){
        currentDayOfWeek = 7;
    }

    var query = util.format("select * from Announcements where nextPushTime < '%s' and isAn = 0 and pushDayOfWeek like '%"+currentDayOfWeek+"%'",nowTime);
    myUtil.logger.info("AnnouncementTask.scanWhetherNeedPushAnnouncement ==>" + query);
    statsOrm.query(query).success(function(result){
        myUtil.logger.info('query result >>>' + JSON.stringify(result));

        for( var announcement in result ){
            result[announcement].nextPushTime = now.getTime() + result[announcement].pushRate * 1000 + 3600 * 8 * 1000;
            for( var port in chatServer){
                if(chatServer[port].port != 9000){
                    myUtil.logger.info('发送推送:http://' + chatServer[port].local_ip + ":" + chatServer[port].localPort + "?protocol=0x10000004&json=" + result[announcement].anContent);
                    request('http://' + chatServer[port].local_ip + ":" + chatServer[port].localPort + "?protocol=0x10000004&json=" + result[announcement].anContent, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            Announcement.update(result[announcement], {'id':result[announcement].id}).success(function(results){
                                myUtil.logger.info('push Announcement success');
                            });
                        }
                    })
                }
            }
        }
    });
}

AnnouncementTask.runTask = function(){
    AnnouncementTask.scanWhetherNeedPushAnnouncement();
}


module.exports = AnnouncementTask;