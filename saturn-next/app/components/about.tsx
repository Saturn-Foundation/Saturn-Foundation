'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, scale }}
      className="hero min-h-[60vh] bg-base-100"
    >
      <div className="hero-content flex-col lg:flex-row">
        <motion.div
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
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
          initial={{ x: 50 }}
          whileInView={{ x: 0 }}
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
    </motion.div>
  );
};

export default About;
