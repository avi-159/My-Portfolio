// src/components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { ProjectDTO } from "@/lib/queries"; // <— use the DB DTO

export default function ProjectCard({ project }: { project: ProjectDTO }) {
  const cover = project.cover ?? undefined; // normalize null → undefined for TS/Next<Image>

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
        {cover ? (
          <Image
            src={cover}
            alt={project.title}
            width={1200}
            height={675}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No image
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold leading-snug">{project.title}</h3>
          <span className="text-xs text-slate-500">{project.year}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-slate-700">
          {project.summary}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2 py-0.5 text-xs text-slate-700"
            >
              {t}
            </span>
          ))}
        </div>

        {project.metrics?.length ? (
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-700">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg bg-slate-50 px-2 py-1 border"
              >
                <span className="font-medium">{m.value}</span>{" "}
                <span className="text-slate-500">{m.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
