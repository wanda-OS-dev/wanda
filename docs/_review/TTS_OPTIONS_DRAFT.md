# WANDA Voice Options — TTS Provider Reference

> Modular, transparent, individuell. Jeder Agent kann seine eigene Stimme haben.
> Dieses Dokument erklärt alle Optionen, was jede kann, was sie kostet und wo sie läuft.

---

## Übersicht

| Provider | Qualität | Kosten | VPS-fähig | Sprachen | Offline |
|----------|----------|--------|-----------|----------|---------|
| **Edge TTS** (Microsoft) | ★★★★☆ | Kostenlos | ✅ | 100+ | ❌ (Cloud) |
| **ElevenLabs** | ★★★★★ | Bezahlt | ✅ | 30+ | ❌ |
| **OpenAI TTS** | ★★★★☆ | ~$15/1M chars | ✅ | Multilingual | ❌ |
| **F5-TTS** | ★★★★☆ | Kostenlos | ✅ GPU empf. | Mehrere | ✅ |
| **Kokoro TTS** | ★★★★☆ | Kostenlos | ✅ (CPU ok) | EN/JP/... | ✅ |
| **Piper TTS** | ★★★☆☆ | Kostenlos | ✅ | DE/EN/... | ✅ |
| **Coqui XTTS** | ★★★★☆ | Kostenlos | ✅ GPU | 17 | ✅ |

---

## 1. Edge TTS (Standard — empfohlen für Einstieg)

**Was:** Microsoft Azure Neural Voices via öffentliche Edge-Schnittstelle. Kein API-Key.  
**Qualität:** Sehr natürlich klingende neuronale Stimmen.  
**Kosten:** Kostenlos (kein SLA, best-effort).  
**VPS:** ✅ Funktioniert auf jedem Server mit Internet.

### Empfohlene Stimmen

| Stimme | Sprache | Charakter | Empfohlen für |
|--------|---------|-----------|---------------|
| `de-DE-SeraphinaMultilingualNeural` | DE + multilingual | Warm, professionell | Default Agent |
| `de-DE-FlorianMultilingualNeural` | DE + multilingual | Männlich, klar | Männliche Agenten |
| `de-DE-KatjaNeural` | Deutsch | Klassisch ⚠️ | Legacy (veraltet) |
| `en-US-JennyNeural` | Englisch | Freundlich | EN-Agenten |
| `en-US-GuyNeural` | Englisch | Männlich | EN-Agenten männlich |

### Config
```json
"tts": {
  "auto": "always",
  "mode": "final",
  "provider": "edge",
  "edge": {
    "voice": "de-DE-SeraphinaMultilingualNeural",
    "lang": "de-DE",
    "outputFormat": "audio-24khz-96kbitrate-mono-mp3",
    "rate": "+15%",
    "pitch": "+0%"
  }
}
```

---

## 2. ElevenLabs (Premium — beste Qualität)

**Was:** Marktführer für emotionale, expressive KI-Stimmen.  
**Qualität:** Bestes auf dem Markt. Clone-Fähigkeit. Emotion Control.  
**Kosten:** Free Tier: 10k chars/Monat. Starter: $5/Monat (30k). Creator: $22/Monat (100k).  
**VPS:** ✅  
**Besonderheit:** Voice Cloning — kann jede Stimme klonen mit ~1 Min Audio.

### Wanna-Standard: Jessica
- Voice ID: `cgSgspJ2msm6clMCkdW9`
- Modell: `eleven_multilingual_v2`
- Speed: `1.02`
- Einsatz: Bei Voice-Input von Jannis oder expliziter ElevenLabs-Anfrage

### Config
```json
"tts": {
  "provider": "elevenlabs",
  "elevenlabs": {
    "apiKey": "ELEVENLABS_API_KEY",
    "voiceId": "cgSgspJ2msm6clMCkdW9",
    "modelId": "eleven_multilingual_v2",
    "voiceSettings": {
      "stability": 0.5,
      "similarityBoost": 0.75,
      "speed": 1.02
    }
  }
}
```

---

## 3. OpenAI TTS

**Was:** OpenAI's gpt-4o-mini-tts / tts-1 / tts-1-hd.  
**Qualität:** Sehr gut, natürlich. Weniger expressiv als ElevenLabs.  
**Kosten:** ~$0.015/1k chars (tts-1), ~$0.030/1k chars (tts-1-hd).  
**VPS:** ✅

### Stimmen: `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`

---

## 4. F5-TTS (Lokal, Open Source)

**Was:** State-of-the-art Open-Source TTS mit Zero-Shot Voice Cloning.  
**Qualität:** ★★★★☆ — vergleichbar mit ElevenLabs bei guter GPU.  
**Kosten:** Kostenlos.  
**VPS:** ✅ (GPU empfohlen: NVIDIA ≥ 8GB VRAM. CPU möglich aber langsam).  
**Sprachen:** EN, ZH, DE (experimental).  
**Offline:** ✅ Vollständig lokal.  
**Install:** `pip install f5-tts`

---

## 5. Kokoro TTS (Lokal, leichtgewichtig)

**Was:** 82M Parameter Modell — schnell, leicht, qualitativ gut.  
**Qualität:** ★★★★☆ für EN/JP.  
**Kosten:** Kostenlos.  
**VPS:** ✅ Läuft auf CPU (langsamer) und GPU.  
**Sprachen:** EN, JA, ZH, KO, FR, ES, PT, HI, IT.  
**Offline:** ✅  
**Besonderheit:** Beste Wahl für CPU-only VPS mit guter Qualität.

---

## 6. Piper TTS (Lokal, sehr schnell)

**Was:** Extrem schnelles lokales TTS. Ideal für Raspberry Pi / schwache Hardware.  
**Qualität:** ★★★☆☆ — hörbar synthetisch aber funktional.  
**Kosten:** Kostenlos.  
**VPS:** ✅ Läuft überall.  
**Sprachen:** DE, EN und viele weitere.  
**Offline:** ✅  
**Install:** `pip install piper-tts`

---

## WANDA Default-Empfehlung

```
Kein API-Key / Einstieg    → Edge TTS (Seraphina)
Beste Qualität / Paid      → ElevenLabs
Lokal + kostenlos + GPU    → F5-TTS oder Kokoro
Lokal + schwache Hardware  → Piper
OpenAI-Kunde               → OpenAI TTS (nova oder shimmer)
```

---

## Agent Voice Assignment

Jeder Agent kann seine eigene Stimme haben. In `wanda.json`:

```json
"agents": {
  "list": [
    {
      "id": "wanda",
      "tts": {
        "provider": "edge",
        "edge": { "voice": "de-DE-SeraphinaMultilingualNeural", "rate": "+15%" }
      }
    }
  ]
}
```

Per-Agent-TTS überschreibt globale TTS-Config.

---

_Stand: 2026-03-01 · Automatisch aktualisierbar via `wanda update-docs tts`_

---
> Wichtiger Nachtrag: Dieser Review sollte auch Claude Code Hooks abdecken.
> Separate Datei: CLAUDE_CODE_HOOKS.md erstellen.
