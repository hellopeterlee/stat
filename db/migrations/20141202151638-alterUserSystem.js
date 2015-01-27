"use strict";

module.exports = {
    up: function (migration, DataTypes, done) {
        migration.addColumn(
            'UserSystems',
            'level',
            DataTypes.INTEGER
        )
        done();
    },

    down: function (migration, DataTypes, done) {
        migration.removeColumn('UserSystems', 'level');
        done();
    }
};