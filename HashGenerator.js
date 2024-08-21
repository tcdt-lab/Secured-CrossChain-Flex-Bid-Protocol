const { ethers } = require('ethers');

const bidId = '6ZGMRuSGLExqK2AM';
const sender = '0x56AE6Ffb7B66d2E4888d4b24c06fa6410a140570'; // sender's address
const receiver = '0xE79dB01828132cb7810d04959112CEbba4066053'; // receiver's address
const amount = 2;
const relayer_address = '0xA09432eD2716108e1675A190eA7313FDcdD83E6c';
 // current timestamp in seconds

const transactionData = ethers.utils.defaultAbiCoder.encode(
    ['string', 'address', 'address', 'uint256', 'uint256'],
    [bidId, sender, receiver, amount, relayer_address]
);

const transactionHash = ethers.utils.keccak256(transactionData);

console.log('Transaction Hash:', transactionHash);


// actual hash : 0x20c75fdfd1a3e41e6fe1cec668e8d9187b2024cc54d63716f159687297ff31a9
// 0x1903a0b3f7c19fbe0609ece7a4b3826108f1437e5966f3aa6e06623dfb4e5dd7