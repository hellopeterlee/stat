var ConstServer = require('../../config/ConstServer');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(ConstServer.MODEL_USERS, {
            channelId:{type:DataTypes.INTEGER, unique: false},
            platformId: {type: DataTypes.INTEGER, unique: false, defaultValue:0  },
            name: {type: DataTypes.STRING, unique: false, defaultValue: null},
            password: {type: DataTypes.STRING, unique: false, defaultValue:null  },
            createTime: {type: DataTypes.BIGINT, unique: false, defaultValue:null  },
            loginTime: {type: DataTypes.BIGINT, unique: false, defaultValue:0  },
            logoutTime: {type: DataTypes.BIGINT, unique: false, defaultValue:0  },
            sessionId: {type: DataTypes.STRING, unique: false, defaultValue:null  },
            referIp: {type: DataTypes.STRING, unique: false, defaultValue:null  }

        },
        {
            timestamps: false
        },
        {
            instanceMethods: {},
            classMethods: {}
        })
};