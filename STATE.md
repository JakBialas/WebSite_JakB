# STATE.md — aktualny stan repo (aktualizować przy większych zmianach)

_Ostatnia aktualizacja: 2026-04-23 (sesja: footer version bump + rozwiązanie zagadki CF)_

## Gałęzie

| Branch | HEAD | Cel / status |
|--------|------|--------------|
| `master` | `58f5c9a` | Domyślna gałąź. Production branch CF (potwierdzone 2026-04-23 — zob. „Stan deploymentu") |
| `layout-test` | `c346de8` | Po cherry-picku fact-checku + bump tagu wersji. Zachowany jako alternatywny branch eksperymentalny |
| `layout-animations` | `b70becb` | Zachowany do dalszych eksperymentów z animacjami (feature zmergowany do mastera w `99f4391`) |
| `portfolio-factcheck` | `323a6b6` | Świeży branch z mastera z 3 commitami fact-checku + .gitignore + STATE.md update. Trzymany osobno na życzenie usera |

## Stan deploymentu

- URL produkcyjny: `https://jakubbialas.pages.dev`
- **Rozwiązane 2026-04-23:** wcześniejsza „niejasność CF" wynikała z gotchy w Cloudflare Workers — samo przepięcie production branch w dashboardzie **nie triggeruje deploya**. Wymagany jest push na nowo skonfigurowaną gałąź, żeby CF faktycznie przebudował site. Po bumpie tagu wersji (`v2026-04-17` → `v2026-04-23`) i pushu na wszystkie cztery gałęzie produkcja się odświeżyła — nowa data widoczna na `jakubbialas.pages.dev`. CLAUDE.md (master jako production branch) jest poprawny.
- Konsekwencja: przy każdej przyszłej zmianie production branch w CF dashboard zawsze zrobić nowy push (np. pusty commit) na nowo wybraną gałąź.

## Ostatnie zmiany na masterze

| Commit   | Opis |
|----------|------|
| `58f5c9a` | chore: gitignore thesis reference PDFs (cherry-pick z portfolio-factcheck `3ed09e4`) |
| `84769fe` | fix: align project descriptions with thesis content (cherry-pick z portfolio-factcheck `d0e6ae0`) |
| `14e7f32` | chore: bump footer version tag to 2026-04-23 |
| `03c73c7` | docs: record session 2026-04-22 — fact-check completed and CF production-branch ambiguity |
| `9243b38` | docs: update STATE.md with layout-animations merge and portfolio fact-check plan |
| `99f4391` | Merge branch 'layout-animations': scroll and section animations (--no-ff, 18 commitów feature'a) |
| `5cf8c2d` | chore: add visible deploy tag to footer for CI/CD verification |
| `5a7da15` | Merge PR #1 from JakBialas/cloudflare/workers-autoconfig |

## Otwarte sprawy / dług techniczny

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

## Sesja 2026-04-23 — bump tagu wersji + rozwiązanie zagadki CF

Footer (`src/components/Footer.astro:10`) zawiera ręcznie utrzymywany tag wersji `v{YYYY-MM-DD}` w span z klasą `.deploy-tag`. User wybrał opcję ręcznego utrzymania (odrzucił propozycję automatyzacji przez `new Date()` w build-time) — data ma sygnalizować faktyczną aktualizację treści/kodu, nie rebuild.

**Wykonane:** bump `v2026-04-17` → `v2026-04-23` na wszystkich czterech aktywnych gałęziach:

| Branch | Commit |
|--------|--------|
| `master` | `14e7f32` |
| `layout-test` | `c346de8` |
| `layout-animations` | `b70becb` |
| `portfolio-factcheck` | `323a6b6` |

**Rozwiązanie zagadki CF production branch:** po pushu na wszystkie cztery gałęzie strona produkcyjna pokazała nową datę — CF zbudował ze swojej skonfigurowanej gałęzi (`master`, zgodnie z CLAUDE.md). Wcześniejsze wrażenie „CF buduje z layout-test" wynikało prawdopodobnie z faktu że user przepinał production branch w CF dashboardzie, ale **CF nie triggeruje rebuildu na samą zmianę configu** — potrzebny jest push na nowo skonfigurowaną gałąź.

**Lekcja:** po każdej zmianie production branch w CF dashboard zrobić pusty commit + push (`git commit --allow-empty -m "trigger rebuild" && git push`) na nowo wybraną gałąź. Inaczej produkcja dalej serwuje stary build.

**Cherry-pick fact-checku na mastera:** `d0e6ae0` (fact-check treści projektów) i `3ed09e4` (gitignore RAU-*.pdf) z `portfolio-factcheck` zostały cherry-pickowane na mastera jako `84769fe` i `58f5c9a`. Master ma teraz treść zgodną z pracami dyplomowymi (R/MATLAB, 9 metod, linki do `/Master-Thesis` i `/Engineering-Thesis`). STATE.md i footer bump z portfolio-factcheck pominięte — master miał już te zmiany (nowszy STATE.md + `14e7f32`). Branch `portfolio-factcheck` zostaje osobno per wcześniejsze życzenie usera.
