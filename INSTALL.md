# WANDA — Installation

## Option 1: AI Installer (Recommended)

Copy this into any AI assistant (Claude, ChatGPT, Gemini):

```
Follow the instructions at https://raw.githubusercontent.com/wanda-OS-dev/wanda/main/INSTALL.md to install WANDA on my machine.
```

## Option 2: One-Line CLI Install

```bash
curl -fsSL https://raw.githubusercontent.com/wanda-OS-dev/wanda/main/scripts/install.sh | bash
```

## Option 3: Manual Install

```bash
git clone https://github.com/wanda-OS-dev/wanda.git
cd wanda
npm install
npx wanda init
```

---

## What gets installed

```
~/.wanda/
├── wanda.json          # Your config (models, channels, agents)
├── workspace/          # Shared agent workspace
│   ├── PARA/           # Long-term knowledge (Projects/Areas/Resources/Archives)
│   ├── core/           # Tacit knowledge + knowledge graph
│   ├── memory/         # Daily session logs
│   ├── reports/        # Agent-generated reports
│   └── inbox/          # Async agent-to-agent messages
├── workspace-{agent}/  # Per-agent private workspace (9 core files)
└── agents/             # Session state (auto-managed)
```

## First Run

```bash
wanda start
# Opens setup wizard:
# 1. Choose your first agent archetype
# 2. Connect a channel (WhatsApp / Telegram / CLI)
# 3. Choose your AI model (OAuth or API key)
# 4. Done — your agent is live
```

## Requirements

- Node.js 20+
- One of: OpenAI / Anthropic / Gemini account (OAuth or API key)
- Optional: WhatsApp number for mobile chat
