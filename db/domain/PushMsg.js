"use strict";

var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_PUSHMSG, {
            msg: {
                type: DataTypes.STRING
            },
            msgType: {
                type: DataTypes.INTEGER
            },
            startTime: {
                type: DataTypes.DATE
            },
            nextPushTime: {
                type: DataTypes.DATE
            },
            pushRate: {
                type: DataTypes.INTEGER
            },
            pushType: {
                type: DataTypes.INTEGER
            },
            pushDayOfWeek: {
                type: DataTypes.STRING
            },
            pushFlag: {
                type: DataTypes.INTEGER
            },
            nickname: {
                type: DataTypes.STRING(32)
            },
            level: {
                type: DataTypes.INTEGER
            },
            icon: {
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        });
};
