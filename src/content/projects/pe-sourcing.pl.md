---
title: "PE Sourcing Tool — automatyzacja researchu funduszy PE"
locale: pl
date: 2026-07
role: "Projekt osobisty / narzędzie"
tech: ["Python", "pandas", "SEC EDGAR / Form ADV", "lokalny LLM (Ollama)", "Streamlit", "pytest"]
github: "https://github.com/JakBialas/PE-Sourcing-Tool"
featured: true
order: 5
summary: "Narzędzie w Pythonie, które filtruje publiczne dane SEC (Form ADV) do gotowej shortlisty funduszy private equity pasujących do zadanego profilu — od surowego rejestru ~17 tys. doradców do listy kandydatów z kontaktami i sygnałami zakupowymi. 650 testów, w pełni na darmowych, cytowalnych źródłach."
highlights:
  - "Dwuetapowy pipeline: sito Form ADV (pasmo AUM, typ funduszu, PE-fit ze Schedule D) → klasyfikacja sektora/operacyjności ze stron firm (reguły + lokalny LLM)"
  - "Wzbogacanie: kontakty (Schedule A + strony /team), sygnały „firma zbiera” z Form D, wykrywanie nowych funduszy, linki-kotwice do weryfikacji każdej wartości u źródła SEC"
  - "Uczciwość danych: RAUM jako proxy (nie zmyśla AUM), zasada „mierz na realnych danych, zanim wpiszesz regułę”, jawna sekcja ograniczeń"
  - "Inżynieria: wymienne źródła danych za wspólnym interfejsem, cache uniwersum (169s→0,1s), UI w Streamlit, 650 testów (pytest, TDD)"
---
