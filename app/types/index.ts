// Data model types for FairGazer app

export interface User {
  userId: string;
  walletAddress: string;
  farcasterId?: string;
  drawHistory: string[]; // Array of draw IDs
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
  redeemable: boolean;
  winnerUserId?: string;
}

// UI Component Props
export interface DrawCardProps {
  draw: Draw;
  prizeItems: PrizeItem[];
  onPurchaseTickets: (drawId: string, ticketCount: number) => void;
}

export interface MarketplaceItemCardProps {
  item: PrizeItem;
  isSelected?: boolean;
  onSelect?: (itemId: string) => void;
}

export interface TicketPurchaseProps {
  draw: Draw;
  onPurchase: (bundleId: string) => void;
}

// API Response Types
export interface DrawWithPrizes extends Draw {
  prizes: PrizeItem[];
}

export interface UserProfile extends User {
  tickets: Ticket[];
  winnings: PrizeItem[];
}

// Smart Contract Types
export interface ContractDraw {
  id: bigint;
  startTime: bigint;
  endTime: bigint;
  totalTickets: bigint;
  ticketsSold: bigint;
  status: number; // 0: active, 1: completed, 2: canceled
  winningTicket: bigint;
  prizeCount: bigint;
}

export interface ContractTicket {
  id: bigint;
  drawId: bigint;
  owner: string;
  ticketNumber: bigint;
  purchaseTime: bigint;
}

// Wallet and Transaction Types
export interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
  balance: string | null;
}

export interface TransactionResult {
  hash: string;
  success: boolean;
  error?: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
}

