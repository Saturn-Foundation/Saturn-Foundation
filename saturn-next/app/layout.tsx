import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia
} from 'wagmi/chains';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useEffect, useState } from "react";
import LayoutClient from "./layout-client";
// import { config } from '../config'




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html data-theme="retro" lang="en">
            <body
            // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              <LayoutClient>
              {children}
              </LayoutClient>
         
            </body>
    </html>
  );
}
