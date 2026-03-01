# SERVICES_INDEX.md — Dienste, Worker, Daemons und Bots

> **Status:** ACTIVE
> **Version:** 2.0
> **Last Updated:** 2026-03-01
> **Owner:** coo (Operations), update-strategist (Version-Tracking)

---

## 1. Core Services (VPS)

### OpenClaw Runtime
```yaml
Name: openclaw-hq7f-openclaw-1
Type: Docker Container
Port: 3000 (internal)
Start: docker start openclaw-hq7f-openclaw-1
Health: GET http://localhost:3000/health
Startup-Fix: /docker/openclaw-hq7f/fix-jiti.sh (IMMER ausführen nach Rebuild)
Logs: docker logs openclaw-hq7f-openclaw-1
Status: ✅ AKTIV
```

### n8n Workflow Engine
```yaml
Name: n8n
Type: Docker Container / Process
Port: 5678
URL: http://localhost:5678 (VPS-local)
Owner: n8n-architect
Start: docker start n8n (oder systemd)
Status: ✅ VPS_LOCAL (Konfiguration pending)
```

---

## 2. Autonomous Agents (Cron-gesteuert)

### crypto-trader-master
```yaml
Agent: crypto-trader
Trigger: Cron alle 30 Minuten
Schedule: "*/30 * * * *"
Timezone: Europe/Berlin
Actions:
  1. Marktdaten abrufen (CCXT → Kraken)
  2. TA-Signale berechnen (MA, RSI)
  3. Risk-Check (Max 5% Portfolio)
  4. Trade ausführen oder HOLD
  5. DAILY_NOTES.md updaten
  6. WhatsApp bei echtem Trade oder Loss > 10%
Status: ✅ AKTIV (Kraken) | ⏳ PENDING (Binance, OKX)
```

### update-watcher
```yaml
Agent: update-strategist
Trigger: Cron Mo/Mi/Fr
Schedule: "0 6 * * 1,3,5"
Timezone: Europe/Berlin
Actions:
  1. OpenClaw Release-Notes prüfen
  2. Anthropic/Google/OpenAI Modell-Updates
  3. Klassifizierung: SECURITY / MAJOR / MINOR
  4. DAILY_NOTES.md dokumentieren
  5. Bei SECURITY: Sofort WhatsApp Alert
  6. Bei MAJOR/MINOR: Wöchentlicher Bericht
Status: ✅ AKTIV
```

### github-weekly-security-scan
```yaml
Agent: github-master
Trigger: Cron Sonntag
Schedule: "0 4 * * 0"
Timezone: Europe/Berlin
Actions:
  1. Git-Commits auf Secret-Pattern scannen
  2. .gitignore Vollständigkeit prüfen
  3. README.md Aktualität prüfen
  4. CI/CD-Konfiguration validieren
  5. Security-Report erstellen
  6. Bei Findings: WhatsApp Alert an Jannis
Status: ⏳ DISABLED (GITHUB_TOKEN required)
Aktivierung: Nach GITHUB_TOKEN in .env → enabled: true
```

---

## 3. Bot-Services

### Discord Bot
```yaml
Name: WANDA Discord Bot
Type: OpenClaw Discord Integration
Owner: wanda
Channels:
  #ceo-office → wanda (Auth-Channel)
  #executive → c-suite agents
  #crypto-trading → crypto-trader
  #dev-ops → cto + builder
  #sales-marketing → cmo + cso
  #operations → coo + n8n-architect
Known-Bug: Kein Channel antwortet aktuell (Nachrichten rein, nie raus)
  → Fix-Plan: docs/09_channels/DISCORD_ROUTING_FIX.md
Status: ⚠️ ROUTING_BUG (kein Channel antwortet)
```

### Telegram Bot
```yaml
Name: WANDA Telegram Bot
Type: OpenClaw Telegram Integration
Owner: wanda
Features:
  - Befehle von Jannis empfangen
  - Alerts an Gruppen senden
  - Per-Projekt-Gruppen (nach TELEGRAM_GROUP_IDs)
Status: ✅ BOT AKTIV | ⏳ GROUP_IDs PENDING
```

---

## 4. Geplante Services (PENDING)

### CCXT Trading Bridge
```yaml
Name: ccxt-bridge
Type: Python Service / Library
Purpose: Unified Exchange Interface für alle Exchanges
Supports: Kraken, Binance, OKX, Bybit (100+ Exchanges)
Install: pip install ccxt (im Container)
Owner: crypto-trader
Status: ⏳ INSTALL_REQUIRED
```

### Social Media Scheduler
```yaml
Name: social-scheduler
Type: n8n Workflow
Owner: n8n-architect + cmo
Schedule:
  Mo-Fr 08:00 → Morning Post (X + LinkedIn)
  Mo-Fr 18:00 → Evening Engage (Pinterest)
Status: ⏳ PENDING (Social Tokens + n8n Setup)
```

### Nightly Consolidation
```yaml
Name: nightly-consolidation
Type: Wanda Cron
Schedule: "0 2 * * *" (täglich 02:00)
Actions:
  1. Alle DAILY_NOTES.md sammeln
  2. Key Insights extrahieren
  3. MEMORY.md aller betroffenen Agenten updaten
  4. Tagesbericht erstellen
  5. Bei kritischen Issues: Discord #ceo-office Alert
Status: ⏳ PLANNED (Phase 4)
```

---

## 5. Service-Health-Matrix

| Service | Port | Health-Check | Restart-Befehl | Status |
|---------|------|-------------|----------------|--------|
| openclaw | 3000 | GET /health | docker restart openclaw-hq7f-openclaw-1 | ✅ |
| n8n | 5678 | GET /healthz | docker restart n8n | ✅ |
| discord-bot | - | OpenClaw internal | Container restart | ⚠️ |
| telegram-bot | - | OpenClaw internal | Container restart | ✅ |
| crypto-trader cron | - | DAILY_NOTES check | Re-enable cron | ✅ |
| update-watcher cron | - | DAILY_NOTES check | Re-enable cron | ✅ |
| github-master cron | - | DAILY_NOTES check | Re-enable cron | ⏳ |

---

## 6. Service-Abhängigkeiten

```
OpenClaw Container
  ├── fix-jiti.sh (BOOT)
  ├── Discord Bot
  ├── Telegram Bot
  ├── alle Agenten (Sessions)
  ├── Cron-Service (intern)
  └── .env (Secrets)

n8n (separat)
  ├── Discord Webhook (geplant)
  └── Social Media APIs (geplant)

crypto-trader (abhängig von)
  ├── Kraken API ✅
  ├── CCXT Library ⏳
  ├── Binance API ⏳
  └── OKX API ⏳
```
