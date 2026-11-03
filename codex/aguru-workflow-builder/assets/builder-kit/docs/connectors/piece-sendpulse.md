# SendPulse

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sendpulse'
  version: '0.2.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your SendPulse client credentials

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Client ID. |
| `clientSecret` | string | yes |  | Client Secret. |

## Actions

### `add-subscriber`

**Add Subscriber.** Adds an email contact to a specific SendPulse mailing list (address book), optionally attaching subscriber variables (e.g. name, phone) and numeric tag IDs. Use to enroll a new contact into a list; requires the target mailing list ID and a valid email. Not idempotent — each call re-submits the contact to the list. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mailingListId` | string | yes |  | Mailing List. Select one of your SendPulse mailing lists. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. Subscriber email address. |
| `variables` | object | no |  | Variables. Optional subscriber variables (e.g., name, phone) |
| `tags` | array | no |  | Tag IDs. Optional tag IDs to assign. |

### `change-variable-for-subscriber`

**Change Variable for Subscriber.** Sets a single named variable (custom field) to a given value for one subscriber, identified by email, within a specific SendPulse mailing list. Use to overwrite a single field value; the variable must already exist on the list and its type (number/date) is validated against the value. Idempotent — repeating with the same value leaves the field unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mailingListId` | string | yes |  | Mailing List. Select one of your SendPulse mailing lists. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. Subscriber email address. |
| `variableName` | string | yes |  | Variable Name. Select variable to update. A value the product loads from the provider, such as an id; write the value itself. |
| `variableValue` | string | yes |  | Variable Value. New value for the variable. |

### `delete-contact`

**Delete Contact.** Permanently removes a contact, identified by email, from every SendPulse mailing list (address book) in the account at once. Use to fully purge a contact rather than unsubscribe from a single list. Destructive but idempotent — once deleted, repeating the call leaves the contact absent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. Email address to delete from all mailing lists. |

### `unsubscribe-user`

**Unsubscribe User.** Unsubscribes one or more email addresses (up to 100 per call) from a single specified SendPulse mailing list, leaving them in other lists. Use to opt contacts out of one list rather than purge them account-wide. Idempotent — repeating leaves the same contacts unsubscribed from that list. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mailingListId` | string | yes |  | Mailing List. Select one of your SendPulse mailing lists. A value the product loads from the provider, such as an id; write the value itself. |
| `emails` | array | yes |  | Email Addresses. Email addresses to unsubscribe (max 100) |

### `update-subscriber`

**Update Subscriber.** Updates an existing subscriber, identified by email, within a specific SendPulse mailing list by setting their phone number and/or one or more variables (custom fields) to new values. Use to overwrite a contact's details; at least one of phone or variables must be supplied. Idempotent — repeating with the same values leaves the contact unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mailingListId` | string | yes |  | Mailing List. Select one of your SendPulse mailing lists. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. Email address of the subscriber to update. |
| `phone` | string | no |  | Phone Number. New phone number (optional) |
| `variables` | object | no |  | Variables. Subscriber variables to update (e.g., name, custom fields) |

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
