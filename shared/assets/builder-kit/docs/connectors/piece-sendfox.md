# SendFox

Email marketing made simple

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sendfox'
  version: '0.2.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your personal token, follow these steps:
> 1. Log in to your SendFox account.
> 2. Visit https://sendfox.com/account/oauth to create one
> 3. From OAuth Apps click on Create New Token.
> 4. Enter any name you want then click create.
> 5. Copy and paste your token here.

## Actions

### `create-list`

**Create List.** Creates a new contact list in SendFox with the given name. Use to set up a list before adding subscribers to it. Not idempotent: each call creates a new list even if one with the same name already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_name` | string | yes |  | List Name. |

### `unsubscribe`

**Unsubscribe Contact.** Unsubscribes a contact from SendFox by email so they stop receiving emails. Use to honor an opt-out or remove someone from sends. Effectively idempotent in outcome (the contact ends up unsubscribed), but flagged not idempotent because each call issues a state-changing request. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |

### `create-contact`

**Create Contact.** Adds a new contact (subscriber) to SendFox by email, optionally setting first/last name and assigning the contact to a list. Use to add or onboard a subscriber. Not idempotent: each call posts the contact, so repeating may create or re-add the entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `firstname` | string | no |  | First Name. |
| `lastname` | string | no |  | Last Name. |
| `list` | string | no |  | Lists. A value the product loads from the provider, such as an id; write the value itself. |

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
