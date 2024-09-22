// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Contract.sol";
import "../src/interfaces/IWorldID.sol";

contract DeployContract is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Replace these with your actual values
        IWorldID worldId = IWorldID(vm.envAddress("WORLD_ID_ADDRESS")); // Replace with actual WorldID address
        string memory appId = vm.envString("WORLD_ID_APP_ID"); // Replace with your app ID
        string memory actionId = "verify-human"; // Replace with your action ID

        Contract newContract = new Contract(worldId, appId, actionId);

        console.log("Contract deployed at:", address(newContract));

        vm.stopBroadcast();
    }
}