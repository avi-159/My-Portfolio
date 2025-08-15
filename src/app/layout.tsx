import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Name — Data Analytics Portfolio",
  description: "Projects, dashboards, and insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <header className="flex items-center justify-between">
            <Link className="font-semibold" href="/">
              Avinash Pachauri
            </Link>
            <nav className="flex gap-6 text-sm" aria-label="Primary">
              <Link href="/projects" className="hover:underline">
                Projects
              </Link>
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </nav>
          </header>
          <main className="py-10">{children}</main>
          <footer className="border-t mt-12 pt-6 text-sm text-slate-500">
            © {new Date().getFullYear()} Avinash Pachauri | Data Analytics
          </footer>
        </div>
      </body>
    </html>
  );
}
