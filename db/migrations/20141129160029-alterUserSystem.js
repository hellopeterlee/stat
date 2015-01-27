"use strict";

module.exports = {
    up: function (migration, DataTypes, done) {
        migration.addColumn(
            'UserSystems',
            'nickname',
            DataTypes.STRING(32)
        )
        done();
    },

    down: function (migration, DataTypes, done) {
        migration.removeColumn('UserSystems', 'nickname');
        done();
    }
};
