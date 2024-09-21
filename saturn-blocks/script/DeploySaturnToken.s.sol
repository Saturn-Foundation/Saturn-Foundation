// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SaturnToken.sol";
import {IWorldID} from "../src/interfaces/IWorldID.sol";

contract DeploySaturnToken is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address worldIdAddress = vm.envAddress("WORLD_ID_ADDRESS");
        
        string memory appId = vm.envString("WORLD_ID_APP_ID");
        string memory actionId = vm.envString("WORLD_ID_ACTION_ID");

        vm.startBroadcast(deployerPrivateKey);

        uint256 frequency = 1 days;
        uint256 amount = 1 ether;
        IWorldID worldId = IWorldID(worldIdAddress);
        //IWorldID worldId;
        
        SaturnToken saturnToken = new SaturnToken(
            frequency,
            amount,
            worldId,
            appId,
            actionId
        );

        vm.stopBroadcast();

        console.log("SaturnToken deployed at:", address(saturnToken));
    }
}