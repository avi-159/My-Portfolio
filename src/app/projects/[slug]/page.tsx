// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects, getProjectBySlug } from "@/lib/queries";
import LineChartCard from "@/components/LineChartCard";

export async function generateStaticParams() {
  // Optional: pre-render routes at build time
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 👈 await because Next 15 passes a Promise

  const project = await getProjectBySlug(slug);
  if (!project) return notFound();

  // --- 7B.3: Demo chart only for the "sales-forecasting" project ---
  const isForecasting = project.slug === "sales-forecasting";
  const demoSeries: Array<{ week: string; value: number }> = [
    { week: "W1", value: 120 },
    { week: "W2", value: 132 },
    { week: "W3", value: 128 },
    { week: "W4", value: 140 },
    { week: "W5", value: 138 },
    { week: "W6", value: 150 },
  ];
  // -----------------------------------------------------------------

  return (
    <article className="max-w-3xl">
      <Link href="/projects" className="text-sm text-slate-600 hover:underline">
        ← Back to Projects
      </Link>

      <h1 className="mt-3 text-3xl font-bold">{project.title}</h1>
      <p className="mt-2 text-slate-700">{project.summary}</p>

      {project.cover && (
        <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
          <Image
            src={project.cover}
            alt={project.title}
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {project.metrics?.length ? (
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          {project.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border bg-slate-50 p-3">
              <div className="text-xl font-semibold">{m.value}</div>
              <div className="text-slate-600">{m.label}</div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-full border px-2 py-0.5 text-xs">
            {t}
          </span>
        ))}
      </div>

      <section className="prose mt-8">
        <h2>What I did</h2>
        <p>
          Replace this with your narrative: problem framing, data sources,
          methods, key findings, and business impact.
        </p>
        <ul>
          <li>Data: source, volume, cadence</li>
          <li>Methods: EDA, statistics, modeling</li>
          <li>Outputs: dashboards, reports</li>
          <li>Impact: metrics moved, decisions enabled</li>
        </ul>
      </section>

      {/* --- 7B.3: Render demo chart for forecasting project --- */}
      {isForecasting && (
        <LineChartCard
          title="Weekly Forecast (demo)"
          data={demoSeries}
          xKey="week"
          yKey="value"
          yLabel="Units"
          yFormatOptions={{ maximumFractionDigits: 0 }}
        />
      )}
      {/* -------------------------------------------------------- */}
    </article>
  );
}
