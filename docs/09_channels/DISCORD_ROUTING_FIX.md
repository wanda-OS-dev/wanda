# DISCORD_ROUTING_FIX.md — Bug-Analyse und Fix-Plan

> **Status:** RESOLVED ✅
> **Reported:** 2026-02-27
> **Fixed:** 2026-02-27
> **Priority:** ~~HOCH~~ → ERLEDIGT

---

## Problem-Beschreibung

**Symptom:** Wanda antwortet nur in Discord-Channel `#ceo-office`.
Alle anderen Channels (`#executive`, `#crypto-trading`, `#dev-ops`, `#sales-marketing`, `#operations`) erhalten keine Antwort.

---

## Root-Cause-Analyse

### Aktuelle openclaw.json Discord-Konfiguration

```json
"discord": {
  "enabled": true,
  "token": "[KONFIGURIERT]",
  "groupPolicy": "allowlist",
  "streaming": "off"
}
```

**Fehlend:**
1. Kein `channels`-Array mit Channel-IDs
2. Kein Channel-zu-Agent-Routing
3. `groupPolicy: "allowlist"` ohne definierte allowlist → blockiert alle

### Vermutliche OpenClaw-Mechanik

OpenClaw Discord-Integration benötigt wahrscheinlich:
- Channel-IDs in einer Allowlist
- Oder ein Channel-to-Agent Mapping
- Ohne das: Default-Verhalten = nur DMs oder spezifisch konfigurierter Channel

---

## Fix-Plan

### Schritt 1: Channel-IDs ermitteln (REQUIRED_INPUT)

```
Discord Desktop/Web → Server → Einstellungen → Kanäle
→ Jeden Channel mit Rechtsklick → "Kanal-ID kopieren"
(Discord Developer Mode muss aktiviert sein:
 Einstellungen → Erweitert → Entwicklermodus)
```

Benötigt:
- `DISCORD_SERVER_ID`
- `DISCORD_CHANNEL_ID_CEO_OFFICE`
- `DISCORD_CHANNEL_ID_EXECUTIVE`
- `DISCORD_CHANNEL_ID_CRYPTO`
- `DISCORD_CHANNEL_ID_DEVOPS`
- `DISCORD_CHANNEL_ID_SALES`
- `DISCORD_CHANNEL_ID_OPS`

### Schritt 2: openclaw.json Discord-Konfiguration erweitern

Nach Erhalt der Channel-IDs:

```json
"discord": {
  "enabled": true,
  "token": "[BESTEHENDES TOKEN]",
  "serverId": "DISCORD_SERVER_ID",
  "groupPolicy": "allowlist",
  "streaming": "off",
  "channels": {
    "allowlist": [
      "DISCORD_CHANNEL_ID_CEO_OFFICE",
      "DISCORD_CHANNEL_ID_EXECUTIVE",
      "DISCORD_CHANNEL_ID_CRYPTO",
      "DISCORD_CHANNEL_ID_DEVOPS",
      "DISCORD_CHANNEL_ID_SALES",
      "DISCORD_CHANNEL_ID_OPS"
    ],
    "routing": [
      {
        "channelId": "DISCORD_CHANNEL_ID_CEO_OFFICE",
        "agentId": "wanda"
      },
      {
        "channelId": "DISCORD_CHANNEL_ID_EXECUTIVE",
        "agentId": "wanda"
      },
      {
        "channelId": "DISCORD_CHANNEL_ID_CRYPTO",
        "agentId": "crypto-trader"
      },
      {
        "channelId": "DISCORD_CHANNEL_ID_DEVOPS",
        "agentId": "cto"
      },
      {
        "channelId": "DISCORD_CHANNEL_ID_SALES",
        "agentId": "cmo"
      },
      {
        "channelId": "DISCORD_CHANNEL_ID_OPS",
        "agentId": "coo"
      }
    ]
  }
}
```

**ACHTUNG:** Die exakte Schema-Struktur muss gegen OpenClaw-Dokumentation validiert werden.
Die obige Config ist eine Rekonstruktion — das echte Schema könnte abweichen.

### Schritt 3: Validierung

```bash
# openclaw.json Syntax prüfen
python3 -c "import json; json.load(open('/data/.openclaw/openclaw.json')); print('VALID')"

# Container restart
docker restart openclaw-hq7f-openclaw-1

# Test: In jedem Channel eine Nachricht schicken
# Erwartetes Ergebnis:
# #ceo-office → Wanda antwortet
# #crypto-trading → crypto-trader antwortet (oder Wanda falls kein Agent aktiv)
# etc.
```

---

## Alternative Lösung (Fallback)

Falls OpenClaw kein Channel-Routing unterstützt:

```
Option A: Alle Channels → Wanda → Wanda delegiert intern
  Vorteil: Einfach, kein Schema-Research nötig
  Nachteil: Wanda-Bottleneck, keine direkten Agent-Channels

Option B: Separate Bots pro Channel
  Vorteil: Klares Routing
  Nachteil: Mehrere Bot-Tokens, komplex

Option C: n8n Webhook-Bridge
  n8n empfängt Discord-Webhook → Routing-Logik → Agent-Session via API
  Vorteil: Maximale Flexibilität
  Nachteil: Zusätzlicher Service
```

**Empfehlung:** Option A als Quick-Fix → Später zu Channel-Routing upgraden wenn nötig.

---

## Implementierter Fix (2026-02-27)

### Korrekte OpenClaw-Routing-Mechanik (recherchiert via Quellcode)

**Channel-Routing nutzt `bindings`** auf Top-Level der openclaw.json — NICHT `agentId` in guilds.channels.

```json
"bindings": [
  {
    "agentId": "wanda",
    "comment": "#ceo-office",
    "match": {
      "channel": "discord",
      "peer": { "kind": "channel", "id": "1476799656091713537" }
    }
  }
]
```

### Guild-Config (Allowlist, kein agentId):

```json
"channels": {
  "discord": {
    "guilds": {
      "1444457345731002411": {
        "slug": "lazytechlab-community",
        "channels": {
          "1476799656091713537": {},
          "1476799706729418763": {},
          ...
        }
      }
    }
  }
}
```

### Status nach Deploy:
- Config-Validierung: ✅ keine Fehler
- Discord connected: ✅ (`logged in to discord as 1454488449527578726`)
- 6 Bindings aktiv: ✅
- `channels resolved`: ✅ (Bug-Fix angewendet: OpenClaw hat eine Regression, bei der numerische IDs in der Allowlist nicht erkannt werden. Die Keys unter `guilds[...].channels` **müssen** die exakten Channel-Namen als String sein, z.B. `"crypto-trading": { "requireMention": false }`).

> **WICHTIG (requireMention: false):**
> Damit Agenten auf jede Textnachricht im Channel antworten (ohne explizit mit `@Wanda` markiert zu werden), muss unter dem Channel-Namen in der Allowlist zwingend das Attribut `{ "requireMention": false }` gesetzt werden. Dies hebelt den standardmäßigen Spam-Schutz aus.

## Nächste Schritte

```
[x] Channel-IDs von Jannis erhalten
[x] OpenClaw Discord-Quellcode analysiert
[x] Numeric-ID Bug identifiziert und umgangen (Channel-Namen in Allowlist)
[x] `requireMention: false` gesetzt für nahtlose Text-Kommunikation
[x] DISCORD_CHANNEL_MAP.md Status auf ACTIVE gesetzt
```
