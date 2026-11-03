# Clockodo

Time tracking made easy

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-clockodo'
  version: '0.2.8'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | E-Mail. The email of your clockodo user. |
| `token` | string | yes |  | API-Token. Your api token (can be found in profile settings) |
| `company_name` | string | yes |  | Company Name. Your company name or app name. |
| `company_email` | string | yes |  | Company E-Mail. A contact email for your company or app. |

## Actions

### `create_entry`

**Create Entry.** Logs a new time-record entry in clockodo for a customer and service over a start/end time window, optionally tagged to a project, user, hourly rate, and description. Use to record tracked work after the fact; requires customer_id, service_id, and both start and end times. Not idempotent: each call creates a separate entry, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer. The ID of the customer. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | no |  | Project. The ID of the project. A value the product loads from the provider, such as an id; write the value itself. |
| `service_id` | string | yes |  | Service. The ID of the service. A value the product loads from the provider, such as an id; write the value itself. |
| `time_since` | ISO date-time string | yes |  | Start Time. |
| `time_until` | ISO date-time string | yes |  | End Time. |
| `text` | string | no |  | Description. |
| `hourly_rate` | number | no |  | Hourly Rate. |
| `user_id` | string | no |  | User. The ID of the user. A value the product loads from the provider, such as an id; write the value itself. |

### `get_entry`

**Get Entry.** Fetches one clockodo time-record entry by its numeric entry_id and returns that entry. Use to read the current details of a known entry before updating or deleting it; to find entries by date range or customer instead, use Get Entries. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entry_id` | number | yes |  | Entry ID. |

### `list_entries`

**Get Entries.** Fetches clockodo time-record entries within a required start/end date range, optionally narrowed by user, customer, project, service, and billable/billed status. Use to find or report on entries by time period; supports two modes: leave page empty to retrieve all matching entries across pages, or set a page number to read just that single page. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `time_since` | ISO date-time string | yes |  | Start Date. |
| `time_until` | ISO date-time string | yes |  | End Date. |
| `user_id_filter` | number | no |  | Customer ID Filter. Filter entries by their user. |
| `customer_id_filter` | number | no |  | Customer ID Filter. Filter entries by their customer. |
| `project_id_filter` | number | no |  | Project ID Filter. Filter entries by their project. |
| `service_id_filter` | number | no |  | Service ID Filter. Filter entries by their service. |
| `billable_filter` | boolean | no |  | Billable. Only show entries that are billable. |
| `billed_filter` | boolean | no |  | Billed. Only show entries that are already billed. |
| `enhanced_list` | boolean | no |  | Enhanced List. Retrieves additional information about the entries. |
| `page` | number | no |  | Page. Reads only the specified page. |

### `update_entry`

**Update Entry.** Modifies an existing clockodo time-record entry identified by entry_id, changing any of its customer, project, service, user, time window, or description. Use to correct or amend an already-logged entry rather than creating a new one (use Create Entry for new records). Idempotent: applying the same field values to the same entry_id converges to the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entry_id` | number | yes |  | Entry ID. |
| `customer_id` | string | no |  | Customer. The ID of the customer. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | no |  | Project. The ID of the project. A value the product loads from the provider, such as an id; write the value itself. |
| `service_id` | string | no |  | Service. The ID of the service. A value the product loads from the provider, such as an id; write the value itself. |
| `time_since` | ISO date-time string | no |  | Start Time. |
| `time_until` | ISO date-time string | no |  | End Time. |
| `text` | string | no |  | Description. |
| `user_id` | string | no |  | User. The ID of the user. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_entry`

**Delete Entry.** Permanently deletes a clockodo time-record entry identified by its numeric entry_id. Use to remove a logged entry; locate the entry_id first via Get Entries if unknown. Idempotent: the entry reaches the same deleted end state on repeated calls. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entry_id` | number | yes |  | Entry ID. |

### `create_customer`

**Create Customer.** Create a new clockodo customer with a name and optional number, active flag, billable default, note, and color. Not idempotent: each call adds another customer even with identical input, so guard against duplicates. To edit an existing customer use Update Customer. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `number` | string | no |  | Number. |
| `active` | boolean | no |  | Active. |
| `billable` | boolean | no |  | Billable. |
| `note` | string | no |  | Note. |
| `color` | string | no |  | Color. One of `15634787`, `15783768`, `10347338`, `3794634`, `5687033`, `3561463`, `8080359`, `13657574`, `16544209`. |

### `get_customer`

**Get Customer.** Looks up one clockodo customer by its numeric customer_id and returns that customer record. Use to confirm a customer exists or read its current details before creating an entry or updating it; requires a known customer_id. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer. The ID of the customer. A value the product loads from the provider, such as an id; write the value itself. |

### `update_customer`

**Update Customer.** Update an existing clockodo customer identified by their numeric customer ID, changing only the fields you supply (name, number, active flag, billable default, note, color). Idempotent: re-sending the same values leaves the customer unchanged. Requires a customer ID; use Create Customer to add a new one. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer. The ID of the customer. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `number` | string | no |  | Number. |
| `active` | boolean | no |  | Active. |
| `billable` | boolean | no |  | Billable. |
| `note` | string | no |  | Note. |
| `color` | string | no |  | Color. One of `15634787`, `15783768`, `10347338`, `3794634`, `5687033`, `3561463`, `8080359`, `13657574`, `16544209`. |

### `list_customers`

**Get Customers.** List clockodo customers, optionally filtered by active status. Read-only and repeatable. Use to discover customers or resolve a customer ID by name before another call; supply a page number to read one page at a time, or omit it to retrieve all matching customers. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `active_filter` | boolean | no | `true` | Active Filter. Filter customers by their active status. |
| `page` | number | no |  | Page. Reads only the specified page. |

### `delete_customer`

**Delete Customer.** Permanently deletes a clockodo customer identified by its numeric customer_id. Use when removing a client record entirely; deletion may fail if the customer still has linked projects or time entries. Idempotent: the customer reaches the same deleted end state on repeated calls (later calls fail because it no longer exists). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer. The ID of the customer. A value the product loads from the provider, such as an id; write the value itself. |

### `create_project`

**Create Project.** Create a new clockodo project under a customer, with optional number, budget, billing defaults, and note. Not idempotent: each call adds another project even with identical input, so guard against duplicates. To change an existing project use Update Project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `customer_id` | string | yes |  | Customer. The ID of the customer. A value the product loads from the provider, such as an id; write the value itself. |
| `number` | string | no |  | Number. |
| `active` | boolean | no |  | Active. |
| `billable` | boolean | no |  | Billable. |
| `budget` | number | no |  | Budget. |
| `budget_is_hours` | boolean | no |  | Budget in hours?. |
| `budget_is_not_strict` | boolean | no |  | Soft Budget. |
| `note` | string | no |  | Note. |

### `get_project`

**Get Project.** Fetch one clockodo project by its numeric project ID. Read-only and repeatable. Use when you already have the project ID and need its current fields (name, customer, budget, active/completed state); to find a project by name or list many, use Get Projects instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. The ID of the project. A value the product loads from the provider, such as an id; write the value itself. |

### `list_projects`

**Get Projects.** List clockodo projects, optionally filtered by customer ID and active status. Read-only and repeatable. Use to discover projects or resolve a project ID by name before another call; supply a page number to read one page at a time, or omit it to retrieve all matching projects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id_filter` | number | no |  | Customer ID Filter. Filter projects by their customer. |
| `active_filter` | boolean | no | `true` | Active Filter. Filter customers by their active status. |
| `page` | number | no |  | Page. Reads only the specified page. |

### `update_project`

**Update Project.** Update an existing clockodo project identified by its numeric project ID, changing only the fields you supply (name, customer, budget, billing, completed/billed status, note). Idempotent: re-sending the same values leaves the project unchanged. Requires a project ID; use Create Project to add a new one. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. The ID of the project. A value the product loads from the provider, such as an id; write the value itself. |
| `customer_id` | string | no |  | Customer. The ID of the customer. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `number` | string | no |  | Number. |
| `active` | boolean | no |  | Active. |
| `billable` | boolean | no |  | Billable. |
| `budget` | number | no |  | Budget. |
| `budget_is_hours` | boolean | no |  | Budget in hours?. |
| `budget_is_not_strict` | boolean | no |  | Soft Budget. |
| `note` | string | no |  | Note. |
| `completed` | boolean | no |  | Completed. |
| `billed_amount` | number | no |  | Billed Amount. |
| `billing_complete` | boolean | no |  | Billing Complete. |

### `delete_project`

**Delete Project.** Permanently delete a clockodo project by its numeric project ID. Destructive and not safely repeatable: a second call for the same ID fails because the project no longer exists. Confirm the correct ID before calling. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. The ID of the project. A value the product loads from the provider, such as an id; write the value itself. |

### `create_service`

**Create Service.** Create a new clockodo service (a billable activity type) with a name and optional number, active flag, and note. Not idempotent: each call adds another service even with identical input, so guard against duplicates. To edit an existing service use Update Service. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `number` | string | no |  | Number. |
| `active` | boolean | no |  | Active. |
| `note` | string | no |  | Note. |

### `get_service`

**Get Service.** Fetch one clockodo service (a billable activity type) by its numeric service ID. Read-only and repeatable. Use when you already hold the service ID; to browse or resolve a service by name use Get Services instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `service_id` | string | yes |  | Service. The ID of the service. A value the product loads from the provider, such as an id; write the value itself. |

### `update_service`

**Update Service.** Update an existing clockodo service identified by its numeric service ID, changing only the fields you supply (name, number, active flag, note). Idempotent: re-sending the same values leaves the service unchanged. Requires a service ID; use Create Service to add a new one. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `service_id` | string | yes |  | Service. The ID of the service. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `number` | string | no |  | Number. |
| `active` | boolean | no |  | Active. |
| `note` | string | no |  | Note. |

### `list_services`

**Get Services.** List all clockodo services (billable activity types). Read-only, repeatable, and takes no filters. Use to discover available services or resolve a service ID by name before another call. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `delete_service`

**Delete Service.** Permanently delete a clockodo service by its numeric service ID. Destructive and not safely repeatable: a second call for the same ID fails because the service is already gone. Confirm the correct ID before calling. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `service_id` | string | yes |  | Service. The ID of the service. A value the product loads from the provider, such as an id; write the value itself. |

### `get_team`

**Get Team.** Fetch one clockodo team by its numeric team ID. Read-only and repeatable. Use when you already have the team ID; to browse teams or resolve a team ID by name use Get Teams instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team. The ID of the team. A value the product loads from the provider, such as an id; write the value itself. |

### `list_teams`

**Get Teams.** List all clockodo teams. Read-only, repeatable, and takes no filters. Use to discover teams or resolve a team ID by name before assigning a user or another call. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `get_user`

**Get User.** Fetch one clockodo user by their numeric user ID. Read-only and repeatable. Use when you already hold the user ID; to find a user by name or email or list many use Get Users instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User. The ID of the user. A value the product loads from the provider, such as an id; write the value itself. |

### `list_users`

**Get Users.** List all clockodo users. Read-only, repeatable, and takes no filters. Use to discover users or resolve a user ID by name or email before another call. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `create_user`

**Create User.** Create a new clockodo user with required name, email, and role, plus optional team, language, wage type, and permissions. Not idempotent: each call adds another user even with the same email, so guard against duplicates. To change an existing user use Update User. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `email` | string | yes |  | E-Mail. |
| `role` | string | yes |  | Role. |
| `number` | string | no |  | Number. |
| `team_id` | string | no |  | Team. The ID of the team. A value the product loads from the provider, such as an id; write the value itself. |
| `language` | string | no |  | Language. One of `"de"`, `"en"`, `"fr"`. |
| `wage_type` | string | no |  | Wage Type. One of `1`, `2`. |
| `can_generally_see_absences` | boolean | no |  | Can see absences. |
| `can_generally_manage_absences` | boolean | no |  | Can manage absences. |
| `can_add_customers` | boolean | no |  | Can add customers. |

### `update_user`

**Update User.** Update an existing clockodo user identified by their numeric user ID, changing only the fields you supply (name, email, role, team, language, wage type, absence/customer permissions, active flag). Idempotent: re-sending the same values leaves the user unchanged. Requires a user ID; use Create User to add a new one. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User. The ID of the user. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `email` | string | no |  | E-Mail. |
| `role` | string | no |  | Role. |
| `number` | string | no |  | Number. |
| `active` | boolean | no |  | Active. |
| `team_id` | string | no |  | Team. The ID of the team. A value the product loads from the provider, such as an id; write the value itself. |
| `language` | string | no |  | Language. One of `"de"`, `"en"`, `"fr"`. |
| `wage_type` | string | no |  | Wage Type. One of `1`, `2`. |
| `can_generally_see_absences` | boolean | no |  | Can see absences. |
| `can_generally_manage_absences` | boolean | no |  | Can manage absences. |
| `can_add_customers` | boolean | no |  | Can add customers. |

### `delete_user`

**Delete User.** Permanently delete a clockodo user by their numeric user ID. Destructive and not safely repeatable: a second call for the same ID fails because the user no longer exists. Confirm the correct ID before calling. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User. The ID of the user. A value the product loads from the provider, such as an id; write the value itself. |

### `create_absence`

**Create Absence.** Creates a new clockodo absence (e.g. vacation, sick leave) for a user over a start/end date range, with an absence type and optional approved/half-day/sick-note flags. Use to request or record time off; requires a date range and absence type, and defaults to the requested status unless approved is set. Not idempotent: each call creates a separate absence record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `date_since` | ISO date-time string | yes |  | Start Date. |
| `date_until` | ISO date-time string | yes |  | End Date. |
| `type` | string | yes |  | Type. One of `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`. |
| `user_id` | string | no |  | User. The ID of the user. A value the product loads from the provider, such as an id; write the value itself. |
| `half_days` | boolean | no |  | Half Days. |
| `approved` | boolean | no |  | Approved. |
| `note` | string | no |  | Note. |
| `sick_note` | boolean | no |  | Sick Note. |

### `get_absence`

**Get Absence.** Fetches one clockodo absence record by its numeric absence_id and returns that absence. Use to read the current details or status of a known absence before updating or deleting it; to find absences for a year instead, use Get Absences. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `absence_id` | number | yes |  | Absence ID. |

### `update_absence`

**Update Absence.** Modifies an existing clockodo absence identified by absence_id, changing its date range, type, status (e.g. approve or decline a request), half-day flag, note, or sick-note flag. Use to amend or approve an absence rather than creating a new one (use Create Absence for new records). Idempotent: applying the same field values to the same absence_id converges to the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `absence_id` | number | yes |  | Absence ID. |
| `date_since` | ISO date-time string | no |  | Start Date. |
| `date_until` | ISO date-time string | no |  | End Date. |
| `type` | string | no |  | Type. One of `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`. |
| `status` | string | no |  | Status. One of `0`, `1`, `2`, `3`, `4`. |
| `half_days` | boolean | no |  | Half Days. |
| `note` | string | no |  | Note. |
| `sick_note` | boolean | no |  | Sick Note. |

### `list_absences`

**Get Absences.** Fetches clockodo absence records for a required calendar year, optionally filtered to a single user. Use to list or report on time off within a year; to read one absence by id instead, use Get Absence. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `year` | number | yes |  | Year. |
| `user_id` | string | no |  | User. The ID of the user. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_absence`

**Delete Absence.** Permanently deletes a clockodo absence identified by its numeric absence_id. Use to remove an absence record (e.g. a cancelled leave request); locate the absence_id first via Get Absences if unknown. Idempotent: the absence reaches the same deleted end state on repeated calls. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `absence_id` | number | yes |  | Absence ID. |

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
