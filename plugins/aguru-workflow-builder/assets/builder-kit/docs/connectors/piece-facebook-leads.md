# Facebook Leads

Capture leads from Facebook

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-facebook-leads'
  version: '0.4.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `facebook_leads_get_current_user`

**Get Current User.** Returns the id and name of the Facebook user behind this connection. Use it to confirm which account is connected; use List Pages to see the Pages it manages. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `name`: Name

### `facebook_leads_list_pages`

**List Pages.** Lists every Facebook Page the connected user manages, with its id, name, category and the tasks the user may perform on it. Use it to find the Page ID that List Lead Forms and Create Lead Form need. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `pages`: Pages
- `pages[].id`: Page ID
- `pages[].name`: Name
- `pages[].category`: Category
- `pages[].tasks`: Your Tasks on the Page
- `count`: Count (number)

### `facebook_leads_list_lead_forms`

**List Lead Forms.** Lists every lead form (instant form) on a Facebook Page, active and archived, with its id, name, status, locale, creation time and lead count. Use it to find the Form ID that List Leads and Get Lead Form need. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Facebook Page ID, e.g. "104857839123456". Use List Pages to find it. |

Output fields:

- `forms`: Forms
- `forms[].id`: Form ID
- `forms[].name`: Name
- `forms[].status`: Status
- `forms[].locale`: Locale
- `forms[].created_time`: Created At (datetime)
- `forms[].leads_count`: Leads Count (number)
- `count`: Count (number)

### `facebook_leads_get_lead_form`

**Get Lead Form.** Returns one lead form by ID: name, status, locale, lead and expired-lead counts, its questions (the field keys a lead answers), privacy policy URL and the Page it belongs to. Use it to learn which field keys the leads of a form carry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. Lead form ID, e.g. "1234567890123456". Use List Lead Forms to find it. |

Output fields:

- `id`: Form ID
- `name`: Name
- `status`: Status
- `locale`: Locale
- `created_time`: Created At (datetime)
- `leads_count`: Leads Count (number)
- `expired_leads_count`: Expired Leads Count (number)
- `questions`: Questions
- `questions[].id`: Question ID
- `questions[].key`: Key
- `questions[].label`: Label
- `questions[].type`: Type
- `questions[].options`: Options
- `questions[].options[].key`: Key
- `questions[].options[].value`: Value
- `privacy_policy_url`: Privacy Policy URL (url)
- `follow_up_action_url`: Follow-up URL (url)
- `page`: Page
- `page.id`: Page ID
- `page.name`: Name

### `facebook_leads_create_lead_form`

**Create Lead Form.** Creates a lead form (instant form) on a Facebook Page and returns its ID. A published form cannot be edited or deleted afterwards, only archived with Update Lead Form Status. The Page must have accepted the Lead Ads terms. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Facebook Page ID, e.g. "104857839123456". Use List Pages to find it. |
| `name` | string | yes |  | Form Name. Internal name of the form, shown in Ads Manager. |
| `questions` | JSON | yes |  | Questions. JSON array of questions. Standard fields only need a type, e.g. [{"type":"FULL_NAME"},{"type":"EMAIL"},{"type":"PHONE"}]. Custom questions use {"type":"CUSTOM","key":"budget","label":"What is your budget?"}, with "options":[{"key":"low","value":"Under $1k"}] for multiple choice. |
| `privacyPolicyUrl` | string | yes |  | Privacy Policy URL. Link to the advertiser privacy policy. Required by Facebook. |
| `privacyPolicyLinkText` | string | no |  | Privacy Policy Link Text. Text of the privacy policy link. Defaults to "Privacy Policy". |
| `followUpActionUrl` | string | yes |  | Follow-up URL. Website the "thank you" screen links to after submission. Required by Facebook. |
| `locale` | string | no |  | Locale. Form language, e.g. "EN_US" or "DE_DE". Defaults to the Page locale. |

Output fields:

- `id`: Form ID

### `facebook_leads_update_lead_form_status`

**Update Lead Form Status.** Sets a lead form to ARCHIVED (stops it from being used in new ads) or back to ACTIVE. Facebook has no way to delete or edit a form; archiving is the reversible way to retire one. Its existing leads stay readable. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. ID of the Facebook Page that owns the form. Use List Pages to find it. |
| `formId` | string | yes |  | Form ID. Lead form ID, e.g. "1234567890123456". Use List Lead Forms to find it. |
| `status` | string | yes |  | Status. ARCHIVED to retire the form, ACTIVE to reactivate it. One of `"ARCHIVED"`, `"ACTIVE"`. |

Output fields:

- `form_id`: Form ID
- `status`: Status
- `success`: Success (boolean)

### `facebook_leads_list_leads`

**List Leads.** Lists one page of leads submitted to a lead form, newest first, each with its answers keyed by question and its ad/campaign context. Filter by submission time with Created After / Created Before, and pass Next Cursor back as Cursor to get the next page. Facebook only returns leads from the last 90 days, and there is no search by email or phone: list and match the answers instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. Lead form ID, e.g. "1234567890123456". Use List Lead Forms to find it. |
| `createdAfter` | ISO date-time string | no |  | Created After. Only leads submitted after this time (ISO 8601). |
| `createdBefore` | ISO date-time string | no |  | Created Before. Only leads submitted before this time (ISO 8601). |
| `limit` | number | no |  | Limit. Leads per page (1-100). Defaults to 25. |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous List Leads call, to get the next page. |

Output fields:

- `leads`: Leads
- `leads[].lead_id`: Lead ID
- `leads[].form_id`: Form ID
- `leads[].platform`: Platform
- `leads[].ad_id`: Ad ID
- `leads[].ad_name`: Ad Name
- `leads[].adset_id`: Ad Set ID
- `leads[].adset_name`: Ad Set Name
- `leads[].campaign_id`: Campaign ID
- `leads[].campaign_name`: Campaign Name
- `leads[].created_time`: Submitted At (datetime)
- `leads[].data`: Answers (an object whose keys vary)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `facebook_leads_get_lead`

**Get Lead.** Returns one lead by ID with its answers keyed by question, its form and its ad, ad set and campaign. Lead IDs come from List Leads or the New Lead trigger. Leads older than 90 days are no longer returned by Facebook. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead ID. Lead ID, e.g. "987654321098765". Use List Leads to find it. |

Output fields:

- `lead_id`: Lead ID
- `form_id`: Form ID
- `platform`: Platform
- `ad_id`: Ad ID
- `ad_name`: Ad Name
- `adset_id`: Ad Set ID
- `adset_name`: Ad Set Name
- `campaign_id`: Campaign ID
- `campaign_name`: Campaign Name
- `created_time`: Submitted At (datetime)
- `data`: Answers (an object whose keys vary)

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
