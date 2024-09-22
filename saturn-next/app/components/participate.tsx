'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useSendTransaction } from 'wagmi';
import { parseEther, hexToBigInt } from 'viem';
import { decodeErrorResult } from 'viem';

import { decodeAbiParameters, parseAbiParameters } from 'viem'

import { useWriteContract } from 'wagmi'

// Helper function to safely convert to BigInt
function safeBigInt(value: string | number | bigint): bigint {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'number') return BigInt(value);
  if (typeof value === 'string') {
    // Remove '0x' prefix if present
    const cleanValue = value.startsWith('0x') ? value.slice(2) : value;
    return BigInt(`0x${cleanValue}`);
  }
  throw new Error(`Cannot convert ${value} to BigInt`);
}

export const ParticipateBox = (proof: any) => {
  const [amount, setAmount] = useState('');
  const { address, isConnected } = useAccount();
  // const { chain } = useNetwork();
  const { sendTransaction } = useSendTransaction();


  const {
    writeContractAsync
  } = useWriteContract()

  const abi = [
    {
      type: "constructor",
      inputs: [
        { name: "_frequency", type: "uint256" },
        { name: "_amount", type: "uint256" },
        { name: "_worldId", type: "address" },
        { name: "_appId", type: "string" },
        { name: "_actionId", type: "string" }
      ],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "participate",
      inputs: [
        { name: "signal", type: "address" },
        { name: "root", type: "uint256" },
        { name: "nullifierHash", type: "uint256" },
        { name: "proof", type: "uint256[8]" }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "isParticipant",
      inputs: [{ name: "_address", type: "address" }],
      outputs: [{ name: "", type: "bool" }],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "distribute",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "getEthBalance",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "mint",
      inputs: [
        { name: "to", type: "address" },
        { name: "amount", type: "uint256" }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "event",
      name: "Verified",
      inputs: [{ name: "nullifierHash", type: "uint256", indexed: false }],
      anonymous: false
    },
    {
      type: "event",
      name: "ParticipationSuccessful",
      inputs: [{ name: "participant", type: "address", indexed: false }],
      anonymous: false
    },
    {
      type: "event",
      name: "ParticipationFailed",
      inputs: [
        { name: "participant", type: "address", indexed: false },
        { name: "reason", type: "string", indexed: false }
      ],
      anonymous: false
    },
    {
      type: "error",
      name: "DuplicateNullifier",
      inputs: [{ name: "nullifierHash", type: "uint256" }]
    },
    {
      type: "error",
      name: "InvalidNullifier",
      inputs: []
    }
  ];

  const handleParticipate = async () => {
    if (!isConnected) return;

    try {
      console.log("Calling contract with parameters:");
      console.log("Address:", address);
      console.log("Merkle Root:", proof.merkle_root);
      console.log("Nullifier Hash:", proof.nullifier_hash);
      console.log("Proof:", proof.proof);

      const result = await writeContractAsync({
        address: '0x56A1D262A3aC373219451476d84999369a6E6357',
        abi,
        functionName: 'participate',
        args: [
          address, // signal
          BigInt(proof.merkle_root), // root
          BigInt(proof.nullifier_hash), // nullifierHash
          proof.proof.map((p: string) => BigInt(p)) // proof
        ],
      });

      console.log("Transaction hash:", result);
    } catch (error: any) {
      console.error("Error calling contract:", error);
      if (error.cause?.data) {
        try {
          const decodedError = decodeErrorResult({
            abi,
            data: error.cause.data,
          })
          console.error("Decoded error:", decodedError)
        } catch (decodeError) {
          console.error("Failed to decode error:", decodeError)
        }
      }
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-base-200 p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Sign up to ABI</h2>
      <p className="mb-4 text-center">Simply click the below button and you're good.</p>
      {/* <div className="mb-4">
        <button className="btn btn-primary w-full">Particiate</button>
      </div> */}
      <ConnectButton />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary w-full mt-4"
        onClick={handleParticipate}
        disabled={!isConnected}
      >
        Sign up to UBI
      </motion.button>
      <p className="mt-4 text-sm text-center">
        All transactions are securely processed and transparently recorded on the blockchain.
      </p>
    </motion.div>
  );
};

export default ParticipateBox;
// function useNetwork(): { chain: any; } {
//   throw new Error('Function not implemented.');
// }

