// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "../lib/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";

contract SaturnToken is ERC20, Ownable, NonblockingLzApp {

    uint256 public distributionFrequency;
    uint256 public distributionAmount;
    address[] public participant_list;
    uint256 public lastDistributionTime;
    uint256 public constant TOKENS_PER_ETH = 1000;

    uint16 public constant OPTIMISM_CHAIN_ID = 10; // LayerZero chain ID for Optimism

    address public optimismVerifierAddress;

    constructor(address _lzEndpoint, address _optimismVerifierAddress) ERC20("Saturn Token", "SRN") Ownable(msg.sender) NonblockingLzApp(_lzEndpoint) {
        // Set default values or use setter functions later
        distributionFrequency = 1 days; // Default to daily distribution
        distributionAmount = 100 * 10**decimals(); // Default to 100 tokens
        lastDistributionTime = block.timestamp;
        optimismVerifierAddress = _optimismVerifierAddress;
    }

    // Add setter functions for distributionFrequency and distributionAmount
    function setDistributionFrequency(uint256 _frequency) external onlyOwner {
        distributionFrequency = _frequency;
    }

    function setDistributionAmount(uint256 _amount) external onlyOwner {
        distributionAmount = _amount;
    }

    function setOptimismVerifierAddress(address _newAddress) external onlyOwner {
        optimismVerifierAddress = _newAddress;
    }

    function participate(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external payable {
        require(!isParticipant(msg.sender), "Already a participant");

        bytes memory payload = abi.encode(msg.sender, signal, root, nullifierHash, proof);
        _lzSend(OPTIMISM_CHAIN_ID, payload, payable(optimismVerifierAddress), address(0x0), bytes(""), msg.value);
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

    function _nonblockingLzReceive(uint16 _srcChainId, bytes memory _srcAddress, uint64 _nonce, bytes memory _payload) internal override {
        require(_srcChainId == OPTIMISM_CHAIN_ID, "Invalid source chain");
        
        (bool success, address participant) = abi.decode(_payload, (bool, address));
        
        if (success) {
            participant_list.push(participant);
        }
    }

}
