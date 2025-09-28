'use client'

import { useState, useMemo } from 'react'
import { PrizeItem } from '../types'
import { MarketplaceItemCard } from './MarketplaceItemCard'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Search, Filter } from 'lucide-react'

// Mock data for demonstration
const mockPrizeItems: PrizeItem[] = [
  {
    itemId: '1',
    name: 'Rare Cyber Punk NFT',
    description: 'Exclusive digital artwork featuring futuristic cityscapes and neon aesthetics',
    type: 'NFT',
    metadataUrl: 'https://example.com/nft/1',
    redeemable: true,
  },
  {
    itemId: '2',
    name: '$50 Steam Gift Card',
    description: 'Digital gift card redeemable on Steam for games and in-game content',
    type: 'Code',
    redeemable: true,
  },
  {
    itemId: '3',
    name: 'Legendary Sword Skin',
    description: 'Premium cosmetic item for your favorite MMO game',
    type: 'InGameItem',
    metadataUrl: 'https://example.com/item/3',
    redeemable: true,
  },
  {
    itemId: '4',
    name: 'Bored Ape Yacht Club',
    description: 'Iconic Bored Ape NFT from the legendary collection',
    type: 'NFT',
    metadataUrl: 'https://example.com/nft/4',
    redeemable: false,
    winnerUserId: '0x123...',
  },
  {
    itemId: '5',
    name: '$25 Amazon Gift Card',
    description: 'Universal gift card for shopping and digital content',
    type: 'Code',
    redeemable: true,
  },
  {
    itemId: '6',
    name: 'Epic Mount Collection',
    description: 'Rare mounts and pets for your gaming adventures',
    type: 'InGameItem',
    metadataUrl: 'https://example.com/item/6',
    redeemable: true,
  },
]

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all')

  const filteredItems = useMemo(() => {
    return mockPrizeItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === 'all' || item.type === selectedType
      const matchesAvailability = selectedAvailability === 'all' ||
                                (selectedAvailability === 'available' && item.redeemable) ||
                                (selectedAvailability === 'redeemed' && !item.redeemable)

      return matchesSearch && matchesType && matchesAvailability
    })
  }, [searchTerm, selectedType, selectedAvailability])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Digital Goods Marketplace</h1>
          <p className="text-muted-foreground">
            Discover amazing prizes you can win in our provably fair draws
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search prizes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="NFT">NFT</SelectItem>
              <SelectItem value="Code">Code</SelectItem>
              <SelectItem value="InGameItem">In-Game Item</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="redeemed">Redeemed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredItems.length} of {mockPrizeItems.length} prizes
      </div>

      {/* Prize Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <MarketplaceItemCard
            key={item.itemId}
            item={item}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No prizes found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('')
              setSelectedType('all')
              setSelectedAvailability('all')
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

