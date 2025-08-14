-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "cover" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Metric_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectTag" (
    "projectId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    PRIMARY KEY ("projectId", "tagId"),
    CONSTRAINT "ProjectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
