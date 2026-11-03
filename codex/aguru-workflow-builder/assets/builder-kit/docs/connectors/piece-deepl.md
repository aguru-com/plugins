# DeepL

AI-powered language translation

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-deepl'
  version: '0.2.2'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Follow these instructions to get your DeepL API Key:
>
> 1. Log in to your DeepL account.
> 2. Visit https://www.deepl.com/account/summary
> 3. Go to the API section and obtain your DeepL API Key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | Api key. Enter the api key. |
| `type` | string | yes |  | Api url. Select api url. One of `"free"`, `"paid"`. |

## Actions

### `translate_text`

**Translate text.** Translates a block of plain text into a target language using DeepL's neural machine translation. Source language is auto-detected unless explicitly set, and an optional glossary, formality level, and XML/HTML tag handling can be supplied. Choose this to translate natural-language content; the target language is required. Idempotent: re-translating the same text with the same settings yields the same result and creates no resource. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. Text to be translated. Only UTF-8-encoded plain text is supported. |
| `target_lang` | string | yes |  | Target language. The language into which the text should be translated. One of `"BG"`, `"CS"`, `"DA"`, `"DE"`, `"EL"`, `"EN-GB"`, `"EN-US"`, `"ES"`, `"ET"`, `"FI"`, `"FR"`, `"HU"`, `"ID"`, `"IT"`, `"JA"`, `"KO"`, `"LT"`, `"LV"`, `"NB"`, `"NL"`, `"PL"`, `"PT-BR"`, `"PT-PT"`, `"RO"`, `"RU"` and 6 more. |
| `source_lang` | string | no |  | Source language. Language of the text to be translated. One of `"BG"`, `"CS"`, `"DA"`, `"DE"`, `"EL"`, `"EN"`, `"ES"`, `"ET"`, `"FI"`, `"FR"`, `"HU"`, `"ID"`, `"IT"`, `"JA"`, `"KO"`, `"LT"`, `"LV"`, `"NB"`, `"NL"`, `"PL"`, `"PT"`, `"RO"`, `"RU"`, `"SK"`, `"SL"` and 4 more. |
| `split_sentences` | string | no |  | Split sentences. Sets whether the translation engine should first split the input into sentences. For text translations where tag_handling is not set to html, the default value is 1, meaning the engine splits on punctuation and on newlines. One of `"0"`, `"1"`, `"nonewlines"`. |
| `preserve_formatting` | string | no |  | Preserve formatting. Sets whether the translation engine should respect the original formatting, even if it would usually correct some aspects. One of `true`, `false`. |
| `formality` | string | no |  | Formality. Sets whether the translated text should lean towards formal or informal language. One of `"default"`, `"more"`, `"less"`, `"prefer_more"`, `"prefer_less"`. |
| `glossary_id` | string | no |  | Glossary id. Specify the glossary to use for the translation. |
| `tag_handling` | string | no |  | Tag handling. Sets which kind of tags should be handled. One of `"xml"`, `"html"`. |
| `outline_detection` | string | no |  | Outline detection. The automatic detection of the XML structure won't yield best results in all XML files. One of `true`, `false`. |
| `non_splitting_tags` | string | no |  | Non splitting tags. Comma-separated list of XML or HTML tags. |
| `splitting_tags` | string | no |  | Splitting tags. Comma-separated list of XML or HTML tags. |
| `ignore_tags` | string | no |  | Ignore tags. Comma-separated list of XML or HTML tags. |

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
