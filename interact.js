const Web3 = require('web3');
const TruffleContract = require('@truffle/contract');
const LockingAssetArtifact = require('./build/contracts/LockingAsset.json');
const LayerAArtifact = require('./build/contracts/LayerA.json');
const LayerBArtifact = require('./build/contracts/LayerB.json');
const LayerCArtifact = require('./build/contracts/LayerC.json');
const RouterArtifact = require('./build/contracts/Router.json');
const BiddingArtifact = require('./build/contracts/Bidding.json');

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

async function interact() {
    const accounts = await web3.eth.getAccounts();
    const router = await Router.deployed();
    const lockAsset = await LockingAsset.deployed();
    const bidding = await Bidding.deployed();


    // 1) Locking of Asset and creating a new bid...

   
    // await lockAsset.lockTokens(accounts[0],{ from: accounts[4], value: 4 });
    // await lockAsset.lockTokens(accounts[0],{ from: accounts[4], value: 3 });
    // await lockAsset.lockTokens(accounts[0],{ from: accounts[4], value: 12 });
    // await lockAsset.lockTokens(accounts[0],{ from: accounts[4], value: 7 });
    console.log(`Tokens locked successfully with amount ETH`);
    


    // 2) Setting a new relayer

    // await router.setRelayer("Anukul", 2, 4, { from: accounts[1] });
    console.log('Relayer1 set');
    // await router.setRelayer("Anu", 10, 12, { from: accounts[2] });
    console.log('Relayer2 set');
    // await router.setRelayer("Pokharel", 6, 8, { from: accounts[3] });
    console.log('Relayer3 set');



    // 3) Check the relayer details.....

    // const relayerId = await router.ids(0);
    // const relayer = await router.Relayers(relayerId);
    console.log(`Relayer details: ${JSON.stringify(relayer)}`);

    

    // //4) Fetch the bid details from Layers.....

    // const layerA = await LayerA.deployed();
    // const bidA = await layerA.getBids();
    console.log(`Bid details from LayerA: ${JSON.stringify(bidA)}`);
     
    // const layerB = await LayerB.deployed();
    // const bidB = await layerB.getBids();
    console.log(`Bid details from LayerB: ${JSON.stringify(bidB)}`);

    // const layerC = await LayerA.deployed();
    // const bidC = await layerC.getBids();
    console.log(`Bid details from LayerA: ${JSON.stringify(bidC)}`);



    //5) Bidding of the transactions by relayers

    // const bids = await bidding.showBids({ from: accounts[1] });
    // console.log(`Hello: ${JSON.stringify(bids)}`);

    // try {
    //     // Send the bid transaction
    //     const receipt = await bidding.bid("XZOYz56UfY1jTGbZ", {
    //         from: accounts[1], // Replace with the appropriate relayer's address
    //         value: 5
    //     });

    //     console.log('Bid successful:', receipt);
    // } catch (error) {
    //     console.error('Error during bidding:', error);
    // }

       
            

}

interact().catch(error => {
    console.error(error);
    process.exit(1);
});
