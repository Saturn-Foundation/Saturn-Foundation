'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import { createPublicClient, http, createWalletClient, custom } from 'viem';
import { optimismSepolia } from 'viem/chains';

export const ParticipateBox = (proof: any) => {
  const [amount, setAmount] = useState('');
  const { address, isConnected } = useAccount();
  // const { chain } = useNetwork();
  const { sendTransaction } = useSendTransaction();

  const handleParticipate = () => {
    console.log("Proof: ", proof);
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
    const toAddress = '0x55f529544965Ab97afb4325dF5D8A9b08f9C58E5';



    // Create a public client
    const publicClient = createPublicClient({
      chain: optimismSepolia,
      transport: http()
    });

    // Create a wallet client
    const walletClient = createWalletClient({
      chain: optimismSepolia,
      transport: custom(window.ethereum)
    });

    // Create the contract instance
    const contract = {
      address: toAddress,
      abi: abi,
      publicClient,
      walletClient
    };

    
    // send transaction to the contract calling the function participate(), taking no arguments
    // address signal,
    //     uint256 root,
    //     uint256 nullifierHash,
    //     uint256[8] calldata proof
    sendTransaction({
      to: toAddress,
      data: `0x6817c76c${address?.slice(2)}${proof.proof.merkle_root.slice(2)}${proof.proof.nullifier_hash.slice(2)}${proof.proof.proof.slice(2)}`,
      // data: '0x6817c76c', // This is the function selector for participate()
      value: parseEther('0'), // No ETH is sent with this transaction
    });

    console.log(`Participating in the contract at ${toAddress}`);

    console.log(`Signing up to ${toAddress}`);
    // Reset amount after donation

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

