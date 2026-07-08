// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cerebras from '@cerebras/cerebras_cloud_sdk';
import { Response } from 'node-fetch';

const client = new Cerebras({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.chat.completions.create({
      messages: [
        {
          content: 'You are a helpful assistant running on a CS-3 hardware at Cerebras Systems',
          role: 'system',
        },
        { content: 'What is Generative AI?', role: 'user' },
      ],
      model: 'gpt-oss-120b',
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
      messages: [
        {
          content: 'You are a helpful assistant running on a CS-3 hardware at Cerebras Systems',
          name: 'name',
          role: 'system',
        },
        {
          content: 'What is Generative AI?',
          name: 'name',
          role: 'user',
        },
      ],
      model: 'gpt-oss-120b',
      clear_thinking: true,
      disable_reasoning: true,
      frequency_penalty: -2,
      logit_bias: { foo: 0 },
      logprobs: true,
      max_completion_tokens: -1,
      max_tokens: -1,
      min_completion_tokens: -1,
      min_tokens: 1000,
      model_parameters: { foo: 'bar' },
      n: 1,
      parallel_tool_calls: true,
      prediction: { content: 'string', type: 'content' },
      presence_penalty: -2,
      prompt_cache_key: 'prompt_cache_key',
      reasoning_effort: 'none',
      reasoning_format: 'none',
      response_format: { type: 'text' },
      seed: 0,
      service_tier: 'auto',
      stop: 'string',
      stream: false,
      stream_options: { include_usage: true },
      temperature: 0,
      tool_choice: 'none',
      tools: [
        {
          function: {
            name: 'name',
            description: 'description',
            parameters: { foo: 'bar' },
            strict: true,
          },
          type: 'type',
        },
      ],
      top_logprobs: 0,
      top_p: 1,
      user: 'user',
      'CF-RAY': 'CF-RAY',
      'X-Amz-Cf-Id': 'X-Amz-Cf-Id',
      'X-delay-time': 0,
    });
  });
});
