/**
 * WANDA Core Types
 */

export type SessionKey = string;

export interface AgentConfig {
  id: string;
  name: string;
  model: string;
  thinking?: 'off' | 'low' | 'medium' | 'high';
  workspace?: string;
  description?: string;
  archetype?: string;
  subagents?: { allowAgents?: string[]; maxConcurrent?: number; maxSpawnDepth?: number };
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface MemoryFact {
  id: number;
  fact: string;
  validFrom: string;
  status: 'active' | 'deprecated';
  category?: string;
}

export interface LogEntry {
  action: string;
  observation: string;
  insight: string;
}

export interface CronConfig {
  name: string;
  schedule: string;
  agentId: string;
  task: string;
  model?: string;
  enabled?: boolean;
  timeoutSeconds?: number;
}

export interface WandaConfig {
  gateway: { port: number; host: string; auth: { token: string } };
  agents: { list: AgentConfig[]; defaults?: Partial<AgentConfig> };
  session: { agentToAgent?: { maxPingPongTurns: number } };
  tools: {
    agentToAgent?: { enabled: boolean; allow: string[] };
    sessions?: { visibility: 'self' | 'tree' | 'agent' | 'all' };
  };
  crons?: { jobs: CronConfig[] };
}
