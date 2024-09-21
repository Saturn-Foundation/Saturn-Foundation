"use client";

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { type BaseError, useReadContract } from 'wagmi'


const Contribute = () => {

    const SATURN_CONTRACT_ADDRESS = "0x55f529544965Ab97afb4325dF5D8A9b08f9C58E5";



    const [saturnBalance, setSaturnBalance] = useState<string>('0');

    const {
        
        data: balance, 
        error,
        isPending
    } = useReadContract({
        
        functionName: 'balanceOf',
        args: [SATURN_CONTRACT_ADDRESS],
    })

    // if (isPending) return <div>Loading...</div>

    

    return (

        <div className="flex flex-col mx-12 my-12 h-screen">
            
            {/* @ts-ignore */}
            <p>Saturn Fund: 20ETH</p>
            <h1>Contribute</h1>
        </div>
    );
};

export default Contribute;