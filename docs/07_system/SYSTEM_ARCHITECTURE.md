# SYSTEM_ARCHITECTURE.md — WANDA Ecosystem

> **Status:** ACTIVE
> **Version:** 2.2 (21 Agents, Corrected Workspace Model + Voice Agent)
> **Last Updated:** 2026-03-01
> **Owner:** Wanda (Orchestrator)

---

## 1. Overview

WANDA ist ein autonomes AI-Betriebssystem auf Basis von OpenClaw, das auf einem VPS (Hostinger KVM 2) läuft. 21 spezialisierte Agenten arbeiten hierarchisch zusammen unter Orchestrierung von Wanda.

```
┌─────────────────────────────────────────────────────────┐
│                       JANNIS                            │
│                  (Human Authority)                      │
└──────────────────────────┬──────────────────────────────┘
                           │ WhatsApp / Discord / Telegram
┌──────────────────────────▼──────────────────────────────┐
│                    WANDA ORCHESTRATOR                    │
│            claude-sonnet-4-6 | sessions_spawn            │
└──────────────────────────┬──────────────────────────────┘
                           │ sessions_send / sessions_spawn
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
   [C-Suite]          [Specialists]      [Autonomous]
   CTO, COO           Builder, Scout     update-strategist
   CFO, CMO           Reviewer, etc.     crypto-trader
   CSO                frontend-ux-king   github-master
                      n8n-architect
```

---

## 2. Agent-Roster (21 Agenten)

| # | ID | Name | Model | Type |
|---|----|------|-------|------|
| 1 | `wanda` | Supreme Orchestrator | claude-sonnet-4-6 | Orchestrator |
| 2 | `cto` | Tech Visionary | gemini-3.1-pro-preview | C-Suite |
| 3 | `coo` | Operations Commander | gemini-3-flash-preview | C-Suite |
| 4 | `cfo` | Financial Strategist | gemini-3.1-pro-preview | C-Suite |
| 5 | `cmo` | Marketing Mastermind | claude-sonnet-4-6 | C-Suite |
| 6 | `cso` | Sales Strategist | gemini-3.1-pro-preview | C-Suite |
| 7 | `builder` | Code Craftsman | openai-codex/gpt-5.3-codex | Specialist |
| 8 | `scout` | Intelligence Analyst | gemini-3-flash-preview | Specialist |
| 9 | `reviewer` | Quality Guardian | claude-sonnet-4-6 | Specialist |
| 10 | `accountant` | Numbers Expert | gemini-3-flash-preview | Specialist |
| 11 | `copywriter` | Voice & Words | claude-sonnet-4-6 | Specialist |
| 12 | `sdr` | Lead Hunter | gemini-3-flash-preview | Specialist |
| 13 | `closer` | Deal Sealer | claude-sonnet-4-6 | Specialist |
| 14 | `customer-success` | Relationship Builder | claude-haiku-4-5 | Specialist |
| 15 | `partner` | Alliance Builder | gemini-3-flash-preview | Specialist |
| 16 | `frontend-ux-king` | Design Architect | gemini-3.1-pro-preview | Specialist |
| 17 | `n8n-architect` | Automation Engineer | gemini-3.1-pro-preview | Specialist |
| 18 | `update-strategist` | System Evolutionist | gemini-3.1-pro-preview | Autonomous |
| 19 | `crypto-trader` | Quant Strategist | gemini-3.1-pro-preview | Autonomous |
| 20 | `github-master` | GitHub Security Master | claude-sonnet-4-6 | Autonomous |
| 21 | `wanda-voice` | Jarvis Voice Interface | gemini-3-flash-preview | Voice |

---

## 3. Model-Routing-Strategie

```
Komplexität → Modell-Wahl:

Level 1 (Einfach/Schnell): gemini-3-flash-preview
  → accountant, sdr, scout, partner, coo
  → Use case: Volume-Tasks, Recherche, Reports

Level 2 (Standard/Coding): claude-sonnet-4-6 / gpt-5.3-codex
  → wanda, reviewer, cmo, copywriter, closer, github-master
  → Use case: Orchestrierung, Code Review, Kommunikation

Level 3 (Komplex/Strategie): gemini-3.1-pro-preview
  → cto, cfo, cso, frontend-ux-king, n8n-architect,
     update-strategist, crypto-trader
  → Use case: Architektur, Finanzen, komplexe Automation

Special:
  → customer-success: claude-haiku-4-5 (empathisch + günstig)
  → builder: gpt-5.3-codex (spezialisiert auf Code-Generierung)
```

**Denk-Stufen (Thinking Tiers):**
| Tier | Einsatz | Budget |
|------|---------|--------|
| No thinking | Volume-Tasks, einfache Queries | 0 |
| Light (1024 tokens) | Standard-Coding, Reports | ~$0.001 |
| Medium (8192 tokens) | Architektur, Review | ~$0.008 |
| Heavy (32000 tokens) | Kritische Entscheidungen | ~$0.032 |

---

## 4. Infrastruktur

### VPS
- **Host:** Hostinger KVM 2
- **SSH:** `ssh vps` (root)
- **Container:** `openclaw-hq7f-openclaw-1` (Docker)
- **SSH in Container:** `ssh wanda` (root shell)

### Container-Pfade
```
/docker/openclaw-hq7f/
├── data/
│   └── .openclaw/
│       ├── openclaw.json              ← Hauptkonfiguration (20 Agenten)
│       ├── agents/{id}/               ← Agent-System-Config (auth, models)
│       │   └── agent/SOUL.md
│       ├── workspace-{agent}/         ← Agent ZUHAUSE (9 Kern-Dateien)
│       │   ├── IDENTITY.md           ← Wer der Agent ist
│       │   ├── AGENTS.md             ← Rolle, Grenzen, Abhängigkeiten
│       │   ├── BOOT.md               ← Startup-Logik, Preconditions
│       │   ├── HEARTBEAT.md          ← Selbstüberwachung, Recovery
│       │   ├── MEMORY.md             ← Persönlicher Gedächtnis-Index
│       │   ├── SOUL.md               ← Grundwerte, Leitplanken
│       │   ├── TOOLS.md              ← Verfügbare Werkzeuge/Skills
│       │   ├── TACIT_KNOWLEDGE.md    ← Gelerntes, Präferenzen
│       │   └── DAILY_NOTES.md        ← Tageslogbuch
│       └── workspace/                 ← GEMEINSAMER ARBEITSPLATZ
│           ├── business/             ← Strategisches Second Brain
│           │   ├── strategy/         ← Identity, Execution, Retros
│           │   ├── assets/           ← Brand Assets, Logos
│           │   ├── journal/          ← Tägliches Business-Journal
│           │   └── ...               ← +15 weitere Unterordner
│           ├── personal/             ← Private Intentionen
│           ├── memory/               ← Shared Agent Memory Logs
│           │   └── DD-MM-YYYY.md     ← Tägliche Interaktions-Logs
│           ├── projects/             ← Geteilte Projekte
│           ├── AGENTS.md             ← Sub-Agenten-Konfiguration
│           ├── BOOT.md               ← System-Boot-Sequenz
│           ├── HEARTBEAT.md          ← System-Monitoring
│           ├── IDENTITY.md           ← Wanda Core Persona
│           ├── MEMORY.md             ← Langzeit-Gedächtnis Router
│           ├── SOUL.md               ← System-Grundwerte
│           ├── TOOLS.md              ← Tool-Inventar
│           ├── USER.md               ← Nutzer-Profil (Jannis)
│           └── settings.json         ← Wanda-Konfiguration
└── fix-jiti.sh                        ← Startup-Fix (NIE LÖSCHEN)
```

### Workspace-Analogie
```
workspace-{agent}/  = Das ZUHAUSE der 19 Sub-Agenten
                      → Hier macht er abends Notizen
                      → Hier entwickelt er sich weiter
                      → Hier speichert er persönliches Wissen

workspace/          = Wandas ZUHAUSE (DEFAULT) + gemeinsames BÜRO
                      → Wanda lebt hier (IDENTITY.md, SOUL.md etc.)
                      → Hier arbeiten ALLE 20 Agenten zusammen
                      → Hier liegt das strategische Business-Wissen
                      → Hier liegen geteilte Projekte
```

### Startup-Fix
```bash
/docker/openclaw-hq7f/fix-jiti.sh
# Ersetzt entrypoint, behebt Plugin-Ownership und Unsafe-Tmp
# Bei Container-Problemen: /openclaw-repair full
```

---

## 5. Datenflüsse

### Primärer Flow (User → System)
```
Jannis (WhatsApp/Discord/Telegram)
  → Wanda (Orchestrator)
    → C-Level Agent (Delegation)
      → Specialist Agent (Ausführung)
        → Wanda (Konsolidierung)
          → Jannis (Response)
```

### Autonomer Flow (Cron-gesteuert)
```
Cron-Trigger (Zeit/Interval)
  → Agent (z.B. crypto-trader, update-strategist, github-master)
    → Ausführung (Tool-Call, Daten)
      → WhatsApp Alert (wenn kritisch)
        → workspace/{agent}/DAILY_NOTES.md (Logbuch)
```

### Skill-Flow (Wanda → Builder)
```
Wanda erkennt Skill-Bedarf
  → SKILLS_INDEX.md prüfen
    → Skill vorhanden: direkt ausführen
    → Skill fehlt: sessions_send → Builder → neuen Skill erstellen
      → SKILLS_INDEX.md updaten
```

---

## 6. Secret-Handle-Pattern

**NIEMALS** Credentials direkt in Config-Dateien.
Alle Secrets werden als Handles referenziert:

```
Pattern: {SERVICE_NAME}_{KEY_TYPE}
Beispiele:
  KRAKEN_API_KEY        → Kraken Exchange API Key
  KRAKEN_API_SECRET     → Kraken Exchange API Secret
  BINANCE_API_KEY       → Binance Exchange API Key
  OKX_API_PASSPHRASE    → OKX Exchange Passphrase
  DISCORD_TOKEN         → Discord Bot Token
  TELEGRAM_BOT_TOKEN    → Telegram Bot Token
  GITHUB_TOKEN          → GitHub Personal Access Token
  X_API_KEY             → Twitter/X API Key
```

**Storage:** VPS `.env` Datei (nicht im Git)
**Injection:** OpenClaw Environment-Variables
**Rotation:** Via github-master (wöchentlicher Scan)

→ Vollständige Liste: INTEGRATIONS_INDEX.md
→ Trust-Modell: SECURITY_MODEL.md

---

## 7. Paket-Struktur (Wanda-Repo)

```
~/Schreibtisch/Work-OS/40_Products/Wanda-Repo/
├── docs/
│   ├── 00_overview/         ← Projekt-Übersicht
│   ├── 01_research/         ← Forschungsergebnisse
│   ├── 02_architecture/     ← Architektur-Docs
│   ├── 03_decisions/        ← ADRs (Architecture Decision Records)
│   ├── 04_plan/             ← Planungsdokumente
│   ├── 05_specs/            ← Spezifikationen
│   ├── 06_gen2_build_logs/  ← Build-Logs
│   ├── 06_ops/              ← Operations-Docs
│   ├── 07_system/           ← System-Registries (AKTIV)
│   ├── 08_skills/           ← Skill-Spezifikationen
│   ├── 09_channels/         ← Kommunikations-Architektur
│   ├── 10_trading/          ← Trading-Plattform-Docs
│   ├── 11_monetization/     ← Monetarisierungs-Strategie
│   └── 12_freelance/        ← Freelance-Setup
└── README.md
```

---

## 8. Bekannte Issues (REQUIRED_INPUT)

| Issue | Benötigt | Status |
|-------|----------|--------|
| Discord Routing Bug | DISCORD_CHANNEL_IDs | ⏳ PENDING |
| Binance Integration | BINANCE_API_KEY + SECRET | ⏳ PENDING |
| OKX Integration | OKX_API_KEY + SECRET + PASSPHRASE | ⏳ PENDING |
| GitHub Security Master | GITHUB_TOKEN | ⏳ PENDING |
| Social Media Crons | X/LinkedIn/Pinterest Tokens | ⏳ PENDING |
| Telegram Groups | TELEGRAM_GROUP_IDs | ⏳ PENDING |

→ Alle REQUIRED_INPUT Details: INTEGRATIONS_INDEX.md
