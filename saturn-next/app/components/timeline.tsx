'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from "framer-motion";

const timelineEvents = [
  { year: 2023, title: "Foundation", description: "Launched our blockchain-based charity platform" },
  { year: 2024, title: "Global Expansion", description: "Partnered with international NGOs" },
  { year: 2025, title: "AI Integration", description: "Implemented AI for optimized fund allocation" },
  { year: 2026, title: "Decentralized Governance", description: "Introduced community-driven decision making" },
  { year: 2027, title: "Universal Impact", description: "Reached millions beneficiaries worldwide" },
];

const Timeline = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="py-24 bg-base-200 mt-40">
     
      <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
      <div className="container mx-auto px-4">
  
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.year}
            className="flex flex-col md:flex-row mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex-1 md:text-right md:pr-8">
              <motion.div
                className="text-3xl font-bold text-primary"
                whileHover={{ scale: 1.1 }}
              >
                {event.year}
              </motion.div>
            </div>
            <div className="w-px bg-primary mx-4 relative">
              <motion.div
                className="w-4 h-4 bg-primary rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                whileHover={{ scale: 1.5 }}
              />
            </div>
            <div className="flex-1 md:pl-8">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-base-content">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
