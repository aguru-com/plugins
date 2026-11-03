# Bookedin

AI agents for lead conversion and appointment booking.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bookedin'
  version: '0.2.0'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To connect your Bookedin account, please follow these steps to retrieve your API Key:
>
> 1. Log in to your Bookedin Dashboard: dashboard.bookedin.ai
> 2. From the left menu, go to **Business**
> 3. Open **Settings**
> 4. Click on **API Key**
> 5. Copy your API Key (starts with **sk_…**)
> 6. Paste the key below to authorize the integration
>
> Your API Key allows Activepieces to securely access your Bookedin leads, agents, and booking data.

## Actions

### `getLeads`

**Get Leads.** List leads for the authenticated Bookedin business, returning a page with pagination metadata. Use it to browse or find leads; leave the filter fields empty to fetch all, or narrow by free-text search (name/email/phone), exact email, phone, or source, and page through results with limit/skip. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search text in name, email, or phone number. |
| `source` | string | no |  | Source. Filter by lead source (e.g., "API", "Import") |
| `email` | string | no |  | Email. Filter by exact email address. |
| `phone` | string | no |  | Phone. Filter by phone number. |
| `limit` | number | no | `100` | Limit. Number of leads to return. |
| `skip` | number | no | `0` | Skip. Number of leads to skip (pagination) |

### `createLead`

**Create Lead.** Create a new lead in Bookedin for the authenticated business from a contact first name, last name, email, and phone (all required). Use it to add a prospect into the lead pipeline. Not idempotent — each call creates a separate lead, with no de-duplication on email or phone. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First Name. |
| `lastName` | string | yes |  | Last Name. |
| `email` | string | yes |  | Email. |
| `phone` | string | yes |  | Phone Number. |

### `getLead`

**Get Lead.** Fetch a single lead by its Bookedin lead ID. Use it to read the full record for one known lead; if you only have a name, email, or phone, find the ID first with Get Leads. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead. Select a lead. A value the product loads from the provider, such as an id; write the value itself. |

### `deleteLead`

**Delete Lead.** Permanently delete a lead by its Bookedin lead ID. Use it to remove a known lead from the pipeline; this is destructive and cannot be undone. Idempotent on the end state — once the lead is gone, re-running targets an already-removed record. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead. Select a lead. A value the product loads from the provider, such as an id; write the value itself. |

### `getLeadStats`

**Get Lead Stats.** Get aggregate lead statistics for the authenticated Bookedin business, such as counts of Hot, Warm, and Cold leads, objectives met, and the total. Use it for a quick pipeline summary rather than fetching individual leads. Takes no input; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

### `updateLead`

**Update Lead.** Update an existing lead identified by its Bookedin lead ID. Supply any of the individual contact fields (first/last name, email, phone) and handling status, and/or pass a raw JSON payload for complex updates that merges over those fields. Use it to edit a known lead; only the fields you provide are changed. Idempotent — re-applying the same values yields the same lead state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead. Select a lead. A value the product loads from the provider, such as an id; write the value itself. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone Number. |
| `handling_status` | string | no |  | Handling Status. |
| `update_json` | JSON | no | `{}` | Update Payload (JSON). Optional JSON body for complex updates. Merges with individual fields above. |

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
