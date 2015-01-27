var later = require('later');
require('date-utils');
var async = require('async');
var myUtil = require('../utils/util.js');

var announcementTask = require('./tasks/AnnounceTask');
var statusTask = require('./tasks/StatusTask');
var statClientbehavioursTask = require('./tasks/StatClientbehavioursTask');
var pushMsgTask = require('./tasks/PushMsgTask');
var redeemPaymentTask = require('./tasks/RedeemPaymentTask');
var statBuyStOrCoTask = require('./tasks/StatBuyStOrCoTask');

later.date.localTime();

var sched = later.parse.text('every 5 secs');
later.setInterval(runAnnouncementTask, sched);
later.setInterval(runStatusTask, sched);
later.setInterval(runPushMsgTask, sched);
function runAnnouncementTask(){
    announcementTask.runTask();
}
function runStatusTask(){
    statusTask.runTask();
}
function runPushMsgTask(){
    pushMsgTask.runTask();
}

//////////////////////////////////////////////////////////////////////
var schedStatTask = later.parse.recur().on('04:00:00').time();
//var occurrences = later.schedule(schedStatTask).next(10);
//for(var i = 0; i < 10; i++) {
//    myUtil.logger.info("schedStatTask at:" + occurrences[i]);
//}
later.setInterval(runStatTasks, schedStatTask);
function runStatTasks(){
    async.waterfall([
        function fnStatClientbehavioursTask(callback){
            statClientbehavioursTask.runTask(function(){
                callback(null, 'statClientbehavioursTask Complete---');
            });
        },
        function fnStatRedeemPaymentTask(arg1,callback){
            myUtil.logger.info(arg1);
            redeemPaymentTask.runTask(function(){
                callback(null, 'redeemPaymentTask Complete-----');
            })
        },
        function fnStatBuyStOrCoTask(arg1,callback){
            myUtil.logger.info(arg1);
            statBuyStOrCoTask.runTask(function(){
                callback(null, 'statBuyStOrCoTask Complete----');
            })
        }
    ], function (err, result) {
        myUtil.logger.info(result);
        myUtil.logger.info("All task complete");
    });
}