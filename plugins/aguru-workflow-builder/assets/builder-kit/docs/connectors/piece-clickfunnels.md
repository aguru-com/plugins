# ClickFunnels

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-clickfunnels'
  version: '0.2.0'
```

Categories: COMMUNICATION, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your ClickFunnels subdomain and API key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subdomain` | string | yes |  | Subdomain. Your ClickFunnels subdomain (e.g., if your URL is https://mycompany.myclickfunnels.com, enter "mycompany"). |
| `apiKey` | string | yes |  | API Key. Your ClickFunnels API key. You can find this in your ClickFunnels account settings. |

## Actions

### `createOpportunity`

**Create Opportunity.** Creates a sales opportunity in a ClickFunnels CRM pipeline, attached to a primary contact and placed in a specific pipeline stage. Use to register a new deal/lead in the sales pipeline. Requires a workspace, pipeline stage, and contact; optional value and close date. Not idempotent — each call creates a separate opportunity. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Opportunity Name. The name or title of the opportunity. |
| `teamId` | string | yes |  | Team. Select the team. A value the product loads from the provider, such as an id; write the value itself. |
| `workspaceId` | string | yes |  | Workspace. Select the workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineId` | string | yes |  | Pipeline. Select a pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineStageId` | string | yes |  | Pipeline Stage. Select a pipeline stage. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `assigneeId` | string | no |  | Assignee. Select an assignee on your team. A value the product loads from the provider, such as an id; write the value itself. |
| `value` | number | no |  | Value. The potential value of this opportunity in the default currency of the workspace. |
| `closedAt` | ISO date-time string | no |  | Close Date. The expected close date for the opportunity. |

### `applyTagToContact`

**Apply Tag to Contact.** Applies a tag to a ClickFunnels contact for segmentation or automation. Use to label or categorize a contact. Requires the workspace, contact, and tag. Effectively idempotent — re-applying a tag the contact already has does not add a duplicate. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. Select the team. A value the product loads from the provider, such as an id; write the value itself. |
| `workspaceId` | string | yes |  | Workspace. Select the workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `tagId` | string | yes |  | Tag. Select a tag to apply. A value the product loads from the provider, such as an id; write the value itself. |

### `removeTagFromContact`

**Remove Tag From Contact.** Removes a previously applied tag from a ClickFunnels contact, identified by the applied-tag record on that contact. Use to unlabel or reverse a tag-based segmentation. Idempotent — once the tag is gone, repeating leaves the contact in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. Select the team. A value the product loads from the provider, such as an id; write the value itself. |
| `workspaceId` | string | yes |  | Workspace. Select the workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `tagId` | string | yes |  | Tag. Select a tag. A value the product loads from the provider, such as an id; write the value itself. |

### `enrollAContactIntoACourse`

**Enroll a Contact Into a Course.** Enrolls a ClickFunnels contact into a specific course, granting them access to its content. Use to give a contact course access programmatically. Requires the workspace, course, and contact. Not idempotent — each call creates a new enrollment record. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. Select the team. A value the product loads from the provider, such as an id; write the value itself. |
| `workspaceId` | string | yes |  | Workspace. Select the workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `courseId` | string | yes |  | Course. Select a course. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |

### `updateOrCreateContact`

**Update or Create Contact.** Upserts a ClickFunnels contact keyed on email address: updates the matching contact if one exists, otherwise creates it. Use to add or sync a contact (name, phone, tags, custom attributes) without first checking for a duplicate. Idempotent — repeating with the same email and fields converges to the same contact rather than creating duplicates. Custom-attribute keys that collide with default contact fields will error. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. Select the team. A value the product loads from the provider, such as an id; write the value itself. |
| `workspaceId` | string | yes |  | Workspace. Select the workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `emailAddress` | string | yes |  | Email. The contact's email address. This is used to find and (update/create) the contact. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `phoneNumber` | string | no |  | Phone Number. |
| `tagIds` | array | no |  | Tag. Select tags to apply. Values the product loads from the provider, such as ids; write an array of them. |
| `customAttributes` | object | no |  | Custom Attributes. A key-value object for custom contact data. Keys that are default properties on the Contact resource or variations of it will result in an error. E.g., first_name, First Name, etc. are not valid inputs. |

### `searchContacts`

**Search Contacts.** Looks up contacts within a ClickFunnels workspace by a single search term, which is auto-detected as an email address (filters on email) when it contains "@", or otherwise as a contact ID. Use to resolve a contact record or its ID before another action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. Select the team. A value the product loads from the provider, such as an id; write the value itself. |
| `workspaceId` | string | yes |  | Workspace. Select the workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `searchTerm` | string | yes |  | Search Query. Filter contacts by either email or id. |

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
