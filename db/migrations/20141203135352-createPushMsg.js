"use strict";

module.exports = {
    up: function (migration, DataTypes, done) {
        migration.createTable("PushMsgs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
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
            }
        }).done(done);
    },
    down: function (migration, DataTypes, done) {
        migration.dropTable("PushMsgs").done(done);
    }
};