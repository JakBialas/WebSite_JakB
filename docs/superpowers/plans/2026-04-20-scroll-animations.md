# Scroll Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add AOS scroll-triggered slide-from-sides animations to About, Skills, and Projects sections on a new `layout-animations` branch.

**Architecture:** AOS is initialized once globally in `Base.astro`. Individual components receive `data-aos` attributes on their outermost wrappers. `ProjectCard` accepts an `index` prop from `Projects.astro` for staggered delays.

**Tech Stack:** AOS 2.x, Astro 4.16, TypeScript

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `src/layouts/Base.astro` | Modify | Add AOS CSS import + `AOS.init()` script |
| `src/components/About.astro` | Modify | `data-aos="fade-right"` on `<section>` |
| `src/components/Skills.astro` | Modify | `data-aos="fade-left"` on `<section>` |
| `src/components/Projects.astro` | Modify | Pass `index` to `ProjectCard` |
| `src/components/ProjectCard.astro` | Modify | Accept `index` prop, add `data-aos` + `data-aos-delay` on `<article>` |

---

### Task 1: Create branch and install AOS

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Create branch from master**

```bash
git checkout master
git checkout -b layout-animations
```

- [ ] **Step 2: Install AOS**

```bash
npm install aos
```

- [ ] **Step 3: Verify installation**

```bash
ls node_modules/aos/dist/
```

Expected output includes: `aos.css`, `aos.js`, `aos.esm.js`

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install AOS for scroll animations"
```

---

### Task 2: Initialize AOS globally in Base.astro

**Files:**
- Modify: `src/layouts/Base.astro`

Current file (lines 1–30) imports `global.css` in frontmatter and has a bare `<head>` with no AOS references.

- [ ] **Step 1: Add AOS CSS import and init script**

Replace the entire `src/layouts/Base.astro` with:

```astro
---
import '../styles/global.css';
import 'aos/dist/aos.css';

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
    <script>
      import AOS from 'aos';
      AOS.init({
        duration: 600,
        offset: 100,
        once: true,
      });
    </script>
  </body>
</html>
```

- [ ] **Step 2: Start dev server and confirm no console errors**

```bash
npm run dev
```

Open `http://localhost:4321` in browser. Check browser console — expect no errors about AOS or missing modules.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: initialize AOS globally in Base layout"
```

---

### Task 3: Animate About section (fade-right)

**Files:**
- Modify: `src/components/About.astro`

- [ ] **Step 1: Add data-aos attribute to section**

Replace `src/components/About.astro` with:

```astro
---
import { t, type Locale } from '../i18n/utils';
interface Props { locale: Locale; }
const { locale } = Astro.props;
const s = t(locale).about;
---
<section id="about" data-aos="fade-right">
  <div class="container">
    <h2>{s.heading}</h2>
    <p>{s.body}</p>
  </div>
</section>

<style>
  p { max-width: 42rem; color: var(--text-primary); }
</style>
```

- [ ] **Step 2: Verify animation in browser**

With dev server running, open `http://localhost:4321`. Scroll down to the About section. It should slide in from the left side of the screen (fade-right = enters from left).

- [ ] **Step 3: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: add fade-right scroll animation to About section"
```

---

### Task 4: Animate Skills section (fade-left)

**Files:**
- Modify: `src/components/Skills.astro`

- [ ] **Step 1: Add data-aos attribute to section**

Replace `src/components/Skills.astro` with:

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
<section id="skills" data-aos="fade-left">
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

- [ ] **Step 2: Verify animation in browser**

Scroll to Skills section. It should slide in from the right side.

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.astro
git commit -m "feat: add fade-left scroll animation to Skills section"
```

---

### Task 5: Animate Project cards (staggered fade-left)

**Files:**
- Modify: `src/components/Projects.astro` — pass index to ProjectCard
- Modify: `src/components/ProjectCard.astro` — accept index, add data-aos + data-aos-delay

- [ ] **Step 1: Update Projects.astro to pass index**

Replace `src/components/Projects.astro` with:

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
      {projects.map((p, i) => <ProjectCard project={p} locale={locale} index={i} />)}
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

- [ ] **Step 2: Update ProjectCard.astro to accept index and apply animation**

Replace `src/components/ProjectCard.astro` with:

```astro
---
import type { CollectionEntry } from 'astro:content';
import { t, type Locale } from '../i18n/utils';

interface Props {
  project: CollectionEntry<'projects'>;
  locale: Locale;
  index: number;
}
const { project, locale, index } = Astro.props;
const { title, summary, tech, github, role, highlights } = project.data;
const viewCode = t(locale).projects.viewCode;
---
<article class="card" data-aos="fade-left" data-aos-delay={index * 100}>
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

- [ ] **Step 3: Verify stagger in browser**

Scroll to Projects. Cards should appear one after another with ~100ms between each — sliding in from the right.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.astro src/components/ProjectCard.astro
git commit -m "feat: add staggered fade-left animation to project cards"
```

---

### Task 6: Build check and final verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build completes with no errors. AOS import should be bundled correctly.

- [ ] **Step 2: Run preview**

```bash
npm run preview
```

Open the preview URL. Verify all three animations work: About slides from left, Skills from right, Projects stagger from right.

- [ ] **Step 3: Check Polish locale**

Navigate to `/pl`. Verify the same animations work on the Polish version.
