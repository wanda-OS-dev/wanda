# AGENT2 Corefiles Review

## Files reviewed

### `/data/.openclaw/workspace/projects/wanda-framework/docs/10_core-files/`
- AGENTS.md
- BOOT.md
- BOOTSTRAP.md
- HEARTBEAT.md
- IDENTITY.md
- SOUL.md
- TOOLS.md
- USER.md

### `/data/.openclaw/workspace/projects/wanda-framework/docs/11_Prompts_Important/`
- Features.md
- Features-Prompt_01.md
- Features-Prompt_02.md
- 🏁 Wanda Initalisation Prompt .md

### `/data/.openclaw/workspace/projects/wanda-framework/docs/06_ops/`
- OAUTH_BOT_OPERATIONS.md
- OPENCLAW_MONTHLY_AUDIT.md
- PAIRING_WALKTHROUGH.md

### `/data/.openclaw/workspace/projects/wanda-framework/docs/09_channels/`
- CHANNEL_ARCHITECTURE.md
- DISCORD_CHANNEL_MAP.md
- DISCORD_ROUTING_FIX.md
- TELEGRAM_SETUP.md

### Additional required files
- `/data/.openclaw/workspace/projects/wanda-framework/workspace/core/TACIT_KNOWLEDGE.md`
- `/data/.openclaw/workspace/projects/wanda-framework/agents/templates/agent-default/SOUL.md`

---

## 1) Core file templates review

Target required set (9):
`SOUL.md, IDENTITY.md, AGENTS.md, TOOLS.md, MEMORY.md, HEARTBEAT.md, DAILY_NOTES.md, USER.md, BOOTSTRAP.md`

### Completeness check
- Present in `10_core-files`: **SOUL, IDENTITY, AGENTS, TOOLS, HEARTBEAT, USER, BOOTSTRAP**
- Missing in `10_core-files`: **MEMORY.md, DAILY_NOTES.md**
- Extra (non-required in the 9-file list): **BOOT.md**

### Quality by file
- **SOUL.md**: Strong generic base persona/ethics style. Public-ready with minimal edits.
- **IDENTITY.md**: Good starter template; generic and reusable.
- **AGENTS.md**: Most complete file; includes session boot order, memory model, safety, group-chat behavior, heartbeat policy. Useful but mixes guidance scopes (platform behavior + memory + social etiquette) and is long for bootstrap.
- **TOOLS.md**: Good generic local-notes placeholder; public-ready.
- **HEARTBEAT.md**: Intentionally minimal; good default.
- **USER.md**: Good generic profile scaffold; public-ready.
- **BOOTSTRAP.md**: Good first-run ritual; includes channel onboarding prompts.
- **BOOT.md**: Useful for startup task hooks but overlaps conceptually with BOOTSTRAP/HEARTBEAT. Needs positioning.
- **TACIT_KNOWLEDGE.md** (extra file reviewed): currently skeletal; not yet operational as a real bi-temporal knowledge base.
- **agents/templates/agent-default/SOUL.md**: placeholder-only; insufficient as template for production/public framework.

### Generic vs Jannis-specific

#### Generic (good for public framework)
- Most files in `10_core-files` are generic by design.
- Security and behavior principles in AGENTS/SOUL are reusable.

#### Jannis-specific (should be templatized)
Mainly in prompt/channel docs (not in core templates themselves):
- Personal names and identity: `Jannis`, `WandaSystems`, specific project names (`AERIS`, `Vox`).
- Specific paths: `/home/jannis/...`.
- Specific Discord guild/channel IDs and naming.
- Specific voice defaults (Seraphina, ElevenLabs IDs in broader docs).
- Personal business targets (e.g., revenue goals).

Replace with tokens in framework docs:
- `{{owner_name}}`, `{{assistant_name}}`, `{{workspace_root}}`, `{{project_names}}`, `{{discord_guild_id}}`, `{{channel_ids}}`, `{{voice_default}}`, `{{revenue_targets}}`.

### Cleanup needed for public framework
1. Add missing canonical templates: `MEMORY.md`, `DAILY_NOTES.md`.
2. Define **BOOTSTRAP vs BOOT** clearly:
   - BOOTSTRAP = first-run identity ritual
   - BOOT = recurring startup checklist/hook
3. Expand default `agent-default/SOUL.md` from placeholder to real scaffold.
4. Split AGENTS.md into:
   - minimal required behavior contract
   - optional advanced social/heartbeat playbook
5. Standardize memory file naming (some docs say `memory/YYYY-MM-DD.md`, others `memory/daily/YYYY-MM-DD.md`).

---

## 2) Initialisation prompt analysis

Source analyzed: `🏁 Wanda Initalisation Prompt .md` (+ supporting feature prompts).

### What the init prompt currently does
- Forces a **cleanroom architecture process** before coding.
- Requires research artifacts first (patterns, threat model, ADR).
- Defines strong security constraints (pairing, secret handles, no exposed ports, sandboxing, allowlists).
- Prescribes modular monorepo architecture and phased delivery (Level 0→10).
- Encourages OpenClaw/Agent-Zero inspired patterns without code reuse.

### What `wanda init` should generate (recommended)

#### A) Base workspace + docs
- Root docs and policy set:
  - `SOUL.md`, `IDENTITY.md`, `AGENTS.md`, `TOOLS.md`, `MEMORY.md`, `HEARTBEAT.md`, `DAILY_NOTES.md`, `USER.md`, `BOOTSTRAP.md`
- Optional but useful: `BOOT.md`, `TACIT_KNOWLEDGE.md`, `PROJECTS.md`, `STANDARDS.md`
- Research/architecture skeleton:
  - `docs/01_research/UPSTREAM_PATTERNS.md`
  - `docs/02_architecture/THREAT_MODEL.md`
  - `docs/03_decisions/ADR-0001.md`

#### B) Config scaffolding
- `openclaw.json` + `.env.example` with placeholders only.
- Secret-handle pattern docs (`secret://...`) and no plaintext-key policy.
- Channel stubs (disabled until credentials supplied).

#### C) Safe onboarding flow
- First-run Q&A to collect:
  - owner identity, assistant identity, timezone, preferred channels, voice profile
- Auto-templatize all owner-specific values.

#### D) Validation gates
- Preflight checks: required files exist, schema valid, no hardcoded personal IDs/keys.
- Conflict check: agent-count consistency and voice/config consistency.

---

## 3) Channel setup review (documented channels + OAuth/auth flows)

### Channels documented
- **WhatsApp** (architecture-level mentions, alert path)
- **Discord** (detailed map/routing docs)
- **Telegram** (detailed setup/group flow)

### Auth/OAuth flow per channel (as documented)
- **Telegram**: Bot token-based setup (BotFather model implied), group IDs via `getUpdates`; no user OAuth documented.
- **Discord**: Bot token + guild/channel allowlist/bindings; no user OAuth flow documented.
- **WhatsApp**: Referenced as critical channel, but concrete OAuth/pairing runbook not present in reviewed channel docs.

### Provider OAuth (non-channel but documented in ops)
- `wanda auth login <gemini|openai|anthropic|github|kimi>` with browser-based OAuth fallback/manual URL flow.
- Good runtime notes exist, but channel-auth and provider-auth are split across docs and not unified.

### Gaps
1. No end-to-end WhatsApp setup runbook in reviewed set.
2. No unified matrix: `channel -> auth method -> token storage -> rotation -> revoke`.
3. No explicit token lifecycle/rotation SOP per channel.

---

## 4) Ops runbook review

### Operational patterns documented
- OAuth operations commands + debug/security rules.
- Monthly security snapshot + cron schedule + retention job.
- Pairing validation flow (test + manual Telegram check prerequisites).
- Channel routing diagnosis/fix pattern (Discord).

### What is missing
1. **Unified runbook index**: startup, restart, deploy, rollback, incident response in one place.
2. **Disaster recovery**: backup/restore for DB, configs, memory files.
3. **Secret rotation procedure** across all providers/channels.
4. **SLO/monitoring definitions** (availability, latency, alert thresholds).
5. **Post-incident template** (RCA, corrective/preventive actions).
6. **Operational ownership matrix** (who owns each service/channel).
7. **Environment parity notes** (local vs VPS vs container specifics).

---

## 5) Conflicts / contradictions found

## Critical
1. **Agent count conflicts (must be corrected to 22 everywhere)**
   - `Features-Prompt_01.md`: “ALLE 20 Agenten”
   - Same file also defines “Agent 23: GitHub Security Master”
   - Other project context references 21 sub-agents
   - Required correction baseline: **22 total**

2. **Required file set mismatch across docs**
   - This review’s required 9-file contract uses `BOOTSTRAP.md`
   - Other prompt sections require `BOOT.md` and also add `TACIT_KNOWLEDGE.md`
   - Need one canonical contract with optional extensions clearly marked.

## High
3. **Discord routing status conflict**
   - `CHANNEL_ARCHITECTURE.md`: “Discord Routing Bug = OFFEN”
   - `DISCORD_ROUTING_FIX.md`: status “RESOLVED ✅”
   - `DISCORD_CHANNEL_MAP.md`: “ACTIVE ✅”
   - Must synchronize status and remove stale “open issue” text.

4. **Discord channel key guidance inconsistency**
   - Fix doc states OpenClaw regression requiring channel-name keys in allowlist map.
   - Other sections still present ID-based examples without clear “old vs new” separation.

## Medium
5. **Primary channel wording ambiguity**
   - In prompts: Discord described as primary voice/work channel, then Telegram also labeled primary operative control.
   - Needs explicit hierarchy (e.g., Control = X, Team Ops = Y, Alerts = Z).

6. **Memory path inconsistency**
   - `memory/YYYY-MM-DD.md` vs `memory/daily/YYYY-MM-DD.md` in different docs.
   - Must choose one canonical pattern and provide migration note.

---

## Public-framework templatization checklist
- Replace all personal names/brands with tokens (`{{owner_name}}`, `{{brand_name}}`).
- Replace project-specific paths with `{{workspace_root}}`.
- Replace real channel/guild IDs with placeholders.
- Replace voice/persona specifics with `{{voice_default}}`, `{{voice_alt}}`.
- Replace business goals with configurable profile values.
- Add `init` generator that writes concrete values into templates while keeping source templates generic.
