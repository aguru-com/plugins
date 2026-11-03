# WebScraping AI

WebScraping AI is a powerful tool that allows you to scrape websites and extract data.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-webscraping-ai'
  version: '0.2.0'
```

Categories: DEVELOPER_TOOLS, ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

## Actions

### `askAQuestionAboutTheWebPage`

**Ask a Question About the Web Page.** Fetches a web page (rendering JavaScript), then uses an LLM to answer a natural-language question about its content. Choose this to extract a specific fact or summary from a single URL without parsing HTML yourself, when you have a concrete question rather than needing the full page text or a structured record. Requires the target URL and the question; optional proxy/country/device/header controls tune how the page is fetched. Read-only and idempotent (a GET-style request that does not alter the target site). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `question` | string | yes |  | Question. Question or instructions to ask the LLM model about the target page. |
| `url` | string | yes |  | URL. URL of the target page. |
| `headers` | array | no |  | Custom Headers. Add custom HTTP headers (optional) Each item: { `name`, `value` }. |
| `timeout` | number | no | `10000` | Timeout. Maximum page load time in milliseconds (default: 10000, max: 30000) |
| `js` | boolean | no | `true` | Enable JavaScript. Execute JavaScript for dynamic content (recommended) |
| `jsTimeout` | number | no | `2000` | JavaScript Timeout. Maximum JavaScript execution time in milliseconds (default: 2000) |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for dynamic content (e.g., ".content-loaded") |
| `proxy` | string | no | `"datacenter"` | Proxy Type. Use residential proxies for sites that block datacenter IPs (more expensive) One of `"datacenter"`, `"residential"`. |
| `country` | string | no | `"us"` | Proxy Country. Geographic location of the proxy server. One of `"us"`, `"ca"`, `"gb"`, `"de"`, `"fr"`, `"it"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`. |
| `customProxy` | string | no |  | Custom Proxy. Your proxy URL in format: http://user:password@host:port. |
| `jsScript` | string | no |  | JavaScript Code. Custom JavaScript to execute (e.g., document.querySelector("button").click()) |
| `device` | string | no |  | Device Type. Emulate specific device for responsive design testing. One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail the action if the page returns a 404 error. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail the action if the page redirects to another URL. |
| `format` | string | no | `"text"` | Response Format. Response format: Text (simple) or JSON (structured) One of `"text"`, `"json"`. |

Output fields:

- `status`: Status (number)
- `body`: Body

### `getPageHtml`

**Get Page HTML.** Fetches a web page (rendering JavaScript) and returns its raw HTML markup. Choose this when you need the full document to parse yourself or feed into other tools, rather than an LLM-derived answer or extracted text. Requires the target URL; optional proxy/country/device/header controls tune the fetch, and flags can error on 404 or redirect or return JS execution results. Read-only and idempotent (a GET-style request that does not alter the target site). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. URL of the target page. |
| `headers` | array | no |  | Custom Headers. Add custom HTTP headers (optional) Each item: { `name`, `value` }. |
| `timeout` | number | no | `10000` | Timeout. Maximum page load time in milliseconds (default: 10000, max: 30000) |
| `js` | boolean | no | `true` | Enable JavaScript. Execute JavaScript for dynamic content (recommended) |
| `jsTimeout` | number | no | `2000` | JavaScript Timeout. Maximum JavaScript execution time in milliseconds (default: 2000) |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for dynamic content (e.g., ".content-loaded") |
| `proxy` | string | no | `"datacenter"` | Proxy Type. Use residential proxies for sites that block datacenter IPs (more expensive) One of `"datacenter"`, `"residential"`. |
| `country` | string | no | `"us"` | Proxy Country. Geographic location of the proxy server. One of `"us"`, `"ca"`, `"gb"`, `"de"`, `"fr"`, `"it"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`. |
| `customProxy` | string | no |  | Custom Proxy. Your proxy URL in format: http://user:password@host:port. |
| `jsScript` | string | no |  | JavaScript Code. Custom JavaScript to execute (e.g., document.querySelector("button").click()) |
| `returnScriptResult` | boolean | no |  | Return JavaScript Result. Return result of the custom JavaScript code (js_script parameter) execution on the target page (false by default, page HTML will be returned). |
| `device` | string | no |  | Device Type. Emulate specific device for responsive design testing. One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail the action if the page returns a 404 error. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail the action if the page redirects to another URL. |
| `format` | string | no | `"text"` | Response Format. Response format: Text (simple) or JSON (structured) One of `"text"`, `"json"`. |

Output fields:

- `status`: Status (number)
- `body`: Body

### `scrapeWebsiteText`

**Scrape Website Text.** Fetches a web page (rendering JavaScript) and returns its visible text with HTML stripped out, in plain, JSON, or XML form. Choose this when you want clean readable content for summarizing or feeding to an LLM, rather than the raw HTML or a single extracted answer. Requires the target URL; optional proxy/country/device/header controls tune the fetch, and JSON output can additionally return extracted links. Read-only and idempotent (a GET-style request that does not alter the target site). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. URL of the target page. |
| `headers` | array | no |  | Custom Headers. Add custom HTTP headers (optional) Each item: { `name`, `value` }. |
| `timeout` | number | no | `10000` | Timeout. Maximum page load time in milliseconds (default: 10000, max: 30000) |
| `js` | boolean | no | `true` | Enable JavaScript. Execute JavaScript for dynamic content (recommended) |
| `jsTimeout` | number | no | `2000` | JavaScript Timeout. Maximum JavaScript execution time in milliseconds (default: 2000) |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for dynamic content (e.g., ".content-loaded") |
| `proxy` | string | no | `"datacenter"` | Proxy Type. Use residential proxies for sites that block datacenter IPs (more expensive) One of `"datacenter"`, `"residential"`. |
| `country` | string | no | `"us"` | Proxy Country. Geographic location of the proxy server. One of `"us"`, `"ca"`, `"gb"`, `"de"`, `"fr"`, `"it"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`. |
| `customProxy` | string | no |  | Custom Proxy. Your proxy URL in format: http://user:password@host:port. |
| `jsScript` | string | no |  | JavaScript Code. Custom JavaScript to execute (e.g., document.querySelector("button").click()) |
| `textFormat` | string | no | `"plain"` | Text Format. Response format: Plain text, JSON (with title/description/content), or XML. One of `"plain"`, `"json"`, `"xml"`. |
| `returnLinks` | boolean | no |  | Return Links. Include links in response (only works with JSON format) |
| `device` | string | no |  | Device Type. Emulate specific device for responsive design testing. One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail the action if the page returns a 404 error. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail the action if the page redirects to another URL. |

Output fields:

- `status`: Status (number)
- `body`: Body
- `body.title`: Title
- `body.description`: Description
- `body.content`: Content

### `extractStructuredData`

**Extract structured data.** Fetches a web page (rendering JavaScript) and uses an LLM to extract a set of caller-defined fields from it, where each field is given as a name plus a natural-language description of what to pull. Choose this when you need specific structured values (e.g. price, title, author) rather than a free-text answer or the raw page. Requires the target URL and the fields map; optional proxy/country/device/header controls tune the fetch. Read-only and idempotent (a GET-style request that does not alter the target site). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fields` | object | yes |  | Fields to Extract. Define fields to extract (e.g., {"title": "Product title", "price": "Product price"}) |
| `url` | string | yes |  | URL. URL of the target page. |
| `headers` | array | no |  | Custom Headers. Add custom HTTP headers (optional) Each item: { `name`, `value` }. |
| `timeout` | number | no | `10000` | Timeout. Maximum page load time in milliseconds (default: 10000, max: 30000) |
| `js` | boolean | no | `true` | Enable JavaScript. Execute JavaScript for dynamic content (recommended) |
| `jsTimeout` | number | no | `2000` | JavaScript Timeout. Maximum JavaScript execution time in milliseconds (default: 2000) |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for dynamic content (e.g., ".content-loaded") |
| `proxy` | string | no | `"datacenter"` | Proxy Type. Use residential proxies for sites that block datacenter IPs (more expensive) One of `"datacenter"`, `"residential"`. |
| `country` | string | no | `"us"` | Proxy Country. Geographic location of the proxy server. One of `"us"`, `"ca"`, `"gb"`, `"de"`, `"fr"`, `"it"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`. |
| `customProxy` | string | no |  | Custom Proxy. Your proxy URL in format: http://user:password@host:port. |
| `jsScript` | string | no |  | JavaScript Code. Custom JavaScript to execute (e.g., document.querySelector("button").click()) |
| `device` | string | no |  | Device Type. Emulate specific device for responsive design testing. One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail the action if the page returns a 404 error. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail the action if the page redirects to another URL. |

Output fields:

- `status`: Status (number)
- `body`: Body
- `body.result`: Extracted Fields (an object whose keys vary)

### `getAccountInformation`

**Get Account Info.** Looks up the WebScraping AI account status, including remaining API credits and concurrent-request limits. Choose this to check quota or capacity before running a batch of scraping calls, or to surface usage to the caller. Takes no inputs beyond the connection. Read-only and idempotent (a GET-style lookup). Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `status`: Status (number)
- `body`: Body
- `body.email`: Email (email)
- `body.remaining_api_calls`: Remaining API Calls (number)
- `body.remaining_monthly_credits`: Remaining Monthly Credits (number)
- `body.remaining_payg_credits`: Remaining Pay-As-You-Go Credits (number)
- `body.remaining_total_credits`: Remaining Total Credits (number)
- `body.resets_at`: Quota Resets At (number)
- `body.remaining_concurrency`: Remaining Concurrency (number)

### `webscraping_ai_get_html`

**Get Page HTML.** Fetches a web page through a headless browser and returns its rendered HTML in result. Use it when you need the raw markup; prefer Get Page Text for readable content, or Get Selected HTML for one element. Optional JavaScript Code runs on the page first, and Return Script Result returns that script's value instead of the HTML. Read-only on the target site. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. Full URL of the target page, including the scheme, e.g. "https://example.com/pricing". |
| `headers` | object | no |  | Headers. HTTP headers to send to the target page, as header name → value, e.g. {"Cookie": "session=abc"}. |
| `timeout` | number | no |  | Timeout. Maximum page load time in milliseconds, 1-25000. Defaults to 10000. |
| `js` | boolean | no | `true` | Render JavaScript. Render the page in a headless browser. Defaults to true; set false for static pages to save credits. |
| `jsTimeout` | number | no |  | JavaScript Timeout. Maximum JavaScript rendering time in milliseconds, 1-20000. Defaults to 2000. |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for before returning, e.g. ".content-loaded". |
| `proxy` | string | no |  | Proxy Type. Proxy tier. "datacenter" (default, cheapest), "residential" for sites blocking datacenter IPs, "stealth" for heavily protected sites (most expensive), "auto" tries each tier in turn. "auto" cannot be combined with Custom Proxy. One of `"datacenter"`, `"residential"`, `"stealth"`, `"auto"`. |
| `country` | string | no |  | Proxy Country. Country of the proxy used to fetch the page. Defaults to "us". One of `"us"`, `"gb"`, `"de"`, `"it"`, `"fr"`, `"ca"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`, `"hk"`, `"tr"`. |
| `customProxy` | string | no |  | Custom Proxy. Your own proxy URL, e.g. "http://user:password@host:port". Overrides Proxy Type. |
| `device` | string | no |  | Device. Device to emulate. Defaults to "desktop". One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail when the target page returns 404. Defaults to false. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail when the target page redirects. Defaults to false. |
| `jsScript` | string | no |  | JavaScript Code. JavaScript to run on the page after it loads, e.g. document.querySelector("button").click(). The result is the value of the last expression; a top-level "return" is a syntax error. |
| `returnScriptResult` | boolean | no |  | Return Script Result. Return the JavaScript Code result instead of the page HTML. Defaults to false. |

Output fields:

- `result`: Result (html)
- `cookies`: Cookies

### `webscraping_ai_post_html`

**POST to Page and Get HTML.** Sends Request Body to the target URL as a POST (form submission, login, POST API) and returns the rendered HTML response in result. Use Get Page HTML for a plain GET. Optional JavaScript Code runs on the response page. The body is sent to the target site as a POST, so it can change state there (log in, submit a form); not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. Full URL of the target page, including the scheme, e.g. "https://example.com/pricing". |
| `headers` | object | no |  | Headers. HTTP headers to send to the target page, as header name → value, e.g. {"Cookie": "session=abc"}. |
| `timeout` | number | no |  | Timeout. Maximum page load time in milliseconds, 1-25000. Defaults to 10000. |
| `js` | boolean | no | `true` | Render JavaScript. Render the page in a headless browser. Defaults to true; set false for static pages to save credits. |
| `jsTimeout` | number | no |  | JavaScript Timeout. Maximum JavaScript rendering time in milliseconds, 1-20000. Defaults to 2000. |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for before returning, e.g. ".content-loaded". |
| `proxy` | string | no |  | Proxy Type. Proxy tier. "datacenter" (default, cheapest), "residential" for sites blocking datacenter IPs, "stealth" for heavily protected sites (most expensive), "auto" tries each tier in turn. "auto" cannot be combined with Custom Proxy. One of `"datacenter"`, `"residential"`, `"stealth"`, `"auto"`. |
| `country` | string | no |  | Proxy Country. Country of the proxy used to fetch the page. Defaults to "us". One of `"us"`, `"gb"`, `"de"`, `"it"`, `"fr"`, `"ca"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`, `"hk"`, `"tr"`. |
| `customProxy` | string | no |  | Custom Proxy. Your own proxy URL, e.g. "http://user:password@host:port". Overrides Proxy Type. |
| `device` | string | no |  | Device. Device to emulate. Defaults to "desktop". One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail when the target page returns 404. Defaults to false. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail when the target page redirects. Defaults to false. |
| `jsScript` | string | no |  | JavaScript Code. JavaScript to run on the page after it loads, e.g. document.querySelector("button").click(). The result is the value of the last expression; a top-level "return" is a syntax error. |
| `returnScriptResult` | boolean | no |  | Return Script Result. Return the JavaScript Code result instead of the page HTML. Defaults to false. |
| `body` | string | yes |  | Request Body. Raw body forwarded to the target URL as a POST, e.g. {"username": "test"}. For a form-encoded body, use Content Type "text/plain" and set the header "Content-Type: application/x-www-form-urlencoded". |
| `contentType` | string | yes | `"application/json"` | Content Type. Content type of the Request Body as sent to the target. One of `"application/json"`, `"text/plain"`. |

Output fields:

- `result`: Result (html)
- `cookies`: Cookies

### `webscraping_ai_get_text`

**Get Page Text.** Fetches a web page and returns its visible text as Markdown in content, plus title, description and, with Return Links, the page's links. Use it to read or summarize a page; prefer Ask a Question or Extract Fields when you want an LLM to pull specific facts. Read-only on the target site. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. Full URL of the target page, including the scheme, e.g. "https://example.com/pricing". |
| `headers` | object | no |  | Headers. HTTP headers to send to the target page, as header name → value, e.g. {"Cookie": "session=abc"}. |
| `timeout` | number | no |  | Timeout. Maximum page load time in milliseconds, 1-25000. Defaults to 10000. |
| `js` | boolean | no | `true` | Render JavaScript. Render the page in a headless browser. Defaults to true; set false for static pages to save credits. |
| `jsTimeout` | number | no |  | JavaScript Timeout. Maximum JavaScript rendering time in milliseconds, 1-20000. Defaults to 2000. |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for before returning, e.g. ".content-loaded". |
| `proxy` | string | no |  | Proxy Type. Proxy tier. "datacenter" (default, cheapest), "residential" for sites blocking datacenter IPs, "stealth" for heavily protected sites (most expensive), "auto" tries each tier in turn. "auto" cannot be combined with Custom Proxy. One of `"datacenter"`, `"residential"`, `"stealth"`, `"auto"`. |
| `country` | string | no |  | Proxy Country. Country of the proxy used to fetch the page. Defaults to "us". One of `"us"`, `"gb"`, `"de"`, `"it"`, `"fr"`, `"ca"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`, `"hk"`, `"tr"`. |
| `customProxy` | string | no |  | Custom Proxy. Your own proxy URL, e.g. "http://user:password@host:port". Overrides Proxy Type. |
| `device` | string | no |  | Device. Device to emulate. Defaults to "desktop". One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail when the target page returns 404. Defaults to false. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail when the target page redirects. Defaults to false. |
| `returnLinks` | boolean | no |  | Return Links. Also return the links found in the page body. Defaults to false. |

Output fields:

- `title`: Title
- `description`: Description
- `content`: Content
- `links`: Links

### `webscraping_ai_post_text`

**POST to Page and Get Text.** Sends Request Body to the target URL as a POST and returns the response page's visible text as Markdown in content, plus title, description and optional links. Use Get Page Text for a plain GET. The body is sent to the target site as a POST, so it can change state there (log in, submit a form); not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. Full URL of the target page, including the scheme, e.g. "https://example.com/pricing". |
| `headers` | object | no |  | Headers. HTTP headers to send to the target page, as header name → value, e.g. {"Cookie": "session=abc"}. |
| `timeout` | number | no |  | Timeout. Maximum page load time in milliseconds, 1-25000. Defaults to 10000. |
| `js` | boolean | no | `true` | Render JavaScript. Render the page in a headless browser. Defaults to true; set false for static pages to save credits. |
| `jsTimeout` | number | no |  | JavaScript Timeout. Maximum JavaScript rendering time in milliseconds, 1-20000. Defaults to 2000. |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for before returning, e.g. ".content-loaded". |
| `proxy` | string | no |  | Proxy Type. Proxy tier. "datacenter" (default, cheapest), "residential" for sites blocking datacenter IPs, "stealth" for heavily protected sites (most expensive), "auto" tries each tier in turn. "auto" cannot be combined with Custom Proxy. One of `"datacenter"`, `"residential"`, `"stealth"`, `"auto"`. |
| `country` | string | no |  | Proxy Country. Country of the proxy used to fetch the page. Defaults to "us". One of `"us"`, `"gb"`, `"de"`, `"it"`, `"fr"`, `"ca"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`, `"hk"`, `"tr"`. |
| `customProxy` | string | no |  | Custom Proxy. Your own proxy URL, e.g. "http://user:password@host:port". Overrides Proxy Type. |
| `device` | string | no |  | Device. Device to emulate. Defaults to "desktop". One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail when the target page returns 404. Defaults to false. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail when the target page redirects. Defaults to false. |
| `returnLinks` | boolean | no |  | Return Links. Also return the links found in the page body. Defaults to false. |
| `body` | string | yes |  | Request Body. Raw body forwarded to the target URL as a POST, e.g. {"username": "test"}. For a form-encoded body, use Content Type "text/plain" and set the header "Content-Type: application/x-www-form-urlencoded". |
| `contentType` | string | yes | `"application/json"` | Content Type. Content type of the Request Body as sent to the target. One of `"application/json"`, `"text/plain"`. |

Output fields:

- `title`: Title
- `description`: Description
- `content`: Content
- `links`: Links

### `webscraping_ai_get_selected_html`

**Get Selected HTML.** Fetches a web page and returns, in result, the HTML of the element matching one CSS selector. Use it to grab one part of a page (a price, a table, an article body) without the full HTML; use Get Multiple Selected HTML for several selectors in one call. Read-only on the target site. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `selector` | string | yes |  | Selector. CSS selector of the element to return, e.g. "h1", ".price", "#main". |
| `url` | string | yes |  | URL. Full URL of the target page, including the scheme, e.g. "https://example.com/pricing". |
| `headers` | object | no |  | Headers. HTTP headers to send to the target page, as header name → value, e.g. {"Cookie": "session=abc"}. |
| `timeout` | number | no |  | Timeout. Maximum page load time in milliseconds, 1-25000. Defaults to 10000. |
| `js` | boolean | no | `true` | Render JavaScript. Render the page in a headless browser. Defaults to true; set false for static pages to save credits. |
| `jsTimeout` | number | no |  | JavaScript Timeout. Maximum JavaScript rendering time in milliseconds, 1-20000. Defaults to 2000. |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for before returning, e.g. ".content-loaded". |
| `proxy` | string | no |  | Proxy Type. Proxy tier. "datacenter" (default, cheapest), "residential" for sites blocking datacenter IPs, "stealth" for heavily protected sites (most expensive), "auto" tries each tier in turn. "auto" cannot be combined with Custom Proxy. One of `"datacenter"`, `"residential"`, `"stealth"`, `"auto"`. |
| `country` | string | no |  | Proxy Country. Country of the proxy used to fetch the page. Defaults to "us". One of `"us"`, `"gb"`, `"de"`, `"it"`, `"fr"`, `"ca"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`, `"hk"`, `"tr"`. |
| `customProxy` | string | no |  | Custom Proxy. Your own proxy URL, e.g. "http://user:password@host:port". Overrides Proxy Type. |
| `device` | string | no |  | Device. Device to emulate. Defaults to "desktop". One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail when the target page returns 404. Defaults to false. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail when the target page redirects. Defaults to false. |

Output fields:

- `result`: Result (html)
- `cookies`: Cookies

### `webscraping_ai_post_selected_html`

**POST to Page and Get Selected HTML.** Sends Request Body to the target URL as a POST and returns, in result, the HTML of the element matching one CSS selector in the response page. Use Get Selected HTML for a plain GET. The body is sent to the target site as a POST, so it can change state there (log in, submit a form); not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `selector` | string | yes |  | Selector. CSS selector of the element to return, e.g. "h1", ".price", "#main". |
| `url` | string | yes |  | URL. Full URL of the target page, including the scheme, e.g. "https://example.com/pricing". |
| `headers` | object | no |  | Headers. HTTP headers to send to the target page, as header name → value, e.g. {"Cookie": "session=abc"}. |
| `timeout` | number | no |  | Timeout. Maximum page load time in milliseconds, 1-25000. Defaults to 10000. |
| `js` | boolean | no | `true` | Render JavaScript. Render the page in a headless browser. Defaults to true; set false for static pages to save credits. |
| `jsTimeout` | number | no |  | JavaScript Timeout. Maximum JavaScript rendering time in milliseconds, 1-20000. Defaults to 2000. |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for before returning, e.g. ".content-loaded". |
| `proxy` | string | no |  | Proxy Type. Proxy tier. "datacenter" (default, cheapest), "residential" for sites blocking datacenter IPs, "stealth" for heavily protected sites (most expensive), "auto" tries each tier in turn. "auto" cannot be combined with Custom Proxy. One of `"datacenter"`, `"residential"`, `"stealth"`, `"auto"`. |
| `country` | string | no |  | Proxy Country. Country of the proxy used to fetch the page. Defaults to "us". One of `"us"`, `"gb"`, `"de"`, `"it"`, `"fr"`, `"ca"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`, `"hk"`, `"tr"`. |
| `customProxy` | string | no |  | Custom Proxy. Your own proxy URL, e.g. "http://user:password@host:port". Overrides Proxy Type. |
| `device` | string | no |  | Device. Device to emulate. Defaults to "desktop". One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail when the target page returns 404. Defaults to false. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail when the target page redirects. Defaults to false. |
| `body` | string | yes |  | Request Body. Raw body forwarded to the target URL as a POST, e.g. {"username": "test"}. For a form-encoded body, use Content Type "text/plain" and set the header "Content-Type: application/x-www-form-urlencoded". |
| `contentType` | string | yes | `"application/json"` | Content Type. Content type of the Request Body as sent to the target. One of `"application/json"`, `"text/plain"`. |

Output fields:

- `result`: Result (html)
- `cookies`: Cookies

### `webscraping_ai_get_selected_multiple`

**Get Multiple Selected HTML.** Fetches a web page once and returns results with the inner HTML of every element matching any of the selectors. The API currently returns all matches in one combined list rather than one list per selector, so do not rely on the position of a list to know which selector matched. Use it instead of several Get Selected HTML calls. Read-only on the target site. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `selectors` | array | yes |  | Selectors. CSS selectors, one per item, e.g. ["h1", ".price"]. |
| `url` | string | yes |  | URL. Full URL of the target page, including the scheme, e.g. "https://example.com/pricing". |
| `headers` | object | no |  | Headers. HTTP headers to send to the target page, as header name → value, e.g. {"Cookie": "session=abc"}. |
| `timeout` | number | no |  | Timeout. Maximum page load time in milliseconds, 1-25000. Defaults to 10000. |
| `js` | boolean | no | `true` | Render JavaScript. Render the page in a headless browser. Defaults to true; set false for static pages to save credits. |
| `jsTimeout` | number | no |  | JavaScript Timeout. Maximum JavaScript rendering time in milliseconds, 1-20000. Defaults to 2000. |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for before returning, e.g. ".content-loaded". |
| `proxy` | string | no |  | Proxy Type. Proxy tier. "datacenter" (default, cheapest), "residential" for sites blocking datacenter IPs, "stealth" for heavily protected sites (most expensive), "auto" tries each tier in turn. "auto" cannot be combined with Custom Proxy. One of `"datacenter"`, `"residential"`, `"stealth"`, `"auto"`. |
| `country` | string | no |  | Proxy Country. Country of the proxy used to fetch the page. Defaults to "us". One of `"us"`, `"gb"`, `"de"`, `"it"`, `"fr"`, `"ca"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`, `"hk"`, `"tr"`. |
| `customProxy` | string | no |  | Custom Proxy. Your own proxy URL, e.g. "http://user:password@host:port". Overrides Proxy Type. |
| `device` | string | no |  | Device. Device to emulate. Defaults to "desktop". One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail when the target page returns 404. Defaults to false. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail when the target page redirects. Defaults to false. |

Output fields:

- `results`: Results
- `count`: Count (number)

### `webscraping_ai_post_selected_multiple`

**POST to Page and Get Multiple Selected HTML.** Sends Request Body to the target URL as a POST and returns results with the inner HTML of every element in the response page matching any of the selectors. The API currently returns all matches in one combined list rather than one list per selector. Use Get Multiple Selected HTML for a plain GET. The body is sent to the target site as a POST, so it can change state there (log in, submit a form); not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `selectors` | array | yes |  | Selectors. CSS selectors, one per item, e.g. ["h1", ".price"]. |
| `url` | string | yes |  | URL. Full URL of the target page, including the scheme, e.g. "https://example.com/pricing". |
| `headers` | object | no |  | Headers. HTTP headers to send to the target page, as header name → value, e.g. {"Cookie": "session=abc"}. |
| `timeout` | number | no |  | Timeout. Maximum page load time in milliseconds, 1-25000. Defaults to 10000. |
| `js` | boolean | no | `true` | Render JavaScript. Render the page in a headless browser. Defaults to true; set false for static pages to save credits. |
| `jsTimeout` | number | no |  | JavaScript Timeout. Maximum JavaScript rendering time in milliseconds, 1-20000. Defaults to 2000. |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for before returning, e.g. ".content-loaded". |
| `proxy` | string | no |  | Proxy Type. Proxy tier. "datacenter" (default, cheapest), "residential" for sites blocking datacenter IPs, "stealth" for heavily protected sites (most expensive), "auto" tries each tier in turn. "auto" cannot be combined with Custom Proxy. One of `"datacenter"`, `"residential"`, `"stealth"`, `"auto"`. |
| `country` | string | no |  | Proxy Country. Country of the proxy used to fetch the page. Defaults to "us". One of `"us"`, `"gb"`, `"de"`, `"it"`, `"fr"`, `"ca"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`, `"hk"`, `"tr"`. |
| `customProxy` | string | no |  | Custom Proxy. Your own proxy URL, e.g. "http://user:password@host:port". Overrides Proxy Type. |
| `device` | string | no |  | Device. Device to emulate. Defaults to "desktop". One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail when the target page returns 404. Defaults to false. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail when the target page redirects. Defaults to false. |
| `body` | string | yes |  | Request Body. Raw body forwarded to the target URL as a POST, e.g. {"username": "test"}. For a form-encoded body, use Content Type "text/plain" and set the header "Content-Type: application/x-www-form-urlencoded". |
| `contentType` | string | yes | `"application/json"` | Content Type. Content type of the Request Body as sent to the target. One of `"application/json"`, `"text/plain"`. |

Output fields:

- `results`: Results
- `count`: Count (number)

### `webscraping_ai_ask_question`

**Ask a Question About a Page.** Fetches a web page and has an LLM answer a natural-language question about its content, returned in result. Use it for one fact or a summary; use Extract Fields for several named values, or Get Page Text to read the page yourself. Read-only on the target site. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `question` | string | yes |  | Question. Question or instructions for the LLM about the page, e.g. "What is the price of the Pro plan?". |
| `url` | string | yes |  | URL. Full URL of the target page, including the scheme, e.g. "https://example.com/pricing". |
| `headers` | object | no |  | Headers. HTTP headers to send to the target page, as header name → value, e.g. {"Cookie": "session=abc"}. |
| `timeout` | number | no |  | Timeout. Maximum page load time in milliseconds, 1-25000. Defaults to 10000. |
| `js` | boolean | no | `true` | Render JavaScript. Render the page in a headless browser. Defaults to true; set false for static pages to save credits. |
| `jsTimeout` | number | no |  | JavaScript Timeout. Maximum JavaScript rendering time in milliseconds, 1-20000. Defaults to 2000. |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for before returning, e.g. ".content-loaded". |
| `proxy` | string | no |  | Proxy Type. Proxy tier. "datacenter" (default, cheapest), "residential" for sites blocking datacenter IPs, "stealth" for heavily protected sites (most expensive), "auto" tries each tier in turn. "auto" cannot be combined with Custom Proxy. One of `"datacenter"`, `"residential"`, `"stealth"`, `"auto"`. |
| `country` | string | no |  | Proxy Country. Country of the proxy used to fetch the page. Defaults to "us". One of `"us"`, `"gb"`, `"de"`, `"it"`, `"fr"`, `"ca"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`, `"hk"`, `"tr"`. |
| `customProxy` | string | no |  | Custom Proxy. Your own proxy URL, e.g. "http://user:password@host:port". Overrides Proxy Type. |
| `device` | string | no |  | Device. Device to emulate. Defaults to "desktop". One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail when the target page returns 404. Defaults to false. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail when the target page redirects. Defaults to false. |

Output fields:

- `result`: Answer

### `webscraping_ai_extract_fields`

**Extract Fields From a Page.** Fetches a web page and has an LLM extract the requested fields, returned in result keyed by field name (null when the page lacks one). Use it for several structured values in one call; use Ask a Question for a single free-text answer. Read-only on the target site. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fields` | object | yes |  | Fields. Fields to extract, as field name → what to extract, e.g. {"title": "Product title", "price": "Product price"}. |
| `url` | string | yes |  | URL. Full URL of the target page, including the scheme, e.g. "https://example.com/pricing". |
| `headers` | object | no |  | Headers. HTTP headers to send to the target page, as header name → value, e.g. {"Cookie": "session=abc"}. |
| `timeout` | number | no |  | Timeout. Maximum page load time in milliseconds, 1-25000. Defaults to 10000. |
| `js` | boolean | no | `true` | Render JavaScript. Render the page in a headless browser. Defaults to true; set false for static pages to save credits. |
| `jsTimeout` | number | no |  | JavaScript Timeout. Maximum JavaScript rendering time in milliseconds, 1-20000. Defaults to 2000. |
| `waitFor` | string | no |  | Wait For. CSS selector to wait for before returning, e.g. ".content-loaded". |
| `proxy` | string | no |  | Proxy Type. Proxy tier. "datacenter" (default, cheapest), "residential" for sites blocking datacenter IPs, "stealth" for heavily protected sites (most expensive), "auto" tries each tier in turn. "auto" cannot be combined with Custom Proxy. One of `"datacenter"`, `"residential"`, `"stealth"`, `"auto"`. |
| `country` | string | no |  | Proxy Country. Country of the proxy used to fetch the page. Defaults to "us". One of `"us"`, `"gb"`, `"de"`, `"it"`, `"fr"`, `"ca"`, `"es"`, `"ru"`, `"jp"`, `"kr"`, `"in"`, `"hk"`, `"tr"`. |
| `customProxy` | string | no |  | Custom Proxy. Your own proxy URL, e.g. "http://user:password@host:port". Overrides Proxy Type. |
| `device` | string | no |  | Device. Device to emulate. Defaults to "desktop". One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `errorOn404` | boolean | no |  | Error on 404. Fail when the target page returns 404. Defaults to false. |
| `errorOnRedirect` | boolean | no |  | Error on Redirect. Fail when the target page redirects. Defaults to false. |

Output fields:

- `result`: Extracted Fields (an object whose keys vary)

### `webscraping_ai_search_google`

**Search Google.** Runs a Google search and returns parsed organic results, related searches and pagination, 10 results per page. Use it to find pages, then pass a result link to Get Page Text or Ask a Question. Costs 15 credits per search. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Search query, e.g. "coffee machines". |
| `countryCode` | string | no |  | Country Code. Two-letter country code for the search location (Google gl), e.g. "us". Defaults to "us". |
| `languageCode` | string | no |  | Language Code. Two-letter language code for the results (Google hl), e.g. "en". Defaults to "en". |
| `page` | number | no |  | Page. Results page number, a whole number from 1 to 100. Defaults to 1. |

Output fields:

- `search_parameters`: Search Parameters
- `search_parameters.engine`: Engine
- `search_parameters.q`: Query
- `search_parameters.gl`: Country Code
- `search_parameters.hl`: Language Code
- `search_parameters.page`: Page (number)
- `search_information`: Search Information
- `search_information.query_displayed`: Query Displayed
- `search_information.organic_results_state`: Organic Results State
- `organic_results`: Organic Results
- `related_searches`: Related Searches
- `related_searches[].query`: Query
- `pagination`: Pagination
- `pagination.current`: Current Page (number)
- `pagination.next`: Next Page (number)

### `webscraping_ai_get_structured_data`

**Get Structured Data for a Page.** Returns parsed structured data (title, author, counts, comments and similar) for a page on a supported site such as a YouTube video, an Instagram post or profile, a LinkedIn profile, company or job, or a Reddit post. Check parse_status: an unsupported or missing page still returns 200. Reddit pages cost 50 credits. Read-only on the target site. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. URL of a page on a supported site, e.g. "https://www.youtube.com/watch?v=dQw4w9WgXcQ". |
| `country` | string | no |  | Proxy Country. Two-letter country code of the proxy used to fetch the page, one of the proxy countries (us, gb, de, it, fr, ca, es, ru, jp, kr, in, hk, tr). Defaults to "us". |
| `transcript` | boolean | no |  | Include Transcript. YouTube videos only. Also fetch the video transcript into data.transcript. Defaults to false. |
| `transcriptLanguage` | string | no |  | Transcript Language. YouTube videos only, with Include Transcript. Caption language, e.g. "en" or "de". |

Output fields:

- `request_parameters`: Request Parameters
- `request_parameters.url`: URL (url)
- `request_parameters.provider`: Provider
- `request_parameters.type`: Type
- `parse_status`: Parse Status
- `data`: Data

### `webscraping_ai_get_account`

**Get Account Info.** Returns the account email, remaining monthly, pay-as-you-go and total credits, when the quota resets, and the free concurrency slots. Use it to check quota before a batch of scraping calls. Takes no inputs. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `email`: Email (email)
- `remaining_api_calls`: Remaining API Calls (number)
- `remaining_monthly_credits`: Remaining Monthly Credits (number)
- `remaining_payg_credits`: Remaining Pay-As-You-Go Credits (number)
- `remaining_total_credits`: Remaining Total Credits (number)
- `resets_at`: Quota Resets At (number)
- `remaining_concurrency`: Remaining Concurrency (number)

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
