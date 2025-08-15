"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from "recharts";

/** Categories we’ll visualize with distinct dot colors */
type Category = "Education" | "Work" | "Project";

/** A unified milestone for education + work + project beats */
export type JourneyMilestone = {
  year: number; // e.g., 2015, 2018, 2019...
  title: string; // short label, e.g., "B.Tech (VIT)"
  blurb: string; // 1–2 sentence description for tooltip
  category: Category; // "Education" | "Work" | "Project"
  value: number; // 0–100 index for a gentle “progress” curve
  link?: string; // optional deep link (e.g., /projects/airbnb-demand)
};

/** Default data — edit freely */
const data: JourneyMilestone[] = [
  {
    year: 2015,
    title: "B.Tech (VIT)",
    blurb:
      "Started B.Tech in Mechanical Engineering at VIT. Built foundations in systems thinking and problem‑solving.",
    category: "Education",
    value: 10,
  },
  {
    year: 2018,
    title: "DRDO Internship",
    blurb:
      "Analysed NASA SMAP satellite data to assess terrain mobility for military vehicles — first exposure to large‑scale, decision‑critical data.",
    category: "Work",
    value: 25,
  },
  {
    year: 2019,
    title: "Infosys — Test Analyst",
    blurb:
      "Joined Infosys; began building automation scripts, reporting dashboards, and QA processes across energy/banking/utilities.",
    category: "Work",
    value: 40,
  },
  {
    year: 2021,
    title: "Impact @ Infosys",
    blurb:
      "50+ automation scripts; 30% ↓ defect leakage and 70% ↑ delivery efficiency; weekly KPI storytelling to stakeholders.",
    category: "Work",
    value: 60,
  },
  {
    year: 2023,
    title: "MSc Business Analytics (UoG)",
    blurb:
      "Level‑up in SQL, Python, statistics & forecasting; sharpened data storytelling to connect methods with outcomes.",
    category: "Education",
    value: 75,
  },
  {
    year: 2024,
    title: "Airbnb Demand (GBM R² 0.9277)",
    blurb:
      "Integrated bookings, reviews, weather & events; features like availability ratio, event counts & sentiment drove performance.",
    category: "Project",
    value: 85,
    link: "/projects", // update to your real slug when ready
  },
  {
    year: 2024.5,
    title: "CaseCraft (Gen‑AI Legal Tech)",
    blurb:
      "Automates drafting, summarization, argument generation & moot prep — demoed faster legal workflows.",
    category: "Project",
    value: 88,
    link: "/projects",
  },
  {
    year: 2025,
    title: "Today",
    blurb:
      "Applying systems thinking + analytics to mission‑driven problems; portfolio live with projects & dashboards.",
    category: "Work",
    value: 92,
  },
  /*{
    year: 2026,
    title: "New Role — Data Analyst",
    blurb:
      "Owning analytics for XYZ domain; building KPIs and predictive models.",
    category: "Work",
    value: 95,
    link: "/projects/new-role", // optional
  },*/
];

/** Category colors for the dots (kept subtle but distinct on dark UI) */
const catColor: Record<Category, string> = {
  Education: "#60a5fa", // Tailwind sky-400
  Work: "#34d399", // emerald-400
  Project: "#a78bfa", // violet-400
};

/** Dark tooltip with category color chip */
function DarkTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) {
  if (!active || !payload || !payload.length) return null;
  const m: JourneyMilestone = payload[0].payload;
  return (
    <div className="max-w-[320px] rounded-xl border border-white/10 bg-slate-900/90 p-3 text-xs text-slate-200 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: catColor[m.category] }}
        />
        <div className="font-semibold text-slate-100">
          {Math.floor(m.year)} — {m.title}
        </div>
      </div>
      <div className="mt-2 leading-relaxed text-slate-300">{m.blurb}</div>
      {m.link && (
        <div className="mt-2">
          <a
            href={m.link}
            className="text-[11px] text-slate-300 underline hover:opacity-80"
          >
            Learn more
          </a>
        </div>
      )}
    </div>
  );
}

/** Optional legend rendered above the chart */
function Legend() {
  const items: { name: Category; color: string }[] = [
    { name: "Education", color: catColor.Education },
    { name: "Work", color: catColor.Work },
    { name: "Project", color: catColor.Project },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
      {items.map((it) => (
        <span key={it.name} className="inline-flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: it.color }}
          />
          {it.name}
        </span>
      ))}
    </div>
  );
}

/** The timeline component */
export default function JourneyTimeline({
  milestones = data,
  height = 280,
}: {
  milestones?: JourneyMilestone[];
  height?: number;
}) {
  return (
    <div className="w-full">
      <div className="mb-3">
        <Legend />
      </div>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={milestones}
            margin={{ top: 10, right: 16, bottom: 8, left: 0 }}
          >
            <defs>
              <linearGradient id="journey-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />

            <XAxis
              dataKey="year"
              type="number"
              domain={["dataMin - 0.25", "dataMax + 0.25"]}
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
              tickLine={{ stroke: "rgba(255,255,255,0.15)" }}
              allowDecimals={false}
            />
            <YAxis domain={[0, 100]} hide />

            <Tooltip content={<DarkTooltip />} />

            {/* Soft “progress” curve to guide the eye */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth={2}
              fill="url(#journey-fill)"
              activeDot={{ r: 5, strokeWidth: 0 }}
            />

            {/* Category-colored reference dots */}
            {milestones.map((m, idx) => (
              <ReferenceDot
                key={`${m.year}-${idx}`}
                x={m.year}
                y={m.value}
                r={5}
                fill={catColor[m.category]}
                stroke="rgba(0,0,0,0.25)"
                strokeWidth={0}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
