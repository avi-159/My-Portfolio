# ---- base ----
FROM node:20-slim AS base
WORKDIR /app
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
# Helps file watching on some hosts (optional; remove if CPU gets high)
ENV CHOKIDAR_USEPOLLING=1
RUN corepack enable

# Prisma engines & common tools
RUN apt-get update -y && apt-get install -y openssl git && rm -rf /var/lib/apt/lists/*

# ---- deps (npm) ----
FROM base AS deps
COPY package.json package-lock.json ./
# IMPORTANT: don't run postinstall here; schema isn't copied yet
RUN npm ci --ignore-scripts

# ---- dev runtime ----
FROM base AS dev
# Reuse installed deps
COPY --from=deps /app/node_modules ./node_modules
# Bring in the rest of the source (now prisma/schema.prisma exists)
COPY . .

# Now it's safe to generate Prisma client (respecting your schema)
RUN npx prisma generate

EXPOSE 3000
# Use your exact dev script (Turbopack)
CMD ["npm", "run", "dev", "--", "-p", "3000"]
