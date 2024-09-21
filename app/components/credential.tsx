'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Credential = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
    <div className="bg-base-100 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Open Source DAO Governance</h2>
          <p className="text-xl">Empowering our community through transparent and decentralized decision-making</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-base-200 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4">Open Source Smart Contracts</h3>
            <p>Our smart contracts are fully open source, allowing for community review and contribution. This ensures transparency and continuous improvement of our blockchain infrastructure.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-base-200 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4">DAO Governance on FLOW</h3>
            <p>We leverage the FLOW blockchain to implement a Decentralized Autonomous Organization (DAO) structure. This allows our community to participate in key decisions and shape the future of our charity initiatives.</p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a href="https://github.com/your-organization" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            View Our GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Credential;
