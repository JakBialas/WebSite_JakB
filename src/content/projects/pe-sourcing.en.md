---
title: "PE Sourcing Tool — automating private-equity firm research"
locale: en
date: 2026-07
role: "Portfolio project"
tech: ["Python", "pandas", "SEC EDGAR / Form ADV", "local LLM (Ollama)", "Streamlit", "pytest"]
github: "https://github.com/JakBialas/PE-Sourcing-Tool"
featured: true
order: 3
summary: "A Python tool that filters public SEC data (Form ADV) into a CRM-ready shortlist of private-equity firms matching a target profile — from a raw registry of ~17k advisers down to a candidate list with contacts and buying signals. 650 tests, built entirely on free, citable sources."
highlights:
  - "Two-stage pipeline: a Form ADV sieve (AUM band, fund type, PE-fit from Schedule D) → sector / operational-vs-financial classification from firm websites (rules + local LLM)"
  - "Enrichment: contacts (Schedule A + /team pages), Form D 'raising now' signals, new-fund detection, and source-anchor links to verify every value at its SEC source"
  - "Data honesty: RAUM treated as a proxy (never fabricates AUM), a 'measure on real data before writing a rule' discipline, and an explicit limitations section"
  - "Engineering: pluggable data sources behind a common interface, universe caching (169s→0.1s), a Streamlit UI, and 650 tests (pytest, TDD)"
---
