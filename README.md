# jakubbialas.dev

Personal website for Jakub Białas. One-page bilingual (EN/PL) site built with Astro, deployed to Cloudflare Pages via GitHub.

## Develop

    npm install
    npm run dev

Opens on http://localhost:4321

## Build

    npm run build

Output in `dist/`.

## Structure

- `src/pages/` — `index.astro` (EN, default) and `pl/index.astro` (PL)
- `src/components/` — Hero, About, Skills, Projects, Contact, Footer, Header, LangSwitcher, ProjectCard
- `src/content/projects/` — project entries as Markdown, one file per locale (`<slug>.<locale>.md`)
- `src/i18n/` — UI strings (`en.json`, `pl.json`) and helpers
- `src/styles/` — design tokens and global CSS
- `public/cv/` — CV PDFs (EN and PL)

## Adding a project

Create two files in `src/content/projects/`: `<slug>.en.md` and `<slug>.pl.md`, following the frontmatter in existing entries. It will appear on both pages automatically.

## Deploy

Connected to Cloudflare Pages. Every push to `main` triggers a production deploy; PRs get preview deploys.
