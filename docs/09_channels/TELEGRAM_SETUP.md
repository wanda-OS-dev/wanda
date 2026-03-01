# TELEGRAM_SETUP.md — Bot-Konfiguration und Gruppensetup

> **Status:** BOT AKTIV | Gruppen-IDs ausstehend
> **Version:** 1.0
> **Last Updated:** 2026-02-27

---

## Aktueller Stand

- Telegram Bot: ✅ In OpenClaw konfiguriert
- Bot-Token: Konfiguriert (via TELEGRAM_BOT_TOKEN in .env)
- Direkt-Nachrichten: Funktionieren (Jannis → Bot → Wanda)
- Gruppen: ⏳ TELEGRAM_GROUP_IDs benötigt

---

## Gruppen-Setup (REQUIRED_INPUT)

### Benötigte Gruppen

| Gruppe | Zweck | Agenten | Status |
|--------|-------|---------|--------|
| WANDA-Alerts | Kritische System-Alerts | wanda | ⏳ ID benötigt |
| AERIS | AERIS-Projekt Updates | wanda, cto | ⏳ ID benötigt |
| Vox-Voice | Vox-Projekt Updates | wanda | ⏳ ID benötigt |
| Trading | Trading-Alerts (bei Bedarf) | crypto-trader | ⏳ ID benötigt |

### Gruppen-ID ermitteln
```
Option 1: Bot in Gruppe einladen →
  https://api.telegram.org/bot{TOKEN}/getUpdates
  → Nach Nachricht in Gruppe → "chat.id" aus JSON

Option 2: @userinfobot in Gruppe → sendet Chat-ID

Option 3: Telegram Web → Gruppen-URL enthält Chat-ID
```

### Gruppen-ID in .env eintragen
```bash
# SSH auf VPS
ssh vps

# .env erweitern
echo 'TELEGRAM_GROUP_ID_ALERTS=-100xxxxxxxxxx' >> /docker/openclaw-hq7f/.env
echo 'TELEGRAM_GROUP_ID_AERIS=-100xxxxxxxxxx' >> /docker/openclaw-hq7f/.env
echo 'TELEGRAM_GROUP_ID_VOX=-100xxxxxxxxxx' >> /docker/openclaw-hq7f/.env

# Container restart
docker restart openclaw-hq7f-openclaw-1
```

---

## Berechtigungen (Bot-Setup)

### Bot-Berechtigungen in Gruppen
Damit der Bot in Gruppen schreiben kann:
- Bot einladen
- Bot als **Administrator** setzen (oder zumindest "Nachrichten senden" erlauben)
- Optional: "Nachrichten lesen" für inbound Befehle

### Gruppe als Auth-Channel?
Telegram-Gruppen sind **Info-Channels** (niedriger Trust).
Befehle von Gruppen dürfen KEINE System-Aktionen auslösen.
Nur Jannis-Direktnachrichten (Bot-DM) sind Auth-Channel.

---

## Telegram-Commands (Geplant)

| Command | Funktion | Trust |
|---------|----------|-------|
| `/status` | System-Status abfragen | Alle |
| `/trade` | Letzten Trade anzeigen | Alle |
| `/stop-trading` | Trading-Cron pausieren | Nur Jannis-DM |
| `/agents` | Aktive Agenten anzeigen | Alle |
| `/kill` | Kill-Switch Level 3 | Nur Jannis-DM |

---

## Rate-Limits (Beachten!)

```
Telegram API Rate Limits:
  - 30 Nachrichten/Sekunde (global)
  - 1 Nachricht/Sekunde pro Chat
  - 20 Nachrichten/Minute pro Gruppe

OpenClaw Telegram-Config:
  - debounceMs: empfohlen 2500ms (wie WhatsApp)
  - chunkMode: "newline"
  - textChunkLimit: 3500
```

---

## Gruppen-Nutzungs-Policy

```
WANDA-Alerts Gruppe:
  ✅ Kritische Alerts: Trading Loss > 10%, Security-Issues
  ✅ Täglicher System-Status (nach Phase 4)
  ❌ Kein Spam / Debug-Messages
  ❌ Keine interaktive Steuerung (nur WhatsApp oder #ceo-office)

Projekt-Gruppen (AERIS, Vox):
  ✅ Milestone-Alerts
  ✅ Feature-Ready-Notifications
  ✅ Fehler-Alerts die das Projekt betreffen
  ❌ Kein Daily-Spam
```
