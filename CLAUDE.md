# CLAUDE.md — projekt WebSite_JakB

## Instrukcja dla asystenta
Na początku każdej sesji przeczytaj `STATE.md` aby poznać aktualny stan repo, otwarte sprawy i ostatnie zmiany.

## Czym jest to repo
Dwujęzyczne portfolio Jakuba Białasa (data scientist). Zbudowane w Astro 4.16, wdrożone na Cloudflare Workers (nie Pages). Strona prezentuje projekty, umiejętności i dane kontaktowe w wersji EN i PL.

## Stack techniczny
- **Framework**: Astro 4.16, `output: "hybrid"` (SSR + static)
- **Adapter**: `@astrojs/cloudflare` v11
- **Deploy**: Cloudflare Workers — integracja bezpośrednia z gałęzią `master` (brak GitHub Actions)
- **Config**: `wrangler.jsonc` — worker entry `dist/_worker.js/index.js`, assets z `dist/`

## Struktura projektu
```
src/
  components/   — Header, Hero, About, Skills, Projects, ProjectCard, Contact, Footer, LangSwitcher
  content/      — kolekcja projektów (Markdown + frontmatter z Zod schema)
  i18n/         — utils.ts + en.json + pl.json
  layouts/      — Base.astro (HTML wrapper, fonty, meta)
  pages/        — index.astro (en), pl/index.astro (pl)
  styles/       — tokens.css (design system), global.css
public/         — CV PDF, favicon
wrangler.jsonc  — konfiguracja Cloudflare Workers
astro.config.mjs
```

## i18n
- Dwa locale: `en` (domyślny, bez prefiksu) i `pl` (pod `/pl`)
- Tłumaczenia w JSON; `t(locale).sekcja.klucz` w komponentach
- Helper `localePath()` i `otherLocale()` w `LangSwitcher`

## CD/CI
- Cloudflare Workers obserwuje gałąź `master` i buduje automatycznie przy każdym push
- Brak pliku `.github/workflows/` — Actions tab w GitHub jest pusty z założenia
- Build command: `astro build` → output w `dist/`

## Lokalne komendy
```bash
npm run dev      # dev server z --host
npm run build    # astro build
npm run preview  # build + wrangler dev (lokalna emulacja CF)
npm run deploy   # build + wrangler deploy (ręczny deploy)
```

## Git / tożsamość
- `user.name = JakBialas`, `user.email = qba.bialas@gmail.com` (ustawione lokalnie)
- PAT w `.env` jako `REPO_TOKEN` — fine-grained, ograniczone uprawnienia (brak dostępu do deployments/checks/webhooks API)
- `.env` jest gitignorowany

## Zasady pracy (feedback od użytkownika)
- **Brak co-author trailerów** w commitach (`Co-Authored-By: Claude...` — niedopuszczalne)
- Krótkie, treściwe opisy commitów po angielsku
