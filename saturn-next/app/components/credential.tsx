'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const Credential = () => {
  const [isClient, setIsClient] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
      <motion.div
        ref={ref}
        style={{ opacity, scale }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Open Source DAO Governance</h2>
            <p className="text-xl">Uniting hearts with blockchain for a cause.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-base-200 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">Open Source Smart Contracts</h3>
              <p>Our smart contracts are fully open source, allowing for community review and contribution. This ensures transparency and continuous improvement of our blockchain infrastructure.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-base-200 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">DAO Governance on FLOW</h3>
              <p>We leverage the FLOW blockchain to implement a Decentralized Autonomous Organization (DAO) structure. This allows our community to participate in key decisions and shape the future of our charity initiatives.</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.a
              href="https://github.com/Saturn-Foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our GitHub
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
  );
};

export default Credential;
