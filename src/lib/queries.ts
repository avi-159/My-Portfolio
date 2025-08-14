import { prisma } from "@/lib/db";

export type ProjectDTO = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  cover: string | null;
  tags: string[];
  metrics: { label: string; value: string }[];
};

export async function getAllProjects(): Promise<ProjectDTO[]> {
  const rows = await prisma.project.findMany({
    orderBy: { year: "desc" },
    include: {
      metrics: true,
      tags: { include: { tag: true } },
    },
  });

  return rows.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    year: p.year,
    cover: p.cover,
    tags: p.tags.map((pt) => pt.tag.name).sort(),
    metrics: p.metrics.map((m) => ({ label: m.label, value: m.value })),
  }));
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectDTO | null> {
  const p = await prisma.project.findUnique({
    where: { slug },
    include: {
      metrics: true,
      tags: { include: { tag: true } },
    },
  });
  if (!p) return null;
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    year: p.year,
    cover: p.cover,
    tags: p.tags.map((pt) => pt.tag.name).sort(),
    metrics: p.metrics.map((m) => ({ label: m.label, value: m.value })),
  };
}

export async function getAllTagNames(): Promise<string[]> {
  const tags = await prisma.tag.findMany({ select: { name: true } });
  return tags.map((t) => t.name).sort();
}
