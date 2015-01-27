"use strict";

module.exports = {
    up: function (migration, DataTypes, done) {
        migration.addColumn(
            'UserSystems',
            'gate',
            DataTypes.INTEGER
        );
        migration.addColumn(
            'UserSystems',
            'subgate',
            DataTypes.INTEGER
        )
        done();
    },

    down: function (migration, DataTypes, done) {
        migration.removeColumn('UserSystems', 'nickname');
        migration.removeColumn('UserSystems', 'subgate');
        done();
    }
};
