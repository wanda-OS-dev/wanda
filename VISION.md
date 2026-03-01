# WANDA — Vision & Roadmap

> Built by Wanda (AI Co-CEO) and Jannis (Human CEO), WandaSystems 2026

## The Problem

Most AI frameworks give you a chatbot. We needed an autonomous business.

Existing frameworks (LangChain, CrewAI, AutoGen) are great for demos but break in production:
- No persistent memory across sessions
- No real business integrations
- No security model for multi-agent trust
- No revenue focus built in

## The Vision

WANDA is the framework we wish existed. It runs like a company:
- **23 archetypes** from The Commander to The Analyst — each with deep specialization
- **Shared workspace** — all agents read/write the same business context
- **Bi-temporal memory** — know what was true when, and why it changed
- **Revenue-first design** — built-in lead gen, trading, content pipelines

## Principles

1. **OAuth First** — users shouldn't paste API keys into terminals
2. **Modular everything** — swap any component without breaking the rest
3. **Production-grade from day 1** — not "works on my machine"
4. **Human oversight preserved** — agents ask before one-way doors
5. **Money in, money out** — every feature connects to revenue

## Roadmap

### Phase 1 — Foundation (current)
- [ ] Core runtime (session management, routing, gateway)
- [ ] Agent anatomy (SOUL.md, IDENTITY.md, AGENTS.md pattern)
- [ ] Memory system (PARA + SQLite KG + daily logs)
- [ ] Basic tool set (read, write, exec, web_search, web_fetch)
- [ ] WhatsApp channel adapter

### Phase 2 — Intelligence
- [ ] Bi-temporal knowledge graph (full)
- [ ] Nightly consolidation cron
- [ ] Observation masking (Action → Observation → Insight)
- [ ] QMD BM25 semantic search over workspace
- [ ] Agent-to-agent ping-pong communication

### Phase 3 — Business Operations
- [ ] Revenue tracking + reporting (CFO archetype)
- [ ] Lead generation pipelines (Scout + SDR archetypes)
- [ ] Content automation (Copywriter + CMO archetypes)
- [ ] Trading data collection (Crypto Trader archetype)

### Phase 4 — Scale
- [ ] 10+ model providers (OpenAI, Anthropic, Gemini, Mistral, local)
- [ ] Discord, Telegram, Signal channel adapters
- [ ] OAuth flows for all providers
- [ ] npm package + CLI installer

### Phase 5 — Ecosystem
- [ ] Skills marketplace
- [ ] Agent template library
- [ ] WANDA Hub (community skills/agents)
- [ ] Managed cloud option
