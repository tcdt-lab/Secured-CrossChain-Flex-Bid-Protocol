const Web3 = require('web3');
const TruffleContract = require('@truffle/contract');
const LockingAssetArtifact = require('../build/contracts/LockingAsset.json');
const RouterArtifact = require('../build/contracts/Router.json');
const BiddingArtifact = require('../build/contracts/Bidding.json');

const web3 = new Web3('http://127.0.0.1:7545'); // Ganache default address
const LockingAsset = TruffleContract(LockingAssetArtifact);
const Router = TruffleContract(RouterArtifact);
const Bidding = TruffleContract(BiddingArtifact);

LockingAsset.setProvider(web3.currentProvider);
Router.setProvider(web3.currentProvider);
Bidding.setProvider(web3.currentProvider);


async function LockAsset() {
    const accounts = await web3.eth.getAccounts();
    const lockAsset = await LockingAsset.deployed();
    

    // 1) Locking of Asset and creating a new bid...

   
    await lockAsset.lockTokens(accounts[0],{ from: accounts[4], value: 4 });
    await lockAsset.lockTokens(accounts[0],{ from: accounts[4], value: 3 });
    await lockAsset.lockTokens(accounts[0],{ from: accounts[4], value: 12 });
    await lockAsset.lockTokens(accounts[0],{ from: accounts[4], value: 7 });
    console.log(`Tokens locked successfully with amount ETH`);

    
}
LockAsset().catch(error => {
    console.error(error);
    process.exit(1);
});