var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_STATEVERYDAY, {
            data_at:{type:DataTypes.STRING, unique: false},
            reg_count: {type: DataTypes.INTEGER, unique: false, defaultValue:0  },
            ip_count: {type: DataTypes.INTEGER, unique: false, defaultValue: false},
            login_count: {type: DataTypes.INTEGER, unique: false, defaultValue:0  },
            max_online_count: {type: DataTypes.INTEGER, unique: false, defaultValue:0  },
            avg_online_duration: {type: DataTypes.INTEGER, unique: false, defaultValue:0  }
        },
        {
            timestamps: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        })
};