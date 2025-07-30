import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertInvoiceSchema, payInvoiceSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Networks routes
  app.get("/api/networks", async (req, res) => {
    try {
      const networks = await storage.getNetworks();
      res.json(networks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch networks" });
    }
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ message: "Contact form submitted successfully", contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Invoice routes
  app.get("/api/invoices", async (req, res) => {
    try {
      const invoices = await storage.getInvoices();
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  app.get("/api/invoices/:invoiceNumber", async (req, res) => {
    try {
      const invoice = await storage.getInvoiceByNumber(req.params.invoiceNumber);
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      res.json(invoice);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch invoice" });
    }
  });

  app.post("/api/invoices", async (req, res) => {
    try {
      const invoiceData = insertInvoiceSchema.parse(req.body);
      const invoice = await storage.createInvoice(invoiceData);
      res.json(invoice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create invoice" });
    }
  });

  app.post("/api/invoices/pay", async (req, res) => {
    try {
      const paymentData = payInvoiceSchema.parse(req.body);
      const invoice = await storage.payInvoice(paymentData);
      res.json({ message: "Payment processed successfully", invoice });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      if (error instanceof Error && error.message === "Invoice not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: "Failed to process payment" });
    }
  });

  // Network status (mock data for MVP)
  app.get("/api/status", async (req, res) => {
    try {
      const status = {
        validatorHealth: "100%",
        rpcResponse: "127ms",
        networkCoverage: "15+",
        totalStaked: "$2.4M",
        delegators: 1247,
        rewards: "8.3%",
        commission: "5%",
        uptime: "99.9%",
        networks: 15,
        validators: 50
      };
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
