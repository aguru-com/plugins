# Microsoft 365 Copilot

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-copilot'
  version: '0.2.3'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> **Note:** This piece requires a **Microsoft 365 Copilot license** to access Copilot interaction data.
>
> If you’d like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Microsoft Graph (Delegated) permissions** under **API permissions**:
> - Sites.Read.All
> - Mail.Read
> - Files.ReadWrite.All
> - People.Read.All
> - OnlineMeetingTranscript.Read.All
> - Chat.Read
> - ChannelMessage.Read.All
> - ExternalItem.Read.All
> - AiEnterpriseInteraction.Read
> - Files.Read.All

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |

## Actions

### `chatWithCopilot`

**Chat with Copilot.** Sends a prompt to Microsoft 365 Copilot and returns its reply, running in one of two modes: continuing an existing thread when a conversation ID is supplied, or silently creating a new conversation first when it is omitted. Use it when you want Copilot itself to reason over Microsoft 365 data and answer; prefer Search Copilot when you only need the matching OneDrive files back. Requires the message text and an IANA time zone, and can optionally ground the answer in web search. Not idempotent: each call posts a new message and, without a conversation ID, creates another conversation. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | no |  | Conversation ID. The ID of an existing conversation. If not provided, a new conversation will be created. |
| `messageText` | string | yes |  | Message Text. |
| `timeZone` | string | yes | `"UTC"` | Time Zone. User location time zone in IANA format (e.g., America/New_York, Europe/London) |
| `enableWebSearch` | boolean | no | `true` | Enable Web Search Grounding. |

### `searchCopilot`

**Search Copilot.** Runs a hybrid semantic and lexical search over the connected user's OneDrive for work or school content from a natural-language query, optionally scoped by a KQL filter expression. Use it to find matching files in OneDrive; prefer Chat with Copilot when you want a synthesized answer rather than a list of results. Requires a query of at most 1,500 characters. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Natural language query to search for relevant files. Maximum 1,500 characters. |
| `filterExpression` | string | no |  | Filter Expression (Optional). KQL filter expression for OneDrive data source (https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference). Example: path:"https://contoso-my.sharepoint.com/personal/user/Documents/". |
| `resourceMetadata` | JSON | no |  | Resource Metadata Names (Optional). Array of metadata field names to include in results. Example: ["title", "author"]. |

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
