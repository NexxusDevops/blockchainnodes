import { type Service, type InsertService, type Network, type InsertNetwork, type Contact, type InsertContact, type Invoice, type InsertInvoice, type PayInvoice } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Services
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Networks
  getNetworks(): Promise<Network[]>;
  getNetwork(id: string): Promise<Network | undefined>;
  createNetwork(network: InsertNetwork): Promise<Network>;
  
  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Invoices
  getInvoices(): Promise<Invoice[]>;
  getInvoice(id: string): Promise<Invoice | undefined>;
  getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  payInvoice(payment: PayInvoice): Promise<Invoice>;
}

export class MemStorage implements IStorage {
  private services: Map<string, Service>;
  private networks: Map<string, Network>;
  private contacts: Map<string, Contact>;
  private invoices: Map<string, Invoice>;

  constructor() {
    this.services = new Map();
    this.networks = new Map();
    this.contacts = new Map();
    this.invoices = new Map();
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize services
    const defaultServices: Service[] = [
      {
        id: randomUUID(),
        name: "Cosmos Validators",
        description: "Professional validator services across Cosmos-based networks with competitive commission rates and 24/7 monitoring.",
        features: ["99.9% Uptime SLA", "Automated failover", "Real-time monitoring"],
        price: "299.00",
        category: "validator",
        isPopular: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "RPC Nodes",
        description: "High-performance RPC endpoints for seamless blockchain integration with load balancing and caching.",
        features: ["Sub-second response", "Global CDN", "Rate limiting"],
        price: "99.00",
        category: "rpc",
        isPopular: false,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Enterprise Solutions",
        description: "Custom blockchain infrastructure solutions for enterprises with dedicated support and SLAs.",
        features: ["Dedicated resources", "24/7 support", "Custom SLAs"],
        price: null,
        category: "enterprise",
        isPopular: false,
        createdAt: new Date(),
      },
    ];

    defaultServices.forEach(service => this.services.set(service.id, service));

    // Initialize networks
    const defaultNetworks: Network[] = [
      { id: randomUUID(), name: "Cosmos", symbol: "ATOM", icon: "fas fa-atom", isSupported: true, createdAt: new Date() },
      { id: randomUUID(), name: "Ethereum", symbol: "ETH", icon: "fab fa-ethereum", isSupported: true, createdAt: new Date() },
      { id: randomUUID(), name: "Solana", symbol: "SOL", icon: "fas fa-sun", isSupported: true, createdAt: new Date() },
      { id: randomUUID(), name: "Polygon", symbol: "MATIC", icon: "fas fa-link", isSupported: true, createdAt: new Date() },
      { id: randomUUID(), name: "Osmosis", symbol: "OSMO", icon: "fas fa-circle", isSupported: true, createdAt: new Date() },
    ];

    defaultNetworks.forEach(network => this.networks.set(network.id, network));
  }

  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService, 
      id, 
      price: insertService.price ?? null,
      isPopular: insertService.isPopular ?? false,
      createdAt: new Date() 
    };
    this.services.set(id, service);
    return service;
  }

  // Networks
  async getNetworks(): Promise<Network[]> {
    return Array.from(this.networks.values());
  }

  async getNetwork(id: string): Promise<Network | undefined> {
    return this.networks.get(id);
  }

  async createNetwork(insertNetwork: InsertNetwork): Promise<Network> {
    const id = randomUUID();
    const network: Network = { 
      ...insertNetwork, 
      id, 
      isSupported: insertNetwork.isSupported ?? true,
      createdAt: new Date() 
    };
    this.networks.set(id, network);
    return network;
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Invoices
  async getInvoices(): Promise<Invoice[]> {
    return Array.from(this.invoices.values());
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    return this.invoices.get(id);
  }

  async getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined> {
    return Array.from(this.invoices.values()).find(
      invoice => invoice.invoiceNumber === invoiceNumber
    );
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const id = randomUUID();
    const invoice: Invoice = { 
      ...insertInvoice, 
      id, 
      status: insertInvoice.status ?? "pending",
      walletAddress: insertInvoice.walletAddress ?? null,
      transactionHash: insertInvoice.transactionHash ?? null,
      createdAt: new Date(),
      paidAt: null
    };
    this.invoices.set(id, invoice);
    return invoice;
  }

  async payInvoice(payment: PayInvoice): Promise<Invoice> {
    const invoice = await this.getInvoiceByNumber(payment.invoiceNumber);
    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const updatedInvoice: Invoice = {
      ...invoice,
      status: "paid",
      walletAddress: payment.walletAddress,
      transactionHash: payment.transactionHash,
      paidAt: new Date(),
    };

    this.invoices.set(invoice.id, updatedInvoice);
    return updatedInvoice;
  }
}

export const storage = new MemStorage();
