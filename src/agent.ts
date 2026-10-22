export interface AgentTurnMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  tool_calls?: Array<{
    id: string;
    type: 'function';
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
}

export interface RunAgentOptions {
  maxTurns?: number;
  onToolCall?: (toolCall: {
    id: string;
    name: string;
    arguments: string;
  }) => Promise<string> | string;
}

export interface AgentRunner {
  step: (messages: AgentTurnMessage[]) => Promise<AgentTurnMessage>;
}

export interface RunAgentResult {
  messages: AgentTurnMessage[];
  finalOutput: string | null;
  turnsUsed: number;
  reachedMaxTurns: boolean;
}

const DEFAULT_MAX_TURNS = 10;

export async function runAgent(
  agent: AgentRunner,
  initialMessages: AgentTurnMessage[],
  options: RunAgentOptions = {},
): Promise<RunAgentResult> {
  const maxTurns = options.maxTurns ?? DEFAULT_MAX_TURNS;
  if (!Number.isInteger(maxTurns) || maxTurns < 1) {
    throw new Error('maxTurns must be a positive integer');
  }

  const messages: AgentTurnMessage[] = [...initialMessages];
  let turnsUsed = 0;

  while (turnsUsed < maxTurns) {
    turnsUsed += 1;
    const response = await agent.step(messages);
    messages.push(response);

    if (!response.tool_calls || response.tool_calls.length === 0) {
      return {
        messages,
        finalOutput: response.content,
        turnsUsed,
        reachedMaxTurns: false,
      };
    }

    if (!options.onToolCall) {
      return {
        messages,
        finalOutput: response.content,
        turnsUsed,
        reachedMaxTurns: turnsUsed >= maxTurns,
      };
    }

    for (const tc of response.tool_calls) {
      const toolOutput = await options.onToolCall({
        id: tc.id,
        name: tc.function.name,
        arguments: tc.function.arguments,
      });
      messages.push({
        role: 'tool',
        tool_call_id: tc.id,
        content: toolOutput,
      });
    }
  }

  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
  return {
    messages,
    finalOutput: lastAssistant?.content ?? null,
    turnsUsed,
    reachedMaxTurns: true,
  };
}

export const run = runAgent;
