// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as CompletionsAPI from './completions';
import { ChatCompletion, CompletionCreateParams, CompletionCreateResponse, Completions } from './completions';

export class Chat extends APIResource {
  completions: CompletionsAPI.Completions = new CompletionsAPI.Completions(this._client);
}

Chat.Completions = Completions;

export declare namespace Chat {
  export {
    Completions as Completions,
    type ChatCompletion as ChatCompletion,
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
  };
}
