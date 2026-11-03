# Airtop

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-airtop'
  version: '0.2.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your Airtop API key. You can get your API key from the [Airtop Dashboard](https://portal.airtop.ai/api-keys).
>
> **How to get your API key:**
> 1. Go to the [Airtop Dashboard](https://portal.airtop.ai/api-keys)
> 2. Sign in to your account
> 3. Navigate to API Keys section
> 4. Create a new API key or copy an existing one
> 5. Paste the key here

## Actions

### `create-session`

**Create Session.** Starts a new Airtop cloud browser session, optionally loading a saved profile, Chrome extensions, captcha solving, and either the built-in Airtop proxy or a custom proxy (simple URL, country/sticky, authenticated, or per-domain). Use this as the first step before opening windows or interacting with pages. Not idempotent: each call provisions a new billable session with its own id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `profileName` | string | no |  | Profile Name. Name of a profile to load into the session. |
| `extensionIds` | array | no |  | Extension IDs. List of Chrome extension IDs from Google Web Store. |
| `useAirtopProxy` | boolean | no | `true` | Use Airtop Proxy?. Enable Airtop-provided proxy. If disabled, configure a custom proxy. |
| `proxyConfig` | object | no |  | Custom Proxy Configuration. An object whose fields depend on other inputs; the product shows them. |
| `proxyAdvanced` | object | no |  | Advanced Proxy Settings. An object whose fields depend on other inputs; the product shows them. |
| `solveCaptcha` | boolean | no |  | Solve Captcha. Automatically solve captcha challenges. |
| `timeoutMinutes` | number | no |  | Session Timeout (minutes). How long before the session times out due to inactivity (1-10080 minutes). Default: 10. |

### `terminate-session`

**Terminate Session.** Terminates an existing Airtop browser session by its session id, freeing its resources. Use this to clean up when done browsing. Not idempotent in effect since it changes server state, though a missing session is ignored without error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session. Select an active Airtop session to use for browser automation. A value the product loads from the provider, such as an id; write the value itself. |

### `create-browser-window`

**Create New Browser Window.** Opens a new browser window inside an existing Airtop session, optionally navigating to a starting URL and setting screen resolution and page-load wait strategy. Requires a session id from Create Session; the returned window id is needed for page interactions like clicking, typing, scraping, and screenshots. Not idempotent: each call creates an additional window. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session. Select an active Airtop session to use for browser automation. A value the product loads from the provider, such as an id; write the value itself. |
| `url` | string | no |  | Initial URL. URL to open in the new window. Default: https://www.google.com. |
| `screenResolution` | string | no | `"1280x720"` | Screen Resolution. Fixed dimensions for the browser window. Affects live view size. One of `"1280x720"`, `"1920x1080"`, `"1366x768"`, `"1024x768"`, `"800x600"`. |
| `customResolution` | string | no |  | Custom Resolution. Custom resolution in format "widthxheight" (e.g., "1440x900"). Leave blank to use selected resolution above. |
| `waitUntil` | string | no | `"load"` | Page Load Strategy. When to consider the page loaded. Default: load. One of `"load"`, `"domContentLoaded"`, `"complete"`, `"noWait"`. |
| `waitUntilTimeoutSeconds` | number | no |  | Page Load Timeout (seconds). Maximum time to wait for page loading. Default: 30 seconds. |

### `take-screenshot`

**Take Screenshot.** Captures a screenshot of a given session window, returned as base64 data or a download URL, scoped to the current viewport, the full page, or scan mode for problem pages. Use this to visually inspect what the browser currently shows; requires session id and window id. Read-only and idempotent in that it does not change page state, though each call captures the live view at that moment. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session. Select an active Airtop session to use for browser automation. A value the product loads from the provider, such as an id; write the value itself. |
| `windowId` | string | yes |  | Window. Select a browser window within the chosen session. A value the product loads from the provider, such as an id; write the value itself. |
| `clientRequestId` | string | no |  | Client Request ID. Optional ID for tracking this request. |
| `format` | string | no | `"base64"` | Screenshot Format. How to return the screenshot. Default: base64 for viewport, url for page/scan. One of `"base64"`, `"url"`. |
| `scope` | string | no | `"auto"` | Screenshot Scope. What part of the page to capture. Default: auto. One of `"auto"`, `"viewport"`, `"page"`, `"scan"`. |
| `maxHeight` | number | no |  | Max Height (pixels). Maximum height of screenshot. Will scale down if needed, preserving aspect ratio. |
| `maxWidth` | number | no |  | Max Width (pixels). Maximum width of screenshot. Will scale down if needed, preserving aspect ratio. |
| `quality` | number | no |  | JPEG Quality (1-100). Image quality for JPEG compression. Higher = better quality. Note: Feature in development. |
| `enableVisualAnalysis` | boolean | no | `false` | Enable Advanced Visual Analysis. Enable advanced visual analysis features for better page processing. |
| `visualAnalysisConfig` | object | no |  | Visual Analysis Settings. An object whose fields depend on other inputs; the product shows them. |
| `costThresholdCredits` | number | no |  | Maximum Credits to Spend. Stop screenshot if it costs more than this. Leave blank for default limit. |
| `timeThresholdSeconds` | number | no |  | Maximum Time (seconds). Stop screenshot if it takes longer than this. Leave blank for default timeout. |

### `page-query`

**Page Query.** Uses AI to answer a natural-language prompt about the content of a session window's current page, optionally constrained to a JSON output schema and able to follow pagination/scroll to load more content. Use this to extract structured data or ask a question about what is on the page; requires session id, window id, and a prompt. Read-only and idempotent: it analyzes page content without changing it. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session. Select an active Airtop session to use for browser automation. A value the product loads from the provider, such as an id; write the value itself. |
| `windowId` | string | yes |  | Window. Select a browser window within the chosen session. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. The question or instruction for Airtop to answer about the current page. |
| `clientRequestId` | string | no |  | Client Request ID. An optional ID for your internal tracking. |
| `outputSchema` | string | no |  | Output Schema (JSON). JSON schema defining the structure of the output. Must be valid JSON schema format. |
| `includeVisualAnalysis` | string | no | `"auto"` | Visual Analysis. Whether to include visual analysis of the page (default: auto) One of `"auto"`, `"enabled"`, `"disabled"`. |
| `optimizeUrls` | string | no | `"auto"` | Optimize URLs. Improve scraping performance by optimizing URLs (default: auto) One of `"auto"`, `"enabled"`, `"disabled"`. |
| `costThresholdCredits` | number | no |  | Maximum Credits to Spend. Abort if the credit cost exceeds this amount. Set to 0 to disable. |
| `timeThresholdSeconds` | number | no |  | Maximum Time (Seconds). Abort if the operation takes longer than this. Set to 0 to disable. |
| `followPaginationLinks` | boolean | no |  | Follow Pagination Links. If enabled, Airtop will attempt to load more content from pagination, scrolling, etc. (default: false) |

### `smart-scrape`

**Smart Scrape.** Scrapes the current page in a session window and returns its content as Markdown. Use this when you want the whole page text rather than answering a specific question (use Page Query for targeted extraction). Requires session id and window id; read-only and idempotent since it does not modify the page. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session. Select an active Airtop session to use for browser automation. A value the product loads from the provider, such as an id; write the value itself. |
| `windowId` | string | yes |  | Window. Select a browser window within the chosen session. A value the product loads from the provider, such as an id; write the value itself. |
| `clientRequestId` | string | no |  | Client Request ID. Optional ID to track this request on your end. |
| `costThresholdCredits` | number | no |  | Maximum Credits to Spend. Abort if the credit cost exceeds this amount. Set to 0 to disable. |
| `timeThresholdSeconds` | number | no |  | Maximum Time (Seconds). Abort if the operation takes longer than this. Set to 0 to disable. |

### `paginated-extraction`

**Paginated Extraction.** Uses AI to extract data across paginated or dynamically loaded pages in a session window, driven by a natural-language prompt and an optional JSON output schema, navigating either by clicking next/previous links or by infinite scroll (auto-detected by default). Use this instead of Page Query when results span multiple pages or require scrolling to load. Requires session id, window id, and a prompt; read-only and idempotent in that it does not mutate the page. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session. Select an active Airtop session to use for browser automation. A value the product loads from the provider, such as an id; write the value itself. |
| `windowId` | string | yes |  | Window. Select a browser window within the chosen session. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. Instructions on what to extract and how to paginate (e.g. "Navigate through 3 pages and extract titles and prices"). |
| `clientRequestId` | string | no |  | Client Request ID. Optional ID to track this request. |
| `outputSchema` | string | no |  | Output Schema (JSON). JSON schema defining the structure of the output. Must be valid JSON schema format. |
| `scrollWithin` | string | no |  | Scroll Within. Describe the scrollable area (e.g. "results container in middle of page"). |
| `paginationMode` | string | no | `"auto"` | How to Load More Content. Choose how to navigate through pages (default: auto) One of `"auto"`, `"paginated"`, `"infinite-scroll"`. |
| `interactionMode` | string | no | `"auto"` | Speed vs Accuracy. Balance between speed and accuracy (default: auto) One of `"auto"`, `"accurate"`, `"cost-efficient"`. |
| `optimizeUrls` | string | no | `"auto"` | Optimize URLs. Improve scraping performance by optimizing URLs (default: auto) One of `"auto"`, `"enabled"`, `"disabled"`. |
| `costThresholdCredits` | number | no |  | Maximum Credits to Spend. Abort if the credit cost exceeds this amount. Set to 0 to disable. |
| `timeThresholdSeconds` | number | no |  | Maximum Time (Seconds). Abort if the operation takes longer than this. Set to 0 to disable. |

### `click`

**Click.** Clicks an element in a session window located by a natural-language description, supporting left, double, and right click and optionally waiting for navigation to complete afterward. Use this to drive UI interactions such as pressing buttons or links. Requires session id, window id, and an element description; not idempotent since each click mutates page state and may trigger navigation or submissions. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session. Select an active Airtop session to use for browser automation. A value the product loads from the provider, such as an id; write the value itself. |
| `windowId` | string | yes |  | Window. Select a browser window within the chosen session. A value the product loads from the provider, such as an id; write the value itself. |
| `elementDescription` | string | yes |  | Element Description. Describe the element to click (e.g. "Login button"). |
| `clientRequestId` | string | no |  | Client Request ID. Optional ID to track this request. |
| `clickType` | string | no | `"click"` | Click Type. The type of click to perform (default: left click). One of `"click"`, `"doubleClick"`, `"rightClick"`. |
| `scrollWithin` | string | no |  | Scroll Within. Describe the scrollable area to search within (e.g. "main content area"). |
| `analysisScope` | string | no | `"auto"` | Page Analysis Scope. Controls how much of the page is visually analyzed (default: auto). One of `"auto"`, `"viewport"`, `"page"`, `"scan"`. |
| `resultSelectionStrategy` | string | no | `"auto"` | Result Selection Strategy. How to select from multiple matches (default: auto). One of `"auto"`, `"first"`, `"bestMatch"`. |
| `partitionDirection` | string | no | `"vertical"` | Partition Direction. How to partition screenshots for analysis (default: vertical). One of `"vertical"`, `"horizontal"`, `"bidirectional"`. |
| `maxScanScrolls` | number | no |  | Maximum Scan Scrolls. Maximum number of scrolls in scan mode (default: 50). |
| `scanScrollDelay` | number | no |  | Scan Scroll Delay (ms). Delay between scrolls in scan mode (default: 1000ms). |
| `overlapPercentage` | number | no |  | Overlap Percentage. Percentage of overlap between screenshot chunks (default: 30). |
| `waitForNavigation` | boolean | no | `false` | Wait for Navigation. Wait for page navigation to complete after clicking (default: false). |
| `navigationWaitUntil` | string | no | `"load"` | Navigation Wait Until. When to consider navigation complete (default: load). One of `"load"`, `"domcontentloaded"`, `"networkidle0"`, `"networkidle2"`. |
| `navigationTimeoutSeconds` | number | no |  | Navigation Timeout (Seconds). Max seconds to wait for navigation (default: 30). |
| `costThresholdCredits` | number | no |  | Maximum Credits to Spend. Abort if the credit cost exceeds this amount. Set to 0 to disable. |
| `timeThresholdSeconds` | number | no |  | Maximum Time (Seconds). Abort if the operation takes longer than this. Set to 0 to disable. |

### `type`

**Type.** Types text into an input in a session window, with options to clear the field first, press Enter and/or Tab afterward, and wait for navigation; the target field can be located by a natural-language element description or left to the active focus. Use this to fill forms or search boxes. Requires session id, window id, and the text; not idempotent since it mutates the page and may submit forms or trigger navigation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session. Select an active Airtop session to use for browser automation. A value the product loads from the provider, such as an id; write the value itself. |
| `windowId` | string | yes |  | Window. Select a browser window within the chosen session. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Type. The text to type into the browser window. |
| `elementDescription` | string | no |  | Element Description. Describe the element (e.g., "search box", "username field"). |
| `clearInputField` | boolean | no | `false` | Clear Input Field Before Typing. Clear the input field before typing text. |
| `pressEnterKey` | boolean | no | `false` | Press Enter After Typing. Press Enter key after typing text. |
| `pressTabKey` | boolean | no | `false` | Press Tab After Typing. Press Tab key after typing text (after Enter if both enabled). |
| `waitForNavigation` | boolean | no | `false` | Wait for Navigation After Typing. Wait for page navigation to complete after typing (default: false). |
| `navigationTimeoutSeconds` | number | no |  | Navigation Timeout (Seconds). Max time to wait for navigation after typing (default: 30). |
| `navigationWaitUntil` | string | no | `"load"` | Navigation Wait Strategy. Condition to consider navigation complete (default: load). One of `"load"`, `"domcontentloaded"`, `"networkidle0"`, `"networkidle2"`. |
| `analysisScope` | string | no | `"auto"` | Page Analysis Scope. Controls how much of the page is analyzed to find the input (default: auto). One of `"auto"`, `"viewport"`, `"page"`, `"scan"`. |
| `visualAnalysisMaxScrolls` | number | no |  | Max Scrolls (Scan Mode). Maximum number of scrolls in scan mode (default: 50). |
| `visualAnalysisOverlap` | number | no |  | Chunk Overlap (%). Percentage of overlap between visual chunks (default: 30). |
| `visualAnalysisDirection` | string | no | `"vertical"` | Partition Direction. Direction to partition screenshots (default: vertical). One of `"vertical"`, `"horizontal"`, `"bidirectional"`. |
| `visualAnalysisStrategy` | string | no | `"auto"` | Result Selection Strategy. How to select from multiple matches (default: auto). One of `"auto"`, `"first"`, `"bestMatch"`. |
| `visualAnalysisScrollDelay` | number | no |  | Scroll Delay (ms). Delay between scrolls in scan mode (default: 1000ms). |
| `scrollWithin` | string | no |  | Scroll Within. Describe the scrollable container (e.g., "table body", "product list"). |
| `clientRequestId` | string | no |  | Client Request ID. Optional request ID for traceability. |
| `costThresholdCredits` | number | no |  | Max Credits to Spend. Cancel if this limit is exceeded. Set 0 to disable. |
| `timeThresholdSeconds` | number | no |  | Max Time to Wait (Seconds). Cancel if exceeded. Set 0 to disable. |

### `upload-file-to-session`

**Upload File to Sessions.** Pushes an already-uploaded Airtop file (by file id) to specific sessions, or to all active sessions when no session ids are given, making it available for file inputs or downloads in those sessions. Use this after a file exists in Airtop and you need it accessible inside a browsing session. Requires the file id; not idempotent since it performs a push to session state on each call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File. Select a file that has been uploaded to Airtop. A value the product loads from the provider, such as an id; write the value itself. |
| `sessionIds` | array | no |  | Session IDs. Select one or more sessions to make the file available on. Leave empty to make available to all sessions. Values the product loads from the provider, such as ids; write an array of them. |

### `hover-element`

**Hover on an Element.** Moves the mouse pointer over an element in a session window, located by a natural-language description, optionally waiting for navigation afterward. Use this to reveal hover menus, tooltips, or other hover-triggered UI. Requires session id, window id, and an element description; not idempotent since it changes page interaction state and may trigger hover-driven behavior. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session. Select an active Airtop session to use for browser automation. A value the product loads from the provider, such as an id; write the value itself. |
| `windowId` | string | yes |  | Window. Select a browser window within the chosen session. A value the product loads from the provider, such as an id; write the value itself. |
| `elementDescription` | string | yes |  | Element Description. Describe the element to hover, e.g. "the search box input in the top right corner". |
| `clientRequestId` | string | no |  | Client Request ID. Optional ID to track this request. |
| `scrollWithin` | string | no |  | Scroll Within. Describe the scrollable area to search within (e.g. "main content area"). |
| `analysisScope` | string | no | `"auto"` | Page Analysis Scope. Controls how much of the page is visually analyzed (default: auto). One of `"auto"`, `"viewport"`, `"page"`, `"scan"`. |
| `resultSelectionStrategy` | string | no | `"auto"` | Result Selection Strategy. How to select from multiple matches (default: auto). One of `"auto"`, `"first"`, `"bestMatch"`. |
| `partitionDirection` | string | no | `"vertical"` | Partition Direction. How to partition screenshots for analysis (default: vertical). One of `"vertical"`, `"horizontal"`, `"bidirectional"`. |
| `maxScanScrolls` | number | no |  | Maximum Scan Scrolls. Maximum number of scrolls in scan mode (default: 50). |
| `scanScrollDelay` | number | no |  | Scan Scroll Delay (ms). Delay between scrolls in scan mode (default: 1000ms). |
| `overlapPercentage` | number | no |  | Overlap Percentage. Percentage of overlap between screenshot chunks (default: 30). |
| `waitForNavigation` | boolean | no | `false` | Wait for Navigation. Wait for page navigation to complete after hovering (default: false). |
| `navigationWaitUntil` | string | no | `"load"` | Navigation Wait Until. When to consider navigation complete (default: load). One of `"load"`, `"domcontentloaded"`, `"networkidle0"`, `"networkidle2"`. |
| `navigationTimeoutSeconds` | number | no |  | Navigation Timeout (Seconds). Max seconds to wait for navigation (default: 30). |
| `costThresholdCredits` | number | no |  | Maximum Credits to Spend. Abort if the credit cost exceeds this amount. Set to 0 to disable. |
| `timeThresholdSeconds` | number | no |  | Maximum Time (Seconds). Abort if the operation takes longer than this. Set to 0 to disable. |

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
