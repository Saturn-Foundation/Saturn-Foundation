'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const PaymentBox = () => {
  const [amount, setAmount] = useState('');

  const handleDonate = () => {
    // TODO: Implement blockchain donation logic
    console.log(`Donating ${amount} to the charity`);
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
      <h2 className="text-2xl font-bold mb-4 text-center">Support Our Cause</h2>
      <p className="mb-4 text-center">Your donation helps us make a difference through blockchain technology.</p>
      <div className="mb-4">
        <label htmlFor="amount" className="block mb-2">Donation Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter amount"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary w-full"
        onClick={handleDonate}
        disabled={!amount}
      >
        Donate Now
      </motion.button>
      <p className="mt-4 text-sm text-center">
        All donations are securely processed and transparently recorded on the blockchain.
      </p>
    </motion.div>
  );
};

export default PaymentBox;
