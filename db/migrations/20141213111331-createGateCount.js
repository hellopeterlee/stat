"use strict";

module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable(
            'GateCounts',
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                gate: {
                    type: DataTypes.INTEGER
                },
                sumcount: {
                    type: DataTypes.INTEGER
                }
            }
        );
        done();
    },

    down: function(migration, DataTypes, done) {
        migration.dropTable("GateCounts");
        done();
    }
};
