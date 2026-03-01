# SKILL_CREATOR_SPEC.md — Wie neue Skills korrekt erstellt werden

> **Status:** ACTIVE
> **Version:** 1.0
> **Last Updated:** 2026-02-27
> **Trigger:** Wanda erkennt Bedarf → Builder implementiert → Reviewer validiert

---

## Was ist ein Skill?

Ein Skill ist eine **benannte, wiederverwendbare Operation** die:
- Einen klaren Input und Output hat
- Von mehreren Agenten genutzt werden kann
- In SKILLS_INDEX.md registriert ist
- Idempotent ausgeführt werden kann (wenn sinnvoll)

---

## Skill-Lifecycle

```
1. ERKENNUNG (Wanda / Jannis)
   └── Bedarf identifizieren: Was wird wiederholt manuell gemacht?

2. SPEZIFIKATION (Wanda)
   └── Skill-Spec erstellen (dieses Template)
   └── In SKILLS_INDEX.md als STATUS: PROPOSED eintragen

3. FREIGABE (Jannis)
   └── Jannis bestätigt Skill-Notwendigkeit
   └── Bei offensichtlichem Bedarf: Wanda kann direkt zu Schritt 4

4. IMPLEMENTIERUNG (Builder)
   └── Skill-Datei in workspace/skills/{skill_id}.md erstellen
   └── Bei Code-Skill: Implementierung in workspace/projects/skills/

5. VALIDIERUNG (Reviewer)
   └── Spec vollständig?
   └── Edge cases abgedeckt?
   └── Idempotenz sichergestellt?

6. AKTIVIERUNG (Wanda)
   └── SKILLS_INDEX.md Status: PROPOSED → AKTIV
   └── Betroffene Agenten informieren (sessions_send)
   └── TOOLS.md der betroffenen Agenten updaten
```

---

## Skill-Spezifikation Template

```yaml
# SKILL-{ID}: {name}
ID: SK-XXX
Name: skill-name-lowercase-kebab
Owner: agent-id (primärer Ausführer)
Approval: wanda (oder jannis für kritische Skills)
Version: 1.0
Status: PROPOSED / AKTIV / DEPRECATED

Trigger:
  Type: manual / cron / event / condition
  Description: "Wann wird dieser Skill ausgeführt?"
  Condition: "Optional: Bedingung die Trigger auslöst"

Input:
  Parameter1:
    Type: string / int / list / dict
    Required: true / false
    Description: "Was ist dieser Parameter?"
  Parameter2:
    ...

Output:
  Success:
    Type: string / dict / file
    Description: "Was kommt raus bei Erfolg?"
  Failure:
    Type: error
    Description: "Was passiert bei Fehler?"

Steps:
  1. "Erster Schritt"
  2. "Zweiter Schritt"
  ...

Error-Handling:
  Transient: "Retry 1x nach 5s"
  Persistent: "sessions_send → wanda + DAILY_NOTES.md Eintrag"
  Critical: "WhatsApp via SK-032"

Idempotenz: "Kann mehrfach ausgeführt werden ohne Nebenwirkungen? Ja/Nein/Bedingt"
Rate-Limit: "Wie oft maximal? (z.B. 1x/30min)"
Credentials: "Welche Secrets werden benötigt? (aus INTEGRATIONS_INDEX.md)"
```

---

## Pflicht-Felder (Minimum Viable Skill)

Ohne diese Felder wird ein Skill NICHT akzeptiert:

1. **ID** — Eindeutige SK-XXX Nummer
2. **Owner** — Welcher Agent führt aus?
3. **Trigger** — Wann/wie wird ausgelöst?
4. **Input** — Was wird benötigt?
5. **Output** — Was kommt raus?
6. **Error-Handling** — Was passiert bei Fehler?
7. **Idempotenz** — Sicher wiederholbar?

---

## Skill-Kategorien (für ID-Vergabe)

| Range | Kategorie |
|-------|-----------|
| SK-001 – SK-009 | Core / Meta Skills |
| SK-010 – SK-019 | Operations / Infrastructure |
| SK-020 – SK-029 | Trading |
| SK-030 – SK-039 | Kommunikation |
| SK-040 – SK-049 | Content / Marketing |
| SK-050 – SK-059 | Sales / CRM |
| SK-060 – SK-069 | Finance / Accounting |
| SK-070 – SK-079 | Development / Code |
| SK-080 – SK-089 | Security |
| SK-090 – SK-099 | Research / Data |

---

## Anti-Patterns (Skills die NICHT erstellt werden dürfen)

```
❌ Skill der nur 1x benutzt wird → Direkt im Agent implementieren
❌ Skill ohne Error-Handling → Wird vom Reviewer blockiert
❌ Skill der Secrets im Klartext braucht → Muss via .env Handle
❌ Skill mit Side-Effects ohne Idempotenz-Check → Erst sichermachen
❌ Skill der anderen Agenten ohne Erlaubnis kontrolliert → Security-Violation
```

---

## Pro-Agent Skill Libraries

Jeder Agent hat in seinem `TOOLS.md` eine persönliche Skill-Library:

```markdown
## Meine Skill-Library
- SK-XXX: skill-name — [kurze Beschreibung meiner Nutzung]
- SK-YYY: skill-name — [kurze Beschreibung meiner Nutzung]
```

Wanda hat Zugriff auf alle Skills.
Spezialisierte Agenten nur auf ihre Domänen-Skills + SK-032 (WhatsApp-Alert via Wanda).
