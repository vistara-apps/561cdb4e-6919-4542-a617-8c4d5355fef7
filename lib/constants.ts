import { TicketBundle, PrizeItem, Draw } from './types';

export const TICKET_BUNDLES: TicketBundle[] = [
  {
    id: '1',
    name: 'Single Shot',
    ticketCount: 1,
    price: 1,
  },
  {
    id: '5',
    name: 'Power Pack',
    ticketCount: 5,
    price: 4,
    discount: 20,
    popular: true,
  },
  {
    id: '25',
    name: 'Mega Bundle',
    ticketCount: 25,
    price: 15,
    discount: 40,
  },
];

export const MOCK_PRIZES: PrizeItem[] = [
  {
    itemId: '1',
    name: 'Cyber Samurai NFT',
    description: 'Legendary warrior from the digital realm',
    type: 'NFT',
    imageUrl: '/api/placeholder/300/300',
    redeemable: true,
    value: 250,
    rarity: 'legendary',
  },
  {
    itemId: '2',
    name: 'Neon Blade Skin',
    description: 'Glowing weapon skin for your arsenal',
    type: 'InGameItem',
    imageUrl: '/api/placeholder/300/300',
    redeemable: true,
    value: 50,
    rarity: 'epic',
  },
  {
    itemId: '3',
    name: 'Digital Art Collection',
    description: 'Exclusive cyberpunk artwork bundle',
    type: 'NFT',
    imageUrl: '/api/placeholder/300/300',
    redeemable: true,
    value: 100,
    rarity: 'rare',
  },
  {
    itemId: '4',
    name: 'Game Credits',
    description: '1000 premium game credits',
    type: 'Code',
    imageUrl: '/api/placeholder/300/300',
    redeemable: true,
    value: 25,
    rarity: 'common',
  },
];

export const MOCK_DRAWS: Draw[] = [
  {
    drawId: '1',
    title: 'Legendary Cyber Collection',
    description: 'Win exclusive NFTs and digital treasures',
    startTime: new Date('2024-01-01'),
    endTime: new Date('2024-12-31'),
    totalTickets: 1000,
    ticketsSold: 750,
    status: 'active',
    prizeItemIds: ['1', '2'],
    ticketPrice: 1,
  },
  {
    drawId: '2',
    title: 'Gaming Arsenal Drop',
    description: 'Rare weapons and skins for your collection',
    startTime: new Date('2024-01-15'),
    endTime: new Date('2024-12-15'),
    totalTickets: 500,
    ticketsSold: 320,
    status: 'active',
    prizeItemIds: ['2', '3'],
    ticketPrice: 1,
  },
  {
    drawId: '3',
    title: 'Digital Art Showcase',
    description: 'Curated collection of digital masterpieces',
    startTime: new Date('2024-02-01'),
    endTime: new Date('2024-11-30'),
    totalTickets: 750,
    ticketsSold: 450,
    status: 'active',
    prizeItemIds: ['3', '4'],
    ticketPrice: 1,
  },
];

export const RARITY_COLORS = {
  common: '#9ca3af',
  rare: '#3b82f6',
  epic: '#8b5cf6',
  legendary: '#f59e0b',
};

export const RARITY_GLOWS = {
  common: '0 0 10px rgba(156, 163, 175, 0.5)',
  rare: '0 0 15px rgba(59, 130, 246, 0.6)',
  epic: '0 0 20px rgba(139, 92, 246, 0.7)',
  legendary: '0 0 25px rgba(245, 158, 11, 0.8)',
};
