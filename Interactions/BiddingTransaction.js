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


async function BiddingTransaction() {
    const accounts = await web3.eth.getAccounts();
    const bidding = await Bidding.deployed();

     //5) Bidding of the transactions by relayers

    try {
        // Send the bid transaction
        const receipt = await bidding.bid("obYdckPMGIzoY5Tj" , { // Replace with the appropriate bid_ID
            from: accounts[1], // Replace with the appropriate relayer's address
            value: 6
        });

        console.log('Bid successful:', receipt);
    } catch (error) {
        console.error('Error during bidding:', error);
    }
    
}
BiddingTransaction().catch(error => {
    console.error(error);
    process.exit(1);
});