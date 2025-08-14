/**
 * Prisma seed (SQLite) — easy to edit & safe to re-run.
 * - Edit the DATA array with your real projects.
 * - By default, it UPSERTS (updates/creates) without deleting other projects.
 * - To wipe demo data first, run with SEED_RESET=1 (see instructions below).
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ---------- 1) EDIT ME LATER: your portfolio data ----------
/** @type {{
 *  slug: string;
 *  title: string;
 *  summary: string;
 *  year: number;
 *  cover?: string;
 *  tags: string[];
 *  metrics?: { label: string; value: string }[];
 * }[]} */
const DATA = [
  {
    slug: "ab-test-conversion",
    title: "A/B Test: Checkout Conversion",
    summary:
      "Designed and analyzed an A/B test for checkout UX. Measured uplift, power, and confidence intervals; recommended rollout.",
    year: 2024,
    cover: "/projects/ab-test-conversion/cover.jpg",
    tags: ["Experimentation", "Stats", "Python"],
    metrics: [
      { label: "Uplift", value: "+3.8%" },
      { label: "p-value", value: "0.021" },
    ],
  },
  {
    slug: "sales-forecasting",
    title: "Sales Forecasting with Prophet",
    summary:
      "Time-series pipeline with holiday effects and cross-validation. Deployed weekly forecasts and alerting.",
    year: 2023,
    cover: "/projects/sales-forecasting/cover.jpg",
    tags: ["Forecasting", "Time Series", "Python"],
    metrics: [
      { label: "MAPE", value: "6.1%" },
      { label: "Horizon", value: "12 weeks" },
    ],
  },
  {
    slug: "customer-segmentation",
    title: "Customer Segmentation",
    summary:
      "RFM/K-Means segmentation to tailor lifecycle messaging and promo strategy.",
    year: 2022,
    cover: "/projects/customer-segmentation/cover.jpg",
    tags: ["Clustering", "SQL", "BI"],
    metrics: [],
  },
  {
    slug: "airbnb-demand-forecasting",
    title: "Machine Learning and Data Analytics",
    summary:
      "Designed and analyzed an A/B test for checkout UX. Measured uplift, power, and confidence intervals; recommended rollout.",
    year: 2024,
    cover: "/projects/ab-test-conversion/cover.jpg",
    tags: ["Experimentation", "Stats", "Python"],
    metrics: [
      { label: "Uplift", value: "+3.8%" },
      { label: "p-value", value: "0.021" },
    ],
  },
];
// -----------------------------------------------------------

// Optional: set SEED_RESET=1 to wipe Projects/Tags/Metrics before seeding
const SHOULD_RESET = process.env.SEED_RESET === "1";

// ---------- helpers ----------
async function ensureTag(name) {
  return prisma.tag.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

async function syncProject(p) {
  // 1) ensure all tags exist
  const tags = await Promise.all((p.tags ?? []).map(ensureTag));

  // 2) upsert project main fields
  const project = await prisma.project.upsert({
    where: { slug: p.slug },
    update: {
      title: p.title,
      summary: p.summary,
      year: p.year,
      cover: p.cover ?? null,
      updatedAt: new Date(),
    },
    create: {
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      year: p.year,
      cover: p.cover ?? null,
    },
  });

  // 3) replace tag relations (simple & deterministic)
  await prisma.projectTag.deleteMany({ where: { projectId: project.id } });
  if (tags.length) {
    await prisma.projectTag.createMany({
      data: tags.map((t) => ({ projectId: project.id, tagId: t.id })),
    });
  }

  // 4) replace metrics (simple & deterministic)
  await prisma.metric.deleteMany({ where: { projectId: project.id } });
  if (p.metrics?.length) {
    await prisma.metric.createMany({
      data: p.metrics.map((m) => ({
        label: m.label,
        value: m.value,
        projectId: project.id,
      })),
    });
  }

  return project;
}

async function validateData() {
  // unique slugs check
  const slugs = new Set();
  for (const p of DATA) {
    if (!p.slug || !p.title) {
      throw new Error(
        `Each project needs at least 'slug' and 'title'. Offender: ${JSON.stringify(
          p
        )}`
      );
    }
    if (slugs.has(p.slug)) {
      throw new Error(
        `Duplicate slug "${p.slug}" in DATA. Slugs must be unique.`
      );
    }
    slugs.add(p.slug);
  }
}

async function resetAll() {
  console.log("🧹 Resetting tables: metrics, projectTag, projects, tags...");
  await prisma.metric.deleteMany({});
  await prisma.projectTag.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.tag.deleteMany({});
  console.log("✅ Reset complete.");
}

// ---------- main ----------
async function main() {
  await validateData();

  if (SHOULD_RESET) {
    await resetAll();
  }

  console.log(`Seeding ${DATA.length} project(s)...`);
  for (const p of DATA) {
    try {
      console.log(`➡️  ${p.slug}`);
      await syncProject(p);
      console.log(`   ✅ done`);
    } catch (e) {
      console.error(`   ❌ failed:`, e?.message || e);
    }
  }

  const [pc, tc, mc] = await Promise.all([
    prisma.project.count(),
    prisma.tag.count(),
    prisma.metric.count(),
  ]);

  console.log(
    `\n🎉 Seed finished. Totals → Projects: ${pc}, Tags: ${tc}, Metrics: ${mc}`
  );
}

main()
  .catch((e) => {
    console.error("Seed crashed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
