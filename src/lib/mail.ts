// src/lib/mail.ts
import nodemailer from "nodemailer";

let cachedTransport: nodemailer.Transporter | null = null;

async function getTransport() {
  if (cachedTransport) return cachedTransport;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT
    ? Number(process.env.SMTP_PORT)
    : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && port && user && pass) {
    // Real SMTP (prod)
    cachedTransport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    return cachedTransport;
  }

  // Dev: auto-create Ethereal test account
  const testAccount = await nodemailer.createTestAccount();
  cachedTransport = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });

  return cachedTransport;
}

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const transporter = await getTransport();
  const to = process.env.NOTIFY_TO || "you@example.com";
  const from = process.env.NOTIFY_FROM || "portfolio@notify.local";

  const info = await transporter.sendMail({
    from,
    to,
    subject: `New contact from ${name}`,
    replyTo: email,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <h2>New contact message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <pre style="white-space:pre-wrap">${message}</pre>
    `,
  });

  // In dev (Ethereal), this returns a preview URL
  const previewUrl = nodemailer.getTestMessageUrl(info) ?? undefined;
  return { messageId: info.messageId, previewUrl };
}
