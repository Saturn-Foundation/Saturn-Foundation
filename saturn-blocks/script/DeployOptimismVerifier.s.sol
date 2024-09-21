// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;

// import "forge-std/Script.sol";
// import "../src/OptimismVerifier.sol";

// contract DeployOptimismVerifier is Script {
//     function run() external {
//         uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
//         address lzEndpoint = vm.envAddress("LZ_ENDPOINT");
//         address worldIdAddress = vm.envAddress("WORLD_ID_ADDRESS");
//         string memory appId = vm.envString("APP_ID");
//         string memory actionId = vm.envString("ACTION_ID");

//         vm.startBroadcast(deployerPrivateKey);

//         OptimismVerifier verifier = new OptimismVerifier(
//             lzEndpoint,
//             IWorldID(worldIdAddress),
//             appId,
//             actionId
//         );

//         console.log("OptimismVerifier deployed at:", address(verifier));

//         vm.stopBroadcast();
//     }
// }