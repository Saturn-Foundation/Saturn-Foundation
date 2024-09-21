'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IDKitWidget } from '@worldcoin/idkit'

const VerifyBox = ({ setIsVerified, setIsPayment }: { setIsVerified: React.Dispatch<React.SetStateAction<boolean>>, setIsPayment: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [amount, setAmount] = useState('');

  const onSuccess = () => {
    console.log("success verify");
    setIsVerified(false);
    setIsPayment(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-base-200 p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >

      <h2 className="text-2xl font-bold mb-4 text-center">Governance DAO Submission</h2>
      <p className="mb-4 text-center">You're officially about to enroll as a Saturn Foundation Governor.</p>


      <div className="relative z-50">
        <IDKitWidget
          app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT" // obtained from the Developer Portal
          action="vote_1" // this is your action name from the Developer Portal
          signal="user_value" // any arbitrary value the user is committing to, e.g. a vote
          onSuccess={onSuccess}
          // verification_level="device" // minimum verification level accepted, defaults to "orb"
        >
          {({ open }) => {
            return (<button
              onClick={open}
              className="btn btn-primary"
            >
              Verify with World ID
            </button>)
          }
          }
        </IDKitWidget>
      </div>

      {/* <div className="mb-4">
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
      <ConnectButton />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary w-full"
        onClick={handleDonate}
        disabled={!amount}
      >
        Donate Now
      </motion.button> */}

      <p className="mt-4 text-sm text-center">
        All donations are securely processed and transparently recorded on the blockchain.
      </p>
    </motion.div>
  );
};

export default VerifyBox;
