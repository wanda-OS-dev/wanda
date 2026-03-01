# AGENT_CREATOR_SPEC.md — Wie neue Agenten vollständig angelegt werden

> **Status:** ACTIVE
> **Version:** 1.0
> **Last Updated:** 2026-02-27
> **Bezug:** SK-002 (agent-creator skill)

---

## Wann wird ein neuer Agent erstellt?

Checklist:
- [ ] Die Domäne ist klar abgegrenzt und spezialisiert
- [ ] Kein bestehender Agent kann die Aufgabe übernehmen (keine Dopplung)
- [ ] Der Bedarf ist dauerhaft (kein einmaliges Projekt)
- [ ] Jannis hat die Erstellung genehmigt
- [ ] Eine geeignete Persona (Inspiration) wurde identifiziert

---

## Agent-Lifecycle

```
1. BEDARF (Jannis / Wanda)
   └── Domäne identifizieren
   └── Prüfen: Kann bestehender Agent erweitert werden?
   └── Persona-Inspiration wählen

2. SPEZIFIKATION (Wanda + ADR-0003)
   └── IDENTITY definieren (Name, Rolle, Emoji)
   └── Modell wählen (nach Routing-Strategie)
   └── Tools festlegen (minimal privilege)
   └── Delegation definieren (subagents.allowAgents)

3. FREIGABE (Jannis)
   └── ADR-0003 Update vorschlagen
   └── Jannis bestätigt

4. IMPLEMENTIERUNG (Builder)
   └── openclaw.json Eintrag (Schritt-für-Schritt unten)
   └── Workspace-Anatomie anlegen (SK-010)
   └── SOUL.md erstellen

5. VALIDIERUNG (Reviewer)
   └── openclaw.json Syntax valid?
   └── Alle 8+1 Workspace-Dateien vorhanden?
   └── SOUL.md vollständig?

6. AKTIVIERUNG
   └── Container restart
   └── Test-Session mit neuem Agent
   └── ADR-0003 finalisieren
   └── SYSTEM_ARCHITECTURE.md updaten
```

---

## openclaw.json Eintrag (vollständiges Template)

```json
{
  "id": "agent-id-lowercase",
  "name": "Human Readable Name",
  "workspace": "/data/.openclaw/workspace-agent-id",
  "agentDir": "/data/.openclaw/agents/agent-id/agent",
  "model": {
    "primary": "anthropic/claude-sonnet-4-6",
    "fallbacks": [
      "google-gemini-cli/gemini-3.1-pro-preview"
    ]
  },
  "identity": {
    "name": "Human Readable Name",
    "theme": "blue",
    "emoji": "🤖"
  },
  "tools": {
    "allow": ["read", "write", "sessions_send"]
  },
  "subagents": {
    "allowAgents": ["builder", "reviewer"]
  },
  "sandbox": {
    "mode": "default"
  }
}
```

### Pflichtfelder
- `id`: lowercase-kebab-case, einmalig
- `name`: Lesbar für Display
- `model.primary`: Valider Model-String (aus Model-Routing-Tabelle)
- `tools.allow`: Minimale Berechtigungen (Principle of Least Privilege)

### Optionale Felder
- `workspace`: Nur wenn Custom-Pfad (Standard: `/data/.openclaw/workspace-{id}`)
- `agentDir`: Nur wenn Custom-Pfad
- `subagents.allowAgents`: Nur wenn Delegation benötigt
- `sandbox.mode: "off"`: Nur wenn exec/full-system benötigt
- Cron-Konfiguration: Wenn zeitgesteuert

---

## Workspace-Anatomie (8+1 Dateien)

Pfad: `/data/.openclaw/workspace-{agent-id}/`

| Datei | Zweck | Erstellt durch |
|-------|-------|----------------|
| `IDENTITY.md` | Rolle, Vibe, Kernprinzipien | OpenClaw oder manuell |
| `AGENTS.md` | Inputs, Outputs, Eskalationspfade | SK-010 |
| `BOOT.md` | Boot-Sequenz, Startup-Checks | SK-010 |
| `HEARTBEAT.md` | Health-Monitoring, Recovery | SK-010 |
| `MEMORY.md` | Persistentes Wissen, Index | SK-010 |
| `SOUL.md` | Kernwerte, ethische Guardrails | Manuell / aus agent/SOUL.md |
| `TOOLS.md` | Verfügbare Skills, Nutzungsregeln | SK-010 + manuell |
| `TACIT_KNOWLEDGE.md` | Präferenzen, gelernte Lektionen | SK-010 + wächst mit Zeit |
| `DAILY_NOTES.md` | Tageslogbuch | SK-010, dann Agent selbst |

---

## Agent-Konfigurationsverzeichnis

Pfad: `/data/.openclaw/agents/{agent-id}/agent/`

| Datei | Zweck |
|-------|-------|
| `SOUL.md` | System-Prompt-Erweiterung (von OpenClaw geladen) |
| `auth.json` | Auth-Konfiguration (OpenClaw-intern) |
| `auth-profiles.json` | Auth-Profile |
| `models.json` | Modell-Overrides |

**SOUL.md in `agent/` ist der System-Prompt** — wird von OpenClaw beim Session-Start geladen.
Das `SOUL.md` im Workspace ist das Agent-lesbare Memory-Format.

---

## Modell-Auswahl (nach Routing-Strategie)

```
Frage 1: Hauptaufgabe?
  → Kommunikation/Sprache → claude-sonnet-4-6
  → Code/Engineering → openai-codex/gpt-5.3-codex (nur builder)
  → Architektur/Strategie → gemini-3.1-pro-preview
  → Volume/Schnell → gemini-3-flash-preview

Frage 2: Wie oft läuft der Agent?
  → Sehr häufig (Cron <1h) → Flash (günstig)
  → Normal → Sonnet/Pro je nach Domäne

Frage 3: Echte finanzielle Konsequenzen?
  → Ja → gemini-3.1-pro-preview (kein Flash)
  → Nein → Flash OK für schnelle Tasks
```

---

## Post-Creation Checklist

```
[ ] openclaw.json Eintrag gültig (python3 JSON-Syntax check)
[ ] openclaw.json auf VPS übertragen
[ ] Container restarted
[ ] Agent-Konfigurationsverzeichnis (/agents/{id}/agent/) erstellt
[ ] SOUL.md in agent/ erstellt
[ ] Workspace-Anatomie (8+1 Dateien) angelegt
[ ] Wanda's allowAgents[] enthält neue Agent-ID
[ ] ADR-0003 Agenten-Roster aktualisiert
[ ] SYSTEM_ARCHITECTURE.md Agent-Tabelle aktualisiert
[ ] SERVICES_INDEX.md (wenn Cron) aktualisiert
[ ] Test-Session mit neuem Agent durchgeführt
```
