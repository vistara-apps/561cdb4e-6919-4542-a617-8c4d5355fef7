'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { base } from 'viem/chains'

// Base network configuration
const baseChain = {
  ...base,
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
    },
    public: {
      http: ['https://mainnet.base.org'],
    },
  },
}

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: baseChain,
    transport: http(),
  }),
  connectors: [
    new CoinbaseWalletConnector({
      chains: [baseChain],
      options: {
        appName: 'FairGazer',
        appLogoUrl: '/favicon.ico',
      },
    }),
    new InjectedConnector({
      chains: [baseChain],
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
})

interface WalletProviderProps {
  children: React.ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  )
}

