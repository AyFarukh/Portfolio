import { Pool } from "pg";
import type { KnowledgeEntry } from "./chatbot-knowledge";

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

async function ensureTables() {
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
    );

    CREATE TABLE IF NOT EXISTS chatbot_knowledge (
      id BIGSERIAL PRIMARY KEY,
      slug VARCHAR(160) UNIQUE NOT NULL,
      title VARCHAR(220) NOT NULL,
      category VARCHAR(100) NOT NULL DEFAULT 'general',
      keywords TEXT[] NOT NULL DEFAULT '{}',
      answer TEXT NOT NULL,
      approved BOOLEAN NOT NULL DEFAULT TRUE,
      usage_count INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS chatbot_questions (
      id BIGSERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      normalized_question TEXT NOT NULL,
      matched_slug VARCHAR(160),
      confidence NUMERIC(5,4) NOT NULL DEFAULT 0,
      status VARCHAR(30) NOT NULL DEFAULT 'unanswered',
      suggested_answer TEXT,
      session_id VARCHAR(120),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      reviewed_at TIMESTAMPTZ
    );

    CREATE INDEX IF NOT EXISTS chatbot_questions_status_idx ON chatbot_questions(status, created_at DESC);

    CREATE TABLE IF NOT EXISTS chatbot_feedback (
      id BIGSERIAL PRIMARY KEY,
      question_id BIGINT REFERENCES chatbot_questions(id) ON DELETE SET NULL,
      helpful BOOLEAN NOT NULL,
      comment TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
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
  const database = await ensureTables();
  if (!database) return null;
  const result = await database.query(
    `INSERT INTO portfolio_inquiries (name, email, company, service, budget, timeline, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, created_at`,
    [input.name, input.email, input.company || null, input.service, input.budget || null, input.timeline || null, input.message],
  );
  return result.rows[0] as { id: string; created_at: string };
}

export async function getApprovedKnowledge(): Promise<KnowledgeEntry[]> {
  const database = await ensureTables();
  if (!database) return [];
  const result = await database.query(
    `SELECT slug AS id, title, category, keywords, answer FROM chatbot_knowledge
     WHERE approved = TRUE ORDER BY usage_count DESC, updated_at DESC`,
  );
  return result.rows as KnowledgeEntry[];
}

export async function recordChatQuestion(input: {
  question: string;
  normalizedQuestion: string;
  matchedSlug?: string | null;
  confidence: number;
  status: "answered" | "unanswered";
  sessionId?: string | null;
}) {
  const database = await ensureTables();
  if (!database) return null;
  const result = await database.query(
    `INSERT INTO chatbot_questions
      (question, normalized_question, matched_slug, confidence, status, session_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [input.question, input.normalizedQuestion, input.matchedSlug || null, input.confidence, input.status, input.sessionId || null],
  );
  if (input.matchedSlug) {
    await database.query(`UPDATE chatbot_knowledge SET usage_count = usage_count + 1 WHERE slug = $1`, [input.matchedSlug]);
  }
  return String(result.rows[0].id);
}

export async function saveChatFeedback(input: { questionId?: string | null; helpful: boolean; comment?: string }) {
  const database = await ensureTables();
  if (!database) return null;
  await database.query(
    `INSERT INTO chatbot_feedback (question_id, helpful, comment) VALUES ($1, $2, $3)`,
    [input.questionId ? Number(input.questionId) : null, input.helpful, input.comment || null],
  );
  return true;
}

export async function listPendingQuestions() {
  const database = await ensureTables();
  if (!database) return [];
  const result = await database.query(
    `SELECT id, question, normalized_question, confidence, suggested_answer, created_at
     FROM chatbot_questions WHERE status = 'unanswered' ORDER BY created_at DESC LIMIT 100`,
  );
  return result.rows;
}

export async function approveQuestion(input: { questionId: string; title: string; category: string; keywords: string[]; answer: string }) {
  const database = await ensureTables();
  if (!database) throw new Error("Database is not configured.");
  const slug = `learned-${input.questionId}`;
  await database.query("BEGIN");
  try {
    await database.query(
      `INSERT INTO chatbot_knowledge (slug, title, category, keywords, answer, approved)
       VALUES ($1, $2, $3, $4, $5, TRUE)
       ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, category = EXCLUDED.category,
         keywords = EXCLUDED.keywords, answer = EXCLUDED.answer, approved = TRUE, updated_at = NOW()`,
      [slug, input.title, input.category, input.keywords, input.answer],
    );
    await database.query(
      `UPDATE chatbot_questions SET status = 'approved', matched_slug = $1, suggested_answer = $2, reviewed_at = NOW() WHERE id = $3`,
      [slug, input.answer, Number(input.questionId)],
    );
    await database.query("COMMIT");
    return slug;
  } catch (error) {
    await database.query("ROLLBACK");
    throw error;
  }
}

export async function rejectQuestion(questionId: string) {
  const database = await ensureTables();
  if (!database) throw new Error("Database is not configured.");
  await database.query(`UPDATE chatbot_questions SET status = 'rejected', reviewed_at = NOW() WHERE id = $1`, [Number(questionId)]);
}
