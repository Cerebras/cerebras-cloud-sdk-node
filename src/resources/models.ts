// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as ModelsAPI from './models';

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
    const { 'X-Amz-Cf-Id': xAmzCfId } = params;
    return this._client.get(`/v1/models/${modelId}`, {
      ...options,
      headers: { ...(xAmzCfId != null ? { 'X-Amz-Cf-Id': xAmzCfId } : undefined), ...options?.headers },
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
    const { 'X-Amz-Cf-Id': xAmzCfId } = params;
    return this._client.get('/v1/models', {
      ...options,
      headers: { ...(xAmzCfId != null ? { 'X-Amz-Cf-Id': xAmzCfId } : undefined), ...options?.headers },
    });
  }
}

export interface ModelRetrieveResponse {
  id: string;

  created?: number;

  object?: 'model';

  owned_by?: string;
  [k: string]: unknown;
}

export interface ModelListResponse {
  data: Array<ModelListResponse.Data>;

  object?: 'list';
  [k: string]: unknown;
}

export namespace ModelListResponse {
  export interface Data {
    id: string;

    created?: number;

    object?: 'model';

    owned_by?: string;
    [k: string]: unknown;
  }
}

export interface ModelRetrieveParams {
  'X-Amz-Cf-Id'?: string;
}

export interface ModelListParams {
  'X-Amz-Cf-Id'?: string;
}

export namespace Models {
  export import ModelRetrieveResponse = ModelsAPI.ModelRetrieveResponse;
  export import ModelListResponse = ModelsAPI.ModelListResponse;
  export import ModelRetrieveParams = ModelsAPI.ModelRetrieveParams;
  export import ModelListParams = ModelsAPI.ModelListParams;
}
