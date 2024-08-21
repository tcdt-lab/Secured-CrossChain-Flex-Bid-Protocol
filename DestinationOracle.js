// This is the script that listens to the accepted challenge from the blockchain and carry out resolve functionality.. 



const { ethers } = require("ethers");
const DestinationChainArtifact = require('./build/contracts/DestinationChain.json');
const LayerAArtifact = require('./build/contracts/LayerA.json');
const LayerBArtifact = require('./build/contracts/LayerB.json');
const LayerCArtifact = require('./build/contracts/LayerC.json');


// Ethereum provider
const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545');

// Contracts initialization
const DestinationChainAddress = '0x59ea0dabAEEe56C764f2DCBbc9dA0cC4b108d3f4'; // Replace with actual Layer1Lock contract address
const layerA_Address = '0xDb0a3B971489b4fb61513c4f399aFbcff036845C'; // Replace with actual Router contract address
const layerB_Address = '0x047770816e13aF8833C9cFB1acdeDD9EE0bb7b0f'; // Replace with actual Router contract address
const layerC_Address = '0x71de6732669Eb2a3656f24042E3a3393A1fd92d6'; // Replace with actual Router contract address



const destinationChainContract = new ethers.Contract(DestinationChainAddress, DestinationChainArtifact.abi, provider);
const layerA_Contract = new ethers.Contract(layerA_Address, LayerAArtifact.abi, provider);
const layerB_Contract = new ethers.Contract(layerB_Address, LayerBArtifact.abi, provider);
const layerC_Contract = new ethers.Contract(layerC_Address, LayerCArtifact.abi, provider);


async function listenAndTrigger() {
    // Get accounts
    const accounts = await provider.listAccounts();
    console.log("listeninggg from destination chain");

    // Event listener for challenge submission
    destinationChainContract.on("ChallengeSubmitted", async (_bidId, _challengerAddress, event) => {
        console.log('Challenge Submission event detected:', event);

        // Trigger addBid function in Router contract
        try {
            const signer = provider.getSigner(accounts[0]); // Assuming accounts[0] is your signer account

            // const routerContractWithSigner = routerContract.connect(signer);
            const layerAContractWithSigner = layerA_Contract.connect(signer);
            const layerBContractWithSigner = layerB_Contract.connect(signer);
            const layerCContractWithSigner = layerC_Contract.connect(signer);
            let tx;

            if(layerAContractWithSigner.bidgetter(_bidId)){
                tx = await layerAContractWithSigner.resolveChallenge(_bidId,_challengerAddress);
            }
            else if(layerBContractWithSigner.bidgetter(_bidId)){
                tx = await layerBContractWithSigner.resolveChallenge(_bidId,_challengerAddress);

            }
            else if(layerCContractWithSigner.bidgetter(_bidId)){
                tx = await layerCContractWithSigner.resolveChallenge(_bidId,_challengerAddress);

            }
            else{
                console.log('Bid not found');
            }
            
            
            
            console.log(`Challenge resolved successfully for bidId ${_bidId}. Transaction hash: ${tx.hash}`);
        } catch (error) {
            console.error(`Error resolving challenge: ${error}`);
        }
    });
}

listenAndTrigger().catch(error => console.error('Error in main function:', error));
