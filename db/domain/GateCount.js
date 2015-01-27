var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_GATECOUNT, {
            gate: {
                type: DataTypes.INTEGER
            },
            sumcount: {
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        })
};