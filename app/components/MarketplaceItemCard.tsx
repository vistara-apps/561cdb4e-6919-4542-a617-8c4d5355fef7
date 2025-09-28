'use client';

import { Trophy, Star, Zap } from 'lucide-react';
import { PrizeItem } from '@/lib/types';
import { RARITY_COLORS } from '@/lib/constants';

interface MarketplaceItemCardProps {
  item: PrizeItem;
  onViewItem?: (itemId: string) => void;
}

export function MarketplaceItemCard({ item, onViewItem }: MarketplaceItemCardProps) {
  const rarityColor = RARITY_COLORS[item.rarity];

  return (
    <div 
      className="prize-card group"
      onClick={() => onViewItem?.(item.itemId)}
    >
      {/* Item image placeholder */}
      <div className="relative mb-4 rounded-lg overflow-hidden bg-surface/30 aspect-square">
        <div className="absolute inset-0 flex items-center justify-center">
          <Trophy className="w-16 h-16 text-accent/50" />
        </div>
        
        {/* Rarity indicator */}
        <div 
          className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-bg"
          style={{ backgroundColor: rarityColor }}
        >
          {item.rarity.toUpperCase()}
        </div>

        {/* Type indicator */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-bg/80 rounded-full text-xs font-bold text-accent">
          {item.type}
        </div>
      </div>

      {/* Item details */}
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-fg mb-1 group-hover:text-accent transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-muted line-clamp-2">{item.description}</p>
        </div>

        {/* Value and rarity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" style={{ color: rarityColor }} />
            <span className="text-sm font-medium" style={{ color: rarityColor }}>
              {item.rarity}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-accent">
            <Zap className="w-4 h-4" />
            <span className="font-bold">${item.value}</span>
          </div>
        </div>

        {/* Redeemable status */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">
            {item.redeemable ? 'Available' : 'Claimed'}
          </span>
          {item.redeemable && (
            <button className="text-xs cyber-button px-3 py-1">
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
