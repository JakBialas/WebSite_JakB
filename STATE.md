# STATE.md — aktualny stan repo (aktualizować przy większych zmianach)

_Ostatnia aktualizacja: 2026-04-17_

## Gałąź aktywna
`master` — jedyna gałąź robocza; CF Workers buduje z niej automatycznie.

## Stan deploymentu
- Cloudflare Workers aktywny; URL produkcyjny: `https://jakubbialas.pages.dev`
- Ostatni push: commit `5cf8c2d` — widoczny tag wersji w stopce (`v2026-04-17`)
- CF PR `cloudflare/workers-autoconfig` — zmergowany przez użytkownika; lokalne master wyrównane

## Ostatnie zmiany (master)
| Commit   | Opis |
|----------|------|
| `5cf8c2d` | chore: add visible deploy tag to footer for CI/CD verification |
| `5a7da15` | Merge pull request #1 from JakBialas/cloudflare/workers-autoconfig |
| `053859d` | Add Cloudflare Workers configuration |
| `a9ba08e` | chore: add deploy marker to test CI/CD with Cloudflare Pages |
| `4ea6d77` | Initial commit: personal website |

## Otwarte sprawy / dług techniczny
- `package-lock.json` ma niezacommitowane zmiany (M w git status) — drobna niespójność po instalacji paczek
- Typo w `.env`: `REPO_USER=qba.bialas@gmial.com` (brak 'a' w gmail) — nie wpływa na działanie, ale warto poprawić
- `site` w `astro.config.mjs` wskazuje na `jakubbialas.pages.dev` — jeśli domena się zmieni, wymaga aktualizacji

## Planowane prace
_(brak aktywnych zadań)_
