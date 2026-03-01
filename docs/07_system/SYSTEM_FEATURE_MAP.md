# SYSTEM_FEATURE_MAP.md — Features, Skills, Crons und Kanäle

> **Status:** ACTIVE
> **Version:** 2.0
> **Last Updated:** 2026-03-01

---

## Feature-Kategorien

| Kategorie | Anzahl | Status |
|-----------|--------|--------|
| Agenten | 20 | ✅ 18 aktiv, 2 pending |
| Skills | 19 | ✅ 14 definiert, 5 pending |
| Crons | 8 | ✅ 3 aktiv, 3 pending, 2 planned |
| Kommunikationskanäle | 6 | ⚠️ 1 partial (WhatsApp), alle Discord buggy |
| Integrationen | 24 | ✅ 10 aktiv, 14 pending |

---

## Feature-Map: Vollständig

### ✅ AKTIV

| Feature | Typ | Owner | Beschreibung |
|---------|-----|-------|-------------|
| Wanda Orchestrator | Agent | wanda | Zentrale KI-Instanz, Delegation, Entscheidung |
| 18 Spezialist-Agenten | Agents | verschiedene | Vollständige C-Suite + Spezialisten |
| OpenClaw Runtime | Service | coo | Agent-Container, Port 3000 |
| crypto-trader-master | Cron | crypto-trader | 30-min Trading-Signal + Execution |
| update-watcher | Cron | update-strategist | Mo/Mi/Fr Versions-Check |
| Kraken Integration | Integration | crypto-trader | BTC/EUR, ETH/EUR Spot-Trading |
| WhatsApp Alerts | Service | wanda | Kritische Direktnachrichten an Jannis |
| Telegram Bot | Service | wanda | Mobile-Steuerung + Alerts |
| Discord #ceo-office | Channel | wanda | Auth-Channel für Jannis-Befehle |
| Anthropic/Google/OpenAI APIs | Integration | alle | AI-Modelle |
| n8n Local | Service | n8n-architect | Workflow-Engine VPS-lokal |
| Session-Management | Feature | OpenClaw | sessions_send, sessions_spawn, sessions_history |

### ⚠️ PARTIAL / BUG

| Feature | Issue | Fix | Status |
|---------|-------|-----|--------|
| Discord Routing | Kein Channel antwortet (Nachrichten rein, nie raus) | Channel-Routing Fix | ROUTING_BUG |
| frontend-ux-king | Kein agent/-Verzeichnis | agent-creator SK-002 | INCOMPLETE |
| n8n-architect | Kein agent/-Verzeichnis | agent-creator SK-002 | INCOMPLETE |

### ⏳ PENDING (REQUIRED_INPUT)

| Feature | Typ | Benötigt | Owner |
|---------|-----|----------|-------|
| github-master | Agent | GITHUB_TOKEN | github-master |
| Binance Integration | Integration | BINANCE_API_KEY/SECRET | crypto-trader |
| OKX Integration | Integration | OKX_API_KEY/SECRET/PASSPHRASE | crypto-trader |
| Discord Channel-Routing | Config | DISCORD_CHANNEL_IDs (6x) | wanda |
| Telegram Groups | Config | TELEGRAM_GROUP_IDs | wanda |
| Twitter/X | Integration | X_API_KEY/SECRET | cmo |
| LinkedIn | Integration | LINKEDIN_TOKEN | cmo |
| Pinterest | Integration | PINTEREST_TOKEN | cmo |
| Gumroad | Integration | GUMROAD_API_KEY | cmo |
| Stripe | Integration | STRIPE_API_KEY | cfo |
| CCXT Library | Service | pip install (VPS) | crypto-trader |
| Jina.ai | Integration | JINA_API_KEY | scout |
| Firecrawl | Integration | FIRECRAWL_API_KEY | scout |
| Tavily | Integration | TAVILY_API_KEY | scout |
| Exa.ai | Integration | EXA_API_KEY | scout |
| Brave Search | Integration | BRAVE_API_KEY | scout |

### 📋 PLANNED (nächste Phasen)

| Feature | Typ | Phase | Beschreibung |
|---------|-----|-------|-------------|
| github-weekly-scan | Cron | Phase 1 | Sonntag 04:00 Security-Scan |
| Nightly Consolidation | Cron | Phase 4 | 02:00 DAILY_NOTES Extraktion + QMD Index |
| Social Scheduler | Cron | Phase 9 | Morning/Evening Social Posts |
| Custom Heartbeat | Script | Phase 5 | Auto-Reaktion auf Events, Social-Kommentare |
| QMD Markdown-Suche | System | Phase 4 | Schnelle Index-Suche über PARA-Wissen |
| RAG/Vector-Gedächtnis | System | Phase 4 | Semantische Suche via Embeddings |
| Webhook-Manager | Feature | Phase 5 | OpenClaw + Claude Hooks für Automatisierung |
| Budget-Tracker | Cron | Phase 6 | Täglicher Kosten-Check pro Provider |
| Gumroad Webhooks | Integration | Phase 11 | Revenue-Tracking n8n→CFO |
| Linux Tray App | Feature | Phase 13 | Pop!_OS Cosmic Status-Monitoring |

---

## Cron-Kalender (Alle)

| Zeit | Cron | Agent | Aktiv |
|------|------|-------|-------|
| */30 * * * * | crypto-trader-master | crypto-trader | ✅ |
| 0 6 * * 1,3,5 | update-watcher | update-strategist | ✅ |
| 0 7 * * * | morning-briefing | wanda | ✅ (aufpolieren) |
| 0 4 * * 0 | github-weekly-security-scan | github-master | ⏳ (Token fehlt) |
| 0 2 * * * | nightly-consolidation | wanda | 📋 PLANNED |
| 0 8 * * 1-5 | social-morning-post | cmo | ⏳ (Tokens fehlen) |
| 0 18 * * 1-5 | social-evening-engage | cmo | ⏳ (Tokens fehlen) |
| 0 22 * * * | evening-recap | wanda | 📋 PLANNED |
| 0 23 * * * | budget-tracker | cfo | 📋 PLANNED |

---

## Kommunikations-Matrix

| Kanal | Richtung | Auth-Level | Agent | Status |
|-------|----------|-----------|-------|--------|
| WhatsApp | Jannis ↔ Wanda | KRITISCH | wanda | ✅ |
| Discord #ceo-office | Jannis → Wanda | HOCH | wanda | ✅ |
| Discord #executive | Agents → Jannis | MITTEL | c-suite | ⏳ Routing-Bug |
| Discord #crypto-trading | crypto-trader → Jannis | MITTEL | crypto-trader | ⏳ Routing-Bug |
| Discord #dev-ops | cto/builder → Jannis | MITTEL | cto | ⏳ Routing-Bug |
| Discord #sales-marketing | cmo/cso → Jannis | NIEDRIG | cmo | ⏳ Routing-Bug |
| Discord #operations | coo → Jannis | NIEDRIG | coo | ⏳ Routing-Bug |
| Telegram (Groups) | Wanda → Projekte | NIEDRIG | wanda | ⏳ Group-IDs |
