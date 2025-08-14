// src/app/api/contact/route.ts
export const runtime = "nodejs"; // ✅ ensure Node runtime for Nodemailer

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { sendContactEmail } from "@/lib/mail";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Valid email required"),
  message: z.string().min(1, "Message is required").max(5000),
  website: z.string().optional(), // honeypot
});

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const parsed = ContactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Honeypot (bots fill hidden fields)
    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const { name, email, message } = parsed.data;

    // Save to DB
    await prisma.contactMessage.create({ data: { name, email, message } });

    // Send email
    try {
      const { previewUrl } = await sendContactEmail({ name, email, message });
      return NextResponse.json({ ok: true, previewUrl });
    } catch (mailErr) {
      console.error("Mail send failed:", mailErr);
      // Still succeed the request so the user isn’t blocked; you decide your policy
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
