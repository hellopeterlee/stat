var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_GIFT, {
            typeId: {type: DataTypes.INTEGER(5)},
            channelId: {type: DataTypes.INTEGER(5)},
            giftname: {type: DataTypes.STRING(20)},
            money: {type: DataTypes.INTEGER(20)},
            diamond: {type: DataTypes.INTEGER(20)},
            goods: {type: DataTypes.STRING(255)},
            sended: {type: DataTypes.INTEGER(5)}
        },
        {
            // todo: add back timestamps
            timestamps: false
//            timestamps: true,
//            updatedAt: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        })
};