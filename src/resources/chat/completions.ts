// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { Stream } from '../../streaming';

export class Completions extends APIResource {
  /**
   * Chat
   *
   * @example
   * ```ts
   * const chatCompletion = await client.chat.completions.create(
   *   { model: 'model' },
   * );
   * ```
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
    const { 'CF-RAY': cfRay, 'X-Amz-Cf-Id': xAmzCfId, 'X-delay-time': xDelayTime, ...body } = params;
    return this._client.post('/v1/chat/completions', {
      body,
      ...options,
      stream: body.stream ?? false,
      headers: {
        ...(cfRay != null ? { 'CF-RAY': cfRay } : undefined),
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

      reasoning_logprobs?: Choice.ReasoningLogprobs | null;

      [k: string]: unknown;
    }

    export namespace Choice {
      export interface Message {
        role: 'assistant' | 'user' | 'system' | 'tool';

        content?: string | null;

        reasoning?: string | null;

        tool_calls?: Array<Message.ToolCall> | null;

        [k: string]: unknown;
      }

      export namespace Message {
        /**
         * A tool call for an assistant.
         */
        export interface ToolCall {
          id: string;

          /**
           * A function call for an assistant tool.
           */
          function: ToolCall.Function;

          type: 'function';

          [k: string]: unknown;
        }

        export namespace ToolCall {
          /**
           * A function call for an assistant tool.
           */
          export interface Function {
            arguments: string;

            name: string;

            [k: string]: unknown;
          }
        }
      }

      export interface Logprobs {
        content: Array<Logprobs.Content> | null;

        refusal: Array<Logprobs.Refusal> | null;

        [k: string]: unknown;
      }

      export namespace Logprobs {
        export interface Content {
          token: string;

          logprob: number;

          top_logprobs: Array<Content.TopLogprob>;

          bytes?: Array<number> | null;

          [k: string]: unknown;
        }

        export namespace Content {
          export interface TopLogprob {
            token: string;

            logprob: number;

            bytes?: Array<number> | null;

            [k: string]: unknown;
          }
        }

        export interface Refusal {
          token: string;

          logprob: number;

          top_logprobs: Array<Refusal.TopLogprob>;

          bytes?: Array<number> | null;

          [k: string]: unknown;
        }

        export namespace Refusal {
          export interface TopLogprob {
            token: string;

            logprob: number;

            bytes?: Array<number> | null;

            [k: string]: unknown;
          }
        }
      }

      export interface ReasoningLogprobs {
        content: Array<ReasoningLogprobs.Content> | null;

        refusal: Array<ReasoningLogprobs.Refusal> | null;

        [k: string]: unknown;
      }

      export namespace ReasoningLogprobs {
        export interface Content {
          token: string;

          logprob: number;

          top_logprobs: Array<Content.TopLogprob>;

          bytes?: Array<number> | null;

          [k: string]: unknown;
        }

        export namespace Content {
          export interface TopLogprob {
            token: string;

            logprob: number;

            bytes?: Array<number> | null;

            [k: string]: unknown;
          }
        }

        export interface Refusal {
          token: string;

          logprob: number;

          top_logprobs: Array<Refusal.TopLogprob>;

          bytes?: Array<number> | null;

          [k: string]: unknown;
        }

        export namespace Refusal {
          export interface TopLogprob {
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

      completion_tokens_details?: Usage.CompletionTokensDetails | null;

      prompt_tokens?: number;

      prompt_tokens_details?: Usage.PromptTokensDetails | null;

      total_tokens?: number;

      [k: string]: unknown;
    }

    export namespace Usage {
      export interface CompletionTokensDetails {
        accepted_prediction_tokens?: number | null;

        rejected_prediction_tokens?: number | null;

        [k: string]: unknown;
      }

      export interface PromptTokensDetails {
        cached_tokens?: number;

        [k: string]: unknown;
      }
    }
  }

  export interface ChatChunkResponse {
    id: string;

    created: number;

    model: string;

    object: 'chat.completion.chunk' | 'text_completion';

    system_fingerprint: string;

    choices?: Array<ChatChunkResponse.Choice> | null;

    service_tier?: string | null;

    time_info?: ChatChunkResponse.TimeInfo | null;

    usage?: ChatChunkResponse.Usage | null;

    [k: string]: unknown;
  }

  export namespace ChatChunkResponse {
    export interface Choice {
      index: number;

      delta?: Choice.Delta | null;

      finish_reason?: 'stop' | 'length' | 'content_filter' | 'tool_calls' | null;

      logprobs?: Choice.Logprobs | null;

      reasoning_logprobs?: Choice.ReasoningLogprobs | null;

      text?: string | null;

      tokens?: Array<number> | null;

      [k: string]: unknown;
    }

    export namespace Choice {
      export interface Delta {
        content?: string | null;

        reasoning?: string | null;

        role?: 'assistant' | 'user' | 'system' | 'tool' | null;

        tokens?: Array<number> | null;

        tool_calls?: Array<Delta.ToolCall> | null;

        [k: string]: unknown;
      }

      export namespace Delta {
        /**
         * Streaming only. Represents a function call in an assistant tool call.
         */
        export interface ToolCall {
          /**
           * Streaming only. Represents a function in an assistant tool call.
           */
          function: ToolCall.Function;

          type: 'function';

          id?: string | null;

          index?: number | null;

          [k: string]: unknown;
        }

        export namespace ToolCall {
          /**
           * Streaming only. Represents a function in an assistant tool call.
           */
          export interface Function {
            arguments?: string | null;

            name?: string | null;

            [k: string]: unknown;
          }
        }
      }

      export interface Logprobs {
        content: Array<Logprobs.Content> | null;

        refusal: Array<Logprobs.Refusal> | null;

        [k: string]: unknown;
      }

      export namespace Logprobs {
        export interface Content {
          token: string;

          logprob: number;

          top_logprobs: Array<Content.TopLogprob>;

          bytes?: Array<number> | null;

          [k: string]: unknown;
        }

        export namespace Content {
          export interface TopLogprob {
            token: string;

            logprob: number;

            bytes?: Array<number> | null;

            [k: string]: unknown;
          }
        }

        export interface Refusal {
          token: string;

          logprob: number;

          top_logprobs: Array<Refusal.TopLogprob>;

          bytes?: Array<number> | null;

          [k: string]: unknown;
        }

        export namespace Refusal {
          export interface TopLogprob {
            token: string;

            logprob: number;

            bytes?: Array<number> | null;

            [k: string]: unknown;
          }
        }
      }

      export interface ReasoningLogprobs {
        content: Array<ReasoningLogprobs.Content> | null;

        refusal: Array<ReasoningLogprobs.Refusal> | null;

        [k: string]: unknown;
      }

      export namespace ReasoningLogprobs {
        export interface Content {
          token: string;

          logprob: number;

          top_logprobs: Array<Content.TopLogprob>;

          bytes?: Array<number> | null;

          [k: string]: unknown;
        }

        export namespace Content {
          export interface TopLogprob {
            token: string;

            logprob: number;

            bytes?: Array<number> | null;

            [k: string]: unknown;
          }
        }

        export interface Refusal {
          token: string;

          logprob: number;

          top_logprobs: Array<Refusal.TopLogprob>;

          bytes?: Array<number> | null;

          [k: string]: unknown;
        }

        export namespace Refusal {
          export interface TopLogprob {
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

      completion_tokens_details?: Usage.CompletionTokensDetails | null;

      prompt_tokens?: number;

      prompt_tokens_details?: Usage.PromptTokensDetails | null;

      total_tokens?: number;

      [k: string]: unknown;
    }

    export namespace Usage {
      export interface CompletionTokensDetails {
        accepted_prediction_tokens?: number | null;

        rejected_prediction_tokens?: number | null;

        [k: string]: unknown;
      }

      export interface PromptTokensDetails {
        cached_tokens?: number;

        [k: string]: unknown;
      }
    }
  }

  export interface ErrorChunkResponse {
    error: ErrorChunkResponse.Error;

    status_code: number;

    [k: string]: unknown;
  }

  export namespace ErrorChunkResponse {
    export interface Error {
      id?: string | null;

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
  model: string;

  /**
   * Body param: When True, removes reasoning content from messages that appear
   * before the latest user message.
   */
  clear_thinking?: boolean | null;

  /**
   * Body param: Disables reasoning for reasoning models. If set to True, the model
   * will not use any reasoning in its response.
   */
  disable_reasoning?: boolean | null;

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
  logit_bias?: { [key: string]: number } | null;

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
   * Body param:
   */
  messages?: Array<
    | ChatCompletionCreateParams.SystemMessageRequest
    | ChatCompletionCreateParams.UserMessageRequest
    | ChatCompletionCreateParams.AssistantMessageRequest
    | ChatCompletionCreateParams.ToolMessageRequest
  > | null;

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
   * Body param: Configuration for a Predicted Output, which can greatly improve
   * response times when large parts of the model response are known ahead of time.
   * This is most common when regenerating a file with only minor changes to most of
   * the content.
   */
  prediction?: ChatCompletionCreateParams.Prediction | null;

  /**
   * Body param: Number between -2.0 and 2.0. Positive values penalize new tokens
   * based on whether they appear in the text so far, increasing the model's
   * likelihood to talk about new topics.
   */
  presence_penalty?: number | null;

  /**
   * Body param: Constrains effort on reasoning for reasoning models. Currently
   * supported values are low, medium, and high. Reducing reasoning effort can result
   * in faster responses and fewer tokens used on reasoning in a response. If set to
   * None, the model will use the default reasoning effort for the model.
   */
  reasoning_effort?: 'low' | 'medium' | 'high' | null;

  /**
   * Body param: Determines how reasoning is returned in the response. If set to
   * `parsed`, the reasoning will be returned in the `reasoning` field of the
   * response message as a string. If set to `raw`, the reasoning will be returned in
   * the `content` field of the response message with special tokens. If set to
   * `hidden`, the reasoning will not be returned in the response. If set to `none`,
   * the model's default behavior will be used. If set to `text_parsed`, the
   * reasoning will be returned in the `reasoning` field of the response message as a
   * string, similar to `parsed`, but logprobs will not be separated into
   * `reasoning_logprobs` and `logprobs`.
   */
  reasoning_format?: 'none' | 'parsed' | 'text_parsed' | 'raw' | 'hidden';

  /**
   * Body param: A response format for text.
   */
  response_format?:
    | ChatCompletionCreateParams.ResponseFormatText
    | ChatCompletionCreateParams.ResponseFormatJsonObject
    | ChatCompletionCreateParams.ResponseFormatJsonSchema
    | null;

  /**
   * Body param: If specified, our system will make a best effort to sample
   * deterministically, such that repeated requests with the same `seed` and
   * parameters should return the same result. Determinism is not guaranteed.
   */
  seed?: number | null;

  /**
   * Body param:
   */
  service_tier?: 'auto' | 'default' | 'flex' | 'priority' | null;

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
   * Body param: Options for streaming.
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
   * Body param: A choice object.
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
  'CF-RAY'?: string;

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
  /**
   * A message request from the system.
   */
  export interface SystemMessageRequest {
    content:
      | string
      | Array<
          | SystemMessageRequest.TextContent
          | SystemMessageRequest.ImageURLContent
          | SystemMessageRequest.ImageContent
        >;

    name?: string | null;

    role?: 'system';

    [k: string]: unknown;
  }

  export namespace SystemMessageRequest {
    /**
     * Text content for a message.
     */
    export interface TextContent {
      text: string;

      type: 'text';

      [k: string]: unknown;
    }

    /**
     * Image URL content for a message.
     */
    export interface ImageURLContent {
      /**
       * Image URL
       */
      image_url: ImageURLContent.ImageURL;

      type: 'image_url';

      [k: string]: unknown;
    }

    export namespace ImageURLContent {
      /**
       * Image URL
       */
      export interface ImageURL {
        url: string;

        detail?: string | null;

        [k: string]: unknown;
      }
    }

    /**
     * Image URL content for a message.
     */
    export interface ImageContent {
      image: string;

      type: 'image';

      [k: string]: unknown;
    }
  }

  /**
   * A message request from the user.
   */
  export interface UserMessageRequest {
    content:
      | string
      | Array<
          | UserMessageRequest.TextContent
          | UserMessageRequest.ImageURLContent
          | UserMessageRequest.ImageContent
        >;

    name?: string | null;

    role?: 'user';

    [k: string]: unknown;
  }

  export namespace UserMessageRequest {
    /**
     * Text content for a message.
     */
    export interface TextContent {
      text: string;

      type: 'text';

      [k: string]: unknown;
    }

    /**
     * Image URL content for a message.
     */
    export interface ImageURLContent {
      /**
       * Image URL
       */
      image_url: ImageURLContent.ImageURL;

      type: 'image_url';

      [k: string]: unknown;
    }

    export namespace ImageURLContent {
      /**
       * Image URL
       */
      export interface ImageURL {
        url: string;

        detail?: string | null;

        [k: string]: unknown;
      }
    }

    /**
     * Image URL content for a message.
     */
    export interface ImageContent {
      image: string;

      type: 'image';

      [k: string]: unknown;
    }
  }

  /**
   * A message request from an assistant.
   */
  export interface AssistantMessageRequest {
    content?: string | Array<AssistantMessageRequest.UnionMember1> | null;

    name?: string | null;

    reasoning?: string | Array<AssistantMessageRequest.UnionMember1> | null;

    role?: 'assistant';

    tool_calls?: Array<AssistantMessageRequest.ToolCall> | null;

    [k: string]: unknown;
  }

  export namespace AssistantMessageRequest {
    /**
     * Text content for a message.
     */
    export interface UnionMember1 {
      text: string;

      type: 'text';

      [k: string]: unknown;
    }

    /**
     * A tool call for an assistant.
     */
    export interface ToolCall {
      id: string;

      /**
       * A function call for an assistant tool.
       */
      function: ToolCall.Function;

      type: 'function';

      [k: string]: unknown;
    }

    export namespace ToolCall {
      /**
       * A function call for an assistant tool.
       */
      export interface Function {
        arguments: string;

        name: string;

        [k: string]: unknown;
      }
    }
  }

  /**
   * A message request from a tool.
   */
  export interface ToolMessageRequest {
    content: string | Array<ToolMessageRequest.UnionMember1>;

    tool_call_id: string;

    name?: string | null;

    role?: 'tool';

    [k: string]: unknown;
  }

  export namespace ToolMessageRequest {
    /**
     * Text content for a message.
     */
    export interface UnionMember1 {
      text: string;

      type: 'text';

      [k: string]: unknown;
    }
  }

  /**
   * Configuration for a Predicted Output, which can greatly improve response times
   * when large parts of the model response are known ahead of time. This is most
   * common when regenerating a file with only minor changes to most of the content.
   */
  export interface Prediction {
    content: string | Array<Prediction.UnionMember1>;

    type: 'content';

    [k: string]: unknown;
  }

  export namespace Prediction {
    /**
     * Text content for a message.
     */
    export interface UnionMember1 {
      text: string;

      type: 'text';

      [k: string]: unknown;
    }
  }

  /**
   * A response format for text.
   */
  export interface ResponseFormatText {
    type: 'text';

    [k: string]: unknown;
  }

  /**
   * A response format for a JSON object.
   */
  export interface ResponseFormatJsonObject {
    type: 'json_object';

    [k: string]: unknown;
  }

  /**
   * A response format for a JSON schema.
   */
  export interface ResponseFormatJsonSchema {
    /**
     * A JSON Schema object.
     */
    json_schema: ResponseFormatJsonSchema.JsonSchema;

    type: 'json_schema';

    [k: string]: unknown;
  }

  export namespace ResponseFormatJsonSchema {
    /**
     * A JSON Schema object.
     */
    export interface JsonSchema {
      name: string;

      description?: string | null;

      schema?: unknown | null;

      strict?: boolean | null;

      [k: string]: unknown;
    }
  }

  /**
   * Options for streaming.
   */
  export interface StreamOptions {
    include_usage?: boolean | null;

    [k: string]: unknown;
  }

  /**
   * A choice object.
   */
  export interface ChoiceObject {
    /**
     * A function for a choice object.
     */
    function: ChoiceObject.Function;

    type: string;

    [k: string]: unknown;
  }

  export namespace ChoiceObject {
    /**
     * A function for a choice object.
     */
    export interface Function {
      name: string;

      [k: string]: unknown;
    }
  }

  /**
   * A tool object
   */
  export interface Tool {
    /**
     * A function object.
     */
    function: Tool.Function;

    type: string;

    [k: string]: unknown;
  }

  export namespace Tool {
    /**
     * A function object.
     */
    export interface Function {
      name: string;

      description?: string | null;

      /**
       * Represents the parameters a function accepts. This model is designed to be
       * flexible to accommodate any JSON Schema. The key-value pairs you provide will
       * define the parameters.
       */
      parameters?: unknown | null;

      strict?: boolean;

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
