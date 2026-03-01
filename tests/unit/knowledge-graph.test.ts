import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { KnowledgeGraph } from '../../src/memory/knowledge-graph.js';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('KnowledgeGraph', () => {
  let tmpDir: string;
  let kg: KnowledgeGraph;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), 'wanda-test-'));
    kg = new KnowledgeGraph(tmpDir);
  });

  afterEach(() => { rmSync(tmpDir, { recursive: true }); });

  it('adds and retrieves a fact', () => {
    const id = kg.add('WANDA is live', 'system');
    expect(id).toBeGreaterThan(0);
    const results = kg.search('WANDA');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].status).toBe('active');
  });

  it('deprecates a fact correctly', () => {
    const id = kg.add('Old fact', 'test');
    kg.deprecate(id, 'replaced');
    const results = kg.search('Old fact');
    const active = results.filter(f => f.status === 'active');
    expect(active).toHaveLength(0);
  });

  it('returns recent facts in descending order', () => {
    kg.add('Fact A'); kg.add('Fact B'); kg.add('Fact C');
    const recent = kg.recent(3);
    expect(recent.length).toBe(3);
  });
});
