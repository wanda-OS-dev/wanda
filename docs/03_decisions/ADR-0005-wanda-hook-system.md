# ADR-0005: WANDA Hook System — Provider-Agnostisches Middleware Layer

**Status:** Accepted  
**Datum:** 2026-03-01  
**Kontext:** WANDA Framework Core Architecture

---

## Problem

Claude Code bietet ein Hook-System das in den Agenten-Loop eingreift. Das ist extrem mächtig — aber proprietär und nur für Claude Code CLI verfügbar. Codex, Gemini, und andere Anbieter haben kein vergleichbares System.

Wenn WANDA mehrere Anbieter unterstützt, braucht es ein eigenes Hook-System das für **alle Modelle gleich funktioniert**.

---

## Entscheidung

WANDA implementiert ein **provider-agnostisches Hook-System** als Middleware-Layer im Execution Loop.

Jeder Hook-Event feuert unabhängig davon welches Modell (Claude, Gemini, Codex, lokal) gerade läuft.

---

## WANDA Hook Events

```
UserMessage → [PrePromptHook] 
            → Model-Call → [PreModelCallHook]
                         → Response mit Tool-Requests
                                → [PreToolHook]  ← blockierbar
                                → Tool-Execution
                                → [PostToolHook]
            → Final Response → [PreResponseHook]
                             → User
            → [StopHook]      ← blockierbar
```

### Vollständige Event-Liste

| Event | Wann | Blockierbar | Anwendungsfall |
|-------|------|-------------|----------------|
| `PrePrompt` | Vor Modell-Verarbeitung | Ja | Routing, Kontext-Injektion, Filtering |
| `PreModelCall` | Vor jedem API-Call | Ja | Rate-Limiting, Cost-Guard, Provider-Switch |
| `PostModelCall` | Nach API-Response | Nein | Token-Logging, Response-Monitoring |
| `PreToolUse` | Vor Tool-Ausführung | Ja | Safety-Check, Validierung, Input-Mutation |
| `PostToolUse` | Nach Tool-Ausführung | Nein | Output-Logging, Feedback-Injektion |
| `PostToolUseFailure` | Nach fehlgeschlagenem Tool | Nein | Error-Handling, Retry-Logic |
| `PreResponse` | Vor Ausgabe an User | Ja | Format-Check, Spam-Guard, Content-Filter |
| `Stop` | Wenn Agent stoppen will | Ja | Completion-Validation, Continuity |
| `SessionStart` | Session-Beginn | Nein | Memory-Load, Context-Injection |
| `SessionEnd` | Session-Ende | Nein | Memory-Snapshot, Cleanup |
| `SubagentStart` | Sub-Agent wird gespawnt | Ja | Spawn-Guard, Resource-Limits |
| `SubagentStop` | Sub-Agent fertig | Ja | Result-Validation |
| `TaskCompleted` | Task als done markiert | Ja | Completion-Criteria-Check |

> **Bonus gegenüber Claude Code:** `PreModelCall` und `PostModelCall` — Eingriff vor jedem API-Call. Claude Code hat das nicht.

---

## Konfiguration

Hooks werden in YAML-Frontmatter von Agents und Skills definiert — identisch zur Claude Code Syntax für niedrige Lernkurve:

```yaml
---
name: my-agent
hooks:
  PreToolUse:
    - matcher: "fs_write|bash"
      hooks:
        - type: command
          command: "./hooks/safety-check.sh"
  PreModelCall:
    - hooks:
        - type: command
          command: "./hooks/cost-guard.sh"
          timeout: 3
---
```

### Hook-Typen (identisch zu Claude Code)

- **command**: Shell-Script (stdin=JSON, stdout=Entscheidung, exit 2=Block)
- **http**: HTTP POST → Response-Body als Entscheidung  
- **prompt**: LLM-Aufruf für ja/nein Entscheidungen
- **agent**: Sub-Agent mit Tools für komplexe Checks

---

## Implementation (TypeScript Core)

```typescript
// src/hooks/HookRunner.ts
interface HookEvent {
  type: WandaHookEvent;
  provider: 'claude' | 'gemini' | 'codex' | 'local';
  agentId: string;
  sessionId: string;
  payload: Record<string, unknown>;
}

type HookDecision = 
  | { action: 'allow' }
  | { action: 'deny'; reason: string }
  | { action: 'modify'; payload: Record<string, unknown> }
  | { action: 'stop'; reason: string };

class HookRunner {
  async run(event: HookEvent): Promise<HookDecision>;
}
```

---

## Warum das ein WANDA-Alleinstellungsmerkmal ist

1. **Provider-agnostisch**: Funktioniert mit Claude, Gemini, Codex, Mistral, lokalen Modellen
2. **PreModelCall**: Vor jedem API-Call eingreifen — Claude Code hat das nicht
3. **Open Source**: Community kann eigene Hook-Types bauen
4. **YAML-kompatibel**: Entwickler die Claude Code kennen, kennen WANDA Hooks sofort
5. **Input-Mutation**: Hooks können Tool-Inputs modifizieren bevor sie ausgeführt werden

---

## Priorität im WANDA-Kontext

```
WANDA Hook > Skill > Script > andere Lösung
```

Wenn ein Hook-Event die Anforderung abdeckt → Hook. Immer.

---

## Nächste Schritte

- [ ] `src/hooks/HookRunner.ts` implementieren
- [ ] `src/hooks/events.ts` — alle Event-Typen als TypeScript Enums
- [ ] `src/hooks/handlers/CommandHandler.ts`
- [ ] `src/hooks/handlers/HttpHandler.ts`
- [ ] Hook-Tests in `tests/hooks/`
- [ ] Dokumentation: `docs/04_developer/hooks-guide.md`

---

_Entschieden: Jannis + Wanda, 2026-03-01_
