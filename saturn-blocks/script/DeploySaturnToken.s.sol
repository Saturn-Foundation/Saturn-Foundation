// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SaturnToken.sol";
import {IWorldID} from "world-id-contracts/src/interfaces/IWorldID.sol";

contract DeploySaturnToken is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address worldIdAddress = vm.envAddress("WORLD_ID_ADDRESS");
        uint256 groupId = vm.envUint("WORLD_ID_GROUP_ID");
        uint256 actionId = vm.envUint("WORLD_ID_ACTION_ID");

        vm.startBroadcast(deployerPrivateKey);

        uint256 frequency = 1 days;
        uint256 amount = 1 ether;
        IWorldID worldId = IWorldID(worldIdAddress);
        
        SaturnToken saturnToken = new SaturnToken(
            frequency,
            amount,
            worldId,
            groupId,
            actionId
        );

        vm.stopBroadcast();

        console.log("SaturnToken deployed at:", address(saturnToken));
    }
}