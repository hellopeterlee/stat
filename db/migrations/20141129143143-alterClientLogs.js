"use strict";

module.exports = {
    up: function (migration, DataTypes, done) {
        migration.changeColumn(
            'ClientLogs',
            'operationTime',
            DataTypes.DATE
        );
        migration.changeColumn(
            'ClientLogs',
            'sessionId',
            DataTypes.STRING(32)
        );
        migration.changeColumn(
            'ClientLogs',
            'info',
            DataTypes.TEXT
        )
        done();
    },

    down: function (migration, DataTypes, done) {
        done();
    }
};
