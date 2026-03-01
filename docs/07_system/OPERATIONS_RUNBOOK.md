# OPERATIONS_RUNBOOK.md — Start, Restart, Recovery und Monitoring

> **Status:** ACTIVE
> **Version:** 2.0
> **Last Updated:** 2026-03-01
> **Owner:** coo (Operations) + update-strategist (Monitoring)

---

## 1. Standard-Startup-Sequenz

### Normaler Container-Start
```bash
# 1. VPS verbinden
ssh vps

# 2. Container-Status prüfen
docker ps | grep openclaw

# 3. Falls gestoppt: Startup-Fix ausführen (IMMER)
/docker/openclaw-hq7f/fix-jiti.sh

# 4. Health-Check
curl -s http://localhost:3000/health || echo "NOT HEALTHY"

# 5. Wanda-Session starten (im Container)
ssh wanda
```

### Nach System-Neustart / Boot
```bash
# Gleiche Sequenz, zusätzlich:
# - fix-jiti.sh ist der entrypoint — läuft automatisch wenn richtig konfiguriert
# - Bei Problemen: /openclaw-repair diagnose
```

---

## 2. Restart-Prozeduren

### Normaler Container-Restart
```bash
# Nach Konfigurationsänderungen (z.B. openclaw.json)
ssh vps "docker restart openclaw-hq7f-openclaw-1"
# Warten ~30s
# Health-Check durchführen
```

### Container-Neuaufbau (nach Plugin-Ownership-Bug)
```bash
# Skill: /openclaw-repair full
# Oder manuell:
ssh vps "/docker/openclaw-hq7f/fix-jiti.sh"
```

### Bekannte Fehler und Fixes

#### Plugin-Ownership-Bug
```
Symptom: Container startet nicht, Fehler im docker log
Fehler: "Permission denied" in Plugin-Verzeichnis
Fix:
  ssh vps "docker exec openclaw-hq7f-openclaw-1 chown -R root /path/to/plugins"
  docker restart openclaw-hq7f-openclaw-1
```

#### Unsafe-Tmp-Bug
```
Symptom: Sessions starten nicht
Fehler: "Unsafe tmp directory /tmp/openclaw-0"
Fix: fix-jiti.sh behebt diesen Fehler automatisch
```

#### Gateway-Lock
```
Symptom: API-Calls hängen
Fix:
  docker restart openclaw-hq7f-openclaw-1
  # Oder /openclaw-repair fix
```

---

## 3. Monitoring

### Manual Health-Checks
```bash
# Container läuft?
ssh vps "docker ps | grep openclaw"

# API erreichbar?
ssh vps "curl -s http://localhost:3000/health"

# Aktive Sessions?
# Via OpenClaw: sessions_list in Wanda

# Crons laufen?
ssh wanda "cat /data/.openclaw/openclaw.json | grep -A3 'enabled'"
```

### Agent-Health via DAILY_NOTES
```bash
# Letzter Eintrag crypto-trader
ssh wanda "tail -20 /data/.openclaw/workspace-crypto-trader/DAILY_NOTES.md"

# Letzter Eintrag update-strategist
ssh wanda "tail -20 /data/.openclaw/workspace-update-strategist/DAILY_NOTES.md"
```

### Geplantes Monitoring (Phase 4: Nightly Consolidation)
```
02:00 täglich:
  1. Wanda sammelt alle DAILY_NOTES.md
  2. Analysiert auf Fehler, Anomalien, Erfolge
  3. Erstellt Tagesbericht
  4. Discord #ceo-office bei kritischen Issues
  5. Agent-MEMORY.md Updates
```

---

## 4. Eskalations-Pfade

### Level 1 — Automatische Recovery
```
Wer: Agenten selbst
Was: Retry-Logik, Fallback-Modelle, NO_REPLY
Wann: Bei transientem Fehler (API timeout, kurzer Netzwerk-Ausfall)
```

### Level 2 — Agent-zu-Agent Eskalation
```
Wer: Spezialist-Agent → C-Level-Agent
Was: sessions_send mit Fehler-Bericht
Wann: Agent kann Task nicht abschließen
Beispiel: builder → cto "Build failed, architecture review needed"
```

### Level 3 — Wanda-Eskalation
```
Wer: C-Level → Wanda
Was: sessions_send mit Status
Wann: C-Level kann Problem nicht lösen
Wanda entscheidet: Discord-Alert, WhatsApp oder weiter-delegieren
```

### Level 4 — Jannis-Alert (WhatsApp)
```
Wer: Wanda
Was: WhatsApp-Nachricht an Jannis
Wann:
  - Trading-Verlust > 10%
  - SECURITY-Update verfügbar
  - Kritischer System-Fehler der sich nicht selbst löst
  - Kill-Switch aktiviert
```

---

## 5. Konfigurationsänderungen

### openclaw.json Update
```bash
# 1. Lokale Kopie bearbeiten
# 2. Validieren (JSON-Syntax)
python3 -c "import json; json.load(open('openclaw.json'))" && echo "VALID"

# 3. Auf VPS übertragen
scp openclaw.json vps:/docker/openclaw-hq7f/data/.openclaw/openclaw.json

# 4. Container restart
ssh vps "docker restart openclaw-hq7f-openclaw-1"
```

### Agent hinzufügen
```bash
# Skill: SK-002 agent-creator
# Manuell: openclaw.json editieren + Container restart
# Workspace anlegen: SK-010 agent-anatomy-setup
```

### Secret hinzufügen
```bash
# NIEMALS in openclaw.json
# Immer in VPS .env:
ssh vps "echo 'NEW_SECRET=value' >> /docker/openclaw-hq7f/.env"
# Container restart (damit neue .env geladen wird)
ssh vps "docker restart openclaw-hq7f-openclaw-1"
```

---

## 6. Nightly Consolidation (Phase 4 — geplant)

```
Cron: "0 2 * * *" (02:00 täglich, Berlin)
Agent: wanda

Ablauf:
  1. sessions_spawn → Jeder Agent erstellt DAILY_NOTES.md-Eintrag
  2. Wanda liest alle DAILY_NOTES.md
  3. Extrahiert: Erfolge, Fehler, offene Tasks, Lernpunkte
  4. Updaten MEMORY.md für relevante Agenten
  5. Tagesbericht: workspace/wanda/DAILY_NOTES.md
  6. Bei kritischen Issues: Discord #ceo-office
  7. Wöchentlich (Sonntag): Wochenbericht + Optimierungsvorschläge an Jannis

QMD (Quality Metrics Dashboard):
  - Trade-Performance (crypto-trader)
  - Update-Status (update-strategist)
  - Code-Quality (reviewer)
  - Content-Output (copywriter, cmo)
  - Revenue-Tracking (cfo, gumroad)
```

---

## 7. Recovery-Checkliste

```
□ Container läuft: docker ps
□ Health-Check OK: curl /health
□ Wanda antwortet: Test-Nachricht über Discord #ceo-office
□ Crons aktiv: openclaw.json enabled-Status
□ Secrets geladen: docker exec env | grep -c _API_
□ Letzte DAILY_NOTES aktuell: tail DAILY_NOTES.md
□ Discord-Bot online: Discord-Status prüfen
□ Telegram-Bot online: Test-Befehl
□ Kraken-Verbindung: crypto-trader Test-Query
```

---

## 8. Useful Commands Cheat Sheet

```bash
# VPS verbinden
ssh vps

# Container Shell (root)
ssh wanda

# Container-Status
docker ps | grep openclaw

# Container neu starten
docker restart openclaw-hq7f-openclaw-1

# Container-Logs (live)
docker logs -f openclaw-hq7f-openclaw-1

# openclaw.json validieren + lesen
python3 -c "import json; d=json.load(open('/data/.openclaw/openclaw.json')); print(f'{len(d[\"agents\"][\"list\"])} Agenten')"

# Alle Workspaces auflisten
# Alle Agent-Homes auflisten
ls /data/.openclaw/workspace-*/

# Agent-Home öffnen
cat /data/.openclaw/workspace-wanda/IDENTITY.md

# Kill-Switch (Emergency)
docker pause openclaw-hq7f-openclaw-1
```
