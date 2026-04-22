# STATE.md — aktualny stan repo (aktualizować przy większych zmianach)

_Ostatnia aktualizacja: 2026-04-22 (sesja: fact-check + diagnoza CF)_

## Gałęzie

| Branch | HEAD | Cel / status |
|--------|------|--------------|
| `master` | `9243b38` | Domyślna gałąź, według CLAUDE.md production branch dla CF — **ale obserwacja z sesji sugeruje że to nieprawda** (zob. „Otwarte sprawy") |
| `layout-test` | `05d857c` | Po cherry-picku fact-checku (`05d857c` = `fix: align project descriptions with thesis content` na bazie `de08d10`). **Prawdopodobnie faktyczny production branch CF** |
| `layout-animations` | bez zmian | Zachowany do dalszych eksperymentów z animacjami (już zmergowany do mastera w `99f4391`) |
| `portfolio-factcheck` | `93b2334` | Świeży branch z mastera z 3 commitami fact-checku + .gitignore + STATE.md update. Trzymany osobno na życzenie usera |

## Stan deploymentu

- URL produkcyjny: `https://jakubbialas.pages.dev`
- **Niejasność:** CLAUDE.md mówi że CF Workers buduje z mastera, ale w sesji 2026-04-22 user zaobserwował że strona produkcyjna pokazuje treść z `layout-test` (palety/style z eksperymentów). To sugeruje że CF jest faktycznie skonfigurowany na `layout-test` jako production branch.
- Po sesji push na `layout-test` (commit `05d857c` z fact-checkiem) — jeśli CF rzeczywiście stamtąd buduje, opisy projektów (R/MATLAB, 9 metod, linki do /Master-Thesis i /Engineering-Thesis) powinny pojawić się na produkcji w ciągu kilku minut.

## Ostatnie zmiany na masterze

| Commit   | Opis |
|----------|------|
| `9243b38` | docs: update STATE.md with layout-animations merge and portfolio fact-check plan |
| `99f4391` | Merge branch 'layout-animations': scroll and section animations (--no-ff, 18 commitów feature'a) |
| `5cf8c2d` | chore: add visible deploy tag to footer for CI/CD verification |
| `5a7da15` | Merge PR #1 from JakBialas/cloudflare/workers-autoconfig |

## Otwarte sprawy / dług techniczny

- **Krytyczne:** zweryfikować w CF dashboard (Workers & Pages → projekt → Settings → Builds & deployments) jaki branch jest faktycznym **Production branch**. W zależności od wyniku:
  - jeśli `layout-test` → poprawić CLAUDE.md (mówi błędnie o masterze) i rozważyć przeniesienie production branch na `master` żeby uporządkować workflow
  - jeśli `master` → wyjaśnić skąd treść z `layout-test` na produkcji (stary cache/zatrzymany deployment?)
- Typo w `.env`: `REPO_USER=qba.bialas@gmial.com` (brak 'a' w gmail) — nie wpływa na działanie
- `site` w `astro.config.mjs` wskazuje na `jakubbialas.pages.dev` — jeśli domena się zmieni, wymaga aktualizacji
- PAT w `.env` (`REPO_TOKEN`) nie ma uprawnień do GitHub Deployments/Checks API — nie da się weryfikować buildów CF z linii poleceń przez `gh`

## Sesja 2026-04-22 — fact-check opisów projektów (wykonane)

**Źródła weryfikacji:** pełne PDFy prac dyplomowych:
- `RAU-MGR-295996-2025.pdf` — magisterska, 92 strony, *„Augmentation of medical data on response to cancer treatment in small clinical trials"*
- `RAU-INZ-295996-2024.pdf` — inżynierska, 58 stron, *„Modyfikacja i rozszerzenie algorytmów do oszacowania przestrzennej heterogeniczności map limfocytów w prognozowaniu raka"*

PDFy trzymane lokalnie (gitignored przez wzorzec `RAU-*.pdf` na branchu `portfolio-factcheck`; na masterze i layout-test reguła nie jest dodana).

**Wprowadzone poprawki w `src/content/projects/`** (commit `d0e6ae0` na `portfolio-factcheck`, cherry-pick jako `05d857c` na `layout-test`):

`cox-smote.{en,pl}.md`:
- `tech`: `Python`/`scikit-learn` → `R`/`SMOTE`/`Cox model`/`survival analysis` (praca w czystym R; Implementation rozdz. 3.1)
- `summary`/`highlights`: 8 → **9 metod** (TOC sek. 2.6 wymienia 9: log-normal, bootstrap, bootstrap+log-normal, SMOTE, multi-event SMOTE, Cox, Cox-SMOTE, multi-event Cox-SMOTE, hybrid two-Cox-SMOTE)
- `summary`: dodano kontekst datasetu (breast cancer, I-SPY trial)
- `github`: profil → `/Master-Thesis`
- Claim „10 repetitions per scenario" zweryfikowany w pracy (str. 23) — bez zmian

`glcm-histopath.{en,pl}.md`:
- `tech`: `Python` → `MATLAB`
- `title`/`summary`: dodano że chodzi o **mapy limfocytów (TIL)** i **przestrzenną heterogeniczność** (zgodnie z tytułem pracy)
- C-index claim doprecyzowany: 0.72 → 0.91 to **najlepszy przypadek dla miary M2** (regiony wysokiej intensywności), nie poprawa uniwersalna; wyniki różniły się między typami raka
- `github`: profil → `/Engineering-Thesis`

## Sesja 2026-04-22 — incydent z `layout-test`

W trakcie sesji błędnie założono (na podstawie CLAUDE.md) że `layout-test` to porzucony testowy branch i skasowano go lokalnie + na origin (`branch -D` + `push --delete`). Po pushu fact-checku na `portfolio-factcheck` user zaobserwował że strona produkcyjna nadal pokazuje treść z layout-test — co zasugerowało że CF faktycznie buduje stamtąd.

Branch został odtworzony z lokalnego reflog (commit `de08d10` był nadal dostępny) i zapushowany z powrotem na origin pod tym samym SHA — dla CF stan branchu się nie zmienił (bez rebuildu). Następnie cherry-picknięto na niego fact-check.

**Lekcja:** zanim usuwa się branch — nawet jeśli wygląda jak „porzucony test" — sprawdzić CF dashboard skąd faktycznie odbywa się build. CLAUDE.md może być nieaktualne.
