# Salesloft

Sales engagement platform for cadences, people, and revenue workflows.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-salesloft'
  version: '0.1.0'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your Salesloft API key:
> 1. Log in to your Salesloft account.
> 2. Navigate to **Settings → Integrations → API**.
> 3. Click **Generate** to create a new API key.
> 4. Copy the key and paste it here.

## Actions

### `create_person`

**Create Person.** Creates a new person (contact/lead) record in Salesloft. Use when adding a prospect not yet tracked. Requires either an email address, or both a phone number and last name; the call fails if neither identifier set is supplied. Not idempotent — each call creates a separate person, so repeating risks duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_address` | string | no |  | Email Address. Primary email address. Either this or Phone + Last Name is required. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `phone` | string | no |  | Phone. Phone number. Required along with Last Name when Email Address is not provided. |
| `title` | string | no |  | Job Title. |
| `company_name` | string | no |  | Company Name. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State. |
| `country` | string | no |  | Country. |
| `linkedin_url` | string | no |  | LinkedIn URL. |
| `account_id` | string | no |  | Account. Salesloft account to associate with this person. A value the product loads from the provider, such as an id; write the value itself. |
| `owner_id` | string | no |  | User (Owner). Salesloft user who will own this resource. Defaults to the authenticated user if not provided. A value the product loads from the provider, such as an id; write the value itself. |

### `update_person`

**Update Person.** Updates fields on an existing Salesloft person identified by person ID; only the fields you supply are changed. Use when editing a known contact rather than creating one. Idempotent — applying the same field values repeatedly leaves the person in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `person_id` | string | yes |  | Person. A value the product loads from the provider, such as an id; write the value itself. |
| `email_address` | string | no |  | Email Address. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `phone` | string | no |  | Phone. |
| `title` | string | no |  | Job Title. |
| `company_name` | string | no |  | Company Name. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State. |
| `country` | string | no |  | Country. |
| `linkedin_url` | string | no |  | LinkedIn URL. |
| `account_id` | string | no |  | Account. Salesloft account to associate with this person. A value the product loads from the provider, such as an id; write the value itself. |
| `owner_id` | string | no |  | User (Owner). Salesloft user who will own this resource. Defaults to the authenticated user if not provided. A value the product loads from the provider, such as an id; write the value itself. |

### `get_person`

**Get Person.** Retrieves a single Salesloft person record by its numeric person ID. Use to look up a known contact's current details. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `person_id` | string | yes |  | Person. A value the product loads from the provider, such as an id; write the value itself. |

### `list_people`

**List People.** Lists people from Salesloft with pagination; leaving the email filter empty returns all people, while supplying an email address narrows results to matching contacts. Use to browse contacts or to resolve a person ID from an email before another action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_addresses` | string | no |  | Filter by Email Address. An email address to filter results by. Returns only people matching this email. |
| `per_page` | number | no | `25` | Results Per Page. Number of results per page (max 100). |
| `page` | number | no | `1` | Page. Page number (1-indexed). |

### `create_cadence_membership`

**Add Person to Cadence.** Enrolls a Salesloft person into a cadence (sequence) so they begin receiving its steps. Use to start outreach for a contact. Requires a person ID and cadence ID, both of which must be visible to the authenticated user; an optional user ID assigns the membership owner. Not idempotent — each call creates a new membership. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `person_id` | string | yes |  | Person. A value the product loads from the provider, such as an id; write the value itself. |
| `cadence_id` | string | yes |  | Cadence. A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | no |  | User (Owner). Salesloft user who will own this resource. Defaults to the authenticated user if not provided. A value the product loads from the provider, such as an id; write the value itself. |

### `list_cadences`

**List Cadences.** Lists the available cadences (outreach sequences) in Salesloft with pagination. Use to browse cadences or resolve a cadence ID before adding a person to one. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `25` | Results Per Page. Number of results per page (max 100). |
| `page` | number | no | `1` | Page. Page number (1-indexed). |

### `create_note`

**Create Note.** Creates a note attached to a Salesloft person or account, depending on the chosen associated record type. Use to log context against a contact or company. Requires note content plus the record type and the numeric ID of the target record. Not idempotent — each call appends a new note. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Content. The body content of the note. |
| `associated_type` | string | yes |  | Associated Record Type. Whether this note is linked to a person or an account. One of `"person"`, `"account"`. |
| `associated_id` | number | yes |  | Associated Record ID. The numeric ID of the person or account to attach this note to. |

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
