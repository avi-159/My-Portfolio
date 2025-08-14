"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  allTags: string[];
};

function useDebounced<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function ProjectsFilters({ allTags }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // read initial values from URL
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [selected, setSelected] = useState<string[]>(
    (sp.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
  );

  const debouncedQ = useDebounced(q, 300);

  // update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(sp.toString());
    debouncedQ ? params.set("q", debouncedQ) : params.delete("q");
    selected.length
      ? params.set("tags", selected.join(","))
      : params.delete("tags");
    router.replace(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, selected]);

  function toggle(tag: string) {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function clearAll() {
    setQ("");
    setSelected([]);
  }

  const hasActive = q.length > 0 || selected.length > 0;

  const tagSet = useMemo(() => new Set(selected), [selected]);

  return (
    <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects (title, summary, tags)…"
          className="w-full rounded-xl border px-4 py-2 outline-none"
          aria-label="Search projects"
        />

        <div className="flex gap-2 md:justify-end">
          {hasActive && (
            <button
              onClick={clearAll}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const active = tagSet.has(tag);
          return (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              className={`rounded-full px-3 py-1 text-sm border ${
                active ? "bg-slate-900 text-white" : "bg-white text-slate-700"
              }`}
              aria-pressed={active}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
