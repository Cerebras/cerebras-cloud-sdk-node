# Cerebras Node API Library

[![NPM version](https://img.shields.io/npm/v/@cerebras/cerebras_cloud_sdk.svg)](https://npmjs.org/package/@cerebras/cerebras_cloud_sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@cerebras/cerebras_cloud_sdk)

This library provides convenient access to the Cerebras REST API from server-side TypeScript or JavaScript.

The REST API documentation can be found on [inference-docs.cerebras.ai](https://inference-docs.cerebras.ai). The full API of this library can be found in [api.md](api.md).

It is generated with [Stainless](https://www.stainless.com/).

> [!NOTE]  
> This SDK has a mechanism that sends a few requests to `/v1/tcp_warming` upon construction to reduce the TTFT. If this behaviour is not desired, set `warmTCPConnection=false` in the constructor.
>
> If you are repeatedly reconstructing the SDK instance it will lead to poor performance. It is recommended that you construct the SDK once and reuse the instance if possible.

## About Cerebras

At Cerebras, we've developed the world's largest and fastest AI processor, the Wafer-Scale Engine-3 (WSE-3). The Cerebras CS-3 system, powered by the WSE-3, represents a new class of AI supercomputer that sets the standard for generative AI training and inference with unparalleled performance and scalability.

With Cerebras as your inference provider, you can:
- Achieve unprecedented speed for AI inference workloads
- Build commercially with high throughput
- Effortlessly scale your AI workloads with our seamless clustering technology

Our CS-3 systems can be quickly and easily clustered to create the largest AI supercomputers in the world, making it simple to place and run the largest models. Leading corporations, research institutions, and governments are already using Cerebras solutions to develop proprietary models and train popular open-source models.

Want to experience the power of Cerebras? Check out our [website](https://cerebras.net) for more resources and explore options for accessing our technology through the Cerebras Cloud or on-premise deployments!

## Installation
```
npm install @cerebras/cerebras_cloud_sdk
```

## API Key
Get an API Key from [cloud.cerebras.ai](https://cloud.cerebras.ai/) and add it to your environment variables:
```
export CEREBRAS_API_KEY="your-api-key-here"
```

## Usage

The full API of this library can be found in [api.md](api.md).

### Chat Completion
<!-- RUN TEST: ChatStandard -->
```ts
import Cerebras from '@cerebras/cerebras_cloud_sdk';

const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    model: 'llama3.1-8b',
    messages: [{ role: 'user', content: 'Why is fast inference important?' }],
  });

  console.log(chatCompletion?.choices[0]?.message);
}

main();
```

### Text Completion
<!-- RUN TEST: TextStandard -->
```ts
import Cerebras from '@cerebras/cerebras_cloud_sdk';

const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const completion = await client.completions.create({
    prompt: "It was a dark and stormy ",
    model: 'llama3.1-8b',
  });

  console.log(completion?.choices[0]?.text);
}

main();
```

## Streaming responses

We provide support for streaming responses using Server Sent Events (SSE).

Note that when streaming, `usage` and `time_info` will be information will only be included in the final chunk.

### Chat Completion
<!-- RUN TEST: ChatStreaming -->
```ts
import Cerebras from '@cerebras/cerebras_cloud_sdk';

const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const stream = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Why is fast inference important?' }],
    model: 'llama3.1-8b',
    stream: true,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
```

### Text Completion
<!-- RUN TEST: TextStreaming -->
```ts
import Cerebras from '@cerebras/cerebras_cloud_sdk';

const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const stream = await client.completions.create({
    prompt: "It was a dark and stormy ",
    model: 'llama3.1-8b',
    max_tokens: 10,
    stream: true,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.text || '');
  }
}

main();
```

If you need to cancel a stream, you can `break` from the loop
or call `stream.controller.abort()`.

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

<!-- RUN TEST: Types -->
```ts
import Cerebras from '@cerebras/cerebras_cloud_sdk';

const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
});

const params: Cerebras.Chat.ChatCompletionCreateParams = {
  model: 'llama3.1-8b',
  messages: [{ role: 'user', content: 'Why is fast inference important?' }],
};
const chatCompletion: Cerebras.Chat.ChatCompletion = await client.chat.completions.create(params);
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

<!-- RUN TEST: Error -->
```ts
import Cerebras from '@cerebras/cerebras_cloud_sdk';

const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const chatCompletion = await client.chat.completions
    .create({
      model: 'some-model-that-doesnt-exist' as any,
      messages: [{ role: 'user', content: 'This should cause an error!' }], // Ask TS to ignore the obviously invalid model name... Do not do this!
    })
    .catch(async (err) => {
      if (err instanceof Cerebras.APIError) {
        console.log(err.status); // 400
        console.log(err.name); // BadRequestError
        console.log(err.headers); // {server: 'nginx', ...}
        console.log(err); // Full exception
      } else {
        throw err;
      }
    });
}

main();
```

Error codes are as follows:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- RUN TEST: Retries -->
```js
import Cerebras from '@cerebras/cerebras_cloud_sdk';

// Configure the default for all requests:
const client = new Cerebras({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.chat.completions.create({ model: 'llama3.1-8b', messages: [{ role: 'user', content: 'Why is fast inference important?' }] }, {
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 1 minute by default. You can configure this with a `timeout` option:

<!-- RUN TEST: Timeout -->
```ts
import Cerebras from '@cerebras/cerebras_cloud_sdk';

// Configure the default for all requests:
const client = new Cerebras({
  timeout: 20 * 1000, // 20 seconds (default is 1 minute)
});

// Override per-request:
await client.chat.completions.create({ model: 'llama3.1-8b', messages: [{ role: 'user', content: 'Why is fast inference important?' }] }, {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.

<!-- RUN TEST: Advanced -->
```ts
import Cerebras from '@cerebras/cerebras_cloud_sdk';

const client = new Cerebras();

const response = await client.chat.completions
  .create({ model: 'llama3.1-8b', messages: [{ role: 'user', content: 'Why is fast inference important?' }] })
  .asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: chatCompletion, response: raw } = await client.chat.completions
  .create({ model: 'llama3.1-8b', messages: [{ role: 'user', content: 'Why is fast inference important?' }] })
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(chatCompletion);
```

### Making custom/undocumented requests

This library is typed for convenient access to the documented API. If you need to access undocumented
endpoints, params, or response properties, the library can still be used.

#### Undocumented endpoints

To make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.
Options on the client, such as retries, will be respected when making these requests.

```ts
await client.post('/some/path', {
  body: { some_prop: 'foo' },
  query: { some_query_arg: 'bar' },
});
```

#### Undocumented request params

To make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented
parameter. This library doesn't validate at runtime that the request matches the type, so any extra values you
send will be sent as-is.

```ts
client.foo.create({
  foo: 'my_param',
  bar: 12,
  // @ts-expect-error baz is not yet public
  baz: 'undocumented option',
});
```

For requests with the `GET` verb, any extra params will be in the query, all other requests will send the
extra param in the body.

If you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request
options.

#### Undocumented response properties

To access undocumented response properties, you may access the response object with `// @ts-expect-error` on
the response object, or cast the response object to the requisite type. Like the request params, we do not
validate or strip extra properties from the response from the API.

### Customizing the fetch client

By default, this library uses `node-fetch` in Node, and expects a global `fetch` function in other environments.

If you would prefer to use a global, web-standards-compliant `fetch` function even in a Node environment,
(for example, if you are running Node with `--experimental-fetch` or using NextJS which polyfills with `undici`),
add the following import before your first import `from "Cerebras"`:

```ts
// Tell TypeScript and the package to use the global web fetch instead of node-fetch.
// Note, despite the name, this does not add any polyfills, but expects them to be provided if needed.
import '@cerebras/cerebras_cloud_sdk/shims/web';
import Cerebras from '@cerebras/cerebras_cloud_sdk';
```

To do the inverse, add `import "@cerebras/cerebras_cloud_sdk/shims/node"` (which does import polyfills).
This can also be useful if you are getting the wrong TypeScript types for `Response` ([more details](https://github.com/Cerebras/cerebras-cloud-sdk-node/tree/main/src/_shims#readme)).

### Logging and middleware

You may also provide a custom `fetch` function when instantiating the client,
which can be used to inspect or alter the `Request` or `Response` before/after each request:

```ts
import { fetch } from 'undici'; // as one example
import Cerebras from '@cerebras/cerebras_cloud_sdk';

const client = new Cerebras({
  fetch: async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
    console.log('About to make a request', url, init);
    const response = await fetch(url, init);
    console.log('Got response', response);
    return response;
  },
});
```

Note that if given a `DEBUG=true` environment variable, this library will log all requests and responses automatically.
This is intended for debugging purposes only and may change in the future without notice.

### Configuring an HTTP(S) Agent (e.g., for proxies)

By default, this library uses a stable agent for all http/https requests to reuse TCP connections, eliminating many TCP & TLS handshakes and shaving around 100ms off most requests.

If you would like to disable or customize this behavior, for example to use the API behind a proxy, you can pass an `httpAgent` which is used for all requests (be they http or https), for example:

<!-- prettier-ignore -->
```ts
import http from 'http';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Configure the default for all requests:
const client = new Cerebras({
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
});

// Override per-request:
await client.chat.completions.create(
  { model: 'llama3.1-8b', messages: [{ role: 'user', content: 'Why is fast inference important?' }] },
  {
    httpAgent: new http.Agent({ keepAlive: false }),
  },
);
```

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/Cerebras/cerebras-cloud-sdk-node/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.5 is supported.

The following runtimes are supported:

- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)
- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.

## Contributing

See [the contributing documentation](./CONTRIBUTING.md).

