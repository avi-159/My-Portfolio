// src/app/api/contact/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { sendContactEmail } from "@/lib/mail";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  website: z.string().optional(), // honeypot
});

// helper: do we have everything needed to send real email?
function canSendEmail() {
  const required = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "NOTIFY_FROM",
    "NOTIFY_TO",
  ] as const;
  const missing = required.filter(
    (k) => !process.env[k] || process.env[k] === ""
  );
  if (missing.length) {
    console.warn("[contact] Email disabled, missing envs:", missing.join(", "));
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = ContactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    // Honeypot: accept silently but do nothing if filled
    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const { name, email, message } = parsed.data;

    // Debug logs (safe)
    console.log("[contact] saving", {
      name,
      emailLen: email.length,
      msgLen: message.length,
    });
    console.log(
      "[contact] DB host:",
      process.env.DATABASE_URL?.split("@")[1]?.split("/")[0] ?? "unknown"
    );

    // ✅ Always write to DB
    await prisma.contactMessage.create({ data: { name, email, message } });

    // ✉️ Try to send email only if SMTP envs are present
    if (canSendEmail()) {
      try {
        const { previewUrl } = await sendContactEmail({ name, email, message });
        return NextResponse.json({ ok: true, emailed: true, previewUrl });
      } catch (err) {
        console.error("[contact] Email send failed:", err);
        return NextResponse.json({
          ok: true,
          emailed: false,
          previewUrl: null,
        });
      }
    } else {
      // Email intentionally skipped (no SMTP config)
      return NextResponse.json({ ok: true, emailed: false, previewUrl: null });
    }
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// TEMP: GET debugger — list last 5 messages (remove after testing)
export async function GET() {
  try {
    const last = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return NextResponse.json({ ok: true, lastCount: last.length, last });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
