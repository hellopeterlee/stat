var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_ANNOUNCEMENT, {
            anContent: {type: DataTypes.STRING},
            anTime: {type: DataTypes.DATE},
            nextPushTime: {type: DataTypes.DATE},
            pushRate :  {type: DataTypes.INTEGER},
            pushType : {type: DataTypes.INTEGER},
            pushDayOfWeek : {type: DataTypes.STRING},
            isAn: {type: DataTypes.INTEGER}
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