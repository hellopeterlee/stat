"use strict";

module.exports = {
    up: function (migration, DataTypes, done) {
        migration.addColumn(
            'ClientLogs',
            'sessionId',
            DataTypes.STRING
        )
        done();
    },

    down: function (migration, DataTypes, done) {
        migration.removeColumn('ClientLogs', 'sessionId');
        done();
    }
};
