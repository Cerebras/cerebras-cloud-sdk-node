// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { Stream } from '../../streaming';

export class Completions extends APIResource {
  /**
   * Chat
   */
  create(
    params: ChatCompletionCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ChatCompletion>;
  create(
    params: ChatCompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Stream<ChatCompletion>>;
  create(
    params: ChatCompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Stream<ChatCompletion> | ChatCompletion>;
  create(
    params: ChatCompletionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ChatCompletion> | Core.APIPromise<Stream<ChatCompletion>> {
    const { 'X-Amz-Cf-Id': xAmzCfId, 'X-delay-time': xDelayTime, ...body } = params;
    return this._client.post('/v1/chat/completions', {
      body,
      ...options,
      stream: body.stream ?? false,
      headers: {
        ...(xAmzCfId != null ? { 'X-Amz-Cf-Id': xAmzCfId } : undefined),
        ...(xDelayTime?.toString() != null ? { 'X-delay-time': xDelayTime?.toString() } : undefined),
        ...options?.headers,
      },
    }) as Core.APIPromise<ChatCompletion> | Core.APIPromise<Stream<ChatCompletion>>;
  }
}

export type ChatCompletion =
  | ChatCompletion.ChatCompletionResponse
  | ChatCompletion.ChatChunkResponse
  | ChatCompletion.ErrorChunkResponse;

export namespace ChatCompletion {
  export interface ChatCompletionResponse {
    id: string;

    choices: Array<ChatCompletionResponse.Choice>;

    created: number;

    model: string;

    object: 'chat.completion';

    system_fingerprint: string;

    time_info: ChatCompletionResponse.TimeInfo;

    usage: ChatCompletionResponse.Usage;

    service_tier?: string | null;
    [k: string]: unknown;
  }

  export namespace ChatCompletionResponse {
    export interface Choice {
      finish_reason: 'stop' | 'length' | 'content_filter' | 'tool_calls';

      index: number;

      message: Choice.Message;

      logprobs?: Choice.Logprobs | null;
      [k: string]: unknown;
    }

    export namespace Choice {
      export interface Message {
        role: 'assistant' | 'user' | 'system' | 'tool';

        content?: string | null;

        tool_calls?: Array<Message.ToolCall> | null;
        [k: string]: unknown;
      }

      export namespace Message {
        export interface ToolCall {
          id: string;

          function: ToolCall.Function;

          type: 'function';
          [k: string]: unknown;
        }

        export namespace ToolCall {
          export interface Function {
            arguments: string;

            name: string;
            [k: string]: unknown;
          }
        }
      }

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

  export interface ChatChunkResponse {
    id: string;

    created: number;

    model: string;

    object: 'chat.completion.chunk';

    system_fingerprint: string;

    choices?: Array<ChatChunkResponse.Choice> | null;

    service_tier?: string | null;

    time_info?: ChatChunkResponse.TimeInfo | null;

    usage?: ChatChunkResponse.Usage | null;
    [k: string]: unknown;
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

        role?: 'assistant' | 'user' | 'system' | 'tool' | null;

        tool_calls?: Array<Delta.ToolCall> | null;
        [k: string]: unknown;
      }

      export namespace Delta {
        export interface ToolCall {
          id: string;

          function: ToolCall.Function;

          type: 'function';

          index?: number | null;
          [k: string]: unknown;
        }

        export namespace ToolCall {
          export interface Function {
            arguments: string;

            name: string;
            [k: string]: unknown;
          }
        }
      }

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
export type ChatCompletionCreateParams =
  | ChatCompletionCreateParamsNonStreaming
  | ChatCompletionCreateParamsStreaming;

export interface ChatCompletionCreateParamsNonStreaming extends ChatCompletionCreateParamsBase {
  stream?: false | null;
}

export interface ChatCompletionCreateParamsStreaming extends ChatCompletionCreateParamsBase {
  stream: true;
}

export interface ChatCompletionCreateParamsBase {
  /**
   * Body param:
   */
  messages: Array<
    | ChatCompletionCreateParams.SystemMessageRequest
    | ChatCompletionCreateParams.UserMessageRequest
    | ChatCompletionCreateParams.AssistantMessageRequest
    | ChatCompletionCreateParams.ToolMessageRequest
  >;

  /**
   * Body param:
   */
  model: string;

  /**
   * Body param: Number between -2.0 and 2.0. Positive values penalize new tokens
   * based on their existing frequency in the text so far, decreasing the model's
   * likelihood to repeat the same line verbatim.
   */
  frequency_penalty?: number | null;

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
   * Body param: An upper bound for the number of tokens that can be generated for a
   * completion, including visible output tokens and reasoning tokens.
   */
  max_completion_tokens?: number | null;

  /**
   * Body param: The maximum number of tokens that can be generated in the chat
   * completion. The total length of input tokens and generated tokens is limited by
   * the model's context length. This value is now deprecated in favor of
   * max_completion_tokens.
   */
  max_tokens?: number | null;

  /**
   * Body param: The minimum number of tokens to generate for a completion. If not
   * specified or set to 0, the model will generate as many tokens as it deems
   * necessary. Setting to -1 sets to max sequence length.
   */
  min_completion_tokens?: number | null;

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
   * Body param:
   */
  parallel_tool_calls?: boolean | null;

  /**
   * Body param: Number between -2.0 and 2.0. Positive values penalize new tokens
   * based on whether they appear in the text so far, increasing the model's
   * likelihood to talk about new topics.
   */
  presence_penalty?: number | null;

  /**
   * Body param:
   */
  response_format?: ChatCompletionCreateParams.ResponseFormat | null;

  /**
   * Body param: If specified, our system will make a best effort to sample
   * deterministically, such that repeated requests with the same `seed` and
   * parameters should return the same result. Determinism is not guaranteed.
   */
  seed?: number | null;

  /**
   * Body param:
   */
  service_tier?: 'auto' | 'default' | null;

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
  stream_options?: ChatCompletionCreateParams.StreamOptions | null;

  /**
   * Body param: What sampling temperature to use, between 0 and 1.5. Higher values
   * like 0.8 will make the output more random, while lower values like 0.2 will make
   * it more focused and deterministic. We generally recommend altering this or
   * `top_p` but not both.
   */
  temperature?: number | null;

  /**
   * Body param:
   */
  tool_choice?: 'none' | 'auto' | 'required' | ChatCompletionCreateParams.ChoiceObject | null;

  /**
   * Body param:
   */
  tools?: Array<ChatCompletionCreateParams.Tool> | null;

  /**
   * Body param: An integer between 0 and 20 specifying the number of most likely
   * tokens to return at each token position, each with an associated log
   * probability. logprobs must be set to true if this parameter is used.
   */
  top_logprobs?: number | null;

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

export namespace ChatCompletionCreateParams {
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
    role: 'assistant';

    content?: string | null;

    name?: string | null;

    tool_calls?: Array<AssistantMessageRequest.ToolCall> | null;
    [k: string]: unknown;
  }

  export namespace AssistantMessageRequest {
    export interface ToolCall {
      id: string;

      function: ToolCall.Function;

      type: 'function';
      [k: string]: unknown;
    }

    export namespace ToolCall {
      export interface Function {
        arguments: string;

        name: string;
        [k: string]: unknown;
      }
    }
  }

  export interface ToolMessageRequest {
    content: string;

    role: 'tool';

    tool_call_id: string;

    name?: string | null;
    [k: string]: unknown;
  }

  export interface ResponseFormat {
    type?: 'text' | 'json_object' | null;
    [k: string]: unknown;
  }

  export interface StreamOptions {
    include_usage?: boolean | null;
    [k: string]: unknown;
  }

  export interface ChoiceObject {
    function: ChoiceObject.Function;

    type: string;
    [k: string]: unknown;
  }

  export namespace ChoiceObject {
    export interface Function {
      name: string;
      [k: string]: unknown;
    }
  }

  export interface Tool {
    function: Tool.Function;

    type: string;
    [k: string]: unknown;
  }

  export namespace Tool {
    export interface Function {
      name: string;

      description?: string | null;

      /**
       * Represents the parameters a function accepts. This model is designed to be
       * flexible to accommodate any JSON Schema. The key-value pairs you provide will
       * define the parameters.
       */
      parameters?: unknown | null;
      [k: string]: unknown;
    }
  }
}

/**
 * @deprecated Use ChatCompletionCreateParams instead
 */
export type CompletionCreateParams = ChatCompletionCreateParams;

/**
 * @deprecated Use ChatCompletion instead
 */
export type CompletionCreateResponse = ChatCompletion;

export declare namespace Completions {
  export {
    type CompletionCreateResponse as CompletionCreateResponse,
    type ChatCompletion as ChatCompletion,
    type CompletionCreateParams as CompletionCreateParams,
    type ChatCompletionCreateParams as ChatCompletionCreateParams,
    type ChatCompletionCreateParamsNonStreaming as ChatCompletionCreateParamsNonStreaming,
    type ChatCompletionCreateParamsStreaming as ChatCompletionCreateParamsStreaming,
  };
}
