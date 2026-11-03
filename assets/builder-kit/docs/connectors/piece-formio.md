# Form.io

Build and manage forms and their submissions on Form.io, hosted or self-hosted

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-formio'
  version: '0.1.3'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect to a Form.io project, hosted or self-hosted.
>
> **Project URL** — the URL your forms live under. On a self-hosted server that is usually the host itself, for example `https://forms.example.gov`, or the host plus the project name if your deployment uses projects, for example `https://forms.example.gov/intake`. On Form.io's cloud it looks like `https://xyzabc.form.io`.
>
> **API Key** — a project API key, sent as the `x-token` header. On a self-hosted server these come from the `API_KEYS` environment variable; on cloud, from Project Settings → API Keys. A user login (JWT) is not supported.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectUrl` | string | yes |  | Project URL. For example https://forms.example.gov/intake. |
| `apiKey` | string | yes |  | API Key. Sent as the x-token header. |

## Actions

### `create_submission`

**Create Submission.** Creates a new submission on a Form.io form, with the field values keyed by the form component keys. Use it to file a record into Form.io from a flow, such as a citizen intake or a case created elsewhere. Requires the form and the submission data; not idempotent, since each call files a separate submission. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formPath` | string | yes |  | Form. The form whose submissions this step works with. A value the product loads from the provider, such as an id; write the value itself. |
| `data` | JSON | yes |  | Submission Data. The submission fields, keyed by the form component keys, for example {"fullName": "Amina Haddad", "email": "amina@example.gov"}. |

Output fields:

- `_id`: Submission ID
- `form`: Form ID
- `data`: Submitted Data
- `owner`: Owner
- `roles`: Roles
- `access`: Access
- `externalIds`: External IDs
- `metadata`: Metadata
- `metadata.headers`: Request Headers
- `metadata.headers.host`: Host
- `metadata.headers.user-agent`: User Agent
- `metadata.headers.content-type`: Content Type
- `metadata.headers.content-length`: Content Length
- `created`: Created (datetime)
- `modified`: Modified (datetime)

### `get_submission`

**Get Submission.** Reads a single Form.io submission by its id, returning the submitted data along with its owner, timestamps and metadata. Use it to look up a record whose id you already have; prefer Find Submissions to search by field values. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formPath` | string | yes |  | Form. The form whose submissions this step works with. A value the product loads from the provider, such as an id; write the value itself. |
| `submissionId` | string | yes |  | Submission ID. The submission's `_id`. |

Output fields:

- `_id`: Submission ID
- `form`: Form ID
- `data`: Submitted Data
- `owner`: Owner
- `roles`: Roles
- `access`: Access
- `externalIds`: External IDs
- `metadata`: Metadata
- `metadata.headers`: Request Headers
- `metadata.headers.host`: Host
- `metadata.headers.user-agent`: User Agent
- `metadata.headers.content-type`: Content Type
- `metadata.headers.content-length`: Content Length
- `created`: Created (datetime)
- `modified`: Modified (datetime)

### `find_submissions`

**Find Submissions.** Searches the submissions of a Form.io form, filtering on submitted field values or on the created and modified timestamps, with paging and sorting. Field paths are prefixed with data, for example data.email. Choose it to look records up by their content; use Get Submission when the id is already known. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formPath` | string | yes |  | Form. The form whose submissions this step works with. A value the product loads from the provider, such as an id; write the value itself. |
| `filters` | array | no |  | Filters. Each row narrows the search. Use a data-prefixed path for a form field, for example data.email, or created / modified for the timestamps. Each item: { `field`, `operator`, `value` }. |
| `limit` | number | no |  | Limit. How many submissions to return. Form.io defaults to 10. |
| `skip` | number | no |  | Skip. How many submissions to skip, for paging. |
| `sortField` | string | no | `"created"` | Sort By. For example created, modified, or data.refNumber. |
| `sortDirection` | string | no | `"desc"` | Sort Direction. One of `"desc"`, `"asc"`. |

Output fields:

- `submissions`: Submissions
- `submissions[]._id`: Submission ID
- `submissions[].form`: Form ID
- `submissions[].data`: Submitted Data
- `submissions[].owner`: Owner
- `submissions[].roles`: Roles
- `submissions[].access`: Access
- `submissions[].externalIds`: External IDs
- `submissions[].metadata`: Metadata
- `submissions[].metadata.headers`: Request Headers
- `submissions[].metadata.headers.host`: Host
- `submissions[].metadata.headers.user-agent`: User Agent
- `submissions[].metadata.headers.content-type`: Content Type
- `submissions[].metadata.headers.content-length`: Content Length
- `submissions[].created`: Created (datetime)
- `submissions[].modified`: Modified (datetime)
- `count`: Returned Count (number)
- `total`: Total Matching (number)

### `update_submission`

**Update Submission.** Updates an existing Form.io submission, identified by its id. By default the fields supplied are merged into the submission, leaving every other field as it was. Turn Merge off to replace the submission data outright, which is what the Form.io API does natively and which clears any field not supplied. Merging reads the submission and writes it back, and Form.io cannot reject a write based on the version read, so two flows updating the same submission at the same time will lose one set of changes. Use it to correct or progress a record already in Form.io. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formPath` | string | yes |  | Form. The form whose submissions this step works with. A value the product loads from the provider, such as an id; write the value itself. |
| `submissionId` | string | yes |  | Submission ID. The submission's `_id`. |
| `data` | JSON | yes |  | Submission Data. The submission fields, keyed by the form component keys, for example {"fullName": "Amina Haddad", "email": "amina@example.gov"}. |
| `merge` | boolean | no | `true` | Merge With Existing Data. On by default: the fields above are merged into the submission and everything else is left alone. Turn it off to replace the submission data outright, which clears any field you do not supply. Merging reads the submission and writes it back, and Form.io offers no way to reject a write based on the … |

Output fields:

- `_id`: Submission ID
- `form`: Form ID
- `data`: Submitted Data
- `owner`: Owner
- `roles`: Roles
- `access`: Access
- `externalIds`: External IDs
- `metadata`: Metadata
- `metadata.headers`: Request Headers
- `metadata.headers.host`: Host
- `metadata.headers.user-agent`: User Agent
- `metadata.headers.content-type`: Content Type
- `metadata.headers.content-length`: Content Length
- `created`: Created (datetime)
- `modified`: Modified (datetime)

### `delete_submission`

**Delete Submission.** Deletes a Form.io submission by its id. Destructive and not recoverable through this piece, so confirm the id before calling it. Deleting an already-deleted submission has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formPath` | string | yes |  | Form. The form whose submissions this step works with. A value the product loads from the provider, such as an id; write the value itself. |
| `submissionId` | string | yes |  | Submission ID. The submission's `_id`. |

Output fields:

- `deleted`: Deleted (boolean)
- `submissionId`: Submission ID

### `list_forms`

**List Forms.** Lists the forms in a Form.io project, each with its title, path and id. Use it to discover which forms exist, or to resolve a form title to the path the submission actions need. Set the type to resource to list resources instead of forms. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no | `"form"` | Type. One of `"form"`, `"resource"`. |
| `limit` | number | no |  | Limit. How many to return. Defaults to 100. |

Output fields:

- `forms`: Forms
- `forms[]._id`: Form ID
- `forms[].title`: Title
- `forms[].name`: Name
- `forms[].path`: Path
- `forms[].type`: Type
- `forms[].display`: Display
- `forms[].machineName`: Machine Name
- `forms[].owner`: Owner
- `forms[].tags`: Tags
- `forms[].components`: Components
- `forms[].components[].key`: Key
- `forms[].components[].label`: Label
- `forms[].components[].type`: Type
- `forms[].components[].input`: Is Input (boolean)
- `forms[].access`: Access
- `forms[].access[].type`: Type
- `forms[].access[].roles`: Roles
- `forms[].submissionAccess`: Submission Access
- `forms[].created`: Created (datetime)
- `forms[].modified`: Modified (datetime)
- `count`: Count (number)

### `get_form`

**Get Form.** Reads a single Form.io form definition, including the component tree that describes its fields. Use it to discover which field keys a form expects before creating or updating a submission. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formPath` | string | yes |  | Form. The form whose submissions this step works with. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `_id`: Form ID
- `title`: Title
- `name`: Name
- `path`: Path
- `type`: Type
- `display`: Display
- `machineName`: Machine Name
- `owner`: Owner
- `tags`: Tags
- `components`: Components
- `components[].key`: Key
- `components[].label`: Label
- `components[].type`: Type
- `components[].input`: Is Input (boolean)
- `access`: Access
- `access[].type`: Type
- `access[].roles`: Roles
- `submissionAccess`: Submission Access
- `created`: Created (datetime)
- `modified`: Modified (datetime)

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
