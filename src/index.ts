// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import { Completion, CompletionCreateParams, Completions } from './resources/completions';
import {
  ModelListParams,
  ModelListResponse,
  ModelRetrieveParams,
  ModelRetrieveResponse,
  Models,
} from './resources/models';
import { Chat } from './resources/chat/chat';
import { ChatCompletion, ChatCompletionCreateParams } from './resources/chat/completions';

export interface ClientOptions {
  /**
   * Defaults to process.env['CEREBRAS_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['CEREBRAS_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;

  /**
   * When true, a request is sent to `/models` in the constructor to open a TCP
   * connection with the API server. This way, the first "real" request will have
   * less latency since it can reuse the already existing socket connection.
   *
   * @default true
   */
  warmTCPConnection?: boolean;
}

/**
 * API Client for interfacing with the Cerebras API.
 */
export class Cerebras extends Core.APIClient {
  apiKey: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Cerebras API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['CEREBRAS_API_KEY'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['CEREBRAS_BASE_URL'] ?? https://api.cerebras.ai] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   * @param {boolean | undefined} opts.warmTCPConnection - Whether to warm TCP connection in the constructor.
   */
  constructor({
    baseURL = Core.readEnv('CEREBRAS_BASE_URL'),
    apiKey = Core.readEnv('CEREBRAS_API_KEY'),
    warmTCPConnection = true,
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.CerebrasError(
        "The CEREBRAS_API_KEY environment variable is missing or empty; either provide it, or instantiate the Cerebras client with an apiKey option, like new Cerebras({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.cerebras.ai`,
    };

    super({
      baseURL: options.baseURL!,
      baseURLOverridden: baseURL ? baseURL !== 'https://api.cerebras.ai' : false,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;

    if (warmTCPConnection) {
      // Since this runs async, it's possible for DEBUG messages to
      // be printed after test ends, which will cause a warming.
      //
      // Doesn't seem to be an easy way to block until this promise is fulfilled.
      (async () => {
        try {
          await this.get('/v1/tcp_warming', {
            timeout: 1000,
            maxRetries: 0,
          });
        } catch (e) {
          Core.debug(`TCP Warming had exception: ${e}`);
        }
      })();
    }
  }

  chat: API.Chat = new API.Chat(this);
  completions: API.Completions = new API.Completions(this);
  models: API.Models = new API.Models(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'https://api.cerebras.ai';
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  static Cerebras = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static CerebrasError = Errors.CerebrasError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Cerebras.Chat = Chat;
Cerebras.Completions = Completions;
Cerebras.Models = Models;

export declare namespace Cerebras {
  export type RequestOptions = Core.RequestOptions;

  export {
    Chat as Chat,
    type ChatCompletion as ChatCompletion,
    type ChatCompletionCreateParams as ChatCompletionCreateParams,
  };

  export {
    Completions as Completions,
    type Completion as Completion,
    type CompletionCreateParams as CompletionCreateParams,
  };

  export {
    Models as Models,
    type ModelRetrieveResponse as ModelRetrieveResponse,
    type ModelListResponse as ModelListResponse,
    type ModelRetrieveParams as ModelRetrieveParams,
    type ModelListParams as ModelListParams,
  };
}

export { toFile, fileFromPath } from './uploads';
export {
  CerebrasError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default Cerebras;
