var config = require('../config/db.json')['test'];
var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var orm = new Sequelize(config.database, config.username, config.password, config);

var domainDir = path.normalize(__dirname + "/.." + '/domain/');

console.log(domainDir);


var announcement = path.basename("Announcement", '.js');
orm.import(domainDir + announcement);
var Announcement = orm.model(announcement);

var gift = path.basename("Gift", '.js');
orm.import(domainDir + gift);
var Gift = orm.model(gift);

var loginLog = path.basename("Loginlog", '.js');
orm.import(domainDir + loginLog);
var LoginLog = orm.model(loginLog);

var notice = path.basename("Notice", '.js');
orm.import(domainDir + notice);
var Notice = orm.model(notice);

var operation = path.basename("Operation", '.js');
orm.import(domainDir + operation);
var Operation = orm.model(operation);

var adminUser = path.basename("AdminUser", '.js');
orm.import(domainDir + adminUser);
var AdminUser = orm.model(adminUser);

var statEveryDay = path.basename("StatEveryDay", '.js');
orm.import(domainDir + statEveryDay);
var StatEveryDay = orm.model(statEveryDay);

var onlineInfo = path.basename("OnlineInfo", '.js');
orm.import(domainDir + onlineInfo);
var OnlineInfo = orm.model(onlineInfo);

var user = path.basename("User", '.js');
orm.import(domainDir + user);
var User = orm.model(user);

var clientLog = path.basename("ClientLog", '.js');
orm.import(domainDir + clientLog);
var ClientLog = orm.model(clientLog);

var loginRecord = path.basename("LoginRecord", '.js');
orm.import(domainDir + loginRecord);
var LoginRecord = orm.model(loginRecord);


var userSystem = path.basename("UserSystem", '.js');
orm.import(domainDir + userSystem);
var UserSystem = orm.model(userSystem);

var email = path.basename("Email", '.js');
orm.import(domainDir + email);
var Email = orm.model(email);

var clientbehaviour = path.basename("Clientbehaviour", '.js');
orm.import(domainDir + clientbehaviour);
var Clientbehaviour = orm.model(clientbehaviour);


StatEveryDay.sync({force: true}).on("success", function () {
    console.log("StatEveryDay success...");
    StatEveryDay.bulkCreate([
        {'data_at': '2014090111', 'reg_count': 100, 'ip_count': 290, 'login_count': 223, 'max_online_count': 100, 'avg_online_duration': 100},
        {'data_at': '2014090112', 'reg_count': 100, 'ip_count': 290, 'login_count': 223, 'max_online_count': 100, 'avg_online_duration': 100},
        {'data_at': '2014090213', 'reg_count': 101, 'ip_count': 190, 'login_count': 213, 'max_online_count': 100, 'avg_online_duration': 100},
        {'data_at': '2014090314', 'reg_count': 102, 'ip_count': 390, 'login_count': 112, 'max_online_count': 100, 'avg_online_duration': 100}
    ], null, {validate: true}).error(function (errors) {
        console.log("StatEveryDay" + errors);
    }).success(function () {
        console.log("StatEveryDay insert success");
    });
}).on("failure", function () {
    console.log("StatEveryDay fail...");
});

Operation.sync({force: true}).on("success", function () {
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

Announcement.sync({force: true}).on("success", function () {
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

Gift.sync({force: true}).on("success", function () {
    console.log("Gift success...");
    Gift.bulkCreate([
        {typeId: 1, channelId: 1, giftname: "礼物1", money: 1, diamond: 1, goods: '[{"goodsId":5, "num":1}, {"goodsId":7, "num":3}]', sended: 0},
        {typeId: 2, channelId: 1, giftname: "礼物2", money: 1, diamond: 1, goods: '[{"goodsId":5, "num":1}, {"goodsId":7, "num":3}]', sended: 0},
        {typeId: 3, channelId: 1, giftname: "礼物3", money: 1, diamond: 1, goods: '[{"goodsId":5, "num":1}, {"goodsId":7, "num":3}]', sended: 0}
    ], null, {validate: true}).error(function (errors) {
        console.log("Gift" + errors);
    }).success(function () {
        console.log("Gift insert success");
    });
}).on("failure", function () {
    console.log("Gift fail...");
});


Notice.sync({force: true}).on("success", function () {
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
sha1.update('hand%!*');//'h@p27^uy'
var pass = sha1.digest('hex');

AdminUser.sync({force: true}).on("success", function () {
    console.log("AdminUser insert begin...");
    AdminUser.bulkCreate([
        {username: "admin1", password: pass},
        {username: "admin2", password: pass},
        {username: "admin3", password: pass}
    ], null, {validate: true}).error(function (errors) {
        console.log("AdminUser" + errors);
    }).success(function () {
        console.log("AdminUser insert success");
    });
}).on("failure", function () {
    console.log("AdminUser fail...");
});


Email.sync({force: true}).on("success", function () {
    console.log("Email insert begin...");
    Email.bulkCreate([
        {username: "宋祥玉", email: "1831088458@qq.com"},
        {username: "aaa", email: "1831088458@qq.com"},
        {username: "bbb", email: "1831088458@qq.com"}
    ], null, {validate: true}).error(function (errors) {
        console.log("Email" + errors);
    }).success(function () {
        console.log("Email insert success");
    });
}).on("failure", function () {
    console.log("Email fail...");
});


LoginLog.sync({force: true}).on("success", function () {
    console.log("LoginLog insert begin...");
    LoginLog.bulkCreate([
        {userId: 1, loginIp: '192.168.1.9', loginTime: new Date().getTime(), logoutTime: new Date().getTime()},
        {userId: 2, loginIp: '192.168.1.10', loginTime: new Date().getTime(), logoutTime: new Date().getTime()},
        {userId: 3, loginIp: '192.168.1.11', loginTime: new Date().getTime(), logoutTime: new Date().getTime()}
    ], null, {validate: true}).error(function (errors) {
        console.log("LoginLog" + errors);
    }).success(function () {
        console.log("LoginLog insert success");
    });
}).on("failure", function () {
    console.log("LoginLog fail...");
});

OnlineInfo.sync({force: true}).on("success", function () {
    console.log("OnlineInfo insert begin...");
    OnlineInfo.bulkCreate([
        {dataAt: '2014102416', onlineMaxCount: 100},
        {dataAt: '2014102417', onlineMaxCount: 200},
        {dataAt: '2014102418', onlineMaxCount: 300}
    ], null, {validate: true}).error(function (errors) {
        console.log("OnlineInfo" + errors);
    }).success(function () {
        console.log("OnlineInfo insert success");
    });
}).on("failure", function () {
    console.log("OnlineInfo fail...");
});


User.sync({force: true}).on("success", function () {
    console.log("User insert begin...");
    User.bulkCreate([
        {channelId: 10001, platformId: 1, name: 'root', password: '123456', createTime: new Date().getTime(), loginTime: new Date().getTime(), logoutTime: new Date().getTime(), sessionId: '123151414', referIp: '192.168.1.9'},
        {channelId: 10001, platformId: 1, name: 'root', password: '123456', createTime: new Date().getTime(), loginTime: new Date().getTime(), logoutTime: new Date().getTime(), sessionId: '123151414', referIp: '192.168.1.9'},
        {channelId: 10001, platformId: 1, name: 'root', password: '123456', createTime: new Date().getTime(), loginTime: new Date().getTime(), logoutTime: new Date().getTime(), sessionId: '123151414', referIp: '192.168.1.9'}
    ], null, {validate: true}).error(function (errors) {
        console.log("User" + errors);
    }).success(function () {
        console.log("User insert success");
    });
}).on("failure", function () {
    console.log("User fail...");
});


ClientLog.sync({force: true}).on("success", function () {
    console.log("ClientLog insert begin...");
    ClientLog.bulkCreate([
        {protocol: 1, sessionId: '47f5e3da40d2370a9cae23c5', info: "{'u':'root','p':'123456'}", operationTime: new Date()},
        {protocol: 2, sessionId: '47f5e3da40d2370a9cae23c5', info: "{'u':'root','p':'123456'}", operationTime: new Date()},
        {protocol: 99, sessionId: '47f5e3da40d2370a9cae23c4', info: "{'u':'root','p':'123456'}", operationTime: new Date()},
        {protocol: 100, sessionId: '47f5e3da40d2370a9cae23c4', info: "{'u':'root','p':'123456'}", operationTime: new Date()},
        {protocol: 101, sessionId: '47f5e3da40d2370a9cae23c4', info: "{'u':'root','p':'123456'}", operationTime: new Date()}
    ], null, {validate: true}).error(function (errors) {
        console.log("ClientLog" + errors);
    }).success(function () {
        console.log("ClientLog insert success");
    });
}).on("failure", function () {
    console.log("ClientLog fail...");
});

LoginRecord.sync({force: true}).on("success", function () {
    console.log("LoginRecord insert begin...");
    LoginRecord.bulkCreate([
        {serverId: 1, userId: 1, loginTime: '2014-10-24 19:22:48', operationTime: '2014-10-24 19:22:49'},
        {serverId: 2, userId: 1, loginTime: '2014-10-24 19:22:56', operationTime: '2014-10-24 19:23:00'},
        {serverId: 2, userId: 1, loginTime: '2014-10-24 19:22:49', operationTime: '2014-10-24 19:22:49'},
        {serverId: 2, userId: 1, loginTime: '2014-10-25 19:22:56', operationTime: '2014-10-25 19:23:00'}
    ], null, {validate: true}).error(function (errors) {
        console.log("LoginRecord" + errors);
    }).success(function () {
        console.log("LoginRecord insert success");
    });
}).on("failure", function () {
    console.log("LoginRecord fail...");
});

UserSystem.sync({force: true}).on("success", function () {
    console.log("UserSystem insert begin...");
    UserSystem.bulkCreate([
        {serverId: 1, ip: '192.168.1.9', userId: 1, createTime: new Date(), money: 0},
        {serverId: 1, ip: '192.168.1.10', userId: 2, createTime: new Date(), money: 0},
        {serverId: 2, ip: '192.168.1.11', userId: 3, createTime: new Date(), money: 0},
        {serverId: 2, ip: '192.168.1.12', userId: 4, createTime: new Date(), money: 0}
    ], null, {validate: true}).error(function (errors) {
        console.log("UserSystem" + errors);
    }).success(function () {
        console.log("UserSystem insert success");
    });
}).on("failure", function () {
    console.log("UserSystem fail...");
});


Clientbehaviour.sync({force: true}).on("success", function () {
    console.log("Clientbehaviour insert begin...");
    Clientbehaviour.bulkCreate([
        {sessionId: '1231231', behaviours: JSON.stringify([
            {'protocol': 100, 'timeAt': '2014-10-24 19:22:49'},
            {'protocol': 101, 'timeAt': '2014-10-24 19:22:49'},
            {'protocol': 102, 'timeAt': '2014-10-24 19:22:49'}
        ])},
        {sessionId: '1231232', behaviours: JSON.stringify([
            {'protocol': 4, 'timeAt': '2014-10-24 19:22:49'},
            {'protocol': 5, 'timeAt': '2014-10-24 19:22:49'},
            {'protocol': 6, 'timeAt': '2014-10-24 19:22:49'}
        ])},
        {sessionId: '1231233', behaviours: JSON.stringify([
            {'protocol': 1, 'timeAt': '2014-10-24 19:22:49'},
            {'protocol': 2, 'timeAt': '2014-10-24 19:22:49'},
            {'protocol': 3, 'timeAt': '2014-10-24 19:22:49'}
        ])}
    ], null, {validate: true}).error(function (errors) {
        console.log("Clientbehaviour" + errors);
    }).success(function () {
        console.log("Clientbehaviour insert success");
    });
}).on("failure", function () {
    console.log("Clientbehaviour fail...");
});