var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_BYSTORCOLOG, {
            userId: {
                type: DataTypes.STRING(16)
            },
            nickName: {
                type: DataTypes.STRING(32)
            },
            type: {
                type: DataTypes.STRING(4)
            },
            diamond: {
                type: DataTypes.INTEGER
            },
            timeAt:{
                type: DataTypes.DATE
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