<div align="center">

```
██╗    ██╗ █████╗ ███╗   ██╗██████╗  █████╗
██║    ██║██╔══██╗████╗  ██║██╔══██╗██╔══██╗
██║ █╗ ██║███████║██╔██╗ ██║██║  ██║███████║
██║███╗██║██╔══██║██║╚██╗██║██║  ██║██╔══██║
╚███╔███╔╝██║  ██║██║ ╚████║██████╔╝██║  ██║
 ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝
```

**Workspace Aware Neural Distributed Architecture**

*An autonomous AI agent framework for real business operations.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green)](https://nodejs.org/)

</div>

---

## What is WANDA?

WANDA is a **workspace-aware, multi-agent AI framework** designed for autonomous business operations. Inspired by the architecture behind real-world autonomous AI corporations, it gives you a team of AI agents that:

- **Know your workspace** — agents share memory, context, and state
- **Talk to each other** — bidirectional agent-to-agent communication with ping-pong conversations
- **Work while you sleep** — cron-based autonomous operations
- **Learn over time** — bi-temporal memory with knowledge graphs

Start with a single agent. Scale to a 23-agent autonomous corporation.

## Philosophy

- **OAuth First, API Key Second** — every provider supports both
- **Zero vendor lock-in** — 10+ model providers, modular architecture
- **Out of the box intelligence** — pre-loaded knowledge base, skills library, agent archetypes
- **Idiot-proof setup** — one command install, guided onboarding
- **Real business focus** — revenue tracking, lead generation, trading, content pipelines

## Quick Start

```bash
npx wanda-framework init my-agent
cd my-agent
wanda start
```

## Architecture

```
wanda/
├── core/          # Runtime engine (session, routing, memory, hooks, tools)
├── agents/        # Agent definitions and archetypes
├── skills/        # Pre-built skill library
├── hooks/         # Internal hooks (boot, memory, continuity)
├── memory/        # PARA + bi-temporal KG memory system
├── channels/      # WhatsApp, Telegram, Discord, Signal adapters
├── tools/         # Tool implementations
└── docs/          # Documentation
```

## Status

🚧 **Early Development** — Building in public. Inspired by real production usage.

## License

MIT — build what you want, ship what matters.
