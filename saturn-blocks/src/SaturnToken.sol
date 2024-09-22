// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";

contract SaturnToken is ERC20, Ownable {
    using ByteHasher for bytes;

    /// @notice Thrown when attempting to reuse a nullifier
	error DuplicateNullifier(uint256 nullifierHash);

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

    
    /// @param nullifierHash The nullifier hash for the verified proof
	/// @dev A placeholder event that is emitted when a user successfully verifies with World ID
	event Verified(uint256 nullifierHash);


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
        
        // Initialize the actionId
        actionId = abi.encodePacked(_actionId).hashToField();
    }

    // Add these event declarations at the contract level
    event ParticipationSuccessful(address participant);
    event ParticipationFailed(address participant, string reason);

    function participate(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        if (isParticipant(msg.sender)) {
            emit ParticipationFailed(msg.sender, "Already a participant");
            revert("Already a participant");
        }

        // First, we make sure this person hasn't done this before
		if (nullifierHashes[nullifierHash]) revert DuplicateNullifier(nullifierHash);

        // We now verify the provided proof is valid and the user is verified by World ID
		// worldId.verifyProof(
		// 	root,
		// 	groupId,
		// 	abi.encodePacked(signal).hashToField(),
		// 	nullifierHash,
		// 	externalNullifier,
		// 	proof
		// );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
		// nullifierHashes[nullifierHash] = true;
        // Verify WorldID proof
        try worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        ) {
            // Proof verification successful
        } catch Error(string memory reason) {
            emit ParticipationFailed(msg.sender, reason);
            revert(reason);
        } catch (bytes memory /*lowLevelData*/) {
            emit ParticipationFailed(msg.sender, "WorldID verification failed");
            revert("WorldID verification failed");
        }

        if (nullifierHashes[nullifierHash]) {
            emit ParticipationFailed(msg.sender, "Nullifier already used");
            revert("Nullifier already used");
        }

        nullifierHashes[nullifierHash] = true;
        emit Verified(nullifierHash);

        participant_list.push(msg.sender);

        
        
        emit ParticipationSuccessful(msg.sender);
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
