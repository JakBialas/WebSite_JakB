# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (EN/PL) one-page personal website ("business card") for Jakub Białas, deployed to Cloudflare Pages via GitHub integration.

**Architecture:** Astro static site with Content Collections for projects, CSS variables for dark theme tokens, built-in Astro i18n for EN/PL routes, deployed statically to Cloudflare Pages.

**Tech Stack:** Astro 4+, TypeScript, plain CSS (no framework), Cloudflare Pages, GitHub.

---

## File Structure

Files to create across all tasks:

- `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore` — project setup
- `src/styles/tokens.css` — design tokens (colors, spacing, type scale)
- `src/styles/global.css` — reset + base styles
- `src/layouts/Base.astro` — HTML shell, meta, fonts, language attr
- `src/i18n/en.json`, `src/i18n/pl.json` — UI strings
- `src/i18n/utils.ts` — helper to load translations by locale
- `src/components/Header.astro` — sticky nav + lang switcher
- `src/components/LangSwitcher.astro` — EN/PL toggle
- `src/components/Hero.astro` — name, tagline, CTAs
- `src/components/About.astro` — short bio
- `src/components/Skills.astro` — categorized skill lists
- `src/components/ProjectCard.astro` — single project card
- `src/components/Projects.astro` — project grid
- `src/components/Contact.astro` — links block
- `src/components/Footer.astro` — footer
- `src/content/config.ts` — Content Collections schema
- `src/content/projects/cox-smote.md` — project entry
- `src/content/projects/glcm-histopath.md` — project entry
- `src/pages/index.astro` — EN home (default locale)
- `src/pages/pl/index.astro` — PL home
- `public/favicon.svg`
- `public/cv/jakub-bialas-cv-en.pdf` (user provides)
- `README.md`

---

## Task 1: Initialize repo and Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `README.md`

- [ ] **Step 1: Initialize git**

```bash
cd /home/tomek/KUBA/MySite
git init -b main
```

- [ ] **Step 2: Scaffold Astro project (non-interactive)**

Run:

```bash
cd /home/tomek/KUBA/MySite
npm create astro@latest . -- --template minimal --typescript strict --install --no-git --skip-houston --yes
```

Expected: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `node_modules/` created. If scaffold refuses because the directory is not empty (existing `docs/` and `.remember/`), use `--yes` and confirm manually; if it still refuses, scaffold into a temp directory and move files in, leaving `docs/` and `.remember/` intact.

- [ ] **Step 3: Configure i18n in `astro.config.mjs`**

Replace contents with:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jakubbialas.pages.dev',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

- [ ] **Step 4: Write `.gitignore`**

```
node_modules
dist
.astro
.env
.env.local
.DS_Store
.vscode
```

- [ ] **Step 5: Write minimal `README.md`**

```md
# jakubbialas.dev

Personal website. Astro + Cloudflare Pages.

## Dev

    npm install
    npm run dev

## Build

    npm run build
```

- [ ] **Step 6: Verify dev server boots**

Run: `npm run dev` (background, kill after check)
Expected: Server responds on `http://localhost:4321` with Astro's starter page.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "chore: scaffold Astro project with i18n config"
```

---

## Task 2: Design tokens and base layout

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/Base.astro`

- [ ] **Step 1: Write `src/styles/tokens.css`**

```css
:root {
  --bg-primary: #0b0d10;
  --bg-secondary: #14171c;
  --text-primary: #e6e8eb;
  --text-muted: #8b919a;
  --accent: #7cc4ff;
  --border: #23272e;

  --font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;

  --fs-hero: clamp(2.5rem, 5vw, 4rem);
  --fs-h2: 2rem;
  --fs-body: 1rem;
  --fs-small: 0.875rem;

  --space-section: clamp(3rem, 8vw, 6rem);
  --content-max: 880px;
  --radius: 10px;
}
```

- [ ] **Step 2: Write `src/styles/global.css`**

```css
@import './tokens.css';

*,
*::before,
*::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: var(--fs-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

h1, h2, h3 { line-height: 1.2; margin: 0 0 0.5em; }
h2 { font-size: var(--fs-h2); }

code, .mono { font-family: var(--font-mono); font-size: 0.9em; }

.container {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 1.25rem;
}

section { padding: var(--space-section) 0; }

.muted { color: var(--text-muted); }
```

- [ ] **Step 3: Write `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  lang: 'en' | 'pl';
}

const { title, description, lang } = Astro.props;
---
<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`
Expected: build finishes, `dist/index.html` exists (it still uses starter content — that's fine).

- [ ] **Step 5: Commit**

```bash
git add src/styles src/layouts
git commit -m "feat: add design tokens, global styles, base layout"
```

---

## Task 3: i18n strings and helper

**Files:**
- Create: `src/i18n/en.json`, `src/i18n/pl.json`, `src/i18n/utils.ts`

- [ ] **Step 1: Write `src/i18n/en.json`**

```json
{
  "nav": {
    "about": "About",
    "skills": "Skills",
    "projects": "Projects",
    "contact": "Contact"
  },
  "hero": {
    "tagline": "Data Scientist with a background in bioinformatics — focused on medical data analysis, survival modeling, and ML.",
    "intro": "Graduate in Data Science and Bioinformatics. Looking for my first role as a Data Analyst, Junior Data Scientist, or Bioinformatics Analyst.",
    "cv": "Download CV",
    "github": "GitHub",
    "linkedin": "LinkedIn"
  },
  "about": {
    "heading": "About",
    "body": "I hold a Master's in Data Science and a Bachelor's in Biotechnology (Bioinformatics) from the Silesian University of Technology. My work sits at the intersection of medical data and machine learning — survival analysis, clinical-trial data augmentation, and histopathology image analysis. I'm looking for a first full-time role where I can contribute to real analytics or ML work and keep learning."
  },
  "skills": {
    "heading": "Skills",
    "programming": "Programming",
    "databases": "Databases",
    "visualization": "Visualization",
    "tools": "Tools",
    "languages": "Languages"
  },
  "projects": {
    "heading": "Projects",
    "viewCode": "View code"
  },
  "contact": {
    "heading": "Contact",
    "location": "Chorzów, Poland",
    "email": "Email"
  },
  "footer": {
    "built": "Built with Astro, hosted on Cloudflare Pages."
  }
}
```

- [ ] **Step 2: Write `src/i18n/pl.json`**

```json
{
  "nav": {
    "about": "O mnie",
    "skills": "Umiejętności",
    "projects": "Projekty",
    "contact": "Kontakt"
  },
  "hero": {
    "tagline": "Data Scientist z zapleczem w bioinformatyce — analiza danych medycznych, modele przeżycia i ML.",
    "intro": "Absolwent Data Science i bioinformatyki. Szukam pierwszej pracy jako Data Analyst, Junior Data Scientist lub Bioinformatics Analyst.",
    "cv": "Pobierz CV",
    "github": "GitHub",
    "linkedin": "LinkedIn"
  },
  "about": {
    "heading": "O mnie",
    "body": "Skończyłem studia magisterskie z Data Science i inżynierskie z biotechnologii (bioinformatyka) na Politechnice Śląskiej. Zajmuję się analizą danych medycznych i uczeniem maszynowym — survival analysis, augmentacją danych klinicznych i analizą obrazów histopatologicznych. Szukam pierwszej pełnoetatowej pracy, w której mogę realnie wejść w analitykę/ML i się uczyć."
  },
  "skills": {
    "heading": "Umiejętności",
    "programming": "Programowanie",
    "databases": "Bazy danych",
    "visualization": "Wizualizacja",
    "tools": "Narzędzia",
    "languages": "Języki"
  },
  "projects": {
    "heading": "Projekty",
    "viewCode": "Zobacz kod"
  },
  "contact": {
    "heading": "Kontakt",
    "location": "Chorzów, Polska",
    "email": "Email"
  },
  "footer": {
    "built": "Zbudowane w Astro, hostowane na Cloudflare Pages."
  }
}
```

- [ ] **Step 3: Write `src/i18n/utils.ts`**

```ts
import en from './en.json';
import pl from './pl.json';

export type Locale = 'en' | 'pl';

const dictionaries = { en, pl } as const;

export function t(locale: Locale) {
  return dictionaries[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'pl' : 'en';
}

export function localePath(locale: Locale, path: string = ''): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? clean || '/' : `/pl${clean === '/' ? '' : clean}`;
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/i18n
git commit -m "feat: add i18n dictionaries and helper"
```

---

## Task 4: Header and language switcher

**Files:**
- Create: `src/components/LangSwitcher.astro`, `src/components/Header.astro`

- [ ] **Step 1: Write `src/components/LangSwitcher.astro`**

```astro
---
import { otherLocale, localePath, type Locale } from '../i18n/utils';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const other = otherLocale(locale);
---
<a class="lang-switch" href={localePath(other)} aria-label={`Switch to ${other.toUpperCase()}`}>
  <span class={locale === 'en' ? 'active' : ''}>EN</span>
  <span class="sep">/</span>
  <span class={locale === 'pl' ? 'active' : ''}>PL</span>
</a>

<style>
  .lang-switch {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-muted);
    text-decoration: none;
    letter-spacing: 0.05em;
  }
  .lang-switch:hover { text-decoration: none; color: var(--text-primary); }
  .active { color: var(--accent); }
  .sep { margin: 0 0.35rem; color: var(--border); }
</style>
```

- [ ] **Step 2: Write `src/components/Header.astro`**

```astro
---
import LangSwitcher from './LangSwitcher.astro';
import { t, type Locale } from '../i18n/utils';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const strings = t(locale);
---
<header class="site-header">
  <div class="container nav">
    <a class="brand mono" href={locale === 'en' ? '/' : '/pl'}>JB</a>
    <nav>
      <a href="#about">{strings.nav.about}</a>
      <a href="#skills">{strings.nav.skills}</a>
      <a href="#projects">{strings.nav.projects}</a>
      <a href="#contact">{strings.nav.contact}</a>
      <LangSwitcher locale={locale} />
    </nav>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: color-mix(in srgb, var(--bg-primary) 85%, transparent);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .brand {
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.1em;
    text-decoration: none;
  }
  nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  nav a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: var(--fs-small);
  }
  nav a:hover { color: var(--text-primary); text-decoration: none; }
  @media (max-width: 560px) {
    nav { gap: 0.9rem; }
    nav a { font-size: 0.8rem; }
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.astro src/components/LangSwitcher.astro
git commit -m "feat: add sticky header with language switcher"
```

---

## Task 5: Hero, About, Skills, Contact, Footer components

**Files:**
- Create: `src/components/Hero.astro`, `About.astro`, `Skills.astro`, `Contact.astro`, `Footer.astro`

- [ ] **Step 1: Write `src/components/Hero.astro`**

```astro
---
import { t, type Locale } from '../i18n/utils';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const s = t(locale).hero;
const cvHref = locale === 'en' ? '/cv/jakub-bialas-cv-en.pdf' : '/cv/jakub-bialas-cv-pl.pdf';
---
<section class="hero">
  <div class="container">
    <p class="eyebrow mono">Data Scientist · Bioinformatics</p>
    <h1>Jakub Białas</h1>
    <p class="tagline">{s.tagline}</p>
    <p class="intro muted">{s.intro}</p>
    <div class="ctas">
      <a class="btn primary" href={cvHref} download>{s.cv}</a>
      <a class="btn" href="https://github.com/JakBialas" target="_blank" rel="noopener">{s.github}</a>
      <a class="btn" href="https://www.linkedin.com/in/jakubbialas/" target="_blank" rel="noopener">{s.linkedin}</a>
    </div>
  </div>
</section>

<style>
  .hero { padding-top: calc(var(--space-section) * 0.8); }
  .eyebrow { color: var(--accent); letter-spacing: 0.15em; text-transform: uppercase; font-size: 0.75rem; margin: 0 0 1rem; }
  h1 { font-size: var(--fs-hero); font-weight: 700; margin: 0 0 1rem; }
  .tagline { font-size: 1.25rem; max-width: 42rem; margin: 0 0 1rem; }
  .intro { max-width: 42rem; margin: 0 0 2rem; }
  .ctas { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .btn {
    display: inline-flex; align-items: center;
    padding: 0.6rem 1.1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text-primary);
    font-size: var(--fs-small);
    text-decoration: none;
    transition: border-color .15s ease, color .15s ease;
  }
  .btn:hover { border-color: var(--accent); color: var(--accent); text-decoration: none; }
  .btn.primary { background: var(--accent); color: var(--bg-primary); border-color: var(--accent); font-weight: 600; }
  .btn.primary:hover { color: var(--bg-primary); filter: brightness(1.1); }
</style>
```

- [ ] **Step 2: Write `src/components/About.astro`**

```astro
---
import { t, type Locale } from '../i18n/utils';
interface Props { locale: Locale; }
const { locale } = Astro.props;
const s = t(locale).about;
---
<section id="about">
  <div class="container">
    <h2>{s.heading}</h2>
    <p>{s.body}</p>
  </div>
</section>

<style>
  p { max-width: 42rem; color: var(--text-primary); }
</style>
```

- [ ] **Step 3: Write `src/components/Skills.astro`**

```astro
---
import { t, type Locale } from '../i18n/utils';
interface Props { locale: Locale; }
const { locale } = Astro.props;
const s = t(locale).skills;

const groups = [
  { label: s.programming, items: ['Python (pandas, numpy, scikit-learn)', 'R (survival analysis)'] },
  { label: s.databases, items: ['PostgreSQL', 'MySQL'] },
  { label: s.visualization, items: ['Power BI (basic)', 'Tableau (basic)'] },
  { label: s.tools, items: ['Linux', 'Git', 'Jupyter'] },
  { label: s.languages, items: ['Polish (native)', 'English (B2, FCE)'] },
];
---
<section id="skills">
  <div class="container">
    <h2>{s.heading}</h2>
    <div class="grid">
      {groups.map((g) => (
        <div class="group">
          <h3>{g.label}</h3>
          <ul>
            {g.items.map((item) => <li class="mono">{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }
  .group h3 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
  }
  ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.35rem; }
  li { font-size: 0.9rem; color: var(--text-primary); }
</style>
```

- [ ] **Step 4: Write `src/components/Contact.astro`**

```astro
---
import { t, type Locale } from '../i18n/utils';
interface Props { locale: Locale; }
const { locale } = Astro.props;
const s = t(locale).contact;
const cvHref = locale === 'en' ? '/cv/jakub-bialas-cv-en.pdf' : '/cv/jakub-bialas-cv-pl.pdf';
---
<section id="contact">
  <div class="container">
    <h2>{s.heading}</h2>
    <ul class="links">
      <li><span class="label">{s.email}:</span> <a href="mailto:qba.bialas@gmail.com">qba.bialas@gmail.com</a></li>
      <li><span class="label">LinkedIn:</span> <a href="https://www.linkedin.com/in/jakubbialas/" target="_blank" rel="noopener">linkedin.com/in/jakubbialas</a></li>
      <li><span class="label">GitHub:</span> <a href="https://github.com/JakBialas" target="_blank" rel="noopener">github.com/JakBialas</a></li>
      <li class="muted">{s.location}</li>
    </ul>
    <a class="cv-btn" href={cvHref} download>{t(locale).hero.cv}</a>
  </div>
</section>

<style>
  ul.links { list-style: none; padding: 0; margin: 0 0 1.5rem; display: grid; gap: 0.5rem; }
  .label { color: var(--text-muted); font-family: var(--font-mono); font-size: 0.85rem; margin-right: 0.5rem; }
  .cv-btn {
    display: inline-block;
    padding: 0.6rem 1.1rem;
    border: 1px solid var(--accent);
    border-radius: var(--radius);
    color: var(--accent);
    font-size: var(--fs-small);
    text-decoration: none;
  }
  .cv-btn:hover { background: var(--accent); color: var(--bg-primary); text-decoration: none; }
</style>
```

- [ ] **Step 5: Write `src/components/Footer.astro`**

```astro
---
import { t, type Locale } from '../i18n/utils';
interface Props { locale: Locale; }
const { locale } = Astro.props;
const s = t(locale).footer;
const year = new Date().getFullYear();
---
<footer>
  <div class="container">
    <p class="muted small">© {year} Jakub Białas · {s.built}</p>
  </div>
</footer>

<style>
  footer { border-top: 1px solid var(--border); padding: 2rem 0; }
  .small { font-size: 0.8rem; margin: 0; }
</style>
```

- [ ] **Step 6: Commit**

```bash
git add src/components
git commit -m "feat: add hero, about, skills, contact, footer components"
```

---

## Task 6: Content Collections and project entries

**Files:**
- Create: `src/content/config.ts`, `src/content/projects/cox-smote.md`, `src/content/projects/glcm-histopath.md`

- [ ] **Step 1: Write `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    locale: z.enum(['en', 'pl']),
    slug: z.string(),
    date: z.string(),
    role: z.string(),
    tech: z.array(z.string()),
    github: z.string().url(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    highlights: z.array(z.string()).default([]),
    summary: z.string(),
  }),
});

export const collections = { projects };
```

- [ ] **Step 2: Write `src/content/projects/cox-smote.en.md`**

```md
---
title: "Cox-SMOTE: Survival Data Augmentation"
locale: en
slug: cox-smote
date: 2025-09
role: "Master's thesis"
tech: ["Python", "R", "scikit-learn", "Cox model", "SMOTE"]
github: "https://github.com/JakBialas"
featured: true
order: 1
summary: "Compared 8 survival-data augmentation methods for small clinical trials and developed an original Cox-SMOTE approach."
highlights:
  - "Designed the original Cox-SMOTE method for generating synthetic survival data"
  - "Benchmarked 8 methods including bootstrap, SMOTE, Cox-based approaches"
  - "Built an evaluation framework (TES, ΔRMST, Spearman/Pearson, variance)"
  - "10 repetitions per scenario to assess stability and reproducibility"
---
```

- [ ] **Step 3: Write `src/content/projects/cox-smote.pl.md`**

```md
---
title: "Cox-SMOTE: augmentacja danych przeżycia"
locale: pl
slug: cox-smote
date: 2025-09
role: "Praca magisterska"
tech: ["Python", "R", "scikit-learn", "model Coxa", "SMOTE"]
github: "https://github.com/JakBialas"
featured: true
order: 1
summary: "Porównanie 8 metod augmentacji danych przeżycia dla małych badań klinicznych oraz opracowanie oryginalnej metody Cox-SMOTE."
highlights:
  - "Autorska metoda Cox-SMOTE do generowania syntetycznych danych przeżycia"
  - "Porównanie 8 metod: bootstrap, SMOTE, warianty oparte na modelu Coxa"
  - "Framework ewaluacyjny (TES, ΔRMST, korelacje Spearmana/Pearsona, wariancja)"
  - "10 powtórzeń dla każdego scenariusza — stabilność i reprodukowalność"
---
```

- [ ] **Step 4: Write `src/content/projects/glcm-histopath.en.md`**

```md
---
title: "GLCM Histopathology — Cancer Prognosis"
locale: en
slug: glcm-histopath
date: 2024-01
role: "Engineering thesis"
tech: ["Python", "Image processing", "GLCM", "Cox model"]
github: "https://github.com/JakBialas"
featured: true
order: 2
summary: "GLCM-based histopathology image analysis for cancer prognosis, with a tuned preprocessing pipeline and Cox-model evaluation."
highlights:
  - "Preprocessing pipeline: filtering, morphology, background removal, grayscale calibration"
  - "Evaluated with Cox model, Harrell's C-index, p-value"
  - "C-index improved from 0.72 → 0.91 with tuned parameters"
---
```

- [ ] **Step 5: Write `src/content/projects/glcm-histopath.pl.md`**

```md
---
title: "GLCM — prognostyka nowotworowa z obrazów histopatologicznych"
locale: pl
slug: glcm-histopath
date: 2024-01
role: "Praca inżynierska"
tech: ["Python", "przetwarzanie obrazów", "GLCM", "model Coxa"]
github: "https://github.com/JakBialas"
featured: true
order: 2
summary: "Analiza obrazów histopatologicznych oparta na GLCM do prognostyki nowotworowej, z dostrojonym preprocessingiem i ewaluacją modelem Coxa."
highlights:
  - "Pipeline preprocessingu: filtracja, operacje morfologiczne, usunięcie tła, kalibracja skali szarości"
  - "Ewaluacja: model Coxa, C-index Harrella, p-value"
  - "C-index wzrósł z 0.72 → 0.91 po dostrojeniu parametrów"
---
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: Content Collections validated, no schema errors.

- [ ] **Step 7: Commit**

```bash
git add src/content
git commit -m "feat: define project content collection and add entries"
```

---

## Task 7: Project card and projects section

**Files:**
- Create: `src/components/ProjectCard.astro`, `src/components/Projects.astro`

- [ ] **Step 1: Write `src/components/ProjectCard.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
import { t, type Locale } from '../i18n/utils';

interface Props { project: CollectionEntry<'projects'>; locale: Locale; }
const { project, locale } = Astro.props;
const { title, summary, tech, github, role, highlights } = project.data;
const viewCode = t(locale).projects.viewCode;
---
<article class="card">
  <header class="card-head">
    <h3>{title}</h3>
    <span class="role mono muted">{role}</span>
  </header>
  <p class="summary">{summary}</p>
  {highlights.length > 0 && (
    <ul class="highlights">
      {highlights.map((h) => <li>{h}</li>)}
    </ul>
  )}
  <ul class="tags">
    {tech.map((tag) => <li class="mono">{tag}</li>)}
  </ul>
  <a class="link" href={github} target="_blank" rel="noopener">{viewCode} →</a>
</article>

<style>
  .card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
    transition: border-color .15s ease, transform .15s ease;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }
  .card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .card-head { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; }
  h3 { margin: 0; font-size: 1.15rem; }
  .role { font-size: 0.75rem; white-space: nowrap; }
  .summary { margin: 0; color: var(--text-primary); }
  .highlights { margin: 0; padding-left: 1.1rem; color: var(--text-muted); font-size: 0.9rem; display: grid; gap: 0.25rem; }
  .tags { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .tags li {
    font-size: 0.75rem;
    padding: 0.2rem 0.55rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--text-muted);
  }
  .link { color: var(--accent); font-size: var(--fs-small); align-self: flex-start; }
</style>
```

- [ ] **Step 2: Write `src/components/Projects.astro`**

```astro
---
import { getCollection } from 'astro:content';
import ProjectCard from './ProjectCard.astro';
import { t, type Locale } from '../i18n/utils';

interface Props { locale: Locale; }
const { locale } = Astro.props;

const all = await getCollection('projects', ({ data }) => data.locale === locale);
const projects = all.sort((a, b) => a.data.order - b.data.order);
const s = t(locale).projects;
---
<section id="projects">
  <div class="container">
    <h2>{s.heading}</h2>
    <div class="grid">
      {projects.map((p) => <ProjectCard project={p} locale={locale} />)}
    </div>
  </div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.25rem;
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.astro src/components/Projects.astro
git commit -m "feat: add project card and projects grid"
```

---

## Task 8: Compose pages (EN + PL)

**Files:**
- Create/Modify: `src/pages/index.astro`, `src/pages/pl/index.astro`

- [ ] **Step 1: Write `src/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Skills from '../components/Skills.astro';
import Projects from '../components/Projects.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';

const locale = 'en' as const;
---
<Base
  lang={locale}
  title="Jakub Białas — Data Scientist"
  description="Portfolio of Jakub Białas — Data Scientist with a background in bioinformatics."
>
  <Header locale={locale} />
  <main>
    <Hero locale={locale} />
    <About locale={locale} />
    <Skills locale={locale} />
    <Projects locale={locale} />
    <Contact locale={locale} />
  </main>
  <Footer locale={locale} />
</Base>
```

- [ ] **Step 2: Write `src/pages/pl/index.astro`**

```astro
---
import Base from '../../layouts/Base.astro';
import Header from '../../components/Header.astro';
import Hero from '../../components/Hero.astro';
import About from '../../components/About.astro';
import Skills from '../../components/Skills.astro';
import Projects from '../../components/Projects.astro';
import Contact from '../../components/Contact.astro';
import Footer from '../../components/Footer.astro';

const locale = 'pl' as const;
---
<Base
  lang={locale}
  title="Jakub Białas — Data Scientist"
  description="Portfolio Jakuba Białasa — Data Scientist z zapleczem w bioinformatyce."
>
  <Header locale={locale} />
  <main>
    <Hero locale={locale} />
    <About locale={locale} />
    <Skills locale={locale} />
    <Projects locale={locale} />
    <Contact locale={locale} />
  </main>
  <Footer locale={locale} />
</Base>
```

- [ ] **Step 3: Add favicon placeholder**

Write `public/favicon.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0b0d10"/>
  <text x="50%" y="54%" text-anchor="middle" font-family="Inter, sans-serif" font-size="28" font-weight="700" fill="#7cc4ff" dominant-baseline="middle">JB</text>
</svg>
```

- [ ] **Step 4: Build and verify both locales**

Run: `npm run build`
Expected: `dist/index.html` and `dist/pl/index.html` both generated without errors.

- [ ] **Step 5: Run dev server and verify visually**

Run: `npm run dev` (background), open `http://localhost:4321/` and `http://localhost:4321/pl/` in a browser (or use `curl -s http://localhost:4321/ | head -40`).

Verify:
- Both pages render with correct language
- Language switcher links between `/` and `/pl/`
- Nav anchors scroll to sections
- Project cards show both entries with correct locale
- No 404 in console except CV PDFs (not yet added)

- [ ] **Step 6: Commit**

```bash
git add src/pages public/favicon.svg
git commit -m "feat: compose EN and PL home pages"
```

---

## Task 9: Add CV placeholder and README polish

**Files:**
- Create: `public/cv/.gitkeep`
- Modify: `README.md`

- [ ] **Step 1: Add CV directory placeholder**

```bash
mkdir -p public/cv
touch public/cv/.gitkeep
```

Note: the user will manually drop `jakub-bialas-cv-en.pdf` and `jakub-bialas-cv-pl.pdf` into `public/cv/`. Until then, the CV buttons will 404 — acceptable for initial deploy.

- [ ] **Step 2: Update `README.md`**

```md
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
```

- [ ] **Step 3: Commit**

```bash
git add public/cv/.gitkeep README.md
git commit -m "docs: add CV directory placeholder and README"
```

---

## Task 10: GitHub repo and Cloudflare Pages

These steps are performed once, by the user, in the dashboard/CLI. They are not automated.

- [ ] **Step 1: Create GitHub repo**

```bash
gh repo create jakubbialas-site --public --source=. --remote=origin --push
```

(If `gh` is not installed, create the repo via github.com and run `git remote add origin <url> && git push -u origin main`.)

- [ ] **Step 2: Connect Cloudflare Pages**

In Cloudflare dashboard: *Workers & Pages → Create → Pages → Connect to Git*, select the repo.
Build settings:
- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20` (set env var `NODE_VERSION=20` if needed)

- [ ] **Step 3: First deploy**

Cloudflare Pages builds and deploys automatically. Confirm live URL at `<project>.pages.dev`.

- [ ] **Step 4: (Later) Custom domain**

Once the domain is purchased, add it in Cloudflare Pages → Custom domains. Update `site` in `astro.config.mjs` to the new origin and commit.

---

## Done criteria

- `npm run build` succeeds.
- `/` renders the English site; `/pl/` renders the Polish site.
- Language switcher toggles between `/` and `/pl/`.
- Both project entries render with correct locale content.
- Header, Hero, About, Skills, Projects, Contact, Footer all display.
- Lighthouse (run locally via Chrome devtools): ≥95 Performance / Accessibility / Best Practices / SEO.
- Cloudflare Pages project live on `*.pages.dev`.
- README documents dev, build, and how to add a project.
