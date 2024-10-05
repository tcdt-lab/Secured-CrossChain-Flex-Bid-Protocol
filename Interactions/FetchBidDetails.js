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


async function FetchBidDetails() {
    const accounts = await web3.eth.getAccounts();
    const router = await Router.deployed();
    const lockAsset = await LockingAsset.deployed();
    const bidding = await Bidding.deployed();


    // //4) Fetch the bid details from Layers.....

    const layerA = await LayerA.deployed();
    const bidA = await layerA.getBids();
    // console.log(`Bid details from LayerA: ${JSON.stringify(bidA)}`);
    for(let i=0;i<bidA.length;i++){
        const _id = bidA[i];
        const data = await layerA.BidsMap(_id)
    console.log(`Bid details from LayerA: ${JSON.stringify(data)}`);
    }
     
    // const layerB = await LayerB.deployed();
    // const bidB = await layerB.getBids();
    // for(let i=0;i<bidB.length;i++){
    //     const _id = bidB[i];
    //     const data = await layerB.BidsMap(_id)
    // console.log(`Bid details from LayerA: ${JSON.stringify(data)}`);
    // }


    // const layerC = await LayerC.deployed();
    // const bidC = await layerC.getBids();
    // for(let i=0;i<bidC.length;i++){
    //     const _id = bidC[i];
    //     const data = await layerC.BidsMap(_id)
    // console.log(`Bid details from LayerA: ${JSON.stringify(data)}`);
    // }
    
}
FetchBidDetails().catch(error => {
    console.error(error);
    process.exit(1);
});