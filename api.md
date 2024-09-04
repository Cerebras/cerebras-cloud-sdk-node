# Chat

## Completions

Types:

- <code><a href="./src/resources/chat/completions.ts">ChatCompletion</a></code>
- <code><a href="./src/resources/chat/completions.ts">CompletionCreateResponse</a></code>

Methods:

- <code title="post /v1/chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>

# Models

Types:

- <code><a href="./src/resources/models.ts">ModelRetrieveResponse</a></code>
- <code><a href="./src/resources/models.ts">ModelListResponse</a></code>

Methods:

- <code title="get /v1/models/{model_id}">client.models.<a href="./src/resources/models.ts">retrieve</a>(modelId, { ...params }) -> ModelRetrieveResponse</code>
- <code title="get /v1/models">client.models.<a href="./src/resources/models.ts">list</a>({ ...params }) -> ModelListResponse</code>
