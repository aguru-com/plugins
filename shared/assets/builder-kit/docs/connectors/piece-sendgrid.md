# SendGrid

Email delivery service for sending transactional and marketing emails

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sendgrid'
  version: '0.6.3'
```

Categories: COMMUNICATION, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API key acquired from your SendGrid settings

### `CUSTOM_AUTH`: API Key + Data Residency

> Authenticate with API key and select data residency region

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. API key acquired from your SendGrid settings. |
| `dataResidency` | string | yes | `"US"` | Data Residency. Select the Data Residency for this API key. One of `"US"`, `"EU"`. |

## Actions

### `send_email`

**Send Email.** Sends a one-off email via SendGrid with subject and body supplied inline, choosing plain-text or HTML content. Use to send transactional or ad-hoc messages where you compose the body directly; for prebuilt designs with merge variables use Send Dynamic Template instead. Requires a verified sender address and at least one recipient; optional file attachments are supported. Not idempotent — each call dispatches a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | array | yes |  | To. Emails of the recipients. |
| `from` | string | yes |  | From (Email). Sender email, must be on your SendGrid. |
| `from_name` | string | no |  | From (Name). Sender name. |
| `reply_to` | string | no |  | Reply To. Email to receive replies on (defaults to sender) |
| `subject` | string | yes |  | Subject. |
| `content_type` | string | yes |  | Content Type. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Content. HTML is only allowed if you selected HTML as type. |
| `attachments` | array | no |  | Attachments. Each item: { `file`, `name`? }. |

### `send_dynamic_template`

**Send Dynamic Template.** Sends an email rendered from a SendGrid dynamic template, merging the provided JSON template data into the template referenced by its ID. Use when the message design lives in SendGrid and you only need to supply variables; for composing the body inline use Send Email instead. Requires a valid template ID, a verified sender, and at least one recipient. Not idempotent — each call dispatches a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | array | yes |  | To. Emails of the recipients. |
| `from_name` | string | no |  | From (Name). Sender name. |
| `from` | string | yes |  | From (Email). Sender email, must be on your SendGrid. |
| `template_id` | string | yes |  | Template Id. Dynamic template id. |
| `template_data` | JSON | yes |  | Template Data. Dynamic template data. |
| `reply_to` | string | no |  | Reply To. Email to receive replies on (defaults to sender) |
| `attachments` | array | no |  | Attachments. Each item: { `file`, `name`? }. |

### `create_or_update_contact`

**Create or Update Contact.** Upserts a marketing contact in SendGrid by email, optionally adding them to one or more lists. Existing reserved and custom fields are merged, not replaced. SendGrid processes this asynchronously and returns a job_id. Idempotent — repeating the same input converges to the same contact. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email address of the contact (used to match existing contacts) |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `list_ids` | array | no |  | Lists. Lists to add the contact to. Values the product loads from the provider, such as ids; write an array of them. |
| `custom_fields` | object | no |  | Additional Fields. Extra reserved (e.g. city, country) or custom fields as key/value pairs. |

### `find_list_by_name`

**Find List by Name.** Finds SendGrid marketing lists whose name matches the given value (case-insensitive, exact). Returns every matching list since names are not guaranteed unique. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | List Name. The exact name of the list to search for. |

### `add_to_global_suppression`

**Add to Global Unsubscribe List.** Adds email addresses to SendGrid's global suppression (unsubscribe) list, blocking every future send to them regardless of list membership. Use to suppress dormant or offboarded recipients; to manage a contact's marketing list membership instead, use Create or Update Contact. Idempotent — repeating the same emails leaves them suppressed. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `emails` | array | yes |  | Emails. Email addresses to add to the global suppression list. |

### `remove_from_global_suppression`

**Remove from Global Unsubscribe List.** Removes an email address from SendGrid's global suppression (unsubscribe) list, re-enabling delivery to it. Use when reactivating a previously offboarded or dormant recipient. Idempotent — the end state is the email removed from the list. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email address to remove from the global suppression list. |

### `check_global_suppression`

**Check Global Unsubscribe Status.** Checks whether an email address is currently on SendGrid's global suppression (unsubscribe) list. Use before Remove from Global Unsubscribe List to avoid a no-op call, or to branch a flow based on suppression status. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email address to check. |

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
