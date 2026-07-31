import { Pool } from "pg";

let pool: Pool | null = null;
let initialized = false;

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
      max: 3,
    });
  }
  return pool;
}

async function ensureTable() {
  const database = getPool();
  if (!database || initialized) return database;

  await database.query(`
    CREATE TABLE IF NOT EXISTS portfolio_inquiries (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(180),
      service VARCHAR(120) NOT NULL,
      budget VARCHAR(80),
      timeline VARCHAR(80),
      message TEXT NOT NULL,
      source VARCHAR(80) DEFAULT 'portfolio',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  initialized = true;
  return database;
}

export type InquiryInput = {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
};

export async function saveInquiry(input: InquiryInput) {
  const database = await ensureTable();
  if (!database) return null;

  const result = await database.query(
    `INSERT INTO portfolio_inquiries
      (name, email, company, service, budget, timeline, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, created_at`,
    [
      input.name,
      input.email,
      input.company || null,
      input.service,
      input.budget || null,
      input.timeline || null,
      input.message,
    ],
  );

  return result.rows[0] as { id: string; created_at: string };
}
