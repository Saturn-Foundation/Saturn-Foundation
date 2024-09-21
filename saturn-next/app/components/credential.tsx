'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const Credential = () => {
  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState("0%");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      const progressValue = `${Math.round(value * 160)}%`;
      setProgress(progressValue);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
    <>
    <motion.nav
        initial={{ height: "0vh" }}
        animate={{ height: progress }}
        transition={{ duration: 0, ease: "easeInOut" }}
        className="fixed left-0 top-0 bg-primary w-16 rounded-r-lg overflow-hidden"
      >
        <ul className="flex flex-col items-center justify-center h-full space-y-8">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </li>
        </ul>
      </motion.nav>
      <motion.div 
      ref={ref}
      style={{ opacity, scale }}
      className="py-16"
    >
      
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: progress }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-secondary h-2 rounded-full fixed top-0 left-0"
      />
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
    </>
   
  );
};

export default Credential;
