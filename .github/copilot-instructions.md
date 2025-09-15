# OpsSync API — Copilot & AI Agent Instructions

## Project Overview
- **Type:** Node.js REST API using Express, written in TypeScript
- **Entrypoint:** `src/index.ts` (main app), `src/routes/health.ts` (example route)
- **Purpose:** Provides API endpoints for OpsSync platform; currently includes health check and base ping.

## Architecture & Patterns
- **Express app** is initialized in `src/index.ts`.
- **Routes** are organized under `src/routes/` (e.g., `health.ts`).
- **CORS** is configured to allow only specific origins (see `defaultOrigins` in `src/index.ts`).
- **Environment variables** are loaded via `dotenv` (see `.env.example` for required vars).
- **Port** is set by `PORT` env var (injected by Render in production).
- **All responses** are JSON except for the root `/` ping (plain text).

## Developer Workflows
- **Development server:** `npm run dev` (uses `ts-node-dev` for hot reload)
- **Build:** `npm run build` (outputs to `dist/`)
- **Production start:** `npm start` (runs compiled JS from `dist/`)
- **Lint:** `npm run lint` (currently a placeholder)
- **Environment setup:** Copy `.env.example` to `.env` and adjust as needed.

## Conventions & Practices
- **TypeScript strict mode** is enabled (see `tsconfig.json`).
- **Module system:** CommonJS (`type: commonjs` in `package.json`).
- **No custom error handling** yet; errors will propagate as Express defaults.
- **No database or external service integration** in current codebase.
- **No test framework** is set up yet.

## Integration Points
- **External dependencies:** `express`, `cors`, `dotenv` (see `package.json`).
- **CORS origins** can be overridden via `ALLOWED_ORIGINS` env var (comma-separated list).
- **Render.com** is used for deployment (see `.env.example` notes).

## Examples
- **Add a new route:** Create a file in `src/routes/`, export an Express router, and import/use it in `src/index.ts`.
- **Health check endpoint:** `GET /healthz` returns `{ status: "ok", uptime, timestamp }`.

## Key Files
- `src/index.ts` — main app, CORS, env, route wiring
- `src/routes/health.ts` — health check route example
- `.env.example` — required environment variables
- `package.json` — scripts, dependencies

---

**For AI agents:**
- Follow the structure and patterns in `src/index.ts` and `src/routes/` for new endpoints.
- Use environment variables for configuration; do not hardcode secrets.
- Keep code TypeScript strict-compatible.
- If adding new workflows or integrations, document them here.
