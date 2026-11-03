# Beebole

Time tracking and project management. Create companies, projects, people, and log time entries.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-beebole'
  version: '0.2.2'
```

Categories: PRODUCTIVITY, HUMAN_RESOURCES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> To get your Beebole API token:
>
> 1. Log in to your Beebole account at https://beebole-apps.com
> 2. Go to **Customize → API Token**
> 3. Generate a new API token
> 4. Copy the token and paste it below
>
> Need help? See https://beebole.com/help/api

## Actions

### `create_person`

**Create Person.** Creates a person (employee, project lead, or admin) under a given company in Beebole, optionally emailing them a login invitation when an email is provided. Use to onboard a new team member or contact. Not idempotent: each call creates a new person record and may re-send an invite, with no de-duplication on name or email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company` | string | yes |  | Company. The company this person belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Full Name. The full name of the person (e.g. "Jane Doe"). |
| `email` | string | no |  | Email. Email address. Required if you want to invite the person to log in to Beebole. |
| `invite` | boolean | no | `false` | Send Invitation Email. Send an invitation email so the person can log in to Beebole. Requires an email address. |
| `userGroup` | string | no | `"employee"` | User Group. The permission level for this person. "Employee" can log time; "Project Lead" can also manage projects; "Admin" has full access. One of `"employee"`, `"project_lead"`, `"admin"`. |

### `create_company`

**Create Company.** Creates a company in Beebole, either an external customer or, when marked internal/corporate, your own organization. Use as the top-level container before creating projects under it. Not idempotent: each call creates a new company even if one with the same name already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Company Name. The name of the company (customer) to create. |
| `corporate` | boolean | no | `false` | Internal Company. Enable if this company represents your own organization (internal/corporate) rather than a customer. |

### `create_project`

**Create Project.** Creates a project owned by an existing company in Beebole, with an optional start date and description. Use after the company exists and before adding subprojects or logging time. Not idempotent: each call creates a new project even with identical details. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company` | string | yes |  | Company. The company (customer) that owns this project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Project Name. The name of the new project (e.g. "Website Redesign"). |
| `startDate` | string | no |  | Start Date. The project start date in YYYY-MM-DD format (e.g. "2026-01-15"). Leave empty for no start date. |
| `description` | string | no |  | Description. Optional description of the project. |

### `create_subproject`

**Create Subproject.** Creates a subproject inside an existing project (under its company) in Beebole. Use to break a project into work streams that time can be logged against. Not idempotent: each call creates a new subproject even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company` | string | yes |  | Company. The company that owns the parent project. A value the product loads from the provider, such as an id; write the value itself. |
| `project` | string | yes |  | Project. The project that will contain this subproject. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Subproject Name. The name of the new subproject (e.g. "Prototype", "Phase 1"). |

### `deactivate_subproject`

**Deactivate Subproject.** Deactivates a subproject in Beebole so it is hidden from new time entries while existing entries are preserved. Use to retire a completed or unused work stream. Effectively idempotent: a subproject already inactive stays inactive, though the call still hits the API each time. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company` | string | yes |  | Company. The company that owns the project. A value the product loads from the provider, such as an id; write the value itself. |
| `project` | string | yes |  | Project. The project containing the subproject to deactivate. A value the product loads from the provider, such as an id; write the value itself. |
| `subproject` | string | yes |  | Subproject. The subproject to deactivate. A value the product loads from the provider, such as an id; write the value itself. |

### `create_multiple_time_entries`

**Create Multiple Time Entries.** Logs the same number of hours on each of several dates in Beebole, in one of two modes: working time against a chosen subproject, or an absence of a chosen type (e.g. vacation, sick leave). Use to bulk-log time across a date range; per-date failures are collected rather than aborting unless continue-on-error is disabled. Not idempotent: each call appends new time entries, so repeating it duplicates them. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entryType` | string | yes | `"working_time"` | Entry Type. Choose whether you are logging working time on a subproject or an absence (e.g. vacation, sick leave). One of `"working_time"`, `"absence"`. |
| `absence` | string | no |  | Absence Type. The absence type (e.g. Vacation, Sick Leave) to log on the selected dates. A value the product loads from the provider, such as an id; write the value itself. |
| `company` | string | no |  | Company. The company that owns the project. A value the product loads from the provider, such as an id; write the value itself. |
| `project` | string | no |  | Project. The project containing the subproject. A value the product loads from the provider, such as an id; write the value itself. |
| `subproject` | string | no |  | Subproject. The subproject to log working time against. A value the product loads from the provider, such as an id; write the value itself. |
| `dates` | array | yes |  | Dates. The dates to create time entries for, each in YYYY-MM-DD format (e.g. "2026-05-21"). |
| `hours` | number | yes | `8` | Hours per Day. The number of hours to log for each date (e.g. 8 for a full working day). |
| `comment` | string | no |  | Comment. Optional comment applied to every created time entry. |
| `continueOnError` | boolean | no | `true` | Continue on Error. If enabled, a failure on one date will not stop creation for the remaining dates. |

### `delete_multiple_time_entries`

**Delete Multiple Time Entries.** Deletes a batch of time entries in Beebole, each identified by its numeric time-entry ID plus the date it was logged on. Use to remove previously created entries; per-entry failures are collected rather than aborting unless continue-on-error is disabled. Idempotent in effect: once an entry is deleted, re-running with the same IDs has no further effect (already-removed entries simply fail). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entries` | array | yes |  | Time Entries to Delete. List of time entries to delete. Each row requires the time entry ID and the date it was logged on (YYYY-MM-DD). Each item: { `id`, `date` }. |
| `continueOnError` | boolean | no | `true` | Continue on Error. If enabled, a failure on one entry will not stop deletion for the remaining entries. |

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
