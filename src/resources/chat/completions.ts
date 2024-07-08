// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as CompletionsAPI from './completions';

export class Completions extends APIResource {
  /**
   * Chat Completion
   */
  create(body: CompletionCreateParams, options?: Core.RequestOptions): Core.APIPromise<ChatCompletion> {
    return this._client.post('/v1/chat', { body, ...options });
  }
}

export interface ChatCompletion {
  messages: Array<ChatCompletion.Message>;

  model: string;

  time_info: ChatCompletion.TimeInfo;

  token_info: ChatCompletion.TokenInfo;
}

export namespace ChatCompletion {
  export interface Message {
    role: 'user' | 'assistant';

    content?: string;
  }

  export interface TimeInfo {
    input_inference_time?: number;

    output_inference_time?: number;

    start_time?: number;

    total_inference_time?: number;
  }

  export interface TokenInfo {
    input_tokens?: number;

    output_tokens?: number;

    total_tokens?: number;
  }
}

export interface CompletionCreateParams {
  messages: Array<CompletionCreateParams.Message>;

  model: 'llama3-8b-8192';

  max_tokens?: number;

  prompt?: string;

  seed?: number;

  stop_sequence?: string;

  stream?: boolean;

  temperature?: number;

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
