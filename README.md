# Secured Crosschain Flex-Bid Protocol



## Overview
The Secured Crosschain Flex-Bid Protocol is a blockchain solution designed to enable secure and efficient cross-chain bidding processes. This protocol ensures that bids are safely locked, routed, and settled across different blockchain networks, leveraging Ethereum smart contracts, oracles, relayers, and challengers to maintain integrity and security.



## Key Features

Cross-Chain Bid Routing: Efficiently routes bids across multiple blockchain layers.

+ **Secure Locking Mechanism:** Ensures ETH is securely locked on the mainchain during the bidding process.
+ **Relayer and Challenger System:** Relayers publish staked transactions to the destination blockchain, while challengers monitor and verify the integrity of these transactions.
+ **Oracle Integration:** Uses oracles to listen to events and trigger actions across chains.
+ **High Security:** The protocol's main strength lies in its security features, which safeguard against fraudulent or faulty transactions.

## Project Structure
+ **Mainchain Locker Contract:** Smart contract responsible for locking ETH on the mainchain.
+ **Oracle:** Listens to events on the mainchain and relays information to the sidechain.
+ **Router Contract:** Deployed on the sidechain, responsible for routing bids and managing the cross-chain interaction.
+ **Relayers:** Entities that publish transactions to the destination blockchain.
+ **Challengers:** Monitor relayers and can challenge any suspected faulty transactions.


## Tehnologies Used

+ Ethereum & Solidity: Smart contracts written in Solidity deployed on the Ethereum blockchain.
+ Oracles: Custom oracles for event listening and communication across chains.
+ React: Frontend developed using React.
+ ThirdWeb: Integration of ThirdWeb technologies for decentralized application management.

## Installation
**Prerequisites**
+ Node.js
+ Truffle
+ Ganache (for local Ethereum Network)
+ ThirdWeb SDK

**Steps**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/secured-crosschain-flex-bid-protocol.git
   cd secured-crosschain-flex-bid-protocol

2. ### Install Dependencies
   ```bash
   npm install
3. ### Compile Contracts (before compiling make sure you have your local ethereum network running)
   ```bash
   truffle compile
4. ### Migrate Contracts
   ```bash
   truffle migrate

## Usage
1. Deploy the oracle script

   ```bash
   node oracle.js
2. **Use the interaction file:**  Change the directory to Interactions and Run the scripts 
   
   Flow of the execution:
   + Locking of Assets and creating a new bid.(LockAsset.js)
   + Setting a new relayer.(SetNewRelayer.js)
   + Check the relayer details.(CheckRelayerDetails.js)
   + Fetch the bid details from layers.(FetchBidDetails.js)
   + Bidding of transaction by relayers.(BiddingTransaction.js)
   + Publishing of transaction hash by the relayer (you can use the HashGenerator.js for generating hash of a transaction) and Publish the transaction hash. (PublishTransaction.js)

### If any fraudulent activity is carried by the relayer i.e submission of incorrect hash to destination chain then challenging mechanism is present which can be done by following scripts.

3. **Deploy DestinationOracle:** You must deploy destination oracle script incase you want to submit a challenge for published hash.

   ```bash
   node DestinationOracle.js
4. **Challenging of a transaction hash by a Challenger:**
   
   ```bash
   node ChallengeTransaction.js

After execution of above steps, if incase their is a conflict or fraudulent activity by relayer, resolving mechanism is emitted. Here, we've idealized the behavior of challenger.

## Contact
For any questions or issues, please open an issue in the repository or reach out via anukulpokharel2058@gmail.com.



