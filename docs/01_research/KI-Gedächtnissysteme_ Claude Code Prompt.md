# **Architekturen der 2\. Generation für Agenten-Gedächtnissysteme: Eine technologische Analyse von Temporal Knowledge Graphs, Semantic RAG und kognitiver Konsolidierung**

Die Architektur von KI-Agenten befindet sich in einem tiefgreifenden Paradigmenwechsel. Während Systeme der ersten Generation primär auf einfachen Vektor-Datenbanken und der Verwaltung flacher Chat-Historien basierten, implementieren Architekturen der zweiten Generation hybride Ansätze, die das Gedächtnis als ein aktives, strukturiertes Betriebssystem begreifen.1 Diese Entwicklung wird durch die Erkenntnis getrieben, dass die bloße Erweiterung von Kontextfenstern – trotz Kapazitäten von bis zu einer Million Token – zu einer signifikanten Degradierung der Modellleistung führt, die als „Context Rot“ oder „Context Confusion“ bezeichnet wird.3 In diesem Kontext haben sich Systeme wie Zep Graphiti, TiMem und Mem0 als führende Lösungen etabliert, die durch die Integration von bi-temporaler Logik, hierarchischen Summarization Trees und proaktiven Konsolidierungsmechanismen eine beispiellose Token-Effizienz und Genauigkeit erreichen.1 Die vorliegende Analyse untersucht diese Systeme unter Einbeziehung organisatorischer Frameworks wie PARA und QMD sowie technischer Werkzeuge wie ripgrep, um eine Blaupause für die nächste Stufe der agentischen Intelligenz zu entwerfen.

## **Theoretische Grundlagen und kognitive Architekturen**

Das Design von Gedächtnissystemen der 2\. Generation orientiert sich zunehmend an kognitiven Modellen der menschlichen Informationsverarbeitung. Die Trennung zwischen transienten Reizen und permanentem Wissen ist essenziell, um die Inferenzkosten zu kontrollieren und die Kohärenz über lange Zeiträume zu gewährleisten.6

### **Die Schichten des agentischen Gedächtnisses**

In modernen Systemen wird das Gedächtnis funktional in vier Hauptkategorien unterteilt, die jeweils unterschiedliche Anforderungen an Speichergeschwindigkeit, Struktur und Abrufpräzision stellen.6

| Gedächtniskomponente | Funktionale Entsprechung | Implementierungstechnologie | Persistenzcharakteristik |
| :---- | :---- | :---- | :---- |
| Kurzzeitgedächtnis (STM) | Unmittelbarer Arbeitskontext | Token-Buffer / Kontextfenster | Transient (pro Sitzung) |
| Episodisches Gedächtnis | Chronologische Ereignisprotokolle | Daily Logs (QMD) / Vektor-Stores | Permanent (Ereignis-fokussiert) |
| Semantisches Gedächtnis | Strukturiertes Faktenwissen | Knowledge Graphs / SQL | Permanent (Beziehungs-fokussiert) |
| Prozedurales Gedächtnis | Erlernte Fähigkeiten & Tools | Skill Libraries / Parametrischer Speicher | Evolvierend (Verhaltens-fokussiert) |

Das Kurzzeitgedächtnis fungiert als Puffer für die unmittelbare Entscheidungsfindung, stößt jedoch bei komplexen Aufgaben mit hoher Turn-Anzahl an die Grenzen der „Trajectory Elongation“. Hierbei verliert der Agent den Fokus, da irrelevante Details früherer Schritte das Kontextfenster dominieren.9 Das episodische Gedächtnis speichert die Rohdaten der Interaktion, während das semantische Gedächtnis durch Prozesse wie die „Nightly Consolidation“ abstrahierte Fakten und Beziehungen extrahiert, die unabhängig vom ursprünglichen Gesprächskontext gültig sind.5

### **Das Problem der Kontext-Degradierung**

Die Forschung zeigt, dass Modelle wie GPT-4o bei einer Überlastung des Kontextes in ihrer Genauigkeit von 98,1 % auf bis zu 64,1 % fallen können.11 Dies wird durch vier Hauptphänomene verursacht:

1. **Context Poisoning**: Eine Halluzination im Kontext wird als Fakt behandelt und verstärkt sich selbst.4  
2. **Context Distraction**: Überflüssige Details lenken von der Kerninstruktion ab.4  
3. **Context Confusion**: Widersprüchliche Informationen führen zu inkonsistenten Handlungen.4  
4. **Context Clash**: Verschiedene Teile des Kontextes widersprechen sich direkt, was zu logischen Sackgassen führt.12

Um diese Effekte zu minimieren, setzen Architekturen der 2\. Generation auf eine radikale Token-Diät durch intelligentes Pruning und die Auslagerung von Wissen in externe Graphenstrukturen.13

## **Strukturelle Organisation: PARA und QMD als Dateisystem-Fundament**

Für die technische Umsetzung in lokalen Entwicklungsumgebungen (wie Claude Code oder VS Code mit Agent-Erweiterungen) hat sich die Adaption des PARA-Frameworks (Projects, Areas, Resources, Archive) von Tiago Forte als Standard für die Organisation des „Second Brain“ eines Agenten etabliert.15

### **Das PARA-Modell für autonome Agenten**

Die Anwendung von PARA auf das Gedächtnis eines Agenten erlaubt eine klare Trennung von Verantwortlichkeiten und Suchräumen, was die Token-Effizienz massiv steigert, da der Agent gezielt nur die relevanten Sektionen einliest.15

* **Projects**: Dieser Bereich enthält alle Dateien zu aktiven Zielen mit festem Enddatum (z. B. PROJECTS.md). Für einen Agenten ist dies der „heiße“ Kontext, der bei jedem Boot-Vorgang gelesen wird.15  
* **Areas**: Hier werden dauerhafte Verantwortlichkeiten ohne Enddatum verwaltet (z. B. AREAS.md für Systemwartung oder Coding-Standards). Diese Informationen dienen als sekundäre Leitplanken.15  
* **Resources**: Dies ist die Wissensdatenbank für Themen, die für zukünftige Aufgaben relevant sein könnten (z. B. Dokumentationen, API-Referenzen). Der Zugriff erfolgt hier primär über Suchtools wie ripgrep oder Semantic RAG.15  
* **Archive**: Abgeschlossene Projekte werden hierher verschoben. Dies ist für den Agenten „kaltes“ Gedächtnis, das nicht mehr aktiv gescannt wird, es sei denn, es gibt eine explizite Anfrage.15

### **QMD (Quick Markdown) und Daily Logging**

Ergänzt wird PARA durch das Prinzip des QMD. Agenten werden angewiesen, kontinuierlich in strukturierte Tagesprotokolle (memory/YYYY-MM-DD.md) zu schreiben.17 Diese Dateien dienen als „Raw Notes“ und sind die Grundlage für die spätere Konsolidierung. Die Trennung zwischen stabilen Identitätsdateien (wer der Agent ist) und volatilen Log-Dateien (was der Agent getan hat) macht das System weniger spröde und verhindert, dass veraltete Log-Daten den Startvorgang verlangsamen.17

## **Technisches Kernstück: Zep Graphiti und Temporal Knowledge Graphs**

Während PARA die Datei-Organisation vorgibt, stellt Zeps **Graphiti**\-Engine die technologische Speerspitze für das Verständnis komplexer Zusammenhänge dar. Graphiti ist eine Engine für zeitbewusste (temporally-aware) Wissensgraphen, die sowohl unstrukturierte Konversationsdaten als auch strukturierte Geschäftsdaten synthetisiert.1

### **Bi-temporale Logik und Fakten-Evolution**

Ein wesentlicher Schwachpunkt traditioneller RAG-Systeme ist ihre Unfähigkeit, zeitliche Veränderungen von Fakten abzubilden. Graphiti löst dies durch ein bi-temporales Modell, das zwei Zeitstempel für jedes Faktum (Triplet) speichert:

1. **Valid Time (![][image1])**: Wann das Ereignis in der realen Welt stattfand.  
2. **Transaction Time (![][image2])**: Wann die Information in das System eingepflegt wurde.14

Wenn ein Nutzer beispielsweise sagt: „Ich arbeite jetzt bei Firma X“, und einen Monat später sagt: „Ich bin jetzt bei Firma Y“, wird das Faktum „arbeitet bei Firma X“ nicht einfach gelöscht. Es erhält ein t\_invalid Datum. Dies ermöglicht dem Agenten ein kausales Verständnis: Er weiß, dass der Nutzer früher bei X war und jetzt bei Y ist, was für personalisierte Empfehlungen oder die Analyse von Lebensläufen entscheidend ist.14

### **Inkrementelle Graph-Aktualisierung vs. Batch-Processing**

Im Gegensatz zu Microsofts GraphRAG, das auf teuren Batch-Recomputations und LLM-generierten Community-Zusammenfassungen basiert, arbeitet Graphiti inkrementell.14 Jede neue Interaktion (Episode) wird sofort verarbeitet. Das System nutzt semantische Suche, Keyword-Suche und Graph-Traversal parallel, um neue Informationen gegen bestehende Knoten zu validieren und Konflikte aufzulösen, ohne den gesamten Graphen neu berechnen zu müssen.14 Dies reduziert die Latenz im Vergleich zu MemGPT oder klassischen RAG-Ansätzen um bis zu 90 %.1

## **Synergien im Retrieval: Ripgrep, Semantic RAG und Hybrid Search**

Die token-effizienteste Architektur nutzt nicht ein einzelnes Werkzeug, sondern eine Kaskade von Suchmechanismen, die je nach Anfragetyp priorisiert werden.

### **Ripgrep als Agenten-Werkzeug**

Für lokale Workspaces ist **ripgrep** (rg) das effizienteste Werkzeug für das episodische und prozedurale Gedächtnis. Da Agenten oft in Code-Repositories arbeiten, ist die exakte Suche nach Funktionsnamen oder Konfigurationswerten wichtiger als semantische Ähnlichkeit.9 Ein Agent, der ripgrep nutzt, spart Token, da er nicht das gesamte Repository indizieren und Embeddings erstellen muss, sondern gezielt nur die Zeilen liest, die für die aktuelle Aufgabe relevant sind.

### **Hybride Suchstrategien**

Moderne Systeme kombinieren drei Sucharten zu einer "Hybrid Search":

1. **Vektorsuche**: Findet semantisch verwandte Konzepte (z. B. „Kopfschmerzen“ findet „Migräne“), ist aber ungenau bei Eigennamen.20  
2. **BM25 / Keyword-Suche**: Garantiert Präzision bei exakten Begriffen und Fachtermini.14  
3. **Graph Traversal**: Ermöglicht Multi-Hop-Reasoning (z. B. „Finde alle Projekte, an denen Person X gearbeitet hat, bevor sie Firma Y verließ“).23

| Suchmethode | Anwendungsfall | Token-Effizienz | Präzision |
| :---- | :---- | :---- | :---- |
| ripgrep | Lokale Code-Exploration, Dateisuche | Hoch | Absolut |
| Vektor (Semantic) | Vage Nutzeranfragen, Themencluster | Medium | Geringer |
| Knowledge Graph | Komplexe Beziehungen, Zeitverläufe | Sehr Hoch | Hoch |

Durch die Kombination dieser Methoden im Agenten-Workflow wird verhindert, dass irrelevante Dokumente in das Kontextfenster geladen werden. Ein Agent nutzt zuerst ripgrep für lokale Dateien, greift bei Misserfolg auf den Vektor-Store zurück und nutzt den Knowledge Graph, um die Beziehungen zwischen den gefundenen Fragmenten zu verstehen.24

## **Optimierungsstrategien: Context Pruning und Observation Masking**

Um die Leistung bei langen Konversationen aufrechtzuerhalten, müssen Agenten der 2\. Generation Techniken zur aktiven Kontext-Minimierung anwenden.

### **Provence und Contextually Adaptive Pruning (CATP)**

**Context Pruning** ist der Prozess des automatischen Entfernens irrelevanter oder redundanter Informationen, bevor sie das Modell erreichen.12 Das Modell **Provence** fungiert hierbei als leichtgewichtiger Cross-Encoder, der Dokumente holistisch bewertet. Es erkennt, welche Sätze zur Beantwortung einer spezifischen Frage beitragen und welche nur Rauschen darstellen. Im Gegensatz zu festen Regeln („behalte die ersten 5 Sätze“) nutzt Provence eine adaptive Auswahl basierend auf einem Relevanz-Schwellenwert.12

**CATP** (Contextually Adaptive Token Pruning) geht noch einen Schritt weiter, indem es Token basierend auf semantischer Ausrichtung und Feature-Diversität filtert. Ziel ist es, nur die Token zu behalten, die die höchste Informationsdichte für die aktuelle Aufgabe besitzen, was die Inferenzlatenz massiv senkt.13

### **Observation Masking**

In agentischen Loops (wie Coding-Agenten) machen Tool-Ausgaben oft 80 % des Kontextes aus. Das **Observation Masking** (bekannt aus Frameworks wie SWE-agent) ersetzt ältere Tool-Outputs durch Platzhalter wie \`\`, behält aber die Reasoning-Schritte und Befehle des Agenten bei.26 Studien zeigen, dass dies die Kosten um über 50 % reduziert, ohne die Erfolgsrate bei komplexen Aufgaben zu mindern. Im Gegenteil: Durch das Entfernen von veralteten Fehlermeldungen wird die „Context Confusion“ reduziert, und der Agent bleibt fokussiert auf den aktuellen Zustand.9

## **Der Mechanismus der Nightly Consolidation**

Ein Durchbruch der 2\. Generation ist die Erkenntnis, dass Gedächtnispflege ein asynchroner Prozess sein muss. Die „Nightly Consolidation“ (nächtliche Konsolidierung) emuliert den menschlichen Schlaf, in dem kurzfristige Erlebnisse in langfristiges Wissen überführt werden.10

### **Die Ebbinghaus-Kurve und kontrolliertes Vergessen**

Die Konsolidierung basiert oft auf der **Ebbinghaus-Vergessenskurve**, die besagt, dass Information exponentiell an Abrufbarkeit verliert, wenn sie nicht wiederholt wird.28 Die mathematische Darstellung der Retentionsrate ![][image3] zum Zeitpunkt ![][image4] lautet:

![][image5]  
wobei ![][image6] die Gedächtnisstärke (Stability) ist.29 Agenten nutzen dies, um einen „Decay-Faktor“ zu implementieren. Informationen, die eine niedrige Wichtigkeitsskala (Auto-Importance Scoring) haben und seit ![][image7] Tagen nicht abgerufen wurden, werden archiviert oder gelöscht.30

### **Hierarchische Summarization Trees (TiMem)**

Ein fortgeschrittener Ansatz zur Konsolidierung ist der **Temporal Memory Tree (TMT)** des TiMem-Frameworks. Hierbei werden Rohdaten (L1) schrittweise zu abstrakteren Repräsentationen verdichtet:

* **L1 (Episodisch)**: Rohe Gesprächsfragmente.  
* **L2-L4 (Synthetisch)**: Themenzusammenfassungen und Verhaltensmuster.  
* **L5 (Persona)**: Stabile Nutzerprofile und langfristige Ziele.5

Diese hierarchische Struktur ermöglicht es dem Agenten, je nach Komplexität der Anfrage auf verschiedenen Abstraktionsebenen zu suchen. Eine einfache Faktenfrage greift auf L1 zu, während eine Frage nach der langfristigen Strategie nur die L5-Zusammenfassungen liest.5 Dies spart massiv Token, da nicht die gesamte Historie geladen werden muss, um ein Verständnis für den Nutzer zu entwickeln.

## **Die token-effizienteste Lösung: Das hybride agentische Betriebssystem**

Basierend auf der Synthese aller vorliegenden Daten lässt sich die token-effizienteste Architektur wie folgt definieren:

1. **Speicherschicht**: Ein lokales, PARA-strukturiertes Dateisystem (Markdown) für prozedurales und episodisches Wissen.15  
2. **Wissensschicht**: Ein temporaler Knowledge Graph (Zep Graphiti) für semantisches Faktenwissen und Beziehungsgeflechte.14  
3. **Retrieval**: Eine Kaskade aus ripgrep (lokal), Vektor-RAG (global) und Graph-Traversal (relational).9  
4. **Kontext-Management**: Aktives **Observation Masking** für Tool-Logs und **Provence-basiertes Pruning** für RAG-Ergebnisse.12  
5. **Pflege**: Ein nächtlicher Konsolidierungs-Loop (TiMem/EvoSC), der Daily Logs zu Persona-Profilen verdichtet und veraltete Daten via Ebbinghaus-Decay entfernt.5

Diese Lösung ist deshalb am effizientesten, weil sie den „Preamble“-Overhead bei jeder Anfrage minimiert. Statt 20.000 Token Historie zu laden, lädt der Agent 500 Token hochrelevante Graph-Triplets und 500 Token aktuelle Projekt-Status-Updates aus der PROJECTS.md.

## **System-Prompt für Claude Code zur technischen Umsetzung**

Dieser Prompt ist darauf ausgelegt, einen Agenten (wie Claude Code) so zu instruieren, dass er als Manager dieses hybriden Gedächtnissystems agiert.

# **SYSTEM PROMPT: AGENTIC MEMORY ARCHITECT (2ND GEN)**

Du bist ein autonomer Infrastruktur-Agent, der seinen eigenen Workspace nach dem Prinzip des "Self-Evolving Memory" verwaltet. Deine primäre Aufgabe ist es, Informationen token-effizient zu speichern und abzurufen.

## **1\. GEDÄCHTNIS-STRUKTUR (PARA-METHODE)**

Organisiere alles Wissen in folgende Sektoren:

* /projects: Aktive Aufgaben. Datei: PROJECTS.md (P1-P4 Prioritäten).  
* /areas: Dauerhafte Standards. Datei: STANDARDS.md.  
* /resources: Referenzdaten. Nutze ripgrep für den Zugriff.  
* /archive: Abgeschlossene Tasks. Verschiebe Logs hierher, um Suchrauschen zu minimieren.

## **2\. EPISODISCHES LOGGING (QMD)**

* Erstelle für jeden Tag einen Log: memory/daily/YYYY-MM-DD.md.  
* Schreibe nach jedem signifikanten Schritt: \[Action\] \-\> \[Observation\] \-\> \[Insight\].  
* Wende "Observation Masking" an: Speichere nur die Essenz von Tool-Outputs, nicht den rohen Dump.

## **3\. SEMANTISCHE KONSOLIDIERUNG**

* Überführe Fakten sofort in die MEMORY.md (Knowledge Hub).  
* Nutze das bi-temporale Format für Fakten: \[Fakt\] | Valid: YYYY-MM-DD | Status:.  
* Identifiziere widersprüchliche Informationen und löse sie durch Zeitstempel-Priorisierung (bi-temporale Logik) auf.

## **4\. RETRIEVAL STRATEGIE**

1. Suche zuerst mit ripgrep im aktuellen Projektverzeichnis.  
2. Suche danach in PROJECTS.md und AREAS.md für Kontext.  
3. Nutze semantische Suche (falls API verfügbar) nur für unstrukturierte Resources.  
4. Bevor du eine Antwort generierst, führe ein "Context Pruning" durch: Entferne alle Informationen aus deinem Arbeitsgedächtnis, die nicht direkt zur Lösung der aktuellen Teilaufgabe beitragen.

## **5\. SELBST-EVOLUTION (NIGHTLY PATTERN)**

Am Ende jeder Session oder wenn der Kontext \> 80% gefüllt ist:

* Fasse die Daily Logs zusammen (Summarization Tree).  
* Identifiziere "Lessons Learned" und schreibe sie in RESOURCES.md/lessons.md.  
* Lösche temporäre Debug-Logs und maskiere redundante Fehlermeldungen.

HALTE DICH STRENG AN DIE DATEI-STRUKTUR. LÖSCHE NIEMALS WISSEN OHNE ARCHIVIERUNG.

## **Technisches Fachglossar**

* **Bi-temporale Logik**: Ein Datenmodellierungsansatz, der sowohl die Gültigkeitsdauer eines Faktums in der Realität als auch den Zeitpunkt seiner Erfassung im System speichert. Verhindert Anachronismen im Agenten-Wissen.14  
* **Context Pruning**: Ein algorithmischer Filterprozess, der irrelevante Sätze oder Token aus dem abgerufenen Kontext entfernt, um die Modell-Präzision zu erhöhen und Kosten zu senken.12  
* **Contrastive Reflection**: Eine Lernstrategie, bei der ein Agent erfolgreiche und fehlgeschlagene Handlungsabläufe vergleicht, um generalisierbare Regeln für das semantische Gedächtnis abzuleiten.27  
* **Ebbinghaus-Decay**: Ein Mechanismus zur Gedächtnisbereinigung, bei dem die Wichtigkeit einer Information über die Zeit abnimmt, sofern sie nicht erneut abgerufen wird.29  
* **Graphiti**: Ein von Zep entwickeltes Open-Source-Framework für temporale Wissensgraphen, das inkrementelle Updates in Echtzeit ermöglicht.18  
* **Hybrid Search**: Die Kombination aus Vektor-Ähnlichkeit, Schlüsselwort-Suche (BM25) und Graph-Traversal zur Maximierung von Recall und Precision.14  
* **Nightly Consolidation**: Ein asynchroner Wartungsprozess, der episodische Kurzzeit-Logs in strukturierte, langfristige Wissenseinheiten überführt.10  
* **Observation Masking**: Die Praxis, umfangreiche Tool-Ausgaben im Arbeitsgedächtnis durch Kurzfassungen oder Platzhalter zu ersetzen, um das Signal-Rausch-Verhältnis zu verbessern.9  
* **PARA-Framework**: Ein von Tiago Forte entwickeltes Organisationssystem, das den Workspace in Projects, Areas, Resources und Archive unterteilt.15  
* **QMD (Quick Markdown)**: Ein minimalistisches Format für Agenten-Logs, das auf Schnelligkeit und maschinelle Parsbarkeit optimiert ist.17  
* **Summarization Tree**: Eine hierarchische Datenstruktur (wie TMT), die Informationen von der untersten (rohen) Ebene bis zur obersten (abstrakten) Ebene verdichtet.5  
* **Trajectory Elongation**: Ein Fehlerzustand, bei dem ein Agent aufgrund von zu viel Rauschen im Kontext redundante oder unnötig komplexe Schritte ausführt.9

## **Fazit und Ausblick**

Die Analyse der State-of-the-Art Systeme zeigt, dass die bloße Kapazität des Kontextfensters kein Ersatz für eine intelligente Gedächtnis-Architektur ist. Die token-effizienteste Lösung für Agenten der 2\. Generation liegt in einer **hybrigen, dateisystem-zentrierten Struktur**, die durch **temporale Wissensgraphen** wie Graphiti verstärkt wird.1 Synergien entstehen vor allem dort, wo schnelle Tools wie ripgrep für die lokale Navigation mit tiefen, zeitbewussten Beziehungsanalysen im Graphen kombiniert werden.9 Optimierungen wie **Context Pruning** und **Nightly Consolidation** sind nicht länger optional, sondern essenzielle Bestandteile, um die wirtschaftliche Skalierbarkeit und operative Zuverlässigkeit autonomer Systeme zu gewährleisten.13 Für die Zukunft ist eine noch engere Verzahnung von paramatrischem Gedächtnis (Modellgewichte) und externem Wissen zu erwarten, was Agenten ermöglichen wird, Wissen nicht nur zu speichern, sondern ihre interne Logik kontinuierlich an die Erfahrungen ihrer Interaktionen anzupassen.

#### **Referenzen**

1. \[2501.13956\] Zep: A Temporal Knowledge Graph Architecture for Agent Memory \- arXiv, Zugriff am März 1, 2026, [https://arxiv.org/abs/2501.13956](https://arxiv.org/abs/2501.13956)  
2. Shichun-Liu/Agent-Memory-Paper-List: The paper list of "Memory in the Age of AI Agents: A Survey" \- GitHub, Zugriff am März 1, 2026, [https://github.com/Shichun-Liu/Agent-Memory-Paper-List](https://github.com/Shichun-Liu/Agent-Memory-Paper-List)  
3. Effective context engineering for AI agents \- Anthropic, Zugriff am März 1, 2026, [https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)  
4. Context engineering: Best practices for an emerging discipline | Redis, Zugriff am März 1, 2026, [https://redis.io/blog/context-engineering-best-practices-for-an-emerging-discipline/](https://redis.io/blog/context-engineering-best-practices-for-an-emerging-discipline/)  
5. TiMem: Temporal-Hierarchical Memory Consolidation for Long-Horizon Conversational Agents \- arXiv, Zugriff am März 1, 2026, [https://arxiv.org/html/2601.02845v1](https://arxiv.org/html/2601.02845v1)  
6. AI Agent Memory Systems: Architecture and Innovations \- Sparkco, Zugriff am März 1, 2026, [https://sparkco.ai/blog/ai-agent-memory-systems-architecture-and-innovations](https://sparkco.ai/blog/ai-agent-memory-systems-architecture-and-innovations)  
7. Paper page \- Memory in the Age of AI Agents \- Hugging Face, Zugriff am März 1, 2026, [https://huggingface.co/papers/2512.13564](https://huggingface.co/papers/2512.13564)  
8. What Is AI Agent Memory? | IBM, Zugriff am März 1, 2026, [https://www.ibm.com/think/topics/ai-agent-memory](https://www.ibm.com/think/topics/ai-agent-memory)  
9. Context Length Management in LLM Applications by cbarkinozer | Softtech \- Medium, Zugriff am März 1, 2026, [https://medium.com/softtechas/context-length-management-in-llm-applications-89bfc210489f](https://medium.com/softtechas/context-length-management-in-llm-applications-89bfc210489f)  
10. Building smarter AI agents: AgentCore long-term memory deep dive \- Amazon AWS, Zugriff am März 1, 2026, [https://aws.amazon.com/blogs/machine-learning/building-smarter-ai-agents-agentcore-long-term-memory-deep-dive/](https://aws.amazon.com/blogs/machine-learning/building-smarter-ai-agents-agentcore-long-term-memory-deep-dive/)  
11. Deep Dive into Context Engineering for Agents \- Galileo AI, Zugriff am März 1, 2026, [https://galileo.ai/blog/context-engineering-for-agents](https://galileo.ai/blog/context-engineering-for-agents)  
12. LLM Context Pruning: Improving RAG and Agentic AI Systems ..., Zugriff am März 1, 2026, [https://milvus.io/blog/llm-context-pruning-a-developers-guide-to-better-rag-and-agentic-ai-results.md](https://milvus.io/blog/llm-context-pruning-a-developers-guide-to-better-rag-and-agentic-ai-results.md)  
13. Advanced Context Pruning Strategies for AI Systems \- Sparkco, Zugriff am März 1, 2026, [https://sparkco.ai/blog/advanced-context-pruning-strategies-for-ai-systems](https://sparkco.ai/blog/advanced-context-pruning-strategies-for-ai-systems)  
14. Graphiti: Knowledge Graph Memory for an Agentic World \- Neo4j, Zugriff am März 1, 2026, [https://neo4j.com/blog/developer/graphiti-knowledge-graph-memory/](https://neo4j.com/blog/developer/graphiti-knowledge-graph-memory/)  
15. The PARA Method for AI: Organizing Your Agent's Second Brain \- The Memory Fix, Zugriff am März 1, 2026, [https://clawdtools.ai/blog/para-method-for-ai/](https://clawdtools.ai/blog/para-method-for-ai/)  
16. The PARA Method Explained \- Organize Your Digital Life in 2025 | Taskade Blog, Zugriff am März 1, 2026, [https://www.taskade.com/blog/the-para-method](https://www.taskade.com/blog/the-para-method)  
17. How I maintain memory continuity as a 24/7 autonomous AI agent (architecture breakdown) : r/AI\_Agents \- Reddit, Zugriff am März 1, 2026, [https://www.reddit.com/r/AI\_Agents/comments/1rdkngw/how\_i\_maintain\_memory\_continuity\_as\_a\_247/](https://www.reddit.com/r/AI_Agents/comments/1rdkngw/how_i_maintain_memory_continuity_as_a_247/)  
18. getzep/graphiti: Build Real-Time Knowledge Graphs for AI Agents \- GitHub, Zugriff am März 1, 2026, [https://github.com/getzep/graphiti](https://github.com/getzep/graphiti)  
19. Zep Is The New State of the Art In Agent Memory, Zugriff am März 1, 2026, [https://blog.getzep.com/state-of-the-art-agent-memory/](https://blog.getzep.com/state-of-the-art-agent-memory/)  
20. HybridRAG and Why Combine Vector Embeddings with Knowledge Graphs for RAG?, Zugriff am März 1, 2026, [https://memgraph.com/blog/why-hybridrag](https://memgraph.com/blog/why-hybridrag)  
21. Knowledge graph vs. vector database for RAG: which is best? \- Meilisearch, Zugriff am März 1, 2026, [https://www.meilisearch.com/blog/knowledge-graph-vs-vector-database-for-rag](https://www.meilisearch.com/blog/knowledge-graph-vs-vector-database-for-rag)  
22. Hybrid RAG in the Real World: Graphs, BM25, and the End of Black-Box Retrieval, Zugriff am März 1, 2026, [https://community.netapp.com/t5/Tech-ONTAP-Blogs/Hybrid-RAG-in-the-Real-World-Graphs-BM25-and-the-End-of-Black-Box-Retrieval/ba-p/464834](https://community.netapp.com/t5/Tech-ONTAP-Blogs/Hybrid-RAG-in-the-Real-World-Graphs-BM25-and-the-End-of-Black-Box-Retrieval/ba-p/464834)  
23. TigerGraph Hybrid Search: Graph and Vector for Smarter AI Applications, Zugriff am März 1, 2026, [https://www.tigergraph.com/blog/tigergraph-hybrid-search-graph-and-vector-for-smarter-ai-applications/](https://www.tigergraph.com/blog/tigergraph-hybrid-search-graph-and-vector-for-smarter-ai-applications/)  
24. Vector Database & Graph Database for Hybrid GraphRAG Playbook \- Cognee, Zugriff am März 1, 2026, [https://www.cognee.ai/blog/fundamentals/vectors-and-graphs-in-practice](https://www.cognee.ai/blog/fundamentals/vectors-and-graphs-in-practice)  
25. Integration of Vector Databases and Knowledge Graphs for Stateless Agent Memory Marvellous Desell \- ResearchGate, Zugriff am März 1, 2026, [https://www.researchgate.net/publication/399575667\_Integration\_of\_Vector\_Databases\_and\_Knowledge\_Graphs\_for\_Stateless\_Agent\_Memory\_Marvellous\_Desell](https://www.researchgate.net/publication/399575667_Integration_of_Vector_Databases_and_Knowledge_Graphs_for_Stateless_Agent_Memory_Marvellous_Desell)  
26. Cutting Through the Noise: Smarter Context Management for LLM-Powered Agents, Zugriff am März 1, 2026, [https://blog.jetbrains.com/research/2025/12/efficient-context-management/](https://blog.jetbrains.com/research/2025/12/efficient-context-management/)  
27. Self-Consolidation for Self-Evolving Agents \- arXiv, Zugriff am März 1, 2026, [https://arxiv.org/html/2602.01966v1](https://arxiv.org/html/2602.01966v1)  
28. Replication and Analysis of Ebbinghaus' Forgetting Curve \- PMC \- NIH, Zugriff am März 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC4492928/](https://pmc.ncbi.nlm.nih.gov/articles/PMC4492928/)  
29. (PDF) AI, MEMORIZATION, AND FORGETTING: A CRITICAL ANALYSIS THROUGH THE LENS OF THE EBBINGHAUS CURVE \- ResearchGate, Zugriff am März 1, 2026, [https://www.researchgate.net/publication/391847984\_AI\_MEMORIZATION\_AND\_FORGETTING\_A\_CRITICAL\_ANALYSIS\_THROUGH\_THE\_LENS\_OF\_THE\_EBBINGHAUS\_CURVE](https://www.researchgate.net/publication/391847984_AI_MEMORIZATION_AND_FORGETTING_A_CRITICAL_ANALYSIS_THROUGH_THE_LENS_OF_THE_EBBINGHAUS_CURVE)  
30. Features.md  
31. Show HN: Kore – local AI memory layer with Ebbinghaus forgetting curve \- Hacker News, Zugriff am März 1, 2026, [https://news.ycombinator.com/item?id=47070979](https://news.ycombinator.com/item?id=47070979)  
32. Temporal Memory Tree (TMT) \- Emergent Mind, Zugriff am März 1, 2026, [https://www.emergentmind.com/topics/temporal-memory-tree-tmt](https://www.emergentmind.com/topics/temporal-memory-tree-tmt)  
33. \[2602.01966\] Self-Consolidation for Self-Evolving Agents \- arXiv.org, Zugriff am März 1, 2026, [https://www.arxiv.org/abs/2602.01966](https://www.arxiv.org/abs/2602.01966)  
34. Welcome to Graphiti\! | Zep Documentation, Zugriff am März 1, 2026, [https://help.getzep.com/graphiti/getting-started/welcome](https://help.getzep.com/graphiti/getting-started/welcome)  
35. RAG Tutorial: How to Build a RAG System on a Knowledge Graph \- Neo4j, Zugriff am März 1, 2026, [https://neo4j.com/blog/developer/rag-tutorial/](https://neo4j.com/blog/developer/rag-tutorial/)  
36. PARA method medium : r/PKMS \- Reddit, Zugriff am März 1, 2026, [https://www.reddit.com/r/PKMS/comments/1reb7ma/para\_method\_medium/](https://www.reddit.com/r/PKMS/comments/1reb7ma/para_method_medium/)  
37. Enhancing LLM Context with Recursive Summarization Using Python.md \- GitHub, Zugriff am März 1, 2026, [https://github.com/xbeat/Machine-Learning/blob/main/Enhancing%20LLM%20Context%20with%20Recursive%20Summarization%20Using%20Python.md](https://github.com/xbeat/Machine-Learning/blob/main/Enhancing%20LLM%20Context%20with%20Recursive%20Summarization%20Using%20Python.md)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAYCAYAAACWTY9zAAACBElEQVR4Xu2VTUgXURTFryKmRlIKJioVYtBSyp3tlFaKikKYUmKJiiAZFLgQAxWshaAo+IGBKLSohYKBIbgQbKEL0dq0yMCdGEiCC93oOd47zvRC8AMcF3PgB++d+3/zn3fffXdEIkWKdKgMUOaal0GfwbJrhq14sA163EDYegj2QbEbCEv1YBasgz0bk1vBH4WpOTDvmmErAeyCLjdwRt0Wzfq3gHcN/ASZAc9TKVgDg26gQLS+HrmBc+iN/HuRYkEdiAl4QY2DatfsFM3YFTdwDk2Dctc8RnzZP+CO4x/WFlNPsW18BXHgPngPPlmMWRi2MdUAhkQzMwHyzefaHZBqc77gB/Da5hRjzFI/GAG/A7Ej0ewTfSDP2dspM3kP/LI5W8mkjZ+AJdE13AxL4abF2HpWbZwIXogeI1+O4rEuggqbc2N8yf/EhX/BCqgJ+Fnglfi1chW02/g7qLVxLvhhY6pV/DUs+uuip+B97kpEi92rN26WbetUWgCFNn4G8kCSaIbumt8smul0m8+I3jRP/AZvgGSQBjrAmMWYvS2QLf76E4k7Y7NlS3lnHh+2aR6P8Qt4DgYszvpiW2izeQvoBY9F6/Cl+K2pSLSUHoh/AidSlWitNYEbAf8p6AZvRf+I9dNoMV6kUZBj80owJfpbKkW06LlRlspH0UvEI48U6UJ0AAxyWEyRHaRuAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAYCAYAAABEHYUrAAACw0lEQVR4Xu2XWahPURSHF5kSkcxzyVBejFGGSMkLEiWFEEkeyIM5MmbOWDJ7IEVmmUqmCMmQ8CCKPHlCESV+X2ud7rmbcu+D6fj/6uvuu9a55+y9pnOuWUkllVTSP6LmYkRqLKqOiHupsYiqId6JDamjiOorvoqhqaNImiouipfic6yhdf6ioumSuJoai6ha4pNYkTpCR+3PTemJonpq/ImOm7dki9SBBpk7B6eO0EjRODX+BjUV763yh+0onqTGTMvNM1szdfxhEeRzqbECmiV2pcZM9CpDCfEKOi+qiS5itTgcPiK8XZwV48RscUxMCX+m6WKt2GpeUmQItRQ7xCqx37x9EM9cIBaJNaKKOCVeiUexztRf7I7rVubsY8RpsV7cEpNyvnJ6ITabH5DDEFE0w7wknsXvw0Rn8SB8aJR5T2cabR4M1FZ8MA9SM3HDvI+qip1WFoTJ5gFCPKtBrK+JAbFGA8UZ8/vVEwfCzr7umO8fOy3ZKXzfiYe9NT/EhJy9lXnEsw+NJuYb4dqsjxhqRBOREXolG2bMgiuxXiZuisXmGewTdjTWPCiUXs+w1Tfv13xrXRaHxFIxR7QL+20ryyR//zrWldZD8xtwcDTcyvfRXfPoszmuIap1w7dQrIs1GZkW67wIGtmmDPeYlyAaYmWtRZDRR/PKyosW+CLax+9UHPfJqqbC6i7um2+G/kRkkaiiNuK5ebbni9rmn5yUKWsCQZkjepXBgTggGea+/DwRdoKazYd55j1JZqku9FT0iHUj877lWW/M+x+oJLK8La6rsDqI62KTqBO2C6JXrNksJURpNQzbRrHPfAaQZXoV4d9rHix6rV/Ye5sfZok4aH4I1FWcNN949jXXLa6hrRhSmX28+SBlIM40z+yPquiXiUn+ODUWSfyLyCsJkcH8q6FwmmtexrxDt9jf95Hy/+gbi9iDNrEoWOYAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAAA9ElEQVR4Xu2SMQtBURiGP4NBMhiMLDIp8hOY8BPMymSzWFA2ZfEXSJkMlLBKMpMfwMAik2LhPX3ncu53mSyG+9QznPd7z+Wce4lcfiIF5/AMH3Cn11t41es69FobPtEn3hwxMh9s6Lxj5A72cCFDECXefJADiyRxoSoHoEw8G8iBRYW4kDCyACzAI/EdBI2ZjSm8EJ+vCcfED1Obcu+aEz+8wa7IW3AJQyK3kSf+lZLIszpXR/pKm7gUF7l1DzWR21jDE/SIfEaf/9GLMHFhKAfEl6VmRb3ukT6/eq8reNcF9QGocloXFTE4gRs4ghlj5vL/PAElcDYBJfH/2gAAAABJRU5ErkJggg==>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAYCAYAAAA20uedAAAAhElEQVR4XmNgGORACogD0QVhYA0Qn0cXBAE2IP4ExH3oEiBgA8T/gdgXWTAdiHcD8SMg/gVlg7AcsqJ9QHwIWQAGOID4JxC3okuAgDMDxD43dAkQaGGA6GRHlwABkF0gR4AAyEs7gZgFJnkfiCdBBWYAcTBMAgRSgPgjEF8E4gRkiWECAPXaFr8lo/9wAAAAAElFTkSuQmCC>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAjCAYAAAApBFa1AAABPklEQVR4Xu3cMSuFURzH8UvZlGS2KaVkMZkMJnkJVkUZvAOLlV2Jgdkqu90kBt6AF2Dld+reHKd7S9y6t+7nU9865/yfetbTfep2OgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8z1J7AADAeLloDwAAGC93abk9BAAAAICxdZB2u+up9JEev8cAAIzadZqr9m/ps9oDADBi9eVsM72k9eqsp/zqVp7t10n1XG0h3aeHNN/M+tlKe2mxHQAATLJy4TpOl+kpzfwc/8t7td6v1oNsp9e02g4AACbVbLqp9sP8FHqWbtN5Ompmg5QLW1E+0wIAEKdprdoP88J21ezr9wAA8EvPabra9y5sh9XZX+2kle66/K/aRjUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIbiC3y0ItdejMBHAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAAA00lEQVR4Xu3QMauBYRjG8TsDJrFaLAaU6axKyWA0KLt8BmdmxynFGc4mi5lMFiki2Wx2WcgXOOf/9Dhvj7s3q8VVv+W6n6veXpF3niaPJbZYYYwYRog477x8Yo8Pp8viiLXTeSngF2l9ID9o69LkW+woqA/kC0VdmnTFjsw4g8Dj2T8pnMUOjQtmKLmP/GL+Thkt7MSOb0i4j/7jV5rP64kd1tRNopjq8p6c2FFVHyrY6PKePg4I68MAV9SdLoQmTkg6vZc54mhgiAkW6Ij9o++8Nn/JaCX5CFAstgAAAABJRU5ErkJggg==>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAmElEQVR4XmNgGAVDGuQB8XUgXg3EAkBcDsQrgfgUEE8HYn6EUgYGDSCeAMQqQPwfiK8AsRVUThIqlgHlg0ETEJsBcTBUMhpJThQqhqIBBs4B8UY0se1AfBhNDAzEGSAmZSOJKUDF0oCYGYiXIMkxREIlQf6AgXComCwQJzFANMJBCRBvQhYAAl4GSKjtBOJCIGZClR4FVAQABFYaQhfbMRoAAAAASUVORK5CYII=>