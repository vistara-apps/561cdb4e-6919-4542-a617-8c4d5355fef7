'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { DrawCard } from './components/DrawCard';
import { MarketplaceItemCard } from './components/MarketplaceItemCard';
import { TicketPurchaseButton } from './components/TicketPurchaseButton';
import { 
  Trophy, 
  Users, 
  Zap, 
  TrendingUp, 
  Clock,
  Star,
  Gift
} from 'lucide-react';
import { MOCK_DRAWS, MOCK_PRIZES } from '@/lib/constants';
import { formatNumber, formatCurrency } from '@/lib/utils';

export default function Dashboard() {
  const [selectedDraw, setSelectedDraw] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalDraws: 156,
    totalPrizes: 2847,
    totalParticipants: 12543,
    totalValue: 41295056,
  });

  const activeDraws = MOCK_DRAWS.filter(draw => draw.status === 'active').slice(0, 3);
  const featuredPrizes = MOCK_PRIZES.slice(0, 4);

  const handleJoinDraw = (drawId: string) => {
    setSelectedDraw(drawId);
  };

  const handlePurchaseTickets = (drawId: string, ticketCount: number, totalPrice: number) => {
    console.log(`Purchasing ${ticketCount} tickets for draw ${drawId} at $${totalPrice}`);
    setSelectedDraw(null);
    // Here you would integrate with the actual purchase logic
  };

  return (
    <AppShell activeTab="dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-accent font-bold">Provably Fair Gaming</span>
          </div>
          <h1 className="text-4xl font-bold text-fg">
            Win Digital Treasures
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Participate in blockchain-guaranteed fair draws for NFTs, gaming items, and digital collectibles
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="metric-card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{formatNumber(stats.totalDraws)}</div>
                <div className="text-sm text-muted">Active Draws</div>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Gift className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{formatNumber(stats.totalPrizes)}</div>
                <div className="text-sm text-muted">Total Prizes</div>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{formatNumber(stats.totalParticipants)}</div>
                <div className="text-sm text-muted">Participants</div>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{formatCurrency(stats.totalValue)}</div>
                <div className="text-sm text-muted">Prize Pool</div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Draws */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-fg">🔥 Hot Draws</h2>
            <a href="/draws" className="text-accent hover:text-accent/80 font-medium">
              View All →
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {activeDraws.map((draw) => (
              <DrawCard
                key={draw.drawId}
                draw={draw}
                variant="active"
                onJoinDraw={handleJoinDraw}
              />
            ))}
          </div>
        </div>

        {/* Featured Prizes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-fg">✨ Featured Prizes</h2>
            <a href="/marketplace" className="text-accent hover:text-accent/80 font-medium">
              Browse All →
            </a>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredPrizes.map((prize) => (
              <MarketplaceItemCard
                key={prize.itemId}
                item={prize}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="cyber-card">
          <h3 className="text-xl font-bold text-fg mb-4">🎯 Recent Winners</h3>
          <div className="space-y-3">
            {[
              { user: '0x1234...5678', prize: 'Cyber Samurai NFT', value: 250, time: '2 min ago' },
              { user: '0x8765...4321', prize: 'Neon Blade Skin', value: 50, time: '15 min ago' },
              { user: '0x9999...1111', prize: 'Digital Art Collection', value: 100, time: '1 hour ago' },
            ].map((winner, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-fg">{winner.user}</div>
                    <div className="text-sm text-muted">won {winner.prize}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-accent">${winner.value}</div>
                  <div className="text-xs text-muted">{winner.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {selectedDraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm">
          <div className="w-full max-w-md cyber-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-fg">Purchase Tickets</h3>
              <button
                onClick={() => setSelectedDraw(null)}
                className="text-muted hover:text-fg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <TicketPurchaseButton
              drawId={selectedDraw}
              ticketPrice={1}
              onPurchase={handlePurchaseTickets}
            />
          </div>
        </div>
      )}
    </AppShell>
  );
}
