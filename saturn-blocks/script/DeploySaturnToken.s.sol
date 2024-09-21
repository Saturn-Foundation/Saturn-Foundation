// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SaturnToken.sol";

contract DeploySaturnToken is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address lzEndpoint = vm.envAddress("LZ_ENDPOINT");

        vm.startBroadcast(deployerPrivateKey);

        SaturnToken token = new SaturnToken(
            lzEndpoint
        );

        console.log("SaturnToken deployed at:", address(token));

        vm.stopBroadcast();
    }
}