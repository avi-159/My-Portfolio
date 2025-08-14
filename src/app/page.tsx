import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-6 md:grid-cols-5 md:items-center">
      <div className="md:col-span-3">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Turning data into decisions.
        </h1>
        <p className="mt-4 text-slate-700">
          I analyze data, build dashboards, and communicate insights clearly.
          Explore my projects, notebooks, and interactive visuals.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/projects"
            className="rounded-xl px-4 py-2 bg-slate-900 text-white hover:opacity-90"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="rounded-xl px-4 py-2 border border-slate-300 hover:bg-white"
          >
            Contact Me
          </Link>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Quick Stats</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>• Tools: Python, SQL, Tableau/Power BI</li>
            <li>• Specialty: A/B testing, forecasting</li>
            <li>• Focus: storytelling with data</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
