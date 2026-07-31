# Portfolio backend setup

## 1. Install dependencies

```bash
npm install
```

## 2. Create environment variables

Copy `.env.example` to `.env.local` for local development. Add the same variables in Vercel under **Project Settings → Environment Variables**.

### Database

Use any hosted PostgreSQL database such as Neon, Supabase or Railway and add its connection string as `DATABASE_URL`.

The contact API automatically creates the `portfolio_inquiries` table on the first successful request.

### Email

Create a Resend account, verify your sending domain, then configure:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

Every valid inquiry sends:

1. A detailed project notification to the portfolio owner.
2. A confirmation email to the prospective client.

### Chatbot

Add `OPENAI_API_KEY` to enable the AI assistant. `OPENAI_MODEL` defaults to `gpt-4o-mini`.

When no OpenAI key is configured, the chat remains functional with a built-in service guide covering Shopify, full-stack development, AI, pricing and availability.

## 3. Run locally

```bash
npm run dev
```

## 4. Production checklist

- Verify the Resend sender domain before replacing the onboarding sender.
- Use a pooled or serverless PostgreSQL connection string.
- Add rate limiting or bot protection before running paid advertising.
- Replace live screenshot-service URLs with optimized local WebP/AVIF project images when final case-study assets are ready.
