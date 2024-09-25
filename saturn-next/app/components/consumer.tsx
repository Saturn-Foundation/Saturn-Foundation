'use client';

import { motion } from 'framer-motion';

const Consumer = () => {
    let sponsors = [
        { name: "", logo: "https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/theme/DanAi.png?t=2024-09-25T15%3A25%3A37.628Z" },
        { name: "", logo: "https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/theme/biztouch.png?t=2024-09-25T15%3A25%3A46.550Z" },
        { name: "", logo: "https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/theme/faceBook.svg?t=2024-09-25T15%3A25%3A54.850Z" },
        { name: "", logo: "https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/theme/instargram.svg?t=2024-09-25T15%3A26%3A01.143Z" },
        { name: "", logo: "https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/theme/tiktok.svg?t=2024-09-25T15%3A26%3A07.198Z" }
    ];
    return (
        <div className="container mx-auto p-20">
            {/* First row: 2 columns */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-transparent text-black p-4 rounded-lg col-span-2 rounded-2xl">
                    <h2 className="text-5xl font-bold mb-2">Saturn Foundation</h2>
                    <h2 className="text-5xl font-bold mb-6">The World's First On-Chain UBI.</h2>
                    <p className="text-lg">Global creative community of amazing humans, worldwide brands, bold founders, supportive investors and ingenious developers, designing the people's internet.</p>
                </div>
                <div className="card bg-primary text-black shadow-xl rounded-2xl">
                    <div className="card-body flex flex-col items-center justify-center text-center">
                        <h2 className="card-title">Contributors</h2>
                        <p className="text-5xl font-bold">10,000+</p>
                        <p className="text-2sm mt-2">Active controbutors on our platform</p>
                    </div>
                </div>
            </div>

            {/* Second row: 3 columns */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="card bg-gradient-to-r from-secondary to-accent text-black shadow-xl rounded-2xl">
                    <div className="card-body flex flex-col items-center justify-center text-center">
                        <h2 className="card-title">Sponsors</h2>
                        <p className="text-5xl font-bold">7,000+</p>
                        <p className="text-2sm mt-2">Active sponsors on our platform</p>
                    </div>
                </div>
                <div className="card bg-gradient-to-r from-primary to-accent text-black shadow-xl rounded-2xl">
                    <div className="card-body flex flex-col items-center justify-center text-center">
                        <h2 className="card-title">Total Funds</h2>
                        <p className="text-5xl font-bold">10Eth</p>
                        <p className="text-2sm mt-2">Total funds on our platforms</p>
                    </div>
                </div>
                <div className="card bg-gradient-to-r from-secondary to-accent text-black shadow-xl rounded-2xl">
                    <div className="card-body flex flex-col items-center justify-center text-center">
                        <h2 className="card-title">Total Participants</h2>
                        <p className="text-5xl font-bold">6,000,000+</p>
                        <p className="text-2sm mt-2">Active users on our platform</p>
                    </div>
                </div>
            </div>

            <div className="bg-black rounded-2xl">
                {/* Third row: 4 columns */}
                <div className="grid grid-cols-4 gap-1 mb-2">
                    <div className="card text-white shadow-sm p-0.5 border-r border-white">
                        <div className="card-body flex flex-col items-center justify-center text-center">
                            <p className="text-xs mt-0.5">TRANSACTIONS</p>
                            <p className="text-3xl font-bold">16,000,000+</p>
                        </div>
                    </div>
                    <div className="card text-white shadow-sm p-0.5 border-r border-white">
                        <div className="card-body flex flex-col items-center justify-center text-center">
                            <p className="text-xs mt-0.5">DROPS</p>
                            <p className="text-3xl font-bold">36000+</p>
                        </div>
                    </div>
                    <div className="card text-white shadow-sm p-0.5 border-r border-white">
                        <div className="card-body flex flex-col items-center justify-center text-center">
                            <p className="text-xs mt-0.5">PAID TOTAL</p>
                            <p className="text-3xl font-bold">$1,000,000+</p>
                        </div>
                    </div>
                    <div className="card text-white shadow-sm p-0.5">
                        <div className="card-body flex flex-col items-center justify-center text-center">
                            <p className="text-xs mt-0.5">EQUIVALENT & COMPATIBLE WITH</p>
                            <p className="text-3xl font-bold">EVN</p>
                        </div>
                    </div>
                </div>

                {/* White line divider */}
                <div className="border-t border-white my-2"></div>

                {/* Fourth row: 2 columns with second column as a slider */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-white p-4 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-bold">Discover some of our brand partners:</span>
                    </div>
                    <div className="text-white p-4 rounded-lg overflow-hidden col-span-2">
                        <motion.div
                            className="whitespace-nowrap flex items-center space-x-16"
                            initial={{ x: '100%' }}
                            animate={{ x: '-100%' }}
                            transition={{
                                repeat: Infinity,
                                duration: 30,
                                ease: 'linear',
                            }}
                        >
                            {sponsors.map((sponsor, index) => (
                                <img
                                    key={index}
                                    src={sponsor.logo}
                                    alt={`Brand Logo ${index + 1}`}
                                    className="h-12"
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Consumer;
