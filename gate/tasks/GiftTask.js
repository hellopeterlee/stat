var async = require('async');
var util = require('util');
require('date-utils');
var request = require('request');
var comPort = require('../../../../shared/Config.js').comPort;
var statsOrm = require('../../db/orm');
var later = require('later');
var myUtil = require('../../utils/util.js');
//var giftTimeTask = require('../main').giftTimeTask;

var GiftTask = function () {
};

GiftTask.scanWhetherNeedPushGift = function (id) {
    statsOrm.query("select * from Gifts where id = " + id).success(function (result) {
        for (var gift in result) {
            for (var port in comPort) {
                result[gift].goods = JSON.parse(result[gift].goods);
                delete result[gift].sended;
                myUtil.logger.info('http://' + comPort[port].local_ip + ":" + comPort[port].localPort + "?protocol=27&json=" + JSON.stringify(result[gift]));
                request('http://' + comPort[port].local_ip + ":" + comPort[port].localPort + "?protocol=27&json=" + JSON.stringify(result[gift]), function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        myUtil.logger.info('Push gift = [' + JSON.stringify(result[gift]) + ']' + ' success');
                    }
                    else {
                        myUtil.logger.info('Push gift = [' + JSON.stringify(result[gift]) + ']' + ' failed !');
                    }
                })
            }
        }
    });
}

GiftTask.runTask = function (id) {
    GiftTask.scanWhetherNeedPushGift(id);
}


module.exports = GiftTask;