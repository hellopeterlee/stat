"use strict";

module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable(
            'RechargeLogs',
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
                type: {
                    type: DataTypes.STRING(4)
                },
                diamond: {
                    type: DataTypes.INTEGER
                },
                timeAt:{
                    type: DataTypes.DATE
                }
            }
        );
        done();
    },

    down: function(migration, DataTypes, done) {
        migration.dropTable("RechargeLogs");
        done();
    }
};
