# WANDA Architecture Review (AGENT1)

## 1. Key Design Decisions found in the Docs

Based on the architectural decision records (ADRs) and architecture specs:

- **ADR-0001:**
  - **Cleanroom Implementation:** No code reuse from Agent-Zero or OpenClaw, written from scratch.
  - **Channel Adapter Pattern:** Messaging channels (Telegram, Discord) implement a decoupled `ChannelAdapter` interface.
  - **Secret Handle System:** LLM only sees `secret://<id>`, decrypted just-in-time at tool execution.
  - **Pairing-First Identity:** No response to unknown users; OTP required for pairing.
  - **Docker Sandbox by Default:** Tool execution runs in hardened non-root containers.
  - **Lifecycle Hooks:** Explicit, typed async hooks (`before_llm`, `before_tool_exec`, etc.).
  - **Tool Registry:** Zod schemas required for all tools.
  - **MCP-Only Integrations:** No arbitrary script execution, integrations must run as MCP servers.
  - **Monorepo:** pnpm workspaces (`packages/core`, `packages/channels`, `apps/wanda-bot`).
  - **No Exposed Ports:** Outbound polling only.
- **ADR-0002:**
  - **Workspace via MCP:** Directory navigation is handled via `mcp_workspace_read/write`.
  - **Modular Packages:** Categorization of 68 features into `packages/channels`, `packages/voice`, etc.
  - **MCC Integration:** WebChat UI and Master Control Center for monitoring.
- **ADR-0003:**
  - **Agent Persona Framework:** Agents inspired by real legends (e.g., Bezos for Wanda, Torvalds for CTO). Uses a structured hierarchy (C-Level -> Specialists).

## 2. What's Outdated/Wrong vs Current Reality

- **Wrong Agent Count:**
  - `VISION.md` incorrectly references "23 archetypes" (Line 18).
  - `ADR-0003` incorrectly references "21 Agents" and lists a "20 Agent" diagram (Lines 7, 366).
  - **Correct Count:** Must be **22** agents as specified by the updated framework structure.
- **Old Paths & Feature Names (Not Standalone):**
  - Docs contain heavy references to Jannis's personal local setup: `/home/jannis/Schreibtisch/Work-OS/` and `/home/jannis/Schreibtisch/Work-OS/40_Products/Wanda-Repo/` (e.g., `GITHUB_WORKSPACE_PROCEDURE.md` Lines 11, 51; `Features.md` Lines 3, 5).
  - References to personal internal dashboards like `Wanda-MCC` and specific repositories instead of a generalized open-source standard. Focus must be standalone.
- **Crypto Trading Agent References (Public-Facing Rules Violation):**
  - Public-facing docs must have NO crypto trading agent references.
  - Yet, `ADR-0003` (Lines 265-283) details the "Crypto Trader" agent, Kraken API keys, and trading rules.
  - `HOOKS_RESEARCH.md` (Lines 56-67) compares Binance, Kraken, and OKX.
  - `VISION.md` (Line 51) and `OPENCLAW_ARCHITECTURE.md` mention crypto trading/Cron jobs.

## 3. What's Missing from Framework Files (README/ARCHITECTURE/VISION)

- **Monorepo Structure Missing:** `README.md` lists a flat folder architecture (`core/`, `agents/`, `skills/`, `channels/`, `tools/`), completely missing the pnpm monorepo structure outlined in `ADR-0001` (`packages/`, `apps/`).
- **Required File Differences:** `ARCHITECTURE.md` lists 9 required files for the Agent Anatomy (SOUL, IDENTITY, AGENTS, TOOLS, MEMORY, HEARTBEAT, DAILY_NOTES, USER, BOOTSTRAP), but `Features.md` and `GITHUB_WORKSPACE_PROCEDURE.md` also define `BOOT.md` and `settings.json` which aren't reflected in `ARCHITECTURE.md`.
- **Workspace Differences:** `ARCHITECTURE.md` briefly mentions a Two-Sphere Workspace Model, but does not specify the rigid internal folder layout (like `business/`, `personal/`) detailed in `GITHUB_WORKSPACE_PROCEDURE.md`.

## 4. OAuth Architecture

- **Automatic Flow via Claude Code (Research Docs):** `Claude-Authentification.md` and `Codex-Authentification.md` state that the system automatically handles OAuth 2.0 flows for SSE and HTTP servers without additional configuration. Tokens are stored securely and auto-refreshed.
- **Multi-Provider Routing (Architecture):** `OPENCLAW_ARCHITECTURE.md` specifies `auth.profiles` in `openclaw.json` supporting two modes:
  - `oauth`: Google Antigravity, Gemini CLI, OpenAI Codex.
  - `token`: Anthropic (Direct API Key), GitHub Copilot.

## 5. WANDA Workspace Structure

According to `Features.md` and `GITHUB_WORKSPACE_PROCEDURE.md`, the exact defined directory tree is:

```text
/home/jannis/Schreibtisch/Work-OS/
├── business/               # Strategic Second Brain (AERIS, Strategies, Ops)
│   ├── strategy/
│   ├── Wanda/              # (or Projekt XYZ)
│   ├── coding/
│   ├── copywriting/
│   ├── metrics/
│   └── journal/
├── personal/               # Private goals and lifestyle
│   ├── biology/
│   ├── finances/
│   └── journal/
├── memory/                 # Agent raw data logs (DD-MM-YYYY.md)
├── AGENTS.md               # Active Sub-Agent Configuration
├── BOOT.md                 # Startup Checks
├── HEARTBEAT.md            # System Logs
├── IDENTITY.md             # Core AI Persona
├── MEMORY.md               # Long-term knowledge index
├── TOOLS.md                # CLI Tools / API Integrations list
├── USER.md                 # Jannis Context
└── settings.json           # Zentrale Konfigurationsdatei für alles an Wanda
```
*(Note: As per findings above, the root `/home/jannis/...` pathing should be abstracted for the standalone framework.)*