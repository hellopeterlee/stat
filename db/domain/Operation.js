var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_OPERATION, {
            operationId: {type: DataTypes.INTEGER},
            userId: {type: DataTypes.INTEGER},
            roleId: {type: DataTypes.INTEGER},
            data: {type: DataTypes.STRING},
            createdAt: {type: DataTypes.DATE}
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