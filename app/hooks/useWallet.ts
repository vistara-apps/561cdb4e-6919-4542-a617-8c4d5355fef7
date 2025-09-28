'use client'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useState, useEffect } from 'react'

export function useWallet() {
  const { address, isConnected, connector } = useAccount()
  const { connect, connectors, error: connectError, isLoading } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({
    address: address,
  })

  const connectWallet = (connectorId: string) => {
    const connector = connectors.find(c => c.id === connectorId)
    if (connector) {
      connect({ connector })
    }
  }

  const disconnectWallet = () => {
    disconnect()
  }

  return {
    address,
    isConnected,
    connector,
    balance: balance?.formatted,
    connectWallet,
    disconnectWallet,
    connectors,
    connectError,
    isLoading,
  }
}

