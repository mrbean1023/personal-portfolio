import { NextResponse } from "next/server";
import { contact, siteMeta } from "@/data/portfolio";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Honeypot field — must be empty */
  company?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(payload: unknown): payload is ContactPayload {
  if (typeof payload !== "object" || payload === null) return false;
  const candidate = payload as Record<string, unknown>;
  return (
    typeof candidate.name === "string" &&
    candidate.name.trim().length >= 2 &&
    candidate.name.length <= 100 &&
    typeof candidate.email === "string" &&
    EMAIL_PATTERN.test(candidate.email) &&
    typeof candidate.message === "string" &&
    candidate.message.trim().length >= 20 &&
    candidate.message.length <= 5000
  );
}

/**
 * Contact form endpoint.
 *
 * Delivery strategy:
 *  1. If RESEND_API_KEY is set, the message is emailed via Resend's REST API
 *     (https://resend.com — free tier covers a personal portfolio easily).
 *  2. Without a key, submissions are logged server-side and still accepted,
 *     so the form works out of the box in development and on preview deploys.
 *
 * Alternative: see README for a zero-backend Formspree setup.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Bots that fill the honeypot get a fake success and no processing.
  if (
    typeof payload === "object" &&
    payload !== null &&
    typeof (payload as Record<string, unknown>).company === "string" &&
    ((payload as Record<string, unknown>).company as string).length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  if (!validate(payload)) {
    return NextResponse.json(
      { error: "Validation failed: name, valid email and a 20+ character message are required." },
      { status: 422 },
    );
  }

  const { name, email, message } = payload;
  // Trim to guard against trailing newlines/whitespace from how the secret
  // was stored — a stray newline makes the Authorization header invalid.
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    // No email provider configured — log and accept so the form still works.
    console.info(
      `[contact] New message (RESEND_API_KEY not set — logging only)\n` +
        `  From: ${name} <${email}>\n  Message: ${message}`,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [contact.email],
      reply_to: email,
      subject: `[${siteMeta.author}'s portfolio] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error(`[contact] Resend API error ${response.status}: ${detail}`);
    return NextResponse.json(
      { error: "Failed to deliver message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
