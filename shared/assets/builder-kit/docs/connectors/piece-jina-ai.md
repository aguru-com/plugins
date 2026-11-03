# Jina AI

AI-powered web content extraction, search, and classification

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-jina-ai'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can get your API key from [Jina AI](https://jina.ai).

## Actions

### `extract_webpage_content`

**Extract Webpage Content.** Fetch a single webpage by URL via the Jina Reader API and return its content cleaned for LLM consumption, with optional markdown/HTML/text/screenshot output, CSS-selector targeting or exclusion, and link/image summaries. Pick this when you already have the target URL; to find pages by keyword first, use Web Search Summarization. Read-only fetch, so repeat calls are idempotent (results may be served from cache unless do-not-track is set). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The URL of the webpage to extract content from. |
| `format` | string | yes | `"default"` | Output Format. Format of the extracted content - how the webpage should be returned. One of `"default"`, `"markdown"`, `"html"`, `"text"`, `"screenshot"`, `"pageshot"`. |
| `remove_all_images` | boolean | no | `false` | Remove All Images. Remove all images from the response. |
| `links_summary` | string | no | `"none"` | Gather Links. Create a "Buttons & Links" section at the end to help downstream LLMs or web agents navigate the page. One of `"none"`, `"true"`, `"all"`. |
| `images_summary` | string | no | `"none"` | Gather Images. Create an "Images" section at the end, giving downstream LLMs an overview of all visuals on the page. One of `"none"`, `"true"`, `"all"`. |
| `do_not_track` | boolean | no | `false` | Do Not Cache & Track!. When enabled, the requested URL won't be cached and tracked on our server. |
| `iframe_extraction` | boolean | no | `false` | iframe Extraction. Processes content from all embedded iframes in the DOM tree. |
| `shadow_dom_extraction` | boolean | no | `false` | Shadow DOM Extraction. Extracts content from all Shadow DOM roots in the document. |
| `follow_redirect` | boolean | no | `false` | Follow Redirect. Choose whether to resolve to the final destination URL after following all redirects. Enable to follow the full redirect chain. |
| `eu_compliance` | boolean | no | `false` | EU Compliance. All infrastructure and data processing operations reside entirely within EU jurisdiction. |
| `json_response` | boolean | no | `false` | JSON Response. Return response in JSON format containing URL, title, content, and timestamp (if available). |
| `timeout_seconds` | number | no | `0` | Timeout Seconds. Maximum page load wait time in seconds (0 means use default timeout, set a value if the default browser engine is too slow on simple webpages). |
| `css_selector` | string | no |  | CSS Selector: Only. List of CSS selectors to target specific page elements (e.g., "body, .main-content, #article"). |
| `wait_for_selector` | string | no |  | CSS Selector: Wait-For. CSS selectors to wait for before returning results (e.g., "#dynamic-content, .lazy-loaded"). |
| `exclude_selector` | string | no |  | CSS Selector: Excluding. CSS selectors for elements to remove from the results (e.g., "header, footer, .ads, #sidebar"). |

Output fields:

- `code`: Code (number)
- `status`: Status (number)
- `data`: Data
- `data.title`: Title
- `data.description`: Description
- `data.url`: URL (url)
- `data.content`: Content
- `data.warning`: Warning
- `data.metadata`: Metadata
- `data.httpStatus`: Http Status (number)
- `data.httpStatusText`: Http Status Text
- `data.usage`: Usage
- `data.usage.outputTokens`: Output Tokens (number)
- `data.usage.measuredTokens`: Measured Tokens (number)
- `data.usage.scaledTokens`: Scaled Tokens (number)
- `data.usage.tokens`: Tokens (number)
- `meta`: Meta
- `meta.usage`: Usage
- `meta.usage.outputTokens`: Output Tokens (number)
- `meta.usage.measuredTokens`: Measured Tokens (number)
- `meta.usage.scaledTokens`: Scaled Tokens (number)
- `meta.usage.tokens`: Tokens (number)

### `web_search_summarization`

**Web Search Summarization.** Run a web search through the Jina Reader search API and return the result list, optionally visiting every hit to include full page content; supports country/language/location targeting, in-site (single-domain) search, and pagination. Pick this to discover pages by keyword — use Extract Webpage Content for a known URL or DeepSearch Query for multi-step research questions. Read-only search, so repeat calls are idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The search query to perform. |
| `read_full_content` | boolean | no | `false` | Read Full Content of SERP. Visit every URL in the search result and return the full content using Reader. Toggle on to enable more Reader-specific options. |
| `json_response` | boolean | no | `false` | JSON Response. The response will be in JSON format, containing the URL, title, content, and timestamp (if available). In Search mode, it returns a list of five entries, each following the described JSON structure. |
| `fetch_favicons` | boolean | no | `false` | Fetch Favicons. This will fetch the favicon of each URL in the SERP and include them in the response as image URI, useful for UI rendering. |
| `preferred_country` | string | no | `"Default"` | Preferred Country. The country to use for the search. It's a two-letter country code. One of `"Default"`, `"US"`, `"CA"`, `"MX"`, `"GB"`, `"DE"`, `"FR"`, `"JP"`, `"CN"`, `"IN"`, `"BR"`, `"AU"`, `"IT"`, `"ES"`, `"KR"`, `"NL"`, `"CH"`, `"SE"`, `"IE"`, `"SG"`, `"IL"`, `"SA"`, `"ZA"`, `"AE"`. |
| `preferred_location` | string | no |  | Preferred Location. From where you want the search query to originate. It is recommended to specify location at the city level in order to simulate a real user's search. |
| `preferred_language` | string | no | `"Default"` | Preferred Language. The language to use for the search. It's a two-letter language code. One of `"Default"`, `"en"`, `"es"`, `"fr"`, `"de"`, `"ja"`, `"zh-cn"`, `"hi"`, `"pt"`, `"it"`, `"ko"`, `"nl"`, `"ar"`, `"sv"`, `"iw"`, `"af"`. |
| `pagination` | number | no | `1` | Pagination. The result offset. It skips the given number of results. It's used for pagination. |
| `in_site_search` | string | no |  | In-site Search. Returns the search results only from the specified website or domain. By default it searches the entire web. |
| `bypass_cached_content` | boolean | no | `false` | Bypass Cached Content. Our API caches URL contents for a certain amount of time. Set it to true to ignore the cached result and fetch the content from the URL directly. |
| `eu_compliance` | boolean | no | `false` | EU Compliance. All infrastructure and data processing operations reside entirely within EU jurisdiction. |

Output fields:

- `code`: Code (number)
- `status`: Status (number)
- `data`: Data
- `data[].title`: Title
- `data[].url`: URL (url)
- `data[].description`: Description
- `data[].content`: Content
- `data[].usage`: Usage
- `data[].usage.tokens`: Tokens (number)
- `data[].date`: Date
- `meta`: Meta
- `meta.usage`: Usage
- `meta.usage.tokens`: Tokens (number)

### `deepsearch_query`

**DeepSearch Query.** Answer a complex research question with Jina DeepSearch, which iteratively searches the web, reads pages, and reasons before responding; supports domain include/exclude lists, token budget, and an optional JSON schema for structured output. Pick this for multi-hop research questions rather than a plain keyword search (use Web Search Summarization for that); it is slower and more token-hungry than a single search. Read-only, so safe to retry, though answers may vary between runs. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"jina-deepsearch-v1"` | Model. One of `"jina-deepsearch-v1"`. |
| `prompt` | string | yes |  | Prompt. |
| `reasoning_effort` | string | no | `"medium"` | Reasoning Effort. Constrains effort on reasoning for reasoning models. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response. One of `"low"`, `"medium"`, `"high"`. |
| `budget_tokens` | number | no | `0` | Budget Tokens. This determines the maximum number of tokens allowed for DeepSearch process. Larger budgets can improve response quality by enabling more exhaustive search for complex queries. |
| `max_attempts` | number | no | `1` | Max Attempts. The maximum number of retries for solving a problem in DeepSearch process. A larger value allows DeepSearch to retry solving the problem by using different reasoning approaches and strategies. |
| `no_direct_answer` | boolean | no | `false` | No Direct Answer. Forces the model to take further thinking/search steps even when the query seems trivial. Useful if you're using DeepSearch in scenarios where you're certain the query always needs DeepSearch, rather than for trivial questions. |
| `max_returned_urls` | number | no | `1` | Max Returned URLs. The maximum number of URLs to include in the final answer/chunk. URLs are sorted by relevance and other important factors. |
| `response_format` | JSON | no |  | Structured Output. JSON schema for structured output format. Example: { "type": "json_schema", "json_schema": { "type": "object", "properties": { "numerical_answer_only": { "type": "number" } } } }. |
| `boost_hostnames` | string | no |  | Good Domains. A list of domains that are given a higher priority for content retrieval. Useful for domain-specific, high-quality sources that provide valuable content. |
| `bad_hostnames` | string | no |  | Bad Domains. A list of domains to be strictly excluded from content retrieval. Typically used to filter out known spam, low-quality, or irrelevant websites. |
| `only_hostnames` | string | no |  | Only Domains. A list of domains to be exclusively included in content retrieval. All other domains will be ignored. Useful for domain-specific searches. |

### `classify_content`

**Classify Text or Image.** Classify a single piece of text or an image URL into one of a provided set of labels using Jina AI zero-shot classification; returns the winning label. Pick this to categorize content against your own label set without training; if the input string is a URL it is treated as an image. Stateless inference, so repeat calls are idempotent. To fine-tune a reusable classifier on labeled examples instead, use Train Custom Classifier. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"jina-clip-v2"` | Model. The model to use for classification. One of `"jina-clip-v2"`, `"jina-embeddings-v3"`, `"jina-clip-v1"`. |
| `input` | string | yes |  | Text. Text or image URL to classify. URLs will be treated as images, other strings as text. |
| `labels` | array | yes |  | Labels. The labels to classify the content into. |

Output fields:

- `label`: Label

### `train_custom_classifier`

**Train Custom Classifier.** Train a custom Jina AI classifier from an array of labeled text or image-URL examples, choosing the base embedding model, iteration count, and private/public visibility. Pick this only when zero-shot labeling (Classify Text or Image) is not accurate enough and you have labeled training data. Each call creates a new training job/classifier, so repeated calls are not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"jina-clip-v2"` | Model. The base model to use for training. One of `"jina-clip-v2"`, `"jina-embeddings-v3"`, `"jina-clip-v1"`. |
| `access` | string | yes | `"private"` | Access Level. Visibility of the trained model. One of `"private"`, `"public"`. |
| `num_iters` | number | no | `10` | Number of Iterations. Number of training iterations to perform. |
| `training_data` | array | yes |  | Training Data. Each item: { `type`, `input`, `label` }. |

### `jina_ai_create_embeddings`

**Create Embeddings.** Convert one or more text strings into embedding vectors with a Jina embedding model; use it to prepare text for semantic search, clustering or similarity. Stateless compute with no side effects. For thousands of texts use Create Batch Embeddings instead, and use List Models to see available models. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"jina-embeddings-v5-text-small"` | Model. Embedding model id, for example jina-embeddings-v5-text-small. List Models returns valid ids. |
| `input` | array | yes |  | Texts. The texts to embed, one per item. |
| `task` | string | no |  | Task. Task optimization, for example retrieval.query, retrieval.passage, text-matching, classification or separation. |
| `dimensions` | number | no |  | Dimensions. Number of dimensions of each output vector. Leave empty for the model default. |

Output fields:

- `model`: Model
- `object`: Object
- `usage`: Usage
- `usage.total_tokens`: Total Tokens (number)
- `data`: Embeddings
- `data[].object`: Object
- `data[].index`: Index (number)
- `data[].embedding`: Embedding Vector

### `jina_ai_rerank_documents`

**Rerank Documents.** Rank a list of text documents by relevance to a query using a Jina reranker model; returns each document index with a relevance score, best first. Use it to reorder search or retrieval results. Stateless compute with no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"jina-reranker-v3"` | Model. Reranker model id, for example jina-reranker-v3. List Models returns valid ids. |
| `query` | string | yes |  | Query. The query to rank the documents against. |
| `documents` | array | yes |  | Documents. The texts to rank, one per item. |
| `topN` | number | no |  | Top N. Number of best results to return. Leave empty to return all documents. |
| `returnDocuments` | boolean | no | `true` | Return Documents. Include the document text in each result. |

Output fields:

- `model`: Model
- `object`: Object
- `usage`: Usage
- `usage.total_tokens`: Total Tokens (number)
- `results`: Ranked Results
- `results[].index`: Index (number)
- `results[].relevance_score`: Relevance Score (number)
- `results[].document`: Document
- `results[].document.text`: Text

### `jina_ai_create_batch_embeddings`

**Create Batch Embeddings.** Start an asynchronous batch embedding job for large inputs, from inline JSONL lines or an input file URL (provide exactly one); each line must be a JSON object with custom_id and body.input; returns a batch id and status immediately. Not idempotent: each call starts a new job. Poll with Get Batch, which returns the status and the output file URL once the job completes. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"jina-embeddings-v5-text-small"` | Model. Embedding model id, for example jina-embeddings-v5-text-small or jina-embeddings-v5-text-nano. |
| `input` | array | no |  | Inline Input Lines. JSONL lines for small batches, one JSON object per item in the form {"custom_id": "id-1", "body": {"input": "your text"}}. Provide this or an Input URL, not both. |
| `inputUrl` | string | no |  | Input URL. URL of a JSONL input file (GCS, S3 or HTTP). Provide this or inline lines, not both. |
| `task` | string | no |  | Task. Task optimization: retrieval, text-matching, clustering or classification. |
| `dimensions` | number | no |  | Dimensions. Number of dimensions of each output vector. Leave empty for the model default. |

Output fields:

- `batch_id`: Batch ID
- `status`: Status
- `model`: Model
- `created_at`: Created At (datetime)
- `expires_at`: Expires At (datetime)

### `jina_ai_get_batch`

**Get Batch.** Read the current status, stats and output file URLs of a batch embedding job by id. Poll this after Create Batch Embeddings until the status is terminal; it never waits. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `batchId` | string | yes |  | Batch ID. Id of the batch job, returned by Create Batch Embeddings or List Batches. |

Output fields:

- `batch_id`: Batch ID
- `status`: Status
- `model`: Model
- `created_at`: Created At (datetime)
- `completed_at`: Completed At (datetime)
- `expires_at`: Expires At (datetime)
- `error`: Error

### `jina_ai_list_batches`

**List Batches.** List recent batch embedding jobs with their ids and statuses; use it to find a batch id for Get Batch. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of jobs to return. |

Output fields:

- `batches`: Batches
- `batches[].batch_id`: Batch ID
- `batches[].status`: Status
- `batches[].model`: Model
- `batches[].created_at`: Created At (datetime)
- `batches[].completed_at`: Completed At (datetime)
- `batches[].expires_at`: Expires At (datetime)
- `batches[].error`: Error
- `count`: Count (number)

### `jina_ai_list_models`

**List Models.** List the models available on the Jina API with ids, context lengths and pricing; use it to find a valid model id for embeddings, reranking or batch jobs. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `models`: Models
- `models[].id`: ID
- `models[].hugging_face_id`: Hugging Face ID
- `models[].name`: Name
- `models[].created`: Created (number)
- `models[].input_modalities`: Input Modalities
- `models[].output_modalities`: Output Modalities
- `models[].quantization`: Quantization
- `models[].context_length`: Context Length (number)
- `models[].max_output_length`: Max Output Length (number)
- `models[].pricing`: Pricing
- `models[].pricing.prompt`: Prompt
- `models[].pricing.completion`: Completion
- `models[].pricing.image`: Image
- `models[].pricing.request`: Request
- `models[].pricing.input_cache_read`: Input Cache Read
- `models[].pricing.input_cache_write`: Input Cache Write
- `models[].supported_sampling_parameters`: Supported Sampling Parameters
- `models[].supported_features`: Supported Features
- `models[].description`: Description
- `models[].datacenters`: Datacenters
- `models[].datacenters[].country_code`: Country Code
- `count`: Count (number)

### `jina_ai_get_model`

**Get Model.** Read the details of one Jina model by id, including context length, modalities and pricing. Get the id from List Models. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelId` | string | yes |  | Model ID. Id of the model, returned by List Models. |

Output fields:

- `id`: ID
- `hugging_face_id`: Hugging Face ID
- `name`: Name
- `created`: Created (number)
- `input_modalities`: Input Modalities
- `output_modalities`: Output Modalities
- `quantization`: Quantization
- `context_length`: Context Length (number)
- `max_output_length`: Max Output Length (number)
- `pricing`: Pricing
- `pricing.prompt`: Prompt
- `pricing.completion`: Completion
- `pricing.image`: Image
- `pricing.request`: Request
- `pricing.input_cache_read`: Input Cache Read
- `pricing.input_cache_write`: Input Cache Write
- `supported_sampling_parameters`: Supported Sampling Parameters
- `supported_features`: Supported Features
- `description`: Description
- `datacenters`: Datacenters
- `datacenters[].country_code`: Country Code

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | no |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | no |  | Query Parameters. Appended to the URL as ?key=value. |
| `body_type` | string | no | `"none"` | Body Type. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | Return Error as Output. On a failed request, output the error instead of failing the step. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning them as the response. |
