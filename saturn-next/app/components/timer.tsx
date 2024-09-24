'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Timer = () => {
  const [funds, setFunds] = useState(1000000); // Initial fund amount
  const [donors, setDonors] = useState(500); // Initial number of donors
  const [projects, setProjects] = useState(10); // Initial number of projects

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate fund increase
      setFunds(prevFunds => prevFunds + Math.floor(Math.random() * 1000));
      // Simulate new donors
      setDonors(prevDonors => prevDonors + Math.floor(Math.random() * 5));
      // Simulate new projects (less frequently)
      if (Math.random() < 0.1) {
        setProjects(prevProjects => prevProjects + 1);
      }
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg py-16 mt-20 ">
      <h2 className="text-2xl font-bold mb-4">DAO Governance Stats</h2>
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          className="stat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="stat-title">Total Funds</div>
          <motion.div
            className="stat-value"
            key={funds}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            ${funds.toLocaleString()}
          </motion.div>
        </motion.div>

        <motion.div
          className="stat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="stat-title">Donors</div>
          <motion.div
            className="stat-value"
            key={donors}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {donors.toLocaleString()}
          </motion.div>
        </motion.div>

        <motion.div
          className="stat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="stat-title">Active Projects</div>
          <motion.div
            className="stat-value"
            key={projects}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {projects}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timer;
