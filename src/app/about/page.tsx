// src/app/about/page.tsx
import Link from "next/link";
import JourneyTimeline from "@/components/JourneyTimeline";

export default function AboutPage() {
  return (
    <section className="space-y-12">
      {/* Intro */}
      <header>
        <h1 className="text-3xl md:text-5xl font-bold text-white">About Me</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          I’m a Business Analytics professional who blends engineering roots
          with data storytelling — turning complex datasets into clear,
          actionable decisions for product, operations, and leadership.
        </p>
      </header>

      {/* Combined Education + Professional Journey */}
      <section
        aria-labelledby="journey-title"
        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <h2 id="journey-title" className="text-xl font-semibold text-white">
            Journey timeline (education + professional)
          </h2>
          <span className="text-xs text-slate-400">
            Hover / tap points for details
          </span>
        </div>

        <div className="mt-4">
          <JourneyTimeline />
        </div>

        <p className="mt-4 text-sm text-slate-400">
          A single timeline that traces the path from B.Tech (2015) through
          DRDO, Infosys impact, MSc at Galway, and recent projects — showing
          growth in responsibility and scope over time.
        </p>
      </section>

      {/* The journey (scannable beats) */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white">The journey</h2>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-slate-100">
              Engineering roots → DRDO
            </h3>
            <p className="mt-2 text-slate-300 text-sm">
              Analysed NASA SMAP satellite data to assess terrain mobility —
              first hands‑on experience with large‑scale, decision‑critical
              datasets.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-slate-100">
              Infosys — QA & automation
            </h3>
            <p className="mt-2 text-slate-300 text-sm">
              Built 50+ automation scripts and dashboards; reduced defect
              leakage by <strong>30%</strong> and improved delivery efficiency
              by <strong>70%</strong>; presented weekly KPI narratives to
              stakeholders.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-slate-100">
              MSc Business Analytics — UoG
            </h3>
            <p className="mt-2 text-slate-300 text-sm">
              Advanced SQL, Python, statistics & forecasting; GBM demand model (
              <strong>R² 0.9277</strong>) and a Gen‑AI legal tech solution.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-slate-100">Today & beyond</h3>
            <p className="mt-2 text-slate-300 text-sm">
              Applying systems thinking + analytics to real problems; focused on
              clear dashboards, ML insights, and measurable outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Let’s collaborate
            </h2>
            <p className="text-slate-300">
              Have a project or role in mind? I’m always up for a good problem
              to solve.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-xl px-4 py-2 bg-white text-slate-900 hover:bg-slate-200"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-xl px-4 py-2 border border-white/20 text-white hover:bg-white/10"
            >
              Contact Me
            </Link>
            <Link
              href="/Avinash_Pachauri.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-4 py-2 border border-white/20 text-white hover:bg-white/10"
            >
              Download CV
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
