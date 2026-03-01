# OPENCLAW_FEATURE_REGISTRY.md — OpenClaw Feature-Analyse

> **Status:** ACTIVE
> **Version:** 2.0
> **Last Updated:** 2026-03-01
> **Basis:** OpenClaw Gen 2 (Container: openclaw-hq7f-openclaw-1)

---

## Bewertungsschema

| Status | Bedeutung |
|--------|-----------|
| ✅ ÜBERNOMMEN | Feature aktiv genutzt |
| 🔧 ERWEITERT | Feature mit Custom-Logik angepasst |
| ⏳ GEPLANT | Feature verfügbar, noch nicht aktiviert |
| ❌ ABGELEHNT | Feature nicht nutzbar / ersetzt |
| ⚠️ BUGGY | Feature verfügbar aber fehlerhaft |

---

## Session-Management

| Feature | Status | Nutzung | Notizen |
|---------|--------|---------|---------|
| sessions_send | ✅ ÜBERNOMMEN | Alle Agenten | Direkte Agent-zu-Agent-Kommunikation |
| sessions_spawn | ✅ ÜBERNOMMEN | Wanda, CTO, COO | Sub-Session spawnen |
| sessions_history | ✅ ÜBERNOMMEN | Reviewer | Session-Verlauf lesen |
| sessions_list | ✅ ÜBERNOMMEN | Wanda | Alle aktiven Sessions |
| sessions.visibility: "tree" | ✅ ÜBERNOMMEN | Global | Agenten sehen eigenen Subtree |

---

## Tool-System

| Feature | Status | Nutzung | Notizen |
|---------|--------|---------|---------|
| read | ✅ ÜBERNOMMEN | Alle Agenten | Standard Datei-Lesen |
| write | ✅ ÜBERNOMMEN | Schreibende Agenten | Datei-Ausgabe |
| edit | ✅ ÜBERNOMMEN | Schreibende Agenten | Datei-Bearbeitung |
| exec | ✅ ÜBERNOMMEN | builder, crypto-trader, cto | Code-Ausführung |
| web_search | ✅ ÜBERNOMMEN | scout, update-strategist | Recherche |
| web_fetch | ✅ ÜBERNOMMEN | scout, update-strategist, cmo | URL-Inhalte |
| browser | 🔧 ERWEITERT | frontend-ux-king | Visual Testing |
| tools.allow per Agent | ✅ ÜBERNOMMEN | Global | Per-Agent Berechtigungen |

---

## Sandbox-System

| Feature | Status | Nutzung | Notizen |
|---------|--------|---------|---------|
| sandbox: "off" | ✅ ÜBERNOMMEN | wanda, builder, crypto-trader | Voller Systemzugriff |
| sandbox: default | ✅ ÜBERNOMMEN | scout, reviewer, accountant | Eingeschränkt |
| Tool-allow-lists | ✅ ÜBERNOMMEN | alle Agenten | Fine-grained Permissions |

---

## Cron-System

| Feature | Status | Nutzung | Notizen |
|---------|--------|---------|---------|
| Cron-Trigger | ✅ ÜBERNOMMEN | crypto-trader, update-strategist | Zeit-basierte Ausführung |
| enabled: false | ✅ ÜBERNOMMEN | github-master cron | Bedingte Aktivierung |
| Timezone-Support | ✅ ÜBERNOMMEN | alle Crons | Europe/Berlin |
| Multiple Crons pro Agent | ⏳ GEPLANT | cmo (social posts) | Nach Token-Aktivierung |

---

## Kommunikations-Integrationen

| Feature | Status | Nutzung | Notizen |
|---------|--------|---------|---------|
| Discord Integration | ⚠️ BUGGY | wanda | Routing-Bug: kein Channel antwortet (rein ja, raus nein) |
| Telegram Integration | ✅ ÜBERNOMMEN | wanda | Alerts funktionieren |
| WhatsApp Integration | ✅ ÜBERNOMMEN | wanda | Via OpenClaw-intern |
| Channel-zu-Agent Routing | ⚠️ BUGGY | Discord | Fix in Phase 3 |
| Hooks (Internal) | ✅ ÜBERNOMMEN | session-memory, bootstrap | Event-driven Agent-Hooks |
| Webhooks (External) | ⏳ GEPLANT | hooks.mappings | HTTP-Webhooks für externe Trigger |

---

## Model-Routing

| Feature | Status | Nutzung | Notizen |
|---------|--------|---------|---------|
| model.primary | ✅ ÜBERNOMMEN | alle Agenten | Hauptmodell |
| model.fallbacks | ✅ ÜBERNOMMEN | alle Agenten | Fallback-Kette |
| Multi-Provider | ✅ ÜBERNOMMEN | Anthropic + Google + OpenAI | Heterogene Model-Auswahl |
| Model per Agent | ✅ ÜBERNOMMEN | alle Agenten | Individuelles Modell-Routing |

---

## Agent-Konfiguration

| Feature | Status | Nutzung | Notizen |
|---------|--------|---------|---------|
| agents.list[] | ✅ ÜBERNOMMEN | alle 20 Agenten | Haupt-Konfiguration |
| subagents.allowAgents | ✅ ÜBERNOMMEN | alle C-Level | Erlaubte Delegation |
| SOUL.md / agent/ | ✅ ÜBERNOMMEN | 14 von 20 Agenten | Agent-Persönlichkeit |
| workspace-{agent}/ | ✅ ÜBERNOMMEN | 19 Sub-Agenten | Agent-Home (9 Kern-Dateien) |
| workspace/ (shared) | ✅ ÜBERNOMMEN | Wanda + alle Agenten | Wandas Zuhause (DEFAULT) + gemeinsamer Arbeitsplatz |
| IDENTITY.md | ✅ ÜBERNOMMEN | alle 20 Agenten | Rollen-Definition |
| 8+1 Workspace-Anatomie | 🔧 ERWEITERT | Phase 1 | Eigenes Standard-Format |

---

## OpenClaw-spezifische Features

| Feature | Status | Notizen |
|---------|--------|---------|
| openclaw.json | ✅ AKTIV | Haupt-Config (20 Agenten nach Phase 1) |
| fix-jiti.sh | ✅ KRITISCH | Startup-Fix, NIE LÖSCHEN |
| /openclaw-repair skill | ✅ AKTIV | Lokal (Claude Code) |
| Container-Management | ✅ AKTIV | docker restart / pause |
| Plugin-System | ⚠️ FRAGIL | Ownership-Bugs bekannt |
| Unsafe-Tmp Fix | ✅ AKTIV | Via fix-jiti.sh |

---

## Abgelehnte / Nicht-genutzte Features

| Feature | Status | Begründung |
|---------|--------|------------|
| `google-antigravity/*` Modelle | ❌ ABGELEHNT | Existieren nicht — verwende `google-gemini-cli/*` |
| `kimi-coding/k2.5` | ❌ ABGELEHNT | Existiert nicht — ersetzt durch claude-sonnet-4-6 |
| Automatische Updates ohne Freigabe | ❌ ABGELEHNT | Update-Strategist darf NUR vorbereiten |
| Sandbox bei Trading-Agents | ❌ ABGELEHNT | Brauchen exec für CCXT/API-Calls |

---

## Eigene Erweiterungen (Beyond OpenClaw Default)

| Erweiterung | Beschreibung |
|-------------|-------------|
| 8+1 Workspace-Anatomie | AGENTS.md, BOOT.md, HEARTBEAT.md, MEMORY.md, SOUL.md, TOOLS.md, TACIT_KNOWLEDGE.md, DAILY_NOTES.md |
| Pro-Agent Skill-Libraries | Jeder Agent hat eigene TOOLS.md mit erlaubten Skills |
| Kill-Switch-Protokoll | 4-Level System (Trading/Agent/System/Secret) |
| Trust-Boundary-Modell | Auth vs. Info-Channels Klassifizierung |
| Thinking-Tier-System | 4 Budget-Stufen für Model-Thinking |
| Agent-20 Pattern | github-master als Sicherheits-Spezialist |
| Webhook-Manager (SK-050) | OpenClaw Hooks + Claude Code Hooks für Automatisierung |
| Web Research Tools (6x) | Jina.ai, Firecrawl, Tavily, Exa.ai, Brave, Context7 |
| Custom Heartbeat (SK-054) | Script-basierter Heartbeat zusätzlich zu OpenClaw native |
| ENV-Isolation | AI-Agenten sehen nie rohe Keys, nur AVAILABLE_APIS.md |
| Budget-Tracker (SK-053) | CFO-Guardrail mit pro-Provider Limits |
