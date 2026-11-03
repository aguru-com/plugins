# Zendesk

Customer service software and support ticket system

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-zendesk'
  version: '0.5.1'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: API Token

> **Organization**: The organization name can be found in the URL (e.g https://ORGANIZATION_NAME.zendesk.com).
>
> **Agent Email**: The email you use to log in to Zendesk.
>
> **API Token**: You can find this in the Zendesk Admin Panel under Settings > APIs > Zendesk API.
>
> Zendesk is retiring API tokens — see [Zendesk's migration timeline](https://developer.zendesk.com/documentation/authentication/oauth-migration/#migration-timeline). Consider using the OAuth2 connection type instead.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Agent Email. The email address you use to login to Zendesk. |
| `token` | string | yes |  | Token. The API token you can generate in Zendesk. |
| `subdomain` | string | yes |  | Organization (e.g activepieceshelp). The subdomain of your Zendesk instance. |

### `OAUTH2`: Connection

> To connect with OAuth2, create an OAuth client in your Zendesk account:
>
> 1. Go to **Admin Center > Apps and integrations > APIs > OAuth clients**.
> 2. Click **Add OAuth client**, give it a name, and set **Client kind** to **Confidential**.
> 3. Set **Redirect URL** to the redirect URL shown below.
> 4. Save, then copy the generated **Client ID** and **Secret** into the fields below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subdomain` | string | yes |  | Organization (e.g activepieceshelp). The organization name can be found in the URL (e.g https://ORGANIZATION_NAME.zendesk.com). |

## Actions

### `create-ticket`

**Create Ticket.** Creates a new support ticket in Zendesk, requiring either a plain-text or HTML comment body as the opening message. Use to open a new case, log a customer request, or file an issue; the subject defaults to the first comment if omitted. Requester, assignee, collaborator, and follower are passed as emails (resolved to user IDs, creating a new requester user if no match) rather than IDs, and tags, priority, status, and custom fields can be set on creation. Not idempotent: each call creates a distinct ticket. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | no |  | Subject. The subject of the ticket (optional - will use first comment text if not provided) |
| `comment_body` | string | no |  | Comment Body. The comment body (text). Use this for plain text comments. |
| `comment_html_body` | string | no |  | Comment HTML Body. The comment body (HTML). Use this for HTML formatted comments. If provided, this takes precedence over Comment Body. |
| `requester_email` | string | no |  | Requester Email. Email address of the ticket requester. If not provided, the authenticated user will be the requester. |
| `requester_name` | string | no |  | Requester Name. Name of the ticket requester (used when creating a new user). |
| `assignee_email` | string | no |  | Assignee Email. Email address of the agent to assign the ticket to. |
| `priority` | string | no |  | Priority. The priority of the ticket. One of `"low"`, `"normal"`, `"high"`, `"urgent"`. |
| `type` | string | no |  | Type. The type of ticket. One of `"problem"`, `"incident"`, `"question"`, `"task"`. |
| `status` | string | no |  | Status. The status of the ticket. One of `"new"`, `"open"`, `"pending"`, `"hold"`, `"solved"`, `"closed"`. |
| `tags` | array | no |  | Tags. Array of tags to apply to the ticket. |
| `organization_id` | string | yes |  | Organization. Select the organization to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | no |  | Group. Select the group to assign. A value the product loads from the provider, such as an id; write the value itself. |
| `external_id` | string | no |  | External ID. An external ID for the ticket (useful for integrations). |
| `collaborator_emails` | array | no |  | Collaborator Emails. Array of email addresses to add as collaborators. |
| `follower_emails` | array | no |  | Follower Emails. Array of email addresses to add as followers. |
| `due_at` | ISO date-time string | no |  | Due Date. The date and time when the ticket is due. |
| `custom_fields` | object | no |  | Custom Fields. Custom ticket field values. An object whose fields depend on other inputs; the product shows them. |
| `comment_public` | boolean | no |  | Public Comment. Whether the comment is public (visible to the requester). Defaults to true. |
| `brand_id` | string | no |  | Brand. Select the brand to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `forum_topic_id` | number | no |  | Forum Topic ID. The ID of the forum topic associated with the ticket. |
| `problem_id` | string | no |  | Problem Ticket. Select the problem ticket this ticket is an incident of. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.ticket`: Ticket
- `data.ticket.url`: URL (url)
- `data.ticket.id`: ID (number)
- `data.ticket.external_id`: External ID
- `data.ticket.via`: Via
- `data.ticket.via.channel`: Channel
- `data.ticket.via.source`: Source
- `data.ticket.via.source.from`: From
- `data.ticket.via.source.to`: To
- `data.ticket.via.source.rel`: Rel
- `data.ticket.created_at`: Created At (datetime)
- `data.ticket.updated_at`: Updated At (datetime)
- `data.ticket.type`: Type
- `data.ticket.subject`: Subject
- `data.ticket.raw_subject`: Raw Subject (with placeholders)
- `data.ticket.description`: Description
- `data.ticket.priority`: Priority
- `data.ticket.status`: Status
- `data.ticket.recipient`: Recipient
- `data.ticket.requester_id`: Requester ID (number)
- `data.ticket.submitter_id`: Submitter ID (number)
- `data.ticket.assignee_id`: Assignee ID (number)
- `data.ticket.organization_id`: Organization ID (number)
- `data.ticket.group_id`: Group ID (number)
- `data.ticket.collaborator_ids`: Collaborator IDs
- `data.ticket.follower_ids`: Follower IDs
- `data.ticket.email_cc_ids`: Email CC IDs
- `data.ticket.forum_topic_id`: Forum Topic ID
- `data.ticket.problem_id`: Problem ID
- `data.ticket.has_incidents`: Has Incidents (boolean)
- `data.ticket.is_public`: Is Public (boolean)
- `data.ticket.due_at`: Due At (datetime)
- `data.ticket.tags`: Tags
- `data.ticket.custom_fields`: Custom Fields
- `data.ticket.custom_fields[].id`: ID (number)
- `data.ticket.custom_fields[].value`: Value
- `data.ticket.satisfaction_rating`: Satisfaction Rating
- `data.ticket.satisfaction_rating.score`: Score
- `data.ticket.sharing_agreement_ids`: Sharing Agreement IDs
- `data.ticket.custom_status_id`: Custom Status ID (number)
- `data.ticket.followup_ids`: Followup IDs
- `data.ticket.ticket_form_id`: Ticket Form ID (number)
- `data.ticket.brand_id`: Brand ID (number)
- `data.ticket.allow_channelback`: Allow Channelback (boolean)
- `data.ticket.allow_attachments`: Allow Attachments (boolean)
- `data.ticket.from_messaging_channel`: From Messaging Channel (boolean)
- `data.ticket.support_type`: Support Type
- `data.audit`: Audit
- `data.audit.id`: ID (number)
- `data.audit.ticket_id`: Ticket ID (number)
- `data.audit.created_at`: Created At (datetime)
- `data.audit.author_id`: Author ID (number)
- `data.audit.metadata`: Metadata
- `data.audit.metadata.system`: System
- `data.audit.metadata.system.client`: Client
- `data.audit.metadata.system.ip_address`: IP Address
- `data.audit.metadata.system.transaction_id`: Transaction ID
- `data.audit.metadata.system.location`: Location
- `data.audit.metadata.system.latitude`: Latitude (number)
- `data.audit.metadata.system.longitude`: Longitude (number)
- `data.audit.metadata.custom`: Custom
- `data.audit.events`: Events
- `data.audit.events[].id`: ID (number)
- `data.audit.events[].type`: Type
- `data.audit.events[].value`: Value
- `data.audit.events[].field_name`: Field Name
- `data.audit.events[].author_id`: Author ID (number)
- `data.audit.events[].body`: Body
- `data.audit.events[].html_body`: HTML Body
- `data.audit.events[].plain_body`: Plain Body
- `data.audit.events[].public`: Public (boolean)
- `data.audit.events[].attachments`: Attachments
- `data.audit.events[].audit_id`: Audit ID (number)
- `data.audit.via`: Via
- `data.audit.via.channel`: Channel
- `data.audit.via.source`: Source
- `data.audit.via.source.from`: From
- `data.audit.via.source.to`: To
- `data.audit.via.source.rel`: Rel

### `update-ticket`

**Update Ticket.** Updates an existing ticket identified by ticket ID, changing fields such as subject, status, priority, type, assignee, organization, tags, due date, or custom fields. Use to advance or edit a ticket already created. Two effects to note: setting the tags array REPLACES all existing tags (use Add Tag to Ticket to append), and supplying a comment body APPENDS a new comment on each call, so repeated calls with a comment are not idempotent; field-only updates are effectively idempotent. At least one field must be provided. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket. Select the ticket to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `subject` | string | no |  | Subject. Update the subject of the ticket. |
| `comment_body` | string | no |  | Comment Body. Add a comment to the ticket (plain text) |
| `comment_html_body` | string | no |  | Comment HTML Body. Add a comment to the ticket (HTML). If provided, this takes precedence over Comment Body. |
| `comment_public` | boolean | no |  | Public Comment. Whether the comment is public (visible to the requester). Defaults to true. |
| `assignee_email` | string | no |  | Assignee Email. Email address of the agent to assign the ticket to. |
| `priority` | string | no |  | Priority. Update the priority of the ticket. One of `"low"`, `"normal"`, `"high"`, `"urgent"`. |
| `type` | string | no |  | Type. Update the type of ticket. One of `"problem"`, `"incident"`, `"question"`, `"task"`. |
| `status` | string | no |  | Status. Update the status of the ticket. One of `"new"`, `"open"`, `"pending"`, `"hold"`, `"solved"`, `"closed"`. |
| `tags` | array | no |  | Tags. Replace all tags with this array. Use "Add Tag to Ticket" action to add tags without replacing existing ones. |
| `organization_id` | string | yes |  | Organization. Select the organization to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | no |  | Group. Select the group to assign. A value the product loads from the provider, such as an id; write the value itself. |
| `external_id` | string | no |  | External ID. Update the external ID for the ticket. |
| `due_at` | ISO date-time string | no |  | Due Date. Update the date and time when the ticket is due. |
| `custom_fields` | object | no |  | Custom Fields. Update custom ticket field values. An object whose fields depend on other inputs; the product shows them. |
| `custom_status_id` | number | no |  | Custom Status ID. Set a custom status ID for the ticket. |
| `forum_topic_id` | number | no |  | Forum Topic ID. Update the forum topic associated with the ticket. |
| `collaborator_emails` | array | no |  | Collaborator Emails. Replace collaborators with this array of email addresses. |
| `follower_emails` | array | no |  | Follower Emails. Replace followers with this array of email addresses. |
| `requester_email` | string | no |  | Requester Email. Update the requester of the ticket. |
| `safe_update` | boolean | no |  | Safe Update. Prevent update collisions by checking timestamp. |
| `updated_stamp` | string | no |  | Updated Timestamp. Ticket timestamp from updated_at field for collision prevention. |
| `brand_id` | string | no |  | Brand. Select the brand to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `problem_id` | string | no |  | Problem Ticket. Select the problem ticket this ticket is an incident of. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.ticket`: Ticket
- `data.ticket.url`: URL (url)
- `data.ticket.id`: ID (number)
- `data.ticket.external_id`: External ID
- `data.ticket.via`: Via
- `data.ticket.via.channel`: Channel
- `data.ticket.via.source`: Source
- `data.ticket.via.source.from`: From
- `data.ticket.via.source.to`: To
- `data.ticket.via.source.rel`: Rel
- `data.ticket.created_at`: Created At (datetime)
- `data.ticket.updated_at`: Updated At (datetime)
- `data.ticket.type`: Type
- `data.ticket.subject`: Subject
- `data.ticket.raw_subject`: Raw Subject (with placeholders)
- `data.ticket.description`: Description
- `data.ticket.priority`: Priority
- `data.ticket.status`: Status
- `data.ticket.recipient`: Recipient
- `data.ticket.requester_id`: Requester ID (number)
- `data.ticket.submitter_id`: Submitter ID (number)
- `data.ticket.assignee_id`: Assignee ID (number)
- `data.ticket.organization_id`: Organization ID (number)
- `data.ticket.group_id`: Group ID (number)
- `data.ticket.collaborator_ids`: Collaborator IDs
- `data.ticket.follower_ids`: Follower IDs
- `data.ticket.email_cc_ids`: Email CC IDs
- `data.ticket.forum_topic_id`: Forum Topic ID
- `data.ticket.problem_id`: Problem ID
- `data.ticket.has_incidents`: Has Incidents (boolean)
- `data.ticket.is_public`: Is Public (boolean)
- `data.ticket.due_at`: Due At (datetime)
- `data.ticket.tags`: Tags
- `data.ticket.custom_fields`: Custom Fields
- `data.ticket.custom_fields[].id`: ID (number)
- `data.ticket.custom_fields[].value`: Value
- `data.ticket.satisfaction_rating`: Satisfaction Rating
- `data.ticket.satisfaction_rating.score`: Score
- `data.ticket.sharing_agreement_ids`: Sharing Agreement IDs
- `data.ticket.custom_status_id`: Custom Status ID (number)
- `data.ticket.followup_ids`: Followup IDs
- `data.ticket.ticket_form_id`: Ticket Form ID (number)
- `data.ticket.brand_id`: Brand ID (number)
- `data.ticket.allow_channelback`: Allow Channelback (boolean)
- `data.ticket.allow_attachments`: Allow Attachments (boolean)
- `data.ticket.from_messaging_channel`: From Messaging Channel (boolean)
- `data.ticket.support_type`: Support Type
- `data.audit`: Audit
- `data.audit.id`: ID (number)
- `data.audit.ticket_id`: Ticket ID (number)
- `data.audit.created_at`: Created At (datetime)
- `data.audit.author_id`: Author ID (number)
- `data.audit.metadata`: Metadata
- `data.audit.metadata.system`: System
- `data.audit.metadata.system.client`: Client
- `data.audit.metadata.system.ip_address`: IP Address
- `data.audit.metadata.system.transaction_id`: Transaction ID
- `data.audit.metadata.system.location`: Location
- `data.audit.metadata.system.latitude`: Latitude (number)
- `data.audit.metadata.system.longitude`: Longitude (number)
- `data.audit.metadata.custom`: Custom
- `data.audit.events`: Events
- `data.audit.events[].id`: ID (number)
- `data.audit.events[].type`: Type
- `data.audit.events[].value`: Value
- `data.audit.events[].field_name`: Field Name
- `data.audit.events[].previous_value`: Previous Value
- `data.audit.via`: Via
- `data.audit.via.channel`: Channel
- `data.audit.via.source`: Source
- `data.audit.via.source.from`: From
- `data.audit.via.source.to`: To
- `data.audit.via.source.rel`: Rel

### `add-tag-to-ticket`

**Add Tag to Ticket.** Adds one or more tags to a ticket identified by ticket ID, merging with the ticket's existing tags rather than replacing them (unlike Update Ticket, which overwrites the tag set). Use to label or categorize a ticket without disturbing tags already present. At least one tag is required. Effectively idempotent for tags already present (Zendesk de-duplicates), so re-running with the same tags leaves the set unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket. Select the ticket to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | yes |  | Tags. Tags to add to the ticket (adds to existing tags) |
| `safe_update` | boolean | no |  | Safe Update. Prevent tag loss from concurrent updates. |
| `updated_stamp` | string | no |  | Updated Timestamp. Ticket timestamp from updated_at field for collision prevention. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.tags`: Tags
- `added_tags`: Added Tags

### `remove-tag-from-ticket`

**Remove Tag(s) from Ticket.** Removes one or more tags from a ticket identified by ticket ID. Tags are removed from the existing tag set without disturbing other tags. If a tag does not exist on the ticket, it is silently ignored. Effectively idempotent for tags already absent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket. Select the ticket to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | yes |  | Tags. Tags to remove from the ticket. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.tags`: Tags
- `removed_tags`: Removed Tags

### `attach-file-to-ticket`

**Attach File to Ticket.** Attaches a file to an existing ticket. File must be provided as a file object (from file upload or previous action output). The attachment becomes visible in the ticket timeline and is available to agents and end-users. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket. Select the ticket to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to attach to the ticket. Files are not supported; an action that needs one fails. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.ticket`: Ticket
- `data.ticket.url`: URL (url)
- `data.ticket.id`: ID (number)
- `data.ticket.external_id`: External ID
- `data.ticket.via`: Via
- `data.ticket.via.channel`: Channel
- `data.ticket.via.source`: Source
- `data.ticket.via.source.from`: From
- `data.ticket.via.source.to`: To
- `data.ticket.via.source.rel`: Rel
- `data.ticket.created_at`: Created At (datetime)
- `data.ticket.updated_at`: Updated At (datetime)
- `data.ticket.type`: Type
- `data.ticket.subject`: Subject
- `data.ticket.raw_subject`: Raw Subject (with placeholders)
- `data.ticket.description`: Description
- `data.ticket.priority`: Priority
- `data.ticket.status`: Status
- `data.ticket.recipient`: Recipient
- `data.ticket.requester_id`: Requester ID (number)
- `data.ticket.submitter_id`: Submitter ID (number)
- `data.ticket.assignee_id`: Assignee ID (number)
- `data.ticket.organization_id`: Organization ID (number)
- `data.ticket.group_id`: Group ID (number)
- `data.ticket.collaborator_ids`: Collaborator IDs
- `data.ticket.follower_ids`: Follower IDs
- `data.ticket.email_cc_ids`: Email CC IDs
- `data.ticket.forum_topic_id`: Forum Topic ID
- `data.ticket.problem_id`: Problem ID
- `data.ticket.has_incidents`: Has Incidents (boolean)
- `data.ticket.is_public`: Is Public (boolean)
- `data.ticket.due_at`: Due At (datetime)
- `data.ticket.tags`: Tags
- `data.ticket.custom_fields`: Custom Fields
- `data.ticket.custom_fields[].id`: ID (number)
- `data.ticket.custom_fields[].value`: Value
- `data.ticket.satisfaction_rating`: Satisfaction Rating
- `data.ticket.satisfaction_rating.score`: Score
- `data.ticket.sharing_agreement_ids`: Sharing Agreement IDs
- `data.ticket.custom_status_id`: Custom Status ID (number)
- `data.ticket.followup_ids`: Followup IDs
- `data.ticket.ticket_form_id`: Ticket Form ID (number)
- `data.ticket.brand_id`: Brand ID (number)
- `data.ticket.allow_channelback`: Allow Channelback (boolean)
- `data.ticket.allow_attachments`: Allow Attachments (boolean)
- `data.ticket.from_messaging_channel`: From Messaging Channel (boolean)
- `data.ticket.support_type`: Support Type
- `data.audit`: Audit
- `data.audit.id`: ID (number)
- `data.audit.ticket_id`: Ticket ID (number)
- `data.audit.created_at`: Created At (datetime)
- `data.audit.author_id`: Author ID (number)
- `data.audit.metadata`: Metadata
- `data.audit.metadata.system`: System
- `data.audit.metadata.system.client`: Client
- `data.audit.metadata.system.ip_address`: IP Address
- `data.audit.metadata.system.transaction_id`: Transaction ID
- `data.audit.metadata.system.location`: Location
- `data.audit.metadata.system.latitude`: Latitude (number)
- `data.audit.metadata.system.longitude`: Longitude (number)
- `data.audit.metadata.custom`: Custom
- `data.audit.events`: Events
- `data.audit.events[].id`: ID (number)
- `data.audit.events[].type`: Type
- `data.audit.events[].via`: Via
- `data.audit.events[].via.channel`: Channel
- `data.audit.events[].via.source`: Source
- `data.audit.events[].subject`: Subject
- `data.audit.events[].body`: Body
- `data.audit.events[].recipients`: Recipients
- `data.audit.events[].author_id`: Author ID (number)
- `data.audit.events[].html_body`: HTML Body
- `data.audit.events[].plain_body`: Plain Body
- `data.audit.events[].public`: Public (boolean)
- `data.audit.events[].attachments`: Attachments
- `data.audit.events[].attachments[].url`: URL (url)
- `data.audit.events[].attachments[].id`: ID (number)
- `data.audit.events[].attachments[].file_name`: File Name
- `data.audit.events[].attachments[].content_url`: Content URL (url)
- `data.audit.events[].attachments[].mapped_content_url`: Mapped Content URL (url)
- `data.audit.events[].attachments[].content_type`: Content Type
- `data.audit.events[].attachments[].size`: Size (filesize)
- `data.audit.events[].attachments[].width`: Width
- `data.audit.events[].attachments[].height`: Height
- `data.audit.events[].attachments[].inline`: Inline (boolean)
- `data.audit.events[].attachments[].deleted`: Deleted (boolean)
- `data.audit.events[].attachments[].malware_access_override`: Malware Access Override (boolean)
- `data.audit.events[].attachments[].malware_scan_result`: Malware Scan Result
- `data.audit.events[].attachments[].thumbnails`: Thumbnails
- `data.audit.events[].audit_id`: Audit ID (number)
- `data.audit.via`: Via
- `data.audit.via.channel`: Channel
- `data.audit.via.source`: Source
- `data.audit.via.source.from`: From
- `data.audit.via.source.to`: To
- `data.audit.via.source.rel`: Rel
- `file_name`: File Name
- `upload_token`: Upload Token

### `add-comment-to-ticket`

**Add Comment to Ticket.** Appends a comment to an existing ticket identified by ticket ID, as either plain text or HTML, defaulting to public (visible to the requester) unless marked private. Use to reply on a ticket, post an internal note, or attach files via upload tokens. The author is the authenticated user unless an author email is supplied (resolved to a user ID). Not idempotent: each call adds a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket. Select the ticket to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `comment_body` | string | no |  | Comment Body. The comment text content. |
| `comment_html_body` | string | no |  | Comment HTML Body. HTML formatted comment (takes precedence over text) |
| `public` | boolean | no |  | Public Comment. Make comment visible to requester (default: true) |
| `author_email` | string | no |  | Author Email. Email of comment author (defaults to authenticated user) |
| `uploads` | array | no |  | Attachment Tokens. Upload tokens for file attachments. |
| `via_followup_source_id` | number | no |  | Via Followup Source ID. Original ticket ID if this is from a follow-up. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.ticket`: Ticket
- `data.ticket.url`: URL (url)
- `data.ticket.id`: ID (number)
- `data.ticket.external_id`: External ID
- `data.ticket.via`: Via
- `data.ticket.via.channel`: Channel
- `data.ticket.via.source`: Source
- `data.ticket.via.source.from`: From
- `data.ticket.via.source.to`: To
- `data.ticket.via.source.rel`: Rel
- `data.ticket.created_at`: Created At (datetime)
- `data.ticket.updated_at`: Updated At (datetime)
- `data.ticket.type`: Type
- `data.ticket.subject`: Subject
- `data.ticket.raw_subject`: Raw Subject (with placeholders)
- `data.ticket.description`: Description
- `data.ticket.priority`: Priority
- `data.ticket.status`: Status
- `data.ticket.recipient`: Recipient
- `data.ticket.requester_id`: Requester ID (number)
- `data.ticket.submitter_id`: Submitter ID (number)
- `data.ticket.assignee_id`: Assignee ID (number)
- `data.ticket.organization_id`: Organization ID (number)
- `data.ticket.group_id`: Group ID (number)
- `data.ticket.collaborator_ids`: Collaborator IDs
- `data.ticket.follower_ids`: Follower IDs
- `data.ticket.email_cc_ids`: Email CC IDs
- `data.ticket.forum_topic_id`: Forum Topic ID
- `data.ticket.problem_id`: Problem ID
- `data.ticket.has_incidents`: Has Incidents (boolean)
- `data.ticket.is_public`: Is Public (boolean)
- `data.ticket.due_at`: Due At (datetime)
- `data.ticket.tags`: Tags
- `data.ticket.custom_fields`: Custom Fields
- `data.ticket.custom_fields[].id`: ID (number)
- `data.ticket.custom_fields[].value`: Value
- `data.ticket.satisfaction_rating`: Satisfaction Rating
- `data.ticket.satisfaction_rating.score`: Score
- `data.ticket.sharing_agreement_ids`: Sharing Agreement IDs
- `data.ticket.custom_status_id`: Custom Status ID (number)
- `data.ticket.followup_ids`: Followup IDs
- `data.ticket.ticket_form_id`: Ticket Form ID (number)
- `data.ticket.brand_id`: Brand ID (number)
- `data.ticket.allow_channelback`: Allow Channelback (boolean)
- `data.ticket.allow_attachments`: Allow Attachments (boolean)
- `data.ticket.from_messaging_channel`: From Messaging Channel (boolean)
- `data.ticket.support_type`: Support Type
- `data.audit`: Audit
- `data.audit.id`: ID (number)
- `data.audit.ticket_id`: Ticket ID (number)
- `data.audit.created_at`: Created At (datetime)
- `data.audit.author_id`: Author ID (number)
- `data.audit.metadata`: Metadata
- `data.audit.metadata.system`: System
- `data.audit.metadata.system.client`: Client
- `data.audit.metadata.system.ip_address`: IP Address
- `data.audit.metadata.system.transaction_id`: Transaction ID
- `data.audit.metadata.system.location`: Location
- `data.audit.metadata.system.latitude`: Latitude (number)
- `data.audit.metadata.system.longitude`: Longitude (number)
- `data.audit.metadata.custom`: Custom
- `data.audit.events`: Events
- `data.audit.events[].id`: ID (number)
- `data.audit.events[].type`: Type
- `data.audit.events[].author_id`: Author ID (number)
- `data.audit.events[].body`: Body
- `data.audit.events[].html_body`: HTML Body
- `data.audit.events[].plain_body`: Plain Body
- `data.audit.events[].public`: Public (boolean)
- `data.audit.events[].attachments`: Attachments
- `data.audit.events[].audit_id`: Audit ID (number)
- `data.audit.via`: Via
- `data.audit.via.channel`: Channel
- `data.audit.via.source`: Source
- `data.audit.via.source.from`: From
- `data.audit.via.source.to`: To
- `data.audit.via.source.rel`: Rel
- `comment_details`: Comment Details
- `comment_details.is_public`: Is Public (boolean)
- `comment_details.content_type`: Content Type

### `create-organization`

**Create Organization.** Creates a new organization in Zendesk; the organization name is required and must be unique. Use to onboard a new company or account, optionally setting domain names, tags, group, shared-ticket/comment visibility, and custom organization fields. Not idempotent: each call creates a distinct organization, and a duplicate name will fail validation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Organization Name. Unique name for the organization. |
| `details` | string | no |  | Details. Additional details about the organization. |
| `notes` | string | no |  | Notes. Internal notes about the organization. |
| `external_id` | string | no |  | External ID. External ID for integration purposes. |
| `group_id` | string | no |  | Group. Select the group to assign. A value the product loads from the provider, such as an id; write the value itself. |
| `domain_names` | array | no |  | Domain Names. Domain names associated with the organization. |
| `tags` | array | no |  | Tags. Tags to apply to the organization. |
| `organization_fields` | object | no |  | Organization Fields. Custom organization field values. An object whose fields depend on other inputs; the product shows them. |
| `shared_tickets` | boolean | no |  | Shared Tickets. Allow users to see each other's tickets. |
| `shared_comments` | boolean | no |  | Shared Comments. Allow users to see each other's comments. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.organization`: Organization
- `data.organization.url`: URL (url)
- `data.organization.id`: ID (number)
- `data.organization.name`: Name
- `data.organization.shared_tickets`: Shared Tickets (boolean)
- `data.organization.shared_comments`: Shared Comments (boolean)
- `data.organization.ticket_restriction`: Ticket Restriction
- `data.organization.external_id`: External ID
- `data.organization.created_at`: Created At (datetime)
- `data.organization.updated_at`: Updated At (datetime)
- `data.organization.domain_names`: Domain Names
- `data.organization.details`: Details
- `data.organization.notes`: Notes
- `data.organization.group_id`: Group ID
- `data.organization.tags`: Tags
- `data.organization.organization_fields`: Organization Fields
- `data.organization.children_count`: Children Count (number)

### `update-organization`

**Update Organization.** Updates an existing organization identified by organization ID, changing fields such as name, details, notes, domain names, tags, group, visibility settings, or custom fields. Use to edit an account record already in Zendesk. Note that the domain names and tags arrays REPLACE all existing values rather than appending. At least one field must be provided. Idempotent: re-applying the same field values leaves the organization in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization. Select the organization to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Organization Name. New name for the organization (must be unique) |
| `details` | string | no |  | Details. Additional details about the organization. |
| `notes` | string | no |  | Notes. Internal notes about the organization. |
| `external_id` | string | no |  | External ID. External ID for integration purposes. |
| `group_id` | string | no |  | Group. Select the group to assign. A value the product loads from the provider, such as an id; write the value itself. |
| `domain_names` | array | no |  | Domain Names. Domain names for the organization (replaces all existing) |
| `tags` | array | no |  | Tags. Tags for the organization (replaces all existing) |
| `organization_fields` | object | no |  | Organization Fields. Custom organization field values. An object whose fields depend on other inputs; the product shows them. |
| `shared_tickets` | boolean | no |  | Shared Tickets. Allow users to see each other's tickets. |
| `shared_comments` | boolean | no |  | Shared Comments. Allow users to see each other's comments. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.organization`: Organization
- `data.organization.url`: URL (url)
- `data.organization.id`: ID (number)
- `data.organization.name`: Name
- `data.organization.shared_tickets`: Shared Tickets (boolean)
- `data.organization.shared_comments`: Shared Comments (boolean)
- `data.organization.ticket_restriction`: Ticket Restriction
- `data.organization.external_id`: External ID
- `data.organization.created_at`: Created At (datetime)
- `data.organization.updated_at`: Updated At (datetime)
- `data.organization.domain_names`: Domain Names
- `data.organization.details`: Details
- `data.organization.notes`: Notes
- `data.organization.group_id`: Group ID
- `data.organization.tags`: Tags
- `data.organization.organization_fields`: Organization Fields
- `data.organization.children_count`: Children Count (number)

### `create-user`

**Create User.** Creates a new user (end-user, agent, or admin; defaults to end-user) in the Zendesk instance; only the name is required. Use to add a customer, agent, or admin account, optionally setting email, phone, role, organization (by ID or by new organization name), tags, custom user fields, and additional identities. A verification email is sent unless skipped. Not idempotent: each call creates a distinct user, and a duplicate email fails validation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the user. |
| `email` | string | no |  | Email. The primary email address of the user. |
| `role` | string | no |  | Role. The role of the user. Defaults to "end-user" if not specified. One of `"end-user"`, `"agent"`, `"admin"`. |
| `custom_role_id` | string | no |  | Custom Role. Select the custom role for the agent. A value the product loads from the provider, such as an id; write the value itself. |
| `organization_id` | string | yes |  | Organization. Select the organization to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `organization_name` | string | no |  | Organization Name. Create and associate user with a new organization by name (alternative to Organization ID) |
| `phone` | string | no |  | Phone. The phone number of the user. |
| `alias` | string | no |  | Alias. An alias displayed to end users. |
| `details` | string | no |  | Details. Additional details about the user. |
| `notes` | string | no |  | Notes. Internal notes about the user. |
| `external_id` | string | no |  | External ID. A unique external ID for the user (useful for integrations) |
| `time_zone` | string | no |  | Time Zone. The time zone of the user (e.g., "America/New_York") |
| `locale` | string | no |  | Locale. The locale of the user (e.g., "en-US") |
| `verified` | boolean | no |  | Verified. Whether the user is verified. |
| `active` | boolean | no |  | Active. Whether the user is active. Defaults to true. |
| `shared` | boolean | no |  | Shared. Whether the user is shared from a different Zendesk Support instance. |
| `shared_agent` | boolean | no |  | Shared Agent. Whether the user is a shared agent from a different Zendesk Support instance. |
| `moderator` | boolean | no |  | Moderator. Whether the user has forum moderation capabilities. |
| `suspended` | boolean | no |  | Suspended. Whether the user is suspended. |
| `restricted_agent` | boolean | no |  | Restricted Agent. Whether the agent has restrictions on what tickets they can access. |
| `only_private_comments` | boolean | no |  | Only Private Comments. Whether the user can only create private comments. |
| `report_csv` | boolean | no |  | Report CSV. Whether the user can access CSV reports. |
| `skip_verify_email` | boolean | no |  | Skip Verify Email. Skip sending a verification email to the user. |
| `ticket_restriction` | string | no |  | Ticket Restriction. The ticket restriction for the user. One of `"organization"`, `"groups"`, `"assigned"`, `"requested"`. |
| `signature` | string | no |  | Signature. The user's signature for email responses. |
| `default_group_id` | string | no |  | Group. Select the group to assign. A value the product loads from the provider, such as an id; write the value itself. |
| `agent_brand_ids` | array | no |  | Agent Brand Access. Select the brands that the agent can access (for agents only) Values the product loads from the provider, such as ids; write an array of them. |
| `tags` | array | no |  | Tags. Array of tags to apply to the user. |
| `user_fields` | object | no |  | User Fields. Custom user field values. An object whose fields depend on other inputs; the product shows them. |
| `identities` | JSON | no |  | Identities. Array of identity objects with type and value. Example: [{"type": "email", "value": "test@user.com"}, {"type": "twitter", "value": "username"}]. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.user`: User
- `data.user.id`: ID (number)
- `data.user.url`: URL (url)
- `data.user.name`: Name
- `data.user.email`: Email (email)
- `data.user.created_at`: Created At (datetime)
- `data.user.updated_at`: Updated At (datetime)
- `data.user.time_zone`: Time Zone
- `data.user.iana_time_zone`: Iana Time Zone
- `data.user.phone`: Phone
- `data.user.shared_phone_number`: Shared Phone Number
- `data.user.photo`: Photo
- `data.user.locale_id`: Locale ID (number)
- `data.user.locale`: Locale
- `data.user.organization_id`: Organization ID (number)
- `data.user.role`: Role
- `data.user.verified`: Verified (boolean)
- `data.user.external_id`: External ID
- `data.user.tags`: Tags
- `data.user.alias`: Alias
- `data.user.active`: Active (boolean)
- `data.user.shared`: Shared (boolean)
- `data.user.shared_agent`: Shared Agent (boolean)
- `data.user.last_login_at`: Last Login At (datetime)
- `data.user.two_factor_auth_enabled`: Two Factor Auth Enabled
- `data.user.signature`: Signature
- `data.user.details`: Details
- `data.user.notes`: Notes
- `data.user.role_type`: Role Type (number)
- `data.user.custom_role_id`: Custom Role ID (number)
- `data.user.is_billing_admin`: Is Billing Admin (boolean)
- `data.user.moderator`: Moderator (boolean)
- `data.user.ticket_restriction`: Ticket Restriction
- `data.user.only_private_comments`: Only Private Comments (boolean)
- `data.user.restricted_agent`: Restricted Agent (boolean)
- `data.user.suspended`: Suspended (boolean)
- `data.user.default_group_id`: Default Group ID (number)
- `data.user.report_csv`: Report CSV (boolean)
- `data.user.user_fields`: User Fields
- `data.user.suspension_details`: Suspension Details
- `user_role`: User Role
- `verification_email_sent`: Verification Email Sent (boolean)

### `delete-user`

**Delete User.** Soft-deletes a user identified by user ID from the Zendesk account; deleted users are not recoverable in the UI (use a permanent/GDPR erasure endpoint for full removal). Use to offboard or remove an account. Requires the confirmation checkbox to be set, and the account owner or restricted users cannot be deleted. Idempotent in effect: once removed the user stays removed, though a repeat call on an already-deleted user returns a not-found error. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User. Select the user to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `confirmation` | boolean | yes |  | Confirm Deletion. I understand that deleted users are not recoverable and this action cannot be undone. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.user`: User
- `data.user.id`: ID (number)
- `data.user.url`: URL (url)
- `data.user.name`: Name
- `data.user.email`: Email (email)
- `data.user.created_at`: Created At (datetime)
- `data.user.updated_at`: Updated At (datetime)
- `data.user.time_zone`: Time Zone
- `data.user.iana_time_zone`: Iana Time Zone
- `data.user.phone`: Phone
- `data.user.shared_phone_number`: Shared Phone Number
- `data.user.photo`: Photo
- `data.user.locale_id`: Locale ID (number)
- `data.user.locale`: Locale
- `data.user.organization_id`: Organization ID (number)
- `data.user.role`: Role
- `data.user.verified`: Verified (boolean)
- `data.user.external_id`: External ID
- `data.user.tags`: Tags
- `data.user.alias`: Alias
- `data.user.active`: Active (boolean)
- `data.user.shared`: Shared (boolean)
- `data.user.shared_agent`: Shared Agent (boolean)
- `data.user.last_login_at`: Last Login At (datetime)
- `data.user.two_factor_auth_enabled`: Two Factor Auth Enabled
- `data.user.signature`: Signature
- `data.user.details`: Details
- `data.user.notes`: Notes
- `data.user.role_type`: Role Type (number)
- `data.user.custom_role_id`: Custom Role ID (number)
- `data.user.is_billing_admin`: Is Billing Admin (boolean)
- `data.user.moderator`: Moderator (boolean)
- `data.user.ticket_restriction`: Ticket Restriction
- `data.user.only_private_comments`: Only Private Comments (boolean)
- `data.user.restricted_agent`: Restricted Agent (boolean)
- `data.user.suspended`: Suspended (boolean)
- `data.user.default_group_id`: Default Group ID (number)
- `data.user.report_csv`: Report CSV (boolean)
- `data.user.user_fields`: User Fields
- `data.user.suspension_details`: Suspension Details
- `warning`: Warning
- `note`: Note

### `find-organization`

**Find Organization(s).** Searches Zendesk organizations and returns matching records. A required search-type selector chooses the mode: match by name, domain, external ID, tag, or details, or pass a raw Zendesk search-syntax string via the Custom Query mode for arbitrary filters. Use to look up an organization or its ID before creating/updating tickets or users; results can be sorted by relevance, created, or updated date. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_type` | string | yes |  | Search Type. Choose how to search for organizations. One of `"name"`, `"domain"`, `"external_id"`, `"tag"`, `"details"`, `"custom"`. |
| `name` | string | no |  | Organization Name. The name of the organization to search for. |
| `domain` | string | no |  | Domain. Search organizations by domain name. |
| `external_id` | string | no |  | External ID. Search organizations by external ID. |
| `tag` | string | no |  | Tag. Search organizations containing this tag. |
| `details` | string | no |  | Details. Search in organization details/notes. |
| `custom_query` | string | no |  | Custom Query. Custom search query using Zendesk search syntax (e.g., "type:organization domain:example.com") |
| `sort_by` | string | no |  | Sort By. How to sort the results. One of `"relevance"`, `"created_at"`, `"updated_at"`. |
| `sort_order` | string | no |  | Sort Order. Sort order for results. One of `"desc"`, `"asc"`. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.results`: Results
- `data.results[].url`: URL (url)
- `data.results[].id`: ID (number)
- `data.results[].name`: Name
- `data.results[].shared_tickets`: Shared Tickets (boolean)
- `data.results[].shared_comments`: Shared Comments (boolean)
- `data.results[].ticket_restriction`: Ticket Restriction
- `data.results[].external_id`: External ID
- `data.results[].created_at`: Created At (datetime)
- `data.results[].updated_at`: Updated At (datetime)
- `data.results[].domain_names`: Domain Names
- `data.results[].details`: Details
- `data.results[].notes`: Notes
- `data.results[].group_id`: Group ID
- `data.results[].tags`: Tags
- `data.results[].organization_fields`: Organization Fields
- `data.results[].children_count`: Children Count (number)
- `data.facets`: Facets
- `data.next_page`: Next Page
- `data.previous_page`: Previous Page
- `data.count`: Count (number)
- `organizations`: Organizations
- `organizations[].url`: URL (url)
- `organizations[].id`: ID (number)
- `organizations[].name`: Name
- `organizations[].shared_tickets`: Shared Tickets (boolean)
- `organizations[].shared_comments`: Shared Comments (boolean)
- `organizations[].ticket_restriction`: Ticket Restriction
- `organizations[].external_id`: External ID
- `organizations[].created_at`: Created At (datetime)
- `organizations[].updated_at`: Updated At (datetime)
- `organizations[].domain_names`: Domain Names
- `organizations[].details`: Details
- `organizations[].notes`: Notes
- `organizations[].group_id`: Group ID
- `organizations[].tags`: Tags
- `organizations[].organization_fields`: Organization Fields
- `organizations[].children_count`: Children Count (number)
- `search_criteria`: Search Criteria
- `search_criteria.type`: Type
- `search_criteria.query`: Query
- `search_criteria.sort_by`: Sort By
- `search_criteria.sort_order`: Sort Order
- `total_count`: Total Count (number)
- `found_count`: Found Count (number)
- `has_more`: Has More (boolean)

### `find-tickets`

**Find Ticket(s).** Searches Zendesk tickets and returns matching records. A required search-type selector chooses the mode: match by ticket ID, status, priority, type, tag, requester or assignee email, subject/content text, or pass a raw Zendesk search-syntax string via the Custom Query mode. Optional date-time filters narrow by created/updated/solved/due date with comparison operators. Use to locate tickets or a ticket ID before commenting or updating; results can be sorted. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_type` | string | yes |  | Search Type. Choose how to search for tickets. One of `"id"`, `"status"`, `"priority"`, `"type"`, `"tag"`, `"requester"`, `"assignee"`, `"content"`, `"custom"`. |
| `timeFilter` | array | no |  | Date Time Filter. Each item: { `field`, `operator`, `fieldValue` }. |
| `ticket_id` | string | no |  | Ticket ID. The ID of the ticket to find. |
| `status` | string | no |  | Status. Search tickets by status. One of `"new"`, `"open"`, `"pending"`, `"hold"`, `"solved"`, `"closed"`. |
| `priority` | string | no |  | Priority. Search tickets by priority. One of `"low"`, `"normal"`, `"high"`, `"urgent"`. |
| `ticket_type` | string | no |  | Type. Search tickets by type. One of `"problem"`, `"incident"`, `"question"`, `"task"`. |
| `tag` | string | no |  | Tag. Search tickets containing this tag. |
| `requester_email` | string | no |  | Requester Email. Search tickets by requester email address. |
| `assignee_email` | string | no |  | Assignee Email. Search tickets by assignee email address. |
| `content` | string | no |  | Content. Search in ticket subject and content. |
| `custom_query` | string | no |  | Custom Query. Custom search query using Zendesk search syntax (e.g., "type:ticket status:open priority:high") |
| `sort_by` | string | no |  | Sort By. How to sort the results. One of `"relevance"`, `"created_at"`, `"updated_at"`, `"priority"`, `"status"`, `"ticket_type"`. |
| `sort_order` | string | no |  | Sort Order. Sort order for results. One of `"desc"`, `"asc"`. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.results`: Results
- `data.results[].url`: URL (url)
- `data.results[].id`: ID (number)
- `data.results[].external_id`: External ID
- `data.results[].via`: Via
- `data.results[].via.channel`: Channel
- `data.results[].via.source`: Source
- `data.results[].via.source.from`: From
- `data.results[].via.source.to`: To
- `data.results[].via.source.rel`: Rel
- `data.results[].created_at`: Created At (datetime)
- `data.results[].updated_at`: Updated At (datetime)
- `data.results[].type`: Type
- `data.results[].subject`: Subject
- `data.results[].raw_subject`: Raw Subject (with placeholders)
- `data.results[].description`: Description
- `data.results[].priority`: Priority
- `data.results[].status`: Status
- `data.results[].recipient`: Recipient
- `data.results[].requester_id`: Requester ID (number)
- `data.results[].submitter_id`: Submitter ID (number)
- `data.results[].assignee_id`: Assignee ID (number)
- `data.results[].organization_id`: Organization ID (number)
- `data.results[].group_id`: Group ID (number)
- `data.results[].collaborator_ids`: Collaborator IDs
- `data.results[].follower_ids`: Follower IDs
- `data.results[].email_cc_ids`: Email CC IDs
- `data.results[].forum_topic_id`: Forum Topic ID
- `data.results[].problem_id`: Problem ID
- `data.results[].has_incidents`: Has Incidents (boolean)
- `data.results[].is_public`: Is Public (boolean)
- `data.results[].due_at`: Due At (datetime)
- `data.results[].tags`: Tags
- `data.results[].custom_fields`: Custom Fields
- `data.results[].custom_fields[].id`: ID (number)
- `data.results[].custom_fields[].value`: Value
- `data.results[].satisfaction_rating`: Satisfaction Rating
- `data.results[].satisfaction_rating.score`: Score
- `data.results[].sharing_agreement_ids`: Sharing Agreement IDs
- `data.results[].custom_status_id`: Custom Status ID (number)
- `data.results[].followup_ids`: Followup IDs
- `data.results[].ticket_form_id`: Ticket Form ID (number)
- `data.results[].brand_id`: Brand ID (number)
- `data.results[].allow_channelback`: Allow Channelback (boolean)
- `data.results[].allow_attachments`: Allow Attachments (boolean)
- `data.results[].from_messaging_channel`: From Messaging Channel (boolean)
- `data.results[].support_type`: Support Type
- `data.facets`: Facets
- `data.next_page`: Next Page
- `data.previous_page`: Previous Page
- `data.count`: Count (number)
- `tickets`: Tickets
- `tickets[].url`: URL (url)
- `tickets[].id`: ID (number)
- `tickets[].external_id`: External ID
- `tickets[].via`: Via
- `tickets[].via.channel`: Channel
- `tickets[].via.source`: Source
- `tickets[].via.source.from`: From
- `tickets[].via.source.to`: To
- `tickets[].via.source.rel`: Rel
- `tickets[].created_at`: Created At (datetime)
- `tickets[].updated_at`: Updated At (datetime)
- `tickets[].type`: Type
- `tickets[].subject`: Subject
- `tickets[].raw_subject`: Raw Subject (with placeholders)
- `tickets[].description`: Description
- `tickets[].priority`: Priority
- `tickets[].status`: Status
- `tickets[].recipient`: Recipient
- `tickets[].requester_id`: Requester ID (number)
- `tickets[].submitter_id`: Submitter ID (number)
- `tickets[].assignee_id`: Assignee ID (number)
- `tickets[].organization_id`: Organization ID (number)
- `tickets[].group_id`: Group ID (number)
- `tickets[].collaborator_ids`: Collaborator IDs
- `tickets[].follower_ids`: Follower IDs
- `tickets[].email_cc_ids`: Email CC IDs
- `tickets[].forum_topic_id`: Forum Topic ID
- `tickets[].problem_id`: Problem ID
- `tickets[].has_incidents`: Has Incidents (boolean)
- `tickets[].is_public`: Is Public (boolean)
- `tickets[].due_at`: Due At (datetime)
- `tickets[].tags`: Tags
- `tickets[].custom_fields`: Custom Fields
- `tickets[].custom_fields[].id`: ID (number)
- `tickets[].custom_fields[].value`: Value
- `tickets[].satisfaction_rating`: Satisfaction Rating
- `tickets[].satisfaction_rating.score`: Score
- `tickets[].sharing_agreement_ids`: Sharing Agreement IDs
- `tickets[].custom_status_id`: Custom Status ID (number)
- `tickets[].followup_ids`: Followup IDs
- `tickets[].ticket_form_id`: Ticket Form ID (number)
- `tickets[].brand_id`: Brand ID (number)
- `tickets[].allow_channelback`: Allow Channelback (boolean)
- `tickets[].allow_attachments`: Allow Attachments (boolean)
- `tickets[].from_messaging_channel`: From Messaging Channel (boolean)
- `tickets[].support_type`: Support Type
- `search_criteria`: Search Criteria
- `search_criteria.type`: Type
- `search_criteria.query`: Query
- `search_criteria.sort_by`: Sort By
- `search_criteria.sort_order`: Sort Order
- `total_count`: Total Count (number)
- `found_count`: Found Count (number)
- `has_more`: Has More (boolean)

### `find-user`

**Find User(s).** Searches Zendesk users and returns matching records. A required search-type selector chooses the mode: match by email, name, role, organization, tag, or external ID, or pass a raw Zendesk search-syntax string via the Custom Query mode. Use to look up a user or resolve their ID before assigning tickets or adding comments; no matches returns an empty result set rather than an error. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_type` | string | yes |  | Search Type. Choose how to search for users. One of `"email"`, `"name"`, `"role"`, `"organization"`, `"tag"`, `"external_id"`, `"custom"`. |
| `email` | string | no |  | Email Address. The email address of the user to search for. |
| `name` | string | no |  | Name. The name of the user to search for. |
| `role` | string | no |  | Role. Search users by role. One of `"end-user"`, `"agent"`, `"admin"`. |
| `organization` | string | no |  | Organization. Search users by organization name. |
| `tag` | string | no |  | Tag. Search users containing this tag. |
| `external_id` | string | no |  | External ID. Search users by external ID. |
| `custom_query` | string | no |  | Custom Query. Custom search query using Zendesk search syntax (e.g., "type:user role:agent") |
| `sort_by` | string | no |  | Sort By. How to sort the results. One of `"relevance"`, `"created_at"`, `"updated_at"`. |
| `sort_order` | string | no |  | Sort Order. Sort order for results. One of `"desc"`, `"asc"`. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.results`: Results
- `data.results[].id`: ID (number)
- `data.results[].url`: URL (url)
- `data.results[].name`: Name
- `data.results[].email`: Email (email)
- `data.results[].created_at`: Created At (datetime)
- `data.results[].updated_at`: Updated At (datetime)
- `data.results[].time_zone`: Time Zone
- `data.results[].iana_time_zone`: Iana Time Zone
- `data.results[].phone`: Phone
- `data.results[].shared_phone_number`: Shared Phone Number
- `data.results[].photo`: Photo
- `data.results[].locale_id`: Locale ID (number)
- `data.results[].locale`: Locale
- `data.results[].organization_id`: Organization ID (number)
- `data.results[].role`: Role
- `data.results[].verified`: Verified (boolean)
- `data.results[].external_id`: External ID
- `data.results[].tags`: Tags
- `data.results[].alias`: Alias
- `data.results[].active`: Active (boolean)
- `data.results[].shared`: Shared (boolean)
- `data.results[].shared_agent`: Shared Agent (boolean)
- `data.results[].last_login_at`: Last Login At (datetime)
- `data.results[].two_factor_auth_enabled`: Two Factor Auth Enabled
- `data.results[].signature`: Signature
- `data.results[].details`: Details
- `data.results[].notes`: Notes
- `data.results[].role_type`: Role Type (number)
- `data.results[].custom_role_id`: Custom Role ID (number)
- `data.results[].is_billing_admin`: Is Billing Admin (boolean)
- `data.results[].moderator`: Moderator (boolean)
- `data.results[].ticket_restriction`: Ticket Restriction
- `data.results[].only_private_comments`: Only Private Comments (boolean)
- `data.results[].restricted_agent`: Restricted Agent (boolean)
- `data.results[].suspended`: Suspended (boolean)
- `data.results[].default_group_id`: Default Group ID (number)
- `data.results[].report_csv`: Report CSV (boolean)
- `data.results[].user_fields`: User Fields
- `data.results[].suspension_details`: Suspension Details
- `data.facets`: Facets
- `data.next_page`: Next Page
- `data.previous_page`: Previous Page
- `data.count`: Count (number)
- `users`: Users
- `users[].id`: ID (number)
- `users[].url`: URL (url)
- `users[].name`: Name
- `users[].email`: Email (email)
- `users[].created_at`: Created At (datetime)
- `users[].updated_at`: Updated At (datetime)
- `users[].time_zone`: Time Zone
- `users[].iana_time_zone`: Iana Time Zone
- `users[].phone`: Phone
- `users[].shared_phone_number`: Shared Phone Number
- `users[].photo`: Photo
- `users[].locale_id`: Locale ID (number)
- `users[].locale`: Locale
- `users[].organization_id`: Organization ID (number)
- `users[].role`: Role
- `users[].verified`: Verified (boolean)
- `users[].external_id`: External ID
- `users[].tags`: Tags
- `users[].alias`: Alias
- `users[].active`: Active (boolean)
- `users[].shared`: Shared (boolean)
- `users[].shared_agent`: Shared Agent (boolean)
- `users[].last_login_at`: Last Login At (datetime)
- `users[].two_factor_auth_enabled`: Two Factor Auth Enabled
- `users[].signature`: Signature
- `users[].details`: Details
- `users[].notes`: Notes
- `users[].role_type`: Role Type (number)
- `users[].custom_role_id`: Custom Role ID (number)
- `users[].is_billing_admin`: Is Billing Admin (boolean)
- `users[].moderator`: Moderator (boolean)
- `users[].ticket_restriction`: Ticket Restriction
- `users[].only_private_comments`: Only Private Comments (boolean)
- `users[].restricted_agent`: Restricted Agent (boolean)
- `users[].suspended`: Suspended (boolean)
- `users[].default_group_id`: Default Group ID (number)
- `users[].report_csv`: Report CSV (boolean)
- `users[].user_fields`: User Fields
- `users[].suspension_details`: Suspension Details
- `search_criteria`: Search Criteria
- `search_criteria.type`: Type
- `search_criteria.query`: Query
- `search_criteria.sort_by`: Sort By
- `search_criteria.sort_order`: Sort Order
- `total_count`: Total Count (number)
- `found_count`: Found Count (number)
- `has_more`: Has More (boolean)

### `find-agent`

**Find an Agent.** Finds an agent (staff/support team member) in Zendesk by searching for their email or name. Returns the first matching agent with their profile details. Useful for assigning tickets or sending notifications to specific agents. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_type` | string | yes |  | Search By. Choose how to search for the agent. One of `"email"`, `"name"`. |
| `search_value` | string | yes |  | Search Value. The email or name to search for. |

Output fields:

- `success`: Success (boolean)
- `agent`: Agent
- `agent.id`: ID (number)
- `agent.url`: URL (url)
- `agent.name`: Name
- `agent.email`: Email (email)
- `agent.created_at`: Created At (datetime)
- `agent.updated_at`: Updated At (datetime)
- `agent.time_zone`: Time Zone
- `agent.iana_time_zone`: Iana Time Zone
- `agent.phone`: Phone
- `agent.shared_phone_number`: Shared Phone Number
- `agent.photo`: Photo
- `agent.locale_id`: Locale ID (number)
- `agent.locale`: Locale
- `agent.organization_id`: Organization ID (number)
- `agent.role`: Role
- `agent.verified`: Verified (boolean)
- `agent.external_id`: External ID
- `agent.tags`: Tags
- `agent.alias`: Alias
- `agent.active`: Active (boolean)
- `agent.shared`: Shared (boolean)
- `agent.shared_agent`: Shared Agent (boolean)
- `agent.last_login_at`: Last Login At (datetime)
- `agent.two_factor_auth_enabled`: Two Factor Auth Enabled
- `agent.signature`: Signature
- `agent.details`: Details
- `agent.notes`: Notes
- `agent.role_type`: Role Type (number)
- `agent.custom_role_id`: Custom Role ID (number)
- `agent.is_billing_admin`: Is Billing Admin (boolean)
- `agent.moderator`: Moderator (boolean)
- `agent.ticket_restriction`: Ticket Restriction
- `agent.only_private_comments`: Only Private Comments (boolean)
- `agent.restricted_agent`: Restricted Agent (boolean)
- `agent.suspended`: Suspended (boolean)
- `agent.default_group_id`: Default Group ID (number)
- `agent.report_csv`: Report CSV (boolean)
- `agent.user_fields`: User Fields
- `agent.suspension_details`: Suspension Details
- `id`: ID (number)
- `name`: Name
- `email`: Email (email)
- `role`: Role
- `active`: Active (boolean)

### `find-group`

**Find a Group.** Finds a support group in Zendesk by name. Returns the first matching group with its profile details. Useful for assigning tickets or routing work to specific support teams. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_name` | string | yes |  | Group Name. The name of the group to find. |

Output fields:

- `success`: Success (boolean)
- `group`: Group
- `group.url`: URL (url)
- `group.id`: ID (number)
- `group.is_public`: Is Public (boolean)
- `group.name`: Name
- `group.description`: Description
- `group.default`: Default (boolean)
- `group.deleted`: Deleted (boolean)
- `group.created_at`: Created At (datetime)
- `group.updated_at`: Updated At (datetime)
- `id`: ID (number)
- `name`: Name
- `is_public`: Is Public (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `find-latest-comment`

**Find Latest Comment.** Retrieves the most recent comment on a specified ticket, including the comment body, author, timestamp, and any attachments. Useful for extracting the latest response in a ticket thread or analyzing recent customer communication. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket. Select the ticket to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `include_private` | boolean | no | `false` | Include Private Comments. Include private internal comments in the search. |

Output fields:

- `success`: Success (boolean)
- `comment`: Comment
- `comment.id`: ID (number)
- `comment.type`: Type
- `comment.author_id`: Author ID (number)
- `comment.body`: Body
- `comment.html_body`: HTML Body
- `comment.plain_body`: Plain Body
- `comment.public`: Public (boolean)
- `comment.attachments`: Attachments
- `comment.audit_id`: Audit ID (number)
- `comment.via`: Via
- `comment.via.channel`: Channel
- `comment.via.source`: Source
- `comment.via.source.from`: From
- `comment.via.source.to`: To
- `comment.via.source.rel`: Rel
- `comment.created_at`: Created At (datetime)
- `comment.metadata`: Metadata
- `comment.metadata.system`: System
- `comment.metadata.system.client`: Client
- `comment.metadata.system.ip_address`: IP Address
- `comment.metadata.system.transaction_id`: Transaction ID
- `comment.metadata.system.location`: Location
- `comment.metadata.system.latitude`: Latitude (number)
- `comment.metadata.system.longitude`: Longitude (number)
- `comment.metadata.custom`: Custom
- `id`: ID (number)
- `body`: Body
- `html_body`: HTML Body
- `author_id`: Author ID (number)
- `created_at`: Created At (datetime)
- `is_public`: Is Public (boolean)
- `attachments`: Attachments

### `update-user`

**Update User.** Updates an existing user identified by user ID, changing name, email, phone, tags, or custom user fields. Use to edit a user record already in Zendesk. Note that the tags array REPLACES all existing tags rather than appending. At least one field must be provided, and emails must remain unique. Idempotent: re-applying the same field values leaves the user in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. The ID of the user to update. |
| `name` | string | no |  | Name. New name for the user. |
| `email` | string | no |  | Email. New email address for the user. |
| `phone` | string | no |  | Phone. New phone number for the user. |
| `tags` | array | no |  | Tags. Tags for the user. This replaces all existing tags. |
| `user_fields` | object | no |  | User Fields. Custom user field values. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.user`: User
- `data.user.id`: ID (number)
- `data.user.url`: URL (url)
- `data.user.name`: Name
- `data.user.email`: Email (email)
- `data.user.created_at`: Created At (datetime)
- `data.user.updated_at`: Updated At (datetime)
- `data.user.time_zone`: Time Zone
- `data.user.iana_time_zone`: Iana Time Zone
- `data.user.phone`: Phone
- `data.user.shared_phone_number`: Shared Phone Number
- `data.user.photo`: Photo
- `data.user.locale_id`: Locale ID (number)
- `data.user.locale`: Locale
- `data.user.organization_id`: Organization ID (number)
- `data.user.role`: Role
- `data.user.verified`: Verified (boolean)
- `data.user.external_id`: External ID
- `data.user.tags`: Tags
- `data.user.alias`: Alias
- `data.user.active`: Active (boolean)
- `data.user.shared`: Shared (boolean)
- `data.user.shared_agent`: Shared Agent (boolean)
- `data.user.last_login_at`: Last Login At (datetime)
- `data.user.two_factor_auth_enabled`: Two Factor Auth Enabled
- `data.user.signature`: Signature
- `data.user.details`: Details
- `data.user.notes`: Notes
- `data.user.role_type`: Role Type (number)
- `data.user.custom_role_id`: Custom Role ID (number)
- `data.user.is_billing_admin`: Is Billing Admin (boolean)
- `data.user.moderator`: Moderator (boolean)
- `data.user.ticket_restriction`: Ticket Restriction
- `data.user.only_private_comments`: Only Private Comments (boolean)
- `data.user.restricted_agent`: Restricted Agent (boolean)
- `data.user.suspended`: Suspended (boolean)
- `data.user.default_group_id`: Default Group ID (number)
- `data.user.report_csv`: Report CSV (boolean)
- `data.user.user_fields`: User Fields
- `data.user.suspension_details`: Suspension Details

### `zendesk_get_automation`

**Get Automation.** Fetches one automation with its conditions and actions. Requires an admin. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `automation_id` | string | yes |  | Automation ID. Numeric automation ID, from List or Search Automations. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `title`: Title
- `active`: Active (boolean)
- `updated_at`: Updated At (datetime)
- `created_at`: Created At (datetime)
- `default`: Default (boolean)
- `actions`: Actions
- `actions[].field`: Field
- `actions[].value`: Value
- `conditions`: Conditions
- `conditions.all`: All
- `conditions.all[].field`: Field
- `conditions.all[].operator`: Operator
- `conditions.all[].value`: Value
- `conditions.any`: Any
- `position`: Position (number)
- `raw_title`: Raw Title

### `zendesk_get_satisfaction_rating`

**Get Satisfaction Rating.** Fetches one customer satisfaction rating with score, comment, reason and ticket ID. Requires an admin. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `satisfaction_rating_id` | string | yes |  | Satisfaction Rating ID. Numeric rating ID, from List Satisfaction Ratings. |

Output fields:

- `id`: ID (number)
- `url`: API URL (url)
- `score`: Score
- `comment`: Comment
- `reason`: Reason
- `reason_code`: Reason Code (number)
- `reason_id`: Reason ID (number)
- `ticket_id`: Ticket ID (number)
- `requester_id`: Requester ID (number)
- `assignee_id`: Assignee ID (number)
- `group_id`: Group ID (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `zendesk_get_ticket_sla_metrics`

**Get Ticket SLA Metrics.** Lists the SLA metrics applied to one ticket (first reply, next reply, resolution time) with stage, breach time and whether they are breached. Requires the Professional plan or above. Use Get Ticket Metrics for raw timings. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |

Output fields:

- `policy_metrics`: Policy Metrics
- `count`: Count (number)

### `zendesk_get_ticket_trigger`

**Get Ticket Trigger.** Fetches one ticket trigger with its conditions and actions. Requires an admin. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `trigger_id` | string | yes |  | Trigger ID. Numeric trigger ID, from List or Search Ticket Triggers. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `title`: Title
- `active`: Active (boolean)
- `updated_at`: Updated At (datetime)
- `created_at`: Created At (datetime)
- `default`: Default (boolean)
- `actions`: Actions
- `actions[].field`: Field
- `actions[].value`: Value
- `conditions`: Conditions
- `conditions.all`: All
- `conditions.all[].field`: Field
- `conditions.all[].operator`: Operator
- `conditions.all[].value`: Value (boolean)
- `conditions.any`: Any
- `description`: Description
- `position`: Position (number)
- `raw_title`: Raw Title
- `category_id`: Category ID

### `zendesk_list_automations`

**List Automations.** Lists automations, the time-based business rules that act on tickets hourly (e.g. close solved tickets after 4 days). Requires an admin. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `active` | string | no |  | Active. Filter by active (Yes) or inactive (No). Omit for both. One of `"true"`, `"false"`. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `automations`: Automations
- `automations[].url`: URL (url)
- `automations[].id`: ID (number)
- `automations[].title`: Title
- `automations[].active`: Active (boolean)
- `automations[].updated_at`: Updated At (datetime)
- `automations[].created_at`: Created At (datetime)
- `automations[].default`: Default (boolean)
- `automations[].actions`: Actions
- `automations[].actions[].field`: Field
- `automations[].actions[].value`: Value
- `automations[].conditions`: Conditions
- `automations[].conditions.all`: All
- `automations[].conditions.all[].field`: Field
- `automations[].conditions.all[].operator`: Operator
- `automations[].conditions.all[].value`: Value
- `automations[].conditions.any`: Any
- `automations[].position`: Position (number)
- `automations[].raw_title`: Raw Title
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_satisfaction_ratings`

**List Satisfaction Ratings.** Lists customer satisfaction ratings with score, comment, reason and ticket ID, newest first. Requires an admin. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `score` | string | no |  | Score. Only return ratings with this score. One of `"offered"`, `"unoffered"`, `"received"`, `"good"`, `"bad"`, `"good_with_comment"`, `"bad_with_comment"`. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `satisfaction_ratings`: Satisfaction Ratings
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_sla_policies`

**List SLA Policies.** Lists SLA policies with their filters and per-priority targets. Requires an admin and the Professional plan or above. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `sla_policies`: Sla Policies
- `sla_policies[].url`: URL (url)
- `sla_policies[].id`: ID (number)
- `sla_policies[].title`: Title
- `sla_policies[].description`: Description
- `sla_policies[].position`: Position (number)
- `sla_policies[].filter`: Filter
- `sla_policies[].filter.all`: All
- `sla_policies[].filter.any`: Any
- `sla_policies[].policy_metrics`: Policy Metrics
- `sla_policies[].policy_metrics[].priority`: Priority
- `sla_policies[].policy_metrics[].metric`: Metric
- `sla_policies[].policy_metrics[].target`: Target (number)
- `sla_policies[].policy_metrics[].business_hours`: Business Hours (boolean)
- `sla_policies[].policy_metrics[].target_in_seconds`: Target In Seconds (number)
- `sla_policies[].created_at`: Created At (datetime)
- `sla_policies[].updated_at`: Updated At (datetime)
- `sla_policies[].metric_settings`: Metric Settings
- `count`: Count (number)

### `zendesk_list_ticket_triggers`

**List Ticket Triggers.** Lists ticket triggers, the business rules that run when tickets are created or updated, with their conditions and actions. Use it to explain why a ticket changed. Requires an admin. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `active` | string | no |  | Active. Filter by active (Yes) or inactive (No). Omit for both. One of `"true"`, `"false"`. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `triggers`: Triggers
- `triggers[].url`: URL (url)
- `triggers[].id`: ID (number)
- `triggers[].title`: Title
- `triggers[].active`: Active (boolean)
- `triggers[].updated_at`: Updated At (datetime)
- `triggers[].created_at`: Created At (datetime)
- `triggers[].default`: Default (boolean)
- `triggers[].actions`: Actions
- `triggers[].actions[].field`: Field
- `triggers[].actions[].value`: Value
- `triggers[].conditions`: Conditions
- `triggers[].conditions.all`: All
- `triggers[].conditions.all[].field`: Field
- `triggers[].conditions.all[].operator`: Operator
- `triggers[].conditions.all[].value`: Value (boolean)
- `triggers[].conditions.any`: Any
- `triggers[].description`: Description
- `triggers[].position`: Position (number)
- `triggers[].raw_title`: Raw Title
- `triggers[].category_id`: Category ID
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_search_automations`

**Search Automations.** Finds automations whose title matches the query. Requires an admin. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Text to match against automation titles. |
| `active` | string | no |  | Active. Filter by active (Yes) or inactive (No). Omit for both. One of `"true"`, `"false"`. |

Output fields:

- `automations`: Automations
- `automations[].url`: URL (url)
- `automations[].id`: ID (number)
- `automations[].title`: Title
- `automations[].active`: Active (boolean)
- `automations[].updated_at`: Updated At (datetime)
- `automations[].created_at`: Created At (datetime)
- `automations[].default`: Default (boolean)
- `automations[].actions`: Actions
- `automations[].actions[].field`: Field
- `automations[].actions[].value`: Value
- `automations[].conditions`: Conditions
- `automations[].conditions.all`: All
- `automations[].conditions.all[].field`: Field
- `automations[].conditions.all[].operator`: Operator
- `automations[].conditions.all[].value`: Value
- `automations[].conditions.any`: Any
- `automations[].position`: Position (number)
- `automations[].raw_title`: Raw Title
- `automations[].highlights`: Highlights
- `automations[].highlights.title`: Title
- `count`: Count (number)

### `zendesk_search_ticket_triggers`

**Search Ticket Triggers.** Finds ticket triggers whose title matches the query. Requires an admin. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Text to match against trigger titles. |
| `active` | string | no |  | Active. Filter by active (Yes) or inactive (No). Omit for both. One of `"true"`, `"false"`. |

Output fields:

- `triggers`: Triggers
- `triggers[].url`: URL (url)
- `triggers[].id`: ID (number)
- `triggers[].title`: Title
- `triggers[].active`: Active (boolean)
- `triggers[].updated_at`: Updated At (datetime)
- `triggers[].created_at`: Created At (datetime)
- `triggers[].default`: Default (boolean)
- `triggers[].actions`: Actions
- `triggers[].actions[].field`: Field
- `triggers[].actions[].value`: Value
- `triggers[].conditions`: Conditions
- `triggers[].conditions.all`: All
- `triggers[].conditions.all[].field`: Field
- `triggers[].conditions.all[].operator`: Operator
- `triggers[].conditions.all[].value`: Value (boolean)
- `triggers[].conditions.any`: Any
- `triggers[].description`: Description
- `triggers[].position`: Position (number)
- `triggers[].raw_title`: Raw Title
- `triggers[].highlights`: Highlights
- `triggers[].highlights.title`: Title
- `triggers[].category_id`: Category ID
- `count`: Count (number)

### `zendesk_create_custom_object_record`

**Create Custom Object Record.** Creates one record of a custom object with a name and field values keyed by the field keys from List Custom Object Fields. Not idempotent; use Upsert Custom Object Record with an external ID to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_object_key` | string | yes |  | Custom Object Key. The object key, from List Custom Objects. |
| `name` | string | no |  | Name. Record name. Required unless the object autonumbers names. |
| `external_id` | string | no |  | External ID. Your own unique reference. |
| `custom_object_fields` | JSON | no |  | Field Values. Object of field keys to values, keys from List Custom Object Fields. |

Output fields:

- `url`: URL (url)
- `id`: ID
- `name`: Name
- `custom_object_key`: Custom Object Key
- `custom_object_fields`: Custom Object Fields
- `created_by_user_id`: Created By User ID
- `updated_by_user_id`: Updated By User ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `external_id`: External ID
- `photo`: Photo

### `zendesk_delete_custom_object_record`

**Delete Custom Object Record.** Permanently deletes one custom object record. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_object_key` | string | yes |  | Custom Object Key. The object key, from List Custom Objects. |
| `record_id` | string | yes |  | Record ID. Record ID, from List or Search Custom Object Records. |

Output fields:

- `success`: Success (boolean)
- `custom_object_key`: Custom Object Key
- `record_id`: Record ID

### `zendesk_get_custom_object_record`

**Get Custom Object Record.** Fetches one custom object record with its name, external ID and field values. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_object_key` | string | yes |  | Custom Object Key. The object key, from List Custom Objects. |
| `record_id` | string | yes |  | Record ID. Record ID, from List or Search Custom Object Records. |

Output fields:

- `url`: URL (url)
- `id`: ID
- `name`: Name
- `custom_object_key`: Custom Object Key
- `custom_object_fields`: Custom Object Fields
- `created_by_user_id`: Created By User ID
- `updated_by_user_id`: Updated By User ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `external_id`: External ID
- `photo`: Photo

### `zendesk_list_custom_object_fields`

**List Custom Object Fields.** Lists the fields of one custom object with their keys, types and options, which Create, Update and Upsert Custom Object Record use in custom_object_fields. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_object_key` | string | yes |  | Custom Object Key. The object key, from List Custom Objects. |
| `include_standard_fields` | string | no |  | Include Standard Fields. Also return the built-in name and external ID fields. One of `"true"`, `"false"`. |

Output fields:

- `custom_object_fields`: Custom Object Fields
- `custom_object_fields[].url`: URL (url)
- `custom_object_fields[].id`: ID (number)
- `custom_object_fields[].type`: Type
- `custom_object_fields[].key`: Key
- `custom_object_fields[].title`: Title
- `custom_object_fields[].description`: Description
- `custom_object_fields[].raw_title`: Raw Title
- `custom_object_fields[].raw_description`: Raw Description
- `custom_object_fields[].position`: Position (number)
- `custom_object_fields[].active`: Active (boolean)
- `custom_object_fields[].system`: System (boolean)
- `custom_object_fields[].regexp_for_validation`: Regexp For Validation
- `custom_object_fields[].created_at`: Created At (datetime)
- `custom_object_fields[].updated_at`: Updated At (datetime)
- `custom_object_fields[].required`: Required (boolean)
- `count`: Count (number)

### `zendesk_list_custom_object_records`

**List Custom Object Records.** Lists the records of one custom object, optionally only the given external IDs. Use Search Custom Object Records to match on text or field values. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_object_key` | string | yes |  | Custom Object Key. The object key, from List Custom Objects. |
| `external_ids` | string | no |  | External IDs. Comma-separated external IDs to return. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `custom_object_records`: Custom Object Records
- `custom_object_records[].url`: URL (url)
- `custom_object_records[].id`: ID
- `custom_object_records[].name`: Name
- `custom_object_records[].custom_object_key`: Custom Object Key
- `custom_object_records[].custom_object_fields`: Custom Object Fields
- `custom_object_records[].created_by_user_id`: Created By User ID
- `custom_object_records[].updated_by_user_id`: Updated By User ID
- `custom_object_records[].created_at`: Created At (datetime)
- `custom_object_records[].updated_at`: Updated At (datetime)
- `custom_object_records[].external_id`: External ID
- `custom_object_records[].photo`: Photo
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_custom_objects`

**List Custom Objects.** Lists the custom object types defined in the account, with the key every custom object record action needs. Custom objects require Zendesk Suite or Support Professional and above. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `custom_objects`: Custom Objects
- `custom_objects[].url`: URL (url)
- `custom_objects[].key`: Key
- `custom_objects[].created_by_user_id`: Created By User ID
- `custom_objects[].updated_by_user_id`: Updated By User ID
- `custom_objects[].created_at`: Created At (datetime)
- `custom_objects[].updated_at`: Updated At (datetime)
- `custom_objects[].title`: Title
- `custom_objects[].raw_title`: Raw Title
- `custom_objects[].title_pluralized`: Title Pluralized
- `custom_objects[].raw_title_pluralized`: Raw Title Pluralized
- `custom_objects[].description`: Description
- `custom_objects[].raw_description`: Raw Description
- `custom_objects[].include_in_list_view`: Include In List View (boolean)
- `custom_objects[].allows_photos`: Allows Photos (boolean)
- `custom_objects[].created_via`: Created Via
- `custom_objects[].allows_attachments`: Allows Attachments (boolean)
- `count`: Count (number)

### `zendesk_search_custom_object_records`

**Search Custom Object Records.** Searches the records of one custom object by name and text field values. Use List Custom Object Records to page through all records or fetch by external ID. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_object_key` | string | yes |  | Custom Object Key. The object key, from List Custom Objects. |
| `query` | string | yes |  | Query. Text to search for in record names and text fields. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `custom_object_records`: Custom Object Records
- `custom_object_records[].url`: URL (url)
- `custom_object_records[].id`: ID
- `custom_object_records[].name`: Name
- `custom_object_records[].custom_object_key`: Custom Object Key
- `custom_object_records[].custom_object_fields`: Custom Object Fields
- `custom_object_records[].created_by_user_id`: Created By User ID
- `custom_object_records[].updated_by_user_id`: Updated By User ID
- `custom_object_records[].created_at`: Created At (datetime)
- `custom_object_records[].updated_at`: Updated At (datetime)
- `custom_object_records[].external_id`: External ID
- `custom_object_records[].photo`: Photo
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_update_custom_object_record`

**Update Custom Object Record.** Updates one custom object record by ID; only the given fields change. Set a field to null in Field Values to clear it. Record IDs come from List or Search Custom Object Records. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_object_key` | string | yes |  | Custom Object Key. The object key, from List Custom Objects. |
| `record_id` | string | yes |  | Record ID. Record ID, from List or Search Custom Object Records. |
| `name` | string | no |  | Name. |
| `external_id` | string | no |  | External ID. |
| `custom_object_fields` | JSON | no |  | Field Values. Object of field keys to values, keys from List Custom Object Fields. |

Output fields:

- `url`: URL (url)
- `id`: ID
- `name`: Name
- `custom_object_key`: Custom Object Key
- `custom_object_fields`: Custom Object Fields
- `created_by_user_id`: Created By User ID
- `updated_by_user_id`: Updated By User ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `external_id`: External ID
- `photo`: Photo

### `zendesk_upsert_custom_object_record`

**Upsert Custom Object Record.** Upserts one custom object record: matches by External ID, or by Name when External ID is empty, updates the given field values, and creates the record when nothing matches. created is true when a new record was made. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_object_key` | string | yes |  | Custom Object Key. The object key, from List Custom Objects. |
| `external_id` | string | no |  | External ID. Match key, preferred over Name. |
| `name` | string | no |  | Name. Match key when External ID is empty; otherwise the name to set. |
| `custom_object_fields` | JSON | no |  | Field Values. Object of field keys to values, keys from List Custom Object Fields. |

Output fields:

- `created`: Created (boolean)
- `custom_object_record`: Custom Object Record
- `custom_object_record.url`: URL (url)
- `custom_object_record.id`: ID
- `custom_object_record.name`: Name
- `custom_object_record.custom_object_key`: Custom Object Key
- `custom_object_record.custom_object_fields`: Custom Object Fields
- `custom_object_record.created_by_user_id`: Created By User ID
- `custom_object_record.updated_by_user_id`: Updated By User ID
- `custom_object_record.created_at`: Created At (datetime)
- `custom_object_record.updated_at`: Updated At (datetime)
- `custom_object_record.external_id`: External ID
- `custom_object_record.photo`: Photo

### `zendesk_list_group_users`

**List Group Users.** Lists the agents who belong to one group, e.g. to pick an assignee that matches the ticket group. Group IDs come from List Groups. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_id` | string | yes |  | Group ID. Numeric group ID, from List Groups. |

Output fields:

- `users`: Users
- `users[].id`: ID (number)
- `users[].url`: URL (url)
- `users[].name`: Name
- `users[].email`: Email (email)
- `users[].created_at`: Created At (datetime)
- `users[].updated_at`: Updated At (datetime)
- `users[].time_zone`: Time Zone
- `users[].iana_time_zone`: Iana Time Zone
- `users[].phone`: Phone
- `users[].shared_phone_number`: Shared Phone Number
- `users[].photo`: Photo
- `users[].locale_id`: Locale ID (number)
- `users[].locale`: Locale
- `users[].organization_id`: Organization ID (number)
- `users[].role`: Role
- `users[].verified`: Verified (boolean)
- `users[].external_id`: External ID
- `users[].tags`: Tags
- `users[].alias`: Alias
- `users[].active`: Active (boolean)
- `users[].shared`: Shared (boolean)
- `users[].shared_agent`: Shared Agent (boolean)
- `users[].last_login_at`: Last Login At (datetime)
- `users[].two_factor_auth_enabled`: Two Factor Auth Enabled
- `users[].signature`: Signature
- `users[].details`: Details
- `users[].notes`: Notes
- `users[].role_type`: Role Type (number)
- `users[].custom_role_id`: Custom Role ID (number)
- `users[].is_billing_admin`: Is Billing Admin (boolean)
- `users[].moderator`: Moderator (boolean)
- `users[].ticket_restriction`: Ticket Restriction
- `users[].only_private_comments`: Only Private Comments (boolean)
- `users[].restricted_agent`: Restricted Agent (boolean)
- `users[].suspended`: Suspended (boolean)
- `users[].default_group_id`: Default Group ID (number)
- `users[].report_csv`: Report CSV (boolean)
- `users[].user_fields`: User Fields
- `users[].suspension_details`: Suspension Details
- `count`: Count (number)

### `zendesk_list_groups`

**List Groups.** Lists the agent groups tickets can be assigned to, with their IDs for Create Ticket, Update Ticket and List Group Users. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `groups`: Groups
- `groups[].url`: URL (url)
- `groups[].id`: ID (number)
- `groups[].is_public`: Is Public (boolean)
- `groups[].name`: Name
- `groups[].description`: Description
- `groups[].default`: Default (boolean)
- `groups[].deleted`: Deleted (boolean)
- `groups[].created_at`: Created At (datetime)
- `groups[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_brands`

**List Brands.** Lists brands with their IDs, names and subdomains, for Brand ID on Create Ticket and Update Ticket. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `brands`: Brands
- `brands[].url`: URL (url)
- `brands[].id`: ID (number)
- `brands[].name`: Name
- `brands[].brand_url`: Brand URL (url)
- `brands[].subdomain`: Subdomain
- `brands[].host_mapping`: Host Mapping
- `brands[].has_help_center`: Has Help Center (boolean)
- `brands[].help_center_state`: Help Center State
- `brands[].active`: Active (boolean)
- `brands[].default`: Default (boolean)
- `brands[].is_deleted`: Is Deleted (boolean)
- `brands[].logo`: Logo
- `brands[].ticket_form_ids`: Ticket Form IDs
- `brands[].signature_template`: Signature Template
- `brands[].created_at`: Created At (datetime)
- `brands[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_custom_statuses`

**List Custom Statuses.** Lists the ticket statuses defined in the account with their IDs and status category, for Custom Status ID on Update Ticket and Update Many Tickets. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `active` | string | no |  | Active. Filter by active (Yes) or inactive (No). Omit for both. One of `"true"`, `"false"`. |

Output fields:

- `custom_statuses`: Custom Statuses
- `custom_statuses[].url`: URL (url)
- `custom_statuses[].id`: ID (number)
- `custom_statuses[].status_category`: Status Category
- `custom_statuses[].agent_label`: Agent Label
- `custom_statuses[].raw_agent_label`: Raw Agent Label
- `custom_statuses[].end_user_label`: End User Label
- `custom_statuses[].raw_end_user_label`: Raw End User Label
- `custom_statuses[].description`: Description
- `custom_statuses[].raw_description`: Raw Description
- `custom_statuses[].end_user_description`: End User Description
- `custom_statuses[].raw_end_user_description`: Raw End User Description
- `custom_statuses[].active`: Active (boolean)
- `custom_statuses[].default`: Default (boolean)
- `custom_statuses[].created_at`: Created At (datetime)
- `custom_statuses[].updated_at`: Updated At (datetime)
- `count`: Count (number)

### `zendesk_list_organization_fields`

**List Organization Fields.** Lists custom organization fields with their keys, types and options, for organization_fields on Create Organization and Update Organization. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `organization_fields`: Organization Fields
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_ticket_fields`

**List Ticket Fields.** Lists ticket fields with their IDs, types and dropdown option values. Use the IDs and option values in Custom Fields on Create Ticket and Update Ticket. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `ticket_fields`: Ticket Fields
- `ticket_fields[].url`: URL (url)
- `ticket_fields[].id`: ID (number)
- `ticket_fields[].type`: Type
- `ticket_fields[].title`: Title
- `ticket_fields[].raw_title`: Raw Title
- `ticket_fields[].description`: Description
- `ticket_fields[].raw_description`: Raw Description
- `ticket_fields[].position`: Position (number)
- `ticket_fields[].active`: Active (boolean)
- `ticket_fields[].required`: Required (boolean)
- `ticket_fields[].collapsed_for_agents`: Collapsed For Agents (boolean)
- `ticket_fields[].regexp_for_validation`: Regexp For Validation
- `ticket_fields[].title_in_portal`: Title In Portal
- `ticket_fields[].raw_title_in_portal`: Raw Title In Portal
- `ticket_fields[].visible_in_portal`: Visible In Portal (boolean)
- `ticket_fields[].editable_in_portal`: Editable In Portal (boolean)
- `ticket_fields[].required_in_portal`: Required In Portal (boolean)
- `ticket_fields[].agent_can_edit`: Agent Can Edit (boolean)
- `ticket_fields[].tag`: Tag
- `ticket_fields[].created_at`: Created At (datetime)
- `ticket_fields[].updated_at`: Updated At (datetime)
- `ticket_fields[].removable`: Removable (boolean)
- `ticket_fields[].key`: Key
- `ticket_fields[].agent_description`: Agent Description
- `ticket_fields[].raw_agent_description`: Raw Agent Description
- `ticket_fields[].system_field_options`: System Field Options
- `ticket_fields[].system_field_options[].name`: Name
- `ticket_fields[].system_field_options[].value`: Value
- `ticket_fields[].sub_type_id`: Sub Type ID (number)
- `ticket_fields[].custom_field_options`: Custom Field Options
- `ticket_fields[].custom_field_options[].id`: ID (number)
- `ticket_fields[].custom_field_options[].name`: Name
- `ticket_fields[].custom_field_options[].raw_name`: Raw Name
- `ticket_fields[].custom_field_options[].value`: Value
- `ticket_fields[].custom_field_options[].default`: Default (boolean)
- `ticket_fields[].custom_field_options[].allow_solving`: Allow Solving (boolean)
- `ticket_fields[].custom_statuses`: Custom Statuses
- `ticket_fields[].custom_statuses[].url`: URL (url)
- `ticket_fields[].custom_statuses[].id`: ID (number)
- `ticket_fields[].custom_statuses[].status_category`: Status Category
- `ticket_fields[].custom_statuses[].agent_label`: Agent Label
- `ticket_fields[].custom_statuses[].end_user_label`: End User Label
- `ticket_fields[].custom_statuses[].description`: Description
- `ticket_fields[].custom_statuses[].end_user_description`: End User Description
- `ticket_fields[].custom_statuses[].active`: Active (boolean)
- `ticket_fields[].custom_statuses[].default`: Default (boolean)
- `ticket_fields[].custom_statuses[].created_at`: Created At (datetime)
- `ticket_fields[].custom_statuses[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_ticket_forms`

**List Ticket Forms.** Lists ticket forms with the ticket field IDs each one shows, for Ticket Form ID on Create Ticket. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `active` | string | no |  | Active. Filter by active (Yes) or inactive (No). Omit for both. One of `"true"`, `"false"`. |

Output fields:

- `ticket_forms`: Ticket Forms
- `ticket_forms[].id`: ID (number)
- `ticket_forms[].raw_name`: Raw Name
- `ticket_forms[].raw_display_name`: Raw Display Name
- `ticket_forms[].end_user_visible`: End User Visible (boolean)
- `ticket_forms[].position`: Position (number)
- `ticket_forms[].ticket_field_ids`: Ticket Field IDs
- `ticket_forms[].active`: Active (boolean)
- `ticket_forms[].default`: Default (boolean)
- `ticket_forms[].in_all_brands`: In All Brands (boolean)
- `ticket_forms[].restricted_brand_ids`: Restricted Brand IDs
- `ticket_forms[].end_user_conditions`: End User Conditions
- `ticket_forms[].agent_conditions`: Agent Conditions
- `ticket_forms[].url`: URL (url)
- `ticket_forms[].name`: Name
- `ticket_forms[].display_name`: Display Name
- `ticket_forms[].form_type`: Form Type
- `ticket_forms[].created_at`: Created At (datetime)
- `ticket_forms[].updated_at`: Updated At (datetime)
- `ticket_forms[].deleted_at`: Deleted At
- `count`: Count (number)

### `zendesk_list_user_fields`

**List User Fields.** Lists custom user fields with their keys, types and options, for user_fields on Create User and Update User. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `user_fields`: User Fields
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_get_macro`

**Get Macro.** Fetches one macro with its title, description and the actions it applies (comment text, status, tags, fields). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `macro_id` | string | yes |  | Macro ID. Numeric macro ID, from List Macros or Search Macros. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `title`: Title
- `active`: Active (boolean)
- `updated_at`: Updated At (datetime)
- `created_at`: Created At (datetime)
- `default`: Default (boolean)
- `position`: Position (number)
- `description`: Description
- `actions`: Actions
- `actions[].field`: Field
- `actions[].value`: Value
- `restriction`: Restriction
- `raw_title`: Raw Title

### `zendesk_list_macros`

**List Macros.** Lists macros, the canned responses and field changes agents apply to tickets, with their actions. Use Search Macros to find one by title, then Preview Macro on Ticket to see its effect. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `active` | string | no |  | Active. Filter by active (Yes) or inactive (No). Omit for both. One of `"true"`, `"false"`. |
| `access` | string | no |  | Access. Only return macros with this visibility. One of `"personal"`, `"agents"`, `"shared"`, `"account"`. |
| `group_id` | string | no |  | Group ID. Only return macros available to this group, from List Groups. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `macros`: Macros
- `macros[].url`: URL (url)
- `macros[].id`: ID (number)
- `macros[].title`: Title
- `macros[].active`: Active (boolean)
- `macros[].updated_at`: Updated At (datetime)
- `macros[].created_at`: Created At (datetime)
- `macros[].default`: Default (boolean)
- `macros[].position`: Position (number)
- `macros[].description`: Description
- `macros[].actions`: Actions
- `macros[].actions[].field`: Field
- `macros[].actions[].value`: Value
- `macros[].restriction`: Restriction
- `macros[].raw_title`: Raw Title
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_preview_macro_on_ticket`

**Preview Macro on Ticket.** Computes the changes a macro would make to one ticket, including the rendered comment text, without saving anything. To apply it, pass the returned ticket fields and comment to Update Ticket and Add Ticket Comment. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |
| `macro_id` | string | yes |  | Macro ID. Numeric macro ID, from List Macros or Search Macros. |

Output fields:

- `ticket`: Ticket
- `ticket.url`: URL (url)
- `ticket.id`: ID (number)
- `ticket.external_id`: External ID
- `ticket.via`: Via
- `ticket.via.channel`: Channel
- `ticket.via.source`: Source
- `ticket.via.source.from`: From
- `ticket.via.source.to`: To
- `ticket.via.source.rel`: Rel
- `ticket.created_at`: Created At (datetime)
- `ticket.updated_at`: Updated At (datetime)
- `ticket.type`: Type
- `ticket.subject`: Subject
- `ticket.raw_subject`: Raw Subject (with placeholders)
- `ticket.description`: Description
- `ticket.priority`: Priority
- `ticket.status`: Status
- `ticket.recipient`: Recipient
- `ticket.requester_id`: Requester ID (number)
- `ticket.submitter_id`: Submitter ID (number)
- `ticket.assignee_id`: Assignee ID (number)
- `ticket.organization_id`: Organization ID (number)
- `ticket.group_id`: Group ID (number)
- `ticket.collaborator_ids`: Collaborator IDs
- `ticket.follower_ids`: Follower IDs
- `ticket.email_cc_ids`: Email CC IDs
- `ticket.forum_topic_id`: Forum Topic ID
- `ticket.problem_id`: Problem ID
- `ticket.has_incidents`: Has Incidents (boolean)
- `ticket.is_public`: Is Public (boolean)
- `ticket.due_at`: Due At (datetime)
- `ticket.tags`: Tags
- `ticket.custom_fields`: Custom Fields
- `ticket.custom_fields[].id`: ID (number)
- `ticket.custom_fields[].value`: Value
- `ticket.satisfaction_rating`: Satisfaction Rating
- `ticket.satisfaction_rating.score`: Score
- `ticket.sharing_agreement_ids`: Sharing Agreement IDs
- `ticket.custom_status_id`: Custom Status ID (number)
- `ticket.followup_ids`: Followup IDs
- `ticket.ticket_form_id`: Ticket Form ID (number)
- `ticket.brand_id`: Brand ID (number)
- `ticket.allow_channelback`: Allow Channelback (boolean)
- `ticket.allow_attachments`: Allow Attachments (boolean)
- `ticket.from_messaging_channel`: From Messaging Channel (boolean)
- `ticket.support_type`: Support Type

### `zendesk_search_macros`

**Search Macros.** Finds macros whose title matches the query. Use the returned macro ID with Get Macro or Preview Macro on Ticket. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Text to match against macro titles. |
| `active` | string | no |  | Active. Filter by active (Yes) or inactive (No). Omit for both. One of `"true"`, `"false"`. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `page` | number | no |  | Page. Page number, starting at 1. Pass next_page from a previous call. |

Output fields:

- `macros`: Macros
- `macros[].url`: URL (url)
- `macros[].id`: ID (number)
- `macros[].title`: Title
- `macros[].active`: Active (boolean)
- `macros[].updated_at`: Updated At (datetime)
- `macros[].created_at`: Created At (datetime)
- `macros[].default`: Default (boolean)
- `macros[].position`: Position (number)
- `macros[].description`: Description
- `macros[].actions`: Actions
- `macros[].actions[].field`: Field
- `macros[].actions[].value`: Value
- `macros[].restriction`: Restriction
- `macros[].raw_title`: Raw Title
- `macros[].highlights`: Highlights
- `macros[].highlights.title`: Title
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_page`: Next Page

### `zendesk_add_organization_tags`

**Add Organization Tags.** Adds tags to one organization and keeps the tags already on it; re-adding an existing tag changes nothing. Returns the full tag list. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization ID. Numeric organization ID, from Search Organizations or List Organizations. |
| `tags` | array | yes |  | Tags. Tags to add; tags are lowercase and cannot contain spaces. |

Output fields:

- `tags`: Tags
- `count`: Count (number)

### `zendesk_create_or_update_organization`

**Create or Update Organization.** Upserts one organization: Zendesk matches an existing organization by External ID and updates the given fields, otherwise creates it with Name. created is true when a new organization was made. Safe to retry. Use Update Organization when you already hold the organization ID. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Unique organization name. |
| `external_id` | string | no |  | External ID. Your own reference for the organization. |
| `domain_names` | array | no |  | Domain Names. Email domains; new end users with these domains join the organization. Replaces the existing list; an empty list is ignored. |
| `group_id` | string | no |  | Group ID. Group that new tickets from this organization go to, from List Groups. |
| `details` | string | no |  | Details. Details such as an address. |
| `notes` | string | no |  | Notes. Internal notes visible to agents. |
| `tags` | array | no |  | Tags. Replaces every tag on the organization; an empty list is ignored. Prefer Add Organization Tags or Remove Organization Tags on existing ones, which also clear tags. |
| `organization_fields` | JSON | no |  | Organization Fields. Object of custom organization field keys to values, keys from List Organization Fields. |
| `shared_tickets` | string | no |  | Shared Tickets. Whether members can see each other tickets. One of `"true"`, `"false"`. |
| `shared_comments` | string | no |  | Shared Comments. Whether members can comment on each other tickets. One of `"true"`, `"false"`. |
| `additional_fields` | JSON | no |  | Additional Fields. Other organization attributes from the Zendesk Organizations API, or null values to clear fields. |

Output fields:

- `created`: Created (boolean)
- `organization`: Organization
- `organization.url`: URL (url)
- `organization.id`: ID (number)
- `organization.name`: Name
- `organization.shared_tickets`: Shared Tickets (boolean)
- `organization.shared_comments`: Shared Comments (boolean)
- `organization.ticket_restriction`: Ticket Restriction
- `organization.external_id`: External ID
- `organization.created_at`: Created At (datetime)
- `organization.updated_at`: Updated At (datetime)
- `organization.domain_names`: Domain Names
- `organization.details`: Details
- `organization.notes`: Notes
- `organization.group_id`: Group ID
- `organization.tags`: Tags
- `organization.organization_fields`: Organization Fields
- `organization.children_count`: Children Count (number)

### `zendesk_create_organization_membership`

**Create Organization Membership.** Adds a user to an organization. Users can belong to several organizations only when the account allows it; otherwise use Update User with Organization ID. Fails with 422 when the membership already exists. Remove it with Delete Organization Membership. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users. |
| `organization_id` | string | yes |  | Organization ID. Numeric organization ID, from Search Organizations. |
| `default` | string | no |  | Default. Make this the user default organization for new tickets. One of `"true"`, `"false"`. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `user_id`: User ID (number)
- `organization_id`: Organization ID (number)
- `default`: Default (boolean)
- `created_at`: Created At (datetime)
- `organization_name`: Organization Name
- `updated_at`: Updated At (datetime)
- `view_tickets`: View Tickets (boolean)

### `zendesk_create_organization`

**Create Organization.** Creates one organization. Fails with 422 when the name is already taken, so use Create or Update Organization to avoid duplicates, or Search Organizations first. Not idempotent. Requires an admin or an agent allowed to manage organizations. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Unique organization name. |
| `external_id` | string | no |  | External ID. Your own reference for the organization. |
| `domain_names` | array | no |  | Domain Names. Email domains; new end users with these domains join the organization. Replaces the existing list; an empty list is ignored. |
| `group_id` | string | no |  | Group ID. Group that new tickets from this organization go to, from List Groups. |
| `details` | string | no |  | Details. Details such as an address. |
| `notes` | string | no |  | Notes. Internal notes visible to agents. |
| `tags` | array | no |  | Tags. Replaces every tag on the organization; an empty list is ignored. Prefer Add Organization Tags or Remove Organization Tags on existing ones, which also clear tags. |
| `organization_fields` | JSON | no |  | Organization Fields. Object of custom organization field keys to values, keys from List Organization Fields. |
| `shared_tickets` | string | no |  | Shared Tickets. Whether members can see each other tickets. One of `"true"`, `"false"`. |
| `shared_comments` | string | no |  | Shared Comments. Whether members can comment on each other tickets. One of `"true"`, `"false"`. |
| `additional_fields` | JSON | no |  | Additional Fields. Other organization attributes from the Zendesk Organizations API, or null values to clear fields. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `name`: Name
- `shared_tickets`: Shared Tickets (boolean)
- `shared_comments`: Shared Comments (boolean)
- `ticket_restriction`: Ticket Restriction
- `external_id`: External ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `domain_names`: Domain Names
- `details`: Details
- `notes`: Notes
- `group_id`: Group ID
- `tags`: Tags
- `organization_fields`: Organization Fields
- `children_count`: Children Count (number)

### `zendesk_delete_organization_membership`

**Delete Organization Membership.** Removes a user from an organization by deleting the membership; the user and organization remain. The membership ID comes from List Organization Memberships. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_membership_id` | string | yes |  | Organization Membership ID. Numeric membership ID, from List Organization Memberships. |

Output fields:

- `success`: Success (boolean)
- `organization_membership_id`: Organization Membership ID (number)

### `zendesk_delete_organization`

**Delete Organization.** Permanently deletes one organization; its users and tickets remain but lose the association. Cannot be undone. Requires an admin. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization ID. Numeric organization ID, from Search Organizations or List Organizations. |

Output fields:

- `success`: Success (boolean)
- `organization_id`: Organization ID (number)

### `zendesk_get_organization_tags`

**Get Organization Tags.** Lists the tags on one organization. Change them with Add Organization Tags or Remove Organization Tags. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization ID. Numeric organization ID, from Search Organizations or List Organizations. |

Output fields:

- `tags`: Tags
- `count`: Count (number)

### `zendesk_get_organization`

**Get Organization.** Fetches one organization by numeric ID, with domain names, group, notes, tags and organization fields. Use Search Organizations to find one by name or external ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization ID. Numeric organization ID, from Search Organizations or List Organizations. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `name`: Name
- `shared_tickets`: Shared Tickets (boolean)
- `shared_comments`: Shared Comments (boolean)
- `ticket_restriction`: Ticket Restriction
- `external_id`: External ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `domain_names`: Domain Names
- `details`: Details
- `notes`: Notes
- `group_id`: Group ID
- `tags`: Tags
- `organization_fields`: Organization Fields
- `children_count`: Children Count (number)

### `zendesk_list_organization_memberships`

**List Organization Memberships.** Lists organization memberships, each linking a user to an organization and flagging the default one. Pass User ID for one user organizations, or Organization ID for one organization members; omit both for the whole account. Membership IDs feed Delete Organization Membership. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | no |  | User ID. Only memberships of this user. |
| `organization_id` | string | no |  | Organization ID. Only memberships of this organization. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `organization_memberships`: Organization Memberships
- `organization_memberships[].url`: URL (url)
- `organization_memberships[].id`: ID (number)
- `organization_memberships[].user_id`: User ID (number)
- `organization_memberships[].organization_id`: Organization ID (number)
- `organization_memberships[].default`: Default (boolean)
- `organization_memberships[].created_at`: Created At (datetime)
- `organization_memberships[].organization_name`: Organization Name
- `organization_memberships[].updated_at`: Updated At (datetime)
- `organization_memberships[].view_tickets`: View Tickets (boolean)
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_organization_users`

**List Organization Users.** Lists the users that belong to one organization, optionally only one role. Use List Organization Memberships for the membership records and their IDs. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization ID. Numeric organization ID, from Search Organizations or List Organizations. |
| `role` | string | no |  | Role. Only return users with this role. One of `"end-user"`, `"agent"`, `"admin"`. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `users`: Users
- `users[].id`: ID (number)
- `users[].url`: URL (url)
- `users[].name`: Name
- `users[].email`: Email (email)
- `users[].created_at`: Created At (datetime)
- `users[].updated_at`: Updated At (datetime)
- `users[].time_zone`: Time Zone
- `users[].iana_time_zone`: Iana Time Zone
- `users[].phone`: Phone
- `users[].shared_phone_number`: Shared Phone Number
- `users[].photo`: Photo
- `users[].locale_id`: Locale ID (number)
- `users[].locale`: Locale
- `users[].organization_id`: Organization ID (number)
- `users[].role`: Role
- `users[].verified`: Verified (boolean)
- `users[].external_id`: External ID
- `users[].tags`: Tags
- `users[].alias`: Alias
- `users[].active`: Active (boolean)
- `users[].shared`: Shared (boolean)
- `users[].shared_agent`: Shared Agent (boolean)
- `users[].last_login_at`: Last Login At (datetime)
- `users[].two_factor_auth_enabled`: Two Factor Auth Enabled
- `users[].signature`: Signature
- `users[].details`: Details
- `users[].notes`: Notes
- `users[].role_type`: Role Type (number)
- `users[].custom_role_id`: Custom Role ID (number)
- `users[].is_billing_admin`: Is Billing Admin (boolean)
- `users[].moderator`: Moderator (boolean)
- `users[].ticket_restriction`: Ticket Restriction
- `users[].only_private_comments`: Only Private Comments (boolean)
- `users[].restricted_agent`: Restricted Agent (boolean)
- `users[].suspended`: Suspended (boolean)
- `users[].default_group_id`: Default Group ID (number)
- `users[].report_csv`: Report CSV (boolean)
- `users[].user_fields`: User Fields
- `users[].suspension_details`: Suspension Details
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_organizations`

**List Organizations.** Lists organizations one page at a time. Use Search Organizations to find one by name or external ID. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `organizations`: Organizations
- `organizations[].url`: URL (url)
- `organizations[].id`: ID (number)
- `organizations[].name`: Name
- `organizations[].shared_tickets`: Shared Tickets (boolean)
- `organizations[].shared_comments`: Shared Comments (boolean)
- `organizations[].ticket_restriction`: Ticket Restriction
- `organizations[].external_id`: External ID
- `organizations[].created_at`: Created At (datetime)
- `organizations[].updated_at`: Updated At (datetime)
- `organizations[].domain_names`: Domain Names
- `organizations[].details`: Details
- `organizations[].notes`: Notes
- `organizations[].group_id`: Group ID
- `organizations[].tags`: Tags
- `organizations[].organization_fields`: Organization Fields
- `organizations[].children_count`: Children Count (number)
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_remove_organization_tags`

**Remove Organization Tags.** Removes the given tags from one organization and keeps the rest; tags not on it are ignored. Returns the remaining tag list. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization ID. Numeric organization ID, from Search Organizations or List Organizations. |
| `tags` | array | yes |  | Tags. Tags to remove; tags are lowercase and cannot contain spaces. |

Output fields:

- `tags`: Tags
- `count`: Count (number)

### `zendesk_search_organizations`

**Search Organizations.** Finds organizations by exact name or exact external ID; pass one of the two. Use Search with type:organization for partial or attribute matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Exact organization name. |
| `external_id` | string | no |  | External ID. Exact organization external ID. |

Output fields:

- `organizations`: Organizations
- `organizations[].url`: URL (url)
- `organizations[].id`: ID (number)
- `organizations[].name`: Name
- `organizations[].shared_tickets`: Shared Tickets (boolean)
- `organizations[].shared_comments`: Shared Comments (boolean)
- `organizations[].ticket_restriction`: Ticket Restriction
- `organizations[].external_id`: External ID
- `organizations[].created_at`: Created At (datetime)
- `organizations[].updated_at`: Updated At (datetime)
- `organizations[].domain_names`: Domain Names
- `organizations[].details`: Details
- `organizations[].notes`: Notes
- `organizations[].group_id`: Group ID
- `organizations[].tags`: Tags
- `organizations[].organization_fields`: Organization Fields
- `organizations[].children_count`: Children Count (number)
- `count`: Count (number)

### `zendesk_update_organization`

**Update Organization.** Updates one organization by ID; omitted fields keep their values. Tags and Domain Names replace the whole list, so prefer Add Organization Tags or Remove Organization Tags for tags. Requires an admin or an agent allowed to manage organizations. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization ID. Numeric organization ID, from Search Organizations or List Organizations. |
| `name` | string | no |  | Name. Unique organization name. |
| `external_id` | string | no |  | External ID. Your own reference for the organization. |
| `domain_names` | array | no |  | Domain Names. Email domains; new end users with these domains join the organization. Replaces the existing list; an empty list is ignored. |
| `group_id` | string | no |  | Group ID. Group that new tickets from this organization go to, from List Groups. |
| `details` | string | no |  | Details. Details such as an address. |
| `notes` | string | no |  | Notes. Internal notes visible to agents. |
| `tags` | array | no |  | Tags. Replaces every tag on the organization; an empty list is ignored. Prefer Add Organization Tags or Remove Organization Tags on existing ones, which also clear tags. |
| `organization_fields` | JSON | no |  | Organization Fields. Object of custom organization field keys to values, keys from List Organization Fields. |
| `shared_tickets` | string | no |  | Shared Tickets. Whether members can see each other tickets. One of `"true"`, `"false"`. |
| `shared_comments` | string | no |  | Shared Comments. Whether members can comment on each other tickets. One of `"true"`, `"false"`. |
| `additional_fields` | JSON | no |  | Additional Fields. Other organization attributes from the Zendesk Organizations API, or null values to clear fields. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `name`: Name
- `shared_tickets`: Shared Tickets (boolean)
- `shared_comments`: Shared Comments (boolean)
- `ticket_restriction`: Ticket Restriction
- `external_id`: External ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `domain_names`: Domain Names
- `details`: Details
- `notes`: Notes
- `group_id`: Group ID
- `tags`: Tags
- `organization_fields`: Organization Fields
- `children_count`: Children Count (number)

### `zendesk_count_search_results`

**Count Search Results.** Returns how many tickets, users or organizations match a Zendesk search query, using the same syntax as Search (e.g. "type:ticket status:open"). Use it to size a result before paging through Search. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Zendesk search query, e.g. type:ticket status:open tags:vip. |

Output fields:

- `count`: Count (number)

### `zendesk_count_view_tickets`

**Count View Tickets.** Returns the number of tickets in one view. Counts are cached by Zendesk and can be a few minutes old; fresh is false while a new count is computed. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `view_id` | string | yes |  | View ID. Numeric view ID from List Views, or incoming, my or my_groups. |

Output fields:

- `url`: URL (url)
- `view_id`: View ID (number)
- `value`: Value (number)
- `pretty`: Pretty
- `fresh`: Fresh (boolean)

### `zendesk_list_view_tickets`

**List View Tickets.** Lists the tickets currently matching one view, in the view sort order. View IDs come from List Views; the built-in views incoming, my and my_groups also work. Use Search for ad-hoc filters. Pass next_cursor back as Cursor while has_more is true. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `view_id` | string | yes |  | View ID. Numeric view ID from List Views, or incoming, my or my_groups. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `tickets`: Tickets
- `tickets[].url`: URL (url)
- `tickets[].id`: ID (number)
- `tickets[].external_id`: External ID
- `tickets[].via`: Via
- `tickets[].via.channel`: Channel
- `tickets[].via.source`: Source
- `tickets[].via.source.from`: From
- `tickets[].via.source.to`: To
- `tickets[].via.source.rel`: Rel
- `tickets[].created_at`: Created At (datetime)
- `tickets[].updated_at`: Updated At (datetime)
- `tickets[].type`: Type
- `tickets[].subject`: Subject
- `tickets[].raw_subject`: Raw Subject (with placeholders)
- `tickets[].description`: Description
- `tickets[].priority`: Priority
- `tickets[].status`: Status
- `tickets[].recipient`: Recipient
- `tickets[].requester_id`: Requester ID (number)
- `tickets[].submitter_id`: Submitter ID (number)
- `tickets[].assignee_id`: Assignee ID (number)
- `tickets[].organization_id`: Organization ID (number)
- `tickets[].group_id`: Group ID (number)
- `tickets[].collaborator_ids`: Collaborator IDs
- `tickets[].follower_ids`: Follower IDs
- `tickets[].email_cc_ids`: Email CC IDs
- `tickets[].forum_topic_id`: Forum Topic ID
- `tickets[].problem_id`: Problem ID
- `tickets[].has_incidents`: Has Incidents (boolean)
- `tickets[].is_public`: Is Public (boolean)
- `tickets[].due_at`: Due At (datetime)
- `tickets[].tags`: Tags
- `tickets[].custom_fields`: Custom Fields
- `tickets[].custom_fields[].id`: ID (number)
- `tickets[].custom_fields[].value`: Value
- `tickets[].satisfaction_rating`: Satisfaction Rating
- `tickets[].satisfaction_rating.score`: Score
- `tickets[].sharing_agreement_ids`: Sharing Agreement IDs
- `tickets[].custom_status_id`: Custom Status ID (number)
- `tickets[].followup_ids`: Followup IDs
- `tickets[].ticket_form_id`: Ticket Form ID (number)
- `tickets[].brand_id`: Brand ID (number)
- `tickets[].allow_channelback`: Allow Channelback (boolean)
- `tickets[].allow_attachments`: Allow Attachments (boolean)
- `tickets[].from_messaging_channel`: From Messaging Channel (boolean)
- `tickets[].support_type`: Support Type
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_views`

**List Views.** Lists ticket views, the saved ticket filters agents work from, with their conditions. Use a view ID with List View Tickets or Count View Tickets. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `active` | string | no |  | Active. Filter by active (Yes) or inactive (No). Omit for both. One of `"true"`, `"false"`. |
| `access` | string | no |  | Access. Only return views with this visibility. One of `"personal"`, `"shared"`, `"account"`. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `views`: Views
- `views[].url`: URL (url)
- `views[].id`: ID (number)
- `views[].title`: Title
- `views[].active`: Active (boolean)
- `views[].updated_at`: Updated At (datetime)
- `views[].created_at`: Created At (datetime)
- `views[].default`: Default (boolean)
- `views[].position`: Position (number)
- `views[].description`: Description
- `views[].execution`: Execution
- `views[].execution.group_by`: Group By
- `views[].execution.group_order`: Group Order
- `views[].execution.sort_by`: Sort By
- `views[].execution.sort_order`: Sort Order
- `views[].execution.group`: Group
- `views[].execution.group.id`: ID
- `views[].execution.group.title`: Title
- `views[].execution.group.filterable`: Filterable (boolean)
- `views[].execution.group.sortable`: Sortable (boolean)
- `views[].execution.group.order`: Order
- `views[].execution.sort`: Sort
- `views[].execution.sort.id`: ID
- `views[].execution.sort.title`: Title
- `views[].execution.sort.filterable`: Filterable (boolean)
- `views[].execution.sort.sortable`: Sortable (boolean)
- `views[].execution.sort.order`: Order
- `views[].execution.columns`: Columns
- `views[].execution.columns[].id`: ID
- `views[].execution.columns[].title`: Title
- `views[].execution.columns[].filterable`: Filterable (boolean)
- `views[].execution.columns[].sortable`: Sortable (boolean)
- `views[].execution.fields`: Fields
- `views[].execution.fields[].id`: ID
- `views[].execution.fields[].title`: Title
- `views[].execution.fields[].filterable`: Filterable (boolean)
- `views[].execution.fields[].sortable`: Sortable (boolean)
- `views[].execution.custom_fields`: Custom Fields
- `views[].conditions`: Conditions
- `views[].conditions.all`: All
- `views[].conditions.all[].field`: Field
- `views[].conditions.all[].operator`: Operator
- `views[].conditions.all[].value`: Value
- `views[].conditions.any`: Any
- `views[].restriction`: Restriction
- `views[].raw_title`: Raw Title
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_search`

**Search.** Searches tickets, users and organizations with Zendesk search syntax, e.g. "type:ticket status<solved requester:jane@acme.com", "type:ticket tags:vip created>2026-01-01" or "type:organization name:Acme*". Always include type: to get one kind of record; each result has result_type. Returns at most 1000 results in total; narrow the query instead of paging deeper. The index lags writes by a few minutes, so use Get Ticket for a just-created record. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Zendesk search query, e.g. type:ticket status:open assignee:me. |
| `sort_by` | string | no |  | Sort By. Defaults to relevance. One of `"updated_at"`, `"created_at"`, `"priority"`, `"status"`, `"ticket_type"`. |
| `sort_order` | string | no |  | Sort Order. asc for oldest first (default), desc for newest first. One of `"asc"`, `"desc"`. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `page` | number | no |  | Page. Page number, starting at 1. Pass next_page from a previous call. |

Output fields:

- `results`: Results
- `results[].id`: ID (number)
- `results[].result_type`: Result Type
- `results[].url`: API URL (url)
- `results[].created_at`: Created At (datetime)
- `results[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `total_count`: Total Count (number)
- `has_more`: Has More (boolean)
- `next_page`: Next Page (number)

### `zendesk_add_ticket_comment`

**Add Ticket Comment.** Adds a comment to a ticket: a public reply emailed to the requester, or an internal note when Public is false. Optionally sets the ticket status in the same update, e.g. pending after asking the customer a question. Not idempotent: every call appends another comment, so check List Ticket Comments before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |
| `body` | string | yes |  | Comment Body. |
| `is_html` | boolean | no |  | Comment Is HTML. Send Comment Body as HTML instead of plain text. |
| `public` | string | no |  | Public. Yes (default) replies to the requester; No adds an internal note only agents see. One of `"true"`, `"false"`. |
| `author_id` | string | no |  | Author ID. User ID to post as. Defaults to the connected user. |
| `status` | string | no |  | Status. Optional status to set together with the comment. One of `"new"`, `"open"`, `"pending"`, `"hold"`, `"solved"`, `"closed"`. |

Output fields:

- `ticket`: Ticket
- `ticket.url`: URL (url)
- `ticket.id`: ID (number)
- `ticket.external_id`: External ID
- `ticket.via`: Via
- `ticket.via.channel`: Channel
- `ticket.via.source`: Source
- `ticket.via.source.from`: From
- `ticket.via.source.to`: To
- `ticket.via.source.rel`: Rel
- `ticket.created_at`: Created At (datetime)
- `ticket.updated_at`: Updated At (datetime)
- `ticket.type`: Type
- `ticket.subject`: Subject
- `ticket.raw_subject`: Raw Subject (with placeholders)
- `ticket.description`: Description
- `ticket.priority`: Priority
- `ticket.status`: Status
- `ticket.recipient`: Recipient
- `ticket.requester_id`: Requester ID (number)
- `ticket.submitter_id`: Submitter ID (number)
- `ticket.assignee_id`: Assignee ID (number)
- `ticket.organization_id`: Organization ID (number)
- `ticket.group_id`: Group ID (number)
- `ticket.collaborator_ids`: Collaborator IDs
- `ticket.follower_ids`: Follower IDs
- `ticket.email_cc_ids`: Email CC IDs
- `ticket.forum_topic_id`: Forum Topic ID
- `ticket.problem_id`: Problem ID
- `ticket.has_incidents`: Has Incidents (boolean)
- `ticket.is_public`: Is Public (boolean)
- `ticket.due_at`: Due At (datetime)
- `ticket.tags`: Tags
- `ticket.custom_fields`: Custom Fields
- `ticket.custom_fields[].id`: ID (number)
- `ticket.custom_fields[].value`: Value
- `ticket.satisfaction_rating`: Satisfaction Rating
- `ticket.satisfaction_rating.score`: Score
- `ticket.sharing_agreement_ids`: Sharing Agreement IDs
- `ticket.custom_status_id`: Custom Status ID (number)
- `ticket.followup_ids`: Followup IDs
- `ticket.ticket_form_id`: Ticket Form ID (number)
- `ticket.brand_id`: Brand ID (number)
- `ticket.allow_channelback`: Allow Channelback (boolean)
- `ticket.allow_attachments`: Allow Attachments (boolean)
- `ticket.from_messaging_channel`: From Messaging Channel (boolean)
- `ticket.support_type`: Support Type
- `audit`: Audit
- `audit.id`: ID (number)
- `audit.ticket_id`: Ticket ID (number)
- `audit.created_at`: Created At (datetime)
- `audit.author_id`: Author ID (number)
- `audit.metadata`: Metadata
- `audit.metadata.system`: System
- `audit.metadata.system.client`: Client
- `audit.metadata.system.ip_address`: IP Address
- `audit.metadata.system.transaction_id`: Transaction ID
- `audit.metadata.system.location`: Location
- `audit.metadata.system.latitude`: Latitude (number)
- `audit.metadata.system.longitude`: Longitude (number)
- `audit.metadata.custom`: Custom
- `audit.events`: Events
- `audit.events[].id`: ID (number)
- `audit.events[].type`: Type
- `audit.events[].author_id`: Author ID (number)
- `audit.events[].body`: Body
- `audit.events[].html_body`: HTML Body
- `audit.events[].plain_body`: Plain Body
- `audit.events[].public`: Public (boolean)
- `audit.events[].attachments`: Attachments
- `audit.events[].audit_id`: Audit ID (number)
- `audit.events[].via`: Via
- `audit.events[].via.channel`: Channel
- `audit.events[].via.source`: Source
- `audit.events[].via.source.from`: From
- `audit.events[].via.source.rel`: Rel
- `audit.events[].subject`: Subject
- `audit.events[].recipients`: Recipients
- `audit.via`: Via
- `audit.via.channel`: Channel
- `audit.via.source`: Source
- `audit.via.source.from`: From
- `audit.via.source.to`: To
- `audit.via.source.to.address`: Address (email)
- `audit.via.source.to.name`: Name
- `audit.via.source.to.email_ccs`: Email Ccs
- `audit.via.source.rel`: Rel

### `zendesk_add_ticket_tags`

**Add Ticket Tags.** Adds tags to one ticket and keeps the tags already on it; re-adding an existing tag changes nothing. Returns the full tag list. Update Ticket with Tags replaces the whole set instead. Pass Updated Stamp to fail with 409 rather than race a concurrent change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |
| `tags` | array | yes |  | Tags. Tags to add; tags are lowercase and cannot contain spaces. |
| `updated_stamp` | string | no |  | Updated Stamp. The updated_at value read from Get Ticket; enables safe update so a concurrent change returns 409. |

Output fields:

- `tags`: Tags
- `count`: Count (number)

### `zendesk_create_many_tickets`

**Create Many Tickets.** Queues a background job that creates up to 100 tickets and returns the job status, not the tickets. Poll Get Job Status with the returned id until status is completed; its results list the new ticket IDs. Each ticket object needs a comment, e.g. {"subject": "...", "comment": {"body": "..."}, "requester": {"email": "..."}}. Not idempotent. Use Create Ticket for a single ticket. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tickets` | JSON | yes |  | Tickets. JSON array of up to 100 ticket objects in the Zendesk Tickets API format. |

Output fields:

- `id`: ID
- `job_type`: Job Type
- `url`: URL (url)
- `total`: Total (number)
- `progress`: Progress
- `status`: Status
- `message`: Message
- `results`: Results

### `zendesk_create_ticket`

**Create Ticket.** Creates one Zendesk ticket whose first comment becomes its description. Identify the requester by Requester ID (from Search Users) or by Requester Email, which Zendesk creates as a new end user when no user has that email. Use Create Many Tickets for bulk creation. Not idempotent: each call creates a new ticket, so pass External ID and check with List Tickets before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_body` | string | yes |  | Comment Body. The first comment, which becomes the ticket description. |
| `comment_is_html` | boolean | no |  | Comment Is HTML. Send Comment Body as HTML instead of plain text. |
| `comment_public` | string | no |  | Public Comment. Whether the requester can see the first comment. Defaults to public. One of `"true"`, `"false"`. |
| `subject` | string | no |  | Subject. |
| `requester_id` | string | no |  | Requester ID. User ID of the requester, from Search Users. Do not combine with Requester Email. |
| `requester_email` | string | no |  | Requester Email. Email of the requester; Zendesk creates the end user if none exists. Do not combine with Requester ID. |
| `requester_name` | string | no |  | Requester Name. Name used when Requester Email creates a new end user. |
| `assignee_id` | string | no |  | Assignee ID. Agent user ID, from List Users with role agent or List Group Users. |
| `group_id` | string | no |  | Group ID. Group ID, from List Groups. |
| `organization_id` | string | no |  | Organization ID. Organization ID, from Search Organizations. |
| `status` | string | no |  | Status. Initial status. Defaults to new, or open when an assignee is set. One of `"new"`, `"open"`, `"pending"`, `"hold"`, `"solved"`, `"closed"`. |
| `priority` | string | no |  | Priority. One of `"low"`, `"normal"`, `"high"`, `"urgent"`. |
| `type` | string | no |  | Type. incident requires Problem ID to link it to a problem ticket. One of `"question"`, `"incident"`, `"problem"`, `"task"`. |
| `problem_id` | string | no |  | Problem ID. For type incident: the problem ticket ID, from List Problem Tickets. |
| `due_at` | ISO date-time string | no |  | Due At. Due date, only valid for type task. |
| `tags` | array | no |  | Tags. |
| `external_id` | string | no |  | External ID. Your own reference for the ticket, searchable with List Tickets. |
| `brand_id` | string | no |  | Brand ID. Brand ID, from List Brands. |
| `ticket_form_id` | string | no |  | Ticket Form ID. Ticket form ID, from List Ticket Forms. |
| `custom_fields` | JSON | no |  | Custom Fields. Array of {"id": <ticket field ID from List Ticket Fields>, "value": <value>}. |
| `additional_fields` | JSON | no |  | Additional Fields. Other ticket attributes from the Zendesk Tickets API, e.g. {"email_ccs": [{"user_email": "a@b.com"}]}. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `external_id`: External ID
- `via`: Via
- `via.channel`: Channel
- `via.source`: Source
- `via.source.from`: From
- `via.source.to`: To
- `via.source.rel`: Rel
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `type`: Type
- `subject`: Subject
- `raw_subject`: Raw Subject (with placeholders)
- `description`: Description
- `priority`: Priority
- `status`: Status
- `recipient`: Recipient
- `requester_id`: Requester ID (number)
- `submitter_id`: Submitter ID (number)
- `assignee_id`: Assignee ID (number)
- `organization_id`: Organization ID (number)
- `group_id`: Group ID (number)
- `collaborator_ids`: Collaborator IDs
- `follower_ids`: Follower IDs
- `email_cc_ids`: Email CC IDs
- `forum_topic_id`: Forum Topic ID
- `problem_id`: Problem ID
- `has_incidents`: Has Incidents (boolean)
- `is_public`: Is Public (boolean)
- `due_at`: Due At (datetime)
- `tags`: Tags
- `custom_fields`: Custom Fields
- `custom_fields[].id`: ID (number)
- `custom_fields[].value`: Value
- `satisfaction_rating`: Satisfaction Rating
- `satisfaction_rating.score`: Score
- `sharing_agreement_ids`: Sharing Agreement IDs
- `custom_status_id`: Custom Status ID (number)
- `followup_ids`: Followup IDs
- `ticket_form_id`: Ticket Form ID (number)
- `brand_id`: Brand ID (number)
- `allow_channelback`: Allow Channelback (boolean)
- `allow_attachments`: Allow Attachments (boolean)
- `from_messaging_channel`: From Messaging Channel (boolean)
- `support_type`: Support Type

### `zendesk_delete_ticket`

**Delete Ticket.** Soft-deletes one ticket: it moves to deleted tickets for 30 days and can be brought back with Restore Ticket until Zendesk purges it. Requires an admin or an agent with permission to delete tickets. Use Mark Tickets as Spam instead for spam, which also suspends the requester. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |

Output fields:

- `success`: Success (boolean)
- `ticket_id`: Ticket ID (number)

### `zendesk_get_attachment`

**Get Attachment.** Fetches one attachment by ID, with file name, content type, size, malware scan result and content_url to download it. Attachment IDs come from the attachments of List Ticket Comments. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachment_id` | string | yes |  | Attachment ID. Numeric attachment ID, from List Ticket Comments. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `file_name`: File Name
- `content_url`: Content URL (url)
- `mapped_content_url`: Mapped Content URL (url)
- `content_type`: Content Type
- `size`: Size (filesize)
- `width`: Width
- `height`: Height
- `inline`: Inline (boolean)
- `deleted`: Deleted (boolean)
- `malware_access_override`: Malware Access Override (boolean)
- `malware_scan_result`: Malware Scan Result
- `thumbnails`: Thumbnails

### `zendesk_get_job_status`

**Get Job Status.** Reads the status of a background job started by Create Many Tickets, Update Many Tickets, Merge Tickets or Mark Tickets as Spam: queued, working, completed, failed or killed, with per-item results once completed. Call again later while the status is queued or working; job statuses expire after about an hour. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_status_id` | string | yes |  | Job Status ID. The id returned by a bulk or merge action. |

Output fields:

- `id`: ID
- `job_type`: Job Type
- `url`: URL (url)
- `total`: Total (number)
- `progress`: Progress (number)
- `status`: Status
- `message`: Message
- `results`: Results
- `results[].index`: Index (number)
- `results[].id`: ID (number)
- `results[].account_id`: Account ID (number)

### `zendesk_get_many_tickets`

**Get Many Tickets.** Fetches up to 100 tickets by numeric ID in a single request. Prefer it over repeated Get Ticket calls. IDs that do not exist or are deleted are silently left out, so compare count with the number of IDs requested. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_ids` | array | yes |  | Ticket IDs. Up to 100 numeric ticket IDs. |

Output fields:

- `tickets`: Tickets
- `tickets[].url`: URL (url)
- `tickets[].id`: ID (number)
- `tickets[].external_id`: External ID
- `tickets[].via`: Via
- `tickets[].via.channel`: Channel
- `tickets[].via.source`: Source
- `tickets[].via.source.from`: From
- `tickets[].via.source.to`: To
- `tickets[].via.source.rel`: Rel
- `tickets[].created_at`: Created At (datetime)
- `tickets[].updated_at`: Updated At (datetime)
- `tickets[].type`: Type
- `tickets[].subject`: Subject
- `tickets[].raw_subject`: Raw Subject (with placeholders)
- `tickets[].description`: Description
- `tickets[].priority`: Priority
- `tickets[].status`: Status
- `tickets[].recipient`: Recipient
- `tickets[].requester_id`: Requester ID (number)
- `tickets[].submitter_id`: Submitter ID (number)
- `tickets[].assignee_id`: Assignee ID (number)
- `tickets[].organization_id`: Organization ID (number)
- `tickets[].group_id`: Group ID (number)
- `tickets[].collaborator_ids`: Collaborator IDs
- `tickets[].follower_ids`: Follower IDs
- `tickets[].email_cc_ids`: Email CC IDs
- `tickets[].forum_topic_id`: Forum Topic ID
- `tickets[].problem_id`: Problem ID
- `tickets[].has_incidents`: Has Incidents (boolean)
- `tickets[].is_public`: Is Public (boolean)
- `tickets[].due_at`: Due At (datetime)
- `tickets[].tags`: Tags
- `tickets[].custom_fields`: Custom Fields
- `tickets[].custom_fields[].id`: ID (number)
- `tickets[].custom_fields[].value`: Value
- `tickets[].satisfaction_rating`: Satisfaction Rating
- `tickets[].satisfaction_rating.score`: Score
- `tickets[].sharing_agreement_ids`: Sharing Agreement IDs
- `tickets[].custom_status_id`: Custom Status ID (number)
- `tickets[].followup_ids`: Followup IDs
- `tickets[].ticket_form_id`: Ticket Form ID (number)
- `tickets[].brand_id`: Brand ID (number)
- `tickets[].allow_channelback`: Allow Channelback (boolean)
- `tickets[].allow_attachments`: Allow Attachments (boolean)
- `tickets[].from_messaging_channel`: From Messaging Channel (boolean)
- `tickets[].support_type`: Support Type
- `count`: Count (number)

### `zendesk_get_ticket_conversation_log`

**Get Ticket Conversation Log.** Lists the conversation events of a messaging ticket (web widget, mobile SDK, social messaging), including end-user and bot messages that List Ticket Comments does not show. Email and API tickets return few or no events. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `events`: Events
- `events[].id`: ID
- `events[].reference`: Reference
- `events[].created_at`: Created At (datetime)
- `events[].author`: Author
- `events[].author.type`: Type
- `events[].author.zen:support:user_id`: Zen Support User ID (number)
- `events[].author.display_name`: Display Name
- `events[].content`: Content
- `events[].content.type`: Type
- `events[].content.body`: Body
- `events[].type`: Type
- `events[].attachments`: Attachments
- `events[].metadata`: Metadata
- `events[].metadata.system`: System
- `events[].metadata.system.client`: Client
- `events[].metadata.system.ip_address`: IP Address
- `events[].metadata.system.transaction_id`: Transaction ID
- `events[].metadata.system.location`: Location
- `events[].metadata.system.latitude`: Latitude (number)
- `events[].metadata.system.longitude`: Longitude (number)
- `events[].metadata.system.email_id`: Email ID
- `events[].metadata.custom`: Custom
- `events[].metadata.is_public`: Is Public (boolean)
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_get_ticket_metrics`

**Get Ticket Metrics.** Fetches the metrics of one ticket: reply, reopen and assignee counts, first reply time, first and full resolution time, agent wait and requester wait time, in calendar and business minutes. Use List Ticket SLA Metrics for SLA targets and breaches. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `ticket_id`: Ticket ID (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `group_stations`: Group Stations (number)
- `assignee_stations`: Assignee Stations (number)
- `reopens`: Reopens (number)
- `replies`: Replies (number)
- `assignee_updated_at`: Assignee Updated At (datetime)
- `requester_updated_at`: Requester Updated At (datetime)
- `status_updated_at`: Status Updated At (datetime)
- `initially_assigned_at`: Initially Assigned At (datetime)
- `assigned_at`: Assigned At (datetime)
- `solved_at`: Solved At
- `latest_comment_added_at`: Latest Comment Added At (datetime)
- `reply_time_in_minutes`: Reply Time In Minutes
- `reply_time_in_minutes.calendar`: Calendar (number)
- `reply_time_in_minutes.business`: Business (number)
- `first_resolution_time_in_minutes`: First Resolution Time In Minutes
- `first_resolution_time_in_minutes.calendar`: Calendar
- `first_resolution_time_in_minutes.business`: Business
- `full_resolution_time_in_minutes`: Full Resolution Time In Minutes
- `full_resolution_time_in_minutes.calendar`: Calendar
- `full_resolution_time_in_minutes.business`: Business
- `agent_wait_time_in_minutes`: Agent Wait Time In Minutes
- `agent_wait_time_in_minutes.calendar`: Calendar
- `agent_wait_time_in_minutes.business`: Business
- `requester_wait_time_in_minutes`: Requester Wait Time In Minutes
- `requester_wait_time_in_minutes.calendar`: Calendar
- `requester_wait_time_in_minutes.business`: Business
- `on_hold_time_in_minutes`: On Hold Time In Minutes
- `on_hold_time_in_minutes.calendar`: Calendar (number)
- `on_hold_time_in_minutes.business`: Business (number)
- `custom_status_updated_at`: Custom Status Updated At (datetime)

### `zendesk_get_ticket_tags`

**Get Ticket Tags.** Lists the tags currently on one ticket. Change them with Add Ticket Tags or Remove Ticket Tags. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |

Output fields:

- `tags`: Tags
- `count`: Count (number)

### `zendesk_get_ticket`

**Get Ticket.** Fetches one Zendesk ticket by numeric ID, including status, priority, requester, assignee, group, tags and custom field values. Use List Ticket Comments for the conversation and Get Many Tickets to read up to 100 tickets at once. Deleted tickets return not found; see List Deleted Tickets. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `external_id`: External ID
- `via`: Via
- `via.channel`: Channel
- `via.source`: Source
- `via.source.from`: From
- `via.source.to`: To
- `via.source.rel`: Rel
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `type`: Type
- `subject`: Subject
- `raw_subject`: Raw Subject (with placeholders)
- `description`: Description
- `priority`: Priority
- `status`: Status
- `recipient`: Recipient
- `requester_id`: Requester ID (number)
- `submitter_id`: Submitter ID (number)
- `assignee_id`: Assignee ID (number)
- `organization_id`: Organization ID (number)
- `group_id`: Group ID (number)
- `collaborator_ids`: Collaborator IDs
- `follower_ids`: Follower IDs
- `email_cc_ids`: Email CC IDs
- `forum_topic_id`: Forum Topic ID
- `problem_id`: Problem ID
- `has_incidents`: Has Incidents (boolean)
- `is_public`: Is Public (boolean)
- `due_at`: Due At (datetime)
- `tags`: Tags
- `custom_fields`: Custom Fields
- `custom_fields[].id`: ID (number)
- `custom_fields[].value`: Value
- `satisfaction_rating`: Satisfaction Rating
- `satisfaction_rating.score`: Score
- `sharing_agreement_ids`: Sharing Agreement IDs
- `custom_status_id`: Custom Status ID (number)
- `followup_ids`: Followup IDs
- `ticket_form_id`: Ticket Form ID (number)
- `brand_id`: Brand ID (number)
- `allow_channelback`: Allow Channelback (boolean)
- `allow_attachments`: Allow Attachments (boolean)
- `from_messaging_channel`: From Messaging Channel (boolean)
- `support_type`: Support Type

### `zendesk_list_deleted_tickets`

**List Deleted Tickets.** Lists tickets deleted in the last 30 days, which Restore Ticket can bring back, with who deleted them and when. Requires an admin or an agent with permission to delete tickets. Pass next_cursor back as Cursor while has_more is true. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `deleted_tickets`: Deleted Tickets
- `deleted_tickets[].id`: ID (number)
- `deleted_tickets[].subject`: Subject
- `deleted_tickets[].description`: Description
- `deleted_tickets[].actor`: Actor
- `deleted_tickets[].actor.id`: ID (number)
- `deleted_tickets[].actor.name`: Name
- `deleted_tickets[].deleted_at`: Deleted At (datetime)
- `deleted_tickets[].previous_state`: Previous State
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_problem_tickets`

**List Problem Tickets.** Lists the tickets of type problem, which incidents can be linked to through Problem ID on Create Ticket or Update Ticket. Use List Ticket Incidents to see the incidents of one problem. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `tickets`: Tickets
- `tickets[].url`: URL (url)
- `tickets[].id`: ID (number)
- `tickets[].external_id`: External ID
- `tickets[].via`: Via
- `tickets[].via.channel`: Channel
- `tickets[].via.source`: Source
- `tickets[].via.source.from`: From
- `tickets[].via.source.to`: To
- `tickets[].via.source.rel`: Rel
- `tickets[].created_at`: Created At (datetime)
- `tickets[].updated_at`: Updated At (datetime)
- `tickets[].type`: Type
- `tickets[].subject`: Subject
- `tickets[].raw_subject`: Raw Subject (with placeholders)
- `tickets[].description`: Description
- `tickets[].priority`: Priority
- `tickets[].status`: Status
- `tickets[].recipient`: Recipient
- `tickets[].requester_id`: Requester ID (number)
- `tickets[].submitter_id`: Submitter ID (number)
- `tickets[].assignee_id`: Assignee ID (number)
- `tickets[].organization_id`: Organization ID (number)
- `tickets[].group_id`: Group ID (number)
- `tickets[].collaborator_ids`: Collaborator IDs
- `tickets[].follower_ids`: Follower IDs
- `tickets[].email_cc_ids`: Email CC IDs
- `tickets[].forum_topic_id`: Forum Topic ID
- `tickets[].problem_id`: Problem ID
- `tickets[].has_incidents`: Has Incidents (boolean)
- `tickets[].is_public`: Is Public (boolean)
- `tickets[].due_at`: Due At (datetime)
- `tickets[].tags`: Tags
- `tickets[].custom_fields`: Custom Fields
- `tickets[].custom_fields[].id`: ID (number)
- `tickets[].custom_fields[].value`: Value
- `tickets[].satisfaction_rating`: Satisfaction Rating
- `tickets[].satisfaction_rating.score`: Score
- `tickets[].sharing_agreement_ids`: Sharing Agreement IDs
- `tickets[].custom_status_id`: Custom Status ID (number)
- `tickets[].followup_ids`: Followup IDs
- `tickets[].ticket_form_id`: Ticket Form ID (number)
- `tickets[].brand_id`: Brand ID (number)
- `tickets[].allow_channelback`: Allow Channelback (boolean)
- `tickets[].allow_attachments`: Allow Attachments (boolean)
- `tickets[].from_messaging_channel`: From Messaging Channel (boolean)
- `tickets[].support_type`: Support Type
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_suspended_tickets`

**List Suspended Tickets.** Lists suspended tickets: incoming emails Zendesk held back (suspected spam, suspended sender, unverified address) with the cause of each. Recover them with Recover Suspended Tickets. Requires an unrestricted agent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `suspended_tickets`: Suspended Tickets
- `suspended_tickets[].url`: URL (url)
- `suspended_tickets[].id`: ID (number)
- `suspended_tickets[].author`: Author
- `suspended_tickets[].author.id`: ID
- `suspended_tickets[].author.name`: Name
- `suspended_tickets[].author.email`: Email (email)
- `suspended_tickets[].subject`: Subject
- `suspended_tickets[].content`: Content
- `suspended_tickets[].cause`: Cause
- `suspended_tickets[].cause_id`: Cause ID (number)
- `suspended_tickets[].error_messages`: Error Messages
- `suspended_tickets[].message_id`: Message ID (email)
- `suspended_tickets[].ticket_id`: Ticket ID
- `suspended_tickets[].created_at`: Created At (datetime)
- `suspended_tickets[].updated_at`: Updated At (datetime)
- `suspended_tickets[].via`: Via
- `suspended_tickets[].via.channel`: Channel
- `suspended_tickets[].via.source`: Source
- `suspended_tickets[].via.source.from`: From
- `suspended_tickets[].via.source.from.address`: Address (email)
- `suspended_tickets[].via.source.from.name`: Name
- `suspended_tickets[].via.source.to`: To
- `suspended_tickets[].via.source.to.name`: Name
- `suspended_tickets[].via.source.to.address`: Address (email)
- `suspended_tickets[].via.source.rel`: Rel
- `suspended_tickets[].attachments`: Attachments
- `suspended_tickets[].recipient`: Recipient (email)
- `suspended_tickets[].brand_id`: Brand ID (number)
- `suspended_tickets[].content_html`: Content HTML
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_ticket_audits`

**List Ticket Audits.** Lists the audit trail of one ticket: every update, oldest first, with its author, channel and events (field changes, comments, notifications, triggers fired). Use it to answer who changed what and when; use List Ticket Comments when only the conversation matters. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `audits`: Audits
- `audits[].id`: ID (number)
- `audits[].ticket_id`: Ticket ID (number)
- `audits[].created_at`: Created At (datetime)
- `audits[].author_id`: Author ID (number)
- `audits[].metadata`: Metadata
- `audits[].metadata.system`: System
- `audits[].metadata.system.client`: Client
- `audits[].metadata.system.ip_address`: IP Address
- `audits[].metadata.system.transaction_id`: Transaction ID
- `audits[].metadata.system.location`: Location
- `audits[].metadata.system.latitude`: Latitude (number)
- `audits[].metadata.system.longitude`: Longitude (number)
- `audits[].metadata.system.email_id`: Email ID
- `audits[].metadata.custom`: Custom
- `audits[].events`: Events
- `audits[].events[].id`: ID (number)
- `audits[].events[].type`: Type
- `audits[].events[].author_id`: Author ID (number)
- `audits[].events[].body`: Body
- `audits[].events[].html_body`: HTML Body
- `audits[].events[].plain_body`: Plain Body
- `audits[].events[].public`: Public (boolean)
- `audits[].events[].attachments`: Attachments
- `audits[].events[].audit_id`: Audit ID (number)
- `audits[].events[].value`: Value
- `audits[].events[].field_name`: Field Name
- `audits[].events[].via`: Via
- `audits[].events[].via.channel`: Channel
- `audits[].events[].via.source`: Source
- `audits[].events[].via.source.from`: From
- `audits[].events[].via.source.rel`: Rel
- `audits[].events[].subject`: Subject
- `audits[].events[].recipients`: Recipients
- `audits[].events[].previous_value`: Previous Value
- `audits[].events[].comment_id`: Comment ID
- `audits[].via`: Via
- `audits[].via.channel`: Channel
- `audits[].via.source`: Source
- `audits[].via.source.from`: From
- `audits[].via.source.to`: To
- `audits[].via.source.to.address`: Address (email)
- `audits[].via.source.to.name`: Name
- `audits[].via.source.to.email_ccs`: Email Ccs
- `audits[].via.source.rel`: Rel
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_ticket_comments`

**List Ticket Comments.** Lists the public replies and internal notes on one ticket, with author, body, attachments and public flag. Set Sort Order to newest first with Limit 1 to read the latest comment. Pass next_page back as Page while has_more is true. Comment IDs feed Make Comment Private and Redact Comment; attachment IDs feed Get Attachment. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |
| `sort_order` | string | no |  | Sort Order. asc for oldest first (default), desc for newest first. One of `"asc"`, `"desc"`. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `page` | number | no |  | Page. Page number, starting at 1. Pass next_page from a previous call. |

Output fields:

- `comments`: Comments
- `comments[].id`: ID (number)
- `comments[].type`: Type
- `comments[].author_id`: Author ID (number)
- `comments[].body`: Body
- `comments[].html_body`: HTML Body
- `comments[].plain_body`: Plain Body
- `comments[].public`: Public (boolean)
- `comments[].attachments`: Attachments
- `comments[].attachments[].url`: URL (url)
- `comments[].attachments[].id`: ID (number)
- `comments[].attachments[].file_name`: File Name
- `comments[].attachments[].content_url`: Content URL (url)
- `comments[].attachments[].mapped_content_url`: Mapped Content URL (url)
- `comments[].attachments[].content_type`: Content Type
- `comments[].attachments[].size`: Size (filesize)
- `comments[].attachments[].width`: Width
- `comments[].attachments[].height`: Height
- `comments[].attachments[].inline`: Inline (boolean)
- `comments[].attachments[].deleted`: Deleted (boolean)
- `comments[].attachments[].malware_access_override`: Malware Access Override (boolean)
- `comments[].attachments[].malware_scan_result`: Malware Scan Result
- `comments[].attachments[].thumbnails`: Thumbnails
- `comments[].audit_id`: Audit ID (number)
- `comments[].via`: Via
- `comments[].via.channel`: Channel
- `comments[].via.source`: Source
- `comments[].via.source.from`: From
- `comments[].via.source.to`: To
- `comments[].via.source.to.address`: Address (email)
- `comments[].via.source.to.name`: Name
- `comments[].via.source.to.email_ccs`: Email Ccs
- `comments[].via.source.rel`: Rel
- `comments[].created_at`: Created At (datetime)
- `comments[].metadata`: Metadata
- `comments[].metadata.system`: System
- `comments[].metadata.system.client`: Client
- `comments[].metadata.system.ip_address`: IP Address
- `comments[].metadata.system.transaction_id`: Transaction ID
- `comments[].metadata.system.location`: Location
- `comments[].metadata.system.latitude`: Latitude (number)
- `comments[].metadata.system.longitude`: Longitude (number)
- `comments[].metadata.custom`: Custom
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_page`: Next Page

### `zendesk_list_ticket_email_ccs`

**List Ticket Email CCs.** Lists the users CCed on a ticket, who receive its public replies by email. Followers (agents notified internally) come from List Ticket Followers. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |

Output fields:

- `users`: Users
- `users[].id`: ID (number)
- `users[].url`: URL (url)
- `users[].name`: Name
- `users[].email`: Email (email)
- `users[].created_at`: Created At (datetime)
- `users[].updated_at`: Updated At (datetime)
- `users[].time_zone`: Time Zone
- `users[].iana_time_zone`: Iana Time Zone
- `users[].phone`: Phone
- `users[].shared_phone_number`: Shared Phone Number
- `users[].photo`: Photo
- `users[].locale_id`: Locale ID (number)
- `users[].locale`: Locale
- `users[].organization_id`: Organization ID (number)
- `users[].role`: Role
- `users[].verified`: Verified (boolean)
- `users[].external_id`: External ID
- `users[].tags`: Tags
- `users[].alias`: Alias
- `users[].active`: Active (boolean)
- `users[].shared`: Shared (boolean)
- `users[].shared_agent`: Shared Agent (boolean)
- `users[].last_login_at`: Last Login At (datetime)
- `users[].two_factor_auth_enabled`: Two Factor Auth Enabled
- `users[].signature`: Signature
- `users[].details`: Details
- `users[].notes`: Notes
- `users[].role_type`: Role Type (number)
- `users[].custom_role_id`: Custom Role ID (number)
- `users[].is_billing_admin`: Is Billing Admin (boolean)
- `users[].moderator`: Moderator (boolean)
- `users[].ticket_restriction`: Ticket Restriction
- `users[].only_private_comments`: Only Private Comments (boolean)
- `users[].restricted_agent`: Restricted Agent (boolean)
- `users[].suspended`: Suspended (boolean)
- `users[].default_group_id`: Default Group ID (number)
- `users[].report_csv`: Report CSV (boolean)
- `users[].user_fields`: User Fields
- `users[].suspension_details`: Suspension Details
- `count`: Count (number)

### `zendesk_list_ticket_followers`

**List Ticket Followers.** Lists the agents following a ticket, who get notified of its updates but are not emailed as CCs. Email CCs come from List Ticket Email CCs. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |

Output fields:

- `users`: Users
- `users[].id`: ID (number)
- `users[].url`: URL (url)
- `users[].name`: Name
- `users[].email`: Email (email)
- `users[].created_at`: Created At (datetime)
- `users[].updated_at`: Updated At (datetime)
- `users[].time_zone`: Time Zone
- `users[].iana_time_zone`: Iana Time Zone
- `users[].phone`: Phone
- `users[].shared_phone_number`: Shared Phone Number
- `users[].photo`: Photo
- `users[].locale_id`: Locale ID (number)
- `users[].locale`: Locale
- `users[].organization_id`: Organization ID (number)
- `users[].role`: Role
- `users[].verified`: Verified (boolean)
- `users[].external_id`: External ID
- `users[].tags`: Tags
- `users[].alias`: Alias
- `users[].active`: Active (boolean)
- `users[].shared`: Shared (boolean)
- `users[].shared_agent`: Shared Agent (boolean)
- `users[].last_login_at`: Last Login At (datetime)
- `users[].two_factor_auth_enabled`: Two Factor Auth Enabled
- `users[].signature`: Signature
- `users[].details`: Details
- `users[].notes`: Notes
- `users[].role_type`: Role Type (number)
- `users[].custom_role_id`: Custom Role ID (number)
- `users[].is_billing_admin`: Is Billing Admin (boolean)
- `users[].moderator`: Moderator (boolean)
- `users[].ticket_restriction`: Ticket Restriction
- `users[].only_private_comments`: Only Private Comments (boolean)
- `users[].restricted_agent`: Restricted Agent (boolean)
- `users[].suspended`: Suspended (boolean)
- `users[].default_group_id`: Default Group ID (number)
- `users[].report_csv`: Report CSV (boolean)
- `users[].user_fields`: User Fields
- `users[].suspension_details`: Suspension Details
- `count`: Count (number)

### `zendesk_list_ticket_incidents`

**List Ticket Incidents.** Lists the incident tickets linked to one problem ticket. Problem ticket IDs come from List Problem Tickets. Returns an empty list for tickets that are not problems. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ID of a ticket of type problem, from List Problem Tickets. |

Output fields:

- `tickets`: Tickets
- `tickets[].url`: URL (url)
- `tickets[].id`: ID (number)
- `tickets[].external_id`: External ID
- `tickets[].via`: Via
- `tickets[].via.channel`: Channel
- `tickets[].via.source`: Source
- `tickets[].via.source.from`: From
- `tickets[].via.source.to`: To
- `tickets[].via.source.rel`: Rel
- `tickets[].created_at`: Created At (datetime)
- `tickets[].updated_at`: Updated At (datetime)
- `tickets[].type`: Type
- `tickets[].subject`: Subject
- `tickets[].raw_subject`: Raw Subject (with placeholders)
- `tickets[].description`: Description
- `tickets[].priority`: Priority
- `tickets[].status`: Status
- `tickets[].recipient`: Recipient
- `tickets[].requester_id`: Requester ID (number)
- `tickets[].submitter_id`: Submitter ID (number)
- `tickets[].assignee_id`: Assignee ID (number)
- `tickets[].organization_id`: Organization ID (number)
- `tickets[].group_id`: Group ID (number)
- `tickets[].collaborator_ids`: Collaborator IDs
- `tickets[].follower_ids`: Follower IDs
- `tickets[].email_cc_ids`: Email CC IDs
- `tickets[].forum_topic_id`: Forum Topic ID
- `tickets[].problem_id`: Problem ID
- `tickets[].has_incidents`: Has Incidents (boolean)
- `tickets[].is_public`: Is Public (boolean)
- `tickets[].due_at`: Due At (datetime)
- `tickets[].tags`: Tags
- `tickets[].custom_fields`: Custom Fields
- `tickets[].custom_fields[].id`: ID (number)
- `tickets[].custom_fields[].value`: Value
- `tickets[].satisfaction_rating`: Satisfaction Rating
- `tickets[].satisfaction_rating.score`: Score
- `tickets[].sharing_agreement_ids`: Sharing Agreement IDs
- `tickets[].custom_status_id`: Custom Status ID (number)
- `tickets[].followup_ids`: Followup IDs
- `tickets[].ticket_form_id`: Ticket Form ID (number)
- `tickets[].brand_id`: Brand ID (number)
- `tickets[].allow_channelback`: Allow Channelback (boolean)
- `tickets[].allow_attachments`: Allow Attachments (boolean)
- `tickets[].from_messaging_channel`: From Messaging Channel (boolean)
- `tickets[].support_type`: Support Type
- `count`: Count (number)

### `zendesk_list_tickets`

**List Tickets.** Lists tickets across the account one page at a time, optionally filtered by External ID. Use Search for filtering by status, requester, tag, text or dates; use this to page through all tickets or to find a ticket by your own external ID. Pass next_cursor back as Cursor while has_more is true. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | no |  | External ID. Only return tickets with this external ID. |
| `sort` | string | no |  | Sort. One of `"id"`, `"-id"`, `"updated_at"`, `"-updated_at"`, `"status"`, `"-status"`. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `tickets`: Tickets
- `tickets[].url`: URL (url)
- `tickets[].id`: ID (number)
- `tickets[].external_id`: External ID
- `tickets[].via`: Via
- `tickets[].via.channel`: Channel
- `tickets[].via.source`: Source
- `tickets[].via.source.from`: From
- `tickets[].via.source.to`: To
- `tickets[].via.source.rel`: Rel
- `tickets[].created_at`: Created At (datetime)
- `tickets[].updated_at`: Updated At (datetime)
- `tickets[].type`: Type
- `tickets[].subject`: Subject
- `tickets[].raw_subject`: Raw Subject (with placeholders)
- `tickets[].description`: Description
- `tickets[].priority`: Priority
- `tickets[].status`: Status
- `tickets[].recipient`: Recipient
- `tickets[].requester_id`: Requester ID (number)
- `tickets[].submitter_id`: Submitter ID (number)
- `tickets[].assignee_id`: Assignee ID (number)
- `tickets[].organization_id`: Organization ID (number)
- `tickets[].group_id`: Group ID (number)
- `tickets[].collaborator_ids`: Collaborator IDs
- `tickets[].follower_ids`: Follower IDs
- `tickets[].email_cc_ids`: Email CC IDs
- `tickets[].forum_topic_id`: Forum Topic ID
- `tickets[].problem_id`: Problem ID
- `tickets[].has_incidents`: Has Incidents (boolean)
- `tickets[].is_public`: Is Public (boolean)
- `tickets[].due_at`: Due At (datetime)
- `tickets[].tags`: Tags
- `tickets[].custom_fields`: Custom Fields
- `tickets[].custom_fields[].id`: ID (number)
- `tickets[].custom_fields[].value`: Value
- `tickets[].satisfaction_rating`: Satisfaction Rating
- `tickets[].satisfaction_rating.score`: Score
- `tickets[].sharing_agreement_ids`: Sharing Agreement IDs
- `tickets[].custom_status_id`: Custom Status ID (number)
- `tickets[].followup_ids`: Followup IDs
- `tickets[].ticket_form_id`: Ticket Form ID (number)
- `tickets[].brand_id`: Brand ID (number)
- `tickets[].allow_channelback`: Allow Channelback (boolean)
- `tickets[].allow_attachments`: Allow Attachments (boolean)
- `tickets[].from_messaging_channel`: From Messaging Channel (boolean)
- `tickets[].support_type`: Support Type
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_make_comment_private`

**Make Comment Private.** Makes one public comment on a ticket private, hiding it from the requester; it cannot be made public again. The comment ID comes from List Ticket Comments. Use Redact Comment to remove sensitive text instead of hiding the whole comment. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |
| `comment_id` | string | yes |  | Comment ID. Numeric comment ID, from List Ticket Comments. |

Output fields:

- `success`: Success (boolean)
- `ticket_id`: Ticket ID (number)
- `comment_id`: Comment ID (number)

### `zendesk_mark_tickets_as_spam`

**Mark Tickets as Spam.** Queues a job that marks up to 100 tickets as spam: each ticket is deleted and its requester is suspended, so later email from them lands in suspended tickets. Use only for confirmed spam; use Delete Ticket to remove a ticket without suspending the requester. Returns the job status; poll Get Job Status with its id. Requires an agent with permission to delete tickets. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_ids` | array | yes |  | Ticket IDs. Up to 100 numeric ticket IDs. |

Output fields:

- `id`: ID
- `job_type`: Job Type
- `url`: URL (url)
- `total`: Total (number)
- `progress`: Progress
- `status`: Status
- `message`: Message
- `results`: Results

### `zendesk_merge_tickets`

**Merge Tickets.** Queues a job that merges up to 5 source tickets into the target ticket: sources are closed and their comments are linked into the target. Irreversible. Returns the job status; poll Get Job Status with its id. Closed tickets cannot be merged in either direction. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target_ticket_id` | string | yes |  | Ticket ID. The ticket that remains open and receives the merge. |
| `source_ticket_ids` | array | yes |  | Source Ticket IDs. Up to 5 ticket IDs to merge into the target and close. |
| `target_comment` | string | no |  | Target Comment. Comment added to the target ticket. Zendesk writes a default one when empty. |
| `target_comment_is_public` | boolean | no |  | Target Comment Is Public. |
| `source_comment` | string | no |  | Source Comment. Comment added to each source ticket. Zendesk writes a default one when empty. |
| `source_comment_is_public` | boolean | no |  | Source Comment Is Public. |

Output fields:

- `id`: ID
- `job_type`: Job Type
- `url`: URL (url)
- `total`: Total
- `progress`: Progress
- `status`: Status
- `message`: Message
- `results`: Results

### `zendesk_recover_suspended_tickets`

**Recover Suspended Tickets.** Recovers up to 100 suspended tickets, turning each held message into a regular ticket (or a comment on the ticket it replied to). Suspended ticket IDs come from List Suspended Tickets. Not idempotent: a recovered suspended ticket no longer exists. Requires an unrestricted agent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `suspended_ticket_ids` | array | yes |  | Suspended Ticket IDs. Up to 100 suspended ticket IDs, from List Suspended Tickets. |

Output fields:

- `tickets`: Tickets
- `tickets[].url`: URL (url)
- `tickets[].id`: ID (number)
- `tickets[].external_id`: External ID
- `tickets[].via`: Via
- `tickets[].via.channel`: Channel
- `tickets[].via.source`: Source
- `tickets[].via.source.from`: From
- `tickets[].via.source.to`: To
- `tickets[].via.source.rel`: Rel
- `tickets[].created_at`: Created At (datetime)
- `tickets[].updated_at`: Updated At (datetime)
- `tickets[].type`: Type
- `tickets[].subject`: Subject
- `tickets[].raw_subject`: Raw Subject (with placeholders)
- `tickets[].description`: Description
- `tickets[].priority`: Priority
- `tickets[].status`: Status
- `tickets[].recipient`: Recipient
- `tickets[].requester_id`: Requester ID (number)
- `tickets[].submitter_id`: Submitter ID (number)
- `tickets[].assignee_id`: Assignee ID (number)
- `tickets[].organization_id`: Organization ID (number)
- `tickets[].group_id`: Group ID (number)
- `tickets[].collaborator_ids`: Collaborator IDs
- `tickets[].follower_ids`: Follower IDs
- `tickets[].email_cc_ids`: Email CC IDs
- `tickets[].forum_topic_id`: Forum Topic ID
- `tickets[].problem_id`: Problem ID
- `tickets[].has_incidents`: Has Incidents (boolean)
- `tickets[].is_public`: Is Public (boolean)
- `tickets[].due_at`: Due At (datetime)
- `tickets[].tags`: Tags
- `tickets[].custom_fields`: Custom Fields
- `tickets[].custom_fields[].id`: ID (number)
- `tickets[].custom_fields[].value`: Value
- `tickets[].satisfaction_rating`: Satisfaction Rating
- `tickets[].satisfaction_rating.score`: Score
- `tickets[].sharing_agreement_ids`: Sharing Agreement IDs
- `tickets[].custom_status_id`: Custom Status ID (number)
- `tickets[].followup_ids`: Followup IDs
- `tickets[].ticket_form_id`: Ticket Form ID (number)
- `tickets[].brand_id`: Brand ID (number)
- `tickets[].allow_channelback`: Allow Channelback (boolean)
- `tickets[].allow_attachments`: Allow Attachments (boolean)
- `tickets[].from_messaging_channel`: From Messaging Channel (boolean)
- `tickets[].support_type`: Support Type
- `count`: Count (number)

### `zendesk_redact_comment`

**Redact Comment.** Permanently redacts parts of one ticket comment, e.g. a card number or password. Read the comment html_body with List Ticket Comments, wrap each sensitive part in <redact></redact> tags, and pass that full HTML as HTML Body; or list attachment URLs to remove. Irreversible. Requires Agent Workspace and an agent allowed to delete tickets; does not work on closed tickets. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |
| `comment_id` | string | yes |  | Comment ID. Numeric comment ID, from List Ticket Comments. |
| `html_body` | string | no |  | HTML Body. The comment html_body with the text to remove wrapped in <redact></redact> tags. |
| `external_attachment_urls` | array | no |  | Attachment URLs. content_url values of the comment attachments to redact. |

Output fields:

- `id`: ID (number)
- `type`: Type
- `author_id`: Author ID (number)
- `body`: Body
- `html_body`: HTML Body
- `plain_body`: Plain Body
- `public`: Public (boolean)
- `attachments`: Attachments
- `audit_id`: Audit ID (number)

### `zendesk_remove_ticket_tags`

**Remove Ticket Tags.** Removes the given tags from one ticket and keeps the rest; tags not on the ticket are ignored. Returns the remaining tag list. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |
| `tags` | array | yes |  | Tags. Tags to remove; tags are lowercase and cannot contain spaces. |

Output fields:

- `tags`: Tags
- `count`: Count (number)

### `zendesk_restore_ticket`

**Restore Ticket.** Restores a ticket removed by Delete Ticket, as long as Zendesk has not purged it yet (30 days). Find candidates with List Deleted Tickets. Requires an admin or an agent with permission to delete tickets. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ID of the deleted ticket, from List Deleted Tickets. |

Output fields:

- `success`: Success (boolean)
- `ticket_id`: Ticket ID (number)

### `zendesk_update_many_tickets`

**Update Many Tickets.** Queues a background job that applies the same field changes to up to 100 tickets and returns the job status. Poll Get Job Status with the returned id for per-ticket results. Additional Tags and Remove Tags change tags without replacing the existing set. Use Update Ticket for a single ticket. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_ids` | array | yes |  | Ticket IDs. Up to 100 numeric ticket IDs. |
| `status` | string | no |  | Status. New status for every ticket. One of `"new"`, `"open"`, `"pending"`, `"hold"`, `"solved"`, `"closed"`. |
| `priority` | string | no |  | Priority. One of `"low"`, `"normal"`, `"high"`, `"urgent"`. |
| `type` | string | no |  | Type. incident requires Problem ID to link it to a problem ticket. One of `"question"`, `"incident"`, `"problem"`, `"task"`. |
| `assignee_id` | string | no |  | Assignee ID. Agent user ID. |
| `group_id` | string | no |  | Group ID. Group ID, from List Groups. |
| `organization_id` | string | no |  | Organization ID. Organization ID. |
| `custom_status_id` | string | no |  | Custom Status ID. Custom status ID, from List Custom Statuses. |
| `additional_tags` | array | no |  | Additional Tags. Tags to add. |
| `remove_tags` | array | no |  | Remove Tags. Tags to remove. |
| `additional_fields` | JSON | no |  | Additional Fields. Other ticket attributes to set on every ticket, e.g. {"custom_fields": [{"id": 123, "value": "x"}]}. |

Output fields:

- `id`: ID
- `job_type`: Job Type
- `url`: URL (url)
- `total`: Total (number)
- `progress`: Progress
- `status`: Status
- `message`: Message
- `results`: Results

### `zendesk_update_ticket`

**Update Ticket.** Updates fields on one ticket; omitted fields keep their values. Use Add Ticket Comment to reply, Add Ticket Tags or Remove Ticket Tags to change tags without replacing them (Tags here replaces the whole set), and Update Many Tickets for bulk changes. To clear a field such as the assignee, pass {"assignee_id": null} in Additional Fields. Pass Updated Stamp (the ticket updated_at) to fail with 409 instead of overwriting a concurrent change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticket_id` | string | yes |  | Ticket ID. Numeric ticket ID, from Search, List Tickets or Create Ticket. |
| `subject` | string | no |  | Subject. |
| `status` | string | no |  | Status. New status. closed is final and cannot be reopened. One of `"new"`, `"open"`, `"pending"`, `"hold"`, `"solved"`, `"closed"`. |
| `priority` | string | no |  | Priority. One of `"low"`, `"normal"`, `"high"`, `"urgent"`. |
| `type` | string | no |  | Type. incident requires Problem ID to link it to a problem ticket. One of `"question"`, `"incident"`, `"problem"`, `"task"`. |
| `assignee_id` | string | no |  | Assignee ID. Agent user ID, from List Users with role agent or List Group Users. |
| `group_id` | string | no |  | Group ID. Group ID, from List Groups. |
| `organization_id` | string | no |  | Organization ID. Organization ID, from Search Organizations. |
| `requester_id` | string | no |  | Requester ID. User ID, from Search Users. |
| `problem_id` | string | no |  | Problem ID. For type incident: the problem ticket ID, from List Problem Tickets. |
| `custom_status_id` | string | no |  | Custom Status ID. Custom status ID, from List Custom Statuses. |
| `brand_id` | string | no |  | Brand ID. Brand ID, from List Brands. |
| `due_at` | ISO date-time string | no |  | Due At. Due date, only valid for type task. |
| `tags` | array | no |  | Tags. Replaces every tag on the ticket; an empty list is ignored. Prefer Add Ticket Tags or Remove Ticket Tags, which also clear tags. |
| `external_id` | string | no |  | External ID. |
| `custom_fields` | JSON | no |  | Custom Fields. Array of {"id": <ticket field ID from List Ticket Fields>, "value": <value>}. Only listed fields change. |
| `additional_fields` | JSON | no |  | Additional Fields. Other ticket attributes from the Zendesk Tickets API, or null values to clear fields, e.g. {"assignee_id": null}. |
| `updated_stamp` | string | no |  | Updated Stamp. The updated_at value read from Get Ticket; enables safe update so a concurrent change returns 409. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `external_id`: External ID
- `via`: Via
- `via.channel`: Channel
- `via.source`: Source
- `via.source.from`: From
- `via.source.to`: To
- `via.source.rel`: Rel
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `type`: Type
- `subject`: Subject
- `raw_subject`: Raw Subject (with placeholders)
- `description`: Description
- `priority`: Priority
- `status`: Status
- `recipient`: Recipient
- `requester_id`: Requester ID (number)
- `submitter_id`: Submitter ID (number)
- `assignee_id`: Assignee ID (number)
- `organization_id`: Organization ID (number)
- `group_id`: Group ID (number)
- `collaborator_ids`: Collaborator IDs
- `follower_ids`: Follower IDs
- `email_cc_ids`: Email CC IDs
- `forum_topic_id`: Forum Topic ID
- `problem_id`: Problem ID
- `has_incidents`: Has Incidents (boolean)
- `is_public`: Is Public (boolean)
- `due_at`: Due At (datetime)
- `tags`: Tags
- `custom_fields`: Custom Fields
- `custom_fields[].id`: ID (number)
- `custom_fields[].value`: Value
- `satisfaction_rating`: Satisfaction Rating
- `satisfaction_rating.score`: Score
- `sharing_agreement_ids`: Sharing Agreement IDs
- `custom_status_id`: Custom Status ID (number)
- `followup_ids`: Followup IDs
- `ticket_form_id`: Ticket Form ID (number)
- `brand_id`: Brand ID (number)
- `allow_channelback`: Allow Channelback (boolean)
- `allow_attachments`: Allow Attachments (boolean)
- `from_messaging_channel`: From Messaging Channel (boolean)
- `support_type`: Support Type

### `zendesk_add_user_tags`

**Add User Tags.** Adds tags to one user and keeps the tags already on them; re-adding an existing tag changes nothing. Returns the full tag list. Requires user tagging to be enabled in the account. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users, List Users or Get Current User. |
| `tags` | array | yes |  | Tags. Tags to add; tags are lowercase and cannot contain spaces. |

Output fields:

- `tags`: Tags
- `count`: Count (number)

### `zendesk_create_or_update_user`

**Create or Update User.** Upserts one user: Zendesk matches an existing user by Email or External ID (pass at least one) and updates the given fields, otherwise creates the user. created is true when a new user was made. Safe to retry. Use Update User when you already hold the user ID. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `email` | string | no |  | Email. Primary email address. |
| `phone` | string | no |  | Phone. |
| `role` | string | no |  | Role. Defaults to end-user. Only admins can create agents and admins. One of `"end-user"`, `"agent"`, `"admin"`. |
| `organization_id` | string | no |  | Organization ID. Organization ID, from Search Organizations. |
| `external_id` | string | no |  | External ID. Your own reference for the user. |
| `tags` | array | no |  | Tags. Replaces every tag on the user; an empty list is ignored. Prefer Add User Tags or Remove User Tags on existing users, which also clear tags. |
| `user_fields` | JSON | no |  | User Fields. Object of custom user field keys to values, keys from List User Fields, e.g. {"plan": "pro"}. |
| `details` | string | no |  | Details. Details such as an address. |
| `notes` | string | no |  | Notes. Internal notes visible to agents. |
| `verified` | string | no |  | Verified. Mark the email as verified so Zendesk sends no verification email. One of `"true"`, `"false"`. |
| `additional_fields` | JSON | no |  | Additional Fields. Other user attributes from the Zendesk Users API, e.g. {"time_zone": "Berlin", "locale": "de"}, or null values to clear fields. |

Output fields:

- `created`: Created (boolean)
- `user`: User
- `user.id`: ID (number)
- `user.url`: URL (url)
- `user.name`: Name
- `user.email`: Email (email)
- `user.created_at`: Created At (datetime)
- `user.updated_at`: Updated At (datetime)
- `user.time_zone`: Time Zone
- `user.iana_time_zone`: Iana Time Zone
- `user.phone`: Phone
- `user.shared_phone_number`: Shared Phone Number
- `user.photo`: Photo
- `user.locale_id`: Locale ID (number)
- `user.locale`: Locale
- `user.organization_id`: Organization ID (number)
- `user.role`: Role
- `user.verified`: Verified (boolean)
- `user.external_id`: External ID
- `user.tags`: Tags
- `user.alias`: Alias
- `user.active`: Active (boolean)
- `user.shared`: Shared (boolean)
- `user.shared_agent`: Shared Agent (boolean)
- `user.last_login_at`: Last Login At (datetime)
- `user.two_factor_auth_enabled`: Two Factor Auth Enabled
- `user.signature`: Signature
- `user.details`: Details
- `user.notes`: Notes
- `user.role_type`: Role Type (number)
- `user.custom_role_id`: Custom Role ID (number)
- `user.is_billing_admin`: Is Billing Admin (boolean)
- `user.moderator`: Moderator (boolean)
- `user.ticket_restriction`: Ticket Restriction
- `user.only_private_comments`: Only Private Comments (boolean)
- `user.restricted_agent`: Restricted Agent (boolean)
- `user.suspended`: Suspended (boolean)
- `user.default_group_id`: Default Group ID (number)
- `user.report_csv`: Report CSV (boolean)
- `user.user_fields`: User Fields
- `user.suspension_details`: Suspension Details

### `zendesk_create_user_identity`

**Create User Identity.** Adds one identity to a user: an email address, phone number or social handle. Fails with 422 when the value already belongs to any user. Not idempotent. Make it primary with Make User Identity Primary. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users. |
| `type` | string | yes |  | Type. One of `"email"`, `"phone_number"`, `"twitter"`, `"facebook"`, `"google"`. |
| `value` | string | yes |  | Value. The email address, phone number in E.164 format, or handle. |
| `verified` | string | no |  | Verified. Mark the identity as verified so Zendesk sends no verification message. One of `"true"`, `"false"`. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `user_id`: User ID (number)
- `type`: Type
- `value`: Value (email)
- `verified`: Verified (boolean)
- `primary`: Primary (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `verification_method`: Verification Method
- `verified_at`: Verified At
- `undeliverable_count`: Undeliverable Count (number)
- `deliverable_state`: Deliverable State

### `zendesk_create_user`

**Create User.** Creates one user; role defaults to end user. Fails with 422 when the email or external ID already belongs to a user, so use Create or Update User to avoid duplicates, or Search Users first. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `email` | string | no |  | Email. Primary email address. |
| `phone` | string | no |  | Phone. |
| `role` | string | no |  | Role. Defaults to end-user. Only admins can create agents and admins. One of `"end-user"`, `"agent"`, `"admin"`. |
| `organization_id` | string | no |  | Organization ID. Organization ID, from Search Organizations. |
| `external_id` | string | no |  | External ID. Your own reference for the user. |
| `tags` | array | no |  | Tags. Replaces every tag on the user; an empty list is ignored. Prefer Add User Tags or Remove User Tags on existing users, which also clear tags. |
| `user_fields` | JSON | no |  | User Fields. Object of custom user field keys to values, keys from List User Fields, e.g. {"plan": "pro"}. |
| `details` | string | no |  | Details. Details such as an address. |
| `notes` | string | no |  | Notes. Internal notes visible to agents. |
| `verified` | string | no |  | Verified. Mark the email as verified so Zendesk sends no verification email. One of `"true"`, `"false"`. |
| `additional_fields` | JSON | no |  | Additional Fields. Other user attributes from the Zendesk Users API, e.g. {"time_zone": "Berlin", "locale": "de"}, or null values to clear fields. |

Output fields:

- `id`: ID (number)
- `url`: URL (url)
- `name`: Name
- `email`: Email (email)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `time_zone`: Time Zone
- `iana_time_zone`: Iana Time Zone
- `phone`: Phone
- `shared_phone_number`: Shared Phone Number
- `photo`: Photo
- `locale_id`: Locale ID (number)
- `locale`: Locale
- `organization_id`: Organization ID (number)
- `role`: Role
- `verified`: Verified (boolean)
- `external_id`: External ID
- `tags`: Tags
- `alias`: Alias
- `active`: Active (boolean)
- `shared`: Shared (boolean)
- `shared_agent`: Shared Agent (boolean)
- `last_login_at`: Last Login At (datetime)
- `two_factor_auth_enabled`: Two Factor Auth Enabled
- `signature`: Signature
- `details`: Details
- `notes`: Notes
- `role_type`: Role Type (number)
- `custom_role_id`: Custom Role ID (number)
- `is_billing_admin`: Is Billing Admin (boolean)
- `moderator`: Moderator (boolean)
- `ticket_restriction`: Ticket Restriction
- `only_private_comments`: Only Private Comments (boolean)
- `restricted_agent`: Restricted Agent (boolean)
- `suspended`: Suspended (boolean)
- `default_group_id`: Default Group ID (number)
- `report_csv`: Report CSV (boolean)
- `user_fields`: User Fields
- `suspension_details`: Suspension Details

### `zendesk_delete_user_identity`

**Delete User Identity.** Removes one identity (email, phone or social account) from a user. The primary identity cannot be deleted; make another identity primary first with Make User Identity Primary. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users, List Users or Get Current User. |
| `identity_id` | string | yes |  | Identity ID. Numeric identity ID, from List User Identities. |

Output fields:

- `success`: Success (boolean)
- `user_id`: User ID (number)
- `identity_id`: Identity ID (number)

### `zendesk_delete_user`

**Delete User.** Soft-deletes one user: they can no longer sign in and their tickets stay. Zendesk permanently removes deleted users later, so this cannot be undone from the API. Agents must be downgraded to end users first. Requires an admin, or an agent allowed to manage end users. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users, List Users or Get Current User. |

Output fields:

- `id`: ID (number)
- `url`: URL (url)
- `name`: Name
- `email`: Email (email)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `time_zone`: Time Zone
- `iana_time_zone`: Iana Time Zone
- `phone`: Phone
- `shared_phone_number`: Shared Phone Number
- `photo`: Photo
- `locale_id`: Locale ID (number)
- `locale`: Locale
- `organization_id`: Organization ID (number)
- `role`: Role
- `verified`: Verified (boolean)
- `external_id`: External ID
- `tags`: Tags
- `alias`: Alias
- `active`: Active (boolean)
- `shared`: Shared (boolean)
- `shared_agent`: Shared Agent (boolean)
- `last_login_at`: Last Login At (datetime)
- `two_factor_auth_enabled`: Two Factor Auth Enabled
- `signature`: Signature
- `details`: Details
- `notes`: Notes
- `role_type`: Role Type (number)
- `custom_role_id`: Custom Role ID (number)
- `is_billing_admin`: Is Billing Admin (boolean)
- `moderator`: Moderator (boolean)
- `ticket_restriction`: Ticket Restriction
- `only_private_comments`: Only Private Comments (boolean)
- `restricted_agent`: Restricted Agent (boolean)
- `suspended`: Suspended (boolean)
- `default_group_id`: Default Group ID (number)
- `report_csv`: Report CSV (boolean)
- `user_fields`: User Fields
- `suspension_details`: Suspension Details

### `zendesk_get_current_user`

**Get Current User.** Returns the user behind this connection, with role and permissions. Use it to learn the connected agent ID, e.g. to assign tickets to yourself or check admin access. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: ID (number)
- `url`: URL (url)
- `name`: Name
- `email`: Email (email)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `time_zone`: Time Zone
- `iana_time_zone`: Iana Time Zone
- `phone`: Phone
- `shared_phone_number`: Shared Phone Number
- `photo`: Photo
- `locale_id`: Locale ID (number)
- `locale`: Locale
- `organization_id`: Organization ID (number)
- `role`: Role
- `verified`: Verified (boolean)
- `external_id`: External ID
- `tags`: Tags
- `alias`: Alias
- `active`: Active (boolean)
- `shared`: Shared (boolean)
- `shared_agent`: Shared Agent (boolean)
- `last_login_at`: Last Login At (datetime)
- `two_factor_auth_enabled`: Two Factor Auth Enabled
- `signature`: Signature
- `details`: Details
- `notes`: Notes
- `role_type`: Role Type (number)
- `custom_role_id`: Custom Role ID (number)
- `is_billing_admin`: Is Billing Admin (boolean)
- `moderator`: Moderator (boolean)
- `ticket_restriction`: Ticket Restriction
- `only_private_comments`: Only Private Comments (boolean)
- `restricted_agent`: Restricted Agent (boolean)
- `suspended`: Suspended (boolean)
- `default_group_id`: Default Group ID (number)
- `report_csv`: Report CSV (boolean)
- `user_fields`: User Fields
- `suspension_details`: Suspension Details

### `zendesk_get_many_users`

**Get Many Users.** Fetches up to 100 users in one request, by numeric User IDs or by External IDs (pass one of the two). Prefer it over repeated Get User calls. Unknown IDs are left out, so compare count with the number requested. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_ids` | array | no |  | User IDs. Up to 100 numeric user IDs. |
| `external_ids` | array | no |  | External IDs. Up to 100 user external IDs. |

Output fields:

- `users`: Users
- `users[].id`: ID (number)
- `users[].url`: URL (url)
- `users[].name`: Name
- `users[].email`: Email (email)
- `users[].created_at`: Created At (datetime)
- `users[].updated_at`: Updated At (datetime)
- `users[].time_zone`: Time Zone
- `users[].iana_time_zone`: Iana Time Zone
- `users[].phone`: Phone
- `users[].shared_phone_number`: Shared Phone Number
- `users[].photo`: Photo
- `users[].locale_id`: Locale ID (number)
- `users[].locale`: Locale
- `users[].organization_id`: Organization ID (number)
- `users[].role`: Role
- `users[].verified`: Verified (boolean)
- `users[].external_id`: External ID
- `users[].tags`: Tags
- `users[].alias`: Alias
- `users[].active`: Active (boolean)
- `users[].shared`: Shared (boolean)
- `users[].shared_agent`: Shared Agent (boolean)
- `users[].last_login_at`: Last Login At (datetime)
- `users[].two_factor_auth_enabled`: Two Factor Auth Enabled
- `users[].signature`: Signature
- `users[].details`: Details
- `users[].notes`: Notes
- `users[].role_type`: Role Type (number)
- `users[].custom_role_id`: Custom Role ID (number)
- `users[].is_billing_admin`: Is Billing Admin (boolean)
- `users[].moderator`: Moderator (boolean)
- `users[].ticket_restriction`: Ticket Restriction
- `users[].only_private_comments`: Only Private Comments (boolean)
- `users[].restricted_agent`: Restricted Agent (boolean)
- `users[].suspended`: Suspended (boolean)
- `users[].default_group_id`: Default Group ID (number)
- `users[].report_csv`: Report CSV (boolean)
- `users[].user_fields`: User Fields
- `users[].suspension_details`: Suspension Details
- `count`: Count (number)

### `zendesk_get_user_tags`

**Get User Tags.** Lists the tags on one user. Change them with Add User Tags or Remove User Tags. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users, List Users or Get Current User. |

Output fields:

- `tags`: Tags
- `count`: Count (number)

### `zendesk_get_user`

**Get User.** Fetches one user (end user, agent or admin) by numeric ID, with email, phone, role, organization, tags and user fields. Use Search Users to find a user by email or name, and Get Many Users for up to 100 IDs. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users, List Users or Get Current User. |

Output fields:

- `id`: ID (number)
- `url`: URL (url)
- `name`: Name
- `email`: Email (email)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `time_zone`: Time Zone
- `iana_time_zone`: Iana Time Zone
- `phone`: Phone
- `shared_phone_number`: Shared Phone Number
- `photo`: Photo
- `locale_id`: Locale ID (number)
- `locale`: Locale
- `organization_id`: Organization ID (number)
- `role`: Role
- `verified`: Verified (boolean)
- `external_id`: External ID
- `tags`: Tags
- `alias`: Alias
- `active`: Active (boolean)
- `shared`: Shared (boolean)
- `shared_agent`: Shared Agent (boolean)
- `last_login_at`: Last Login At (datetime)
- `two_factor_auth_enabled`: Two Factor Auth Enabled
- `signature`: Signature
- `details`: Details
- `notes`: Notes
- `role_type`: Role Type (number)
- `custom_role_id`: Custom Role ID (number)
- `is_billing_admin`: Is Billing Admin (boolean)
- `moderator`: Moderator (boolean)
- `ticket_restriction`: Ticket Restriction
- `only_private_comments`: Only Private Comments (boolean)
- `restricted_agent`: Restricted Agent (boolean)
- `suspended`: Suspended (boolean)
- `default_group_id`: Default Group ID (number)
- `report_csv`: Report CSV (boolean)
- `user_fields`: User Fields
- `suspension_details`: Suspension Details

### `zendesk_list_user_groups`

**List User Groups.** Lists the groups one agent belongs to. End users belong to no groups. Use List Group Users for the reverse lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users, List Users or Get Current User. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `groups`: Groups
- `groups[].url`: URL (url)
- `groups[].id`: ID (number)
- `groups[].is_public`: Is Public (boolean)
- `groups[].name`: Name
- `groups[].description`: Description
- `groups[].default`: Default (boolean)
- `groups[].deleted`: Deleted (boolean)
- `groups[].created_at`: Created At (datetime)
- `groups[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_user_identities`

**List User Identities.** Lists the identities of one user: email addresses, phone numbers and social accounts, with which is primary and verified. Identity IDs feed Update User Identity, Make User Identity Primary and Delete User Identity. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users, List Users or Get Current User. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `identities`: Identities
- `identities[].url`: URL (url)
- `identities[].id`: ID (number)
- `identities[].user_id`: User ID (number)
- `identities[].type`: Type
- `identities[].value`: Value (email)
- `identities[].verified`: Verified (boolean)
- `identities[].primary`: Primary (boolean)
- `identities[].created_at`: Created At (datetime)
- `identities[].updated_at`: Updated At (datetime)
- `identities[].verification_method`: Verification Method
- `identities[].verified_at`: Verified At
- `identities[].undeliverable_count`: Undeliverable Count (number)
- `identities[].deliverable_state`: Deliverable State
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_list_users`

**List Users.** Lists users one page at a time, optionally only end users, agents or admins (e.g. role agent to find assignees). Use Search Users to look up a user by email, name or other attribute. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `role` | string | no |  | Role. Only return users with this role. One of `"end-user"`, `"agent"`, `"admin"`. |
| `external_id` | string | no |  | External ID. Only return users with this external ID. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `cursor` | string | no |  | Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `users`: Users
- `users[].id`: ID (number)
- `users[].url`: URL (url)
- `users[].name`: Name
- `users[].email`: Email (email)
- `users[].created_at`: Created At (datetime)
- `users[].updated_at`: Updated At (datetime)
- `users[].time_zone`: Time Zone
- `users[].iana_time_zone`: Iana Time Zone
- `users[].phone`: Phone
- `users[].shared_phone_number`: Shared Phone Number
- `users[].photo`: Photo
- `users[].locale_id`: Locale ID (number)
- `users[].locale`: Locale
- `users[].organization_id`: Organization ID (number)
- `users[].role`: Role
- `users[].verified`: Verified (boolean)
- `users[].external_id`: External ID
- `users[].tags`: Tags
- `users[].alias`: Alias
- `users[].active`: Active (boolean)
- `users[].shared`: Shared (boolean)
- `users[].shared_agent`: Shared Agent (boolean)
- `users[].last_login_at`: Last Login At (datetime)
- `users[].two_factor_auth_enabled`: Two Factor Auth Enabled
- `users[].signature`: Signature
- `users[].details`: Details
- `users[].notes`: Notes
- `users[].role_type`: Role Type (number)
- `users[].custom_role_id`: Custom Role ID (number)
- `users[].is_billing_admin`: Is Billing Admin (boolean)
- `users[].moderator`: Moderator (boolean)
- `users[].ticket_restriction`: Ticket Restriction
- `users[].only_private_comments`: Only Private Comments (boolean)
- `users[].restricted_agent`: Restricted Agent (boolean)
- `users[].suspended`: Suspended (boolean)
- `users[].default_group_id`: Default Group ID (number)
- `users[].report_csv`: Report CSV (boolean)
- `users[].user_fields`: User Fields
- `users[].suspension_details`: Suspension Details
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `zendesk_make_user_identity_primary`

**Make User Identity Primary.** Makes one identity the primary identity of its type, e.g. the email Zendesk sends notifications to. Returns the user identities after the change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users, List Users or Get Current User. |
| `identity_id` | string | yes |  | Identity ID. Numeric identity ID, from List User Identities. |

Output fields:

- `identities`: Identities
- `identities[].url`: URL (url)
- `identities[].id`: ID (number)
- `identities[].user_id`: User ID (number)
- `identities[].type`: Type
- `identities[].value`: Value (email)
- `identities[].verified`: Verified (boolean)
- `identities[].primary`: Primary (boolean)
- `identities[].created_at`: Created At (datetime)
- `identities[].updated_at`: Updated At (datetime)
- `identities[].verification_method`: Verification Method
- `identities[].verified_at`: Verified At
- `identities[].undeliverable_count`: Undeliverable Count (number)
- `identities[].deliverable_state`: Deliverable State
- `count`: Count (number)

### `zendesk_merge_users`

**Merge Users.** Merges the source end user into the target user: the source tickets, identities and memberships move to the target and the source is deleted. Irreversible. Only end users can be merged as the source. Returns the target user. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_user_id` | string | yes |  | Source User ID. The duplicate end user to merge away, from Search Users. |
| `target_user_id` | string | yes |  | Target User ID. The user that remains and receives the data, from Search Users. |

Output fields:

- `id`: ID (number)
- `url`: URL (url)
- `name`: Name
- `email`: Email (email)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `time_zone`: Time Zone
- `iana_time_zone`: Iana Time Zone
- `phone`: Phone
- `shared_phone_number`: Shared Phone Number
- `photo`: Photo
- `locale_id`: Locale ID (number)
- `locale`: Locale
- `organization_id`: Organization ID (number)
- `role`: Role
- `verified`: Verified (boolean)
- `external_id`: External ID
- `tags`: Tags
- `alias`: Alias
- `active`: Active (boolean)
- `shared`: Shared (boolean)
- `shared_agent`: Shared Agent (boolean)
- `last_login_at`: Last Login At (datetime)
- `two_factor_auth_enabled`: Two Factor Auth Enabled
- `signature`: Signature
- `details`: Details
- `notes`: Notes
- `role_type`: Role Type (number)
- `custom_role_id`: Custom Role ID (number)
- `is_billing_admin`: Is Billing Admin (boolean)
- `moderator`: Moderator (boolean)
- `ticket_restriction`: Ticket Restriction
- `only_private_comments`: Only Private Comments (boolean)
- `restricted_agent`: Restricted Agent (boolean)
- `suspended`: Suspended (boolean)
- `default_group_id`: Default Group ID (number)
- `report_csv`: Report CSV (boolean)
- `user_fields`: User Fields
- `suspension_details`: Suspension Details

### `zendesk_remove_user_tags`

**Remove User Tags.** Removes the given tags from one user and keeps the rest; tags not on the user are ignored. Returns the remaining tag list. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users, List Users or Get Current User. |
| `tags` | array | yes |  | Tags. Tags to remove; tags are lowercase and cannot contain spaces. |

Output fields:

- `tags`: Tags
- `count`: Count (number)

### `zendesk_search_users`

**Search Users.** Searches users with Zendesk search syntax: a plain email or name, or terms like email:jane@acme.com, role:agent, organization:acme or tags:vip. Use External ID for an exact external ID match. Returns user IDs for Create Ticket, Update Ticket and the user actions. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Search terms, e.g. jane@acme.com or role:agent name:Jane. |
| `external_id` | string | no |  | External ID. Exact external ID to match instead of a query. |
| `limit` | number | no |  | Limit. Records per page, 1 to 100. Defaults to 25. |
| `page` | number | no |  | Page. Page number, starting at 1. Pass next_page from a previous call. |

Output fields:

- `users`: Users
- `users[].id`: ID (number)
- `users[].url`: URL (url)
- `users[].name`: Name
- `users[].email`: Email (email)
- `users[].created_at`: Created At (datetime)
- `users[].updated_at`: Updated At (datetime)
- `users[].time_zone`: Time Zone
- `users[].iana_time_zone`: Iana Time Zone
- `users[].phone`: Phone
- `users[].shared_phone_number`: Shared Phone Number
- `users[].photo`: Photo
- `users[].locale_id`: Locale ID (number)
- `users[].locale`: Locale
- `users[].organization_id`: Organization ID (number)
- `users[].role`: Role
- `users[].verified`: Verified (boolean)
- `users[].external_id`: External ID
- `users[].tags`: Tags
- `users[].alias`: Alias
- `users[].active`: Active (boolean)
- `users[].shared`: Shared (boolean)
- `users[].shared_agent`: Shared Agent (boolean)
- `users[].last_login_at`: Last Login At (datetime)
- `users[].two_factor_auth_enabled`: Two Factor Auth Enabled
- `users[].signature`: Signature
- `users[].details`: Details
- `users[].notes`: Notes
- `users[].role_type`: Role Type (number)
- `users[].custom_role_id`: Custom Role ID (number)
- `users[].is_billing_admin`: Is Billing Admin (boolean)
- `users[].moderator`: Moderator (boolean)
- `users[].ticket_restriction`: Ticket Restriction
- `users[].only_private_comments`: Only Private Comments (boolean)
- `users[].restricted_agent`: Restricted Agent (boolean)
- `users[].suspended`: Suspended (boolean)
- `users[].default_group_id`: Default Group ID (number)
- `users[].report_csv`: Report CSV (boolean)
- `users[].user_fields`: User Fields
- `users[].suspension_details`: Suspension Details
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_page`: Next Page

### `zendesk_update_user_identity`

**Update User Identity.** Updates one identity of a user: corrects its value (email or phone) or marks it verified. Omitted fields keep their values. Identity IDs come from List User Identities. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users. |
| `identity_id` | string | yes |  | Identity ID. Numeric identity ID, from List User Identities. |
| `value` | string | no |  | Value. New email address or phone number. |
| `verified` | string | no |  | Verified. Yes marks the identity verified. One of `"true"`, `"false"`. |

Output fields:

- `url`: URL (url)
- `id`: ID (number)
- `user_id`: User ID (number)
- `type`: Type
- `value`: Value (email)
- `verified`: Verified (boolean)
- `primary`: Primary (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `verification_method`: Verification Method
- `verified_at`: Verified At
- `undeliverable_count`: Undeliverable Count (number)
- `deliverable_state`: Deliverable State

### `zendesk_update_user`

**Update User.** Updates one user by ID; omitted fields keep their values. Email here adds a new primary identity rather than editing the old one; manage emails and phones with the user identity actions. Tags replaces the whole set, so prefer Add User Tags or Remove User Tags. Suspended Yes blocks the user from signing in and suspends their new tickets. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Numeric user ID, from Search Users or List Users. |
| `name` | string | no |  | Name. |
| `email` | string | no |  | Email. Primary email address. |
| `phone` | string | no |  | Phone. |
| `role` | string | no |  | Role. Defaults to end-user. Only admins can create agents and admins. One of `"end-user"`, `"agent"`, `"admin"`. |
| `organization_id` | string | no |  | Organization ID. Organization ID, from Search Organizations. |
| `external_id` | string | no |  | External ID. Your own reference for the user. |
| `tags` | array | no |  | Tags. Replaces every tag on the user; an empty list is ignored. Prefer Add User Tags or Remove User Tags on existing users, which also clear tags. |
| `user_fields` | JSON | no |  | User Fields. Object of custom user field keys to values, keys from List User Fields, e.g. {"plan": "pro"}. |
| `details` | string | no |  | Details. Details such as an address. |
| `notes` | string | no |  | Notes. Internal notes visible to agents. |
| `verified` | string | no |  | Verified. Mark the email as verified so Zendesk sends no verification email. One of `"true"`, `"false"`. |
| `additional_fields` | JSON | no |  | Additional Fields. Other user attributes from the Zendesk Users API, e.g. {"time_zone": "Berlin", "locale": "de"}, or null values to clear fields. |
| `suspended` | string | no |  | Suspended. Yes suspends the user, No lifts the suspension. One of `"true"`, `"false"`. |

Output fields:

- `id`: ID (number)
- `url`: URL (url)
- `name`: Name
- `email`: Email (email)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `time_zone`: Time Zone
- `iana_time_zone`: Iana Time Zone
- `phone`: Phone
- `shared_phone_number`: Shared Phone Number
- `photo`: Photo
- `locale_id`: Locale ID (number)
- `locale`: Locale
- `organization_id`: Organization ID (number)
- `role`: Role
- `verified`: Verified (boolean)
- `external_id`: External ID
- `tags`: Tags
- `alias`: Alias
- `active`: Active (boolean)
- `shared`: Shared (boolean)
- `shared_agent`: Shared Agent (boolean)
- `last_login_at`: Last Login At (datetime)
- `two_factor_auth_enabled`: Two Factor Auth Enabled
- `signature`: Signature
- `details`: Details
- `notes`: Notes
- `role_type`: Role Type (number)
- `custom_role_id`: Custom Role ID (number)
- `is_billing_admin`: Is Billing Admin (boolean)
- `moderator`: Moderator (boolean)
- `ticket_restriction`: Ticket Restriction
- `only_private_comments`: Only Private Comments (boolean)
- `restricted_agent`: Restricted Agent (boolean)
- `suspended`: Suspended (boolean)
- `default_group_id`: Default Group ID (number)
- `report_csv`: Report CSV (boolean)
- `user_fields`: User Fields
- `suspension_details`: Suspension Details

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
