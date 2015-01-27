"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
      migration.addColumn(
          'PushMsgs',
          'nickname',
          DataTypes.STRING(32)
      );
      migration.addColumn(
          'PushMsgs',
          'level',
          DataTypes.INTEGER
      );
      migration.addColumn(
          'PushMsgs',
          'icon',
          DataTypes.INTEGER
      );
    done();
  },

  down: function(migration, DataTypes, done) {
      migration.removeColumn('PushMsgs', 'nickname');
      migration.removeColumn('PushMsgs', 'level');
      migration.removeColumn('PushMsgs', 'icon');
      done();
  }
};
