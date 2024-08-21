var LockingAsset = artifacts.require("LockingAsset");

module.exports = function (deployer){
    deployer.deploy(LockingAsset);
}
