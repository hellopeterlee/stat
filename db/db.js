var myUtil = require('../../GoldMiner/util/util.js');
    config = require('./config/db.json')[myUtil.serverType()],
    Sequelize = require('sequelize'),
    fs = require('fs'),
    path = require('path'),
    orm = require('./orm'),
    ErrorCode =  require("../../shared/ErrorCode");
var db = module.exports = {};
db.init = function () {
    var domainDir = path.normalize(__dirname + '/domain/');
    fs.readdirSync(domainDir).forEach(function (fn) {
        if (!/\.js$/.test(fn)) return;
        var name = path.basename(fn, '.js');
        orm.import(domainDir + name);
        db.__defineGetter__(name, function () {
            return orm.model(name);
        })
    });
    this.init = function () {
        return db;
    };
    return db;
};
db.sync = function () {
    this.init();
    orm.sync();
};
db.createChain = function () {
    return new Sequelize.Utils.QueryChainer;
};

db.rollback = function(t, FailedCB, e){
    t.rollback().success(function () {
        myUtil.logger.error(e.stack);
        FailedCB(ErrorCode.NULL);
    });
};

db.init();

var StatEveryDay = db.StatEveryDay;