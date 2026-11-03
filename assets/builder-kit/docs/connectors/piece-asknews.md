# AskNews

AskNews piece allows you to search and retrieve enriched real-time and historical news articles using AskNews API.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-asknews'
  version: '0.1.0'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your AskNews API key:
>
> 1. Visit [AskNews](https://asknews.app)
> 2. Sign up or log in to your account
> 3. Click on your profile and navigate to 'Settings' > 'API Credentials'
> 4. Generate a new API key
> 5. Copy and paste the key here

## Actions

### `searchNews`

**Search News.** Searches enriched news articles via the AskNews API, defaulting to recent coverage but able to query the historical archive (60+ days) instead when historical is set. The query can be keywords, a question, or a paragraph, and the search method switches between keyword, semantic natural-language, or hybrid matching; filter by category and recency. Choose this to find or retrieve current/past news on a topic. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Search query - can be a phrase, keyword, question, or paragraph. Leave empty to search by filters only. |
| `nArticles` | number | no | `10` | Number of Articles. Number of articles to return. |
| `method` | string | no | `"kw"` | Search Method. Search method to use. "kw" for keyword matching, "nl" for semantic/natural language search, "both" for hybrid. One of `"kw"`, `"nl"`, `"both"`. |
| `returnType` | string | no | `"string"` | Return Type. Format of returned articles. "string" is prompt-optimized, "dicts" is structured data, "both" returns both. One of `"string"`, `"dicts"`, `"both"`. |
| `historical` | boolean | no | `false` | Search Historical Archive. Search in historical archive (60+ days back) instead of just recent news (48 hours) |
| `hoursBack` | number | no | `24` | Hours Back. Number of hours back to search from current time. Defaults to 24. |
| `categories` | array | no |  | Categories. Filter articles by news categories. One of `"Business"`, `"Crime"`, `"Politics"`, `"Science"`, `"Sports"`, `"Technology"`, `"Military"`, `"Health"`, `"Entertainment"`, `"Finance"`, `"Culture"`, `"Climate"`, `"Environment"`, `"World"`. |
| `similarityScoreThreshold` | number | no | `0.5` | Similarity Score Threshold. Minimum similarity score (0-1) for results. Lower = more lenient matches. |

### `generateNewsKnowledgeGraph`

**Generate News Knowledge Graph.** Builds a news knowledge graph of disambiguated entities and their relationships from articles matching a natural-language query, via the AskNews API. Choose this when an agent needs structured entity/relationship extraction (optionally a visualization like mermaid/svg) rather than raw article text. Computes a fresh graph on each call from current matching news; safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Natural language query for building the graph. |
| `returnArticles` | boolean | no | `false` | Return Articles. Include articles in the response. |
| `minClusterProbability` | number | no | `0.9` | Min Cluster Probability. Minimum cluster probability for disambiguation (0-1) |
| `geoDiambiguation` | boolean | no | `false` | Geo Disambiguation. Use geographic disambiguation for entities. |
| `queryMethod` | string | no | `"kw"` | Query Method. Search method for the query. One of `"kw"`, `"nl"`, `"both"`. |
| `nArticles` | number | no | `10` | Number of Articles. Number of articles to use for building the graph. |
| `historical` | boolean | no | `false` | Search Historical. Search historical archive instead of recent news. |
| `hoursBack` | number | no | `24` | Hours Back. Number of hours back to search. |
| `categories` | array | no |  | Categories. Filter by news categories. One of `"Business"`, `"Technology"`, `"Science"`, `"Politics"`, `"Sports"`, `"Entertainment"`, `"Health"`, `"Finance"`. |
| `visualizeWith` | string | no |  | Visualize With. Request a visualization format (e.g., mermaid, svg) |

### `getArticleById`

**Get Article by ID.** Fetches one or more news articles by their AskNews UUID(s). Choose this when you already hold article UUIDs (e.g. from a prior search) and need their full enriched records. Requires at least one valid UUID. Read-only lookup and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `articleIds` | array | yes |  | Article ID(s). One or more article UUIDs to fetch. |

### `asknewsChatCompletion`

**Chat Completion.** Sends a user message (with an optional system prompt) to AskNews’ chat-completion endpoint, returning an LLM answer grounded in real-time news with optional inline citations and references. Choose this for natural-language Q&A about current events rather than retrieving raw articles. Generative and non-deterministic, so repeated calls may return different text. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userMessage` | string | yes |  | User Message. The user message to send to the chat model. |
| `model` | string | no | `"gpt-4o-mini"` | Model. The model to use for chat completion. One of `"gpt-4o"`, `"gpt-4o-mini"`, `"gpt-4.1-2025-04-14"`, `"claude-3-5-sonnet-latest"`. |
| `temperature` | number | no | `0.9` | Temperature. Sampling temperature (0-2, higher = more creative) |
| `maxTokens` | number | no | `9999` | Max Tokens. Maximum number of tokens in response. |
| `journalistMode` | boolean | no | `true` | Journalist Mode. Activate AP styling, citations, and fair reporting prompting. |
| `inlineCitations` | string | no | `"markdown_link"` | Inline Citations. How to format citations in results. One of `"markdown_link"`, `"numbered"`, `"none"`. |
| `appendReferences` | boolean | no | `true` | Append References. Append full references at the end. |
| `asknewsWatermark` | boolean | no | `true` | Include AskNews Watermark. Include AskNews branding in response. |
| `conversationalAwareness` | boolean | no | `true` | Conversational Awareness. Enable context awareness for conversational flow. |
| `systemPrompt` | string | no | `"You are a helpful AI assistant with access to real-time news and current information."` | System Prompt. Optional custom system prompt for the model. |

### `searchStories`

**Search Stories (Narrative Clusters).** Searches AskNews for top news narratives and story clusters (grouped multi-article events) rather than individual articles. The query is optional: with no query it returns top trending stories filtered by category/sort, and with a query it filters to matching narratives via keyword, semantic, or hybrid matching. Choose this for the big-picture narrative view over a topic. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Natural language or keyword query for search. |
| `method` | string | no | `"kw"` | Search Method. nl: semantic search, kw: keyword search, both: combined. One of `"kw"`, `"nl"`, `"both"`. |
| `categories` | array | no |  | Categories. Filter stories by categories. One of `"Politics"`, `"Economy"`, `"Finance"`, `"Science"`, `"Technology"`, `"Sports"`, `"Climate"`, `"Environment"`, `"Culture"`, `"Entertainment"`, `"Business"`, `"Health"`, `"International"`. |
| `expand_updates` | boolean | no | `false` | Expand Updates. Include story updates in results. |
| `sort_by` | string | no | `"published"` | Sort By. Sort results by field. One of `"published"`, `"coverage"`, `"sentiment"`, `"relevance"`. |

### `createANewsletter`

**Create a Newsletter.** Creates a new automated AskNews newsletter that recurrently generates and emails AI-written news digests on a cron schedule, defined by a natural-language query. Choose this to set up a recurring news email; requires a name, query, cron expression, model, and sender, plus a Resend API key to actually send. Not idempotent — each call creates a separate newsletter. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Newsletter Name. Name of the newsletter. |
| `query` | string | yes |  | Query. Natural language query to define newsletter content. |
| `cron` | string | yes |  | Cron Schedule. Cron expression for newsletter schedule (e.g., "0 0 * * *" for daily at midnight UTC) |
| `model` | string | yes | `"gpt-4o"` | Model. AI model to use for newsletter generation. One of `"gpt-4o"`, `"gpt-4o-mini"`, `"claude-3-5-sonnet-latest"`, `"meta-llama/Meta-Llama-3.1-405B-Instruct"`, `"meta-llama/Meta-Llama-3.3-70B-Instruct"`. |
| `sender` | string | yes |  | Sender Email. Email address of the newsletter sender. |
| `subject` | string | no |  | Subject. Newsletter email subject (auto-generated if not provided) |
| `logoUrl` | string | no |  | Logo URL. URL of the newsletter logo. |
| `replyTo` | string | no |  | Reply-To Email. Email address for replies (defaults to sender if not provided) |
| `audienceId` | string | no |  | Audience ID. Existing audience ID (creates new audience if not provided) |
| `resendApiKey` | string | no |  | Resend API Key. API key for Resend email service (required to send newsletter) |
| `isPublic` | boolean | no | `true` | Is Public. Make newsletter publicly discoverable. |
| `isActive` | boolean | no | `true` | Is Active. Activate the newsletter immediately. |
| `expiresAt` | string | no |  | Expiration Date. Newsletter expiration date (ISO format: YYYY-MM-DDTHH:MM:SS) |

### `updateANewsletter`

**Update a Newsletter.** Updates an existing AskNews newsletter identified by its UUID, applying only the fields you supply (query, schedule, model, sender, active/public flags, etc.) and leaving the rest unchanged. Choose this to edit or activate/deactivate a newsletter you already created. Requires the newsletter UUID. Repeating the same update yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `newsletterId` | string | yes |  | Newsletter ID. UUID of the newsletter to update. |
| `name` | string | no |  | Newsletter Name. Name of the newsletter. |
| `query` | string | no |  | Query. Natural language query to define newsletter content. |
| `cron` | string | no |  | Cron Schedule. Cron expression for newsletter schedule (e.g., "0 0 * * *" for daily at midnight UTC) |
| `model` | string | no |  | Model. AI model to use for newsletter generation. One of `"gpt-4o"`, `"gpt-4o-mini"`, `"claude-3-5-sonnet-latest"`, `"meta-llama/Meta-Llama-3.3-70B-Instruct"`. |
| `subject` | string | no |  | Subject. Newsletter email subject. |
| `sender` | string | no |  | Sender Email. Email address of the newsletter sender. |
| `logoUrl` | string | no |  | Logo URL. URL of the newsletter logo. |
| `replyTo` | string | no |  | Reply-To Email. Email address for replies. |
| `audienceId` | string | no |  | Audience ID. Audience ID for the newsletter. |
| `resendApiKey` | string | no |  | Resend API Key. API key for Resend email service. |
| `isPublic` | boolean | no |  | Is Public. Make newsletter publicly discoverable. |
| `isActive` | boolean | no |  | Is Active. Activate or deactivate the newsletter. |
| `expiresAt` | string | no |  | Expiration Date. Newsletter expiration date (ISO format: YYYY-MM-DDTHH:MM:SS) |

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
