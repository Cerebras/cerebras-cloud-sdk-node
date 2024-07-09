// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as CompletionsAPI from './completions';

export class Completions extends APIResource {
  /**
   * Chat
   */
  create(body: CompletionCreateParams, options?: Core.RequestOptions): Core.APIPromise<ChatCompletion> {
    return this._client.post('/v1/chat/completions', { body, ...options });
  }
}

export interface ChatCompletion {
  messages: Array<ChatCompletion.Message>;

  model: 'llama3-8b-8192';

  finish_reason?: unknown;

  time_info?: ChatCompletion.TimeInfo | null;

  usage?: ChatCompletion.Usage | null;
}

export namespace ChatCompletion {
  export interface Message {
    role: unknown;

    content?: string;
  }

  export interface TimeInfo {
    completion_time?: number;

    creation?: number;

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

export interface CompletionCreateParams {
  messages: Array<CompletionCreateParams.Message>;

  model: 'llama3-8b-8192';

  /**
   * The maximum number of [tokens](/tokenizer) that can be generated in the
   * completion. The token count of your prompt plus `max_tokens` cannot exceed the
   * model's context length.
   */
  max_tokens?: number;

  prompt?: string;

  /**
   * If specified, our system will make a best effort to sample deterministically,
   * such that repeated requests with the same `seed` and parameters should return
   * the same result. Determinism is not guaranteed.
   */
  seed?: number;

  /**
   * Up to 4 sequences where the API will stop generating further tokens. The
   * returned text will not contain the stop sequence.
   */
  stop_sequence?: string;

  stream?: boolean;

  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
   * make the output more random, while lower values like 0.2 will make it more
   * focused and deterministic. We generally recommend altering this or `top_p` but
   * not both.
   */
  temperature?: number;

  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the
   * model considers the results of the tokens with top_p probability mass. So 0.1
   * means only the tokens comprising the top 10% probability mass are considered. We
   * generally recommend altering this or `temperature` but not both.
   */
  top_p?: number;
}

export namespace CompletionCreateParams {
  export interface Message {
    role: 'user' | 'assistant';

    content?: string;
  }
}

export namespace Completions {
  export import ChatCompletion = CompletionsAPI.ChatCompletion;
  export import CompletionCreateParams = CompletionsAPI.CompletionCreateParams;
}
