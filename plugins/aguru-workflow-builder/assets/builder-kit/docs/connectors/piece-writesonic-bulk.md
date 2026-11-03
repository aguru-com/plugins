# Writesonic

Writesonic AI-powered writing assistant

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-writesonic-bulk'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Writesonic Bulk API Key

> To get your API Key:
>
> 1. Go to [app.writesonic.com](https://app.writesonic.com/)
> 2. Login to your Writesonic account
> 3. Hover over your display picture on the top-right corner to open the profile menu
> 4. Click on "API Dashboard"
> 5. Click on the switch to activate the API
> 6. Click on "Reveal API Key"
> 7. Copy and save your API key securely (never commit to public repositories)

## Actions

### `blogIdeas`

**Blog Ideas.** Generates AI-written blog article ideas for a given topic or keyword via Writesonic, optionally biased toward an extra keyword and engine/language/copy-count settings. Use when an agent needs candidate blog headlines or angles to brainstorm content. Each call produces fresh generated text and is billed, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic` | string | yes |  | Topic. The topic or keyword to generate blog ideas for. |
| `keyword` | string | no |  | Keyword. A keyword to include in the blog introduction. |
| `engine` | string | yes | `"economy"` | Engine. Select the engine quality level. One of `"economy"`, `"average"`, `"good"`, `"premium"`. |
| `language` | string | yes | `"en"` | Language. Select the language. One of `"en"`, `"nl"`, `"fr"`, `"de"`, `"it"`, `"pl"`, `"es"`, `"pt-pt"`, `"pt-br"`, `"ru"`, `"ja"`, `"zh"`, `"bg"`, `"cs"`, `"da"`, `"el"`, `"hu"`, `"lt"`, `"lv"`, `"ro"`, `"sk"`, `"sl"`, `"sv"`, `"fi"`, `"et"`. |
| `num_copies` | number | yes | `1` | Number of Copies. Number of blog ideas to generate (1-5) |

### `blogIntros`

**Blog Intros.** Generates AI-written blog article introductions from a blog title or topic via Writesonic, controlled by engine/language/copy-count settings. Use when an agent needs an opening paragraph to kick off a blog post. Each call produces fresh generated text and is billed, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `blog_title` | string | yes |  | Blog title. The blog topic or title to generate an introduction for. |
| `engine` | string | yes | `"economy"` | Engine. Select the engine quality level. One of `"economy"`, `"average"`, `"good"`, `"premium"`. |
| `language` | string | yes | `"en"` | Language. Select the language. One of `"en"`, `"nl"`, `"fr"`, `"de"`, `"it"`, `"pl"`, `"es"`, `"pt-pt"`, `"pt-br"`, `"ru"`, `"ja"`, `"zh"`, `"bg"`, `"cs"`, `"da"`, `"el"`, `"hu"`, `"lt"`, `"lv"`, `"ro"`, `"sk"`, `"sl"`, `"sv"`, `"fi"`, `"et"`. |
| `num_copies` | number | yes | `1` | Number of Copies. Number of blog ideas to generate (1-5) |

### `blogOutlines`

**Blog Outlines.** Generates a detailed AI-written blog outline via Writesonic from a blog title plus an existing introduction (both required), controlled by engine/language/copy-count settings. Use when an agent needs a structured section breakdown to draft a full article. Each call produces fresh generated text and is billed, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `blog_title` | string | yes |  | Blog Title. The blog topic or title to generate an outline for. |
| `blog_intro` | string | yes |  | Blog Introduction. The introduction of the blog to base the outline on. |
| `engine` | string | yes | `"economy"` | Engine. Select the engine quality level. One of `"economy"`, `"average"`, `"good"`, `"premium"`. |
| `language` | string | yes | `"en"` | Language. Select the language. One of `"en"`, `"nl"`, `"fr"`, `"de"`, `"it"`, `"pl"`, `"es"`, `"pt-pt"`, `"pt-br"`, `"ru"`, `"ja"`, `"zh"`, `"bg"`, `"cs"`, `"da"`, `"el"`, `"hu"`, `"lt"`, `"lv"`, `"ro"`, `"sk"`, `"sl"`, `"sv"`, `"fi"`, `"et"`. |
| `num_copies` | number | yes | `1` | Number of Copies. Number of blog ideas to generate (1-5) |

### `contentRephraser`

**Content Rephraser.** Rewrites supplied text into a different voice and style via Writesonic, with an optional tone-of-voice setting and engine/language/copy-count controls. Use when an agent needs to reword existing content rather than generate from a topic. Each call produces fresh generated text and is billed, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content_to_rephrase` | string | yes |  | Original Content. The content you want to rephrase. |
| `tone_of_voice` | string | no | `"excited"` | Tone of Voice. Select the tone of voice for the content. One of `"excited"`, `"professional"`, `"funny"`, `"encouraging"`, `"dramatic"`, `"witty"`, `"sarcastic"`, `"engaging"`, `"creative"`. |
| `engine` | string | yes | `"economy"` | Engine. Select the engine quality level. One of `"economy"`, `"average"`, `"good"`, `"premium"`. |
| `language` | string | yes | `"en"` | Language. Select the language. One of `"en"`, `"nl"`, `"fr"`, `"de"`, `"it"`, `"pl"`, `"es"`, `"pt-pt"`, `"pt-br"`, `"ru"`, `"ja"`, `"zh"`, `"bg"`, `"cs"`, `"da"`, `"el"`, `"hu"`, `"lt"`, `"lv"`, `"ro"`, `"sk"`, `"sl"`, `"sv"`, `"fi"`, `"et"`. |
| `num_copies` | number | yes | `1` | Number of Copies. Number of blog ideas to generate (1-5) |

### `contentShorten`

**Content Shorten.** Condenses supplied text into a shorter version via Writesonic, controlled by engine/language/copy-count settings. Use when an agent needs to trim or compress existing content rather than expand or generate it. Each call produces fresh generated text and is billed, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content_to_shorten` | string | yes |  | Original Content. The content you want to shorten. |
| `engine` | string | yes | `"economy"` | Engine. Select the engine quality level. One of `"economy"`, `"average"`, `"good"`, `"premium"`. |
| `language` | string | yes | `"en"` | Language. Select the language. One of `"en"`, `"nl"`, `"fr"`, `"de"`, `"it"`, `"pl"`, `"es"`, `"pt-pt"`, `"pt-br"`, `"ru"`, `"ja"`, `"zh"`, `"bg"`, `"cs"`, `"da"`, `"el"`, `"hu"`, `"lt"`, `"lv"`, `"ro"`, `"sk"`, `"sl"`, `"sv"`, `"fi"`, `"et"`. |
| `num_copies` | number | yes | `1` | Number of Copies. Number of blog ideas to generate (1-5) |

### `facebookAds`

**Facebook Ads.** Generates AI-written Facebook ad copy via Writesonic from a product name, with optional description, occasion, and promotion details plus engine/language/copy-count controls. Use when an agent needs social ad creative for a product. Each call produces fresh generated text and is billed, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_name` | string | yes |  | Product Name. The name of the product or service to advertise. |
| `product_description` | string | no |  | Product Description. A brief description of the product or service. |
| `occasion` | string | no |  | Occasion. The occasion for the ad (e.g.,"Black Friday", holiday, sale event) |
| `promotion` | string | no |  | Promotion. Details about any promotion or discount. |
| `engine` | string | yes | `"economy"` | Engine. Select the engine quality level. One of `"economy"`, `"average"`, `"good"`, `"premium"`. |
| `language` | string | yes | `"en"` | Language. Select the language. One of `"en"`, `"nl"`, `"fr"`, `"de"`, `"it"`, `"pl"`, `"es"`, `"pt-pt"`, `"pt-br"`, `"ru"`, `"ja"`, `"zh"`, `"bg"`, `"cs"`, `"da"`, `"el"`, `"hu"`, `"lt"`, `"lv"`, `"ro"`, `"sk"`, `"sl"`, `"sv"`, `"fi"`, `"et"`. |
| `num_copies` | number | yes | `1` | Number of Copies. Number of blog ideas to generate (1-5) |

### `generateProductDescriptions`

**Generate Product Descriptions.** Generates AI-written product descriptions via Writesonic from a product name and its key characteristics (both required), with optional primary/secondary keywords, tone of voice, and engine/language/copy-count controls. Use when an agent needs ecommerce or catalog copy for a product. Each call produces fresh generated text and is billed, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_name` | string | yes |  | Product Name. The name of the product. |
| `product_characteristics` | string | yes |  | Product Characteristics. Key characteristics and specifications of the product. |
| `primary_keyword` | string | no |  | Primary Keyword. The main keyword to include in the product description. |
| `secondary_keywords` | string | no |  | Secondary Keywords. Additional keywords to include in the product description, separated by commas. |
| `tone_of_voice` | string | no | `"excited"` | Tone of Voice. Select the tone of voice for the content. One of `"excited"`, `"professional"`, `"funny"`, `"encouraging"`, `"dramatic"`, `"witty"`, `"sarcastic"`, `"engaging"`, `"creative"`. |
| `engine` | string | yes | `"economy"` | Engine. Select the engine quality level. One of `"economy"`, `"average"`, `"good"`, `"premium"`. |
| `language` | string | yes | `"en"` | Language. Select the language. One of `"en"`, `"nl"`, `"fr"`, `"de"`, `"it"`, `"pl"`, `"es"`, `"pt-pt"`, `"pt-br"`, `"ru"`, `"ja"`, `"zh"`, `"bg"`, `"cs"`, `"da"`, `"el"`, `"hu"`, `"lt"`, `"lv"`, `"ro"`, `"sk"`, `"sl"`, `"sv"`, `"fi"`, `"et"`. |
| `num_copies` | number | yes | `1` | Number of Copies. Number of blog ideas to generate (1-5) |

### `googleAds`

**Google Ads.** Generates AI-written Google search ad copy via Writesonic from a product name, with optional description and target search term plus engine/language/copy-count controls. Use when an agent needs paid-search ad creative for a product. Each call produces fresh generated text and is billed, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_name` | string | yes |  | Product Name. The name of the product or service to advertise. |
| `product_description` | string | no |  | Product Description. A brief description of the product or service. |
| `search_term` | string | no |  | Search Term. The search term or query to target in the Google Ads campaign. |
| `engine` | string | yes | `"economy"` | Engine. Select the engine quality level. One of `"economy"`, `"average"`, `"good"`, `"premium"`. |
| `language` | string | yes | `"en"` | Language. Select the language. One of `"en"`, `"nl"`, `"fr"`, `"de"`, `"it"`, `"pl"`, `"es"`, `"pt-pt"`, `"pt-br"`, `"ru"`, `"ja"`, `"zh"`, `"bg"`, `"cs"`, `"da"`, `"el"`, `"hu"`, `"lt"`, `"lv"`, `"ro"`, `"sk"`, `"sl"`, `"sv"`, `"fi"`, `"et"`. |
| `num_copies` | number | yes | `1` | Number of Copies. Number of blog ideas to generate (1-5) |

### `landingPageHeadlines`

**Landing Page Headlines.** Generates AI-written landing page headlines via Writesonic from a product name, with optional description and engine/language/copy-count controls. Use when an agent needs hero or marketing headlines for a product or service page. Each call produces fresh generated text and is billed, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_name` | string | yes |  | Product Name. The name of the product or service. |
| `product_description` | string | no |  | Product Description. A brief description of the product or service. |
| `engine` | string | yes | `"economy"` | Engine. Select the engine quality level. One of `"economy"`, `"average"`, `"good"`, `"premium"`. |
| `language` | string | yes | `"en"` | Language. Select the language. One of `"en"`, `"nl"`, `"fr"`, `"de"`, `"it"`, `"pl"`, `"es"`, `"pt-pt"`, `"pt-br"`, `"ru"`, `"ja"`, `"zh"`, `"bg"`, `"cs"`, `"da"`, `"el"`, `"hu"`, `"lt"`, `"lv"`, `"ro"`, `"sk"`, `"sl"`, `"sv"`, `"fi"`, `"et"`. |
| `num_copies` | number | yes | `1` | Number of Copies. Number of blog ideas to generate (1-5) |

### `sentenceExpander`

**Sentence Expander.** Expands a short sentence into more descriptive text via Writesonic, with optional tone of voice and keyword plus engine/language/copy-count controls. Use when an agent needs to elaborate or lengthen a brief sentence rather than shorten or generate from scratch. Each call produces fresh generated text and is billed, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content_to_expand` | string | yes |  | Sentence. The sentence you want to expand. |
| `tone_of_voice` | string | no | `"excited"` | Tone of Voice. Select the tone of voice for the content. One of `"excited"`, `"professional"`, `"funny"`, `"encouraging"`, `"dramatic"`, `"witty"`, `"sarcastic"`, `"engaging"`, `"creative"`. |
| `keyword` | string | no |  | Keyword. A keyword to include in the expanded sentence. |
| `engine` | string | yes | `"economy"` | Engine. Select the engine quality level. One of `"economy"`, `"average"`, `"good"`, `"premium"`. |
| `language` | string | yes | `"en"` | Language. Select the language. One of `"en"`, `"nl"`, `"fr"`, `"de"`, `"it"`, `"pl"`, `"es"`, `"pt-pt"`, `"pt-br"`, `"ru"`, `"ja"`, `"zh"`, `"bg"`, `"cs"`, `"da"`, `"el"`, `"hu"`, `"lt"`, `"lv"`, `"ro"`, `"sk"`, `"sl"`, `"sv"`, `"fi"`, `"et"`. |
| `num_copies` | number | yes | `1` | Number of Copies. Number of blog ideas to generate (1-5) |

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
