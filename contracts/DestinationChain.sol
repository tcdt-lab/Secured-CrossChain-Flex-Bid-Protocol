// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;





// This is the smart contract where the relayer publish their transaction and the challenger verifies the transactions.
contract DestinationChain {
    struct Evidence {
        string bidId;
        bytes32 originalHash;
        bytes32 publishedHash;
    }

    event TransactionPublishedForChallenge(string bidId, address indexed relayer, bytes32 transactionHash);
    event ChallengeSubmitted(string bidId, address indexed challenger, Evidence evidence, string reason);
    event ChallengeResolved(string bidId, bool successful, address indexed relayer, address indexed challenger);

    // stores the transaction hashes associated with specific bid IDs.
    mapping(string => bytes32) public transactions;

    // records the addresses of the relayers responsible for each transaction.
    mapping(string => address) public relayers;

    // tracks whether a particular bid ID has been challenged or not.
    mapping(string => bool) public challenged;  

    // stores the timestamps of when each transaction was published.
    mapping(string => uint256) public publishTimes;
  


    // Relayer submit the transactionHash of the transaction in this contract
    function publishTransactionForChallenge(string memory _bidId, bytes32 _transactionHash) public {
        require(transactions[_bidId] == bytes32(0), "Transaction already published");


        transactions[_bidId] = _transactionHash;
        relayers[_bidId] = msg.sender;
        publishTimes[_bidId] = block.timestamp;

        emit TransactionPublishedForChallenge(_bidId, msg.sender, _transactionHash);
    }
    

    // Challenger can challenge the transaction published using this function
    function challengeTransaction(string memory _bidId, Evidence memory _evidence, string memory _reason) public payable  {
        require(transactions[_bidId] != bytes32(0), "Transaction not published");
        require(!challenged[_bidId], "Already challenged");

        // Verify evidence
        require(verifyEvidence(_evidence), "Invalid evidence");

        challenged[_bidId] = true;

        emit ChallengeSubmitted(_bidId, msg.sender, _evidence, _reason);
    }

   
    
    // Utitily function to verify the transaction hash published and submitted.
    function verifyEvidence(Evidence memory _evidence) internal pure returns (bool) {
        // Verify that the originalHash matches the publishedHash
        if (_evidence.originalHash == _evidence.publishedHash) {
            return false;
        }
        else return true;
    }

    


}
