// src/lib/mail.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: String(process.env.SMTP_PORT) === "465", // true only for 465
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  // Optional: verify connectivity; handy while debugging
  // await transporter.verify();

  const info = await transporter.sendMail({
    from: process.env.NOTIFY_FROM!, // MUST be your verified SendGrid sender
    to: process.env.NOTIFY_TO!, // Your receiving inbox
    subject: `New portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    replyTo: email, // lets you reply directly to the sender
  });

  return { previewUrl: null, messageId: info.messageId };
}
