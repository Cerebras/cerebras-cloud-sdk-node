// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cerebras from '@cerebras/cerebras_cloud_sdk';
import { Response } from 'node-fetch';

const client = new Cerebras({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.completions.create({ model: 'model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.completions.create({
      model: 'model',
      best_of: 0,
      echo: true,
      frequency_penalty: -2,
      grammar_root: 'grammar_root',
      logit_bias: {},
      logprobs: 0,
      max_tokens: 0,
      min_tokens: 0,
      n: 0,
      presence_penalty: -2,
      prompt: 'string',
      return_raw_tokens: true,
      seed: 0,
      stop: 'string',
      stream: true,
      stream_options: { include_usage: true },
      suffix: 'suffix',
      temperature: 0,
      top_p: 0,
      user: 'user',
      'CF-RAY': 'CF-RAY',
      'X-Amz-Cf-Id': 'X-Amz-Cf-Id',
      'X-delay-time': 0,
    });
  });
});
