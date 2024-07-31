// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cerebras from 'cerebras_cloud_sdk';
import { Response } from 'node-fetch';

const client = new Cerebras({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.chat.completions.create({
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
    const response = await client.chat.completions.create({
      messages: [{ content: 'content', name: 'name', role: 'system' }],
      model: 'llama3-8b-8192',
      frequency_penalty: -2,
      logit_bias: {},
      logprobs: true,
      max_tokens: 0,
      n: 0,
      parallel_tool_calls: true,
      presence_penalty: -2,
      response_format: { type: 'text' },
      seed: 0,
      service_tier: 'auto',
      stop: 'string',
      stream: true,
      stream_options: { include_usage: true },
      temperature: 0,
      tool_choice: 'none',
      tools: [
        { function: { description: 'description', name: 'name', parameters: {} }, type: 'type' },
        { function: { description: 'description', name: 'name', parameters: {} }, type: 'type' },
        { function: { description: 'description', name: 'name', parameters: {} }, type: 'type' },
      ],
      top_logprobs: 0,
      top_p: 0,
      user: 'user',
      'X-Amz-Cf-Id': 'X-Amz-Cf-Id',
      'X-delay-time': 0,
    });
  });
});
