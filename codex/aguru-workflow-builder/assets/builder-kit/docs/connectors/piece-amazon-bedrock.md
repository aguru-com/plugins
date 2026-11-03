# AWS Bedrock

Build generative AI applications with foundation models

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-amazon-bedrock'
  version: '0.4.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect your AWS account to use Amazon Bedrock AI models.
>
> **How to get your credentials:**
> 1. Open the [AWS IAM Console](https://console.aws.amazon.com/iam/) and go to **Users**.
> 2. Select your user (or create a new one), then go to **Security credentials**.
> 3. Click **Create access key** — copy both the Access Key ID and Secret Access Key.
> 4. Make sure the IAM user has the **AmazonBedrockFullAccess** policy attached.
>
> **Enable model access:** In the [AWS Bedrock Console](https://console.aws.amazon.com/bedrock/), go to **Model access** and request access to the models you want to use.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessKeyId` | string | yes |  | Access Key ID. Your AWS access key ID. Found in AWS IAM Console → Users → Security credentials. |
| `secretAccessKey` | string | yes |  | Secret Access Key. Your AWS secret access key. Only shown once when you create the access key — store it safely. |
| `sessionToken` | string | no |  | Session Token. Only for temporary credentials from AWS SSO or STS. They expire. |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-2"`, `"us-west-2"`, `"ap-south-2"`, `"ap-south-1"`, `"ap-northeast-3"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ap-northeast-1"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-south-1"`, `"eu-west-3"`, `"eu-south-2"`, `"eu-north-1"`, `"eu-central-2"`, `"sa-east-1"`. |

### `OIDC`: AWS Bedrock (IAM Role / OIDC)

> Connect your AWS account using an IAM Role via OIDC — no permanent keys required.
>
> Activepieces acts as an OIDC identity provider. AWS trusts this provider and issues temporary credentials via `AssumeRoleWithWebIdentity`.
>
> **Setup steps:**
> 1. In AWS IAM → Identity Providers → Create Provider:
> - Provider type: **OpenID Connect**
> - Provider URL: `{{frontendUrl}}`
> - Audience: `sts.amazonaws.com`
>
> > AWS fetches `{{frontendUrl}}/.well-known/openid-configuration` to discover the OIDC metadata. If your frontend and API run on different domains, make sure the API server is reachable at `{{frontendUrl}}` (or that your frontend proxies `/.well-known/*` to the API), otherwise `AssumeRoleWithWebIdentity` will fail.
> 2. Create an IAM Role with this trust policy:
> ```json
> {
> "Version": "2012-10-17",
> "Statement": [{
> "Effect": "Allow",
> "Principal": { "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/{{frontendHost}}" },
> "Action": "sts:AssumeRoleWithWebIdentity",
> "Condition": {
> "StringEquals": {
> "{{frontendHost}}:aud": "sts.amazonaws.com"
> },
> "StringLike": {
> "{{frontendHost}}:sub": "platform:{{platformId}}:project:{{projectId}}"
> }
> }
> }]
> }
> ```
> 3. Attach Bedrock permissions to the role (e.g. the `AmazonBedrockFullAccess` policy) and paste the **Role ARN** below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roleArn` | string | yes |  | Role ARN. The ARN of the IAM role to assume (e.g. arn:aws:iam::123456789012:role/MyRole). |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-2"`, `"us-west-2"`, `"ap-south-2"`, `"ap-south-1"`, `"ap-northeast-3"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ap-northeast-1"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-south-1"`, `"eu-west-3"`, `"eu-south-2"`, `"eu-north-1"`, `"eu-central-2"`, `"sa-east-1"`. |

## Actions

### `send_prompt`

**Ask Bedrock.** Sends a text prompt to a foundation model on Amazon Bedrock via the Converse API and returns the generated text, with optional system prompt, temperature, top-p, max-tokens, and stop sequences; leave Conversation Memory ID empty for a stateless one-off question or set one to persist message history across runs, and optionally attach a single file either uploaded directly or referenced by S3 bucket and key. This is the general-purpose text entry point for Bedrock - prefer Generate Content from Image for a one-off vision question, Generate Image to produce a picture, or Generate Embeddings for vectors. Requires a model id enabled in the connected AWS region. Not idempotent: each call bills a fresh non-deterministic completion and appends to the stored history whenever a memory key is set. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The foundation model to use for generation. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. The message or question to send to the model. |
| `systemPrompt` | string | no |  | System Prompt. Instructions that set the model's behavior and persona (e.g. "You are a helpful assistant that replies concisely."). |
| `temperature` | number | no | `0.7` | Temperature. Controls how creative or predictable the response is. Lower values (e.g. 0.2) give focused, consistent answers. Higher values (e.g. 0.9) give more varied, creative output. |
| `maxTokens` | number | no | `2048` | Maximum Tokens. The maximum length of the response. One token is roughly 4 characters. 2048 tokens ≈ ~1500 words. |
| `topP` | number | no | `1` | Top P. Limits the pool of words the model picks from (0–1). Lower values make responses more focused. Leave at 1 to disable this filter and use Temperature instead. |
| `stopSequences` | array | no |  | Stop Sequences. Text strings that, when generated, cause the model to stop immediately (e.g. "END" or "\n\n"). Up to 4 sequences. |
| `memoryKey` | string | no |  | Conversation Memory ID. A unique name for this conversation's memory (e.g. "support-chat-user-123"). When set, the model remembers previous messages in this flow. Leave empty for a single-turn interaction with no memory. |
| `attachmentSource` | string | no |  | Attachment Source (Optional). Optionally include a file alongside your prompt. Choose whether to upload directly or reference one from S3. One of `"file"`, `"s3"`. |
| `attachment` | object | no |  | Attachment. An object whose fields depend on other inputs; the product shows them. |

### `generate_content_from_image`

**Generate Content from Image.** Asks a vision-capable Bedrock foundation model a question about one image and returns the answer as text; the image is supplied either as an uploaded file or by S3 bucket and key, and the model list is filtered to models that accept image input. Pick this for one-off image understanding such as OCR, description, classification, or extraction, and use Ask Bedrock instead when the prompt is text-only, needs conversation memory, or carries a document, video, or audio attachment; use Generate Image to create a picture rather than read one. Not idempotent: each call bills a fresh non-deterministic completion. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The foundation model to use. Must support image input. A value the product loads from the provider, such as an id; write the value itself. |
| `source` | string | yes | `"file"` | Image Source. Choose how to provide the image — upload directly or reference one already in S3. One of `"file"`, `"s3"`. |
| `image` | object | yes |  | Image. An object whose fields depend on other inputs; the product shows them. |
| `prompt` | string | yes |  | Prompt. What do you want the model to tell you about the image? |
| `systemPrompt` | string | no |  | System Prompt. Instructions that guide the model behavior. |
| `temperature` | number | no | `0.7` | Temperature. Controls randomness. Lower values produce more deterministic output. |
| `maxTokens` | number | no | `2048` | Maximum Tokens. The maximum number of tokens to generate. |

### `generate_image`

**Generate Image.** Generates one image from a text prompt using a Bedrock image model (Amazon Titan Image Generator, Nova Canvas, or Stability AI) and stores it as a file reference; supports a negative prompt, width and height, and a seed for reproducible output. Pick this to create new imagery from a description - use Generate Content from Image to interpret an existing image, and Ask Bedrock for text output. Requires an image-output model enabled in the connected AWS region, at a resolution that model supports. Not idempotent: each call invokes the model and writes a new file, though a fixed seed with the same prompt reproduces the same picture. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The image generation model to use. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. A text description of the image you want to generate. |
| `negativePrompt` | string | no |  | Negative Prompt. Describe what you do NOT want in the image. Helps refine the output. |
| `width` | number | no | `1024` | Width. Image width in pixels. Must be supported by the model. |
| `height` | number | no | `1024` | Height. Image height in pixels. Must be supported by the model. |
| `seed` | number | no |  | Seed. A seed for reproducible results. Use the same seed and prompt to get the same image. |

### `generate_embeddings`

**Generate Embeddings.** Converts one text string into a numeric embedding vector using a Bedrock embedding model (Amazon Titan Embed, Cohere Embed, Nova Multimodal, or TwelveLabs), returning the vector and its dimension count; the request shape is adapted per model family, so Vector Dimensions, Normalize, and Embedding Purpose only take effect on the families that support them. Pick this for semantic search, similarity, or clustering pipelines rather than Ask Bedrock, which returns prose. Handles a single text per call - loop for batches - and requires an embedding-capable model enabled in the connected AWS region. Deterministic stateless inference, so repeat calls with the same input are idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The embedding model to use. A value the product loads from the provider, such as an id; write the value itself. |
| `inputText` | string | yes |  | Input Text. The text to generate embeddings for. |
| `embeddingPurpose` | string | no | `"GENERIC_INDEX"` | Embedding Purpose. How the embeddings will be used — helps the model optimize the output. Only applies to Nova Multimodal Embeddings models. Leave as "Generic Index" if unsure. One of `"GENERIC_INDEX"`, `"GENERIC_RETRIEVAL"`, `"TEXT_RETRIEVAL"`, `"CLASSIFICATION"`, `"CLUSTERING"`. |
| `dimensions` | number | no |  | Vector Dimensions. Size of the output vector. Larger = more accurate but slower/costlier. Titan Embed v2 supports: 256, 512, 1024. Nova Multimodal supports: 256, 384, 1024, 3072. Leave blank to use the model default. |
| `normalize` | boolean | no | `true` | Normalize Output. Scale the output vector so its values range between -1 and 1. Recommended for similarity comparisons. Only supported by Titan Embed v2. |

### `custom_api_call`

**Custom API Call.** Makes an arbitrary AWS SigV4-signed HTTP request to a chosen Bedrock endpoint - the Bedrock control plane, Bedrock Runtime, Bedrock Agent control plane, or Bedrock Agent Runtime - with your own method, path, query parameters, headers, and JSON body, optionally returning errors as output instead of failing the step. Use as an escape hatch for Bedrock operations this piece does not wrap, such as knowledge bases, guardrails, or agent invocation. Requires the service and path to match the AWS Bedrock API reference for the connected region. Idempotency depends on the call made: GET reads are safe to repeat, while model invocations and mutating writes are not. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `service` | string | yes | `"bedrock"` | Service. Select the AWS Bedrock service endpoint to call. Use "Bedrock" for control plane operations (e.g., ListFoundationModels) and "Bedrock Runtime" for inference operations (e.g., InvokeModel). One of `"bedrock"`, `"bedrock-runtime"`, `"bedrock-agent"`, `"bedrock-agent-runtime"`. |
| `method` | string | yes | `"GET"` | Method. HTTP method for the request. Use GET to fetch data, POST/PUT to create or update, DELETE to remove. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `path` | string | yes | `"/foundation-models"` | Path. The API path (e.g., /foundation-models, /model/{modelId}/invoke). See the AWS Bedrock API Reference for available endpoints. |
| `headers` | object | no |  | Headers. Additional headers to include. Authorization headers are automatically added via AWS Signature V4. |
| `queryParams` | object | no |  | Query Parameters. Query parameters to include in the request URL. |
| `body` | JSON | no |  | Body. JSON body for POST/PUT requests. |
| `failsafe` | boolean | no | `false` | Return Error as Output. When enabled, errors (e.g. 4xx/5xx responses) are returned as output instead of stopping the flow. Useful when you want to handle errors in a later step. |
| `timeout` | number | no | `30` | Timeout (in seconds). How long to wait for a response before the request is cancelled. Defaults to 30 seconds. |
