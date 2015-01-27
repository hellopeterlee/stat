var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_LOGINRECORD, {
            serverId: {type:DataTypes.INTEGER(10), unique: false},
            userId:{type:DataTypes.INTEGER(20), unique: false},
            loginTime: {type: DataTypes.DATE, unique: false},
            operationTime: {type: DataTypes.DATE, unique: false}
        },
        {
            timestamps: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        })
};