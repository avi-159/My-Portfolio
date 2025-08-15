// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-12">
      {/* 1) HERO — title + subtitle + CTAs */}
      <div className="grid gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Engineer. Analyst. Problem Solver. Storyteller.
          </h1>

          <p className="mt-4 text-slate-300 max-w-2xl">
            I’m Avinash Pachauri — a Business Analytics professional with a
            journey that started in engineering labs and led me to solving
            business problems with data. Along the way, I’ve automated
            processes, built predictive models, and learned how to turn
            complexity into clarity.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
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
      </div>

      {/* NEW: AT A GLANCE (slim card under hero) */}
      <section
        aria-labelledby="glance-title"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
      >
        <h2 id="glance-title" className="text-sm font-semibold text-slate-200">
          At a glance
        </h2>
        <ul className="mt-2 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
          <li>
            • 3+ years in analytics, QA automation & performance improvement
          </li>
          <li>• Tools: SQL, Python, Tableau, Excel</li>
          <li>• Methods: Data analysis, forecasting</li>
        </ul>
      </section>

      {/* 2) STORY TEASER — hook with a real example */}
      <section
        aria-labelledby="story-title"
        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
      >
        <h2 id="story-title" className="text-xl font-semibold text-white">
          My Path So Far
        </h2>
        <p className="mt-3 text-slate-300">
          My first big project? Analysing satellite data at DRDO to understand
          how military vehicles move across different terrains. That’s when I
          realised data could answer big, real‑world questions. Since then, I’ve
          worked at Infosys, built automation scripts, reduced defect rates, and
          completed an MSc in Business Analytics — applying my skills to
          everything from customer behaviour to AI‑powered legal tech.
        </p>
        <div className="mt-4">
          <Link
            href="/about"
            className="inline-flex items-center text-sm text-slate-300 hover:underline"
          >
            Read my full story →
          </Link>
        </div>
      </section>

      {/* 3) QUICK STATS — tangible numbers to back the story */}
      <section aria-labelledby="quick-stats-title">
        <h2 id="quick-stats-title" className="text-xl font-semibold text-white">
          Quick Stats
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {[
            { value: "3+ years", label: "Years experience" },
            { value: "30%", label: "Defect leakage reduced" },
            { value: "70%", label: "Delivery efficiency increase" },
            { value: "Energy · Banking · Utilities", label: "Sectors" },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <div className="text-xl font-semibold text-slate-100">
                {m.value}
              </div>
              <div className="text-slate-300">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4) FEATURED PROJECTS — proof of capability */}
      <section aria-labelledby="projects-title">
        <div className="flex items-end justify-between">
          <h2 id="projects-title" className="text-xl font-semibold text-white">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-slate-300 hover:underline"
          >
            View all projects →
          </Link>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {/* Card 1 */}
          <Link
            href="/projects"
            className="block rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:bg-white/10"
            aria-label="Airbnb Demand Prediction"
          >
            <h3 className="font-semibold text-slate-100">
              Airbnb Demand Prediction
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Gradient Boosting model (R² 0.9277). Features included
              booking-to-availability ratio, event count &amp; sentiment;
              insights for pricing and availability strategy.
            </p>
            <p className="mt-3 text-xs text-slate-400">
              Python · SQL · Tableau
            </p>
          </Link>

          {/* Card 2 */}
          <Link
            href="/projects"
            className="block rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:bg-white/10"
            aria-label="CaseCraft Legal Tech (Gen-AI)"
          >
            <h3 className="font-semibold text-slate-100">
              CaseCraft (Gen‑AI Legal Tech)
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Automates legal drafting, case summarization, argument generation
              & moot court prep to streamline legal workflows.
            </p>
            <p className="mt-3 text-xs text-slate-400">Gen‑AI · NLP</p>
          </Link>

          {/* Card 3 */}
          <Link
            href="/projects"
            className="block rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:bg-white/10"
            aria-label="Customer Behaviour Analysis"
          >
            <h3 className="font-semibold text-slate-100">
              Customer Behaviour Analysis
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              End‑to‑end analytics using Python/Tableau to inform marketing and
              product strategy.
            </p>
            <p className="mt-3 text-xs text-slate-400">Python · Tableau</p>
          </Link>
        </div>
      </section>

      {/* 5) SKILLS SNAPSHOT — show your toolkit */}
      <section aria-labelledby="skills-title">
        <h2 id="skills-title" className="text-xl font-semibold text-white">
          Skills Snapshot
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ul className="space-y-2 text-slate-300">
            <li>
              <span className="text-slate-200 font-medium">Data &amp; BI:</span>{" "}
              SQL, Tableau, Excel
            </li>
            <li>
              <span className="text-slate-200 font-medium">Python:</span>{" "}
              Pandas, NumPy, Matplotlib
            </li>
            <li>
              <span className="text-slate-200 font-medium">Methods:</span> Data
              cleaning, KPI monitoring, statistical analysis, forecasting
            </li>
          </ul>
          <ul className="space-y-2 text-slate-300">
            <li>
              <span className="text-slate-200 font-medium">Process:</span> ETL
              concepts, requirements gathering, business process modelling
              (Visio)
            </li>
            <li>
              <span className="text-slate-200 font-medium">
                Ways of working:
              </span>{" "}
              Agile &amp; Scrum
            </li>
          </ul>
        </div>
      </section>

      {/* 6) ACHIEVEMENTS STRIP — credibility markers */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <div className="flex flex-wrap gap-2">
          {[
            "President's Award (Silver) — Innovation & Entrepreneurship",
            "Medtronic Grand Challenge — Finalist",
            "Infosys Top 5% — Training",
            "INSTA Award — Project Delivery",
          ].map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* 7) CONTACT BANNER — easy to reach out */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Have a project or role in mind?
            </h2>
            <p className="text-slate-300">
              Let’s talk — I usually reply within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl px-4 py-2 bg-white text-slate-900 hover:bg-slate-200"
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
