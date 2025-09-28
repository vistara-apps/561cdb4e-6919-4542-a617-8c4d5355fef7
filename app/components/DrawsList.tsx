'use client'

import { useState } from 'react'
import { Draw, PrizeItem } from '../types'
import { DrawCard } from './DrawCard'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Filter, Trophy } from 'lucide-react'

// Mock data for demonstration
const mockDraws: Draw[] = [
  {
    drawId: 'draw-001',
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    totalTickets: 1000,
    ticketsSold: 750,
    status: 'active',
  },
  {
    drawId: 'draw-002',
    startTime: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    endTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    totalTickets: 500,
    ticketsSold: 500,
    status: 'completed',
    winningTicketId: '123456',
  },
  {
    drawId: 'draw-003',
    startTime: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    totalTickets: 2000,
    ticketsSold: 1200,
    status: 'active',
  },
]

const mockPrizeItems: Record<string, PrizeItem[]> = {
  'draw-001': [
    {
      itemId: 'prize-1',
      name: 'Rare Cyber Punk NFT',
      description: 'Exclusive digital artwork',
      type: 'NFT',
      redeemable: true,
    },
    {
      itemId: 'prize-2',
      name: '$50 Steam Gift Card',
      description: 'Digital gift card',
      type: 'Code',
      redeemable: true,
    },
  ],
  'draw-002': [
    {
      itemId: 'prize-3',
      name: 'Legendary Sword Skin',
      description: 'Premium cosmetic item',
      type: 'InGameItem',
      redeemable: false,
      winnerUserId: '0x123...',
    },
  ],
  'draw-003': [
    {
      itemId: 'prize-4',
      name: 'Bored Ape Yacht Club',
      description: 'Iconic Bored Ape NFT',
      type: 'NFT',
      redeemable: true,
    },
    {
      itemId: 'prize-5',
      name: '$25 Amazon Gift Card',
      description: 'Universal gift card',
      type: 'Code',
      redeemable: true,
    },
    {
      itemId: 'prize-6',
      name: 'Epic Mount Collection',
      description: 'Rare mounts and pets',
      type: 'InGameItem',
      redeemable: true,
    },
  ],
}

export function DrawsList() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredDraws = mockDraws.filter(draw => {
    if (selectedStatus === 'all') return true
    return draw.status === selectedStatus
  })

  const handlePurchaseTickets = (drawId: string, ticketCount: number) => {
    // TODO: Implement ticket purchase logic with smart contract
    console.log(`Purchasing ${ticketCount} tickets for draw ${drawId}`)
    alert(`Purchasing ${ticketCount} tickets for draw ${drawId} - Smart contract integration coming soon!`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Active Draws
          </h1>
          <p className="text-muted-foreground">
            Participate in provably fair draws for amazing digital prizes
          </p>
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Draws</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {mockDraws.filter(d => d.status === 'active').length}
          </div>
          <div className="text-sm text-muted-foreground">Active Draws</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">
            {mockDraws.filter(d => d.status === 'completed').length}
          </div>
          <div className="text-sm text-muted-foreground">Completed Draws</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-purple-600">
            {mockDraws.reduce((sum, d) => sum + Number(d.ticketsSold), 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Tickets Sold</div>
        </div>
      </div>

      {/* Draws Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDraws.map((draw) => (
          <DrawCard
            key={draw.drawId}
            draw={draw}
            prizeItems={mockPrizeItems[draw.drawId] || []}
            onPurchaseTickets={handlePurchaseTickets}
          />
        ))}
      </div>

      {filteredDraws.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No draws found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => setSelectedStatus('all')}
            className="mt-4"
          >
            Show All Draws
          </Button>
        </div>
      )}

      {/* Fairness Notice */}
      <div className="bg-muted p-6 rounded-lg">
        <h3 className="font-semibold mb-2">🔒 Provably Fair Technology</h3>
        <p className="text-sm text-muted-foreground">
          All draws use cryptographic methods to ensure fairness. Every ticket has an equal chance,
          and results can be independently verified on-chain. No manipulation possible.
        </p>
      </div>
    </div>
  )
}

