# Workable

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-workable'
  version: '0.2.1'
```

Categories: HUMAN_RESOURCES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Access Token

> 1. Click your profile icon in the upper right and navigate to Settings > Integrations > Apps.
> 2. Locate the API Access Tokens section near the top of the page.
> 3. Click the button **+ Generate API token**.
> 4. Select the following scopes:
> - r_jobs
> - r_candidates
> - w_candidates
> 5. Click Generate token to complete the process.

## Actions

### `getCandidate`

**Get Candidate.** Fetch a single Workable candidate record by its candidate ID. Use to look up a known candidate before rating, moving, or referencing them. Requires the exact candidate ID; this is a read-only lookup and is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Candidate's Id. |

### `getMembers`

**Get Members.** Lists Workable account members (hiring team users). With no filters it returns all members; supply role, job shortcode, email, or exact name to narrow results. Use to resolve a member ID needed by actions like rating or moving a candidate. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Default is 50. |
| `role` | string | no |  | Role. Filter for member of specified role. |
| `shortcode` | string | no |  | Shortcode. Shortcode of specific job. |
| `email` | string | no |  | Member's email. Filter for specific member by email. |
| `name` | string | no |  | Member's name. Filter for members of specified name (Exact Match) |

### `getJob`

**Get Job.** Fetch details of a single Workable job posting identified by its shortcode. Use when you have a job shortcode and need its full attributes. Requires the exact job shortcode; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `shortcode` | string | yes |  | Shortcode. Shortcode of specific job. |

### `getStages`

**Get Stages.** Lists the recruitment pipeline stages for a specific Workable job, identified by its shortcode. Use to discover valid stage slugs before moving a candidate. Requires the exact job shortcode; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `shortcode` | string | yes |  | Shortcode. Shortcode of specific job. |

### `moveCandidate`

**Move Candidate.** Moves a Workable candidate into a target pipeline stage, recording the move on behalf of a given hiring-team member. Use to advance or change a candidate stage in the recruitment pipeline. Requires the candidate ID, the acting member ID, and the target stage slug (resolve valid slugs via Get Stages). Not idempotent — each call posts a stage transition. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Candidate's Id. Id of candidate. |
| `member_id` | string | yes |  | Member's Id. This person's Id is used to move the candidate to the next stage. |
| `target_stage` | string | yes |  | Target stage name. Slug of stage target should be moved to. |

### `rateCandidate`

**Rate candidate.** Adds a rating with a comment to a Workable candidate on behalf of a hiring-team member, using one of the thumbs, stars, or numbers scales. Use to record an evaluation of a candidate. Requires the candidate ID, the acting member ID, a comment, the chosen scale, and a grade valid for that scale (thumbs 0-2, stars 0-4, numbers 0-9). Not idempotent — each call appends a new rating. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Candidate's Id. Id of candidate. |
| `member_id` | string | yes |  | Member's Id. Id of member that is adding the rating. |
| `comment` | string | yes |  | Comment. Comment about the scoring of the candidate. |
| `scale` | string | yes |  | Rating scale. Select scale to rate candidate on. One of `"thumbs"`, `"stars"`, `"numbers"`. |
| `grade` | number | yes |  | Grade. Thumbs scale: 0-2, Stars scale: 0-4, Numbers scale: 0-9. |

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
