// src/components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { ProjectDTO } from "@/lib/queries";

export default function ProjectCard({ project }: { project: ProjectDTO }) {
  const cover = project.cover ?? undefined;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl"
    >
      {/* Image Container */}
      <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-900">
        {cover ? (
          <Image
            src={cover}
            alt={project.title}
            width={1200}
            height={675}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            priority={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-700 font-mono italic">
            {/* Corrected: Comments inside tags must be in braces */}
            {"// image_not_found"}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          <span className="font-mono text-sm text-zinc-500 bg-zinc-800/50 px-3 py-1 rounded-full border border-white/5">
            {project.year}
          </span>
        </div>

        <p className="text-zinc-400 mb-6 line-clamp-2 leading-relaxed font-light">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[11px] uppercase tracking-wider font-semibold text-blue-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Metrics Grid */}
        {project.metrics?.length ? (
          <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-white font-bold text-lg">{m.value}</span>
                <span className="text-zinc-500 text-xs uppercase tracking-tighter">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {/* Decorative Arrow */}
        <div className="absolute bottom-8 right-8 text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
