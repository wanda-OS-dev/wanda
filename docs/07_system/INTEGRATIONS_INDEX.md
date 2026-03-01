# INTEGRATIONS_INDEX.md — Alle Integrationen

> **Status:** ACTIVE
> **Version:** 2.0
> **Last Updated:** 2026-03-01
> **Maintainer:** github-master (wöchentlicher Review)

---

## Übersicht (23 Integrationen)

### Kommunikation & Messaging
| # | Service | Zweck | Owner-Agent | Credentials | Status |
|---|---------|-------|-------------|-------------|--------|
| 1 | GitHub | Versionskontrolle, CI/CD | github-master | GITHUB_TOKEN | ⏳ TOKEN PENDING |
| 2 | Discord | Team-Kommunikation, Voice, Bot | wanda | DISCORD_TOKEN, CHANNEL_IDs | ⚠️ ROUTING BUG (kein Channel antwortet) |
| 3 | Telegram | Alerts, Mobile-Control | wanda | TELEGRAM_BOT_TOKEN | ✅ AKTIV |
| 4 | WhatsApp | Jannis-Direktkanal | wanda | WHATSAPP (via OpenClaw) | ✅ AKTIV |

### Crypto-Trading
| # | Service | Zweck | Owner-Agent | Credentials | Status |
|---|---------|-------|-------------|-------------|--------|
| 5 | Kraken | Crypto-Trading (Spot, EUR) | crypto-trader | KRAKEN_API_KEY/SECRET | ✅ KONFIGURIERT |
| 6 | Binance | Höchste Liquidität, USDT-Pairs | crypto-trader | BINANCE_API_KEY/SECRET | ⏳ PENDING |
| 7 | OKX | 40+ Native Bots, Web3/DeFi | crypto-trader | OKX_API_KEY/SECRET/PASSPHRASE | ⏳ PENDING |
| 8 | CCXT | Unified Exchange-Interface | crypto-trader | NONE (Library) | ⏳ INSTALLIEREN |

### Social Media
| # | Service | Zweck | Owner-Agent | Credentials | Status |
|---|---------|-------|-------------|-------------|--------|
| 9 | Twitter/X | Social Media, Brand | cmo / copywriter | X_API_KEY/SECRET | ⏳ PENDING |
| 10 | LinkedIn | B2B-Marketing | cmo | LINKEDIN_TOKEN | ⏳ PENDING |
| 11 | Pinterest | Visual Marketing | cmo | PINTEREST_TOKEN | ⏳ PENDING |

### Monetarisierung
| # | Service | Zweck | Owner-Agent | Credentials | Status |
|---|---------|-------|-------------|-------------|--------|
| 12 | Gumroad | Digitale Produkte | cmo / cfo | GUMROAD_API_KEY | ⏳ SETUP PENDING |
| 13 | Stripe | Payment Processing | cfo | STRIPE_API_KEY | ⏳ SETUP PENDING |

### Web Research & Scraping
| # | Service | Zweck | Owner-Agent | Credentials | Status |
|---|---------|-------|-------------|-------------|--------|
| 14 | Jina.ai | URL→Markdown, LLM-ready | scout, alle | JINA_API_KEY | ⏳ SETUP PENDING |
| 15 | Firecrawl | Full-Site Crawling, Deep Research | scout, cto | FIRECRAWL_API_KEY | ⏳ SETUP PENDING |
| 16 | Tavily | AI-Search für RAG | scout, crypto-trader | TAVILY_API_KEY | ⏳ SETUP PENDING |
| 17 | Exa.ai | Semantische Suche | scout, cmo | EXA_API_KEY | ⏳ SETUP PENDING |
| 18 | Brave Search | Privacy-fokussierte Suche | scout, alle | BRAVE_API_KEY | ⏳ SETUP PENDING |
| 19 | Context7 | Library-Docs (via MCP) | builder, cto | MCP-basiert | ✅ MCP AKTIV |

### Infrastruktur & AI
| # | Service | Zweck | Owner-Agent | Credentials | Status |
|---|---------|-------|-------------|-------------|--------|
| 20 | n8n | Workflow-Automation | n8n-architect | INTERNAL | ✅ VPS-LOCAL |
| 21 | OpenClaw | AI-Agent-Runtime | alle | INTERNAL | ✅ AKTIV |
| 22 | Anthropic API | Claude-Modelle | alle (Sonnet) | ANTHROPIC_API_KEY | ✅ KONFIGURIERT |
| 23 | Google Gemini | Gemini-Modelle | alle (Flash/Pro) | GOOGLE_API_KEY | ✅ KONFIGURIERT |
| 24 | OpenAI Codex | Builder-Modell | builder | OPENAI_API_KEY | ✅ KONFIGURIERT |

---

## Detailprofile

### 1. GitHub
```yaml
Service: GitHub
Zweck: Repository-Management, Commit-Scans, CI/CD, Secret-Detection
Owner-Agent: github-master
Credentials:
  GITHUB_TOKEN: "ghp_..." (Personal Access Token, Scopes: repo, security_events)
Rate-Limits:
  REST API: 5000 req/h (authenticated)
  GraphQL: 5000 points/h
Cron: github-weekly-security-scan (Sonntag 04:00 Berlin)
Status: ⏳ TOKEN_REQUIRED
Aktivierung: Nach GITHUB_TOKEN in VPS .env → enable cron
```

### 2. Discord
```yaml
Service: Discord
Zweck: Team-Kommunikation, Agent-Routing nach Themen
Owner-Agent: wanda (Routing), channel-spezifische Agenten
Credentials:
  DISCORD_TOKEN: "Bot MTxxxxx..." (Bot Token)
  DISCORD_SERVER_ID: REQUIRED_INPUT
  DISCORD_CHANNEL_ID_CEO_OFFICE: REQUIRED_INPUT
  DISCORD_CHANNEL_ID_EXECUTIVE: REQUIRED_INPUT
  DISCORD_CHANNEL_ID_CRYPTO: REQUIRED_INPUT
  DISCORD_CHANNEL_ID_SOCIAL: REQUIRED_INPUT
  DISCORD_CHANNEL_ID_DEVOPS: REQUIRED_INPUT
  DISCORD_CHANNEL_ID_SALES: REQUIRED_INPUT
  DISCORD_CHANNEL_ID_OPS: REQUIRED_INPUT
  DISCORD_CHANNEL_ID_VOICE: REQUIRED_INPUT
Rate-Limits:
  Messages: 50 req/s (global)
  DM: 5 req/s
Known-Bug: Kein Channel antwortet aktuell (Nachrichten gehen rein, nie raus)
  → Analyse: docs/09_channels/DISCORD_ROUTING_FIX.md
Status: ⚠️ ROUTING_BUG + CHANNEL_IDs_REQUIRED
```

### 3. Telegram
```yaml
Service: Telegram
Zweck: Mobile-Alerts, Direktbefehle von Jannis, Bot-Steuerung
Owner-Agent: wanda
Credentials:
  TELEGRAM_BOT_TOKEN: Konfiguriert in OpenClaw
  TELEGRAM_GROUP_IDs: REQUIRED_INPUT (pro Projekt)
Rate-Limits:
  Nachrichten: 30/s (global), 1/s (pro Chat)
Status: ✅ BOT AKTIV | GROUP_IDs PENDING
```

### 4. WhatsApp
```yaml
Service: WhatsApp
Zweck: Jannis-Direktkanal, kritische Alerts (SECURITY, Trading-Loss)
Owner-Agent: wanda (alle Agenten können via sessions_send → wanda → WhatsApp)
Credentials: Via OpenClaw WhatsApp-Integration
Alert-Regeln:
  - SECURITY-Update vom update-strategist
  - Trading-Verlust > 10% vom crypto-trader
  - Kritische System-Fehler
Status: ✅ AKTIV
```

### 5. Kraken
```yaml
Service: Kraken Exchange (Spot)
Zweck: BTC/EUR, ETH/EUR Spot-Trading
Owner-Agent: crypto-trader
Credentials:
  KRAKEN_API_KEY: Konfiguriert (2026-02-21)
  KRAKEN_API_SECRET: Konfiguriert
Pairs: BTC/EUR, ETH/EUR
Rate-Limits:
  REST: 15-20 req/s (Tier-abhängig)
Cron: crypto-trader-master (alle 30 min)
Risiko-Regeln: Max 5% Portfolio/Trade, Stop-Loss 3% Pflicht
Status: ✅ KONFIGURIERT
```

### 6. Binance
```yaml
Service: Binance Exchange
Zweck: Höchste Liquidität, Derivatives, USDT-Pairs
Owner-Agent: crypto-trader
Credentials:
  BINANCE_API_KEY: REQUIRED_INPUT
  BINANCE_API_SECRET: REQUIRED_INPUT
Rate-Limits:
  REST: 1200 req/min (weight-based)
  WebSocket: 5 req/s
Integration: CCXT + python-binance library
Empfehlung: Für BTC/USDT, ETH/USDT, Futures
Status: ⏳ API_KEYS_REQUIRED
```

### 7. OKX
```yaml
Service: OKX Exchange
Zweck: Best Automation, 40+ Built-in Trading Bots, Options
Owner-Agent: crypto-trader
Credentials:
  OKX_API_KEY: REQUIRED_INPUT
  OKX_API_SECRET: REQUIRED_INPUT
  OKX_PASSPHRASE: REQUIRED_INPUT (OKX erfordert 3-Factor)
Rate-Limits:
  REST: 20 req/2s (per endpoint)
Integration: CCXT unified interface
Besonderheiten: Native Bot-Support, beste Options-Strategien
Status: ⏳ API_KEYS_REQUIRED
```

### 8-10. Social Media (X, LinkedIn, Pinterest)
```yaml
Services: Twitter/X, LinkedIn, Pinterest
Zweck: Content-Distribution, Marktrecherche, Brand-Aufbau
Owner-Agents:
  X: cmo + copywriter (Posting), scout (Recherche)
  LinkedIn: cmo (B2B-Content)
  Pinterest: cmo (Visual Content)
Credentials:
  X_API_KEY: REQUIRED_INPUT
  X_API_SECRET: REQUIRED_INPUT
  LINKEDIN_TOKEN: REQUIRED_INPUT
  PINTEREST_TOKEN: REQUIRED_INPUT
Crons (nach Aktivierung):
  social-morning-post: Mo-Fr 08:00 (X + LinkedIn)
  social-evening-engage: Mo-Fr 18:00 (Pinterest)
Status: ⏳ ALL_TOKENS_REQUIRED
Hinweis: Reddit und Upwork/Fiverr GESTRICHEN — keine automatisierbare API verfügbar.
```

### 13. Gumroad
```yaml
Service: Gumroad
Zweck: Digitale Produkte verkaufen (Templates, Kurse, Tools)
Owner-Agent: cmo (Marketing), cfo (Revenue-Tracking)
Credentials:
  GUMROAD_API_KEY: REQUIRED_INPUT
Integration: Webhook → n8n → Revenue-Report → CFO
Status: ⏳ SETUP_PENDING
```

### 14. n8n
```yaml
Service: n8n (Self-hosted Workflow Automation)
Zweck: Automatisierungen, Webhook-Empfang, API-Bridges
Owner-Agent: n8n-architect
Deployment: VPS-local (Port 5678)
Credentials: INTERNAL (VPS-only)
Integration: REST API + Webhook-Trigger
Status: ✅ VPS_LOCAL
```

### 15-18. AI Provider APIs
```yaml
Anthropic (Claude):
  Modelle: claude-sonnet-4-6, claude-haiku-4-5
  Credentials: ANTHROPIC_API_KEY ✅ KONFIGURIERT

Google (Gemini):
  Modelle: gemini-3.1-pro-preview, gemini-3-flash-preview
  Credentials: GOOGLE_API_KEY ✅ KONFIGURIERT

OpenAI (Codex):
  Modelle: gpt-5.3-codex
  Credentials: OPENAI_API_KEY ✅ KONFIGURIERT
```

### 19. CCXT
```yaml
Service: CCXT (CryptoCurrency eXchange Trading Library)
Zweck: Unified Python-Interface für alle Exchanges
Owner-Agent: crypto-trader
Installation: pip install ccxt
Supported: Kraken, Binance, OKX, Bybit (alle via CCXT)
Vorteil: Ein Interface für alle Exchanges, keine exchange-spezifische Bugs
Status: ⏳ VPS_INSTALL_REQUIRED
Install: ssh wanda "pip install ccxt"
```

### 14-19. Web Research Tools
```yaml
Jina.ai:
  Service: Jina Reader + Search API
  Zweck: URL→Markdown Konvertierung, LLM-ready Content-Extraktion
  Owner-Agent: scout (primär), alle Agenten
  Credentials: JINA_API_KEY (Free Tier verfügbar, API Key für höhere Limits)
  Besonderheiten: Open Source (Apache 2.0), PDF-Support, Image-Captioning
  Rate-Limits: 200 req/min (Free), höher mit API Key
  Use Cases: Recherche, Content-Extraktion, RAG-Pipeline
  Status: ⏳ SETUP_PENDING

Firecrawl:
  Service: AI-Powered Web Crawling API
  Zweck: Full-Site Crawls, Deep Research, strukturierte Extraktion
  Owner-Agent: scout, cto
  Credentials: FIRECRAWL_API_KEY
  Besonderheiten: JS-Rendering, Anti-Bot, Natural Language Extraction
  Endpoints: scrape, crawl, map, search, extract
  Use Cases: Doku-Scraping, Competitor-Analyse, Content-Pipeline
  Status: ⏳ API_KEY_REQUIRED

Tavily:
  Service: AI Search Engine API
  Zweck: Echtzeit-Faktensuche, optimiert für RAG und AI Agents
  Owner-Agent: scout, crypto-trader
  Credentials: TAVILY_API_KEY
  Besonderheiten: Confidence Scoring, Halluzinations-Reduktion, JSON Output
  Endpoints: search, extract, crawl, map, research
  Use Cases: Crypto-News, Marktumfeld, Echtzeit-Fakten
  Status: ⏳ API_KEY_REQUIRED

Exa.ai:
  Service: Semantic Search Engine API
  Zweck: Bedeutungsbasierte Suche, Trend-Erkennung, Web-Monitoring
  Owner-Agent: scout, cmo
  Credentials: EXA_API_KEY
  Besonderheiten: Neural Search, Websets für kuratierte Sammlungen
  Use Cases: Opportunity-Finding, Competitive Intelligence, Content Discovery
  Status: ⏳ API_KEY_REQUIRED

Brave Search:
  Service: Privacy-fokussierte Search API
  Zweck: Allgemeine Web-Suche ohne Tracking
  Owner-Agent: scout, alle
  Credentials: BRAVE_API_KEY
  Use Cases: Allgemeine Recherche, Privacy-sensitive Queries
  Status: ⏳ API_KEY_REQUIRED

Context7:
  Service: Library Documentation via MCP
  Zweck: Up-to-date Docs und Code-Beispiele für Libraries
  Owner-Agent: builder, cto
  Credentials: Keine (MCP-basiert)
  Besonderheiten: Direkt in Agent-Workflows integriert
  Status: ✅ MCP AKTIV
```

---

## REQUIRED_INPUT Checkliste

```
[ ] DISCORD_SERVER_ID
[ ] DISCORD_CHANNEL_ID_CEO_OFFICE
[ ] DISCORD_CHANNEL_ID_EXECUTIVE
[ ] DISCORD_CHANNEL_ID_CRYPTO
[ ] DISCORD_CHANNEL_ID_DEVOPS
[ ] DISCORD_CHANNEL_ID_SALES
[ ] DISCORD_CHANNEL_ID_OPS
[ ] TELEGRAM_GROUP_IDS (per Projekt)
[ ] GITHUB_TOKEN (repo + security_events scopes)
[ ] BINANCE_API_KEY + BINANCE_API_SECRET
[ ] OKX_API_KEY + OKX_API_SECRET + OKX_PASSPHRASE
[ ] X_API_KEY + X_API_SECRET
[ ] LINKEDIN_TOKEN
[ ] PINTEREST_TOKEN
[ ] GUMROAD_API_KEY
[ ] STRIPE_API_KEY
[ ] JINA_API_KEY
[ ] FIRECRAWL_API_KEY
[ ] TAVILY_API_KEY
[ ] EXA_API_KEY
[ ] BRAVE_API_KEY
```
