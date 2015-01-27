var config = require('../config/db.json')['dev'];
var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var orm = new Sequelize(config.database, config.username, config.password, config);

var domainDir = path.normalize(__dirname + "/.." + '/domain/');

console.log(domainDir);

var statEveryDay = path.basename("StatEveryDay", '.js');
orm.import(domainDir + statEveryDay);
var StatEveryDay = orm.model(statEveryDay);

var operation = path.basename("Operation", '.js');
orm.import(domainDir + operation);
var Operation = orm.model(operation);


var announcement = path.basename("Announcement", '.js');
orm.import(domainDir + announcement);
var Announcement = orm.model(announcement);

var gift = path.basename("Gift", '.js');
orm.import(domainDir + gift);
var Gift = orm.model(gift);

var notice = path.basename("Notice", '.js');
orm.import(domainDir + notice);
var Notice = orm.model(notice);

var adminUser = path.basename("AdminUser", '.js');
orm.import(domainDir + adminUser);
var AdminUser = orm.model(adminUser);


var loginLog = path.basename("LoginLog", '.js');
orm.import(domainDir + loginLog);
var LoginLog = orm.model(loginLog);

var userSystem = path.basename("UserSystem", '.js');
orm.import(domainDir + userSystem);
var UserSystem = orm.model(userSystem);


StatEveryDay.sync({force: true}).on("success",function () {
    console.log("StatEveryDay success...");
    StatEveryDay.bulkCreate([
        {'data_at': '2014090111','reg_count':100,'ip_count':290,'login_count':223,'max_online_count':100,'avg_online_duration':100},
        {'data_at': '2014090112','reg_count':100,'ip_count':290,'login_count':223,'max_online_count':100,'avg_online_duration':100},
        {'data_at': '2014090213','reg_count':101,'ip_count':190,'login_count':213,'max_online_count':100,'avg_online_duration':100},
        {'data_at': '2014090314','reg_count':102,'ip_count':390,'login_count':112,'max_online_count':100,'avg_online_duration':100}
    ], null, {validate: true}).error(function (errors) {
        console.log("StatEveryDay" + errors);
    }).success(function () {
        console.log("StatEveryDay insert success");
    });
}).on("failure", function () {
    console.log("StatEveryDay fail...");
});

Operation.sync({force: true}).on("success",function () {
    console.log("Operation success...");
    Operation.bulkCreate([
        {userId: 1, roleId: 1, data: '{"product_id":1}', createdAt: '2014-09-29 09:20:00'},
        {userId: 1, roleId: 2, data: '{"product_id":2}', createdAt: '2014-09-29 10:20:00'},
        {userId: 2, roleId: 1, data: '{"product_id":1}', createdAt: '2014-09-29 11:20:00'},
        {userId: 3, roleId: 1, data: '{"product_id":3}', createdAt: '2014-09-29 12:20:00'},
        {userId: 4, roleId: 1, data: '{"product_id":5}', createdAt: '2014-09-29 13:20:00'}
    ], null, {validate: true}).error(function (errors) {
        console.log("Operation" + errors);
    }).success(function () {
        console.log("Operation insert success");
    });
}).on("failure", function () {
    console.log("Operation fail...");
});

Announcement.sync({force: true}).on("success",function () {
    console.log("Announcement success...");
    Announcement.bulkCreate([
        {anContent: "xxx1充钱了", anTime: "2014-10-20 12:00:00", isAn: 1},
        {anContent: "xxx2充钱了", anTime: "2014-10-21 12:00:00", isAn: 1},
        {anContent: "xxx3充钱了", anTime: "2014-10-22 12:00:00", isAn: 1}
    ], null, {validate: true}).error(function (errors) {
            console.log("Announcement" + errors);
        }).success(function () {
            console.log("Announcement insert success");
        });
}).on("failure", function () {
        console.log("Announcement fail...");
});

Gift.sync({force: true}).on("success",function () {
    console.log("Gift success...");
    Gift.bulkCreate([
        {typeId: 1, channelId: 1, giftname: "礼物1", money: 1, diamond: 1, goods: '[{"id":5, "num":1}, {"id":7, "num":3}]', sended: 0},
        {typeId: 2, channelId: 1, giftname: "礼物2", money: 1, diamond: 1, goods: '[{"id":5, "num":1}, {"id":7, "num":3}]', sended: 0},
        {typeId: 3, channelId: 1, giftname: "礼物3", money: 1, diamond: 1, goods: '[{"id":5, "num":1}, {"id":7, "num":3}]', sended: 0}
    ], null, {validate: true}).error(function (errors) {
            console.log("Gift" + errors);
        }).success(function () {
            console.log("Gift insert success");
        });
}).on("failure", function () {
        console.log("Gift fail...");
    });


Notice.sync({force: true}).on("success",function () {
    console.log("Notice success...");
    Notice.bulkCreate([
        {version: '1.0', title: "公告1", content: "内容1"},
        {version: '1.0', title: "公告2", content: "内容2"},
        {version: '1.0', title: "公告3", content: "内容3"}
    ], null, {validate: true}).error(function (errors) {
            console.log("Notice" + errors);
        }).success(function () {
            console.log("Notice insert success");
        });
}).on("failure", function () {
        console.log("Notice fail...");
});

var crypto = require('crypto');
var sha1 = crypto.createHash('md5');
sha1.update('h@p7t^32');
var pass = sha1.digest('hex');

AdminUser.sync({force: true}).on("success",function () {
    console.log("AdminUser insert begin...");
    AdminUser.bulkCreate([
        {username: "admin1", password: pass}
    ], null, {validate: true}).error(function (errors) {
        console.log("AdminUser" + errors);
    }).success(function () {
        console.log("AdminUser insert success");
    });
}).on("failure", function () {
    console.log("AdminUser fail...");
});


LoginLog.sync({force: true}).on("success",function () {
    console.log("LoginLog insert begin...");
    LoginLog.bulkCreate([
        {userId: 1, loginTime: '2014-10-23 09:59:00', operationTime: '2014-10-23 09:59:00'},
        {userId: 2, loginTime: '2014-10-23 10:59:00', operationTime: '2014-10-23 11:59:00'},
        {userId: 3, loginTime: '2014-10-23 11:59:00', operationTime: '2014-10-23 12:59:00'}
    ], null, {validate: true}).error(function (errors) {
            console.log("LoginLog" + errors);
        }).success(function () {
            console.log("LoginLog insert success");
        });
}).on("failure", function () {
        console.log("LoginLog fail...");
    });


UserSystem.sync({force: true}).on("success",function () {
    console.log("UserSystem insert begin...");
    UserSystem.bulkCreate([
        {ip: "192.168.1.9", userId: 1, username: 'root', createTime:'2014-10-23 09:59:00', lastLoginTime:'2014-10-23 09:29:53',money:100,operationTime:'2014-10-23 10:28:53'},
        {ip: "192.168.1.10", userId: 2, username: 'root', createTime:'2014-10-23 10:59:00', lastLoginTime:'2014-10-23 11:29:53',money:100,operationTime:'2014-10-23 11:28:53'},
        {ip: "192.168.1.11", userId: 3, username: 'root', createTime:'2014-10-23 09:59:00', lastLoginTime:'2014-10-23 10:29:53',money:100,operationTime:'2014-10-23 11:28:53'}
    ], null, {validate: true}).error(function (errors) {
            console.log("UserSystem" + errors);
        }).success(function () {
            console.log("UserSystem insert success");
        });
}).on("failure", function () {
        console.log("UserSystem fail...");
    });