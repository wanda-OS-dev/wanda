# SKILLS_INDEX.md — Global Skills Registry

> **Status:** ACTIVE
> **Version:** 2.0
> **Last Updated:** 2026-03-01
> **Maintainer:** wanda (Discovery), builder (Implementation), github-master (Versioning)

---

## Konzept

Skills sind wiederverwendbare, benannte Operationen die Agenten als atomare Einheiten ausführen können.
Jeder Skill hat: ID, Owner, Trigger, Input, Output, Implementierung.

```
Skill-Discovery-Flow:
  Wanda erkennt wiederkehrende Aufgabe
    → SKILLS_INDEX.md prüfen
      → Skill vorhanden: Direkt ausführen
      → Skill fehlt: Skill-Creator beauftragen
        → Builder implementiert
          → SKILLS_INDEX.md updaten
            → Pro-Agent-Library ergänzen
```

---

## Core-Skills (System-Pflicht)

### SK-001: skill-creator
```yaml
ID: skill-creator
Owner: builder (Implementierung) + wanda (Approval)
Trigger: Wanda erkennt neuen Skill-Bedarf
Input:
  - skill_name: string
  - description: string
  - trigger_condition: string
  - input_schema: dict
  - output_schema: dict
Output:
  - Skill-File in workspace/skills/{skill_id}.md
  - SKILLS_INDEX.md Update
Implementation:
  - Builder erstellt Skill-Spezifikation
  - Reviewer validiert
  - Wanda fügt zu Index hinzu
Spec: docs/08_skills/SKILL_CREATOR_SPEC.md
```

### SK-002: agent-creator
```yaml
ID: agent-creator
Owner: wanda (Orchestration) + builder (Config)
Trigger: Jannis oder Wanda erkennt Bedarf für neuen Agenten
Input:
  - agent_name: string
  - inspiration: string (Persona)
  - domain: string
  - model: string
  - tools: list
Output:
  - openclaw.json Update (neuer Agent-Eintrag)
  - workspace-{agent}/ (8+1 Dateien, 19 Sub-Agenten)
  - agents/{id}/agent/SOUL.md
  - ADR-Update (Agent-Roster)
Implementation:
  1. Wanda definiert Persona + Domäne
  2. Builder erstellt openclaw.json-Eintrag
  3. Agent-Anatomie-Struktur anlegen (SK-010)
  4. Container restart
Spec: docs/08_skills/AGENT_CREATOR_SPEC.md
```

### SK-003: self-skilling
```yaml
ID: self-skilling
Owner: wanda
Trigger: Autonome Erkennung von Lücken in der Skill-Library
Input: Observations aus DAILY_NOTES.md aller Agenten
Output:
  - Neue Skill-Vorschläge in SKILLS_INDEX.md (Status: PROPOSED)
  - WhatsApp-Brief an Jannis mit Begründung
Implementation:
  - Wanda analysiert wöchentlich DAILY_NOTES aller Agenten
  - Identifiziert Pattern: "gleiche manuelle Aufgabe > 3x"
  - Erstellt Skill-Vorschlag (draft)
  - Wartet auf Jannis-Freigabe vor Implementierung
Spec: docs/08_skills/SELF_SKILLING_SPEC.md
```

---

## Operations-Skills

### SK-010: agent-anatomy-setup
```yaml
ID: agent-anatomy-setup
Owner: wanda / builder
Trigger: Neuer Agent oder fehlende Workspace-Dateien
Input:
  - agent_id: string
  - agent_name: string
  - role_description: string
Output: 8+1 Workspace-Dateien in workspace-{agent}/ (Wanda nutzt workspace/ Default)
Files:
  - IDENTITY.md (existiert meist bereits)
  - AGENTS.md
  - BOOT.md
  - HEARTBEAT.md
  - MEMORY.md
  - SOUL.md
  - TOOLS.md
  - TACIT_KNOWLEDGE.md
  - DAILY_NOTES.md
```

### SK-011: container-restart
```yaml
ID: container-restart
Owner: wanda (Trigger) + exec-Tool
Trigger: Config-Änderungen, Container-Fehler
Input: reason: string
Output: Container neu gestartet und healthy
Steps:
  1. ssh vps "docker restart openclaw-hq7f-openclaw-1"
  2. 30s warten
  3. Health-Check: GET http://localhost:3000/health
  4. DAILY_NOTES.md mit Restart-Grund
```

### SK-012: secret-rotation-check
```yaml
ID: secret-rotation-check
Owner: github-master
Trigger: Wöchentlich (Sonntag 04:00) + on-demand
Input: repository paths, .env, commit history
Output:
  - Security-Report in DAILY_NOTES.md
  - Alert an Jannis bei Findings
Checks:
  - Git commits: grep für API-Key-Pattern
  - .gitignore: Vollständigkeits-Check
  - .env: Nicht im Git
  - Docs: Keine Klartexte
```

---

## Trading-Skills

### SK-020: trade-signal-check
```yaml
ID: trade-signal-check
Owner: crypto-trader
Trigger: Cron alle 30 min
Input: exchange_id, pairs, timeframe
Output:
  - Signal: BUY / SELL / HOLD
  - Reasoning: MA + RSI Analyse
  - Risk-Check: Portfolio-% berechnet
Implementation: CCXT + TA-Lib
```

### SK-021: trade-execute
```yaml
ID: trade-execute
Owner: crypto-trader
Trigger: Positives Signal von SK-020 + Risk-Check OK
Input: exchange, pair, direction, amount, stop_loss
Output:
  - Order-ID
  - DAILY_NOTES.md Eintrag
  - WhatsApp-Bestätigung
Pre-conditions:
  - Risk: <= 5% Portfolio
  - Stop-Loss definiert
  - Kein aktiver Loss > 10%
```

---

## Kommunikations-Skills

### SK-030: discord-alert
```yaml
ID: discord-alert
Owner: wanda
Trigger: Kritische Events von anderen Agenten
Input: channel_id, message, priority (low/medium/high/critical)
Output: Discord-Nachricht gesendet
Channel-Routing:
  critical → #ceo-office
  high → #executive
  trading → #crypto-trading
  devops → #dev-ops
```

### SK-031: telegram-broadcast
```yaml
ID: telegram-broadcast
Owner: wanda
Trigger: Tagesberichte, Alerts
Input: group_id, message, parse_mode
Output: Telegram-Nachricht
Rate-Limit: 1/s pro Chat
```

### SK-032: whatsapp-alert
```yaml
ID: whatsapp-alert
Owner: wanda (alle Agenten via sessions_send → wanda)
Trigger: KRITISCH nur — keine Spam-Policy
Input: message, urgency (high/critical)
Output: WhatsApp an Jannis
Use-Cases:
  - Trading Loss > 10%
  - SECURITY-Update verfügbar
  - Kill-Switch aktiviert
  - Unbekannter System-Fehler
```

---

## Content-Skills

### SK-040: social-post-create
```yaml
ID: social-post-create
Owner: copywriter + cmo (Approval)
Trigger: Content-Kalender Cron oder on-demand
Input: topic, platform (X/LinkedIn/Pinterest), tone
Output:
  - Fertiger Post-Text
  - Hashtags
  - Scheduled-Time
  - Platform-spezifische Formatierung
```

### SK-041: social-post-publish
```yaml
ID: social-post-publish
Owner: cmo (Trigger)
Trigger: Nach Freigabe von SK-040
Input: post_content, platform, credentials
Output: Published Post ID + URL
Requires: Credentials aus INTEGRATIONS_INDEX.md
```

---

## Status-Übersicht

| Skill-ID | Name | Status |
|----------|------|--------|
| SK-001 | skill-creator | ✅ DEFINIERT |
| SK-002 | agent-creator | ✅ DEFINIERT |
| SK-003 | self-skilling | ✅ DEFINIERT |
| SK-010 | agent-anatomy-setup | ✅ DEFINIERT |
| SK-011 | container-restart | ✅ DEFINIERT |
| SK-012 | secret-rotation-check | ✅ DEFINIERT |
| SK-020 | trade-signal-check | ⏳ PENDING (CCXT install) |
| SK-021 | trade-execute | ⏳ PENDING (CCXT install) |
| SK-030 | discord-alert | ⏳ PENDING (Channel IDs) |
| SK-031 | telegram-broadcast | ⏳ PENDING (Group IDs) |
| SK-032 | whatsapp-alert | ✅ AKTIV |
| SK-040 | social-post-create | ⏳ PENDING (Social Tokens) |
| SK-041 | social-post-publish | ⏳ PENDING (Social Tokens) |
| SK-050 | webhook-manager | ✅ NEU DEFINIERT |
| SK-051 | ripgrep-search | ✅ NEU DEFINIERT |
| SK-052 | web-research | ✅ NEU DEFINIERT |
| SK-053 | budget-tracker | ✅ NEU DEFINIERT |
| SK-054 | custom-heartbeat | ✅ NEU DEFINIERT |
| SK-055 | morning-briefing | ✅ EXISTIERT (wird aufpoliert) |

---

## Neue Skills (v2.0)

### SK-050: webhook-manager
```yaml
ID: webhook-manager
Owner: wanda / n8n-architect
Trigger: Agent Event oder externe HTTP-Requests
Input:
  - hook_type: internal | external
  - event: string (z.B. "/new", "/reset", "github-push")
  - payload: dict
Output:
  - Routed Action (Agent-Wake, Chat-Delivery, Log)
Implementation:
  - OpenClaw hooks.mappings in openclaw.json konfigurieren
  - Claude Code Hooks für lokale Workflows
  - Transforms via TS-Module in hooks.transformsDir
Use Cases:
  - Kosten-Tracking nach Agent-Runs
  - GitHub Push → CI/CD auslösen
  - Trading-Signale → crypto-trader wecken
  - Email-Eingang → Customer-Success
Spec: docs/01_research/HOOKS_RESEARCH.md
```

### SK-051: ripgrep-search
```yaml
ID: ripgrep-search
Owner: builder, cto
Trigger: Code/Log-Suche Bedarf
Input:
  - query: string (Pattern/Regex)
  - path: string (Suchpfad)
  - options: dict (case-insensitive, file-type, context-lines)
Output:
  - Matching lines mit Datei:Zeile:Inhalt
  - JSON-Format für programmatische Weiterverarbeitung
Command: rg -n --json "{query}" {path}
Use Cases:
  - Funktionen, Variablen, Fehlertexte finden
  - Log-Pattern-Analyse
  - Config-Stellen lokalisieren
```

### SK-052: web-research
```yaml
ID: web-research
Owner: scout (primär), alle Agenten
Trigger: Informationsbedarf, Marktrecherche, Trend-Analyse
Input:
  - query: string
  - depth: shallow | deep
  - tools: list (jina, tavily, exa, firecrawl, brave)
Output:
  - Strukturierte Ergebnisse in Markdown
  - Quellen mit URLs und Datum
  - Werden in PARA/Resources/ gespeichert (kein zweiter Research nötig)
Priority:
  1. Jina.ai (URL→Markdown, Free Tier)
  2. Tavily (AI-Search, Echtzeit-Fakten)
  3. Exa.ai (Semantische Suche)
  4. Firecrawl (Full-Site Crawls)
  5. Brave (Allgemeine Suche)
Guardrail: Ergebnisse IMMER persistent speichern
```

### SK-053: budget-tracker
```yaml
ID: budget-tracker
Owner: cfo
Trigger: CFO-Cron (täglich 23:00) + on-demand
Input:
  - provider: string (anthropic, google, openai, kraken)
  - period: daily | weekly | monthly
Output:
  - Kostenübersicht pro Provider
  - Alert wenn Limit überschritten
  - DAILY_NOTES.md des CFO updaten
Limits:
  - Pro Provider individuell konfigurierbar
  - Bei Überschreitung: Agent-Freeze + WhatsApp Alert
```

### SK-054: custom-heartbeat
```yaml
ID: custom-heartbeat
Owner: wanda (System-weit)
Trigger: Script-basiert (zusätzlich zum OpenClaw Heartbeat)
Input: System-Events, Log-Änderungen, externe Signale
Output:
  - Automatische Reaktionen auf logische Events
  - Social-Kommentar-Beantwortung wenn nötig
  - Jobs starten wenn Arbeit reinkommt
  - System-Health-Checks
Implementation:
  - Python-Script als Daemon/Cron
  - Überwacht workspace/memory/, Social-Kanäle, Job-Queues
  - Kann Agenten via sessions_send wecken
```

---

## Pro-Agent Skill-Libraries

Jeder Agent verwaltet eine eigene Skill-Library in seinem Workspace:
```
workspace-{agent}/TOOLS.md  (Wanda: workspace/TOOLS.md)
  → Listet alle Skills die dieser Agent nutzen darf
  → Dokumentiert agent-spezifische Nutzungsregeln
  → Verweist auf diesen SKILLS_INDEX für Specs
```

**Ziel:** Kein Agent kennt Skills außerhalb seiner Library.
Wanda hat Zugriff auf alle Skills (volle Library).
