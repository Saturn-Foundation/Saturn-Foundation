'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

const NavBar: React.FC = () => {
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
    // useEffect(() => {
    //     // You might want to update the progress based on scroll or other factors
    //     // For now, let's set it to a fixed value as an example
    //     setProgress('100vh');
    // }, []);

    return (
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
    );
};

export default NavBar;