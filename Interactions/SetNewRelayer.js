const Web3 = require('web3');
const TruffleContract = require('@truffle/contract');
const LockingAssetArtifact = require('../build/contracts/LockingAsset.json');
const LayerAArtifact = require('../build/contracts/LayerA.json');
const LayerBArtifact = require('../build/contracts/LayerB.json');
const LayerCArtifact = require('../build/contracts/LayerC.json');
const RouterArtifact = require('../build/contracts/Router.json');
const BiddingArtifact = require('../build/contracts/Bidding.json');

const web3 = new Web3('http://127.0.0.1:7545'); // Ganache default address
const LockingAsset = TruffleContract(LockingAssetArtifact);
const LayerA = TruffleContract(LayerAArtifact);
const LayerB = TruffleContract(LayerBArtifact);
const LayerC = TruffleContract(LayerCArtifact);
const Router = TruffleContract(RouterArtifact);
const Bidding = TruffleContract(BiddingArtifact);

LockingAsset.setProvider(web3.currentProvider);
LayerA.setProvider(web3.currentProvider);
LayerB.setProvider(web3.currentProvider);
LayerC.setProvider(web3.currentProvider);
Router.setProvider(web3.currentProvider);
Bidding.setProvider(web3.currentProvider);


async function SetNewRelayer() {
    const accounts = await web3.eth.getAccounts();
    const router = await Router.deployed();
    const lockAsset = await LockingAsset.deployed();
    const bidding = await Bidding.deployed();

    

        // 2) Setting a new relayer

    await router.setRelayer("Anukul", 2, 4, { from: accounts[1] });
    console.log('Relayer1 set');
    await router.setRelayer("Anu", 10, 12, { from: accounts[2] });
    console.log('Relayer2 set');
    await router.setRelayer("Pokharel", 6, 8, { from: accounts[3] });
    console.log('Relayer3 set');

    
    
}
SetNewRelayer().catch(error => {
    console.error(error);
    process.exit(1);
});