// src/lib/mail.ts
import "server-only";
import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST ?? "";
const port = Number(process.env.SMTP_PORT ?? "587");
const user = process.env.SMTP_USER ?? "";
const pass = process.env.SMTP_PASS ?? "";
const from = process.env.NOTIFY_FROM ?? "";
const to = process.env.NOTIFY_TO ?? "";

/** Return true only if all SMTP + addressing envs are configured */
export function canSendEmail(): boolean {
  return Boolean(host && port && user && pass && from && to);
}

/** Reuse a single transporter on the server */
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

  const info = await transporter.sendMail({
    from, // MUST be a verified sender in SendGrid
    to, // your inbox
    subject: `New portfolio contact from ${input.name}`,
    text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    replyTo: input.email,
  });

  return { previewUrl: null, messageId: info.messageId, skipped: false };
}
