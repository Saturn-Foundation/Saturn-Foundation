'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ThreeComponent from './ThreeComponent';
import PaymentBox from './payment';
import VerifyBox from './verify';
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import Link from 'next/link';

const Hero = () => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [isLogo, setIsLogo] = useState(false);
  const [isVefiry, setIsVerify] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  // TODO: Calls your implemented server route
  const handleVerify = async (proof: ISuccessResult) => {
    console.log("this is hanlde verify ", proof);
    // const res = await fetch("/api/verify", { // route to your backend will depend on implementation
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(proof),
    // })
    // if (!res.ok) {
    //     throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    // }
  };

  // TODO: Functionality after verifying
  const onSuccess = () => {
    console.log("Success")
  };
  const handleLaunch = () => {
    setIsLaunched(true);
    // Add your series of actions here
    console.log('Rocket launched!');
    setTimeout(() => {
      setIsLogo(true);
    }, 1000);
    setTimeout(() => {
      setIsVerify(true);
    }, 2000);
    // Example: setTimeout(() => { /* perform action */ }, 1000);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">

      <div className="hero-content flex-col lg:flex-row-reverse h-full w-full">
        <div className="text-center lg:text-left">

          <h1 className="text-5xl font-bold whitespace-nowrap">Saturn Foundation</h1>
          <p className="py-6 text-4xl">
            Enabling UBI on the global scale.</p>
          <div className="flex items-center space-x-16 mt-4 relative">
            <motion.div
              initial={{ x: 0 }}
              animate={isLaunched ? { x: '100%' } : isLogo ? { x: '-100%', opacity: 0 } : { x: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={handleLaunch}
              className="cursor-pointer p-2 rounded-lg inline-block"
            >

              <motion.img
                src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/rocket-svgrepo-com.svg?t=2024-09-21T13%3A56%3A31.897Z"
                alt="Saturn"
                width="50"
                height="50"
                style={{ transform: 'rotate(45deg)' }}
                initial={{ x: 0, rotate: 45 }}
                animate={isLogo ? { x: '100%', opacity: 0, rotate: 45 } : { x: 0, opacity: 1, rotate: 45 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />


              {/* <img
                src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/rocket-svgrepo-com.svg?t=2024-09-21T13%3A56%3A31.897Z"
                alt="Rocket"
                width="50"
                height="50"
                style={{ transform: 'rotate(45deg)' }}
              /> */}
            </motion.div>
            <motion.img
              src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/saturn-svgrepo-com.svg?t=2024-09-21T14%3A09%3A39.606Z"
              alt="Saturn"
              width="50"
              height="50"
              initial={{ x: 0 }}
              animate={isLogo ? { x: '100%', opacity: 0 } : { x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            {isLogo && (
              <div className="flex justify-between items-center w-full">
                {isVefiry && (
                  <div className="flex-start">
                    <IDKitWidget
                      app_id="app_3dd0a307d4d88ccd91448e9319bc0916"
                      action="verify-human"
                      // On-chain only accepts Orb verifications
                      verification_level={VerificationLevel.Device}
                      handleVerify={handleVerify}
                      // signal="0x8aB0e8b986cB26aC6363f43Fd79E8f92821bDc92" 
                      onSuccess={onSuccess}>
                      {({ open }) => (
                        <button
                          onClick={open}
                          className="btn btn-primary"
                        >
                          Verify with World ID
                        </button>
                      )}
                    </IDKitWidget>
                  </div>
                )}
                <div className="flex-end">
                  <motion.img
                    src="https://tzqzzuafkobkhygtccse.supabase.co/storage/v1/object/public/biz_touch/crypto-ql/saturn-svgrepo-com.svg?t=2024-09-21T14%3A09%3A39.606Z"
                    alt="New Logo"
                    width="100"
                    height="100"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>
              </div>
            )}
          </div>
          <Link href="/contribute">
            <button

              className="btn btn-primary mt-4  w-2/4 "
            >
              Contribute
            </button>
          </Link>
        </div>
        <div className="h-[600px] w-full mr-40">
          <ThreeComponent />
        </div>
      </div>

      {isPayment && (
        <div className={`modal modal-open`}>
          <div className="modal-box">
            <PaymentBox />
            {/* <VerifyBox setIsPayment={setIsPayment} setIsVerified={setIsVerify}/> */}

            {/* <h3 className="font-bold text-lg">Payment Modal</h3>
            <p className="py-4">This is the payment modal content.</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsPayment(false)}>Close</button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
