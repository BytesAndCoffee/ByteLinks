# Repository Guidelines

## Project Structure & Module Organization

This is a reusable Next.js App Router template. Application routes and styles
live under `src/app/`, profile content lives in `src/data/profile.json`,
deployment examples live in `deploy/`, and detailed guides live in `docs/`.

## Build, Test, and Development Commands

Use Bun, as declared by the `packageManager` field in `package.json`.

- `bun install` installs dependencies.
- `bun dev` starts the local development server.
- `bun run build` creates the production Next.js build.
- `docker compose up -d --build` builds and runs the production container.

## Coding Style & Naming Conventions

Use TypeScript, two-space indentation, and functional React components.
Prefer `camelCase` for variables and functions, `PascalCase` for components,
and descriptive kebab-case filenames. Keep routes focused and use Server
Components unless browser-side state or APIs require `"use client"`.

## Testing Guidelines

No testing framework or coverage threshold is configured yet. New interactive
behavior should include automated tests. Always run `bun run build` and verify
`/api/health` before opening a pull request.

## Commit & Pull Request Guidelines

Use short, imperative subjects such as `Add social link` and keep each commit
focused.

Pull requests should explain the change, note how it was tested, and link any
related issue. Include screenshots or recordings for visible UI changes, and
call out new configuration or migration steps explicitly.
