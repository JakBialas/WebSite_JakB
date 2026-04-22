# Scroll Animations — Design Spec

_Data: 2026-04-20_

## Cel

Nowa gałąź `layout-animations` testuje scroll-triggered animations na sekcjach About, Skills i Projects. Celem jest bardziej dynamiczne pierwsze wrażenie strony bez zmiany treści ani struktury.

## Biblioteka

**AOS (Animate On Scroll)** — deklaratywna, atrybuty HTML, ~13kb gzip. Inicjalizowana globalnie w `Base.astro`.

## Zakres zmian

| Plik | Zmiana |
|------|--------|
| `package.json` | dodanie `aos` jako dependency |
| `src/layouts/Base.astro` | import `aos/dist/aos.css` + `<script>` z `AOS.init()` |
| `src/components/About.astro` | `data-aos="fade-right"` na wrapperze sekcji |
| `src/components/Skills.astro` | `data-aos="fade-left"` na wrapperze sekcji |
| `src/components/ProjectCard.astro` | `data-aos="fade-left"` + `data-aos-delay` (stagger) |

## Parametry AOS

```js
AOS.init({
  duration: 600,
  offset: 100,
  once: true,
});
```

- `duration: 600` — subtelne, nierozpraszające
- `offset: 100` — animacja startuje 100px przed krawędzią viewportu
- `once: true` — animacja odpala się tylko raz (nie replay przy powrocie)

## Stagger kart projektów

Każda karta `ProjectCard` otrzymuje `data-aos-delay` rosnący o 100ms (0, 100, 200...). Wymaga przekazania indeksu karty z `Projects.astro`.

## Co NIE zmienia się

- Treść strony (teksty, projekty, umiejętności)
- Struktura sekcji i layout
- Wersja PL i EN (animacje działają na obu)
- Gałąź `master` i `layout-test` — bez dotykania

## Gałąź

`layout-animations` — tworzona od `master`.
