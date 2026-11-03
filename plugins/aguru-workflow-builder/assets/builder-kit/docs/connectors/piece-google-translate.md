# Google Translate

Translate text and detect languages with Google Cloud Translation.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-translate'
  version: '0.0.2'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect with an OAuth client from **your own** Google Cloud project:
>
> 1. In [Google Cloud Console](https://console.cloud.google.com/), select or create a project with **billing enabled** (Cloud Translation has a free tier of 500,000 characters/month).
> 2. **APIs & Services → Library**: enable **Cloud Translation API**.
> 3. **APIs & Services → OAuth consent screen**: add the scope `https://www.googleapis.com/auth/cloud-translation`. While the app is in *Testing*, add the Google accounts that will connect as test users.
> 4. **APIs & Services → Credentials → Create credentials → OAuth client ID**, type *Web application*. Add the **Redirect URL shown below** to *Authorized redirect URIs*.
> 5. Paste the **Client ID** and **Client Secret** here, then sign in with a Google account of that project.

## Actions

### `translateText`

**Translate Text.** Translates a text into a target language code (e.g. pt, es) with Google Cloud Translation and returns the translated text and the source language. Leave the source language empty to auto-detect it; set format to html to keep markup intact. Changes nothing in Google, safe to retry, but every call is billed per character on the connected Google Cloud project. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. Text to translate. Pick HTML in Format to keep markup intact. |
| `targetLanguage` | string | yes |  | Target Language. Language to translate into. A value the product loads from the provider, such as an id; write the value itself. |
| `sourceLanguage` | string | no |  | Source Language. Leave empty to let Google detect the language of the text. A value the product loads from the provider, such as an id; write the value itself. |
| `format` | string | no | `"text"` | Format. How the text should be parsed. One of `"text"`, `"html"`. |

Output fields:

- `translatedText`: Translated Text
- `detectedSourceLanguage`: Source Language
- `targetLanguage`: Target Language

### `detectLanguage`

**Detect Language.** Detects the language of a text and returns Google's top guess as a language code, its English name and a 0 to 1 confidence. Use before branching on language; to translate, call Translate text directly since it detects the source on its own. Read only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. Text whose language should be detected. |

Output fields:

- `language`: Language
- `languageName`: Language Name
- `confidence`: Confidence (number)

### `listLanguages`

**List Supported Languages.** Lists every language code Google Cloud Translation supports, with names rendered in a chosen display language. Use to validate or look up a language code before translating. Read only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `displayLanguage` | string | no | `"en"` | Display Language. ISO-639-1 code used to render the language names (e.g. en, pt, es). |

Output fields:

- `languages`: Languages
- `languages[].language`: Language Code
- `languages[].name`: Name

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
