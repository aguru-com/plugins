# EmailOctopus

Email marketing platform for list management, campaign sending, tagging & unsubscribes. Automate contact management and campaign engagement tracking.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-emailoctopus'
  version: '0.2.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Log in to your EmailOctopus account.
> 2. Go to your **account settings**.
> 3. Generate a new API key.
> **Note:** If you have a 'legacy' key, you must generate a new one for API v2.

## Actions

### `add_or_update_contact`

**Add / Update Contact.** Upserts a contact into an EmailOctopus list by email address: creates it if absent, otherwise updates its fields, status, and tags. Use to ensure a subscriber exists or to set/refresh their details in one call. Requires the target list id and email; supplied tags are merged in (existing tags are not removed). Idempotent — repeating with the same input converges to the same contact state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List. The mailing list to use. A value the product loads from the provider, such as an id; write the value itself. |
| `email_address` | string | yes |  | Email Address. The contact's email address. |
| `fields` | object | yes |  | Fields. The contact's custom fields. An object whose fields depend on other inputs; the product shows them. |
| `tags` | array | no |  | Tags. Tags to associate with the contact. Existing tags will not be removed. |
| `status` | string | no |  | Status. The status of the contact. One of `"subscribed"`, `"unsubscribed"`, `"pending"`. |

### `unsubscribe_contact`

**Unsubscribe Contact.** Marks a contact as unsubscribed in a specific EmailOctopus list, looked up by email address. Use to opt a known subscriber out of a list. Requires the list id and the contact email. Idempotent — re-running leaves the contact unsubscribed with no additional effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List. The mailing list to use. A value the product loads from the provider, such as an id; write the value itself. |
| `email_address` | string | yes |  | Email Address. The email address of the contact to unsubscribe. |

### `update_contact_email`

**Update Contact's Email Address.** Changes a contact's email address within an EmailOctopus list, locating the contact by its current email. Use to correct or migrate a subscriber's address. Requires the list id, the current email (used to find the record), and the new email. Not idempotent — once changed, the original email no longer resolves to the contact, so a repeated call with the same inputs will not match. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List. The mailing list to use. A value the product loads from the provider, such as an id; write the value itself. |
| `current_email_address` | string | yes |  | Current Email Address. The contact's current email address used to find them. |
| `new_email_address` | string | yes |  | New Email Address. The new email address for the contact. |

### `add_tag_to_contact`

**Add Tag to Contact.** Applies one or more tags to a contact in an EmailOctopus list, located by email address. Use to label or segment a known subscriber. Requires the list id, the contact email, and the tags to add. Idempotent — re-adding tags that are already present leaves the contact unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List. The mailing list to use. A value the product loads from the provider, such as an id; write the value itself. |
| `email_address` | string | yes |  | Email Address. The contact's email address. |
| `tags` | array | yes |  | Tags. The tags to add to the contact. |

### `remove_tag_from_contact`

**Remove Tag from Contact.** Removes one or more tags from a contact in an EmailOctopus list, located by email address. Use to unlabel or re-segment a known subscriber. Requires the list id, the contact email, and the tags to remove. Idempotent — removing tags the contact no longer has leaves it unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List. The mailing list to use. A value the product loads from the provider, such as an id; write the value itself. |
| `email_address` | string | yes |  | Email Address. The email address of the contact to modify. |
| `tags` | array | yes |  | Tags. The tags to remove from the contact. |

### `create_list`

**Create List.** Creates a new EmailOctopus mailing list with the given name. Use to set up a fresh list before adding contacts. Requires only a list name. Not idempotent — each call creates a separate list even if the name matches an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | List Name. The name for the new list. |

### `find_contact`

**Find Contact.** Looks up a single contact by email address within a specific EmailOctopus list and reports whether it was found. Use to check existence or retrieve a contact before acting on it; a missing contact returns a found:false result rather than erroring. Requires the list id and the email. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List. The mailing list to use. A value the product loads from the provider, such as an id; write the value itself. |
| `email_address` | string | yes |  | Email Address. The email address of the contact to find. |

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
