// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects, getProjectBySlug } from "@/lib/queries";
import LineChartCard from "@/components/LineChartCard";

// src/app/projects/[slug]/page.tsx

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header Section */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">{project.title}</h1>
        <div className="flex gap-3 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: The Narrative */}
        <div className="lg:col-span-2 space-y-12">
          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-white">
              Executive Summary
            </h2>
            <p className="text-gray-300 leading-relaxed">{project.summary}</p>

            <h2 className="text-2xl font-semibold text-white mt-8">
              Technical Workflow
            </h2>
            <p className="text-gray-300">
              I transitioned the analysis from a messy Jupyter Notebook to a{" "}
              <strong>Modular Python Pipeline</strong>. The project involved
              cleaning 9 separate relational tables, translating Portuguese
              attributes, and handling complex payment aggregations to prevent
              revenue inflation.
            </p>
          </section>

          {/* TABLEAU SECTION */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-1 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Interactive Business Dashboard
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Explore logistics efficiency and geographic market share.
              </p>
            </div>
            {/* Replace with your actual Tableau Public Embed URL */}
            <iframe
              src="https://public.tableau.com/views/OList_analysis/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link?:showVizHome=no&embed=true"
              className="w-full aspect-[16/9] border-0"
            />
          </section>
        </div>

        {/* Right Column: Sidebar Links & Metrics */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Project Links
            </h3>
            <div className="space-y-3">
              <a
                href="YOUR_GITHUB_LINK"
                className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition"
              >
                <span>View Python ETL</span>
                <span>→</span>
              </a>
              <a
                href="YOUR_TABLEAU_LINK"
                className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition"
              >
                <span>Tableau Public</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Key Accomplishment
            </h3>
            <p className="text-sm text-gray-300">
              Identified a 15% revenue gap by correcting payment-join
              duplications in the raw dataset.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
