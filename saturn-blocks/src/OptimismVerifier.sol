// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@layerzero-labs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";

contract OptimismVerifier is NonblockingLzApp {
    IWorldID internal immutable worldId;
    uint256 internal immutable externalNullifier;
    uint256 internal immutable groupId = 1;

    constructor(address _lzEndpoint, IWorldID _worldId, string memory _appId, string memory _actionId) NonblockingLzApp(_lzEndpoint) {
        worldId = _worldId;
        externalNullifier = abi.encodePacked(abi.encodePacked(_appId).hashToField(), _actionId).hashToField();
    }

    function _nonblockingLzReceive(uint16 _srcChainId, bytes memory _srcAddress, uint64 _nonce, bytes memory _payload) internal override {
        (address participant, address signal, uint256 root, uint256 nullifierHash, uint256[8] memory proof) = abi.decode(_payload, (address, address, uint256, uint256, uint256[8]));

        bool success = false;
        try worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        ) {
            success = true;
        } catch {
            success = false;
        }

        bytes memory returnPayload = abi.encode(success, participant);
        _lzSend(_srcChainId, returnPayload, payable(this), address(0x0), bytes(""), 0);
    }

    function hashToField(bytes memory value) internal pure returns (uint256) {
        return uint256(keccak256(value)) >> 8;
    }
}