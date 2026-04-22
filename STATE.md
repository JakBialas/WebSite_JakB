# STATE.md — aktualny stan repo (aktualizować przy większych zmianach)

_Ostatnia aktualizacja: 2026-04-22_

## Gałąź aktywna
`master` — CF Workers buduje automatycznie z master.
Feature branch `layout-animations` nadal istnieje (lokalnie i na origin) — zachowany do dalszych eksperymentów z animacjami.
Feature branch `portfolio-factcheck` (lokalnie i na origin) — zawiera poprawki opisów projektów wg PDFów prac dyplomowych; **nie zmergowany** do mastera (decyzja usera: trzymać osobno).

## Stan deploymentu
- Cloudflare Workers aktywny; URL produkcyjny: `https://jakubbialas.pages.dev`
- Ostatni push na master: `99f4391` (merge commit) — zawiera animacje scrollowania i sekcji

## Ostatnie zmiany (master)
| Commit   | Opis |
|----------|------|
| `99f4391` | Merge branch 'layout-animations': scroll and section animations (--no-ff, 18 commitów feature'a) |
| `5cf8c2d` | chore: add visible deploy tag to footer for CI/CD verification |
| `5a7da15` | Merge PR #1 from JakBialas/cloudflare/workers-autoconfig |

## Otwarte sprawy / dług techniczny
- Typo w `.env`: `REPO_USER=qba.bialas@gmial.com` (brak 'a' w gmail) — nie wpływa na działanie
- `site` w `astro.config.mjs` wskazuje na `jakubbialas.pages.dev` — jeśli domena się zmieni, wymaga aktualizacji
- Branch `portfolio-factcheck` czeka na decyzję o mergu/PR (zob. niżej)

## Wykonane prace — fact-check opisów projektów (branch `portfolio-factcheck`)

**Źródła weryfikacji:** pełne PDFy prac dyplomowych — `RAU-MGR-295996-2025.pdf` (magisterska, 92 str.) i `RAU-INZ-295996-2024.pdf` (inżynierska, 58 str.). PDFy trzymane lokalnie, gitignorowane przez wzorzec `RAU-*.pdf`.

**Wprowadzone poprawki** (commit `d0e6ae0` — `fix: align project descriptions with thesis content`):

`cox-smote.{en,pl}.md`:
- `tech`: `Python`/`scikit-learn` → `R`/`SMOTE`/`Cox model`/`survival analysis` (praca w czystym R)
- `summary`/`highlights`: 8 → 9 metod (TOC sek. 2.6 wymienia 9: log-normal, bootstrap, bootstrap+log-normal, SMOTE, multi-event SMOTE, Cox, Cox-SMOTE, multi-event Cox-SMOTE, hybrid two-Cox-SMOTE)
- `summary`: dodano kontekst datasetu (breast cancer, I-SPY trial)
- `github`: profil → `/Master-Thesis`
- Claim „10 repetitions per scenario" zweryfikowany (str. 23 pracy) — bez zmian

`glcm-histopath.{en,pl}.md`:
- `tech`: `Python` → `MATLAB`
- `title`/`summary`: dodano że chodzi o **mapy limfocytów (TIL)** i **heterogeniczność przestrzenną** (zgodnie z tytułem pracy: „Modyfikacja i rozszerzenie algorytmów do oszacowania przestrzennej heterogeniczności map limfocytów…")
- C-index claim doprecyzowany: 0.72 → 0.91 to **najlepszy przypadek dla miary M2** (regiony wysokiej intensywności), nie poprawa uniwersalna; wyniki różniły się między typami raka
- `github`: profil → `/Engineering-Thesis`

**Status:** branch zapushowany na origin, czeka na decyzję merge (CF Workers buduje tylko z mastera, więc treść na produkcji bez zmian).
