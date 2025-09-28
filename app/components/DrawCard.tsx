'use client';

import { Trophy, Clock, Users, Zap } from 'lucide-react';
import { Draw, PrizeItem } from '@/lib/types';
import { calculateTimeRemaining, calculateDrawProgress, formatNumber } from '@/lib/utils';
import { MOCK_PRIZES } from '@/lib/constants';

interface DrawCardProps {
  draw: Draw;
  variant?: 'active' | 'completed';
  onJoinDraw?: (drawId: string) => void;
}

export function DrawCard({ draw, variant = 'active', onJoinDraw }: DrawCardProps) {
  const prizes = MOCK_PRIZES.filter(prize => draw.prizeItemIds.includes(prize.itemId));
  const progress = calculateDrawProgress(draw.ticketsSold, draw.totalTickets);
  const timeRemaining = calculateTimeRemaining(draw.endTime);
  const totalValue = prizes.reduce((sum, prize) => sum + prize.value, 0);

  return (
    <div className="cyber-card group cursor-pointer" onClick={() => onJoinDraw?.(draw.drawId)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-fg mb-1">{draw.title}</h3>
          <p className="text-sm text-muted">{draw.description}</p>
        </div>
        <div className="flex items-center space-x-1 text-accent">
          <Trophy className="w-4 h-4" />
          <span className="text-sm font-bold">${totalValue}</span>
        </div>
      </div>

      {/* Prize preview */}
      <div className="flex -space-x-2 mb-4">
        {prizes.slice(0, 3).map((prize, index) => (
          <div
            key={prize.itemId}
            className="w-12 h-12 rounded-lg border-2 border-accent/30 bg-surface/50 flex items-center justify-center relative z-10"
            style={{ zIndex: 10 - index }}
          >
            <Trophy className="w-6 h-6 text-accent" />
          </div>
        ))}
        {prizes.length > 3 && (
          <div className="w-12 h-12 rounded-lg border-2 border-accent/30 bg-surface/50 flex items-center justify-center text-xs font-bold text-accent">
            +{prizes.length - 3}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted">Progress</span>
          <span className="text-accent font-bold">{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-surface/50 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent/50 to-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-accent mb-1">
            <Users className="w-4 h-4" />
            <span className="text-sm font-bold">{formatNumber(draw.ticketsSold)}</span>
          </div>
          <p className="text-xs text-muted">Participants</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-accent mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold">{formatNumber(draw.totalTickets - draw.ticketsSold)}</span>
          </div>
          <p className="text-xs text-muted">Remaining</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-accent mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-bold">{timeRemaining}</span>
          </div>
          <p className="text-xs text-muted">Time Left</p>
        </div>
      </div>

      {/* Action button */}
      {variant === 'active' && (
        <button className="w-full cyber-button">
          Join Draw - ${draw.ticketPrice}
        </button>
      )}

      {variant === 'completed' && (
        <div className="w-full text-center py-2 bg-muted/20 rounded-lg text-muted font-medium">
          Draw Completed
        </div>
      )}
    </div>
  );
}
