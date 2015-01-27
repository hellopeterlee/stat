var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_ONLINEINFO, {
            dataAt:{type:DataTypes.STRING, unique: false},
            onlineMaxCount:{type:DataTypes.INTEGER(20), unique: false}
        },
        {
            timestamps: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        })
};