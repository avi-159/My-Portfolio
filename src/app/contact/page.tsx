"use client";
import { useState } from "react";

type ContactResponse = {
  ok: boolean;
  previewUrl?: string | null;
  error?: string;
  message?: string;
  // details is whatever Zod returns on validation errors; we won’t use it
  details?: unknown;
};

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // capture the form element BEFORE any await
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    setStatus("sending");
    setErrorMsg(null);
    setPreviewUrl(null);

    try {
      const payload = Object.fromEntries(form.entries());

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: ContactResponse | null = null;
      try {
        data = (await res.json()) as ContactResponse;
      } catch {
        data = null; // non‑JSON response; fall back to status
      }

      const failed = !res.ok || (data && data.ok === false);
      if (failed) {
        const msg =
          (data && (data.error || data.message)) ||
          `Request failed (${res.status})`;
        setErrorMsg(msg);
        setStatus("error");
        return;
      }

      if (data?.previewUrl) setPreviewUrl(data.previewUrl ?? null);
      setStatus("sent");
      formEl.reset();
    } catch (err: unknown) {
      // no 'any' here — narrow unknown
      const msg = err instanceof Error ? err.message : "Unexpected error";
      console.error("Contact submit error:", err);
      setErrorMsg(msg);
      setStatus("error");
    }
  }

  return (
    <section className="max-w-lg">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="mt-2 text-slate-700">
        Send a message and I’ll get back to you.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          name="name"
          required
          placeholder="Your name"
          className="w-full rounded-xl border px-4 py-2"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="w-full rounded-xl border px-4 py-2"
        />
        <textarea
          name="message"
          required
          placeholder="Your message"
          className="w-full rounded-xl border px-4 py-2 h-32"
        />
        {/* honeypot (keep hidden) */}
        <input
          type="text"
          name="website"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <button
          disabled={status === "sending"}
          className="rounded-xl px-4 py-2 bg-slate-900 text-white"
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>

        {status === "sent" && (
          <p className="text-green-600 text-sm">
            Thanks! Message sent.
            {previewUrl && (
              <>
                {" "}
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  View email preview
                </a>
              </>
            )}
          </p>
        )}

        {status === "error" && (
          <p className="text-red-600 text-sm">
            Something went wrong{errorMsg ? ` — ${errorMsg}` : ""}.
          </p>
        )}
      </form>
    </section>
  );
}
