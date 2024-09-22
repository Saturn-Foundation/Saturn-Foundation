'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useSendTransaction } from 'wagmi';
import { parseEther, hexToBigInt } from 'viem';

import { useWriteContract } from 'wagmi'

export const ParticipateBox = (proof: any) => {
  const [amount, setAmount] = useState('');
  const { address, isConnected } = useAccount();
  // const { chain } = useNetwork();
  const { sendTransaction } = useSendTransaction();
  

  const { 
    writeContractAsync
  } = useWriteContract()

  const handleParticipate = async () => {
    if (!isConnected) return;

    const abi = [
      {
        name: "participate",
        type: "function",
        inputs: [
          { name: "signal", type: "address" },
          { name: "root", type: "uint256" },
          { name: "nullifierHash", type: "uint256" },
          { name: "proof", type: "uint256[8]" }
        ],
        outputs: [],
        stateMutability: "nonpayable"
      }
    ];

    try {
      console.log("Calling contract...");
      console.log(proof.proof.proof);
      const result = await writeContractAsync({
        address: '0x56A1D262A3aC373219451476d84999369a6E6357',
        abi,
        functionName: 'participate',
        args: [
          address, // signal
          BigInt(proof.proof.merkle_root), // root
          BigInt(proof.proof.nullifier_hash), // nullifierHash
          [
            BigInt(proof.proof.proof[0]),
            BigInt(proof.proof.proof[1]),
            BigInt(proof.proof.proof[2]),
            BigInt(proof.proof.proof[3]),
            BigInt(proof.proof.proof[4]),
            BigInt(proof.proof.proof[5]),
            BigInt(proof.proof.proof[6]),
            BigInt(proof.proof.proof[7]),
          ] // proof
            
         
        ],
      });

      console.log("Transaction hash:", result);
    } catch (error) {
      console.error("Error calling contract:", error);
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

