'use client'

import { PrizeItem } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Gift, Code, Gamepad2, Trophy } from 'lucide-react'

interface MarketplaceItemCardProps {
  item: PrizeItem
  isSelected?: boolean
  onSelect?: (itemId: string) => void
  showSelectButton?: boolean
}

export function MarketplaceItemCard({
  item,
  isSelected = false,
  onSelect,
  showSelectButton = false
}: MarketplaceItemCardProps) {
  const getTypeIcon = (type: PrizeItem['type']) => {
    switch (type) {
      case 'NFT':
        return <Trophy className="h-5 w-5" />
      case 'Code':
        return <Code className="h-5 w-5" />
      case 'InGameItem':
        return <Gamepad2 className="h-5 w-5" />
      default:
        return <Gift className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: PrizeItem['type']) => {
    switch (type) {
      case 'NFT':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case 'Code':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'InGameItem':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon(item.type)}
            <CardTitle className="text-lg">{item.name}</CardTitle>
          </div>
          <Badge className={getTypeColor(item.type)}>
            {item.type}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Status:</span>
            <Badge variant={item.redeemable ? "default" : "secondary"}>
              {item.redeemable ? "Available" : "Redeemed"}
            </Badge>
          </div>
          {showSelectButton && onSelect && (
            <Button
              onClick={() => onSelect(item.itemId)}
              variant={isSelected ? "default" : "outline"}
              size="sm"
            >
              {isSelected ? "Selected" : "Select"}
            </Button>
          )}
        </div>
        {item.metadataUrl && (
          <div className="mt-3 text-xs text-muted-foreground">
            <a
              href={item.metadataUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View Details →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

