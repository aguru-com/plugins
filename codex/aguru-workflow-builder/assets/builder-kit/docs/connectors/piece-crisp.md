# Crisp

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-crisp'
  version: '0.2.1'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> 1.Go to the [Crisp Marketplace](https://marketplace.crisp.chat/);
> 2.Sign in or create an account (this account is different from your main Crisp account);
> 3.Once logged-in, go to Plugins and click on the New Plugin button;
> 4.Select the plugin type, in this case Private;
> 5.Give your plugin a name, eg. "Integration", and hit Create;
> 6.On the plugin page, go to Tokens and scroll down to Production;
> 7.Click on "Ask a production token", and pick the scopes you require;
> - website:conversation:messages website:conversation:sessions website:people:profiles
> 8.Click on "Request production token";
> (wait that your submission gets approved, this can take a few minutes);
> 9.Once accepted, come back to Tokens, and copy your Production token keypair (configure it securely in your integration code);
> 10.Finally, install the plugin on all websites you need to use it for (using the private install link, provided in the Settings section under Danger Zone / Visibility);

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Identifier. |
| `token` | string | yes |  | Key. |

## Actions

### `add_note`

**Add Note to Conversation.** Appends an internal operator-only note message to an existing Crisp conversation, identified by website ID and conversation session ID. Use to record private context the customer cannot see. Not idempotent: each call posts a new note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `websiteId` | string | yes |  | Website ID. You can obtain website ID by navigating to Settings -> Workspace Settings -> Setup & Integrations. |
| `sessionId` | string | yes |  | Conversation ID (session_id). You can obtain session from URL address bar.It starts with 'session_'. |
| `content` | string | yes |  | Note Content. |

### `create_conversation`

**Create Conversation.** Starts a new Crisp conversation in a website inbox: ensures the customer profile exists (upserted by email), creates an empty conversation, posts the first message (sent as either user or operator), and attaches the customer email/nickname to it. Use to open a fresh support thread. Not idempotent: each call creates a separate conversation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `websiteId` | string | yes |  | Website ID. You can obtain website ID by navigating to Settings -> Workspace Settings -> Setup & Integrations. |
| `email` | string | yes |  | Customer Email. |
| `username` | string | yes |  | Customer Username. |
| `messageFrom` | string | yes |  | Message From. One of `"user"`, `"operator"`. |
| `message` | string | yes |  | Message. |

### `create_update_contact`

**Create/Update Contact.** Upserts a person profile in a Crisp website by email: updates the existing contact if one matches, otherwise creates it. Use to keep contact details (name, phone, address, company, website, notepad) in sync. Idempotent: keyed on the stable email, so repeating with the same input yields the same contact. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `websiteId` | string | yes |  | Website ID. You can obtain website ID by navigating to Settings -> Workspace Settings -> Setup & Integrations. |
| `email` | string | yes |  | Email. |
| `name` | string | yes |  | Name. |
| `phone` | string | no |  | Phone Number. |
| `address` | string | no |  | Address. |
| `company` | string | no |  | Company. |
| `website` | string | no |  | Contact Website. |
| `notepad` | string | no |  | Notepad. |

### `change_state`

**Change Conversation State.** Sets the workflow state of a Crisp conversation (unresolved, resolved, or pending), identified by website ID and conversation session ID. Use to mark a thread resolved or reopen it. Idempotent: re-applying the same target state leaves the conversation in that state with no extra effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `websiteId` | string | yes |  | Website ID. You can obtain website ID by navigating to Settings -> Workspace Settings -> Setup & Integrations. |
| `sessionId` | string | yes |  | Conversation ID (session_id). You can obtain session from URL address bar.It starts with 'session_'. |
| `state` | string | yes |  | State. One of `"unresolved"`, `"resolved"`, `"pending"`. |

### `find_conversation`

**Find Conversation.** Text-searches conversations in a Crisp website and returns the first page of matches. Use to locate an existing thread (and its session ID) before acting on it. Requires both the website ID and a non-empty search query. Idempotent: a read-only search with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `websiteId` | string | yes |  | Website ID. You can obtain website ID by navigating to Settings -> Workspace Settings -> Setup & Integrations. |
| `searchQuery` | string | yes |  | Search Query. |

### `find_user_profile`

**Find User Profile.** Looks up a single person profile in a Crisp website by exact email address, returning a found flag rather than erroring when no match exists. Use to check whether a contact already exists or to fetch its details. Idempotent: a read-only lookup with no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `websiteId` | string | yes |  | Website ID. You can obtain website ID by navigating to Settings -> Workspace Settings -> Setup & Integrations. |
| `email` | string | yes |  | Email Address. The email address of the user to find. |

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
