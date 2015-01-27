"use strict";

module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable(
            'Clientbehaviours',
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                sessionId: {
                    type: DataTypes.STRING
                },
                behaviours: {
                    type: DataTypes.TEXT
                }
            }
        );
        done();
    },

    down: function(migration, DataTypes, done) {
        migration.dropTable("Clientbehaviours");
        done();
    }
};
