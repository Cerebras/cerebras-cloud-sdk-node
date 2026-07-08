// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Models extends APIResource {
  /**
   * Get Model
   */
  retrieve(
    modelId: string,
    params?: ModelRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelRetrieveResponse>;
  retrieve(modelId: string, options?: Core.RequestOptions): Core.APIPromise<ModelRetrieveResponse>;
  retrieve(
    modelId: string,
    params: ModelRetrieveParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelRetrieveResponse> {
    if (isRequestOptions(params)) {
      return this.retrieve(modelId, {}, params);
    }
    const { 'CF-RAY': cfRay, 'X-Amz-Cf-Id': xAmzCfId, ...query } = params;
    return this._client.get(`/v1/models/${modelId}`, {
      query,
      ...options,
      headers: {
        ...(cfRay != null ? { 'CF-RAY': cfRay } : undefined),
        ...(xAmzCfId != null ? { 'X-Amz-Cf-Id': xAmzCfId } : undefined),
        ...options?.headers,
      },
    });
  }

  /**
   * List Models
   */
  list(params?: ModelListParams, options?: Core.RequestOptions): Core.APIPromise<ModelListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<ModelListResponse>;
  list(
    params: ModelListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelListResponse> {
    if (isRequestOptions(params)) {
      return this.list({}, params);
    }
    const { 'CF-RAY': cfRay, 'X-Amz-Cf-Id': xAmzCfId, ...query } = params;
    return this._client.get('/v1/models', {
      query,
      ...options,
      headers: {
        ...(cfRay != null ? { 'CF-RAY': cfRay } : undefined),
        ...(xAmzCfId != null ? { 'X-Amz-Cf-Id': xAmzCfId } : undefined),
        ...options?.headers,
      },
    });
  }
}

/**
 * Model in OpenRouter-compatible format.
 */
export type ModelRetrieveResponse =
  | ModelRetrieveResponse.ModelMetadata
  | ModelRetrieveResponse.OpenRouterModel
  | ModelRetrieveResponse.HuggingFaceModel
  | ModelRetrieveResponse.PublicModel;

export namespace ModelRetrieveResponse {
  export interface ModelMetadata {
    id: string;

    created?: number;

    object?: 'model';

    owned_by?: string;
  }

  /**
   * Model in OpenRouter-compatible format.
   */
  export interface OpenRouterModel {
    /**
     * Model ID with provider prefix, e.g., 'cerebras/gpt-oss-120b'
     */
    id: string;

    context_length: number;

    /**
     * Unix timestamp when model was created
     */
    created: number;

    /**
     * Maximum number of output tokens
     */
    max_output_length: number;

    name: string;

    /**
     * OpenRouter pricing format.
     */
    pricing: OpenRouterModel.Pricing;

    /**
     * Datacenter locations
     */
    datacenters?: Array<OpenRouterModel.Datacenter>;

    /**
     * Model description
     */
    description?: string;

    /**
     * The corresponding HuggingFace Hub model ID, if available
     */
    hugging_face_id?: string;

    /**
     * Supported input modalities (text, image, file)
     */
    input_modalities?: Array<string>;

    /**
     * OpenRouter metadata.
     */
    openrouter?: OpenRouterModel.Openrouter | null;

    /**
     * Supported output modalities (text, image, file)
     */
    output_modalities?: Array<string>;

    /**
     * Model quantization (fp16 only for Cerebras)
     */
    quantization?: string;

    /**
     * List of supported features
     */
    supported_features?: Array<string>;

    /**
     * List of supported sampling parameters
     */
    supported_sampling_parameters?: Array<string>;
  }

  export namespace OpenRouterModel {
    /**
     * OpenRouter pricing format.
     */
    export interface Pricing {
      /**
       * Cost per output token as string
       */
      completion: string;

      /**
       * Cost per input token as string
       */
      prompt: string;

      /**
       * Cost per image as string
       */
      image?: string;

      /**
       * Cost per cached input token read as string
       */
      input_cache_read?: string;

      /**
       * Cost per cached input token write as string
       */
      input_cache_write?: string;

      /**
       * Cost per request as string
       */
      request?: string;
    }

    /**
     * Datacenter location information.
     */
    export interface Datacenter {
      /**
       * ISO 3166 Alpha-2 country code
       */
      country_code: string;
    }

    /**
     * OpenRouter metadata.
     */
    export interface Openrouter {
      /**
       * OpenRouter slug for the model
       */
      slug: string;
    }
  }

  /**
   * Model in HuggingFace-compatible format for inference providers.
   *
   * This format is used by HuggingFace to power their provider comparison table and
   * provider selection features.
   */
  export interface HuggingFaceModel {
    id: string;

    /**
     * Supported context length in tokens
     */
    context_length: number;

    created: number;

    owned_by: string;

    /**
     * HuggingFace pricing format - price in USD per million tokens.
     */
    pricing: HuggingFaceModel.Pricing;

    /**
     * HuggingFace capabilities format.
     */
    capabilities?: HuggingFaceModel.Capabilities;

    /**
     * The corresponding HuggingFace Hub model ID
     */
    hugging_face_id?: string | null;

    object?: 'model';
  }

  export namespace HuggingFaceModel {
    /**
     * HuggingFace pricing format - price in USD per million tokens.
     */
    export interface Pricing {
      /**
       * Price in USD per million input tokens
       */
      input: number;

      /**
       * Price in USD per million output tokens
       */
      output: number;
    }

    /**
     * HuggingFace capabilities format.
     */
    export interface Capabilities {
      function_calling?: boolean;

      streaming?: boolean;

      structured_outputs?: boolean;

      vision?: boolean;
    }
  }

  /**
   * Complete model specification following OpenAI-compatible schema with extensions
   * for OpenRouter/HuggingFace compatibility.
   */
  export interface PublicModel {
    /**
     * The unique identifier for the model (e.g., 'gpt-oss-120b').
     */
    id: string;

    /**
     * Technical architecture details of the model.
     */
    architecture: PublicModel.Architecture;

    /**
     * The capabilities supported by the model.
     */
    capabilities: PublicModel.Capabilities;

    /**
     * The Unix timestamp (in seconds) when the model was created.
     */
    created: number;

    /**
     * A brief description of the model.
     */
    description: string;

    /**
     * Usage limits and constraints for the model.
     */
    limits: PublicModel.Limits;

    /**
     * The human-readable name of the model.
     */
    name: string;

    /**
     * The organization that owns or created the model.
     */
    owned_by: string;

    /**
     * Pricing details for the model.
     */
    pricing: PublicModel.Pricing;

    /**
     * Sampling parameters supported by the model.
     */
    supported_parameters: PublicModel.SupportedParameters;

    /**
     * List of datacenter locations where this model is deployed (e.g., ['us-east-1',
     * 'eu-west-1']).
     */
    datacenter_locations?: Array<string>;

    /**
     * Indicates if the model is deprecated and should not be used for new
     * applications.
     */
    deprecated?: boolean;

    /**
     * The corresponding HuggingFace Hub model ID, if available (e.g.,
     * 'meta-llama/Llama-3.1-8B-Instruct').
     */
    hugging_face_id?: string | null;

    /**
     * The object type, which is always 'model'.
     */
    object?: 'model';

    /**
     * Indicates if the model is in preview or beta status.
     */
    preview?: boolean;

    /**
     * Quantization precision (e.g., 'FP16', 'FP16/FP8 (weights only)').
     */
    quantization?: string | null;
  }

  export namespace PublicModel {
    /**
     * Technical architecture details of the model.
     */
    export interface Architecture {
      /**
       * The modality of the model (e.g., 'text', 'text+vision', 'multimodal').
       */
      modality: 'text' | 'text+vision' | 'multimodal';

      /**
       * The tokenizer used by the model (e.g., 'Llama3', 'GPT4').
       */
      tokenizer: string;

      /**
       * The instruction format type used for fine-tuning (e.g., 'llama3', 'chatml').
       */
      instruct_type?: string | null;
    }

    /**
     * The capabilities supported by the model.
     */
    export interface Capabilities {
      /**
       * Indicates if the model supports function calling (tool use).
       */
      function_calling?: boolean;

      /**
       * Indicates if the model supports JSON mode (guaranteed JSON output).
       */
      json_mode?: boolean;

      /**
       * Indicates if the model supports parallel tool calls.
       */
      parallel_tool_calls?: boolean;

      /**
       * Indicates if the model supports reasoning/chain-of-thought outputs.
       */
      reasoning?: boolean;

      /**
       * Indicates if the model supports the response_format parameter.
       */
      response_format?: boolean;

      /**
       * Indicates if the model supports streaming responses via Server-Sent Events
       * (SSE).
       */
      streaming?: boolean;

      /**
       * Indicates if the model supports structured outputs (e.g. JSON schema
       * enforcement).
       */
      structured_outputs?: boolean;

      /**
       * Indicates if the model supports the tool_choice parameter.
       */
      tool_choice?: boolean;

      /**
       * Indicates if the model supports the tools parameter.
       */
      tools?: boolean;

      /**
       * Indicates if the model accepts image inputs (vision capabilities).
       */
      vision?: boolean;
    }

    /**
     * Usage limits and constraints for the model.
     */
    export interface Limits {
      /**
       * The maximum number of tokens that can be generated in a single completion.
       */
      max_completion_tokens: number;

      /**
       * The maximum context window size in tokens.
       */
      max_context_length: number;

      /**
       * The default rate limit for requests per minute (RPM).
       */
      requests_per_minute?: number | null;

      /**
       * The default rate limit for tokens per minute (TPM).
       */
      tokens_per_minute?: number | null;
    }

    /**
     * Pricing details for the model.
     */
    export interface Pricing {
      /**
       * Cost per token for completion (output) tokens in USD.
       */
      completion: string;

      /**
       * Cost per token for prompt (input) tokens in USD.
       */
      prompt: string;
    }

    /**
     * Sampling parameters supported by the model.
     */
    export interface SupportedParameters {
      /**
       * Supports frequency_penalty parameter.
       */
      frequency_penalty?: boolean;

      /**
       * Supports logit_bias parameter.
       */
      logit_bias?: boolean;

      /**
       * Supports logprobs output.
       */
      logprobs?: boolean;

      /**
       * Supports max_completion_tokens parameter.
       */
      max_completion_tokens?: boolean;

      /**
       * Supports presence_penalty parameter.
       */
      presence_penalty?: boolean;

      /**
       * Supports repetition_penalty parameter.
       */
      repetition_penalty?: boolean;

      /**
       * Supports seed for reproducible outputs.
       */
      seed?: boolean;

      /**
       * Supports stop sequences parameter.
       */
      stop?: boolean;

      /**
       * Supports temperature sampling parameter.
       */
      temperature?: boolean;

      /**
       * Supports top_logprobs parameter.
       */
      top_logprobs?: boolean;

      /**
       * Supports top_p (nucleus) sampling parameter.
       */
      top_p?: boolean;
    }
  }
}

/**
 * OpenRouter-compatible list of models.
 */
export type ModelListResponse =
  | ModelListResponse.ModelMetadataList
  | ModelListResponse.OpenRouterModelsResponse
  | ModelListResponse.HuggingFaceModelsResponse;

export namespace ModelListResponse {
  export interface ModelMetadataList {
    data: Array<ModelMetadataList.Data>;

    object?: 'list';
  }

  export namespace ModelMetadataList {
    export interface Data {
      id: string;

      created?: number;

      object?: 'model';

      owned_by?: string;
    }
  }

  /**
   * OpenRouter-compatible list of models.
   */
  export interface OpenRouterModelsResponse {
    data: Array<OpenRouterModelsResponse.Data>;
  }

  export namespace OpenRouterModelsResponse {
    /**
     * Model in OpenRouter-compatible format.
     */
    export interface Data {
      /**
       * Model ID with provider prefix, e.g., 'cerebras/gpt-oss-120b'
       */
      id: string;

      context_length: number;

      /**
       * Unix timestamp when model was created
       */
      created: number;

      /**
       * Maximum number of output tokens
       */
      max_output_length: number;

      name: string;

      /**
       * OpenRouter pricing format.
       */
      pricing: Data.Pricing;

      /**
       * Datacenter locations
       */
      datacenters?: Array<Data.Datacenter>;

      /**
       * Model description
       */
      description?: string;

      /**
       * The corresponding HuggingFace Hub model ID, if available
       */
      hugging_face_id?: string;

      /**
       * Supported input modalities (text, image, file)
       */
      input_modalities?: Array<string>;

      /**
       * OpenRouter metadata.
       */
      openrouter?: Data.Openrouter | null;

      /**
       * Supported output modalities (text, image, file)
       */
      output_modalities?: Array<string>;

      /**
       * Model quantization (fp16 only for Cerebras)
       */
      quantization?: string;

      /**
       * List of supported features
       */
      supported_features?: Array<string>;

      /**
       * List of supported sampling parameters
       */
      supported_sampling_parameters?: Array<string>;
    }

    export namespace Data {
      /**
       * OpenRouter pricing format.
       */
      export interface Pricing {
        /**
         * Cost per output token as string
         */
        completion: string;

        /**
         * Cost per input token as string
         */
        prompt: string;

        /**
         * Cost per image as string
         */
        image?: string;

        /**
         * Cost per cached input token read as string
         */
        input_cache_read?: string;

        /**
         * Cost per cached input token write as string
         */
        input_cache_write?: string;

        /**
         * Cost per request as string
         */
        request?: string;
      }

      /**
       * Datacenter location information.
       */
      export interface Datacenter {
        /**
         * ISO 3166 Alpha-2 country code
         */
        country_code: string;
      }

      /**
       * OpenRouter metadata.
       */
      export interface Openrouter {
        /**
         * OpenRouter slug for the model
         */
        slug: string;
      }
    }
  }

  /**
   * HuggingFace-compatible list of models.
   */
  export interface HuggingFaceModelsResponse {
    data: Array<HuggingFaceModelsResponse.Data>;

    object?: 'list';
  }

  export namespace HuggingFaceModelsResponse {
    /**
     * Model in HuggingFace-compatible format for inference providers.
     *
     * This format is used by HuggingFace to power their provider comparison table and
     * provider selection features.
     */
    export interface Data {
      id: string;

      /**
       * Supported context length in tokens
       */
      context_length: number;

      created: number;

      owned_by: string;

      /**
       * HuggingFace pricing format - price in USD per million tokens.
       */
      pricing: Data.Pricing;

      /**
       * HuggingFace capabilities format.
       */
      capabilities?: Data.Capabilities;

      /**
       * The corresponding HuggingFace Hub model ID
       */
      hugging_face_id?: string | null;

      object?: 'model';
    }

    export namespace Data {
      /**
       * HuggingFace pricing format - price in USD per million tokens.
       */
      export interface Pricing {
        /**
         * Price in USD per million input tokens
         */
        input: number;

        /**
         * Price in USD per million output tokens
         */
        output: number;
      }

      /**
       * HuggingFace capabilities format.
       */
      export interface Capabilities {
        function_calling?: boolean;

        streaming?: boolean;

        structured_outputs?: boolean;

        vision?: boolean;
      }
    }
  }
}

export interface ModelRetrieveParams {
  /**
   * Query param: Output format: 'default' (OpenAI-compatible), 'openrouter', or
   * 'huggingface'
   */
  format?: 'default' | 'openrouter' | 'huggingface';

  /**
   * Header param
   */
  'CF-RAY'?: string;

  /**
   * Header param
   */
  'X-Amz-Cf-Id'?: string;
}

export interface ModelListParams {
  /**
   * Query param: Output format: 'default' (OpenAI-compatible), 'openrouter', or
   * 'huggingface'
   */
  format?: 'default' | 'openrouter' | 'huggingface';

  /**
   * Header param
   */
  'CF-RAY'?: string;

  /**
   * Header param
   */
  'X-Amz-Cf-Id'?: string;
}

export declare namespace Models {
  export {
    type ModelRetrieveResponse as ModelRetrieveResponse,
    type ModelListResponse as ModelListResponse,
    type ModelRetrieveParams as ModelRetrieveParams,
    type ModelListParams as ModelListParams,
  };
}
