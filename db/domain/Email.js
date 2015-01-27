var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_EMAIL, {
            username: {type: DataTypes.STRING},
            email: {type: DataTypes.STRING}
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