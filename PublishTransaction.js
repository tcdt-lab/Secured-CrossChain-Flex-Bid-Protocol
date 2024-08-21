const Web3 = require('web3');
const TruffleContract = require('@truffle/contract');
const DestinationChainArtifact = require('./build/contracts/DestinationChain.json');

const web3 = new Web3('http://127.0.0.1:7545'); // Ganache default address
const DestinationChain = TruffleContract(DestinationChainArtifact);

DestinationChain.setProvider(web3.currentProvider);

async function PublishTransaction() {
    const accounts = await web3.eth.getAccounts();
    const destination_chain = await DestinationChain.deployed();





    // await destination_chain.publishTransactionForChallenge("XZOYz56UfY1jTGbZ","0x1903a0b3f7c19fbe0609ece7a4b3826108f1437e5966f3aa6e06623dfb4e5dd7",{from:accounts[1]});
    // console.log("published for challenge");
    

    const _bidId = "XZOYz56UfY1jTGbZ"; // Ensure this is a string
    const evidence = {
        bidId: _bidId,
        originalHash: "0x20c75fdfd1a3e41e6fe1cec668e8d9187b2024cc54d63716f159687297ff31a9", // 64-character hex string which is the actual hash of the transaction
        publishedHash: "0x1903a0b3f7c19fbe0609ece7a4b3826108f1437e5966f3aa6e06623dfb4e5dd7" // 64-character hex string which is the published hash by relayer
    };


    const tx = await destination_chain.challengeTransaction(_bidId, evidence, "example reason for challenge", {
        from: accounts[8],
        value: web3.utils.toWei('6', 'ether') // Ensure this is the correct ether value
    });

    console.log("Challenge submitted. Transaction hash:", tx.transactionHash);
}


PublishTransaction().catch(error => {
    console.error(error);
    process.exit(1);
});
