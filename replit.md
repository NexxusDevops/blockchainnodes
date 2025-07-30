# BlockchainNodes.io - Professional Blockchain Infrastructure Platform

## Overview

This is a full-stack web application for a blockchain infrastructure services company specializing in validator services, RPC nodes, and enterprise solutions across Cosmos-based networks. The platform features a modern React frontend with a Node.js Express backend, utilizing PostgreSQL with Drizzle ORM for data management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation of concerns:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple

### Monorepo Structure
The project uses a monorepo structure with shared TypeScript schemas:
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript schemas and types
- Database migrations in `migrations/` directory

## Key Components

### Database Schema
The application manages four core entities:
- **Services**: Blockchain infrastructure offerings (validators, RPC nodes, enterprise solutions)
- **Networks**: Supported blockchain networks with metadata
- **Contacts**: Customer inquiries and contact form submissions
- **Invoices**: Payment processing with wallet integration support

### API Endpoints
- `/api/services` - Service catalog management
- `/api/networks` - Supported blockchain networks
- `/api/contact` - Contact form submissions
- `/api/invoices` - Invoice management and payment processing

### Frontend Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Theme**: System-wide theme switching with persistence
- **Wallet Integration**: Mock wallet connectivity (Keplr, Leap) prepared for production implementation
- **Interactive Sections**: Hero, services, networks, dashboard, pricing, and payment sections

### Storage Layer
Currently implements in-memory storage (`MemStorage`) for development, with interface design (`IStorage`) ready for database integration.

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express routes handle business logic and data validation
3. **Data Validation**: Zod schemas ensure type safety between client and server
4. **Storage Operations**: Storage interface abstracts data persistence
5. **Response Handling**: Structured JSON responses with error handling

## External Dependencies

### Frontend Dependencies
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Lucide React**: Modern icon library
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing solution
- **React Hook Form**: Form management with validation

### Backend Dependencies
- **Drizzle ORM**: Type-safe database toolkit
- **Zod**: Schema validation library
- **Express**: Web application framework
- **Neon Database**: Serverless PostgreSQL provider

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **Vite**: Fast build tool with HMR
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: JavaScript bundler for production builds

## Deployment Strategy

### Development Environment
- **Frontend**: Vite development server with HMR
- **Backend**: tsx for TypeScript execution with hot reload
- **Database**: Neon Database with connection pooling

### Production Build
- **Frontend**: Static build output to `dist/public/`
- **Backend**: ESBuild bundles server code to `dist/`
- **Deployment**: Single Node.js process serving both API and static assets

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Drizzle migrations managed through `drizzle-kit`
- Production/development mode switching via `NODE_ENV`

The architecture is designed for scalability, with clear interfaces that support future enhancements like real wallet integration, additional payment providers, and expanded blockchain network support.