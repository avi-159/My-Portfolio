// src/lib/mail.ts
import "server-only";
import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST ?? "";
const port = Number(process.env.SMTP_PORT ?? "587");
const user = process.env.SMTP_USER ?? "";
const pass = process.env.SMTP_PASS ?? "";
const from = process.env.NOTIFY_FROM ?? "";
const to = process.env.NOTIFY_TO ?? "";

// Build metadata from Vercel env
const buildEnv = process.env.VERCEL_ENV ?? "unknown";
const buildUrl = process.env.VERCEL_URL ?? "unknown";
const buildSha = (process.env.VERCEL_GIT_COMMIT_SHA ?? "n/a").slice(0, 7);

export function canSendEmail(): boolean {
  return Boolean(host && port && user && pass && from && to);
}

const transporter =
  host && port && user && pass
    ? nodemailer.createTransport({
        host,
        port,
        secure: String(port) === "465", // TLS if 465
        auth: { user, pass },
      })
    : null;

export async function sendContactEmail(input: {
  name: string;
  email: string;
  message: string;
}) {
  if (!transporter || !canSendEmail()) {
    return { previewUrl: null, messageId: null, skipped: true };
  }

  const sentAt = new Date().toISOString(); // ISO timestamp for correlation
  const info = await transporter.sendMail({
    from, // must be a verified single sender or domain in SendGrid
    to, // your inbox
    subject: `New contact from ${input.name} — ${sentAt} [${buildEnv}:${buildSha}]`,
    text:
      `Name: ${input.name}\n` +
      `Email: ${input.email}\n` +
      `SentAt (server): ${sentAt}\n` +
      `Build: ${buildEnv} ${buildSha} (${buildUrl})\n\n` +
      `${input.message}`,
    replyTo: input.email,
    headers: {
      "X-Portfolio-Env": buildEnv,
      "X-Portfolio-Commit": buildSha,
      "X-Portfolio-Deployment": buildUrl,
    },
  });

  return { previewUrl: null, messageId: info.messageId, skipped: false };
}
