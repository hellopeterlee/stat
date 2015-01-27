var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_CLIENTBEHAVIOUR, {
            sessionId:{type:DataTypes.STRING, unique: false},
            behaviours:{type:DataTypes.TEXT}
        },
        {
            timestamps: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        })
};