// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as UserAPI from './user';

export class UserResource extends APIResource {
  /**
   * This can only be done by the logged in user.
   */
  create(body?: UserCreateParams, options?: Core.RequestOptions): Core.APIPromise<void>;
  create(options?: Core.RequestOptions): Core.APIPromise<void>;
  create(
    body: UserCreateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    if (isRequestOptions(body)) {
      return this.create({}, body);
    }
    return this._client.post('/user', { body, ...options, headers: { Accept: '*/*', ...options?.headers } });
  }

  /**
   * Get user by user name
   */
  retrieve(username: string, options?: Core.RequestOptions): Core.APIPromise<User> {
    return this._client.get(`/user/${username}`, options);
  }

  /**
   * This can only be done by the logged in user.
   */
  update(
    existingUsername: string,
    body?: UserUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void>;
  update(existingUsername: string, options?: Core.RequestOptions): Core.APIPromise<void>;
  update(
    existingUsername: string,
    body: UserUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    if (isRequestOptions(body)) {
      return this.update(existingUsername, {}, body);
    }
    return this._client.put(`/user/${existingUsername}`, {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * This can only be done by the logged in user.
   */
  delete(username: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/user/${username}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Creates list of users with given input array
   */
  createWithList(body: UserCreateWithListParams, options?: Core.RequestOptions): Core.APIPromise<User> {
    return this._client.post('/user/createWithList', { body, ...options });
  }

  /**
   * Logs user into the system
   */
  login(query?: UserLoginParams, options?: Core.RequestOptions): Core.APIPromise<string>;
  login(options?: Core.RequestOptions): Core.APIPromise<string>;
  login(
    query: UserLoginParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<string> {
    if (isRequestOptions(query)) {
      return this.login({}, query);
    }
    return this._client.get('/user/login', {
      query,
      ...options,
      headers: { Accept: 'application/json', ...options?.headers },
    });
  }

  /**
   * Logs out current logged in user session
   */
  logout(options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.get('/user/logout', { ...options, headers: { Accept: '*/*', ...options?.headers } });
  }
}

export interface User {
  id?: number;

  email?: string;

  firstName?: string;

  lastName?: string;

  password?: string;

  phone?: string;

  username?: string;

  /**
   * User Status
   */
  userStatus?: number;
}

export type UserLoginResponse = string;

export interface UserCreateParams {
  id?: number;

  email?: string;

  firstName?: string;

  lastName?: string;

  password?: string;

  phone?: string;

  username?: string;

  /**
   * User Status
   */
  userStatus?: number;
}

export interface UserUpdateParams {
  id?: number;

  email?: string;

  firstName?: string;

  lastName?: string;

  password?: string;

  phone?: string;

  username?: string;

  /**
   * User Status
   */
  userStatus?: number;
}

export type UserCreateWithListParams = Array<User>;

export interface UserLoginParams {
  /**
   * The password for login in clear text
   */
  password?: string;

  /**
   * The user name for login
   */
  username?: string;
}

export namespace UserResource {
  export import User = UserAPI.User;
  export import UserLoginResponse = UserAPI.UserLoginResponse;
  export import UserCreateParams = UserAPI.UserCreateParams;
  export import UserUpdateParams = UserAPI.UserUpdateParams;
  export import UserCreateWithListParams = UserAPI.UserCreateWithListParams;
  export import UserLoginParams = UserAPI.UserLoginParams;
}
