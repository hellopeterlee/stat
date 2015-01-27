var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_NOTICE, {
            version:{type: DataTypes.STRING(5), unique: false, defaultValue:'1.0'  },
            title: {type: DataTypes.STRING(20)},
            content: {type: DataTypes.STRING(200)}
        },
        {
            timestamps: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        })
};