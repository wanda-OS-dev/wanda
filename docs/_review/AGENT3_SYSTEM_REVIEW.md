# AGENT3_SYSTEM_REVIEW

## Scope reviewed
- All Markdown files in:
  - `docs/06_gen2_build_logs/`
  - `docs/07_system/`
  - `docs/08_skills/`
- Source files:
  - `src/types/index.ts`
  - `src/memory/knowledge-graph.ts`
  - `src/agents/archetypes.ts`

---

## 1) Memory Gen-2 architecture

### What is in the build logs
The Gen-2 build logs describe a **full platform architecture**, not only memory:
- 7 execution phases from foundation to channels/voice UI
- `AgentBus` + Swarm/ReAct loop
- WANDA Hub as MCP host (`/mcp/memory/sse`, `/mcp/workspace/sse`)
- Multi-channel adapters (CLI, Telegram, WebChat)
- Voice stream design (WebRTC + streaming TTS)
- Observability (TTFT, TPS, cost telemetry)

### Full Memory Gen-2 design (documented target)
The documented memory is a **4-tier Unified Core Memory (UCM)**:
1. **Tier 1: Ephemeral RAM**
   - Session FIFO + working scratchpad
   - Context pruning/summarization near token limits
   - Heartbeat/inner-monologue behavior before reply
2. **Tier 2: Graph Brain (SQLite)**
   - Entity-relation graph storage
   - GraphRAG traversal for precise retrieval
   - Importance/access decay + duplicate merge via Janitor
3. **Tier 3: Markdown Journals**
   - Transparent, user-editable `.md` memory core
   - Profiles, rules, architecture, identity knowledge
4. **Tier 4: Vector Archive (Supabase + pgvector)**
   - Long-term semantic retrieval
   - Multimodal metadata and cross-session/cross-device recall

### Operational memory behaviors in docs
- Autonomous memory updates (`store_memory`, `link_entity` style tools)
- Janitor cron for decay/consolidation/migration
- MCP exposure of memory tools (`store_fact`, `query_memory`, `update_journal`, `search_archive`)
- Strong emphasis on token efficiency + human transparency

### Key observation
Docs define a **complete hybrid memory platform** (graph + markdown + vector + lifecycle automation). Current source implementation only covers a thin subset (see section 4).

---

## 2) Skills system (agent-creator, self-skilling, skill-creator) + pre-installed vs optional

### Skill specs found

#### `agent-creator` (SK-002)
- Purpose: create new agent end-to-end
- Includes:
  - `openclaw.json` entry
  - agent workspace anatomy (8+1 files)
  - `agents/{id}/agent/SOUL.md`
  - lifecycle: need → spec → approval → implementation → validation → activation
- Uses least-privilege tooling and model-routing guidance

#### `self-skilling` (SK-003)
- Purpose: detect recurring manual work and generate skill proposals
- Triggers:
  - repeated manual task (>3x)
  - repeated error
  - multi-step inefficiency
  - delegation gap
- Flow:
  - weekly notes scan
  - draft skill spec
  - approval brief to Jannis
  - builder implements + reviewer validates
- Guardrails prohibit autonomous unsafe side effects

#### `skill-creator` (SK-001)
- Purpose: define and register reusable skills
- Requires strict schema (ID/owner/trigger/input/output/errors/idempotency)
- Skill lifecycle: detect → spec → approve → implement → validate → activate
- Includes category ranges and anti-patterns

### Self-bootstrapping assessment
Current docs already describe discovery + proposal + implementation flow. To be fully self-bootstrapping in practice, it should be explicitly codified as:
- auto-discovery + auto-drafting + queued approval + one-command activation
- automatic registry update + per-agent `TOOLS.md` sync
- usage telemetry feedback loop (promotion/deprecation)

### Pre-installed vs optional (skills)
**Pre-installed (core baseline):**
- SK-001 `skill-creator`
- SK-002 `agent-creator`
- SK-003 `self-skilling`
- SK-010 `agent-anatomy-setup`
- SK-032 `whatsapp-alert`
- SK-051 `ripgrep-search`
- SK-052 `web-research`

**Optional modules (domain-dependent):**
- Trading: SK-020, SK-021
- Social/publishing: SK-040, SK-041
- Advanced ops extensions: SK-050, SK-053, SK-054, SK-055

Rationale: WANDA is modular; not every deployment needs trading/social/advanced automations.

---

## 3) System registries: content and completeness

### `SKILLS_INDEX.md`
Contains:
- Concept and discovery flow
- Core/ops/trading/communication/content/new skills
- Status matrix
- Pro-agent skill-library model

Completeness quality:
- Strong conceptual coverage
- Gaps/inconsistencies:
  - status table references skills not fully specified in-file (e.g. SK-055 not fully defined)
  - lacks explicit “core default vs optional module” tags
  - trading appears as regular index section although should be optional module set

### `INTEGRATIONS_INDEX.md`
Contains:
- Communication, trading, social, monetization, research, infrastructure integrations
- Credentials, owners, statuses, required input checklist
- Detail profiles for major services

Completeness quality:
- Broad coverage, useful required-input checklist
- Inconsistencies:
  - heading states one total count, table enumerates a higher total
  - numbering and section sequence are inconsistent
  - some listed integrations are minimally profiled vs others deeply profiled

### `SERVICES_INDEX.md`
Contains:
- Core services (OpenClaw, n8n)
- cron agents
- bot services
- planned services
- health matrix + dependencies

Completeness quality:
- Good operations focus
- Missing alignment with Gen-2 architecture services in build logs (Hub MCP host internals, memory service decomposition, swarm components as first-class services)
- Should include explicit module enablement matrix (core vs optional packs)

### Registry completeness verdict
Registries are useful but **not yet canonical/consistent**. They need count normalization, module labels (core/optional), and tighter sync with architecture and source-of-truth runtime config.

---

## 4) Current `src/` code vs docs

### `src/memory/knowledge-graph.ts`
What exists:
- SQLite-backed fact table
- add/search/recent/deprecate methods
- valid-from / valid-to / status fields

What docs expect but code does not yet implement:
- entity/relation graph schema (`entities`, `relations` with weighted traversal semantics)
- graph traversal API (`getRelatedSubGraph`, depth/importance-based retrieval)
- access-pattern decay and scheduled janitor lifecycle
- Tier-3 markdown memory integration
- Tier-4 vector archive integration (Supabase/pgvector)
- MCP tool bridge from memory package

### `src/types/index.ts`
What exists:
- basic config/message/fact/log/cron types

What docs expect but code lacks:
- richer model routing shapes (primary + fallbacks object model)
- universal message/channel schemas
- skill registry types and lifecycle states
- integration/service registry types
- trust-boundary/action classification types
- memory tier abstractions

### `src/agents/archetypes.ts`
What exists:
- only 6 archetypes (`commander`, `architect`, `craftsman`, `analyst`, `storyteller`, `hunter`)
- small trait/escalation mapping

What docs expect:
- archetype coverage for full documented role universe
- modular archetype catalog matching canonical framework design
- correction to canonical archetype count (should be 22)

### Code-vs-docs conclusion
Current TypeScript is an early skeleton relative to docs. The biggest delta is memory-system depth and archetype coverage/modeling.

---

## 5) Agent archetypes coverage vs documented agent types

### Documented runtime agent list (from provided system docs)
1. `wanda`
2. `cto`
3. `coo`
4. `cfo`
5. `cmo`
6. `cso`
7. `builder`
8. `scout`
9. `reviewer`
10. `accountant`
11. `copywriter`
12. `sdr`
13. `closer`
14. `customer-success`
15. `partner`
16. `frontend-ux-king`
17. `n8n-architect`
18. `update-strategist`
19. `crypto-trader`
20. `github-master`
21. `wanda-voice`

### Coverage result
- `archetypes.ts` does **not** cover all documented types.
- It provides a small generic set (6), not mapped to the documented roster.
- It also carries an outdated canonical-count note; canonical should be **22**.

### Required archetype-model fix
- Introduce a canonical archetype registry of 22 archetypes (catalog-level, modular)
- Map runtime agents to archetypes (1:N)
- Mark archetypes/agents as `core` vs `optional-module`

---

## 6) Pre-installed vs optional agents (modular WANDA)

### Principle
WANDA must be modular: baseline install ships core orchestration/business/engineering roles; optional packs add domain-specialized roles.

### Recommended pre-installed (core baseline)
- `wanda`
- `cto`, `coo`, `cfo`, `cmo`, `cso`
- `builder`, `scout`, `reviewer`, `accountant`, `copywriter`, `sdr`, `closer`, `customer-success`, `partner`
- `frontend-ux-king`, `n8n-architect`
- `update-strategist`, `github-master`

### Optional modules
- **Trading/Crypto add-on:** `crypto-trader` (and any future trading-specific peers)
- **Voice interface add-on:** `wanda-voice` (deploy only when voice channel is required)

### Canonical-count alignment
- Framework canonical archetype catalog: **22** (modular catalog)
- Default install should include only core subset
- Optional modules extend per deployment needs (especially trading)

---

## Priority remediation checklist
1. Normalize all registries to one canonical count/source of truth and add `core|optional` labels.
2. Expand `archetypes.ts` to a full modular archetype catalog (22) with runtime mappings.
3. Upgrade memory implementation from fact-table to full Gen-2 multi-tier architecture interfaces.
4. Implement self-bootstrapping skill pipeline end-to-end (discover → draft → approve → install → index sync).
5. Keep trading/crypto strictly optional in docs, registries, and default templates.
