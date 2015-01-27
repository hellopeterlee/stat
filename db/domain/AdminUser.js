var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_ADMINUSER, {
            username: {type: DataTypes.STRING, unique: false, defaultValue: null},
            password: {type: DataTypes.STRING, unique: false, defaultValue:null},
            serverlist: {type: DataTypes.STRING, unique: false, defaultValue:0}
        },
        {
            timestamps: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        })
};