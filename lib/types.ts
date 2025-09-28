export interface User {
  userId: string;
  walletAddress: string;
  farcasterId?: string;
  drawHistory: string[];
}

export interface Draw {
  drawId: string;
  startTime: Date;
  endTime: Date;
  totalTickets: number;
  ticketsSold: number;
  status: 'active' | 'completed' | 'canceled';
  winningTicketId?: string;
  prizeItemIds: string[];
  ticketPrice: number;
  title: string;
  description: string;
}

export interface Ticket {
  ticketId: string;
  drawId: string;
  userId: string;
  ticketNumber: number;
  purchaseTimestamp: Date;
}

export interface PrizeItem {
  itemId: string;
  name: string;
  description: string;
  type: 'NFT' | 'Code' | 'InGameItem';
  metadataUrl?: string;
  imageUrl: string;
  redeemable: boolean;
  winnerUserId?: string;
  value: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface TicketBundle {
  id: string;
  name: string;
  ticketCount: number;
  price: number;
  discount?: number;
  popular?: boolean;
}

export interface DrawStats {
  totalDraws: number;
  totalPrizes: number;
  totalParticipants: number;
  totalValue: number;
}
