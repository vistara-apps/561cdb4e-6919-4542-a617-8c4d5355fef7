'use client'

import { useState } from 'react'
import { WalletConnect } from './WalletConnect'
import { Marketplace } from './Marketplace'
import { DrawsList } from './DrawsList'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  Home,
  ShoppingBag,
  Trophy,
  History,
  User,
  Menu,
  X,
  Sparkles
} from 'lucide-react'

type TabType = 'home' | 'marketplace' | 'draws' | 'history' | 'profile'

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'marketplace' as TabType, label: 'Marketplace', icon: ShoppingBag },
    { id: 'draws' as TabType, label: 'Draws', icon: Trophy },
    { id: 'history' as TabType, label: 'History', icon: History },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent />
      case 'marketplace':
        return <Marketplace />
      case 'draws':
        return <DrawsList />
      case 'history':
        return <DrawHistory />
      case 'profile':
        return <Profile />
      default:
        return <HomeContent />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">FairGazer</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </Button>
                )
              })}
            </nav>

            {/* Wallet Connect */}
            <div className="flex items-center gap-4">
              <WalletConnect />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      onClick={() => {
                        setActiveTab(tab.id)
                        setMobileMenuOpen(false)
                      }}
                      className="justify-start"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </Button>
                  )
                })}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 FairGazer. Win Digital Treasures with Blockchain-Guaranteed Fairness.</p>
            <p className="mt-2">Built on Base • Provably Fair • Decentralized</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Placeholder components for other tabs
function HomeContent() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Win Digital Treasures with{' '}
          <span className="text-primary">Blockchain</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          FairGazer brings provably fair draws to the world of digital goods.
          Participate in transparent, decentralized draws for NFTs, gift cards, and gaming items.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => document.querySelector('[data-tab="draws"]')?.click()}>
            <Trophy className="h-5 w-5 mr-2" />
            Enter Draws
          </Button>
          <Button size="lg" variant="outline" onClick={() => document.querySelector('[data-tab="marketplace"]')?.click()}>
            <ShoppingBag className="h-5 w-5 mr-2" />
            Browse Prizes
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Provably Fair</h3>
            <p className="text-muted-foreground">
              Every draw uses cryptographic methods to ensure complete fairness and transparency.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <ShoppingBag className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Amazing Prizes</h3>
            <p className="text-muted-foreground">
              Win NFTs, gift cards, gaming items, and exclusive digital collectibles.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">On Base</h3>
            <p className="text-muted-foreground">
              Built on Base for fast, low-cost transactions and seamless user experience.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DrawHistory() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Draw History</h1>
      <p className="text-muted-foreground">
        View past draws and verify their fairness
      </p>
      <Card>
        <CardContent className="p-8 text-center">
          <History className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">
            Draw history and audit features will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function Profile() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <p className="text-muted-foreground">
        Manage your account and view your winnings
      </p>
      <Card>
        <CardContent className="p-8 text-center">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Profile Features</h3>
          <p className="text-muted-foreground">
            Profile management and winnings dashboard coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

