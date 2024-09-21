// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";

contract SaturnToken is ERC20, Ownable {
    using ByteHasher for bytes;

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;


    uint256 public distributionFrequency;
    uint256 public distributionAmount;
    address[] public participant_list;
    uint256 public lastDistributionTime;
    uint256 public constant TOKENS_PER_ETH = 1000;

    
    uint256 internal immutable actionId;

    constructor(
        uint256 _frequency, 
        uint256 _amount,
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId 
    ) ERC20("Saturn Token", "SRN") Ownable(msg.sender) {
        distributionFrequency = _frequency;
        distributionAmount = _amount;
        lastDistributionTime = block.timestamp;
        worldId = _worldId;

        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
        
    }

    function participate(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external {
        
        // simple verify
        require(!isParticipant(msg.sender), "Already a participant");

        // Verify WorldID proof
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        nullifierHashes[nullifierHash] = true;

        
        participant_list.push(msg.sender);
    }

    function isParticipant(address _address) public view returns (bool) {
        for (uint i = 0; i < participant_list.length; i++) {
            if (participant_list[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function distribute() external {
        require(block.timestamp >= lastDistributionTime + distributionFrequency, "Distribution not due yet");
        
        uint256 totalAmount = distributionAmount * participant_list.length;
        uint256 contractBalance = balanceOf(address(this));

        if (totalAmount > contractBalance) {
            uint256 amountPerParticipant = contractBalance / participant_list.length;
            for (uint i = 0; i < participant_list.length; i++) {
                _transfer(address(this), participant_list[i], amountPerParticipant);
            }
        } else {
            for (uint i = 0; i < participant_list.length; i++) {
                _transfer(address(this), participant_list[i], distributionAmount);
            }
        }

        lastDistributionTime = block.timestamp;
    }

    receive() external payable {
        mintTokensForEth(msg.sender, msg.value);
    }

    fallback() external payable {
        mintTokensForEth(msg.sender, msg.value);
    }

    function mintTokensForEth(address recipient, uint256 ethAmount) internal {
        uint256 tokenAmount = ethAmount * TOKENS_PER_ETH;
        _mint(recipient, tokenAmount);
    }

    function getEthBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function hashToField(bytes memory value) internal pure returns (uint256) {
        return uint256(keccak256(value)) >> 8;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

}
