'use client';

import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="py-6">
            We are a pioneering charity blockchain tech company dedicated to revolutionizing the non-profit sector. Our mission is to leverage cutting-edge blockchain technology to enhance transparency, efficiency, and trust in charitable organizations worldwide.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Learn More
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2"
        >
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Our Impact</h2>
              <ul className="list-disc list-inside">
                <li>Enhanced transparency in donations</li>
                <li>Improved fund allocation efficiency</li>
                <li>Reduced operational costs for charities</li>
                <li>Increased donor trust and engagement</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
