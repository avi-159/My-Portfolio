"use client";

import { useSearchParams } from "next/navigation";
import ProjectsFilters from "@/components/ProjectsFilters";
import ProjectCard from "@/components/ProjectCard";

export type ProjectDTO = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  cover: string | null;
  tags: string[];
  metrics: { label: string; value: string }[];
};

export default function ProjectsBrowser({
  allProjects,
  allTags,
}: {
  allProjects: ProjectDTO[];
  allTags: string[];
}) {
  const sp = useSearchParams();
  const q = (sp.get("q") ?? "").toLowerCase();
  const selectedTags = (sp.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const filtered = allProjects.filter((p) => {
    const text = (
      p.title +
      " " +
      p.summary +
      " " +
      p.tags.join(" ")
    ).toLowerCase();
    const okQ = q ? text.includes(q) : true;
    const okTags = selectedTags.length
      ? selectedTags.every((t) => p.tags.includes(t))
      : true;
    return okQ && okTags;
  });

  return (
    <>
      <ProjectsFilters allTags={allTags} />

      <p className="mb-3 text-sm text-slate-600">
        Showing <span className="font-medium">{filtered.length}</span> of{" "}
        {allProjects.length}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-xl border bg-white p-6 text-slate-600">
          No projects match your filters.
        </div>
      )}
    </>
  );
}
