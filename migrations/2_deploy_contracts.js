const LayerA = artifacts.require("LayerA");
const LayerB = artifacts.require("LayerB");
const LayerC = artifacts.require("LayerC");
const Router = artifacts.require("Router");
const Bidding = artifacts.require("Bidding");

module.exports = async function(deployer) {
    // Deploy LayerA, LayerB, and LayerC contracts
    await deployer.deploy(LayerA);
    const layerA = await LayerA.deployed();

    await deployer.deploy(LayerB);
    const layerB = await LayerB.deployed();

    await deployer.deploy(LayerC);
    const layerC = await LayerC.deployed();

    

    // Deploy Router contract with the addresses of LayerA, LayerB, and LayerC
    await deployer.deploy(Router, layerA.address, layerB.address, layerC.address);

    // Deploy Bidding contract with the addresses of LayerA, LayerB and LayerC
    await deployer.deploy(Bidding,layerA.address, layerB.address, layerC.address );
};
