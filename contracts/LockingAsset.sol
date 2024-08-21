// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


// Smart contract to lock your asset in the main chain and generate corresponding bidId which gets transfered to side chain via a script.

contract LockingAsset {
    address public owner;
    uint256 private nonce;
    address payable contractAddress;
    

    // Structure of bid with attributes..
    struct Bid {
        address sender;
        address receiver;
        uint256 amount;
        bool locked;
        bool bought;
        string Id;
    }
    

    // maps bidIds to corresponding bids..
    mapping(string => Bid) public bids;
    // Array to store bidIds..
    string[] public bidIds;


    // Events occuring in mainchain...
    event TokensLocked(address indexed user, address receiver, uint256 amount, string bidId,bool bought);
    event TokensUnlocked(address indexed user, uint256 amount, string bidId);
    event Received(address sender, uint amount);


    constructor() {
        owner = msg.sender;
        nonce = 0;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
 

    // This functions locks the asset of mainchain and generated bidIds for the asset..
    function lockTokens(address payable _receiver) external payable  {
        contractAddress = getAddress();

        require(msg.value>0,"Amount must be greater than zero");
        contractAddress.transfer(msg.value);
        nonce++;
        uint256 randomValue = uint256(keccak256(abi.encodePacked(block.timestamp,_receiver, msg.sender, nonce)));
        string memory bidId = generateBidId(randomValue);

        bidIds.push(bidId);

        bids[bidId] = Bid({
            sender: msg.sender,
            receiver : _receiver,
            amount: msg.value,
            locked: true,
            bought:false,
            Id : bidId

        });

        emit TokensLocked(msg.sender, _receiver, msg.value, bidId, bids[bidId].bought);
    }
 

    // Gives deployed address of smart contract..
    function getAddress() internal view returns (address payable ) {
        return payable (address(this));
    }


    // Shows current contract balance..
    function showContractBalance() public view returns(uint256){
        return address(this).balance;
    }

    
    // This is an utility fucntion generating bidId..
    function generateBidId(uint256 randomValue) private pure returns (string memory) {
        bytes memory characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        bytes memory bidId = new bytes(16); 

        for (uint256 i = 0; i < bidId.length; i++) {
            bidId[i] = characters[randomValue % characters.length];
            randomValue /= characters.length;
        }

        return string(bidId);
    }
}








