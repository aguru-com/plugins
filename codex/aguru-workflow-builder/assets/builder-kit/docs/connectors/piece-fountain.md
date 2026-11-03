# Fountain

Automate your complete HR hiring and onboarding workflow. Manage applicants, job openings, interview scheduling, and track progress through hiring stages with real-time webhooks.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-fountain'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your Fountain API key and base URL

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Enter your Fountain API key from Profile > Manage API Keys or Settings > Integrations & API Keys. |
| `baseUrl` | string | no |  | Base URL. The base URL for your Fountain API (default: https://api.fountain.com). For example: us-2.fountain.com/api/v2. |

## Actions

### `create_applicant`

**Create Applicant.** Creates a new applicant record in Fountain from a name, email, and phone number. Use to add a candidate into the hiring pipeline. Optionally enable the duplicate check to apply the company's configured duplicate-blocking rules. Not idempotent: each call creates a new applicant. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Full Name. Applicant's full name. |
| `email` | string | yes |  | Email. Applicant's email address. |
| `phone_number` | string | yes |  | Phone Number. Applicant's complete phone number. |
| `check_if_applicant_is_duplicate` | boolean | no | `false` | Check for Duplicates. Apply additional duplicate applicant blocking rules specified in company duplicate settings. |

### `delete_applicant`

**Delete Applicant.** Permanently deletes an applicant from Fountain by their applicant ID. Use to remove a candidate from the system. Idempotent in effect: once the applicant is gone, repeating the call has no further effect, though it is a destructive mutation. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Applicant. The applicant to delete (shows 50 most recent applicants) A value the product loads from the provider, such as an id; write the value itself. |

### `get_applicant_details`

**Get Applicant Details.** Retrieves the full record for a single applicant by their applicant ID. Use to look up a candidate's details, contact info, and current pipeline state. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Applicant. The applicant to delete (shows 50 most recent applicants) A value the product loads from the provider, such as an id; write the value itself. |

### `get_interview_sessions`

**Get Interview Sessions.** Lists the booked interview slots/sessions for a single applicant, identified by their applicant ID. Use to check a candidate's scheduled interviews. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Applicant. The applicant to get interview sessions for (shows 50 most recent applicants) A value the product loads from the provider, such as an id; write the value itself. |

### `get_opening`

**Get Opening.** Retrieves details for a single job opening (Fountain funnel) by its ID. Use to inspect a specific opening before working with its stages or applicants. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Opening. The opening to retrieve details for. A value the product loads from the provider, such as an id; write the value itself. |

### `get_stage`

**Get Stage.** Retrieves details for a single hiring-pipeline stage by its stage ID (the opening/funnel is selected only to scope the stage picker). Use to inspect a specific stage within an opening. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `funnel_id` | string | yes |  | Opening. The opening that contains the stage. A value the product loads from the provider, such as an id; write the value itself. |
| `id` | string | yes |  | Stage. The stage to retrieve details for. A value the product loads from the provider, such as an id; write the value itself. |

### `list_applicants`

**List All Applicant Details.** Lists applicants in Fountain, returning all applicants when no filters are set or narrowing the results when any are supplied (by opening, location, stage, stage name, labels, or phone number). Use to find or enumerate candidates; supports cursor-based pagination via per_page and cursor. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `funnel_id` | string | no |  | Opening. Filter applicants by opening. A value the product loads from the provider, such as an id; write the value itself. |
| `location_id` | string | no |  | Location. Filter applicants by location. A value the product loads from the provider, such as an id; write the value itself. |
| `stage_id` | string | no |  | Stage. Filter applicants by stage. A value the product loads from the provider, such as an id; write the value itself. |
| `stage` | string | no |  | Stage. Filter applicants by stage name. |
| `labels` | string | no |  | Labels. Filter applicants by labels. |
| `phone` | string | no |  | Phone Number. Filter applicants by phone number. |
| `exclude_temporary` | boolean | no | `false` | Exclude Temporary. Whether to exclude temporary/test applicants. |
| `per_page` | number | no | `25` | Results Per Page. Number of results per page (default: 25) |
| `cursor` | string | no |  | Cursor. Cursor for pagination. |
| `include_subaccounts` | boolean | no | `false` | Include Sub-accounts. Whether to include applicants from sub-accounts. |

### `list_openings`

**List All Opening Details.** Lists job openings (Fountain funnels), returning all openings when no filters are set or narrowing the results when any are supplied (active-only, location, hiring vs. sourcing funnel, private-only, or owner). Use to find or enumerate openings; supports cursor-based pagination via per_page and cursor. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `active` | boolean | no |  | Active Only. Filter to only active openings. |
| `location_id` | string | no |  | Location. Filter openings by location. A value the product loads from the provider, such as an id; write the value itself. |
| `is_hiring_funnel` | boolean | no |  | Hiring Funnels Only. Filter to only hiring funnels. |
| `is_sourcing_funnel` | boolean | no |  | Sourcing Funnels Only. Filter to only sourcing funnels. |
| `is_private` | boolean | no |  | Private Only. Filter to only private openings. |
| `owner_id` | string | no |  | Owner. Filter openings by owner. A value the product loads from the provider, such as an id; write the value itself. |
| `per_page` | number | no | `25` | Results Per Page. Number of results per page (default: 25) |
| `cursor` | string | no |  | Cursor. Cursor for pagination. |

### `list_stages`

**List All Stages.** Lists all hiring-pipeline stages for a given opening (Fountain funnel), identified by its funnel ID. Use to discover the stages of an opening, e.g. before moving or filtering applicants. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `funnel_id` | string | yes |  | Opening. The opening to get stages for. A value the product loads from the provider, such as an id; write the value itself. |

### `update_applicant`

**Update Applicant Info.** Updates an existing applicant by their applicant ID, setting any of name, email, phone number, custom data, secure data, or rejection reason (only supplied fields are sent). Use to edit a candidate's record. Effectively idempotent: re-sending the same field values leaves the applicant in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Applicant. The applicant to update (shows 50 most recent applicants) A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. Applicant's full name. |
| `email` | string | no |  | Email. Applicant's email address. |
| `phone_number` | string | no |  | Phone Number. Applicant's complete phone number. |
| `data` | object | no |  | Custom Data. Custom data fields to update (key-value pairs) |
| `secure_data` | object | no |  | Secure Data. Secure data fields to update (key-value pairs like SSN, etc.) |
| `rejection_reason` | string | no |  | Rejection Reason. Manually set reason for rejection. |
