// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


import "./LayerA.sol";
import "./LayerB.sol";
import "./LayerC.sol";






// This the contract in sidechain which routes the bidIds to different layer...
// This contract also registers the relayer and routes them to layer according to their working capital capacity..

contract Router{

    uint256 private nonce;


    // This the structure of a relayer..
    struct Relayer{
        address relayer;
        uint256 minAmount;
        uint256 maxAmount;
        string relayerId;
        string assignedBidId;
        string name;
    }

    LayerA layerA;
    LayerB layerB;
    LayerC layerC;



    constructor(address payable layerAaddress,address payable layerBaddress,address payable layerCaddress){
        nonce = 1;
        layerA = LayerA(layerAaddress);
        layerB = LayerB(layerBaddress);
        layerC = LayerC(layerCaddress);

    }
    

    // Maps RelayerIds to Relayer Structure..
    mapping (string => Relayer) public Relayers;
    // Array of RelayerIds..
    string[] public ids;

    // Events occuring in router contract..

    // occurs when a bid from mainchain is routed to layers in sidechain..
    event BidRouted(string BidId);
    // occurs when a relayer registers itself and gets routed to corresponding layers..
    event RelayerRouted (string RelayerId);
    



    // Registers relayer to the chain and routes it.. 
    function setRelayer(string memory _name , uint256 _minAmount , uint256 _maxAmount) public {
        
        nonce++;
        uint256 randomValue = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce)));
        string memory RelayerId = generateRelayerId(randomValue);

        
        if (layerA.isRelayerExists(msg.sender) || layerB.isRelayerExists(msg.sender) || layerC.isRelayerExists(msg.sender)) {
            revert("Relayer already exists in one of the layers");
        }

        Relayers[RelayerId] = 
        Relayer({relayer : msg.sender, 
        minAmount : _minAmount, 
        maxAmount : _maxAmount, 
        assignedBidId : "none", 
        name : _name,relayerId:RelayerId}); 
        setLayer(RelayerId,Relayers[RelayerId].name,msg.sender);
        ids.push(RelayerId);
    }


    //  Utility function to generate relayerId..
     function generateRelayerId(uint256 randomValue) private pure returns (string memory) {
        bytes memory characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        bytes memory bidId = new bytes(16); 

        for (uint256 i = 0; i < bidId.length; i++) {
            bidId[i] = characters[randomValue % characters.length];
            randomValue /= characters.length;
        }

        return string(bidId);
    }






    // Utility function called by setRelayer function that routes the relayer into different layer according to their working asset capital...
    
    function setLayer(string memory _relayerId,string memory _name,address _relayer) internal{
            uint256 minimum_Amount = Relayers[_relayerId].minAmount;
            uint256 maximum_Amount = Relayers[_relayerId].maxAmount;
            if(minimum_Amount>=1 && maximum_Amount<5){
                layerA.addRelayer(_relayerId,_name,_relayer);
                emit RelayerRouted(_relayerId);
            }else if(minimum_Amount>=5 && maximum_Amount<10){
                layerB.addRelayer(_relayerId,_name,_relayer);
                emit RelayerRouted(_relayerId);

            }else if(minimum_Amount>=10 && maximum_Amount<15){
                layerC.addRelayer(_relayerId,_name,_relayer);
                emit RelayerRouted(_relayerId);

            }


    }

   
    // This function is called by an external script deployed that checks the amount associated with bid and routes it accordingly..
    function addBid(string memory _id, address _sender, address _receiver, uint256 _amount, bool _locked,bool _bought) external {
        if(_amount>=1 && _amount<5){
            layerA.addBid(_sender,_receiver,_amount,_locked,_bought,_id);
            emit BidRouted(_id);
        }
        else if(_amount>=5 && _amount<10){
            layerB.addBid(_sender,_receiver, _amount,_locked,_bought,_id);
            emit BidRouted(_id);

        }
        else if(_amount>=10 && _amount<15){
            layerC.addBid(_sender,_receiver, _amount,_locked,_bought,_id);
            emit BidRouted(_id);

        }
    }



}