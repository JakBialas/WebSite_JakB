# STATE.md — aktualny stan repo (aktualizować przy większych zmianach)

_Ostatnia aktualizacja: 2026-04-22_

## Gałąź aktywna
`master` — CF Workers buduje automatycznie z master.
Feature branch `layout-animations` nadal istnieje (lokalnie i na origin) — zachowany do dalszych eksperymentów z animacjami.

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
- W katalogu projektu leży nietracked plik `RAU-MGR-295996-2025.pdf` (prawdopodobnie praca magisterska — do użycia w fact-checku poniżej)

## Planowane prace — fact-check opisów projektów w portfolio

**Kontekst:** Strona w `src/content/projects/{cox-smote,glcm-histopath}.{en,pl}.md` opisuje dwie prace dyplomowe. Porównanie z README repo `JakBialas/Master-Thesis` (R) i `JakBialas/Engineering-Thesis` (MATLAB) wykazało rozbieżności.

**Znalezione błędy (do naprawy — nie wymagają dodatkowej weryfikacji):**
1. `cox-smote.{en,pl}.md` → pole `tech`: wpisane `Python` i `scikit-learn`, a repo jest w czystym R (pakiet `smotefamily`, nie scikit-learn). Poprawić na: R, SMOTE, Cox model (+ ew. `smotefamily`, `survRM2`).
2. `glcm-histopath.{en,pl}.md` → pole `tech`: wpisane `Python`, a repo jest w MATLAB. Zamienić `Python` → `MATLAB`.
3. `github:` w obu plikach wskazuje na profil (`github.com/JakBialas`) zamiast konkretnych repo — zmienić na `/Master-Thesis` i `/Engineering-Thesis`.

**Do weryfikacji z pełnymi PDFami prac (user ma dostarczyć — może to być `RAU-MGR-295996-2025.pdf`):**
4. „8 metod" w Cox-SMOTE — README ma 7 głównych + warianty `2Ev`. Sprawdzić w pracy jaka liczba jest „kanoniczna".
5. „10 repetitions per scenario" — nie ma w README. Sprawdzić czy jest w pracy / w kodzie.
6. „C-index improved from 0.72 → 0.91 with tuned parameters" (GLCM) — nie weryfikowalne z README. Sprawdzić w pracy inżynierskiej.
7. Ogólnie: czy w pracach są inne warte wyróżnienia wyniki, których nie ma na stronie.

**Stan po restarcie sesji:** wznowić od kroku 4 — zapytać usera o PDFy (albo użyć `RAU-MGR-295996-2025.pdf` jeśli to właśnie praca magisterska), zweryfikować claims 4-7, potem zastosować wszystkie poprawki (1-3 + ewentualne wynikające z 4-7). Commit każdej sekcji osobno lub razem — do ustalenia z userem. **Bez co-author trailerów.**
