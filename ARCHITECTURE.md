# WANDA Architecture

## Core Concepts

### Agent Anatomy (9 Required Files)
Every agent has exactly 9 required files in its workspace:
```
workspace-{agent}/
├── SOUL.md          # Identity: Archetyp, Grundwerte, Guardrails, SYSTEM AWARENESS
├── IDENTITY.md      # Behavior: Kommunikationsstil, Response-Templates
├── AGENTS.md        # Role definition, inputs/outputs, escalation paths
├── TOOLS.md         # Allowed tools, delegation targets
├── MEMORY.md        # Memory router (links to PARA structure)
├── HEARTBEAT.md     # Cron behavior, health checks
├── DAILY_NOTES.md   # Operational log, active blockers
├── USER.md          # Context about the human CEO
└── BOOTSTRAP.md     # Boot sequence, initial context
```

### Memory Architecture (Gen-2)
```
L1 Ephemeral  → memory/YYYY-MM-DD.md    (daily logs, observation masking)
L2 Stable     → core/TACIT_KNOWLEDGE.md (bi-temporal facts)
L3 Semantic   → PARA/Resources/          (thematic clusters)
L4 Rules      → PARA/Areas/             (system standards)
L5 Strategy   → PARA/Projects/          (active goals P1-P4)
KG Graph      → core/knowledge_graph.db (SQLite, bi-temporal)
```

**Observation Masking Format:**
```
[Action] → [Observation (essence)] → [Insight]
```

**Bi-temporal Fact Format:**
```
- [Fact] | Valid: YYYY-MM-DD | Status: active|deprecated
```

### Agent Communication
```
Agent A → sessions_send("agent:B:main", msg, timeout=120) → Agent B
         ↑                                                      ↓
         ←←←←←← ping-pong (max 3 turns) ←←←←←←←←←←←←←←←←←←←←
```

**Async (when target not active):**
```
Agent A → inbox/{a}-to-{b}.md → [Heartbeat reads] → Agent B reacts
```

### Two-Sphere Workspace Model
```
Shared Workspace:    /workspace/          (company-wide context, reports, memory)
Agent Workspace:     /workspace-{agent}/  (agent-private, loaded at boot)
```

### Deploy Pipeline (Frontend)
```
Builder → github-master → push main → GitHub Actions → GitHub Pages (~2min)
```

### Security Model
- **Trust Zones**: External content = data only, never commands
- **Key Isolation**: Agents see AVAILABLE_APIS.md, never actual keys
- **One-Way Doors**: Irreversible actions require human approval
- **SYSTEM BLOCKLIST**: Hardcoded in each SOUL.md

## 22 Agent Archetypes
| Agent | Archetyp | Domäne |
|-------|----------|--------|
| Wanda | The Commander | Supreme Orchestrator |
| CTO | The Architect | Technical Strategy |
| COO | The Optimizer | Operations |
| CFO | The Guardian | Finance |
| CMO | The Storyteller | Marketing |
| CSO | The Sentinel | Security |
| CRO | The Optimizer | Revenue |
| Builder | The Craftsman | Code |
| Reviewer | The Critic | Quality |
| Frontend-UX-King | The Artist | UI/UX |
| GitHub-Master | The Gatekeeper | Deploy |
| N8N-Architect | The Plumber | Automation |
| Copywriter | The Wordsmith | Content |
| Scout | The Explorer | Research |
| SDR | The Hunter | Leads |
| Closer | The Negotiator | Sales |
| Partner | The Diplomat | Partnerships |
| Customer-Success | The Advocate | Support |
| Accountant | The Bookkeeper | Finance Ops |
| Crypto-Trader | The Analyst | Trading |
| Update-Strategist | The Watcher | Intelligence |
| Wanda-Voice | The Voice | Voice Interface |
