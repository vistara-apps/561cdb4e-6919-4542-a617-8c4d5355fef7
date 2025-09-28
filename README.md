# FairGazer 🎰

**Win Digital Treasures with Blockchain-Guaranteed Fairness**

FairGazer is a Base MiniApp that brings provably fair draws to the world of digital goods. Participate in transparent, decentralized draws for NFTs, gift cards, gaming items, and exclusive digital collectibles.

## ✨ Features

- **🔒 Provably Fair Draws**: Cryptographic methods ensure complete fairness and transparency
- **🎁 Amazing Prizes**: Win NFTs, gift cards, in-game items, and digital collectibles
- **⚡ Built on Base**: Fast, low-cost transactions with seamless user experience
- **📱 MiniApp Ready**: Optimized for mobile and web with Base Wallet integration
- **🔍 Auditable History**: Public ledger of all past draws with verification tools
- **🎯 Easy Redemption**: Streamlined process for claiming digital prizes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Base Wallet (for full functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fairgazer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base Network, ethers.js, wagmi
- **Smart Contracts**: Solidity, Hardhat
- **Wallet Integration**: Coinbase Wallet SDK

### Project Structure

```
fairgazer/
├── app/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── AppShell.tsx    # Main app layout
│   │   ├── Marketplace.tsx # Prize marketplace
│   │   ├── DrawsList.tsx   # Active draws
│   │   └── WalletConnect.tsx # Wallet integration
│   ├── contracts/          # Smart contracts
│   │   ├── FairDraw.sol    # Main draw contract
│   │   └── deploy.ts       # Deployment script
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── providers/          # Context providers
│   └── types/              # TypeScript definitions
├── public/                 # Static assets
├── API_DOCUMENTATION.md    # API documentation
└── README.md
```

## 🎯 Core Features

### 1. Provably Fair Draw Engine
- Smart contracts on Base ensure draw outcomes are transparent and verifiable
- Cryptographic methods prevent manipulation
- Independent verification of fairness

### 2. Curated Digital Goods Marketplace
- Browsable catalog of NFTs, in-game items, digital art, and redeemable codes
- Clear descriptions and redemption instructions
- Real-time availability status

### 3. Auditable Draw History
- Public ledger displaying past draws
- Anonymized participant details and winning results
- Transparency builds user trust

### 4. Seamless Item Redemption
- User-friendly prize claiming process
- Support for on-chain (NFTs) and off-chain (codes) redemption
- Clear instructions for each prize type

## 🔧 Smart Contracts

### FairDraw Contract

The core smart contract handles:
- Draw creation and management
- Ticket purchasing with ETH
- Provably fair random number generation
- Prize distribution and claiming
- Audit trail maintenance

### Deployment

1. **Install Hardhat**
   ```bash
   npm install -D hardhat
   ```

2. **Compile contracts**
   ```bash
   npx hardhat compile
   ```

3. **Deploy to Base**
   ```bash
   npx hardhat run scripts/deploy.ts --network base
   ```

## 🎨 Design System

### Colors
- **Primary**: `hsl(240 80% 50%)` - Base brand blue
- **Accent**: `hsl(40 90% 50%)` - Golden yellow for prizes
- **Background**: `hsl(220 15% 95%)` - Light neutral background

### Typography
- **Display**: 4xl font-bold for headings
- **Body**: base font-normal with 7 leading

### Components
- Card-based layout with subtle shadows
- Rounded corners (6px-16px radius)
- Smooth transitions and hover effects

## 🔐 Security

### Provably Fair Implementation
1. **Cryptographic Randomness**: Uses Chainlink VRF for verifiable randomness
2. **On-chain Transparency**: All draw results stored and verifiable on-chain
3. **No Manipulation**: Smart contract logic prevents any form of outcome manipulation
4. **Audit Trail**: Complete history of all transactions and draw executions

### Wallet Security
- Users maintain full control of their private keys
- All transactions require explicit user approval
- No private key storage on the application side
- Secure RPC communication with Base network

## 📊 Business Model

### Micro-transactions
- **Pricing**: Tiered ticket bundles ($1, $4, $15 for 1, 5, 25 tickets)
- **Platform Fees**: Small percentage of ticket sales
- **Prize Pools**: Portion of sales contribute to prize pools

### Revenue Streams
- Platform fees on ticket purchases
- Potential marketplace commissions
- Premium features and subscriptions

## 🚀 Deployment

### Environment Setup

Create a `.env.local` file with:

```env
# Base Network
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org

# WalletConnect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Optional: Analytics, monitoring, etc.
```

### Build and Deploy

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel/Netlify/other hosting**
   ```bash
   # Example with Vercel
   npx vercel --prod
   ```

## 🧪 Testing

### Smart Contract Testing
```bash
npx hardhat test
```

### End-to-End Testing
```bash
npm run test:e2e
```

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API specifications, including:
- Base Wallet API integration
- RPC endpoint usage
- Farcaster Identity Protocol
- Smart contract interfaces

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Base](https://base.org/)
- Wallet integration via [Coinbase Wallet](https://wallet.coinbase.com/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)

## 📞 Support

For support, email support@fairgazer.app or join our Discord community.

---

**FairGazer** - Where every draw is fair, every prize is exciting, and every winner is verified. 🎉</content>
</xai:function_call">README.md

