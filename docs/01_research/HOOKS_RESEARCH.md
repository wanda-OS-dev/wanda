# Hooks & Webhooks Research (2026-03-01)

> **Researched by:** Gemini (Antigravity) | **Date:** 2026-03-01

## 1. Claude Code Hooks

Shell commands that execute at specific lifecycle points in Claude Code:
- **Before/after tool use** — enforce linting, formatting, tests
- **Session start** — inject context, load environment
- **Notifications** — trigger alerts on completion
- Combined with MCP Tools for deterministic agent workflows

**Relevanz für uns:** Direkt nutzbar wenn wir Claude Code lokal oder auf VPS nutzen. Ermöglicht automatische Code-Qualitätschecks beim Builder.

## 2. OpenClaw Hooks System

### Internal Hooks
Laufen im OpenClaw Gateway bei Agent-Events (`/new`, `/reset`, `/stop`):
- `session-memory` — Session-Kontext speichern
- `bootstrap-extra-files` — Dateien beim Start injizieren
- `command-logger` — Befehle loggen
- Custom Hooks via TypeScript

### External Webhooks
HTTP-Webhooks für externe System-Trigger:
- **Mappings:** `hooks.mappings` in config definiert `match`, `action`, `templates`
- **Transforms:** Custom JS/TS Module für Payload-Verarbeitung
- **Routing:** `deliver: true` + `channel` + `to` für gezielte Chat-Zustellung
- **Agent-Routing:** `agentId` in Mapping für agenten-spezifische Verarbeitung
- **Session-Keys:** `defaultSessionKey`, `allowRequestSessionKey` für Session-Management
- **Sicherheit:** Payloads als untrusted behandelt, Safety-Boundaries automatisch

### Vorhandene Config (openclaw.json):
```json
"hooks": {
  "token": "xxx",
  "mappings": [
    { "id": "mcc-update", "action": "wake" },
    { "id": "verify", "action": "agent", "wakeMode": "now", "deliver": true },
    { "id": "crypto-signal", "action": "agent", "wakeMode": "now" },
    { "id": "lead-alert", "action": "agent", "wakeMode": "now", "deliver": true }
  ]
}
```

### Mögliche Webhook-Erweiterungen:
| Use Case | Hook-Typ | Beschreibung |
|----------|----------|-------------|
| Kosten-Tracking | Internal | Nach jedem Agent-Run Tokens loggen |
| Social-Reaktion | External | Webhook von X/LinkedIn bei Mention/Kommentar |
| GitHub Push | External | CI/CD bei Commit auslösen |
| Trading-Signal | External | Echtzeit-Signal von Kraken/Binance |
| Email-Eingang | External | Gmail Pub/Sub Webhook |
| Morning Briefing | Internal | Bootstrap-Hook bei Session-Start |

## 3. Trading Platform Comparison

| Plattform | API-Stärke | Liquidität | Bots | Besonderheiten | Empfehlung |
|-----------|-----------|-----------|------|----------------|-----------|
| **Kraken** ✅ | REST + WS | Hoch | Nein | Sicherster Ruf, EUR-Pairs | Behalten (Basis) |
| **Binance** ⭐ | Comprehensive | Höchste | Eigene + 3rd Party | 1200 req/min, BNB-Rabatte | **Empfohlen #1** |
| **OKX** | Extensiv, kostenlos | Hoch | 40+ Native Bots | Web3/DeFi, Copy-Trading | **Empfohlen #2** |
| Bybit | REST + WS | Hoch | Grid + Copy | Beste UX für Derivate | Optional |

**Alle über CCXT unified Interface:** `pip install ccxt` → ein Code für alle Exchanges.

**Entscheidung:** Kraken (bestehend) + **Binance** (Liquidität) + **OKX** (Bots/Web3) = 3 Exchanges.

## 4. Web Research Tools

| Tool | Stärke | Use Case | Kosten |
|------|--------|----------|--------|
| **Jina.ai** | Beste URL→Markdown Konvertierung | Scout, Research | Free tier + API Key |
| **Firecrawl** | Beste Full-Site Crawls | Deep Research, Doku-Scraping | API Key |
| **Tavily** | Beste AI-Search für RAG | Scout, Crypto-News | API Key |
| **Exa.ai** | Beste semantische Suche | Trend-Research, Opportunity-Finding | API Key |
| **Brave** | Privacy-fokussierte Suche | Allgemeine Web-Suche | API Key |
| **Context7** | Docs-Recherche (MCP) | Builder, CTO (Library-Docs) | MCP-basiert |

**Empfehlung:** Jina.ai als Primär-Tool (Open Source, Free Tier), Tavily als Sekundär (AI-optimiert), Firecrawl für Deep Crawls.
