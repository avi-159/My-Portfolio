// src/app/api/contact/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { canSendEmail, sendContactEmail } from "@/lib/mail";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  website: z.string().optional(), // honeypot
});

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

    // Honeypot: silently accept but do nothing
    if (parsed.data.website?.trim()) {
      return NextResponse.json({ ok: true, emailed: false, previewUrl: null });
    }

    const { name, email, message } = parsed.data;

    // ✅ Always write to DB first
    await prisma.contactMessage.create({ data: { name, email, message } });

    // ✉️ Email if configured
    if (canSendEmail()) {
      try {
        const { previewUrl, messageId } = await sendContactEmail({
          name,
          email,
          message,
        });
        return NextResponse.json({
          ok: true,
          emailed: true,
          previewUrl,
          messageId,
        });
      } catch (err) {
        console.error("[contact] Email send failed:", err);
        return NextResponse.json({
          ok: true,
          emailed: false,
          previewUrl: null,
        });
      }
    }

    // Email skipped (no SMTP config)
    return NextResponse.json({ ok: true, emailed: false, previewUrl: null });
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

/** TEMP: list latest 5 messages (remove once done testing) */
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
