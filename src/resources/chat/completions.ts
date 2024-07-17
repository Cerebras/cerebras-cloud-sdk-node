// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as CompletionsAPI from './completions';

export class Completions extends APIResource {
  /**
   * Chat
   */
  create(
    body: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CompletionCreateResponse> {
    return this._client.post('/v1/chat/completions', { body, ...options });
  }
}

export interface ChatCompletion {
  id: string;

  choices: Array<ChatCompletion.Choice>;

  created: number;

  model: 'llama3-8b-8192';

  object: 'chat.completion';

  system_fingerprint: string;

  time_info: ChatCompletion.TimeInfo;

  usage: ChatCompletion.Usage;
}

export namespace ChatCompletion {
  export interface Choice {
    finish_reason: 'stop' | 'length' | 'content_filter' | 'tool_calls';

    index: number;

    message: Choice.Message;
  }

  export namespace Choice {
    export interface Message {
      role: 'assistant';

      content?: string | null;
    }
  }

  export interface TimeInfo {
    completion_time?: number;

    prompt_time?: number;

    queue_time?: number;

    total_time?: number;
  }

  export interface Usage {
    completion_tokens?: number;

    prompt_tokens?: number;

    total_tokens?: number;
  }
}

export type CompletionCreateResponse =
  | ChatCompletion
  | CompletionCreateResponse.ChatChunkResponse
  | CompletionCreateResponse.ErrorChunkResponse;

export namespace CompletionCreateResponse {
  export interface ChatChunkResponse {
    id: string;

    choices: Array<ChatChunkResponse.Choice>;

    created: number;

    model: 'llama3-8b-8192';

    object: 'chat.completion.chunk';

    system_fingerprint: string;

    time_info?: ChatChunkResponse.TimeInfo | null;

    usage?: ChatChunkResponse.Usage | null;
  }

  export namespace ChatChunkResponse {
    export interface Choice {
      delta: Choice.Delta;

      index: number;

      finish_reason?: 'stop' | 'length' | 'content_filter' | 'tool_calls' | null;
    }

    export namespace Choice {
      export interface Delta {
        content?: string | null;

        role?: 'assistant' | null;
      }
    }

    export interface TimeInfo {
      completion_time?: number;

      prompt_time?: number;

      queue_time?: number;

      total_time?: number;
    }

    export interface Usage {
      completion_tokens?: number;

      prompt_tokens?: number;

      total_tokens?: number;
    }
  }

  export interface ErrorChunkResponse {
    content: ErrorChunkResponse.Content;

    status_code: number;
  }

  export namespace ErrorChunkResponse {
    export interface Content {
      code?: string | null;

      message?: string | null;

      param?: string | null;

      type?: string | null;
    }
  }
}

export interface CompletionCreateParams {
  messages: Array<
    | CompletionCreateParams.SystemMessageRequest
    | CompletionCreateParams.UserMessageRequest
    | CompletionCreateParams.AssistantMessageRequest
  >;

  model: 'llama3-8b-8192';

  /**
   * The maximum number of [tokens](/tokenizer) that can be generated in the
   * completion. The token count of your plus `max_tokens` cannot exceed the model's
   * context length.
   */
  max_tokens?: number | null;

  /**
   * If specified, our system will make a best effort to sample deterministically,
   * such that repeated requests with the same `seed` and parameters should return
   * the same result. Determinism is not guaranteed.
   */
  seed?: number | null;

  /**
   * Up to 4 sequences where the API will stop generating further tokens. The
   * returned text will not contain the stop sequence.
   */
  stop?: string | Array<string> | null;

  stream?: boolean | null;

  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
   * make the output more random, while lower values like 0.2 will make it more
   * focused and deterministic. We generally recommend altering this or `top_p` but
   * not both.
   */
  temperature?: number | null;

  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the
   * model considers the results of the tokens with top_p probability mass. So 0.1
   * means only the tokens comprising the top 10% probability mass are considered. We
   * generally recommend altering this or `temperature` but not both.
   */
  top_p?: number | null;

  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor
   * and detect abuse.
   */
  user?: string | null;
}

export namespace CompletionCreateParams {
  export interface SystemMessageRequest {
    content: string;

    role: 'system';

    name?: string | null;
  }

  export interface UserMessageRequest {
    content: string | Array<UserMessageRequest.UnionMember1>;

    role: 'user';

    name?: string | null;
  }

  export namespace UserMessageRequest {
    export interface UnionMember1 {
      text: string;

      type: 'text';
    }
  }

  export interface AssistantMessageRequest {
    content: string;

    role: 'assistant';

    name?: string | null;
  }
}

export namespace Completions {
  export import ChatCompletion = CompletionsAPI.ChatCompletion;
  export import CompletionCreateResponse = CompletionsAPI.CompletionCreateResponse;
  export import CompletionCreateParams = CompletionsAPI.CompletionCreateParams;
}
