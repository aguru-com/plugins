# LeadConnector

Lead Connector - Go High Level

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-lead-connector'
  version: '0.4.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> 1. Go to the [Marketplace](https://marketplace.gohighlevel.com/) and sign up for a developer account.
> 2. Navigate to **My Apps** and click on **Create App**.
> 3. Enter an app name, then select **Private** as App Type and **Sub-Account** as Distribution Type. Click **Create App**.
> 4. Add the following scopes:
> - campaigns.readonly
> - contacts.write
> - contacts.readonly
> - locations.readonly
> - locations/tags.readonly
> - locations/tags.write
> - opportunities.readonly
> - opportunities.write
> - users.readonly
> - workflows.readonly
> - forms.readonly
> 5. Add the **Redirect URL** shown in this dialog.
> 6. Create a new client key, then copy the **Client ID** and **Client Secret** into this dialog.

## Actions

### `create_contact`

**Create Contact.** Creates a new contact in the GoHighLevel/LeadConnector location with optional name, email, phone, company, address, tags, and source. Use to add a lead or person to the CRM. Not idempotent — each call creates a separate contact, so de-duplicate beforehand if needed. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. Country code and digits only, no spaces. |
| `companyName` | string | no |  | Company Name. |
| `website` | string | no |  | Website. |
| `address` | string | no |  | Street Address. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State. |
| `postalCode` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. In a dynamic value, use the two-letter code, e.g. US. A value the product loads from the provider, such as an id; write the value itself. |
| `timezone` | string | no |  | Time Zone. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. Values the product loads from the provider, such as ids; write an array of them. |
| `source` | string | no |  | Source. Where the lead came from. |

### `update_contact`

**Update Contact.** Updates an existing GoHighLevel/LeadConnector contact identified by contact ID, overwriting any provided fields (name, email, phone, company, address, tags, source). Use to amend a known contact rather than create one. Idempotent — repeating with the same input leaves the contact in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact ID. Map it from a trigger or a Search Contacts step. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. Country code and digits only, no spaces. |
| `companyName` | string | no |  | Company Name. |
| `website` | string | no |  | Website. |
| `address` | string | no |  | Street Address. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State. |
| `postalCode` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. In a dynamic value, use the two-letter code, e.g. US. A value the product loads from the provider, such as an id; write the value itself. |
| `timezone` | string | no |  | Time Zone. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. Replaces the current tags. Leave empty to keep them. Values the product loads from the provider, such as ids; write an array of them. |
| `source` | string | no |  | Source. Where the lead came from. |

### `add_contact_to_campaign`

**Add Contact to Campaign.** Enrolls an existing GoHighLevel/LeadConnector contact into a marketing campaign by contact ID and campaign ID. Use to start a campaign sequence for a known contact. Not idempotent — each call re-enrolls the contact. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `campaign` | string | yes |  | Campaign. A value the product loads from the provider, such as an id; write the value itself. |

### `add_contact_to_workflow`

**Add Contact to Workflow.** Enrolls an existing GoHighLevel/LeadConnector contact into an automation workflow by contact ID and workflow ID. Use to trigger a workflow sequence for a known contact. Not idempotent — each call re-enrolls the contact. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `workflow` | string | yes |  | Workflow. A value the product loads from the provider, such as an id; write the value itself. |

### `add_note_to_contact`

**Add Note to Contact.** Appends a note (free-text body attributed to a user) to an existing GoHighLevel/LeadConnector contact. Requires the contact ID and the authoring user ID. Not idempotent — each call appends a new note even if the text is identical. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `note` | string | yes |  | Note. |
| `user` | string | yes |  | Author. The team member the note is credited to. A value the product loads from the provider, such as an id; write the value itself. |

### `search_contacts`

**Search Contacts.** Searches contacts in the GoHighLevel/LeadConnector location matching a free-text query (name, email, phone, etc.), returning up to 100 results. Use to look up an existing contact or its ID before another action. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Matched against name, email, phone and more. Up to 100 results. |

### `create_opportunity`

**Create Opportunity.** Creates a new sales opportunity in a GoHighLevel/LeadConnector pipeline, tied to a contact and placed in a chosen pipeline stage with a status (open/won/lost/abandoned). Use to start tracking a deal. Requires pipeline, stage, title, contact, and status; not idempotent — each call creates a separate opportunity. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipeline` | string | yes |  | Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `stage` | string | yes |  | Stage. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Opportunity Name. |
| `contact` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `monetaryValue` | number | no |  | Value. In your account's currency. |
| `assignedTo` | string | no |  | Assigned To. Leave empty to keep it unassigned. A value the product loads from the provider, such as an id; write the value itself. |

### `update_opportunity`

**Update Opportunity.** Updates an existing GoHighLevel/LeadConnector opportunity identified by pipeline and opportunity ID, changing stage, status, title, contact, assignee, or monetary value. Omitted stage/title/status are backfilled from the current opportunity. Use to advance or edit a known deal; idempotent — repeating with the same input leaves the opportunity in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipeline` | string | yes |  | Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `opportunity` | string | yes |  | Opportunity. A value the product loads from the provider, such as an id; write the value itself. |
| `stage` | string | no |  | Stage. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Opportunity Name. |
| `contact` | string | no |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `monetaryValue` | number | no |  | Value. In your account's currency. |
| `assignedTo` | string | no |  | Assigned To. A value the product loads from the provider, such as an id; write the value itself. |

### `create_task`

**Create Task.** Creates a task attached to a GoHighLevel/LeadConnector contact, with a title, due date, optional description, assignee, and completed flag. Use to schedule follow-up work against a contact. Requires contact, title, and due date; not idempotent — each call creates a separate task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. |
| `description` | string | no |  | Description. |
| `dueDate` | ISO date-time string | yes |  | Due Date. |
| `assignedTo` | string | no |  | Assigned To. A value the product loads from the provider, such as an id; write the value itself. |
| `completed` | boolean | no | `false` | Completed. |

### `update_task`

**Update Task.** Updates an existing task on a GoHighLevel/LeadConnector contact, identified by contact ID and task ID, changing title, due date, description, assignee, or completed flag. Use to edit or complete a known task. Idempotent — repeating with the same input leaves the task in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `task` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. |
| `description` | string | no |  | Description. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `assignedTo` | string | no |  | Assigned To. A value the product loads from the provider, such as an id; write the value itself. |
| `completed` | boolean | no | `false` | Completed. Always applied: unticked marks a done task as open. |

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
