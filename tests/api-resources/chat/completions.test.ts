// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cerebras from 'cerebras_cloud_sdk';
import { Response } from 'node-fetch';

const cerebras = new Cerebras({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = cerebras.chat.completions.create({
      messages: [{ content: 'content', role: 'system' }],
      model: 'llama3-8b-8192',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await cerebras.chat.completions.create({
      messages: [{ content: 'content', name: 'name', role: 'system' }],
      model: 'llama3-8b-8192',
      max_tokens: 0,
      seed: 0,
      stop: 'string',
      stream: true,
      temperature: 0,
      top_p: 0,
      user: 'user',
      'X-Amz-Cf-Id': 'X-Amz-Cf-Id',
    });
  });
});
