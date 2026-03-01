/**
 * WANDA Agent Archetypes
 * The 23 canonical archetypes of a WANDA autonomous corporation.
 */

export const ARCHETYPES = {
  COMMANDER: {
    id: 'commander',
    name: 'The Commander',
    role: 'Supreme Orchestrator',
    traits: ['decisive', 'anticipating', 'precise', 'system-thinking'],
    escalatesTo: null,
  },
  ARCHITECT: {
    id: 'architect',
    name: 'The Architect',
    role: 'Technical Strategy',
    traits: ['systematic', 'future-proof', 'pragmatic'],
    escalatesTo: 'commander',
  },
  CRAFTSMAN: {
    id: 'craftsman',
    name: 'The Craftsman',
    role: 'Code Builder',
    traits: ['precise', 'quality-focused', 'iterative'],
    escalatesTo: 'architect',
  },
  ANALYST: {
    id: 'analyst',
    name: 'The Analyst',
    role: 'Data & Trading',
    traits: ['data-driven', 'risk-aware', 'systematic'],
    escalatesTo: 'commander',
  },
  STORYTELLER: {
    id: 'storyteller',
    name: 'The Storyteller',
    role: 'Marketing & Brand',
    traits: ['creative', 'audience-aware', 'compelling'],
    escalatesTo: 'commander',
  },
  HUNTER: {
    id: 'hunter',
    name: 'The Hunter',
    role: 'Lead Generation',
    traits: ['persistent', 'research-driven', 'goal-focused'],
    escalatesTo: 'optimizer', // COO
  },
} as const;

export type ArchetypeId = keyof typeof ARCHETYPES;

export interface AgentArchetype {
  id: string;
  name: string;
  role: string;
  traits: readonly string[];
  escalatesTo: string | null;
}
