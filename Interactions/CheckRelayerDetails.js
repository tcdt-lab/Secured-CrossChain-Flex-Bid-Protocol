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


async function CheckRelayerDetails() {
    const accounts = await web3.eth.getAccounts();
    const router = await Router.deployed();
    const lockAsset = await LockingAsset.deployed();
    const bidding = await Bidding.deployed();

    
    // 3) Check the relayer details.....

    const relayerId = await router.ids(0);
    const relayer = await router.Relayers(relayerId);
    console.log(`Relayer details: ${JSON.stringify(relayer)}`);
    
}
CheckRelayerDetails().catch(error => {
    console.error(error);
    process.exit(1);
});