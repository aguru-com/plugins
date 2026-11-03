# LinkupAPI

LinkupAPI lets agents send messages, manage conversations, and automate outreach across every channel, for sales and recruitment.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-linkupapi'
  version: '0.1.0'
```

Categories: SALES_AND_CRM, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your LinkupAPI key, sent as the `x-api-key` header. Get it from https://app.linkupapi.com

## Actions

### `list_accounts`

**List Accounts.** Lists the LinkedIn accounts connected to this LinkupAPI key, paged by limit and offset. Call this first to obtain the account ID that every other LinkupAPI action and trigger requires; prefer Get Account Details when the ID is already known. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Max accounts to return per page (1-500) |
| `offset` | number | no | `0` | Offset. Number of accounts to skip (for pagination) |

### `get_account`

**Get Account Details.** Fetches the integration details and connection status of one connected LinkedIn account by its account ID. Use List Accounts instead when the ID is unknown, and Get My Profile when the LinkedIn profile behind the account is wanted rather than its connection state. Requires a valid account ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The account to retrieve (from "List Accounts") |

### `get_my_profile`

**Get My Profile.** Retrieves the LinkedIn profile of the connected account itself, resolving who the automation is acting as. Use Get Profile Info for anyone else. Requires the account ID from List Accounts. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The connected LinkedIn account to act as. Get it from the "List Accounts" action. |

### `get_profile`

**Get Profile Info.** Looks up a LinkedIn person profile addressed in one of three interchangeable ways: full profile URL, public identifier, or profile URN. Use it when a specific person is already identified; use Search People to discover profiles from attributes, and Get My Profile for the connected account. Requires the account ID plus exactly one of the three address inputs. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The connected LinkedIn account to act as. Get it from the "List Accounts" action. |
| `profileUrl` | string | no |  | Profile URL. Full LinkedIn profile URL (provide this OR Identifier OR URN) |
| `identifier` | string | no |  | Identifier. Public identifier (e.g. "john-doe") |
| `profileUrn` | string | no |  | Profile URN. LinkedIn profile URN. |

### `search_people`

**Search People.** Searches LinkedIn people by any combination of keyword, name, title, company, location, school, industry, or connection degree; alternatively it can enumerate the connections or followers of one given profile instead of running an attribute search. Use it to discover prospects when no profile URL is known, then switch to Get Profile Info once one is. Requires the account ID from List Accounts, and the result count is capped by Total Results. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The connected LinkedIn account to act as. Get it from the "List Accounts" action. |
| `keyword` | string | no |  | Keyword. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `title` | string | no |  | Current Job Title. |
| `companyName` | string | no |  | Current Company Name. |
| `companyUrl` | string | no |  | Company URL. LinkedIn company page URL. |
| `pastCompany` | string | no |  | Past Company. |
| `location` | string | no |  | Location. e.g. "San Francisco". |
| `schoolUrl` | string | no |  | School URL. |
| `industry` | string | no |  | Industry. |
| `network` | string | no |  | Network. Connection degree relative to the account. One of `"F"`, `"S"`, `"O"`. |
| `connectionOf` | string | no |  | Connection Of. Show connections of a specific profile (URL or identifier) |
| `followerOf` | string | no |  | Follower Of. Show followers of a specific company or profile. |
| `fetchInvitationState` | boolean | no | `true` | Fetch Invitation State. Include the connection invitation state for each result. |
| `totalResults` | number | no | `10` | Total Results. Number of results to return (1 credit per 10 results) |
| `startPage` | number | no |  | Start Page. |
| `endPage` | number | no |  | End Page. |

### `search_companies`

**Search Companies.** Searches LinkedIn company pages by keyword, location, sector, or company size, over a configurable page range. Use it to locate a company page when only a name or profile of the firm is known; call Get Company Info afterwards for the full record of a known company URL, and Search People to find individuals. Requires the account ID from List Accounts. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The connected LinkedIn account to act as. Get it from the "List Accounts" action. |
| `keyword` | string | no |  | Keyword. |
| `location` | string | no |  | Location. |
| `sector` | string | no |  | Sector. |
| `companySize` | string | no |  | Company Size. e.g. "11-50", "201-500". |
| `totalResults` | number | no | `10` | Total Results. |
| `resultsPerPage` | number | no |  | Results Per Page. |
| `startPage` | number | no |  | Start Page. |
| `endPage` | number | no |  | End Page. |

### `get_company`

**Get Company Info.** Looks up one LinkedIn company page from its URL. Use Search Companies first when only a company name is known, and Get Profile Info for a person rather than an organisation. Requires both the account ID and an exact company page URL. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The connected LinkedIn account to act as. Get it from the "List Accounts" action. |
| `companyUrl` | string | yes |  | Company URL. LinkedIn company page URL. |

### `send_message`

**Send Message.** Sends a LinkedIn direct message from the connected account to a recipient profile URL, optionally attaching a media link. Use it for outreach or replies to an existing thread; Send Connection Request is the right action when the recipient cannot be messaged yet, and Get Conversation loads the thread context first. Requires the account ID, the recipient profile URL, and message text. Not idempotent: every call delivers another message, so retries duplicate it. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The connected LinkedIn account to act as. Get it from the "List Accounts" action. |
| `profileUrl` | string | yes |  | Profile URL. LinkedIn profile URL of the recipient. |
| `messageText` | string | yes |  | Message. The text of the message to send. |
| `mediaLink` | string | no |  | Media Link. Optional URL of a media file to attach. |

### `get_conversation`

**Get Conversation.** Reads the message history of one LinkedIn thread, addressed either by conversation ID or by the other participant's profile URL, with count and cursor paging for longer threads. Use it to gather context before replying with Send Message. Requires the account ID plus one of the two addressing inputs. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The connected LinkedIn account to act as. Get it from the "List Accounts" action. |
| `conversationId` | string | no |  | Conversation ID. Provide this OR a Profile URL. |
| `profileUrl` | string | no |  | Profile URL. Profile URL of the other participant. |
| `count` | number | no |  | Count. Number of messages to retrieve. |
| `cursor` | string | no |  | Cursor. Pagination cursor from a previous response. |

### `send_connection_request`

**Send Connection Request.** Sends a LinkedIn connection invitation from the connected account to a person addressed by either profile URL or public identifier, with an optional note. Use it to open contact with someone outside the account network; Send Message is for people already reachable. Requires the account ID and one of the two address inputs. Not idempotent: each call issues a fresh invitation and consumes LinkedIn invite quota, so check Check Invitation Status before retrying. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The connected LinkedIn account to act as. Get it from the "List Accounts" action. |
| `profileUrl` | string | no |  | Profile URL. LinkedIn profile URL (provide this OR Identifier) |
| `identifier` | string | no |  | Identifier. Public identifier (e.g. "john-doe") |
| `message` | string | no |  | Note. Optional note to include with the invitation. |

### `check_invitation_status`

**Check Invitation Status.** Checks the current state of a connection invitation sent from the connected account to a given profile URL. Use it to poll the outcome of Send Connection Request rather than re-sending; the Invitation Accepted trigger is the push alternative for flows that can wait. Requires the account ID and the target profile URL. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The connected LinkedIn account to act as. Get it from the "List Accounts" action. |
| `profileUrl` | string | yes |  | Profile URL. LinkedIn profile URL to check. |

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
