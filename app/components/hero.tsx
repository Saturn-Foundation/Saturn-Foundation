'use client';

import { motion } from 'framer-motion';
import ThreeComponent from './ThreeComponent';

const Hero = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse h-full w-full">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Saturn Foundation</h1>
        <p className="py-6">
        Empowers communities to govern charity through a DAO, ensuring every action is accountable and impactful.
        </p>
      </div>

      <div className="h-[600px] w-full mr-40">
        <ThreeComponent/>
      </div>
    </div>
  </div>
  );
};

export default Hero;
