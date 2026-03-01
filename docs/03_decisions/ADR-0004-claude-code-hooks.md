# ADR-0004: Claude Code Hooks als primäres Automatisierungs-Tool

**Status:** Accepted  
**Datum:** 2026-03-01

## Kontext

Claude Code (ACP) bietet ein Hook-System das direkt in den Agenten-Loop eingreift — zwischen API-Aufrufen, vor/nach Tool-Ausführungen, bei Session-Start/End.

## Entscheidung

Claude Code Hooks haben höchste Priorität in der WANDA Automatisierungs-Hierarchie:

**Claude Code Hook > OpenClaw Hook > Skill > Script > Heartbeat > andere Lösung**

## Events (vollständig)

| Event | Wann | Blockierbar |
|-------|------|-------------|
| SessionStart | Session-Start | Nein |
| UserPromptSubmit | Vor Prompt-Verarbeitung | Ja |
| PreToolUse | Vor jedem Tool-Aufruf | Ja |
| PermissionRequest | Bei Permission-Dialog | Ja |
| PostToolUse | Nach Tool-Aufruf | Nein (Feedback möglich) |
| PostToolUseFailure | Nach fehlgeschlagenem Tool | Nein |
| Stop | Wenn Claude stoppen will | Ja |
| SubagentStart/Stop | Sub-Agent Lifecycle | Stop: Ja |
| TaskCompleted | Task-Abschluss | Ja |
| PreCompact | Vor Komprimierung | Nein |
| SessionEnd | Session-Ende | Nein |

## Hook-Typen

- **command**: Shell-Skript (stdin=JSON → stdout=Entscheidung, exit 2=Block)
- **http**: HTTP POST → Response-Body als Entscheidung
- **prompt**: LLM-Aufruf für ja/nein Entscheidungen
- **agent**: Sub-Agent mit Tools für komplexe Checks

## Anwendungsfälle für WANDA

1. **PreToolUse[exec]** → Gefährliche Commands blockieren
2. **PreToolUse[write]** → Config-Integrity-Check vor jedem Config-Write
3. **UserPromptSubmit** → Routing-Keywords erkennen → Agenten-Weiterleitung
4. **Stop** → Sicherstellen dass Heartbeat-Crons vollständig abschließen
5. **PostToolUse[message]** → Spam-Guard: >1 Nachricht/Turn loggen
6. **SessionStart** → Feedback-Log prüfen + Self-Improvement auslösen
7. **TaskCompleted** → Validieren ob Task wirklich done ist (Tests grün?)

## Konfiguration

In `.claude/settings.json` oder in Skill/Agent Frontmatter:
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{ "type": "command", "command": "./hooks/safety-check.sh" }]
    }]
  }
}
```
