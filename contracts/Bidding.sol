// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LayerA.sol";
import "./LayerB.sol";
import "./LayerC.sol";


contract Bidding{

    
    LayerA layerA;
    LayerB layerB;
    LayerC layerC;

    address payable layera;
    address payable layerb;
    address payable layerc;


    constructor(address payable layerAaddress,address payable layerBaddress,address payable layerCaddress){
        layerA = LayerA(layerAaddress);
        layerB = LayerB(layerBaddress);
        layerC = LayerC(layerCaddress);
        layera = layerAaddress;
        layerb = layerBaddress;
        layerc = layerCaddress;
    }
    
    

    // Relayer interacts with this function to see the available bids in their layer..
    function showBids() public view returns(string[] memory){
        
        string[] memory emptyArray;
        //require(layerA.RelayerAdToId(relayer) != "", "Not a relayer");
        address relayer = msg.sender;

         if (bytes(layerA.RelayerAdToId(relayer)).length != 0) {
            emptyArray = layerA.getBids();
            return emptyArray;
        }
        else if (bytes(layerB.RelayerAdToId(relayer)).length != 0) {
            emptyArray = layerB.getBids();
            return emptyArray;
        }
        else if (bytes(layerC.RelayerAdToId(relayer)).length != 0) {
            emptyArray = layerC.getBids();
            return emptyArray;
        }
        else{
            return emptyArray;
        }
        
    }



    // this contract enables the relayers to buy the bids

    function bid(string memory bidId) public payable {
        address relayer = msg.sender;
    

        if (bytes(layerA.RelayerAdToId(relayer)).length != 0) {
            layera.transfer(msg.value);
            layerA.placeBid(bidId,msg.sender,msg.value);
        } else if (bytes(layerB.RelayerAdToId(relayer)).length != 0) {
            layerb.transfer(msg.value);

            layerB.placeBid(bidId, msg.sender,msg.value);
        } else if (bytes(layerC.RelayerAdToId(relayer)).length != 0) {
            layerC.placeBid(bidId, msg.sender,msg.value);
        } else {
            revert("Relayer not found in any layer");
        }
    }


}