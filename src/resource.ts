// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Cerebras } from './index';

export abstract class APIResource {
  protected _client: Cerebras;

  constructor(client: Cerebras) {
    this._client = client;
  }
}
