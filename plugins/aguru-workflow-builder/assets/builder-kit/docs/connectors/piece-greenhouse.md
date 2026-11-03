# Greenhouse

Recruiting and onboarding software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-greenhouse'
  version: '0.1.0'
```

Categories: HUMAN_RESOURCES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Greenhouse

> To connect Greenhouse, you need OAuth2 credentials from a registered Greenhouse partner application.
>
> **Steps to get credentials:**
> 1. Contact **partner-support@greenhouse.io** to register your integration.
> 2. Provide: integration name, required scopes, and your redirect URI.
> 3. Greenhouse will issue a **Client ID** and **Client Secret**.
>
> **Required scopes:** `harvest:candidates:list`, `harvest:candidates:create`, `harvest:candidates:update`, `harvest:applications:list`, `harvest:jobs:list`, `harvest:job_posts:list`, `harvest:interviews:list`, `harvest:scorecards:list`, `harvest:notes:create`

## Actions

### `create_candidate`

**Create Candidate.** Creates a new candidate record in Greenhouse from name plus optional contact details, current role, links, and tags. Use when adding someone to the candidate database; first and last name are required. Not idempotent — each call creates a separate candidate even with identical input, so to avoid duplicates use Find or Create Candidate when the person may already exist. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. The candidate's first name. |
| `last_name` | string | yes |  | Last Name. The candidate's last name. |
| `email` | string | no |  | Email Address. The candidate's email address. |
| `email_type` | string | no | `"personal"` | Email Type. The type of email address provided. One of `"personal"`, `"work"`, `"other"`. |
| `phone` | string | no |  | Phone Number. The candidate's phone number. |
| `phone_type` | string | no | `"mobile"` | Phone Type. The type of phone number provided. One of `"mobile"`, `"home"`, `"work"`, `"skype"`, `"other"`. |
| `company` | string | no |  | Current Company. The candidate's current employer. |
| `title` | string | no |  | Current Job Title. The candidate's current job title. |
| `linkedin_url` | string | no |  | LinkedIn URL. URL to the candidate's LinkedIn profile (e.g. `https://linkedin.com/in/johndoe`). |
| `website_url` | string | no |  | Website URL. URL to the candidate's personal website or portfolio. |
| `tags` | array | no |  | Tags. Labels to attach to this candidate (e.g. `referral`, `engineering`). Each item in the list becomes one tag. |

### `create_candidate_note`

**Create Candidate Note.** Appends a note (or activity entry) to an existing candidate, with a chosen visibility level (public, private, or admin-only) and optional author attribution. Use to log commentary or context against a candidate; requires the numeric candidate ID. Not idempotent — each call adds a new note, so repeating it appends duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `candidate_id` | string | yes |  | Candidate ID. The numeric ID of the candidate to add the note to. Found in the candidate URL in Greenhouse (e.g. `https://app.greenhouse.io/people/**123456**`), or mapped from a previous **Create Candidate** step. |
| `note_type` | string | yes | `"NOTE"` | Note Type. The type of note to create. One of `"NOTE"`, `"ACTIVITY"`. |
| `body` | string | yes |  | Note. The content of the note. |
| `visibility` | string | yes | `"public"` | Visibility. Who can see this note. **Admin Only** — only admins; **Private** — only the author; **Public** — all Greenhouse users. One of `"public"`, `"private"`, `"admin_only"`. |
| `user_id` | string | no |  | Author User ID. Optional. The Greenhouse user ID to attribute this note to. To find it: go to **Configure → Users**, click a user, and copy the number from the URL (e.g. `https://app.greenhouse.io/people/**12345**`). |

### `create_prospect`

**Create Prospect.** Creates a prospect in Greenhouse — a sourced person flagged as not yet applied to a specific job — from name plus optional contact details, current role, links, and tags. Use for proactive sourcing rather than active applicants (use Create Candidate for those); first and last name are required. Not idempotent — each call creates a separate prospect even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. The prospect's first name. |
| `last_name` | string | yes |  | Last Name. The prospect's last name. |
| `email` | string | no |  | Email Address. The prospect's email address. |
| `email_type` | string | no | `"personal"` | Email Type. The type of email address provided. One of `"personal"`, `"work"`, `"other"`. |
| `phone` | string | no |  | Phone Number. The prospect's phone number. |
| `phone_type` | string | no | `"mobile"` | Phone Type. The type of phone number provided. One of `"mobile"`, `"home"`, `"work"`, `"skype"`, `"other"`. |
| `company` | string | no |  | Current Company. The prospect's current employer. |
| `title` | string | no |  | Current Job Title. The prospect's current job title. |
| `linkedin_url` | string | no |  | LinkedIn URL. URL to the prospect's LinkedIn profile (e.g. `https://linkedin.com/in/johndoe`). |
| `website_url` | string | no |  | Website URL. URL to the prospect's personal website or portfolio. |
| `tags` | array | no |  | Tags. Labels to attach to this prospect (e.g. `referral`, `engineering`). Each item in the list becomes one tag. |

### `update_candidate`

**Update Candidate.** Updates fields on an existing candidate identified by numeric candidate ID; only the fields you supply are changed, and the rest are left untouched. Use to amend a candidate name, contact details, current role, links, or tags. Idempotent — re-sending the same field values leaves the record in the same state; note that supplying email/phone replaces the primary value and supplying tags replaces all existing tags. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `candidate_id` | string | yes |  | Candidate ID. The numeric ID of the candidate to update. Found in the candidate URL in Greenhouse (e.g. `https://app.greenhouse.io/people/**123456**`), or mapped from a previous **Create Candidate** step. |
| `first_name` | string | no |  | First Name. Updated first name for the candidate. |
| `last_name` | string | no |  | Last Name. Updated last name for the candidate. |
| `email` | string | no |  | Email Address. Updated email address. This replaces the candidate's primary email. |
| `email_type` | string | no | `"personal"` | Email Type. The type of the updated email address. One of `"personal"`, `"work"`, `"other"`. |
| `phone` | string | no |  | Phone Number. Updated phone number. This replaces the candidate's primary phone. |
| `phone_type` | string | no | `"mobile"` | Phone Type. The type of the updated phone number. One of `"mobile"`, `"home"`, `"work"`, `"skype"`, `"other"`. |
| `company` | string | no |  | Current Company. Updated current employer. |
| `title` | string | no |  | Current Job Title. Updated current job title. |
| `linkedin_url` | string | no |  | LinkedIn URL. Updated LinkedIn profile URL (e.g. `https://linkedin.com/in/johndoe`). |
| `website_url` | string | no |  | Website URL. Updated personal website or portfolio URL. |
| `tags` | array | no |  | Tags. Replaces all existing tags on the candidate with this list. Leave blank to keep existing tags unchanged. |

### `find_candidate`

**Find Candidate.** Looks up a candidate by exact email address and returns the first match, or a not-found result if none exists. Use to resolve a candidate ID or check whether someone already exists before creating them. Idempotent read-only lookup; matches only on a full email, not partial names. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. The email address to search for. Returns the first candidate whose profile contains this address. |

### `find_or_create_candidate`

**Find or Create Candidate.** Looks up a candidate by exact email and returns the existing match if found, otherwise creates a new candidate from the supplied name and details. Prefer this over Create Candidate when the person may already exist, to avoid duplicates. Idempotent — keyed on email, so repeating with the same email returns the same candidate rather than creating another; first and last name are required for the create path. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. The email address to search for. If a candidate with this address already exists, they will be returned as-is. |
| `first_name` | string | yes |  | First Name. Required when creating a new candidate. Ignored if a match is found. |
| `last_name` | string | yes |  | Last Name. Required when creating a new candidate. Ignored if a match is found. |
| `email_type` | string | no | `"personal"` | Email Type. The type of email address. Used only when creating a new candidate. One of `"personal"`, `"work"`, `"other"`. |
| `phone` | string | no |  | Phone Number. Phone number to set on the new candidate. Ignored if a match is found. |
| `phone_type` | string | no | `"mobile"` | Phone Type. The type of phone number. Used only when creating a new candidate. One of `"mobile"`, `"home"`, `"work"`, `"skype"`, `"other"`. |
| `company` | string | no |  | Current Company. Current employer to set on the new candidate. Ignored if a match is found. |
| `title` | string | no |  | Current Job Title. Current job title to set on the new candidate. Ignored if a match is found. |
| `linkedin_url` | string | no |  | LinkedIn URL. LinkedIn profile URL to set on the new candidate (e.g. `https://linkedin.com/in/johndoe`). Ignored if a match is found. |
| `website_url` | string | no |  | Website URL. Personal website or portfolio URL to set on the new candidate. Ignored if a match is found. |
| `tags` | array | no |  | Tags. Tags to attach to the new candidate. Ignored if a match is found. |

### `find_due_scorecard`

**Find Due Scorecard.** Fetches the full details of a single scorecard by its numeric ID, returning null if no scorecard matches. Use to enrich a New Scorecard Due trigger event with the complete scorecard record. Idempotent read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scorecard_id` | string | yes |  | Scorecard ID. The numeric ID of the scorecard to retrieve. Typically mapped from a **New Scorecard Due** trigger step. |

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
