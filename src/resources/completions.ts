// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import { Stream } from '../streaming';

export class Completions extends APIResource {
  /**
   * Completions
   */
  create(
    params: CompletionCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Completion>;
  create(
    params: CompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Stream<Completion.CompletionResponse>>;
  create(
    params: CompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Stream<Completion.CompletionResponse> | Completion>;
  create(
    params: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Completion> | Core.APIPromise<Stream<Completion.CompletionResponse>> {
    const { 'X-Amz-Cf-Id': xAmzCfId, 'X-delay-time': xDelayTime, ...body } = params;
    return this._client.post('/v1/completions', {
      body,
      ...options,
      stream: body.stream ?? false,
      headers: {
        ...(xAmzCfId != null ? { 'X-Amz-Cf-Id': xAmzCfId } : undefined),
        ...(xDelayTime?.toString() != null ? { 'X-delay-time': xDelayTime?.toString() } : undefined),
        ...options?.headers,
      },
    }) as Core.APIPromise<Completion> | Core.APIPromise<Stream<Completion.CompletionResponse>>;
  }
}

export type Completion = Completion.CompletionResponse | Completion.ErrorChunkResponse;

export namespace Completion {
  export interface CompletionResponse {
    id: string;

    choices: Array<CompletionResponse.Choice>;

    created: number;

    model: string;

    object: 'text_completion';

    system_fingerprint: string;

    time_info?: CompletionResponse.TimeInfo | null;

    usage?: CompletionResponse.Usage | null;
    [k: string]: unknown;
  }

  export namespace CompletionResponse {
    export interface Choice {
      index: number;

      finish_reason?: 'stop' | 'length' | 'content_filter' | null;

      logprobs?: Choice.Logprobs | null;

      text?: string | null;

      tokens?: Array<number> | null;
      [k: string]: unknown;
    }

    export namespace Choice {
      export interface Logprobs {
        content: Logprobs.Content;
        [k: string]: unknown;
      }

      export namespace Logprobs {
        export interface Content {
          token: string;

          logprob: number;

          top_logprobs: Content.TopLogprobs;

          bytes?: Array<number> | null;
          [k: string]: unknown;
        }

        export namespace Content {
          export interface TopLogprobs {
            token: string;

            logprob: number;

            bytes?: Array<number> | null;
            [k: string]: unknown;
          }
        }
      }
    }

    export interface TimeInfo {
      completion_time?: number;

      prompt_time?: number;

      queue_time?: number;

      total_time?: number;
      [k: string]: unknown;
    }

    export interface Usage {
      completion_tokens?: number;

      prompt_tokens?: number;

      total_tokens?: number;
      [k: string]: unknown;
    }
  }

  export interface ErrorChunkResponse {
    error: ErrorChunkResponse.Error;

    status_code: number;
    [k: string]: unknown;
  }

  export namespace ErrorChunkResponse {
    export interface Error {
      code?: string | null;

      message?: string | null;

      param?: string | null;

      type?: string | null;
      [k: string]: unknown;
    }
  }
}

// This enables us to do matching against the parameter to overload the function and know what the
// return type will be (whether with or without streaming).
export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
  stream?: false | null;
}

export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
  stream: true;
}

export interface CompletionCreateParamsBase {
  /**
   * Body param:
   */
  model: string;

  /**
   * Body param: Generates `best_of` completions server-side and returns the "best"
   * (the one with the highest log probability per token). Results cannot be
   * streamed. When used with `n`, `best_of` controls the number of candidate
   * completions and `n` specifies how many to return – `best_of` must be greater
   * than `n`. **Note:** Because this parameter generates many completions, it can
   * quickly consume your token quota. Use carefully and ensure that you have
   * reasonable settings for `max_tokens` and `stop`
   */
  best_of?: number | null;

  /**
   * Body param: Echo back the prompt in addition to the completion
   */
  echo?: boolean | null;

  /**
   * Body param: Number between -2.0 and 2.0. Positive values penalize new tokens
   * based on their existing frequency in the text so far, decreasing the model's
   * likelihood to repeat the same line verbatim.
   */
  frequency_penalty?: number | null;

  /**
   * Body param: The grammar root used for structured output generation.
   */
  grammar_root?: string | null;

  /**
   * Body param: Modify the likelihood of specified tokens appearing in the
   * completion.
   *
   * Accepts a JSON object that maps tokens (specified by their token ID in the
   * tokenizer) to an associated bias value from -100 to 100. Mathematically, the
   * bias is added to the logits generated by the model prior to sampling. The exact
   * effect will vary per model, but values between -1 and 1 should decrease or
   * increase likelihood of selection; values like -100 or 100 should result in a ban
   * or exclusive selection of the relevant token.
   */
  logit_bias?: unknown | null;

  /**
   * Body param: Whether to return log probabilities of the output tokens or not. If
   * true, returns the log probabilities of each output token returned in the content
   * of message.
   */
  logprobs?: boolean | null;

  /**
   * Body param: The maximum number of tokens that can be generated in the chat
   * completion. The total length of input tokens and generated tokens is limited by
   * the model's context length.
   */
  max_tokens?: number | null;

  /**
   * Body param: The minimum number of tokens to generate for a completion. If not
   * specified or set to 0, the model will generate as many tokens as it deems
   * necessary. Setting to -1 sets to max sequence length.
   */
  min_tokens?: number | null;

  /**
   * Body param: How many chat completion choices to generate for each input message.
   * Note that you will be charged based on the number of generated tokens across all
   * of the choices. Keep n as 1 to minimize costs.
   */
  n?: number | null;

  /**
   * Body param: Number between -2.0 and 2.0. Positive values penalize new tokens
   * based on whether they appear in the text so far, increasing the model's
   * likelihood to talk about new topics.
   */
  presence_penalty?: number | null;

  /**
   * Body param: The prompt(s) to generate completions for, encoded as a string,
   * array of strings, array of tokens, or array of token arrays.
   */
  prompt?: string | Array<string> | Array<number> | Array<Array<number>>;

  /**
   * Body param: Return raw tokens instead of text
   */
  return_raw_tokens?: boolean | null;

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
   * Body param:
   */
  stream_options?: CompletionCreateParams.StreamOptions | null;

  /**
   * Body param: The suffix that comes after a completion of inserted text. (OpenAI
   * feature, not supported)
   */
  suffix?: string | null;

  /**
   * Body param: What sampling temperature to use, between 0 and 1.5. Higher values
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
  'X-Amz-Cf-Id'?: string;

  /**
   * Header param:
   */
  'X-delay-time'?: number;
}

export namespace CompletionCreateParams {
  export interface StreamOptions {
    include_usage?: boolean | null;
    [k: string]: unknown;
  }
}

export declare namespace Completions {
  export { type Completion as Completion, type CompletionCreateParams as CompletionCreateParams };
}
