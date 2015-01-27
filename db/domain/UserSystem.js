var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_USERSYSTEM, {
            serverId: {type: DataTypes.INTEGER(10), unique: false},
            ip:{type:DataTypes.STRING(20), unique: false},
            userId: {type: DataTypes.INTEGER(10), unique: false},
            nickname: {type: DataTypes.STRING(32), unique: false},
            createTime: {type: DataTypes.DATE, unique: false},
            money: {type: DataTypes.INTEGER(10), unique: false},
            level: {type: DataTypes.INTEGER},
            gate: {type: DataTypes.INTEGER(10)},
            subgate: {type: DataTypes.INTEGER(10)}
        },
        {
            timestamps: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        })
};