// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SaturnToken.sol";
import "../src/interfaces/IWorldID.sol";

contract DeploySaturnToken is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Set deployment parameters
        uint256 distributionFrequency = 7 days; // Example: 1 week
        uint256 distributionAmount = 100 * 1e18; // Example: 100 tokens
        address worldIdAddress = vm.envAddress("WORLD_ID_ADDRESS"); // Replace with actual WorldID contract address
        string memory appId = vm.envString("WORLD_ID_APP_ID"); // Replace with your actual app ID
        string memory actionId = "participate"; // Replace with your actual action ID

        // Deploy SaturnToken contract
        SaturnToken saturnToken = new SaturnToken(
            distributionFrequency,
            distributionAmount,
            IWorldID(worldIdAddress),
            appId,
            actionId
        );

        console.log("SaturnToken deployed at:", address(saturnToken));

        vm.stopBroadcast();
    }
}