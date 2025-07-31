# BlockchainNodes.io

A professional web3 website for blockchain infrastructure services specializing in validator services, RPC nodes, and enterprise solutions across Cosmos-based networks.

## Features

- 🚀 **Modern Web3 Design** - Professional UI with dark/light theme support
- 💼 **Wallet Integration** - Support for Keplr, Leap, and MetaMask wallets
- 🔗 **Multi-Network Support** - Cosmos, Ethereum, Solana, and more
- 💳 **Crypto Payments** - Integrated payment processing with multiple tokens
- 📊 **Real-time Dashboard** - Live network status and validator monitoring
- 🏢 **Enterprise Ready** - Scalable infrastructure for businesses

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack Query** for data management
- **Wouter** for routing

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Drizzle ORM** with PostgreSQL
- **Zod** for validation

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/NexxusDevops/blockchainnodes.git
   cd blockchainnodes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5000
   ```

## Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=development
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage layer
├── shared/                # Shared types and schemas
└── components.json        # shadcn/ui configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Wallet Integration

The platform supports three wallet types:

- **Keplr Wallet** - Primary Cosmos ecosystem wallet
- **Leap Wallet** - Multi-chain Cosmos wallet
- **MetaMask** - Ethereum and EVM networks

## Services Offered

1. **Cosmos Validators** - Professional validator services with 99.9% uptime SLA
2. **RPC Nodes** - High-performance endpoints with global CDN
3. **Enterprise Solutions** - Custom infrastructure with dedicated support

## API Endpoints

- `GET /api/services` - List all services
- `GET /api/networks` - Supported blockchain networks
- `GET /api/status` - Real-time network status
- `POST /api/contact` - Contact form submissions
- `POST /api/invoices` - Create payment invoices
- `POST /api/invoices/pay` - Process crypto payments

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software owned by BlockchainNodes.io.

## Deployment

### Frontend (Vercel)
- Live Site: [https://blockchainnodes.vercel.app](https://blockchainnodes.vercel.app)
- Build Command: `vite build`
- Output Directory: `dist/public`

### Backend
- Deploy to Railway, Render, or similar Node.js hosting
- Environment variable: `DATABASE_URL`

## Contact

- Website: [BlockchainNodes.io](https://blockchainnodes.io)
- Email: support@blockchainnodes.io
- Discord: BlockchainNodes
- Telegram: @BlockchainNodes

---

Built with ❤️ for the decentralized future