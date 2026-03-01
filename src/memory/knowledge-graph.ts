/**
 * WANDA Bi-temporal Knowledge Graph
 * SQLite-backed fact store with valid-time tracking.
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { MemoryFact } from '../types/index.js';

export class KnowledgeGraph {
  private dbPath: string;

  constructor(workspacePath: string) {
    this.dbPath = join(workspacePath, 'core', 'knowledge_graph.db');
    mkdirSync(join(workspacePath, 'core'), { recursive: true });
    this.init();
  }

  private sql(query: string): string {
    return execSync(`sqlite3 "${this.dbPath}" "${query.replace(/"/g, '\\"')}"`, {
      encoding: 'utf-8',
    }).trim();
  }

  private init(): void {
    this.sql(`
      CREATE TABLE IF NOT EXISTS facts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fact TEXT NOT NULL,
        valid_from TEXT NOT NULL,
        valid_to TEXT,
        status TEXT DEFAULT 'active',
        category TEXT DEFAULT 'general',
        source TEXT
      )
    `);
  }

  add(fact: string, category = 'general', source?: string): number {
    const today = new Date().toISOString().split('T')[0];
    this.sql(
      `INSERT INTO facts (fact, valid_from, category, source) VALUES ('${fact.replace(/'/g, "''")}', '${today}', '${category}', '${source ?? ''}')`
    );
    const id = parseInt(this.sql('SELECT last_insert_rowid()'), 10);
    return id;
  }

  search(query: string): MemoryFact[] {
    const rows = this.sql(
      `SELECT id, fact, valid_from, status, category FROM facts WHERE fact LIKE '%${query.replace(/'/g, "''")}%' AND status='active' ORDER BY id DESC LIMIT 20`
    );
    if (!rows) return [];
    return rows.split('\n').map((row) => {
      const [id, fact, validFrom, status, category] = row.split('|');
      return { id: parseInt(id), fact, validFrom, status: status as 'active', category };
    });
  }

  deprecate(id: number, reason: string): void {
    const today = new Date().toISOString().split('T')[0];
    this.sql(`UPDATE facts SET status='deprecated', valid_to='${today}' WHERE id=${id}`);
    this.add(`DEPRECATED id=${id}: ${reason}`, 'system');
  }

  recent(limit = 10): MemoryFact[] {
    const rows = this.sql(
      `SELECT id, fact, valid_from, status, category FROM facts WHERE status='active' ORDER BY id DESC LIMIT ${limit}`
    );
    if (!rows) return [];
    return rows.split('\n').map((row) => {
      const [id, fact, validFrom, status, category] = row.split('|');
      return { id: parseInt(id), fact, validFrom, status: status as 'active', category };
    });
  }
}
