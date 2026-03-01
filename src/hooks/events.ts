/**
 * WANDA Hook System — Provider-Agnostic Middleware
 * Core event types for the WANDA execution loop.
 */

export type WandaProvider = 'claude' | 'gemini' | 'codex' | 'mistral' | 'local';

export type WandaHookEventType =
  | 'PrePrompt'
  | 'PreModelCall'
  | 'PostModelCall'
  | 'PreToolUse'
  | 'PostToolUse'
  | 'PostToolUseFailure'
  | 'PreResponse'
  | 'Stop'
  | 'SessionStart'
  | 'SessionEnd'
  | 'SubagentStart'
  | 'SubagentStop'
  | 'TaskCompleted';

export interface WandaHookEvent {
  type: WandaHookEventType;
  provider: WandaProvider;
  agentId: string;
  sessionId: string;
  timestamp: string;
  payload: Record<string, unknown>;
}

export type HookAction = 'allow' | 'deny' | 'modify' | 'stop';

export interface HookDecision {
  action: HookAction;
  reason?: string;
  /** Modified payload — only used when action === 'modify' */
  payload?: Record<string, unknown>;
}

/** Blockable events — exit code 2 or decision.action='deny' stops execution */
export const BLOCKABLE_EVENTS: WandaHookEventType[] = [
  'PrePrompt',
  'PreModelCall',
  'PreToolUse',
  'PreResponse',
  'Stop',
  'SubagentStart',
  'SubagentStop',
  'TaskCompleted',
];
