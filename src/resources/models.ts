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
    const { 'CF-RAY': cfRay, 'X-Amz-Cf-Id': xAmzCfId } = params;
    return this._client.get(`/v1/models/${modelId}`, {
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
    const { 'CF-RAY': cfRay, 'X-Amz-Cf-Id': xAmzCfId } = params;
    return this._client.get('/v1/models', {
      ...options,
      headers: {
        ...(cfRay != null ? { 'CF-RAY': cfRay } : undefined),
        ...(xAmzCfId != null ? { 'X-Amz-Cf-Id': xAmzCfId } : undefined),
        ...options?.headers,
      },
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
  'CF-RAY'?: string;

  'X-Amz-Cf-Id'?: string;
}

export interface ModelListParams {
  'CF-RAY'?: string;

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
