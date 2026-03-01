# DISCORD_CHANNEL_MAP.md — Channel-zu-Agent-Mapping

> **Status:** ACTIVE ✅
> **Version:** 1.1
> **Last Updated:** 2026-02-27

---

## Konfigurierter Stand (openclaw.json) — AKTIV

**Routing-Mechanismus:** `bindings`-Array (Top-Level) + `guilds`-Allowlist
**Guild:** LazyTechLab Community (`1444457345731002411`)

---

## Aktives Channel-Mapping

| Discord Channel | Channel-ID | Primär-Agent | Sekundär-Agents | Zweck |
|----------------|-----------|-------------|-----------------|--------|
| #ceo-office | `1476799656091713537` | wanda | - | Jannis Direktkanal |
| #executive | `1476799706729418763` | wanda | cto, coo, cfo, cmo | Konferenzraum / C-Suite |
| #crypto-trading | `1476799760676556880` | crypto-trader | accountant | Trading-Desk |
| #social | `1477492779956310189` | cmo | copywriter, sdr | News-Zentrale |
| #dev-ops | `1476799845212749905` | cto | builder | Die Werkstatt |
| #sales-marketing | `1476800098267562095` | cmo | copywriter, scout, sdr | Das Marketing-Büro |
| #operations | `1476800174117486602` | customer-success | coo | Das Tagesgeschäft |
| Wanda-Talk (Voice) | `1457131009471676489` | wanda-voice | - | Sprach Agent |

---

## Channel-Regeln

### #ceo-office
- Hier bist nur du und Wanda. 
- Das ist dein direkter Kanal, um ihr Befehle zu geben, ohne dass die anderen Agenten dazwischenreden oder den Kontext mitlesen.

### #executive
- Der Konferenzraum. 
- Für hochrangige Meetings zwischen dir, Wanda (CEO), dem CTO, COO, CFO und CMO.

### #crypto-trading
- Das Trading-Desk. 
- Hier arbeitet der Crypto-Trader, und der Accountant (Buchhalter) checkt die Zahlen.

### #social
- Die News-Zentrale. 
- Hier orchestrieren CMO, Copywriter und SDR unsere öffentliche Stimme (X, LinkedIn). 
- Sie posten wichtige Beiträge autonom, halten aber bei wirklich kritischen Posts eine kurze Rückfrage vor der Veröffentlichung (Rücksprache-Pflicht für High-Impact Content).

### #dev-ops
- Die Werkstatt. 
- Hier schickt der CTO seine Architektur-Pläne rein und der Builder postet seine Code-Ergebnisse.

### #sales-marketing
- Das Marketing-Büro. 
- Hier arbeiten CMO, Copywriter, Scout und SDR zusammen an neuen Leads und Texten.

### #operations
- Das Tagesgeschäft. 
- Für Customer Success, COO und Routineaufgaben.

### Wanda-Talk (Voice)
- Sprach Agent (Gemini Flash oder ähnliches schnelles Modell).
- Hat alles Wissen und kann über alles gefragt werden wie Wanda.

---

## Technische Hinweise

### Numeric-ID Regression (OpenClaw Bug)
Die Keys unter `guilds[...].channels` **müssen** die exakten Channel-Namen als String sein (z.B. `"crypto-trading"`, `"Wanda-Talk"`), **nicht** die numerischen IDs. OpenClaw's `parseDiscordChannelInput()` interpretiert numerische IDs fälschlicherweise als Channel-Namen und markiert sie als `unresolved`.

### requireMention: false
Damit Agenten automatisch auf jede Text-Nachricht in ihrem Channel antworten (ohne `@Wanda`-Ping), muss für jeden Channel in der Allowlist `{ "requireMention": false }` gesetzt sein.

### Seraphina TTS (Voice)
Voice-Agent nutzt `de-DE-SeraphinaMultilingualNeural` (Edge TTS). ElevenLabs nur auf expliziten Wunsch von Jannis.

