// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/SaturnToken.sol";
import {IWorldID} from "../lib/world-id-contracts/src/interfaces/IWorldID.sol";

contract MockWorldID is IWorldID {
    function verifyProof(
        uint256,
        uint256,
        uint256,
        uint256,
        uint256,
        uint256[8] calldata
    ) external pure {
        // This mock always succeeds
    }
}

contract SaturnTokenTest is Test {
    SaturnToken public saturnToken;
    MockWorldID public mockWorldID;
    address public owner;
    address public user1;
    address public user2;

    uint256 constant DISTRIBUTION_FREQUENCY = 1 days;
    uint256 constant DISTRIBUTION_AMOUNT = 100 ether; // 100 tokens
    uint256 constant TOKENS_PER_ETH = 1000;

    function setUp() public {
        mockWorldID = new MockWorldID();
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);

        saturnToken = new SaturnToken(
            DISTRIBUTION_FREQUENCY,
            DISTRIBUTION_AMOUNT,
            mockWorldID,
            "app_id",
            "action_id"
        );

        // Mint some initial tokens to the contract
        saturnToken.mint(address(saturnToken), 1000000 ether);
    }

    function testInitialState() public {
        assertEq(saturnToken.distributionFrequency(), DISTRIBUTION_FREQUENCY);
        assertEq(saturnToken.distributionAmount(), DISTRIBUTION_AMOUNT);
        assertEq(saturnToken.lastDistributionTime(), block.timestamp);
    }

    function testParticipate() public {
        vm.prank(user1);
        saturnToken.participate(user1, 0, 0, new uint256[](8));
        assertTrue(saturnToken.isParticipant(user1));
    }

    function testCannotParticipateAgain() public {
        vm.startPrank(user1);
        saturnToken.participate(user1, 0, 0, new uint256[](8));
        vm.expectRevert("Already a participant");
        saturnToken.participate(user1, 0, 0, new uint256[](8));
        vm.stopPrank();
    }

    function testDistribute() public {
        vm.prank(user1);
        saturnToken.participate(user1, 0, 0, new uint256[](8));

        vm.prank(user2);
        saturnToken.participate(user2, 0, 1, new uint256[](8));

        vm.warp(block.timestamp + DISTRIBUTION_FREQUENCY + 1);

        saturnToken.distribute();

        assertEq(saturnToken.balanceOf(user1), DISTRIBUTION_AMOUNT);
        assertEq(saturnToken.balanceOf(user2), DISTRIBUTION_AMOUNT);
    }

    function testCannotDistributeEarly() public {
        vm.expectRevert("Distribution not due yet");
        saturnToken.distribute();
    }

    function testMintTokensForEth() public {
        uint256 ethAmount = 1 ether;
        uint256 expectedTokens = ethAmount * TOKENS_PER_ETH;

        vm.deal(user1, ethAmount);
        vm.prank(user1);
        (bool success,) = address(saturnToken).call{value: ethAmount}("");
        require(success, "ETH transfer failed");

        assertEq(saturnToken.balanceOf(user1), expectedTokens);
    }

    function testGetEthBalance() public {
        uint256 ethAmount = 1 ether;
        vm.deal(address(saturnToken), ethAmount);
        assertEq(saturnToken.getEthBalance(), ethAmount);
    }

    receive() external payable {}
}