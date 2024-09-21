'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

export const PaymentBox = () => {
  const [amount, setAmount] = useState('');
  const { address, isConnected } = useAccount();
  // const { chain } = useNetwork();
  const { sendTransaction } = useSendTransaction();

  const handleDonate = () => {
    if (!isConnected || !amount) return;
    const toAddress = '0x55f529544965Ab97afb4325dF5D8A9b08f9C58E5';
    sendTransaction({
      to: toAddress,
      value: parseEther(amount),
    });
    console.log(`Donating ${amount} to ${toAddress}`);
    // Reset amount after donation
    setAmount('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-base-200 p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Contribute to Saturn Fund</h2>
      <p className="mb-4 text-center">You are funding global UBI at scale.</p>
      <div className="mb-4">
        <label htmlFor="amount" className="block mb-2">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter amount"
        />
      </div>
      <ConnectButton />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary w-full mt-4"
        onClick={handleDonate}
        disabled={!isConnected || !amount}
      >
        Deposit
      </motion.button>
      <p className="mt-4 text-sm text-center">
        All transactions are securely processed and transparently recorded on the blockchain.
      </p>
    </motion.div>
  );
};

export default PaymentBox;
// function useNetwork(): { chain: any; } {
//   throw new Error('Function not implemented.');
// }

