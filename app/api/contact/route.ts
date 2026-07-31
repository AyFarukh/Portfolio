import { NextResponse } from "next/server";
import { Resend } from "resend";
import { saveInquiry, type InquiryInput } from "../../../lib/db";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(body: Record<string, unknown>): InquiryInput | null {
  const data: InquiryInput = {
    name: clean(body.name, 120),
    email: clean(body.email, 255).toLowerCase(),
    company: clean(body.company, 180),
    service: clean(body.service, 120),
    budget: clean(body.budget, 80),
    timeline: clean(body.timeline, 80),
    message: clean(body.message, 3000),
  };

  if (!data.name || !EMAIL_PATTERN.test(data.email) || !data.service || data.message.length < 15) return null;
  return data;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const inquiry = validate(body);

    if (!inquiry) {
      return NextResponse.json({ error: "Please complete the required fields with a valid email and project description." }, { status: 400 });
    }

    const record = await saveInquiry(inquiry);
    const resendKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.CONTACT_TO_EMAIL || "farukh.5937@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    if (resendKey) {
      const resend = new Resend(resendKey);
      const safe = Object.fromEntries(Object.entries(inquiry).map(([key, value]) => [key, escapeHtml(value || "—")])) as Record<string, string>;

      await Promise.all([
        resend.emails.send({
          from: fromEmail,
          to: ownerEmail,
          replyTo: inquiry.email,
          subject: `New portfolio inquiry — ${inquiry.service}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#111827">
              <h1 style="font-size:24px">New project inquiry</h1>
              <p><strong>Name:</strong> ${safe.name}</p>
              <p><strong>Email:</strong> ${safe.email}</p>
              <p><strong>Company:</strong> ${safe.company}</p>
              <p><strong>Service:</strong> ${safe.service}</p>
              <p><strong>Budget:</strong> ${safe.budget}</p>
              <p><strong>Timeline:</strong> ${safe.timeline}</p>
              <div style="margin-top:24px;padding:20px;background:#f3f4f6;border-radius:12px;white-space:pre-wrap">${safe.message}</div>
              <p style="margin-top:20px;color:#6b7280">Record ID: ${record?.id || "database not configured"}</p>
            </div>`,
        }),
        resend.emails.send({
          from: fromEmail,
          to: inquiry.email,
          replyTo: ownerEmail,
          subject: "Thanks — your project inquiry has been received",
          html: `
            <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#111827">
              <p style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#6366f1">Farrukh Sultan · Full Stack & Shopify Plus</p>
              <h1 style="font-size:30px;line-height:1.15">Thank you, ${safe.name}.</h1>
              <p style="font-size:17px;line-height:1.7;color:#4b5563">I’ve received your inquiry about <strong>${safe.service}</strong>. I’ll review the details and reply personally, usually within one business day.</p>
              <div style="margin:28px 0;padding:22px;background:#f7f7fb;border:1px solid #e5e7eb;border-radius:14px">
                <strong>Your message</strong>
                <p style="white-space:pre-wrap;line-height:1.65;color:#4b5563">${safe.message}</p>
              </div>
              <p style="color:#6b7280">Farrukh Sultan<br/>Senior Shopify Plus & Full Stack Developer</p>
            </div>`,
        }),
      ]);
    }

    return NextResponse.json({
      success: true,
      stored: Boolean(record),
      emailed: Boolean(resendKey),
      message: "Your inquiry has been received. A confirmation email is on its way.",
    });
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json({ error: "The message could not be sent right now. Please try again or email directly." }, { status: 500 });
  }
}
