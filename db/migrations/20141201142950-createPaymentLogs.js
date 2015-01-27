"use strict";

module.exports = {
    up: function (migration, DataTypes, done) {
        migration.renameTable('RechargeLogs', 'BuStOrCoLogs');
        migration.createTable(
            'PaymentLogs',
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                userId: {
                    type: DataTypes.STRING(16)
                },
                nickName: {
                    type: DataTypes.STRING(32)
                },
                channelNum: {
                    type: DataTypes.STRING(16)
                },
                productId: {
                    type: DataTypes.STRING(32)
                },
                diamond: {
                    type: DataTypes.INTEGER
                },
                rmb: {
                    type: DataTypes.INTEGER
                },
                timeAt: {
                    type: DataTypes.DATE
                }
            }
        );
        done();
    },

    down: function (migration, DataTypes, done) {
        migration.dropTable("PaymentLogs");
        done();
    }
};
