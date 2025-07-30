import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(), // 'validator', 'rpc', 'enterprise'
  isPopular: boolean("is_popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const networks = pgTable("networks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  icon: text("icon").notNull(),
  isSupported: boolean("is_supported").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceNumber: text("invoice_number").notNull().unique(),
  amount: decimal("amount", { precision: 18, scale: 8 }).notNull(),
  currency: text("currency").notNull(),
  walletAddress: text("wallet_address"),
  status: varchar("status").notNull().default("pending"), // 'pending', 'paid', 'failed'
  transactionHash: text("transaction_hash"),
  createdAt: timestamp("created_at").defaultNow(),
  paidAt: timestamp("paid_at"),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

export const insertNetworkSchema = createInsertSchema(networks).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
  paidAt: true,
});

export const payInvoiceSchema = z.object({
  invoiceNumber: z.string(),
  walletAddress: z.string(),
  transactionHash: z.string(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Network = typeof networks.$inferSelect;
export type InsertNetwork = z.infer<typeof insertNetworkSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type PayInvoice = z.infer<typeof payInvoiceSchema>;
