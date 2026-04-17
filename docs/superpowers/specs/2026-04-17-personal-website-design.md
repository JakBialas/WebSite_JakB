# Personal Website — Design Spec

**Date:** 2026-04-17
**Author:** Jakub Białas
**Purpose:** Personal "business card" website for job hunting (Junior Data Scientist / Data Analyst / Bioinformatics Analyst).

## Goals

- Present candidate (DS + bioinformatics graduate) to recruiters and hiring managers.
- Showcase skills, selected projects, CV, and contact/social links.
- Build credibility despite lack of commercial experience.
- Be fast, mobile-friendly, and easy to extend as new projects are added.

## Non-Goals

- Blog (may be added later; not in scope).
- Contact form (links only).
- CMS / admin panel (content lives in the repo as Markdown).
- Profile photo.
- Server-side logic.

## Target Audience

- Recruiters (both technical and non-technical HR).
- Hiring managers in DS / ML / data analytics / bioinformatics roles.
- Primarily Polish market, with openness to international/remote (hence bilingual site).

## Stack

- **Framework:** Astro (static site generation).
- **Styling:** plain CSS with CSS variables for theming. No Tailwind or UI frameworks.
- **i18n:** Astro's built-in i18n. Locales: `en` (default) and `pl`. Language switcher in header.
- **Content:** Projects as Markdown in Astro Content Collections (`src/content/projects/*.md`).
- **Hosting:** Cloudflare Pages with GitHub integration. Auto-deploy on push to `main`. Preview deploys on PRs.
- **Repo:** Public GitHub repository.
- **Domain:** TBD — Cloudflare Pages subdomain (`*.pages.dev`) on launch; custom domain connected later.

## Information Architecture (one-pager)

1. **Header** — sticky navigation: name/initials (left); links to `#about`, `#skills`, `#projects`, `#contact` + EN/PL switcher (right).
2. **Hero** — large name, tagline ("Data Scientist with a background in bioinformatics — focused on medical data analysis, survival modeling, and ML."), short 2-sentence intro, CTAs: **Download CV**, **GitHub**, **LinkedIn**.
3. **About** — 3–4 sentences: who, interests (oncology, survival analysis, data augmentation), what kind of role is sought.
4. **Skills** — four categories + languages:
   - *Programming:* Python (pandas, numpy, scikit-learn), R (survival analysis)
   - *Databases:* PostgreSQL, MySQL
   - *Visualization:* Power BI (basic), Tableau (basic)
   - *Tools:* Linux, Git, Jupyter
   - *Languages:* Polish (native), English (B2, FCE)
5. **Projects** — card grid (2 columns desktop, 1 mobile). Two projects at launch:
   - **Cox-SMOTE** — master's thesis on survival data augmentation for small clinical trials. Tech: Python, R, scikit-learn, Cox model, SMOTE. Highlight: original Cox-SMOTE method improving TES ↔ ΔRMST relationship.
   - **GLCM Histopathology** — engineering thesis on GLCM-based image analysis for cancer prognosis. Tech: Python, image processing, Cox model. Highlight: C-index improved from 0.72 → 0.91.
6. **Contact** — email (mailto), LinkedIn, GitHub, location (Chorzów, Poland), **Download CV** button.
7. **Footer** — copyright year, "Built with Astro, hosted on Cloudflare Pages".

## Visual Design

- **Theme:** dark, modern, tech-forward.
- **Palette:**
  - Background primary: `#0b0d10`
  - Background secondary (cards): `#14171c`
  - Text primary: `#e6e8eb`
  - Text muted: `#8b919a`
  - Accent: single accent color — candidate `#7cc4ff` (cool blue) or `#9ae6b4` (mint, nods to bio). Final pick during implementation mockup.
  - Border / divider: `#23272e`
- **Typography:**
  - Inter (sans-serif) for all UI and body text.
  - JetBrains Mono for tech tags and inline code.
  - Scale: hero 48–64px, h2 32px, body 16px, small 14px.
- **Layout:**
  - Max content width ~880px.
  - Section padding top/bottom ~96px desktop, reduced on mobile.
  - 12-column grid used only where useful (skills, projects).
- **Interaction:**
  - Subtle hover on project cards (lift + accent border).
  - Smooth scroll to anchors.
  - No entrance/scroll animations.

## Content Model — Projects

Each project is a Markdown file in `src/content/projects/`.

Frontmatter schema:

```yaml
---
title: string
slug: string
date: YYYY-MM
role: string            # e.g., "Master's thesis"
tech: string[]          # tags
github: string          # URL
featured: boolean
---
```

Body: 2–4 sentence description + bullet-pointed highlights (results, metrics).

Bilingual handling: one file per locale (`cox-smote.en.md`, `cox-smote.pl.md`) OR a single file with per-locale fields — decided in the implementation plan.

Card rendering (component `ProjectCard.astro`) displays: title, description, tech chips, highlight bullets, GitHub link button.

## Repository Structure

```
MySite/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── cv/
│   │   ├── jakub-bialas-cv-en.pdf
│   │   └── jakub-bialas-cv-pl.pdf
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   └── projects/
│   │       ├── cox-smote.md
│   │       └── glcm-histopath.md
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── ProjectCard.astro
│   │   ├── Projects.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   └── LangSwitcher.astro
│   ├── i18n/
│   │   ├── en.json
│   │   └── pl.json
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro        # EN (default)
│   │   └── pl/
│   │       └── index.astro    # PL
│   └── styles/
│       ├── global.css
│       └── tokens.css
└── README.md
```

## Deployment

- Push to `main` → Cloudflare Pages build (`npm run build`) → publishes `dist/`.
- Preview deploy generated for every PR.
- Custom domain configured post-launch via Cloudflare dashboard.

## Success Criteria

- Site passes Lighthouse with >=95 on Performance, Accessibility, Best Practices, SEO.
- Both EN and PL versions render correctly and link to each other.
- All external links (GitHub, LinkedIn, CV) work.
- Adding a new project = creating one Markdown file (no component changes).
- Deploys automatically on push to `main`.

## Open Questions

- Accent color: cool blue vs mint — pick during first mockup review.
- Bilingual project content: two files vs single-file multi-locale — decide in implementation plan.
- Domain: to be purchased later; not blocking launch on `*.pages.dev`.
