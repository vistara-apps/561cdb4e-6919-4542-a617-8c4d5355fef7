'use client';

import { useState } from 'react';
import { Zap, Plus, Minus } from 'lucide-react';
import { TicketBundle } from '@/lib/types';
import { TICKET_BUNDLES } from '@/lib/constants';

interface TicketPurchaseButtonProps {
  drawId: string;
  ticketPrice: number;
  onPurchase?: (drawId: string, ticketCount: number, totalPrice: number) => void;
}

export function TicketPurchaseButton({ 
  drawId, 
  ticketPrice, 
  onPurchase 
}: TicketPurchaseButtonProps) {
  const [selectedBundle, setSelectedBundle] = useState<TicketBundle>(TICKET_BUNDLES[0]);
  const [customTickets, setCustomTickets] = useState(1);
  const [showCustom, setShowCustom] = useState(false);

  const handlePurchase = () => {
    const ticketCount = showCustom ? customTickets : selectedBundle.ticketCount;
    const totalPrice = showCustom 
      ? customTickets * ticketPrice 
      : selectedBundle.price;
    
    onPurchase?.(drawId, ticketCount, totalPrice);
  };

  return (
    <div className="space-y-4">
      {/* Bundle selection */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-fg">Choose Ticket Bundle</h4>
        <div className="grid grid-cols-1 gap-2">
          {TICKET_BUNDLES.map((bundle) => (
            <button
              key={bundle.id}
              onClick={() => {
                setSelectedBundle(bundle);
                setShowCustom(false);
              }}
              className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                selectedBundle.id === bundle.id && !showCustom
                  ? 'border-accent bg-accent/20 text-accent'
                  : 'border-border bg-surface/50 text-fg hover:border-accent/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{bundle.name}</span>
                    {bundle.popular && (
                      <span className="px-2 py-1 bg-accent text-bg text-xs rounded-full font-bold">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted">
                    {bundle.ticketCount} ticket{bundle.ticketCount > 1 ? 's' : ''}
                    {bundle.discount && (
                      <span className="text-accent ml-1">
                        ({bundle.discount}% off)
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-accent">${bundle.price}</div>
                  {bundle.discount && (
                    <div className="text-xs text-muted line-through">
                      ${(bundle.ticketCount * ticketPrice).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
          
          {/* Custom amount option */}
          <button
            onClick={() => setShowCustom(true)}
            className={`p-3 rounded-lg border transition-all duration-200 text-left ${
              showCustom
                ? 'border-accent bg-accent/20 text-accent'
                : 'border-border bg-surface/50 text-fg hover:border-accent/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold">Custom Amount</span>
                <div className="text-sm text-muted">Choose your own quantity</div>
              </div>
              <Zap className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>

      {/* Custom ticket input */}
      {showCustom && (
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-fg">Number of Tickets</h4>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCustomTickets(Math.max(1, customTickets - 1))}
              className="p-2 bg-surface border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              min="1"
              max="100"
              value={customTickets}
              onChange={(e) => setCustomTickets(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-center font-bold text-accent focus:border-accent focus:outline-none"
            />
            <button
              onClick={() => setCustomTickets(customTickets + 1)}
              className="p-2 bg-surface border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center text-sm text-muted">
            Total: <span className="text-accent font-bold">${(customTickets * ticketPrice).toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Purchase button */}
      <button
        onClick={handlePurchase}
        className="w-full cyber-button text-lg py-3"
      >
        <div className="flex items-center justify-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>
            Purchase {showCustom ? customTickets : selectedBundle.ticketCount} Ticket
            {(showCustom ? customTickets : selectedBundle.ticketCount) > 1 ? 's' : ''} - $
            {showCustom ? (customTickets * ticketPrice).toFixed(2) : selectedBundle.price}
          </span>
        </div>
      </button>
    </div>
  );
}
