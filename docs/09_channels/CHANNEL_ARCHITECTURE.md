# CHANNEL_ARCHITECTURE.md — Discord + Telegram Routing-Architektur

> **Status:** ACTIVE
> **Version:** 1.0
> **Last Updated:** 2026-02-27
> **Owner:** wanda

---

## Übersicht

WANDA kommuniziert über 3 primäre externe Kanäle:
1. **WhatsApp** — Jannis Direktkanal (kritische Alerts)
2. **Discord** — Team-Kommunikation (strukturiert nach Themen)
3. **Telegram** — Mobile-Steuerung + Projekt-Gruppen

---

## Routing-Prinzipien

```
Grundregel: Channel-Auswahl nach Trust-Level und Dringlichkeit

KRITISCH + SOFORT → WhatsApp (Jannis direkt)
WICHTIG + HEUTE → Discord #ceo-office
THEMA-SPEZIFISCH → Discord Themen-Channel
PROJEKT → Telegram Projekt-Gruppe
BROADCAST → Discord #executive
```

---

## Discord Channel-Map

| Channel | Zweck | Agent-Router | Trust-Level |
|---------|-------|-------------|-------------|
| `#ceo-office` | Jannis Direktkanal | wanda | HOCH |
| `#executive` | Konferenzraum / C-Suite | wanda, cto, coo, cfo, cmo | MITTEL |
| `#crypto-trading` | Trading-Desk | crypto-trader, accountant | MITTEL |
| `#social` | News-Zentrale | cmo, copywriter, sdr | NIEDRIG |
| `#dev-ops` | Die Werkstatt | cto, builder | MITTEL |
| `#sales-marketing` | Das Marketing-Büro | cmo, copywriter, scout, sdr | NIEDRIG |
| `#operations` | Das Tagesgeschäft | customer-success, coo | NIEDRIG |
| `Wanda-Talk (Voice)` | Sprach Agent (Gemini Flash) | wanda-voice | MITTEL |

→ Detail: docs/09_channels/DISCORD_CHANNEL_MAP.md

---

## Telegram Architecture

| Kanal | Zweck | Agent |
|-------|-------|-------|
| Bot (Direkt) | Jannis-Steuerung | wanda |
| Projekt-Gruppe 1 | Projekt X Updates | wanda |
| Projekt-Gruppe 2 | Projekt Y Updates | wanda |
| Alert-Gruppe | Kritische Alerts | wanda |

→ Detail: docs/09_channels/TELEGRAM_SETUP.md

---

## Message-Flow (Inbound)

```
Jannis schreibt → Channel/Bot
  ↓
OpenClaw empfängt Message
  ↓
Routing-Entscheid:
  - Welcher Channel? → Agent-Zuordnung
  - Welcher Agent? → Session starten
  ↓
Agent verarbeitet
  ↓
Response zurück in Channel
```

## Message-Flow (Outbound / Alert)

```
Event im System (Cron, Error, Trade, etc.)
  ↓
Agent triggert Aktion
  ↓
Routing-Entscheid (Agent wählt):
  KRITISCH → SK-032 (WhatsApp via Wanda)
  WICHTIG → SK-030 (Discord #ceo-office oder #executive)
  ROUTINE → SK-031 (Telegram Gruppe)
  NICHTS → NO_REPLY (keine unnötigen Nachrichten!)
```

---

## Bekannte Issues

### Discord Routing Bug
**Status:** ⚠️ OFFEN
**Problem:** Nur #ceo-office antwortet auf Nachrichten. Andere Channels bekommen keine Antwort.
**Analyse:** Fehlendes Channel-zu-Agent-Mapping in OpenClaw-Konfiguration.
**Fix-Plan:** docs/09_channels/DISCORD_ROUTING_FIX.md
**REQUIRED_INPUT:** DISCORD_CHANNEL_IDs für alle 5 weiteren Channels

---

## REQUIRED_INPUT für vollständige Aktivierung

```yaml
Discord:
  DISCORD_SERVER_ID: "Deine Server ID"
  DISCORD_CHANNEL_ID_CEO_OFFICE: "Channel ID für #ceo-office"
  DISCORD_CHANNEL_ID_EXECUTIVE: "Channel ID für #executive"
  DISCORD_CHANNEL_ID_CRYPTO: "Channel ID für #crypto-trading"
  DISCORD_CHANNEL_ID_SOCIAL: "Channel ID für #social"
  DISCORD_CHANNEL_ID_DEVOPS: "Channel ID für #dev-ops"
  DISCORD_CHANNEL_ID_SALES: "Channel ID für #sales-marketing"
  DISCORD_CHANNEL_ID_OPS: "Channel ID für #operations"
  DISCORD_CHANNEL_ID_VOICE: "Channel ID für Voice"

Telegram:
  TELEGRAM_BOT_TOKEN: "Bereits konfiguriert"
  TELEGRAM_GROUP_IDS:
    - project_aeris: "GROUP_ID"
    - project_wanda: "GROUP_ID"
    - alerts: "GROUP_ID"
```
