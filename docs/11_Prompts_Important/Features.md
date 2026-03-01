I want you to add the following 69 features to my Wanda AI agent and strictly maintain the "workspace" Workspace Procedure and structure as the core operating logic. Please ensure that all features are implemented in a way that adheres to remain the Github Workspace Procedure and strukture and does not introduce any new dependencies or changes to the existing codebase. Additionally, please provide detailed documentation on how each feature is implemented and how it integrates with the rest of the system.

Project: TypeScript/Node.js Telegram/Discord bot at /home/jannis/Schreibtisch/Work-OS/40_Products/Wanda-Repo/
Architecture: Agentic tool loop, MCP bridge, SQLite memory, hot-swappable LLM providers.
Root Directory: /home/jannis/Schreibtisch/Work-OS/40_Products/Wanda-Repo/

━━━ WORKSPACE STRUCTURE (workspace) ━━━

The agents must maintain, navigate, and respect the following directory and file structure with absolute precision:

workspace/
├── business/                       # Dein strategisches Second Brain
│   ├── strategy/                   # Business-Strategie, Identität und Ops (Core Compass)
│   │   ├── identity/               # Wer wir sind und wie wir auftreten
│   │   │   ├── brand-dna.md        # Kernwerte, Mission, Vision und externe Positionierung
│   │   │   ├── who-am-i.md         # Die persönliche Gründer-Story und Autorität
│   │   │   └── names-and-lingo.md  # Interne Terminologie, Naming Conventions und Wording
│   │   ├── execution/              # Die Brücke zwischen Vision und knallharter Umsetzung
│   │   │   ├── goals.md            # Makro-Ziele, OKRs und der aktuelle "North Star"
│   │   │   ├── priorities.md       # Akute Probleme und die direkte, ungeschönte Fokus-Liste
│   │   │   ├── leverage-moves.md   # Die aktuell 3 wichtigsten Hebel für maximalen ROI
│   │   │   ├── deep-work-backlog.md# Strategische Deep-Work-Kandidaten inkl. ROI-Analyse
│   │   │   └── ideas-graveyard.md  # Backlog für zukünftige Projekte (damit der Kopf frei bleibt)
│   │   └── retrospectives/         # Der iterative Lernzyklus und Feedback-Loop
│   │       ├── bottlenecks.md      # Schonungslose Analyse aktueller System- und Wachstums-Engpässe
│   │       ├── mistakes.md         # Das dokumentierte Fehler-Logbuch zur Vermeidung von Wiederholungen
│   │       └── what-works.md       # Die Synthese aus Erfahrung: Was skaliert, was konvertiert, was stirbt
│   ├── Projekt XYZ/                # Spezifische Notizen zu Software-Projekten (z.B. basicinfo.md)
│   ├── assets/                     # Brand Assets, Logos, Grafiken und visuelle Identität
│   ├── books/                      # Buch-Notizen und Summaries (100M-Leads.md, 100M-Money-Models.md, 100M-Offers.md)
│   ├── coding/                     # Entwickler-Notizen, Code-Schnipsel und technische Strategien
│   ├── comms/                      # Logbuch der internen Team-Kommunikation und Entscheidungen
│   ├── copywriting/                # Frameworks für Texte, CTA-Listen und VSL-Checklisten (Unterordner: CTAs/)
│   ├── emails/                     # Strategien für Email-Marketing, Sequenzen und Research
│   ├── high-ticket/                # High-Ticket Offer Strategie (README.md, ascension.md, customer-interviews.md, offer-stack.md, sales-tips.md)
│   ├── journal/                    # Tägliches Business-Journal zur Reflexion (Format: DD-MM-YYYY.md)
│   ├── metrics/                    # Snapshots von Funnel-Daten und Business-Kennzahlen
│   ├── new-society/                # Produktnotizen und Community-Aufbau
│   ├── paid-ads/                   # Skripte und Hooks für Werbung (hooks.md, paid-ads.md, scripting.md, youtube-retargeting-ads.md)
│   ├── product/                    # Produkt-Aufbau und Marketingstrategien
│   ├── project-management/         # Projektmanagement (z.B. onboarding-new-hire-deel.md)
│   ├── qa/                         # Quality Assurance (z.B. test-plan.md)
│   ├── playbooks/                  # Schritt-für-Schritt SOPs (z.B. onboarding-new-hire-deel.md)
│   ├── reminders/                  # "Hard-won" Business Lessons (Eine .txt Datei pro Lektion, z.B. raise-your-prices.txt)
│   ├── research/                   # Externer Research, Frameworks, OSINT und Konkurrenz-Signale (Unterordner: leaks/)
│   ├── sales/                      # Verkaufsprozesse und Objection Handling (objections.md, hormozi-testimonial-framework.md)
│   ├── team/                       # Team-Management (Eigene Datei pro Mitglied [Name].md, deel-com-setup.md)
│   ├── twitter/                    # Content-Strategie für X/Twitter (writing-style.md)
├── personal/                       # Private Intentionen und Lebensführung
│   ├── archives/                   # Archiv für abgeschlossene Projekte oder alte Journale
│   ├── biology/                    # Gesundheit, Fitness, Ernährung & Biohacking
│   ├── finances/                   # Private Budgets, Steuern & Investitionen
│   ├── growth/                     # Persönliche Weiterentwicklung und neue Skills
│   ├── identity/                   # Private Prinzipien, Werte und Visionen
│   ├── journal/                    # Private tägliche Reflexionen (DD-MM-YYYY.md)
│   ├── lifestyle/                  # Reisen, Hobbys, Setup-Ideen & Gear
│   ├── network/                    # Personal CRM (Freunde, Familie, Mentoren)
│   ├── projects/                   # Private Bastelprojekte und Experimente
│   ├── goals_personal.md           # Die privaten Nordstern-Ziele
│   ├── intentions.md               # Monatliche und wöchentliche Absichten
│   └── bucket_list.md              # Lebensziele und Träume
├── memory/                         # Agent Memory Logs
│   └── DD-MM-YYYY.md               # Tägliche Interaktions-Logs und Kurzzeitgedächtnis
├── AGENTS.md                       # Konfiguration und Rollen der aktiven Sub-Agenten
├── BOOT.md                         # Boot-Sequenz, Startup-Checks und Initialisierungs-Logik
├── HEARTBEAT.md                    # System-Gesundheit, Monitoring und Status-Logs
├── IDENTITY.md                     # Core Persona, Verhaltensregeln und Schreibstil des Agenten
├── MEMORY.md                       # Langzeit-Gedächtnis Index und Referenz-Struktur
├── SOUL.md                         # Grundwerte, Antrieb und ethisches Framework des Agenten
├── TOOLS.md                        # Inventar aller CLI-Tools, Google-Integrationen und API-Keys
├── USER.md                         # Detailliertes Nutzerprofil, Vorlieben und Kontext über Jannis
└── settings.json                   # Konfigurationsdatei für alles an Wanda

━━━ FEATURES TO BUILD ━━━

💬 Messaging & Channels
1. Telegram Bot: Integration via grammY/Telegraf. Support für Text, Inline-Keyboards, Voice, Gruppen und Medien. (We already started it here in this Folder)
2. Discord Bot: Integration via discord.js. Slash-Commands, Reaktionen, Threads und Embeds.
3. iMessage: Integration via BlueBubbles Server (Senden/Empfangen von Medien & Reaktionen).
4. WebChat UI: Browser-Interface mit Markdown, File-Upload und WebSocket-Echtzeitkommunikation.
5. Gmail Integration: Gmail API mit Pub/Sub für proaktive Benachrichtigungen und Entwürfe.
6. Multi-Channel Router: Zentraler Bus, der Nachrichten token-effizient an alle Kanäle verteilt.

🎙️ Voice & Speech (Vox Voice would be a good starting point System-Link: /home/jannis/Schreibtisch/Work-OS/40_Products/Vox-Voice/)
7. Voice Transcription: Automatische Whisper-Transkription für jede eingehende Voice-Nachricht.
8. Voice Wake Word: Lokale 'Hey Claw' Erkennung für einen "Always-on" Talk-Mode.
9. Talk Mode: Fließender Sprach-Loop (Whisper -> LLM -> ElevenLabs).
10. Text-to-Speech: Sprachausgabe über ElevenLabs oder OpenAI TTS.
11. ElevenLabs Voice: Nutzung spezifischer Voice-IDs und Audio-Streaming für minimale Latenz.
12. Telegram Voice: Senden und Empfangen von nativen Sprachnachrichten.

🧠 Memory & Context
13. Bi-temporal Knowledge Graph MCP: SQLite-basierter Knowledge Graph (`scripts/knowledge_graph_mcp.py`), auto-verfügbar via `settings.json → mcpServers.knowledge-graph`. Jeder Fakt trägt zwei Zeitstempel — Valid Time (wann galt es in der Realität) und Transaction Time (wann erfasst). Format: `[Fakt] | Valid: YYYY-MM-DD | Status: active|deprecated`. 5 MCP-Tools: `kg_add_fact`, `kg_search`, `kg_temporal_query`, `kg_deprecate`, `kg_ingest_para`. Widersprüche werden durch Deprecation aufgelöst — niemals löschen, immer versionieren. Upgrade-Pfad: graphiti-core + Neo4j für Multi-Hop-Reasoning (Phase 2).
14. PARA-Struktur (Second Brain): Vier-Ordner-Wissensarchitektur (Projects/Areas/Resources/Archives) als unveränderliches Dateisystem-Fundament. Projects = aktive Ziele (PROJECTS.md, P1–P4, max 500 Token, Boot-Kontext). Areas = dauerhafte Standards (STANDARDS.md, maschinenlesbar, bi-temporal). Resources = Wissensdatenbank (API-Docs, Research). Archives = kaltes Gedächtnis (abgeschlossene Logs, Projekte). Kein Wissen existiert außerhalb dieser Struktur.
15. Observation Masking + Context Pruning: Tool-Outputs (80% des Kontextes) werden nie roh gespeichert. Format: `[Action] → [Observation (Essenz)] → [Insight]`. Alte Fehlermeldungen werden maskiert: `[masked: ...]`. Spart ~50% Tokens ohne Informationsverlust. Verhindert Context Rot (Leistungsabfall von 98% → 64% bei überfülltem Kontext). CATP (Contextually Adaptive Token Pruning) filtert irrelevante Sätze vor der Modell-Übergabe.
16. Multimodal Memory: Extraktion von Wissen aus Bildern, Videos und Dokumenten. Erkannte Fakten werden bi-temporal in TACIT_KNOWLEDGE.md gespeichert und in den Knowledge Graph ingested.
17. Nightly Summarization Tree (TiMem): Automatischer Konsolidierungsjob täglich um 02:00 (Cron: `0 2 * * *`). Implementiert vollständigen L1→L5-Tree: L1 (rohe Daily Logs `memory/daily/YYYY-MM-DD.md`) → L2 (Insights in TACIT_KNOWLEDGE.md, bi-temporal) → L3 (Themen-Cluster in Resources) → L4 (Verhaltens-Muster in STANDARDS.md) → L5 (Persona/Strategie in PROJECTS.md P1–P4). Danach: `qmd update && qmd embed` (5 Collections), Qdrant inkrementell, KG-Sync. Phase 2: Ebbinghaus-Decay (Auto-Archivierung veralteter Fakten nach Vergessenskurve R(t) = e^(-t/S)).
18. Episodisches Markdown Memory: Pro Tag eine Datei `memory/daily/YYYY-MM-DD.md` (kein rotierendes Einzel-File). Trennt volatile Tages-Logs (ephemeral) von stabilem Langzeitwissen (TACIT_KNOWLEDGE.md, STANDARDS.md). QMD indiziert alle Logs über die `episodic`-Collection (5. Collection) — semantisch suchbar via `qmd search`. Git-kompatibel: jeder Fakt ist versionierbar und auditierbar.
19. Qdrant Vector Memory: Docker-lokale Vektor-Datenbank (localhost:6333, Collection `para_knowledge`, 768 Dims, Cosine Similarity). Embeddings via `all-mpnet-base-v2` (sentence-transformers). `embed_para.py` mit `--incremental`-Flag: nur geänderte Dateien werden neu eingebettet (RAM- und zeiteffizient). Chunks: 900 Token mit 15% Overlap, PARA-Metadaten (para_type, file, heading) für präzises Retrieval. Teil der Retrieval-Kaskade (Stufe 3): ripgrep → QMD → **Qdrant** → KG.
20. Multi-Tool Memory Sync + Hook-Automation: QMD MCP (5 Collections: projects/areas/resources/archives/episodic, BM25+Vector+Hybrid) + Knowledge Graph MCP — beide via `settings.json → mcpServers` auto-geladen in jeder Session. Hook-Automatisierung: `PreToolUse`-Hook (context-threshold.sh, warnt ab 80%) + `Stop`-Hook (session-stop.sh schreibt automatisch Session-Ende in Daily Log mit Tool-Count + Token-Stats). `bootstrap-extra-files`-Hook injiziert PROJECTS.md + STANDARDS.md bei jedem Agent-Boot. Kein manuelles Triggern nötig — das Memory-System läuft als vollständiges Betriebssystem im Hintergrund.

✨ LLM & Models
21. Multi-LLM Providers: Hot-Swap von Modellen im laufenden Chat via `/model`.
22. Model Failover: Automatische Ausweichlogik bei Rate-Limits oder Server-Ausfällen.
23. OpenRouter: Zugriff auf alle Modelle über einen zentralen API-Key.
24. Local LLMs (Ollama): Vollständiger Offline-Betrieb für maximale Privatsphäre.
25. Thinking Levels: Steuerung der Reasoning-Tiefe via `/think` (Off, Low, Medium, High).
26. Unified Authentication: Intuitives Setup via OAuth (Primary) oder API-Keys (Secondary) inklusive globaler Modell-Verwaltung (Active/Inactive).
27. Chat History Management: Automatische Speicherung und Verwaltung der Chat-Transaktionen.

⚡ Tools & Automation
28. Shell Commands: Ausführung von Terminal-Befehlen mit Sicherheits-Bestätigung.
29. File Operations: Vollständiger Zugriff auf das workspace Filesystem (Read/Write/Search).
30. Browser Automation: Web-Scraping und Interaktion via Puppeteer/Playwright.
31. Web Search: API-Anbindung für Google, Bing und DuckDuckGo.
32. Scheduled Tasks: Cron-Jobs und Natural Language Scheduling für Aufgaben.
33. Webhook Triggers: Empfang von Daten von externen Diensten.
34. MCP Tool Bridge: Integration des Model Context Protocols für externe Tools.
35. Skills System: Dynamisches Laden von Fähigkeiten aus dem `/skills` Ordner.

🔔 Proactive Behavior
36. Morning Briefing: Automatischer Report zu Wetter, Kalender, Tasks und News am Morgen.
37. Evening Recap: Zusammenfassung der erledigten Aufgaben und offener Punkte am Abend.
38. Heartbeat System: Hintergrund-Loop, der auf Ereignisse im workspace reagiert.
39. Smart Recommendations: Vorschläge für Automatisierungen basierend auf Nutzerverhalten.

🛡️ Security & Isolation
40. Container Sandbox: Ausführung kritischer Befehle in isolierten Docker-Containern.
41. Command Allowlists: Strikte Listen erlaubter Pfade und Befehle.
42. Encrypted Secrets: AES-256 Verschlüsselung für alle API-Keys und Passwörter.
43. Air-Gapped Mode: Modus für 100% lokale Verarbeitung ohne Internet-Requests.

🏗️ Agent Architecture
44. Agentic Tool Loop: Iteratives Denken und Tool-Nutzung bis zur Problemlösung.
45. Agent Swarms: Zusammenarbeit spezialisierter Sub-Agenten (Coder, Researcher etc.).
46. Agent-to-Agent Comms: Protokoll für die Kommunikation zwischen verschiedenen Sessions.
47. Mesh Workflows: Dekomposition komplexer Ziele in Teilaufgaben via `/mesh`.
48. Plugin System: Trait-basierte Architektur für maximale Modularität.

☁️ Platform & Deployment
49. Docker Deploy: Vollständiges Docker-Compose Setup für den lokalen Server.
50. Cloudflare Workers: Edge-Deployment Option für API-Endpunkte.
51. ESP32-S3 Support: Firmware-Integration für externe Hardware-Trigger.
52. macOS/Linux Menu Bar: Tray-App für schnellen Zugriff und Status-Monitoring.
53. iOS & Android: Companion-Gateway für Push-Notifications und Sensoren.

🎨 UX & Interaction
54. Typing Indicators: Visuelles Feedback während die KI arbeitet.
55. Slash Commands: Schneller Zugriff auf System-Funktionen (`/status`, `/new`, `/usage`).
56. Live Canvas: Interaktive Widgets und Charts via WebSocket (A2UI).
57. Usage Tracking: Analyse von Kosten, Tokens und Latenz pro Call.
58. Group Management: Gruppen-spezifische Logik und Admin-Rechte.
59. MCC & Dashboard: Integration und Verfeinerung des Wanda-MCC Dashboards.
60. Smooth Streaming UX: Implementierung einer echten Streaming-Animation ("Human Writing"), bei der der Text Buchstabe für Buchstabe/Wort für Wort erscheint statt aufzuploppen.

━━━ SYSTEM EXTEND & CORE PHILOSOPHY ━━━

61. Project Interconnectivity: Tiefe Integration und Zugriff auf:
    - /home/jannis/Schreibtisch/Work-OS/40_Products/AERIS
    - /home/jannis/Schreibtisch/Work-OS/40_Products/dazl-test
    - /home/jannis/Schreibtisch/Work-OS/40_Products/Vox-Voice
    - /home/jannis/Schreibtisch/Work-OS/40_Products/Wanda-Bots
    - /home/jannis/Schreibtisch/Work-OS/40_Products/Wanda-MCC

62. Professional Repo Management: Strukturierte GitHub-Pflege inkl. ADRs (Architecture Decision Records) und Installer-Skripten.
63. Long-Term Architecture: Modularer Aufbau, der über Jahre hinweg stabil und erweiterbar bleibt.
64. Market Analysis: Nutzung der Stärken und Vermeidung der Fehler von Windsurf, Cursor, AgentZero und Antigravity.
65. User-Centric UX: Maximale Transparenz bei gleichzeitiger Einfachheit ("Easy Oversight").
66. Self-Aware Configuration: Der Agent kann seine eigene Konfiguration via Skills verstehen und auf Anfrage ändern.
67. Hardened Stability: "Set and Forget" – Ein stabiles, resilientes System, das im Hintergrund zuverlässig läuft.
68. Clean Workspace Procedure: Proaktive Pflege und Sortierung der gesamten workspace Struktur.
69. GitHub Integration: Verbindung mit anderen Projekten und Services.

Big Focus for UI:
Philosophy: "Users want to See everything easy and Setup everything easy, but also want to be able to change everything easy without getting problems. Stay secure, modular, and reliable. Start from the first Installation to the end Usecases."

━━━━━━━━━━━━━━━━━━━━━━━

Implement features iteratively. Maintain the workspace structure and links at all times. Work Efficiently but Effectively. And also take your time to figure out. Let your code/brain Flow and ne Neurons/thinking Grows Big. Always prioritize user experience and security. Stay updated with the latest trends in UI design and development. Regularly review and refine the workspace to ensure it meets the needs of users and businesses. Stay committed to delivering a high-quality, secure, and reliable workspace solution that exceeds expectations. 