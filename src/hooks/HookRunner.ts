/**
 * WANDA HookRunner — executes hooks for a given event.
 * 
 * Hook handlers are shell commands, HTTP endpoints, or LLM prompts.
 * Identical API to Claude Code hooks but provider-agnostic.
 */

import { execSync } from 'child_process';
import { WandaHookEvent, HookDecision, BLOCKABLE_EVENTS } from './events.js';

export interface HookHandlerConfig {
  type: 'command' | 'http' | 'prompt';
  command?: string;
  url?: string;
  prompt?: string;
  timeout?: number;
  async?: boolean;
}

export interface HookMatcherGroup {
  matcher?: string;
  hooks: HookHandlerConfig[];
}

export type HookRegistry = Partial<Record<string, HookMatcherGroup[]>>;

export class HookRunner {
  constructor(private registry: HookRegistry) {}

  async run(event: WandaHookEvent): Promise<HookDecision> {
    const groups = this.registry[event.type] ?? [];
    const input = JSON.stringify(event);
    const blockable = BLOCKABLE_EVENTS.includes(event.type);

    for (const group of groups) {
      // Matcher: regex against tool_name or event type
      if (group.matcher && group.matcher !== '*') {
        const toolName = String(event.payload?.tool_name ?? '');
        if (!new RegExp(group.matcher).test(toolName)) continue;
      }

      for (const handler of group.hooks) {
        if (handler.type === 'command' && handler.command) {
          try {
            const result = execSync(handler.command, {
              input,
              timeout: (handler.timeout ?? 30) * 1000,
              encoding: 'utf8',
            });
            // Parse JSON decision from stdout
            try {
              const decision = JSON.parse(result.trim()) as HookDecision;
              if (decision.action === 'deny' && blockable) return decision;
              if (decision.action === 'stop') return decision;
              if (decision.action === 'modify') return decision;
            } catch {
              // Non-JSON stdout — treat as context injection, allow
            }
          } catch (err: any) {
            if (err.status === 2 && blockable) {
              return {
                action: 'deny',
                reason: err.stderr?.toString() ?? 'Blocked by hook',
              };
            }
            // Non-blocking error — continue
          }
        }
        // HTTP and prompt handlers: to be implemented
      }
    }

    return { action: 'allow' };
  }
}
