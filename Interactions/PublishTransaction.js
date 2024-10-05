const Web3 = require('web3');
const TruffleContract = require('@truffle/contract');
const DestinationChainArtifact = require('../build/contracts/DestinationChain.json');

const web3 = new Web3('http://127.0.0.1:7545'); // Ganache default address
const DestinationChain = TruffleContract(DestinationChainArtifact);

DestinationChain.setProvider(web3.currentProvider);

async function PublishTransaction() {
    const accounts = await web3.eth.getAccounts();
    const destination_chain = await DestinationChain.deployed();





    await destination_chain.publishTransactionForChallenge("obYdckPMGIzoY5Tj","0xa9425b068c4b2f0bd31638e5d52afff530de0fc5c64857b0b803c243fd53dc5c",{from:accounts[1]});
    console.log("published for challenge");
    
}


PublishTransaction().catch(error => {
    console.error(error);
    process.exit(1);
});
