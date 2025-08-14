// src/app/projects/page.tsx
import { getAllProjects, getAllTagNames } from "@/lib/queries";
import ProjectsBrowser from "@/components/ProjectsBrowser";

export const revalidate = 0; // always fresh in dev; adjust for caching if you want

export default async function ProjectsPage() {
  const [allProjects, allTags] = await Promise.all([
    getAllProjects(),
    getAllTagNames(),
  ]);

  return (
    <section>
      <header className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-slate-700">
          Search and filter by tags. Backed by a SQLite database.
        </p>
      </header>

      <ProjectsBrowser allProjects={allProjects} allTags={allTags} />
    </section>
  );
}
