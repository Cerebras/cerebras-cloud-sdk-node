// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as CompletionsAPI from './completions';
import { Stream } from '../../streaming';

export class Completions extends APIResource {
  /**
   * Chat
   */
  create(
    params: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ChatCompletion> 
  | Core.APIPromise<Stream<CompletionCreateResponse.ChatChunkResponse>> 
  | Core.APIPromise<Stream<CompletionCreateResponse.ErrorChunkResponse>> {
    const { 'X-Amz-Cf-Id': xAmzCfId, ...body } = params;
    return this._client.post('/v1/chat/completions', {
      body,
      ...options,
      stream: body.stream ?? false,
      headers: { ...(xAmzCfId != null ? { 'X-Amz-Cf-Id': xAmzCfId } : undefined), ...options?.headers },
    }) as
      | Core.APIPromise<ChatCompletion>
      | Core.APIPromise<Stream<CompletionCreateResponse.ChatChunkResponse>>
      | Core.APIPromise<Stream<CompletionCreateResponse.ErrorChunkResponse>>;
  }
}

export interface ChatCompletion {
  id: string;

  choices: Array<ChatCompletion.Choice>;

  created: number;

  model: 'llama3-8b-8192' | 'llama3-70b-8192';

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

    logprobs?: Choice.Logprobs | null;
    [k: string]: unknown;
  }

  export namespace Choice {
    export interface Message {
      role: 'assistant';

      content?: string | null;
      [k: string]: unknown;
    }

    export interface Logprobs {
      content: Logprobs.Content;
    }

    export namespace Logprobs {
      export interface Content {
        token: string;

        logprob: number;

        top_logprobs: Content.TopLogprobs;

        bytes?: Array<number> | null;
      }

      export namespace Content {
        export interface TopLogprobs {
          token: string;

          logprob: number;

          bytes?: Array<number> | null;
        }
      }
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

    model: 'llama3-8b-8192' | 'llama3-70b-8192';

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

      logprobs?: Choice.Logprobs | null;
      [k: string]: unknown;
    }

    export namespace Choice {
      export interface Delta {
        content?: string | null;

        role?: 'assistant' | null;
        [k: string]: unknown;
      }

      export interface Logprobs {
        content: Logprobs.Content;
      }

      export namespace Logprobs {
        export interface Content {
          token: string;

          logprob: number;

          top_logprobs: Content.TopLogprobs;

          bytes?: Array<number> | null;
        }

        export namespace Content {
          export interface TopLogprobs {
            token: string;

            logprob: number;

            bytes?: Array<number> | null;
          }
        }
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
  /**
   * Body param:
   */
  messages: Array<
    | CompletionCreateParams.SystemMessageRequest
    | CompletionCreateParams.UserMessageRequest
    | CompletionCreateParams.AssistantMessageRequest
  >;

  /**
   * Body param:
   */
  model: 'llama3-8b-8192' | 'llama3-70b-8192';

  /**
   * Body param: The maximum number of tokens that can be generated in the chat
   * completion. The total length of input tokens and generated tokens is limited by
   * the model's context length.
   */
  max_tokens?: number | null;

  /**
   * Body param: If specified, our system will make a best effort to sample
   * deterministically, such that repeated requests with the same `seed` and
   * parameters should return the same result. Determinism is not guaranteed.
   */
  seed?: number | null;

  /**
   * Body param: Up to 4 sequences where the API will stop generating further tokens.
   * The returned text will not contain the stop sequence.
   */
  stop?: string | Array<string> | null;

  /**
   * Body param:
   */
  stream?: boolean | null;

  /**
   * Body param: What sampling temperature to use, between 0 and 2. Higher values
   * like 0.8 will make the output more random, while lower values like 0.2 will make
   * it more focused and deterministic. We generally recommend altering this or
   * `top_p` but not both.
   */
  temperature?: number | null;

  /**
   * Body param: An alternative to sampling with temperature, called nucleus
   * sampling, where the model considers the results of the tokens with top_p
   * probability mass. So 0.1 means only the tokens comprising the top 10%
   * probability mass are considered. We generally recommend altering this or
   * `temperature` but not both.
   */
  top_p?: number | null;

  /**
   * Body param: A unique identifier representing your end-user, which can help
   * Cerebras to monitor and detect abuse.
   */
  user?: string | null;

  /**
   * Header param:
   */
  'X-Amz-Cf-Id'?: string | null;
}

export namespace CompletionCreateParams {
  export interface SystemMessageRequest {
    content: string;

    role: 'system';

    name?: string | null;
    [k: string]: unknown;
  }

  export interface UserMessageRequest {
    content: string | Array<UserMessageRequest.UnionMember1>;

    role: 'user';

    name?: string | null;
    [k: string]: unknown;
  }

  export namespace UserMessageRequest {
    export interface UnionMember1 {
      text: string;

      type: 'text';
      [k: string]: unknown;
    }
  }

  export interface AssistantMessageRequest {
    content: string;

    role: 'assistant';

    name?: string | null;
    [k: string]: unknown;
  }
}

export namespace Completions {
  export import ChatCompletion = CompletionsAPI.ChatCompletion;
  export import CompletionCreateResponse = CompletionsAPI.CompletionCreateResponse;
  export import CompletionCreateParams = CompletionsAPI.CompletionCreateParams;
}
