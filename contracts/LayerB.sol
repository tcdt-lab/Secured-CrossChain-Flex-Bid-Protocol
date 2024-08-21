// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract LayerB {
    struct RelayerB {
        address relayer;
        string relayerId;
        string assignedBidId;
        string name;
    }
    struct Bid {
        address sender;
        address receiver;
        uint256 amount;
        bool locked;
        bool bought;
        string Id;
    }



   string[] private Relayers; // Array of RelayerIds
    string[] public Bids;  // Array of BidIds
    mapping(string => RelayerB) public RelayersB;  // Maps relayerId to Relayer structure
    mapping(string => Bid) public BidsMap;  // Maps bidIds to Bid
    mapping(address => string) public RelayerAdToId;  // Maps relayer address to relayerId
    mapping(string => uint256) public lockedStakesForBidId; // Stores locked stakes for each bidId
    mapping(string => string[]) public bidRelayers; // Stores bids for each relayer





    event Received(address sender, uint256 amount);
    event bidPlaced(address relayer, string bidId);
    event relayerAdded(address relayer, string relayerId);
    event bidAddedToLayer(string bidId);
    event challengeResolved(string bidId, address _challenger);




    // Gives the list of relayer ids present in the current layer
    function getRelayers() public view returns (string[] memory) {
        return Relayers;
    }

    // Gives the list of bid ids present in the current layer
    function getBids() external view returns (string[] memory) {
        return Bids;
    }

    function bidgetter(string memory _id) external view returns (uint256){
        return lockedStakesForBidId[_id];
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }



    // This fucntion is called by the router contract that adds relayer to a certain layer
    function addRelayer(
        string memory _id,
        string memory _name,
        address _relayer
    ) external {
        RelayersB[_id] = RelayerB({
            relayer: msg.sender,
            relayerId: _id,
            assignedBidId: "null",
            name: _name
        });
        Relayers.push(_id);
        RelayerAdToId[_relayer] = _id;
        emit relayerAdded(_relayer, _id);
    }





    // This function is called by the router contract that adds bids to a certain layer
    function addBid(
        address _sender,
        address _receiver,
        uint256 _amount,
        bool _locked,
        bool _bought,
        string memory _id
    ) external {
        BidsMap[_id] = Bid({
            sender: _sender,
            receiver: _receiver,
            amount: _amount,
            locked: _locked,
            bought: _bought,
            Id: _id
        });
        Bids.push(_id);
        emit bidAddedToLayer(_id);
    }



    // Relayer intreacts with this function from bidding smart contract to buy a bid with the stake..

    function placeBid(
        string memory bidId,
        address relayer,
        uint256 _amount
    ) public {
        string memory bidIdStr = string(abi.encodePacked(bidId));
        require(bytes(RelayerAdToId[relayer]).length != 0, "Relayer not found");
        // require(RelayersA[RelayerAdToId[relayer]].assignedBidId  , "Relayer already has a bid");
        require(
            RelayersB[RelayerAdToId[relayer]].relayer == msg.sender,
            "Only the relayer can place bid"
        );
        require(
            _amount > BidsMap[bidIdStr].amount,
            "Amount should be greater than the transaction amount."
        );
        require(BidsMap[bidIdStr].locked == false, "Bid is locked");
        require(BidsMap[bidIdStr].bought == false, "Bid is already bought");

        BidsMap[bidIdStr].bought = true;
        RelayersB[RelayerAdToId[relayer]].assignedBidId = bidIdStr;
        bidRelayers[RelayerAdToId[relayer]].push(bidId);
        lockedStakesForBidId[bidIdStr] = _amount;
        emit bidPlaced(relayer, bidId);
    }


    function isRelayerExists(address _relayer) public view returns (bool) {
        return bytes(RelayerAdToId[_relayer]).length != 0;
    }

     // This function is externally called by a script to resolve a valid challenge.
    function resolveChallenge(string memory _bidId, address payable _challenger) external {
        emit challengeResolved(_bidId,_challenger);
    }
}
