# GetResponse

Email marketing and automation platform for contacts, campaigns, and newsletters.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-getresponse'
  version: '0.1.2'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your GetResponse account using OAuth2.

### `CUSTOM_AUTH`: API Key

> Authenticate using a GetResponse API key.
>
> To get your API key:
> 1. Sign in to your GetResponse account.
> 2. Go to **Tools > Integrations and API > API**.
> 3. Create or copy an API key.
> 4. Paste it below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Your GetResponse API key. |

## Actions

### `create-contact`

**Create Contact.** Adds a new subscriber to a GetResponse campaign (list) by email, optionally with a name. Use when you intend to create a contact unconditionally; it does not check for an existing contact, so repeated calls with the same email may add duplicates. Requires a campaign ID and an email address. Not idempotent. To avoid duplicates, prefer Create or Update Contact. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select the campaign list to use. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. The email address of the contact to create. |
| `name` | string | no |  | Name. The contact name as it should appear in GetResponse. |

### `create-or-update-contact`

**Create or Update Contact.** Upserts a GetResponse contact in a campaign keyed on email: looks up the campaign for a contact with the given email, then updates it if found or creates it otherwise (the result reports which operation ran). Use this rather than Create Contact to avoid duplicate subscribers. Requires a campaign ID and an email; effectively idempotent for the same email and campaign. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select the campaign list to use. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. The email address used to find or create the contact. |
| `name` | string | no |  | Name. The contact name as it should appear in GetResponse. |

### `find-contact`

**Find Contact.** Looks up a GetResponse contact by exact email address, optionally scoped to a single campaign; without a campaign it searches across the account. Use to check whether a subscriber exists or to retrieve their details before acting. Read-only and idempotent; returns a found flag indicating whether a match was located. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. The email address of the contact to find. |
| `campaignId` | string | no |  | Campaign. Select the campaign list to use. A value the product loads from the provider, such as an id; write the value itself. |

### `create-newsletter`

**Create Newsletter.** Creates a newsletter (email broadcast) and queues it to send to all subscribers of the selected GetResponse campaign. Use to send a one-off email blast to a list. Requires a campaign ID, a verified from-field address, and a subject, plus HTML and/or plain-text content (at least one is required). Not idempotent: each call creates and dispatches a new newsletter, so repeating it sends another email. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select the campaign list to use. A value the product loads from the provider, such as an id; write the value itself. |
| `fromFieldId` | string | yes |  | From Address. Select the verified sender address to use. A value the product loads from the provider, such as an id; write the value itself. |
| `replyToFieldId` | string | no |  | Reply-to Address. Select the verified sender address to use. A value the product loads from the provider, such as an id; write the value itself. |
| `subject` | string | yes |  | Subject. The subject line for the newsletter. |
| `name` | string | no |  | Newsletter Name. An internal name for the newsletter inside GetResponse. Leave empty to use the subject. |
| `htmlContent` | string | no |  | HTML Content. The newsletter content in HTML format. |
| `plainContent` | string | no |  | Plain Text Content. The plain text version of the newsletter content. |

### `find-campaign-list`

**Find Campaign List.** Searches GetResponse campaigns (lists) by a partial or full name match, or returns the first lists in the account when the name is left empty. Use to resolve a campaign list ID or to enumerate available lists before creating contacts or newsletters. Read-only and idempotent; a limit caps how many lists are returned. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Campaign Name. Enter part or all of the campaign list name. Leave empty to return the first lists in the account. |
| `limit` | number | no | `100` | Limit. The maximum number of campaign lists to return. |

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
