// src/app/api/contact/route.ts
export const runtime = "nodejs"; // keep this

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { sendContactEmail } from "@/lib/mail";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  website: z.string().optional(),
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
    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      return NextResponse.json({ ok: true }); // honeypot
    }

    const { name, email, message } = parsed.data;

    // 🔎 Log (safe) to confirm the route is hit in prod and see which DB host we’re using
    console.log("[contact] saving", {
      name,
      emailLen: email.length,
      msgLen: message.length,
    });
    console.log(
      "[contact] DB host:",
      process.env.DATABASE_URL?.split("@")[1]?.split("/")[0] ?? "unknown"
    );

    // ✅ Write
    await prisma.contactMessage.create({ data: { name, email, message } });

    try {
      const { previewUrl } = await sendContactEmail({ name, email, message });
      return NextResponse.json({ ok: true, previewUrl });
    } catch {
      return NextResponse.json({ ok: true, previewUrl: null });
    }
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// TEMP: GET debugger — list last 5 messages
export async function GET() {
  try {
    // show db + last 5
    const last = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return NextResponse.json({ ok: true, lastCount: last.length, last });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
