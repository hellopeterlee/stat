//var DB = require('../../../server/db/db');
var gameOrm = require('../../../server/db/orm');
var PlayerManager = require('../../../server/game/service/PlayerManager');
var myUtil = require('../../../server/util/util');

var gameModulDir = '../../../';
var gameOrm = require(gameModulDir + 'server/db/orm');
var gameDomainDir = gameModulDir + 'server/db/domain/';
var Role = gameOrm.import(gameDomainDir+"Role"),
    User = gameOrm.import(gameDomainDir+"User");

var DM = function(){
};

DM.getUserRoleByIdOrNiceName = function(idOrNiceName,cbSuccess, cbFailed){
    var paramType = (typeof idOrNiceName);
    var where = {};

    if( 'number' == paramType ){
        where['id'] = idOrNiceName;
    }else if( 'string' == paramType ){
        where['nickname'] = idOrNiceName;
    }
    Role.find({
        where: where,
        limit: 1
    }).success(function(row){
        cbSuccess(row)
    }).failure(function (e) {
        myUtil.logger.error(e.stack);
        cbFail();
    });
}

DM.updateUserRole = function(role,cbSuccess,cbFailed){
    Role.update(role, {id: role.id}).success(function () {
        cbSuccess();
    }).failure(function(e){
        myUtil.logger.error(e.stack);
        cbFail();
    });
}

DM.onLineClientCountCurrent = function(){
    return PlayerManager.GetInstance().m_currPlayers.length;
}

//test:
//DM.getUserRoleByIdOrNiceName(1,cbFindRolesuccess,cbFindRoleFailure);
//DM.getUserRoleByIdOrNiceName('user2',cbFindRolesuccess,cbFindRoleFailure);
//console.log('onLineClientCountCurrent>>'+DM.onLineClientCountCurrent());

function cbFindRolesuccess(role){
    console.log("find role>>>" + JSON.stringify(role));
    var newrole = {'id':role.id,'nickname':'fucknickname'};
    DM.updateUserRole(newrole,function(){
        console.log("update role success >>>" + JSON.stringify(role));
    },function(){
        console.log("update role failed");
    });
}
function cbFindRoleFailure(){
    console.log("find role failed");
}

module.exports = DM;