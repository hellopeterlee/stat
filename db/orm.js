var myUtil = require('../utils/util.js');
var config = require('./config/db.json')[myUtil.serverType()],
//var myUtil = require('../../GoldMiner/util/util');
//var config = require('./config/db.json')['test'],
    Sequelize = require('sequelize');

var ConstServer = require('../config/ConstServer');

var orm = new Sequelize("goldminer_stat_test", config.username, config.password, {

    define: {
        classMethods: {
            pageOffset: function (pageNum) {
                if (isNaN(pageNum) || pageNum < 1) {
                    pageNum = 1;
                }
                return (pageNum - 1) * this.pageLimit();
            },
            pageLimit: function () {
                return ConstServer.PAGE_SIZE; //每页显示50条
            },
            totalPages: function (totalNum) {
                var total = parseInt((totalNum + this.pageLimit() - 1) / this.pageLimit()),
                    arrayTotalPages = [];
                for (var i = 1; i <= total; i++) {
                    arrayTotalPages.push(i);
                }
                return arrayTotalPages;
            }
        },
        instanceMethods: {
        }
    }

});

module.exports = orm;