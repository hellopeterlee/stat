var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_LOGINLOG, {
            userId:{type:DataTypes.BIGINT(20), unique: false},
            loginIp:{type:DataTypes.STRING, unique: false},
            loginTime: {type: DataTypes.BIGINT(20), unique: false},
            loginoutTime: {type: DataTypes.BIGINT(20), unique: false}
        },
        {
            timestamps: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        })
};