'use client';

import { useState } from 'react';
import { Gift, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { PrizeItem } from '@/lib/types';

interface RedemptionButtonProps {
  item: PrizeItem;
  onRedeem?: (itemId: string) => void;
}

export function RedemptionButton({ item, onRedeem }: RedemptionButtonProps) {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);

  const handleRedeem = async () => {
    setIsRedeeming(true);
    
    // Simulate redemption process
    setTimeout(() => {
      setIsRedeeming(false);
      setIsRedeemed(true);
      onRedeem?.(item.itemId);
    }, 2000);
  };

  if (isRedeemed) {
    return (
      <div className="flex items-center justify-center space-x-2 py-3 bg-success/20 border border-success/30 rounded-lg text-success">
        <CheckCircle className="w-5 h-5" />
        <span className="font-bold">Successfully Redeemed!</span>
      </div>
    );
  }

  const getRedemptionContent = () => {
    switch (item.type) {
      case 'NFT':
        return {
          icon: Gift,
          text: isRedeeming ? 'Minting NFT...' : 'Claim NFT',
          description: 'This will mint the NFT to your wallet',
        };
      case 'Code':
        return {
          icon: Copy,
          text: isRedeeming ? 'Generating Code...' : 'Reveal Code',
          description: 'Get your redeemable code',
        };
      case 'InGameItem':
        return {
          icon: ExternalLink,
          text: isRedeeming ? 'Processing...' : 'Claim Item',
          description: 'Add item to your game inventory',
        };
      default:
        return {
          icon: Gift,
          text: isRedeeming ? 'Processing...' : 'Claim Prize',
          description: 'Claim your prize',
        };
    }
  };

  const { icon: Icon, text, description } = getRedemptionContent();

  return (
    <div className="space-y-3">
      <div className="text-center">
        <h4 className="font-bold text-fg mb-1">Ready to Claim</h4>
        <p className="text-sm text-muted">{description}</p>
      </div>
      
      <button
        onClick={handleRedeem}
        disabled={isRedeeming}
        className={`w-full cyber-button py-3 ${
          isRedeeming ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <Icon className={`w-5 h-5 ${isRedeeming ? 'animate-spin' : ''}`} />
          <span className="font-bold">{text}</span>
        </div>
      </button>

      {item.type === 'Code' && isRedeemed && (
        <div className="p-3 bg-surface/50 border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Your Code:</span>
            <button className="text-xs text-accent hover:text-accent/80">
              Copy
            </button>
          </div>
          <div className="font-mono text-accent font-bold mt-1">
            CYBER-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
}
