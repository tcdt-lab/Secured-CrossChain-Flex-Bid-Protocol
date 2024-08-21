// This script listens to the TokenLocked event in the mainchain and routes the bid to the sidechain...


const { ethers } = require("ethers");
const LockingAssetArtifact = require('./build/contracts/LockingAsset.json');
const RouterArtifact = require('./build/contracts/Router.json');

// Ethereum provider
const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545'); // Replace with your Ethereum node URL

// Contracts initialization
const layer1LockAddress = '0xD4cD2fFd6F38dc1B05D19D2c4Cf88cE55B4469EB'; // Replace with actual Layer1Lock contract address
const routerAddress = '0x179d26B26469d41fD5533B0F4Ebb00BCC3A4d8fe'; // Replace with actual Router contract address

const layer1LockContract = new ethers.Contract(layer1LockAddress, LockingAssetArtifact.abi, provider);
const routerContract = new ethers.Contract(routerAddress, RouterArtifact.abi, provider);

async function listenAndTrigger() {
    // Get accounts
    const accounts = await provider.listAccounts();
    console.log("listeninggg");

    // Event listener for TokensLocked
    layer1LockContract.on("TokensLocked", async (user, receiver,amount, bidId, event) => {
        console.log('TokensLocked event detected:', event);

        // Trigger addBid function in Router contract
        try {
            const signer = provider.getSigner(accounts[0]); // Assuming accounts[0] is your signer account

            const routerContractWithSigner = routerContract.connect(signer);
            const tx = await routerContractWithSigner.addBid(bidId, user, receiver, amount, true, false);
            
            console.log(`addBid triggered successfully for bidId ${bidId}. Transaction hash: ${tx.hash} amount:${amount}`);
        } catch (error) {
            console.error(`Error triggering addBid: ${error}`);
        }
    });
}

listenAndTrigger().catch(error => console.error('Error in main function:', error));
