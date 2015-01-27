var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_PAYMENTLOG, {
            userId: {
                type: DataTypes.STRING(16)
            },
            nickName: {
                type: DataTypes.STRING(32)
            },
            channelNum: {
                type: DataTypes.STRING(16)
            },
            productId: {
                type: DataTypes.STRING(32)
            },
            diamond: {
                type: DataTypes.INTEGER
            },
            rmb: {
                type: DataTypes.INTEGER
            },
            timeAt: {
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