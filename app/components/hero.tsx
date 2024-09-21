'use client';

import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-base-200 pt-60">
      <div className="hero-content text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md"
        >
          <h1 className="text-5xl font-bold">Tech for Good</h1>
          <p className="py-6">Empowering charitable causes through blockchain technology. We're revolutionizing transparency and efficiency in the non-profit sector.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-primary rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
