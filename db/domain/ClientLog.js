var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_CLIENTLOG, {
            protocol:{type:DataTypes.INTEGER(10), unique: false},
            sessionId:{type:DataTypes.STRING, unique: false},
            info:{type:DataTypes.STRING, unique: false},
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