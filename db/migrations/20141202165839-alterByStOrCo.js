"use strict";

module.exports = {
    up: function (migration, DataTypes, done) {
        migration.renameTable('BuStOrCoLogs', 'ByStOrCoLogs');
        done();
    },

    down: function (migration, DataTypes, done) {
        done();
    }
};
