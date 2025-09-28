'use client'

import { useWallet } from '../hooks/useWallet'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Wallet, LogOut, Loader2 } from 'lucide-react'

export function WalletConnect() {
  const {
    address,
    isConnected,
    balance,
    connectWallet,
    disconnectWallet,
    connectors,
    isLoading
  } = useWallet()

  if (isConnected && address) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wallet className="h-5 w-5" />
            Wallet Connected
          </CardTitle>
          <CardDescription>
            Connected to Base Network
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Address</p>
            <p className="text-sm font-mono bg-muted p-2 rounded">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </div>
          {balance && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Balance</p>
              <p className="text-sm font-mono bg-muted p-2 rounded">
                {parseFloat(balance).toFixed(4)} ETH
              </p>
            </div>
          )}
          <Button
            onClick={disconnectWallet}
            variant="outline"
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </CardTitle>
        <CardDescription>
          Connect your wallet to participate in FairGazer draws
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {connectors.map((connector) => (
          <Button
            key={connector.id}
            onClick={() => connectWallet(connector.id)}
            disabled={isLoading}
            className="w-full"
            variant="default"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Wallet className="h-4 w-4 mr-2" />
            )}
            {isLoading ? 'Connecting...' : `Connect ${connector.name}`}
          </Button>
        ))}
        <p className="text-xs text-muted-foreground text-center">
          By connecting, you agree to participate in provably fair draws
        </p>
      </CardContent>
    </Card>
  )
}

