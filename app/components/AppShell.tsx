'use client';

import { useState } from 'react';
import { 
  Home, 
  Trophy, 
  ShoppingBag, 
  History, 
  User, 
  Menu, 
  X,
  Zap
} from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';

interface AppShellProps {
  children: React.ReactNode;
  activeTab?: string;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, id: 'dashboard' },
  { name: 'Draws', href: '/draws', icon: Trophy, id: 'draws' },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag, id: 'marketplace' },
  { name: 'History', href: '/history', icon: History, id: 'history' },
  { name: 'Profile', href: '/profile', icon: User, id: 'profile' },
];

export function AppShell({ children, activeTab = 'dashboard' }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-bg/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-surface border-r border-border">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-bg" />
              </div>
              <span className="text-xl font-bold text-accent">FairGazer</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-muted hover:text-fg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-accent/20 text-accent border border-accent/30'
                      : 'text-muted hover:text-fg hover:bg-surface/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
        <div className="flex flex-col h-full bg-surface border-r border-border">
          <div className="flex items-center space-x-2 p-6 border-b border-border">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-bg" />
            </div>
            <span className="text-2xl font-bold text-accent">FairGazer</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-accent/20 text-accent border border-accent/30 shadow-lg'
                      : 'text-muted hover:text-fg hover:bg-surface/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-muted hover:text-fg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <Wallet>
                <ConnectWallet>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-lg hover:bg-accent/30 transition-all duration-200">
                    <Avatar className="w-6 h-6" />
                    <Name className="text-sm font-medium" />
                  </div>
                </ConnectWallet>
              </Wallet>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
