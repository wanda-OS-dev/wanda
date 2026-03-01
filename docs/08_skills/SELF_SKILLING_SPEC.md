# SELF_SKILLING_SPEC.md — Autonomer Skill-Erkennungs- und Erstellungsprozess

> **Status:** ACTIVE
> **Version:** 1.0
> **Last Updated:** 2026-02-27
> **Skill:** SK-003 (self-skilling)

---

## Konzept

Self-Skilling ist der Mechanismus durch den das WANDA-System seine eigenen Fähigkeiten autonom erweitern kann — ohne dass Jannis jeden Skill manuell anordnen muss.

**Grundprinzip:** Das System beobachtet sich selbst, erkennt Lücken und schlägt Verbesserungen vor.

---

## Erkennungs-Trigger

### Automatisch (Wanda analysiert)
1. **Wiederholungs-Pattern:** Gleiche manuelle Aufgabe > 3x in DAILY_NOTES.md
2. **Fehler-Pattern:** Gleicher Fehler > 2x ohne Lösung → Skill zum Fix vorschlagen
3. **Effizienz-Lücke:** Agent braucht > 5 Schritte für etwas das 1 Schritt sein könnte
4. **Delegations-Lücke:** Agent delegiert manuell was automatisierbar wäre

### Manuell (Jannis oder Agent)
- Jannis: "Das solltest du dir merken / automatisieren"
- Agent: Erkennt in Session einen wiederkehrenden Bedarf

---

## Self-Skilling-Prozess (SK-003)

```
SCHRITT 1: ERKENNUNG (Wanda, wöchentlich)
├── Lese alle DAILY_NOTES.md der letzten 7 Tage
├── Suche nach Pattern: "gleiche Aufgabe" / "gleiches Problem"
├── Bewerte: Skill-Bedarf vorhanden?
│   └── Nein → NO_REPLY
│   └── Ja → weiter

SCHRITT 2: SPEZIFIKATION (Wanda)
├── Erstelle Skill-Draft nach SKILL_CREATOR_SPEC.md Template
├── Weise ID zu (nächste freie SK-XXX)
├── Bewerte Aufwand: Einfach (1-2h) / Mittel (1 Tag) / Komplex (> 1 Tag)
└── Schreibe draft zu workspace/skills/proposed/SK-XXX-{name}.md

SCHRITT 3: JANNIS-BRIEF (Wanda)
├── Discord #ceo-office ODER WhatsApp (wenn kein Discord-Routing)
├── Format:
│   "🧠 Skill-Vorschlag: {skill-name}
│    Beobachtung: {was wurde 3x manuell gemacht}
│    Nutzen: {was wird automatisiert}
│    Aufwand: {Einfach/Mittel/Komplex}
│    Approve: [ja] / Ablehnen: [nein]"
└── Warten auf Freigabe (NON-BLOCKING — andere Tasks weiterlaufen)

SCHRITT 4: IMPLEMENTIERUNG (nach Freigabe)
├── Wanda → Builder: sessions_send (Skill-Spec)
├── Builder implementiert
├── Reviewer validiert
├── Wanda aktiviert in SKILLS_INDEX.md
└── Betroffene Agenten via sessions_send informieren
```

---

## Skill-Vorschlag Format (Wanda → Jannis)

```
🧠 SKILL-VORSCHLAG [SK-###]

Beobachtung:
  {Agent X} hat in der letzten Woche {N}x manuell {Aufgabe} gemacht.
  Kontext: {kurze Beschreibung aus DAILY_NOTES}

Vorgeschlagener Skill: {skill-name}
  → Trigger: {wann}
  → Was: {was automatisiert wird}
  → Nutzen: {Zeitersparnis / Fehlerreduktion}
  → Aufwand: {Einfach (1-2h) / Mittel / Komplex}

Freigabe?
  ✅ "SK-{###} approve" → Implementierung startet
  ❌ "SK-{###} deny" → Verwerfen
  📝 "SK-{###} edit {Feedback}" → Anpassen
```

---

## Guardrails (Was Self-Skilling NICHT darf)

```
❌ Skills mit externen Seiteneffekten ohne explizite Freigabe erstellen
❌ Trading-Skills ohne Jannis-Approval aktivieren
❌ Security-relevante Skills automatisch aktivieren
❌ Skills die auf andere Agenten zugreifen ohne deren Consent
❌ Skills implementieren die Jannis abgelehnt hat (auch informell)
❌ Mehr als 3 Skill-Vorschläge gleichzeitig queuen (Jannis-Spam)
```

---

## MEMORY-Pflege (Wanda)

Nach jedem Self-Skilling-Zyklus:

```markdown
## Skills — Lernpunkte [DATUM]
- Erkannte Pattern: {N} neue Skill-Bedarfe
- Vorgeschlagen: SK-XXX (Status: Pending/Approved/Denied)
- Aktiviert: SK-YYY
- Abgelehnt: SK-ZZZ (Grund: {Jannis-Feedback})
```

Abgelehnte Skills werden mit Begründung in MEMORY.md gespeichert um Wiederholungs-Vorschläge zu vermeiden.

---

## KPIs (Qualität des Self-Skilling)

| Metrik | Ziel | Wo gemessen |
|--------|------|-------------|
| Skills vorgeschlagen/Monat | 2-5 | Wanda DAILY_NOTES |
| Approval-Rate | > 70% | SKILLS_INDEX History |
| Skills nach 30 Tagen aktiv genutzt | > 50% | SKILLS_INDEX Usage |
| Ø Zeit Erkennung → Aktivierung | < 7 Tage | DAILY_NOTES |

Ein Self-Skilling-System das > 50% Ablehnungsrate hat, macht schlechte Vorschläge.
Wanda soll daraus lernen: Was lehnt Jannis ab und warum?
