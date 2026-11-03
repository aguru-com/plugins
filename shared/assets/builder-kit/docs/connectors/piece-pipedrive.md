# Pipedrive

Sales CRM and pipeline management software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pipedrive'
  version: '0.10.2'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `add-follower`

**Add Follower.** Adds a user as a follower of a single record, with the Target Object dropdown selecting the type (deal, person, organization, or product) and the Target Object ID identifying it. Use to subscribe a user to updates on a record; requires the follower user ID. Not idempotent: each call creates a follower association. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `followerId` | string | yes |  | Follower. A value the product loads from the provider, such as an id; write the value itself. |
| `entity` | string | yes |  | Target Object. Type of object to add the follower to. One of `"deal"`, `"person"`, `"organization"`, `"product"`. |
| `entityId` | string | yes |  | Target Object ID. ID of the object to add the follower to. |

Output fields:

- `success`: Success (boolean)
- `data`: Follower
- `data.user_id`: User ID (number)
- `data.add_time`: Followed At (datetime)

### `get-note`

**Retrieve a Note.** Retrieves a single note by its numeric note ID. Use when you already have the note ID; to list the notes attached to a deal, lead, person, or organization, use Find Notes instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `noteId` | number | yes |  | Note ID. |

Output fields:

- `success`: Success (boolean)
- `data`: Note
- `data.id`: Note ID (number)
- `data.content`: Content (html)
- `data.deal_id`: Deal ID (number)
- `data.person_id`: Person ID (number)
- `data.org_id`: Organization ID (number)
- `data.lead_id`: Lead ID
- `data.deal`: Deal
- `data.deal.title`: Title
- `data.user`: Author
- `data.user.name`: Name
- `data.user.email`: Email (email)
- `data.user_id`: Author ID (number)
- `data.last_update_user_id`: Last Updated By (number)
- `data.pinned_to_deal_flag`: Pinned to Deal (boolean)
- `data.pinned_to_person_flag`: Pinned to Person (boolean)
- `data.pinned_to_organization_flag`: Pinned to Organization (boolean)
- `data.active_flag`: Active (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `create-note`

**Create Note.** Create a note with the given content and attach it to at least one deal, person, organization, or lead (at least one association is required, with optional pinning). Pick this to record a comment or log against a CRM record; each call creates a new note, so repeating it produces duplicates. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Content. |
| `dealId` | number | no |  | Deal ID. You can use Find Deal action to retrieve deal ID. |
| `pinnedToDeal` | boolean | no | `false` | Pin note to deal?. |
| `personId` | number | no |  | Person ID. You can use Find Person action to retrieve person ID. |
| `pinnedToPerson` | boolean | no | `false` | Pin note to person?. |
| `organizationId` | number | no |  | Organization ID. You can use Find Organization action to retrieve org ID. |
| `pinnedToOrganization` | boolean | no | `false` | Pin note to organization?. |
| `leadId` | string | no |  | Lead ID. |
| `pinnedToLead` | boolean | no | `false` | Pin note to lead?. |

Output fields:

- `success`: Success (boolean)
- `data`: Note
- `data.id`: Note ID (number)
- `data.content`: Content (html)
- `data.deal_id`: Deal ID (number)
- `data.person_id`: Person ID (number)
- `data.org_id`: Organization ID (number)
- `data.lead_id`: Lead ID
- `data.deal`: Deal
- `data.deal.title`: Title
- `data.user`: Author
- `data.user.name`: Name
- `data.user.email`: Email (email)
- `data.user_id`: Author ID (number)
- `data.last_update_user_id`: Last Updated By (number)
- `data.pinned_to_deal_flag`: Pinned to Deal (boolean)
- `data.pinned_to_person_flag`: Pinned to Person (boolean)
- `data.pinned_to_organization_flag`: Pinned to Organization (boolean)
- `data.active_flag`: Active (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `add-labels-to-person`

**Add Labels to Person.** Set the label(s) on an existing person by ID using pre-existing label definitions. Pick this to tag/categorize a known person; it replaces the person's label_ids with the supplied set rather than merging, so include all labels that should remain. Mutates the person record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personId` | number | yes |  | Person ID. You can use Find Person action to retrieve person ID. |
| `labelIds` | array | yes |  | Label. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `success`: Success (boolean)
- `data`: Person
- `data.id`: Person ID (number)
- `data.name`: Name
- `data.first_name`: First Name
- `data.last_name`: Last Name
- `data.emails`: Emails
- `data.emails[].value`: Value
- `data.emails[].label`: Label
- `data.emails[].primary`: Primary (boolean)
- `data.phones`: Phones
- `data.phones[].value`: Value
- `data.phones[].label`: Label
- `data.phones[].primary`: Primary (boolean)
- `data.org_id`: Organization ID (number)
- `data.owner_id`: Owner ID (number)
- `data.label_ids`: Label IDs
- `data.visible_to`: Visible To
- `data.is_deleted`: Deleted (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `add-product-to-deal`

**Add Product to Deal.** Attaches an existing product (by product ID) as a line item on a deal (by deal ID), setting its unit price, quantity, and optional discount and tax. Use when building out the products on a deal; requires both IDs and a price and quantity. Not idempotent: each call adds another line item, so calling it twice attaches the product twice. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | number | yes |  | Deal ID. You can use Find Deal action to retrieve deal ID. |
| `productId` | number | yes |  | Product ID. You can use Find Product action to retrieve product ID. |
| `price` | number | yes |  | Price. |
| `quantity` | number | yes |  | Quantity. |
| `discount` | number | no |  | Discount. |
| `discountType` | string | no |  | Discount Type. One of `"percentage"`, `"amount"`. |
| `comments` | string | no |  | Comments. |
| `enableProduct` | boolean | no | `true` | Enable Product?. |
| `taxMethod` | string | no |  | Tax Method. One of `"exclusive"`, `"inclusive"`, `"none"`. |
| `taxPercentage` | number | no |  | Tax Percentage. |

Output fields:

- `success`: Success (boolean)
- `data`: Deal Product
- `data.id`: Deal Product ID (number)
- `data.deal_id`: Deal ID (number)
- `data.product_id`: Product ID (number)
- `data.name`: Name
- `data.item_price`: Item Price (number)
- `data.quantity`: Quantity (number)
- `data.sum`: Sum (number)
- `data.currency`: Currency
- `data.discount`: Discount (number)
- `data.discount_type`: Discount Type
- `data.tax`: Tax (number)
- `data.tax_method`: Tax Method
- `data.comments`: Comments
- `data.order_nr`: Order Number (number)
- `data.is_enabled`: Enabled (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `attach-file`

**Attach File.** Uploads a file and attaches it to one or more CRM records by supplying any of the optional deal, person, organization, product, or activity IDs. Use to add documents or images to existing records; requires the file content and a file name. Not idempotent: each call uploads and creates a separate file attachment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |
| `fileName` | string | yes |  | File Name. |
| `dealId` | number | no |  | Deal ID. You can use Find Deal action to retrieve deal ID. |
| `personId` | number | no |  | Person ID. You can use Find Person action to retrieve person ID. |
| `organizationId` | number | no |  | Organization ID. You can use Find Organization action to retrieve org ID. |
| `productId` | number | no |  | Product ID. You can use Find Product action to retrieve product ID. |
| `activityId` | number | no |  | Activity ID. |

Output fields:

- `success`: Success (boolean)
- `data`: File
- `data.id`: File ID (number)
- `data.name`: Name
- `data.file_name`: Stored File Name
- `data.file_type`: File Type
- `data.file_size`: File Size (number)
- `data.url`: Download URL (url)
- `data.description`: Description
- `data.user_id`: User ID (number)
- `data.active_flag`: Active (boolean)
- `data.inline_flag`: Inline (boolean)
- `data.remote_location`: Remote Location
- `data.remote_id`: Remote ID
- `data.deal_id`: Deal ID (number)
- `data.deal_name`: Deal Name
- `data.lead_id`: Lead ID
- `data.lead_name`: Lead Name
- `data.person_id`: Person ID (number)
- `data.person_name`: Person Name
- `data.org_id`: Organization ID (number)
- `data.org_name`: Organization Name
- `data.product_id`: Product ID (number)
- `data.product_name`: Product Name
- `data.activity_id`: Activity ID (number)
- `data.log_id`: Log ID (number)
- `data.mail_message_id`: Mail Message ID (number)
- `data.mail_template_id`: Mail Template ID (number)
- `data.cid`: Content ID
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `create-activity`

**Create Activity.** Creates an activity (call, meeting, task, etc.) with a subject and optional type, due date/time, owner, and links to a deal, lead, person, or organization. Use to schedule or log work against CRM records (use Update Activity to change one that exists). Not idempotent: each call creates a separate activity. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. |
| `organizationId` | number | no |  | Organization ID. You can use Find Organization action to retrieve org ID. |
| `personId` | number | no |  | Person ID. You can use Find Person action to retrieve person ID. |
| `dealId` | number | no |  | Deal ID. You can use Find Deal action to retrieve deal ID. |
| `leadId` | string | no |  | Lead ID. |
| `assignTo` | string | no |  | Assign To. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | no |  | Activity Type. A value the product loads from the provider, such as an id; write the value itself. |
| `dueDate` | ISO date-time string | no |  | Due Date. Please enter date in YYYY-MM-DD format. |
| `dueTime` | string | no |  | Due Time. Please enter time in HH:MM format. |
| `duration` | string | no |  | Duration. Please enter time in HH:MM format (e.g., "01:30" for 1 hour 30 minutes). |
| `isDone` | boolean | no | `false` | Mark as Done?. |
| `busy` | string | no |  | Free or Busy. One of `"free"`, `"busy"`. |
| `note` | string | no |  | Note. |
| `publicDescription` | string | no |  | Public Description. |

Output fields:

- `success`: Success (boolean)
- `data`: Activity
- `data.id`: Activity ID (number)
- `data.subject`: Subject
- `data.type`: Type
- `data.done`: Done (boolean)
- `data.due_date`: Due Date (date)
- `data.due_time`: Due Time
- `data.duration`: Duration (duration)
- `data.priority`: Priority
- `data.note`: Note (html)
- `data.public_description`: Public Description
- `data.location`: Location
- `data.outcome`: Outcome
- `data.busy`: Busy (boolean)
- `data.deal_id`: Deal ID (number)
- `data.person_id`: Person ID (number)
- `data.org_id`: Organization ID (number)
- `data.lead_id`: Lead ID
- `data.owner_id`: Owner ID (number)
- `data.creator_user_id`: Creator User ID (number)
- `data.participants`: Participants
- `data.conference_meeting_url`: Meeting URL (url)
- `data.marked_as_done_time`: Marked Done At (datetime)
- `data.is_deleted`: Deleted (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `update-activity`

**Update Activity.** Updates fields on an existing activity identified by its activity ID, such as subject, type, due date/time, owner, done state, and linked records; only supplied fields change. Use to reschedule or mark an activity done (use Create Activity to add a new one). Idempotent: repeating the same update converges to the same activity state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `activityId` | number | yes |  | Activity ID. |
| `subject` | string | no |  | Subject. |
| `organizationId` | number | no |  | Organization ID. You can use Find Organization action to retrieve org ID. |
| `personId` | number | no |  | Person ID. You can use Find Person action to retrieve person ID. |
| `dealId` | number | no |  | Deal ID. You can use Find Deal action to retrieve deal ID. |
| `leadId` | string | no |  | Lead ID. |
| `assignTo` | string | no |  | Assign To. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | no |  | Activity Type. A value the product loads from the provider, such as an id; write the value itself. |
| `dueDate` | ISO date-time string | no |  | Due Date. Please enter date in YYYY-MM-DD format. |
| `dueTime` | string | no |  | Due Time. Please enter time in HH:MM format. |
| `duration` | string | no |  | Duration. Please enter time in HH:MM format (e.g., "01:30" for 1 hour 30 minutes). |
| `isDone` | boolean | no | `false` | Mark as Done?. |
| `busy` | string | no |  | Free or Busy. One of `"free"`, `"busy"`. |
| `note` | string | no |  | Note. |
| `publicDescription` | string | no |  | Public Description. |

Output fields:

- `success`: Success (boolean)
- `data`: Activity
- `data.id`: Activity ID (number)
- `data.subject`: Subject
- `data.type`: Type
- `data.done`: Done (boolean)
- `data.due_date`: Due Date (date)
- `data.due_time`: Due Time
- `data.duration`: Duration (duration)
- `data.priority`: Priority
- `data.note`: Note (html)
- `data.public_description`: Public Description
- `data.location`: Location
- `data.outcome`: Outcome
- `data.busy`: Busy (boolean)
- `data.deal_id`: Deal ID (number)
- `data.person_id`: Person ID (number)
- `data.org_id`: Organization ID (number)
- `data.lead_id`: Lead ID
- `data.owner_id`: Owner ID (number)
- `data.creator_user_id`: Creator User ID (number)
- `data.participants`: Participants
- `data.conference_meeting_url`: Meeting URL (url)
- `data.marked_as_done_time`: Marked Done At (datetime)
- `data.is_deleted`: Deleted (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `create-deal`

**Create Deal.** Creates a new deal with a required title and optional value, currency, pipeline/stage, status, owner, and linked person/organization. Use to add a sales opportunity to a pipeline (use Update Deal to edit one, or Add Product to Deal to attach line items). Not idempotent: each call creates a separate deal, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `creationTime` | ISO date-time string | no |  | Creation Time. |
| `status` | string | no |  | Status. One of `"open"`, `"won"`, `"lost"`, `"deleted"`. |
| `stageId` | string | no |  | Stage. If a stage is chosen above, the pipeline field will be ignored. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineId` | string | no |  | Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `organizationId` | number | no |  | Organization ID. You can use Find Organization action to retrieve org ID. |
| `personId` | number | no |  | Person ID. You can use Find Person action to retrieve person ID. |
| `labelIds` | array | no |  | Label. Values the product loads from the provider, such as ids; write an array of them. |
| `probability` | number | no |  | Probability. |
| `expectedCloseDate` | ISO date-time string | no |  | Expected Close Date. Please enter date in YYYY-MM-DD format. |
| `dealValue` | number | no |  | Value. |
| `dealValueCurrency` | string | no |  | Currency. Please enter currency code (e.g., "USD", "EUR"). |
| `visibleTo` | string | no |  | Visible To. One of `1`, `3`. |
| `customfields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Deal
- `data.id`: Deal ID (number)
- `data.title`: Title
- `data.value`: Value (number)
- `data.currency`: Currency
- `data.status`: Status
- `data.probability`: Probability (number)
- `data.stage_id`: Stage ID (number)
- `data.pipeline_id`: Pipeline ID (number)
- `data.person_id`: Person ID (number)
- `data.org_id`: Organization ID (number)
- `data.owner_id`: Owner ID (number)
- `data.creator_user_id`: Creator User ID (number)
- `data.label_ids`: Label IDs
- `data.expected_close_date`: Expected Close Date (date)
- `data.close_time`: Closed At (datetime)
- `data.won_time`: Won At (datetime)
- `data.lost_time`: Lost At (datetime)
- `data.lost_reason`: Lost Reason
- `data.stage_change_time`: Stage Changed At (datetime)
- `data.mrr`: MRR (number)
- `data.arr`: ARR (number)
- `data.acv`: ACV (number)
- `data.is_archived`: Archived (boolean)
- `data.is_deleted`: Deleted (boolean)
- `data.visible_to`: Visible To
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `update-deal`

**Update Deal.** Updates fields on an existing deal identified by its deal ID, such as title, value, stage, status, owner, or linked person/organization; only supplied fields are changed. Use to modify a deal you already know the ID of (use Create Deal to add a new one, or Find Deal to locate one first). Idempotent: repeating the same update converges to the same deal state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | number | yes |  | Deal ID. You can use Find Deal action to retrieve deal ID. |
| `title` | string | no |  | Title. |
| `creationTime` | ISO date-time string | no |  | Creation Time. |
| `status` | string | no |  | Status. One of `"open"`, `"won"`, `"lost"`, `"deleted"`. |
| `stageId` | string | no |  | Stage. If a stage is chosen above, the pipeline field will be ignored. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineId` | string | no |  | Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `organizationId` | number | no |  | Organization ID. You can use Find Organization action to retrieve org ID. |
| `personId` | number | no |  | Person ID. You can use Find Person action to retrieve person ID. |
| `labelIds` | array | no |  | Label. Values the product loads from the provider, such as ids; write an array of them. |
| `probability` | number | no |  | Probability. |
| `expectedCloseDate` | ISO date-time string | no |  | Expected Close Date. Please enter date in YYYY-MM-DD format. |
| `dealValue` | number | no |  | Value. |
| `dealValueCurrency` | string | no |  | Currency. Please enter currency code (e.g., "USD", "EUR"). |
| `visibleTo` | string | no |  | Visible To. One of `1`, `3`. |
| `customfields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Deal
- `data.id`: Deal ID (number)
- `data.title`: Title
- `data.value`: Value (number)
- `data.currency`: Currency
- `data.status`: Status
- `data.probability`: Probability (number)
- `data.stage_id`: Stage ID (number)
- `data.pipeline_id`: Pipeline ID (number)
- `data.person_id`: Person ID (number)
- `data.org_id`: Organization ID (number)
- `data.owner_id`: Owner ID (number)
- `data.creator_user_id`: Creator User ID (number)
- `data.label_ids`: Label IDs
- `data.expected_close_date`: Expected Close Date (date)
- `data.close_time`: Closed At (datetime)
- `data.won_time`: Won At (datetime)
- `data.lost_time`: Lost At (datetime)
- `data.lost_reason`: Lost Reason
- `data.stage_change_time`: Stage Changed At (datetime)
- `data.mrr`: MRR (number)
- `data.arr`: ARR (number)
- `data.acv`: ACV (number)
- `data.is_archived`: Archived (boolean)
- `data.is_deleted`: Deleted (boolean)
- `data.visible_to`: Visible To
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `create-lead`

**Create Lead.** Creates a new lead with a required title and optional value, owner, channel, and custom fields. At least one of a linked person or organization must be supplied. Use to capture an unqualified opportunity (use Create Deal once it advances to your pipeline, or Update Lead to edit one). Not idempotent: each call creates a separate lead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `organizationId` | number | no |  | Organization ID. You can use Find Organization action to retrieve org ID. |
| `personId` | number | no |  | Person ID. You can use Find Person action to retrieve person ID. |
| `labelIds` | array | no |  | Label. Values the product loads from the provider, such as ids; write an array of them. |
| `expectedCloseDate` | ISO date-time string | no |  | Expected Close Date. Please enter date in YYYY-MM-DD format. |
| `visibleTo` | string | no |  | Visible To. One of `1`, `3`. |
| `channel` | string | no |  | Channel. A value the product loads from the provider, such as an id; write the value itself. |
| `leadValue` | number | no |  | Lead Value Amount. |
| `leadValueCurrency` | string | no |  | Lead Value Currency. The currency of the lead value (e.g., "USD", "EUR"). |
| `customfields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Lead
- `data.id`: Lead ID
- `data.title`: Title
- `data.value`: Value
- `data.owner_id`: Owner ID (number)
- `data.creator_id`: Creator ID (number)
- `data.person_id`: Person ID (number)
- `data.organization_id`: Organization ID (number)
- `data.label_ids`: Label IDs
- `data.expected_close_date`: Expected Close Date (date)
- `data.source_name`: Source
- `data.channel`: Channel
- `data.cc_email`: CC Email (email)
- `data.was_seen`: Seen (boolean)
- `data.is_archived`: Archived (boolean)
- `data.next_activity_id`: Next Activity ID (number)
- `data.visible_to`: Visible To
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `update-lead`

**Update Lead.** Updates fields on an existing lead identified by its lead ID, such as title, owner, value, channel, or linked person/organization; only supplied fields change. Use to modify a lead you have the ID for (use Create Lead to add one, or Find Lead to locate it). Idempotent: repeating the same update converges to the same lead state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead ID. |
| `title` | string | no |  | Title. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `organizationId` | number | no |  | Organization ID. You can use Find Organization action to retrieve org ID. |
| `personId` | number | no |  | Person ID. You can use Find Person action to retrieve person ID. |
| `labelIds` | array | no |  | Label. Values the product loads from the provider, such as ids; write an array of them. |
| `expectedCloseDate` | ISO date-time string | no |  | Expected Close Date. Please enter date in YYYY-MM-DD format. |
| `visibleTo` | string | no |  | Visible To. One of `1`, `3`. |
| `channel` | string | no |  | Channel. A value the product loads from the provider, such as an id; write the value itself. |
| `leadValue` | number | no |  | Lead Value Amount. |
| `leadValueCurrency` | string | no |  | Lead Value Currency. The currency of the lead value (e.g., "USD", "EUR"). |
| `customfields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Lead
- `data.id`: Lead ID
- `data.title`: Title
- `data.value`: Value
- `data.owner_id`: Owner ID (number)
- `data.creator_id`: Creator ID (number)
- `data.person_id`: Person ID (number)
- `data.organization_id`: Organization ID (number)
- `data.label_ids`: Label IDs
- `data.expected_close_date`: Expected Close Date (date)
- `data.source_name`: Source
- `data.channel`: Channel
- `data.cc_email`: CC Email (email)
- `data.was_seen`: Seen (boolean)
- `data.is_archived`: Archived (boolean)
- `data.next_activity_id`: Next Activity ID (number)
- `data.visible_to`: Visible To
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `create-organization`

**Create Organization.** Creates a new organization (company) with a required name and optional owner, address, visibility, labels, and custom fields. Use to add a company record (use Update Organization to edit one, or Find Organization to check for an existing match). Not idempotent: each call creates a separate organization, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `visibleTo` | string | no |  | Visible To. One of `1`, `3`. |
| `labelIds` | array | no |  | Label. Values the product loads from the provider, such as ids; write an array of them. |
| `address` | string | no |  | Address. |
| `customfields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Organization
- `data.id`: Organization ID (number)
- `data.name`: Name
- `data.address`: Address
- `data.website`: Website (url)
- `data.linkedin`: LinkedIn (url)
- `data.industry`: Industry
- `data.employee_count`: Employees (number)
- `data.annual_revenue`: Annual Revenue (number)
- `data.owner_id`: Owner ID (number)
- `data.label_ids`: Label IDs
- `data.visible_to`: Visible To
- `data.is_deleted`: Deleted (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `update-organization`

**Update Organization.** Update fields on an existing organization identified by ID (name, owner, address, visibility, labels, and custom fields). Pick this to modify a known organization; only supplied fields are changed. Re-running with the same inputs yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationId` | number | yes |  | Organization ID. You can use Find Organization action to retrieve org ID. |
| `name` | string | no |  | Name. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `visibleTo` | string | no |  | Visible To. One of `1`, `3`. |
| `labelIds` | array | no |  | Label. Values the product loads from the provider, such as ids; write an array of them. |
| `address` | string | no |  | Address. |
| `customfields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Organization
- `data.id`: Organization ID (number)
- `data.name`: Name
- `data.address`: Address
- `data.website`: Website (url)
- `data.linkedin`: LinkedIn (url)
- `data.industry`: Industry
- `data.employee_count`: Employees (number)
- `data.annual_revenue`: Annual Revenue (number)
- `data.owner_id`: Owner ID (number)
- `data.label_ids`: Label IDs
- `data.visible_to`: Visible To
- `data.is_deleted`: Deleted (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `create-person`

**Create Person.** Creates a new person (contact) with a name, optional emails/phones, owner, organization, and custom fields. Provide either a single Name or First/Last Name, not both. Use to add a contact (use Update Person to edit an existing one, or Find Person to check for one first). Not idempotent: each call creates a separate person, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `organizationId` | number | no |  | Organization ID. You can use Find Organization action to retrieve org ID. |
| `email` | array | no |  | Email. |
| `phone` | array | no |  | Phone. |
| `labelIds` | array | no |  | Label. Values the product loads from the provider, such as ids; write an array of them. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `visibleTo` | string | no |  | Visible To. One of `1`, `3`. |
| `marketing_status` | string | no |  | Marketing Status. Marketing opt-in status. One of `"no_consent"`, `"unsubscribed"`, `"subscribed"`, `"archived"`. |
| `customfields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Person
- `data.id`: Person ID (number)
- `data.name`: Name
- `data.first_name`: First Name
- `data.last_name`: Last Name
- `data.emails`: Emails
- `data.emails[].value`: Value
- `data.emails[].label`: Label
- `data.emails[].primary`: Primary (boolean)
- `data.phones`: Phones
- `data.phones[].value`: Value
- `data.phones[].label`: Label
- `data.phones[].primary`: Primary (boolean)
- `data.org_id`: Organization ID (number)
- `data.owner_id`: Owner ID (number)
- `data.label_ids`: Label IDs
- `data.visible_to`: Visible To
- `data.is_deleted`: Deleted (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `update-person`

**Update Person.** Updates fields on an existing person identified by their person ID, such as name, emails, phones, owner, organization, and custom fields; only supplied fields change. Use to edit a contact you have the ID for (use Create Person to add one, or Find Person to locate it). Idempotent: repeating the same update converges to the same person state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personId` | number | yes |  | Person ID. You can use Find Person action to retrieve person ID. |
| `name` | string | no |  | Name. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `organizationId` | number | no |  | Organization ID. You can use Find Organization action to retrieve org ID. |
| `email` | array | no |  | Email. |
| `phone` | array | no |  | Phone. |
| `labelIds` | array | no |  | Label. Values the product loads from the provider, such as ids; write an array of them. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `visibleTo` | string | no |  | Visible To. One of `1`, `3`. |
| `marketing_status` | string | no |  | Marketing Status. Marketing opt-in status. One of `"no_consent"`, `"unsubscribed"`, `"subscribed"`, `"archived"`. |
| `customfields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Person
- `data.id`: Person ID (number)
- `data.name`: Name
- `data.first_name`: First Name
- `data.last_name`: Last Name
- `data.emails`: Emails
- `data.emails[].value`: Value
- `data.emails[].label`: Label
- `data.emails[].primary`: Primary (boolean)
- `data.phones`: Phones
- `data.phones[].value`: Value
- `data.phones[].label`: Label
- `data.phones[].primary`: Primary (boolean)
- `data.org_id`: Organization ID (number)
- `data.owner_id`: Owner ID (number)
- `data.label_ids`: Label IDs
- `data.visible_to`: Visible To
- `data.is_deleted`: Deleted (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `create-product`

**Create Product.** Create a new product in the catalog with name, code, pricing (price/cost/overhead/currency/tax), unit, owner, visibility, and custom fields. Pick this to add a product; each call creates a separate record, so repeating it produces duplicates. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `code` | string | no |  | Code. |
| `description` | string | no |  | Description. |
| `unit` | string | no |  | Unit. |
| `tax` | number | no |  | Tax percentage. |
| `isActive` | boolean | no | `true` | Is Active ?. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `currency` | string | no |  | Currency. Please enter currency code (e.g., "USD", "EUR"). |
| `price` | number | no |  | Price. |
| `cost` | number | no |  | Cost. |
| `overheadCost` | number | no |  | Overhead Cost. |
| `visibleTo` | string | no |  | Visible To. One of `1`, `3`. |
| `customfields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Product
- `data.id`: Product ID (number)
- `data.name`: Name
- `data.code`: Code
- `data.description`: Description
- `data.unit`: Unit
- `data.tax`: Tax (number)
- `data.category`: Category
- `data.prices`: Prices
- `data.prices[].price`: Price (number)
- `data.prices[].currency`: Currency
- `data.prices[].cost`: Cost (number)
- `data.prices[].direct_cost`: Direct Cost (number)
- `data.prices[].notes`: Notes
- `data.billing_frequency`: Billing Frequency
- `data.billing_frequency_cycles`: Billing Cycles (number)
- `data.is_linkable`: Linkable (boolean)
- `data.is_deleted`: Deleted (boolean)
- `data.owner_id`: Owner ID (number)
- `data.visible_to`: Visible To
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `update-product`

**Update Product.** Updates fields on an existing product identified by its product ID, such as name, code, pricing, tax, owner, active state, and custom fields; only supplied fields change. Use to edit a product you have the ID for (use Find Products to locate it first). Idempotent: repeating the same update converges to the same product state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Product ID. |
| `name` | string | no |  | Name. |
| `code` | string | no |  | Code. |
| `description` | string | no |  | Description. |
| `unit` | string | no |  | Unit. |
| `tax` | number | no |  | Tax percentage. |
| `isActive` | boolean | no | `true` | Is Active ?. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `currency` | string | no |  | Currency. Please enter currency code (e.g., "USD", "EUR"). |
| `price` | number | no |  | Price. |
| `cost` | number | no |  | Cost. |
| `overheadCost` | number | no |  | Overhead Cost. |
| `visibleTo` | string | no |  | Visible To. One of `1`, `3`. |
| `customfields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Product
- `data.id`: Product ID (number)
- `data.name`: Name
- `data.code`: Code
- `data.description`: Description
- `data.unit`: Unit
- `data.tax`: Tax (number)
- `data.category`: Category
- `data.prices`: Prices
- `data.prices[].price`: Price (number)
- `data.prices[].currency`: Currency
- `data.prices[].cost`: Cost (number)
- `data.prices[].direct_cost`: Direct Cost (number)
- `data.prices[].notes`: Notes
- `data.billing_frequency`: Billing Frequency
- `data.billing_frequency_cycles`: Billing Cycles (number)
- `data.is_linkable`: Linkable (boolean)
- `data.is_deleted`: Deleted (boolean)
- `data.owner_id`: Owner ID (number)
- `data.visible_to`: Visible To
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)

### `find-deals-associated-with-person`

**Find Deals Associated With Person.** Lists all deals linked to a given person, identified by their numeric person ID, sorted by most recently updated. Use when you already have a person and need their associated deals; to look up a deal by a field value instead, use Find Deal. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personId` | number | yes |  | Person ID. You can use Find Person action to retrieve person ID. |

Output fields:

- `found`: Found (boolean)
- `data`: Deals
- `data[].id`: Deal ID (number)
- `data[].title`: Title
- `data[].value`: Value (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].probability`: Probability (number)
- `data[].stage_id`: Stage ID (number)
- `data[].pipeline_id`: Pipeline ID (number)
- `data[].person_id`: Person ID (number)
- `data[].org_id`: Organization ID (number)
- `data[].owner_id`: Owner ID (number)
- `data[].creator_user_id`: Creator User ID (number)
- `data[].label_ids`: Label IDs
- `data[].expected_close_date`: Expected Close Date (date)
- `data[].close_time`: Closed At (datetime)
- `data[].won_time`: Won At (datetime)
- `data[].lost_time`: Lost At (datetime)
- `data[].lost_reason`: Lost Reason
- `data[].stage_change_time`: Stage Changed At (datetime)
- `data[].mrr`: MRR (number)
- `data[].arr`: ARR (number)
- `data[].acv`: ACV (number)
- `data[].is_archived`: Archived (boolean)
- `data[].is_deleted`: Deleted (boolean)
- `data[].visible_to`: Visible To
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)
- `data[].activities_count`: Activities (number)
- `data[].done_activities_count`: Done Activities (number)
- `data[].undone_activities_count`: Undone Activities (number)
- `data[].notes_count`: Notes (number)
- `data[].files_count`: Files (number)
- `data[].followers_count`: Followers (number)
- `data[].participants_count`: Participants (number)
- `data[].products_count`: Products (number)
- `data[].last_activity_id`: Last Activity ID (number)
- `data[].next_activity_id`: Next Activity ID (number)
- `data[].smart_bcc_email`: Smart BCC Email (email)

### `find-product`

**Find Product.** Search the product catalog by name and return the single best-matching product with its full details and custom fields. Pick this when you have a product name or keyword rather than an ID; use Retrieve a Product when you already know the exact product ID. Read-only and returns at most one match (found:false when nothing matches). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchTerm` | string | yes |  | Search Term. |

Output fields:

- `found`: Found (boolean)
- `data`: Products
- `data[].id`: Product ID (number)
- `data[].name`: Name
- `data[].code`: Code
- `data[].description`: Description
- `data[].unit`: Unit
- `data[].tax`: Tax (number)
- `data[].category`: Category
- `data[].prices`: Prices
- `data[].prices[].price`: Price (number)
- `data[].prices[].currency`: Currency
- `data[].prices[].cost`: Cost (number)
- `data[].prices[].direct_cost`: Direct Cost (number)
- `data[].prices[].notes`: Notes
- `data[].billing_frequency`: Billing Frequency
- `data[].billing_frequency_cycles`: Billing Cycles (number)
- `data[].is_linkable`: Linkable (boolean)
- `data[].is_deleted`: Deleted (boolean)
- `data[].owner_id`: Owner ID (number)
- `data[].visible_to`: Visible To
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)

### `find-products`

**Find Products.** Searches products by exact match on either name or product code (selected via the Field dropdown) and returns all matches, paging through every result. Use to locate products before adding them to a deal or updating them. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `field` | string | yes | `"name"` | Field to search by. One of `"name"`, `"code"`. |
| `fieldValue` | string | yes |  | Field Value. |

Output fields:

- `found`: Found (boolean)
- `data`: Products
- `data[].id`: Product ID (number)
- `data[].name`: Name
- `data[].code`: Code
- `data[].tax`: Tax (number)
- `data[].type`: Type
- `data[].owner`: Owner
- `data[].visible_to`: Visible To
- `data[].custom_fields`: Custom Fields (an object whose keys vary)

### `find-notes`

**Find Notes.** Lists notes attached to a single parent record, chosen via the Search By dropdown (Deal, Lead, Person, or Organization) plus that record's ID, sorted newest-updated first. Use to retrieve the notes on a known object; to fetch one specific note by its own ID, use Retrieve a Note. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes |  | Search By. One of `"deal_id"`, `"lead_id"`, `"person_id"`, `"org_id"`. |
| `objectId` | string | yes |  | ID. |

Output fields:

- `found`: Found (boolean)
- `data`: Notes
- `data[].id`: Note ID (number)
- `data[].content`: Content (html)
- `data[].deal_id`: Deal ID (number)
- `data[].person_id`: Person ID (number)
- `data[].org_id`: Organization ID (number)
- `data[].lead_id`: Lead ID
- `data[].deal`: Deal
- `data[].deal.title`: Title
- `data[].user`: Author
- `data[].user.name`: Name
- `data[].user.email`: Email (email)
- `data[].user_id`: Author ID (number)
- `data[].last_update_user_id`: Last Updated By (number)
- `data[].pinned_to_deal_flag`: Pinned to Deal (boolean)
- `data[].pinned_to_person_flag`: Pinned to Person (boolean)
- `data[].pinned_to_organization_flag`: Pinned to Organization (boolean)
- `data[].active_flag`: Active (boolean)
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)

### `get-product`

**Retrieve a Product.** Retrieve a single product by its exact numeric ID, returning full details and resolved custom fields. Pick this when you already know the product ID; use Find Product to search by name instead. Read-only and returns found:false rather than erroring when the ID does not exist. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | number | yes |  | Product ID. |

Output fields:

- `found`: Found (boolean)
- `data`: Products
- `data[].id`: Product ID (number)
- `data[].name`: Name
- `data[].code`: Code
- `data[].description`: Description
- `data[].unit`: Unit
- `data[].tax`: Tax (number)
- `data[].category`: Category
- `data[].prices`: Prices
- `data[].prices[].price`: Price (number)
- `data[].prices[].currency`: Currency
- `data[].prices[].cost`: Cost (number)
- `data[].prices[].direct_cost`: Direct Cost (number)
- `data[].prices[].notes`: Notes
- `data[].billing_frequency`: Billing Frequency
- `data[].billing_frequency_cycles`: Billing Cycles (number)
- `data[].is_linkable`: Linkable (boolean)
- `data[].is_deleted`: Deleted (boolean)
- `data[].owner_id`: Owner ID (number)
- `data[].visible_to`: Visible To
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)

### `find-organization`

**Find Organization.** Finds a single organization by matching a chosen field to a value (exact match), returning the most recently updated match. Use to locate an organization before reading or updating it; pick the field via Search Field and supply its value. Read-only and idempotent (a temporary search filter is created and removed internally). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchField` | string | yes |  | Field to search by. A value the product loads from the provider, such as an id; write the value itself. |
| `searchFieldValue` | object | yes |  | Field Value. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `found`: Found (boolean)
- `data`: Organizations
- `data[].id`: Organization ID (number)
- `data[].name`: Name
- `data[].address`: Address
- `data[].website`: Website (url)
- `data[].linkedin`: LinkedIn (url)
- `data[].industry`: Industry
- `data[].employee_count`: Employees (number)
- `data[].annual_revenue`: Annual Revenue (number)
- `data[].owner_id`: Owner ID (number)
- `data[].label_ids`: Label IDs
- `data[].visible_to`: Visible To
- `data[].is_deleted`: Deleted (boolean)
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)
- `data[].people_count`: People (number)
- `data[].open_deals_count`: Open Deals (number)
- `data[].won_deals_count`: Won Deals (number)
- `data[].lost_deals_count`: Lost Deals (number)
- `data[].closed_deals_count`: Closed Deals (number)
- `data[].activities_count`: Activities (number)
- `data[].notes_count`: Notes (number)
- `data[].files_count`: Files (number)
- `data[].followers_count`: Followers (number)
- `data[].last_activity_id`: Last Activity ID (number)
- `data[].next_activity_id`: Next Activity ID (number)

### `find-person`

**Find Person.** Look up a single person by an exact value in a chosen field (e.g. email, phone, name, or a custom field). Pick this when you need to resolve a person record to its ID or details before acting on it. Effectively read-only (it creates and removes a temporary search filter) and returns the most recently updated match. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchField` | string | yes |  | Field to search by. A value the product loads from the provider, such as an id; write the value itself. |
| `searchFieldValue` | object | yes |  | Field Value. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `found`: Found (boolean)
- `data`: People
- `data[].id`: Person ID (number)
- `data[].name`: Name
- `data[].first_name`: First Name
- `data[].last_name`: Last Name
- `data[].emails`: Emails
- `data[].emails[].value`: Value
- `data[].emails[].label`: Label
- `data[].emails[].primary`: Primary (boolean)
- `data[].phones`: Phones
- `data[].phones[].value`: Value
- `data[].phones[].label`: Label
- `data[].phones[].primary`: Primary (boolean)
- `data[].org_id`: Organization ID (number)
- `data[].owner_id`: Owner ID (number)
- `data[].label_ids`: Label IDs
- `data[].visible_to`: Visible To
- `data[].is_deleted`: Deleted (boolean)
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)
- `data[].open_deals_count`: Open Deals (number)
- `data[].won_deals_count`: Won Deals (number)
- `data[].lost_deals_count`: Lost Deals (number)
- `data[].closed_deals_count`: Closed Deals (number)
- `data[].activities_count`: Activities (number)
- `data[].done_activities_count`: Done Activities (number)
- `data[].undone_activities_count`: Undone Activities (number)
- `data[].notes_count`: Notes (number)
- `data[].files_count`: Files (number)
- `data[].followers_count`: Followers (number)
- `data[].last_activity_id`: Last Activity ID (number)
- `data[].next_activity_id`: Next Activity ID (number)
- `data[].last_incoming_mail_time`: Last Incoming Mail (datetime)
- `data[].last_outgoing_mail_time`: Last Outgoing Mail (datetime)

### `find-deal`

**Find Deal.** Finds a single deal by matching a chosen field to a value (exact match), returning the most recently updated match. Use to locate a deal before reading or updating it; pick the field via Search Field and supply its value. To list deals tied to a specific person, use Find Deals Associated With Person instead. Read-only and idempotent (a temporary search filter is created and removed internally). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchField` | string | yes |  | Field to search by. A value the product loads from the provider, such as an id; write the value itself. |
| `searchFieldValue` | object | yes |  | Field Value. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `found`: Found (boolean)
- `data`: Deals
- `data[].id`: Deal ID (number)
- `data[].title`: Title
- `data[].value`: Value (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].probability`: Probability (number)
- `data[].stage_id`: Stage ID (number)
- `data[].pipeline_id`: Pipeline ID (number)
- `data[].person_id`: Person ID (number)
- `data[].org_id`: Organization ID (number)
- `data[].owner_id`: Owner ID (number)
- `data[].creator_user_id`: Creator User ID (number)
- `data[].label_ids`: Label IDs
- `data[].expected_close_date`: Expected Close Date (date)
- `data[].close_time`: Closed At (datetime)
- `data[].won_time`: Won At (datetime)
- `data[].lost_time`: Lost At (datetime)
- `data[].lost_reason`: Lost Reason
- `data[].stage_change_time`: Stage Changed At (datetime)
- `data[].mrr`: MRR (number)
- `data[].arr`: ARR (number)
- `data[].acv`: ACV (number)
- `data[].is_archived`: Archived (boolean)
- `data[].is_deleted`: Deleted (boolean)
- `data[].visible_to`: Visible To
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)
- `data[].activities_count`: Activities (number)
- `data[].done_activities_count`: Done Activities (number)
- `data[].undone_activities_count`: Undone Activities (number)
- `data[].notes_count`: Notes (number)
- `data[].files_count`: Files (number)
- `data[].followers_count`: Followers (number)
- `data[].participants_count`: Participants (number)
- `data[].products_count`: Products (number)
- `data[].last_activity_id`: Last Activity ID (number)
- `data[].next_activity_id`: Next Activity ID (number)
- `data[].smart_bcc_email`: Smart BCC Email (email)

### `find-activity`

**Find Activity.** Search activities by subject text, optionally narrowed by owner, type, done/not-done status, or a saved filter. Pick this to locate existing activities; matching is case-insensitive substring by default but can be made exact-match. Read-only and may return multiple matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. |
| `exactMatch` | boolean | no | `true` | Exact Match. |
| `assignTo` | string | no |  | Assign To. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | no |  | Activity Type. A value the product loads from the provider, such as an id; write the value itself. |
| `filterId` | string | no |  | Filter. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. One of `1`, `0`. |

Output fields:

- `found`: Found (boolean)
- `data`: Activities
- `data[].id`: Activity ID (number)
- `data[].subject`: Subject
- `data[].type`: Type
- `data[].done`: Done (boolean)
- `data[].due_date`: Due Date (date)
- `data[].due_time`: Due Time
- `data[].duration`: Duration (duration)
- `data[].priority`: Priority
- `data[].note`: Note (html)
- `data[].public_description`: Public Description
- `data[].location`: Location
- `data[].outcome`: Outcome
- `data[].busy`: Busy (boolean)
- `data[].deal_id`: Deal ID (number)
- `data[].person_id`: Person ID (number)
- `data[].org_id`: Organization ID (number)
- `data[].lead_id`: Lead ID
- `data[].owner_id`: Owner ID (number)
- `data[].creator_user_id`: Creator User ID (number)
- `data[].participants`: Participants
- `data[].conference_meeting_url`: Meeting URL (url)
- `data[].marked_as_done_time`: Marked Done At (datetime)
- `data[].is_deleted`: Deleted (boolean)
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)

### `find-user`

**Find User.** Search Pipedrive account users (team members, not CRM persons) by name or by email address. Pick this to resolve an owner or assignee to a user ID; choose the search-by field to match either a name or an email term. Read-only and may return multiple matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `field` | string | yes |  | Field to search by. One of `"name"`, `"email"`. |
| `fieldValue` | string | yes |  | Field Value. |

Output fields:

- `found`: Found (boolean)
- `data`: Users
- `data[].id`: User ID (number)
- `data[].name`: Name
- `data[].email`: Email (email)

### `find-lead`

**Find Lead.** Searches leads by title text and returns all matches, paging through every result. By default it matches titles containing the term; enable Exact Match for full case-insensitive title equality only. Use to locate leads before reading or updating them. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | yes |  | Title. The title to search for. |
| `exact_match` | boolean | no |  | Exact Match. When enabled, only full exact matches against the given title are returned. It is not case sensitive. |

Output fields:

- `found`: Found (boolean)
- `data`: Leads
- `data[].id`: Lead ID
- `data[].title`: Title
- `data[].type`: Type
- `data[].value`: Value (number)
- `data[].currency`: Currency
- `data[].person`: Person
- `data[].organization`: Organization
- `data[].owner`: Owner
- `data[].emails`: Emails
- `data[].phones`: Phones
- `data[].notes`: Notes
- `data[].is_archived`: Archived (boolean)
- `data[].visible_to`: Visible To
- `data[].custom_fields`: Custom Fields (an object whose keys vary)

### `get-deal`

**Get Deal.** Reads one deal by its numeric ID, including activity/product counters and custom fields by their names. Use when you already hold the deal ID; to locate a deal by text use Search Deals, and for an exact single-field match use Find Deal. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | number | yes |  | Deal ID. The numeric deal ID (from Search Deals, List Deals or a deal trigger). |

Output fields:

- `success`: Success (boolean)
- `data`: Deal
- `data.id`: Deal ID (number)
- `data.title`: Title
- `data.value`: Value (number)
- `data.currency`: Currency
- `data.status`: Status
- `data.probability`: Probability (number)
- `data.stage_id`: Stage ID (number)
- `data.pipeline_id`: Pipeline ID (number)
- `data.person_id`: Person ID (number)
- `data.org_id`: Organization ID (number)
- `data.owner_id`: Owner ID (number)
- `data.creator_user_id`: Creator User ID (number)
- `data.label_ids`: Label IDs
- `data.expected_close_date`: Expected Close Date (date)
- `data.close_time`: Closed At (datetime)
- `data.won_time`: Won At (datetime)
- `data.lost_time`: Lost At (datetime)
- `data.lost_reason`: Lost Reason
- `data.stage_change_time`: Stage Changed At (datetime)
- `data.mrr`: MRR (number)
- `data.arr`: ARR (number)
- `data.acv`: ACV (number)
- `data.is_archived`: Archived (boolean)
- `data.is_deleted`: Deleted (boolean)
- `data.visible_to`: Visible To
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)
- `data.activities_count`: Activities (number)
- `data.done_activities_count`: Done Activities (number)
- `data.undone_activities_count`: Undone Activities (number)
- `data.notes_count`: Notes (number)
- `data.files_count`: Files (number)
- `data.followers_count`: Followers (number)
- `data.participants_count`: Participants (number)
- `data.products_count`: Products (number)
- `data.last_activity_id`: Last Activity ID (number)
- `data.next_activity_id`: Next Activity ID (number)
- `data.smart_bcc_email`: Smart BCC Email (email)
- `data.archive_time`: Archived At (datetime)
- `data.channel`: Channel
- `data.channel_id`: Channel ID
- `data.origin`: Origin
- `data.origin_id`: Origin ID
- `data.local_close_date`: Local Close Date (date)
- `data.local_won_date`: Local Won Date (date)
- `data.local_lost_date`: Local Lost Date (date)
- `data.first_won_time`: First Won At (datetime)
- `data.email_messages_count`: Email Messages (number)
- `data.last_incoming_mail_time`: Last Incoming Mail (datetime)
- `data.last_outgoing_mail_time`: Last Outgoing Mail (datetime)

### `list-deals`

**List Deals.** Returns one bounded page of deals filtered by owner, person, organization, pipeline, stage, status or update time; pass next_cursor back as Cursor for the next page. Prefer this over Find Deals Associated With Person, which fetches every deal of one person; use Search Deals to match by title text. Custom fields are keyed by field hash here; use Get Deal for named custom fields. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ownerId` | number | no |  | Owner ID. Only deals owned by this user ID (from List Users). |
| `personId` | number | no |  | Person ID. Only deals linked to this person ID (from Search Persons). |
| `organizationId` | number | no |  | Organization ID. Only deals linked to this organization ID (from Search Organizations). |
| `pipelineId` | number | no |  | Pipeline ID. Only deals in this pipeline ID (from List Pipelines). |
| `stageId` | number | no |  | Stage ID. Only deals in this stage ID (from List Stages). |
| `status` | string | no |  | Status. Only deals with this status. Leave empty for open, won and lost deals. One of `"open"`, `"won"`, `"lost"`, `"deleted"`. |
| `updatedSince` | ISO date-time string | no |  | Updated Since. Only deals updated at or after this time. |
| `updatedUntil` | ISO date-time string | no |  | Updated Until. Only deals updated before this time. |
| `sortBy` | string | no |  | Sort By. Field to sort by. Defaults to ID. One of `"id"`, `"update_time"`, `"add_time"`. |
| `sortDirection` | string | no |  | Sort Direction. Sort order. Defaults to ascending. One of `"asc"`, `"desc"`. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return in this page (1-500). Defaults to 50. |
| `cursor` | string | no |  | Cursor. The next_cursor value from the previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `found`: Found (boolean)
- `data`: Deals
- `data[].id`: Deal ID (number)
- `data[].title`: Title
- `data[].value`: Value (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].probability`: Probability (number)
- `data[].stage_id`: Stage ID (number)
- `data[].pipeline_id`: Pipeline ID (number)
- `data[].person_id`: Person ID (number)
- `data[].org_id`: Organization ID (number)
- `data[].owner_id`: Owner ID (number)
- `data[].creator_user_id`: Creator User ID (number)
- `data[].label_ids`: Label IDs
- `data[].expected_close_date`: Expected Close Date (date)
- `data[].close_time`: Closed At (datetime)
- `data[].won_time`: Won At (datetime)
- `data[].lost_time`: Lost At (datetime)
- `data[].lost_reason`: Lost Reason
- `data[].stage_change_time`: Stage Changed At (datetime)
- `data[].mrr`: MRR (number)
- `data[].arr`: ARR (number)
- `data[].acv`: ACV (number)
- `data[].is_archived`: Archived (boolean)
- `data[].is_deleted`: Deleted (boolean)
- `data[].visible_to`: Visible To
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)
- `data[].archive_time`: Archived At (datetime)
- `data[].channel`: Channel
- `data[].channel_id`: Channel ID
- `data[].origin`: Origin
- `data[].origin_id`: Origin ID
- `data[].local_close_date`: Local Close Date (date)
- `data[].local_won_date`: Local Won Date (date)
- `data[].local_lost_date`: Local Lost Date (date)
- `data[].custom_fields`: Custom Fields (an object whose keys vary)
- `next_cursor`: Next Cursor

### `search-deals`

**Search Deals.** Fuzzy text search over deal titles, notes and custom fields, ranked by relevance, optionally narrowed to a person, organization or status; returns one page with next_cursor. Use this to find a deal by name; Find Deal instead does an exact match on one chosen field. The term needs at least 2 characters (1 with Exact Match). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | yes |  | Search Term. Text to search for. At least 2 characters, or 1 when Exact Match is Yes. |
| `fields` | array | no |  | Search In. Fields to search. Leave empty to search all of them. One of `"title"`, `"notes"`, `"custom_fields"`. |
| `exactMatch` | string | no |  | Exact Match. Yes returns only exact matches of the full term. Leave empty for partial matching. One of `true`, `false`. |
| `personId` | number | no |  | Person ID. Only deals linked to this person ID (from Search Persons). |
| `organizationId` | number | no |  | Organization ID. Only deals linked to this organization ID (from Search Organizations). |
| `status` | string | no |  | Status. Only deals with this status. Leave empty for any status. One of `"open"`, `"won"`, `"lost"`. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return in this page (1-500). Defaults to 50. |
| `cursor` | string | no |  | Cursor. The next_cursor value from the previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `found`: Found (boolean)
- `data`: Deals
- `data[].id`: Deal ID (number)
- `data[].type`: Type
- `data[].title`: Title
- `data[].value`: Value (number)
- `data[].currency`: Currency
- `data[].status`: Status
- `data[].is_archived`: Archived (boolean)
- `data[].visible_to`: Visible To
- `data[].owner`: Owner
- `data[].owner.id`: Owner ID (number)
- `data[].stage`: Stage
- `data[].stage.id`: ID (number)
- `data[].stage.name`: Name
- `data[].pipeline`: Pipeline
- `data[].pipeline.id`: Pipeline ID (number)
- `data[].person`: Person
- `data[].person.id`: ID (number)
- `data[].person.name`: Name
- `data[].organization`: Organization
- `data[].organization.id`: ID (number)
- `data[].organization.name`: Name
- `data[].organization.address`: Address
- `data[].custom_fields`: Custom Fields
- `data[].notes`: Notes
- `data[].result_score`: Result Score (number)
- `next_cursor`: Next Cursor

### `delete-deal`

**Delete Deal.** Deletes one deal by its numeric ID. The deal is soft-deleted; Pipedrive purges it after 30 days and it cannot be restored via this piece. To close a deal as won or lost instead, use Update Deal. Not safe to retry blindly. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | number | yes |  | Deal ID. The numeric ID of the deal to delete (from Search Deals or List Deals). |

Output fields:

- `success`: Success (boolean)
- `data`: Deleted Record
- `data.id`: Deleted ID

### `list-deal-products`

**List Deal Products.** Returns one page of the product lines attached to a deal, with price, quantity and discount; pass next_cursor back as Cursor for the next page. Each row's id is the attachment ID that Remove Product From Deal needs, which differs from its product_id. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | number | yes |  | Deal ID. The numeric deal ID (from Search Deals or List Deals). |
| `sortBy` | string | no |  | Sort By. Field to sort by. Defaults to ID. One of `"id"`, `"add_time"`, `"update_time"`, `"order_nr"`. |
| `sortDirection` | string | no |  | Sort Direction. Sort order. Defaults to ascending. One of `"asc"`, `"desc"`. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return in this page (1-500). Defaults to 50. |
| `cursor` | string | no |  | Cursor. The next_cursor value from the previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `found`: Found (boolean)
- `data`: Deal Products
- `data[].id`: Deal Product ID (number)
- `data[].deal_id`: Deal ID (number)
- `data[].product_id`: Product ID (number)
- `data[].name`: Name
- `data[].item_price`: Item Price (number)
- `data[].quantity`: Quantity (number)
- `data[].sum`: Sum (number)
- `data[].currency`: Currency
- `data[].discount`: Discount (number)
- `data[].discount_type`: Discount Type
- `data[].tax`: Tax (number)
- `data[].tax_method`: Tax Method
- `data[].comments`: Comments
- `data[].order_nr`: Order Number (number)
- `data[].is_enabled`: Enabled (boolean)
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)
- `data[].billing_frequency`: Billing Frequency
- `data[].billing_frequency_cycles`: Billing Cycles (number)
- `data[].billing_start_date`: Billing Start Date (date)
- `data[].product_variation_id`: Product Variation ID (number)
- `next_cursor`: Next Cursor

### `remove-product-from-deal`

**Remove Product From Deal.** Removes one product line from a deal; the product itself stays in the catalog. Needs the row id returned by List Deal Products (the attachment ID), not the product_id. Not safe to retry blindly. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | number | yes |  | Deal ID. The numeric ID of the deal the product is attached to. |
| `productAttachmentId` | number | yes |  | Deal Product ID. The id of the row returned by List Deal Products (the attachment ID). This is not the product_id. |

Output fields:

- `success`: Success (boolean)
- `data`: Deleted Record
- `data.id`: Deleted ID
- `additional_data`: Additional Data

### `get-person`

**Get Person.** Reads one person (contact) by numeric ID, including emails, phones, deal/activity counters and custom fields by their names. Use when you already hold the person ID; to locate a person by name, email or phone use Search Persons, and for an exact single-field match use Find Person. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personId` | number | yes |  | Person ID. The numeric person ID (from Search Persons, List Persons or a person trigger). |

Output fields:

- `success`: Success (boolean)
- `data`: Person
- `data.id`: Person ID (number)
- `data.name`: Name
- `data.first_name`: First Name
- `data.last_name`: Last Name
- `data.emails`: Emails
- `data.emails[].value`: Value
- `data.emails[].label`: Label
- `data.emails[].primary`: Primary (boolean)
- `data.phones`: Phones
- `data.phones[].value`: Value
- `data.phones[].label`: Label
- `data.phones[].primary`: Primary (boolean)
- `data.org_id`: Organization ID (number)
- `data.owner_id`: Owner ID (number)
- `data.label_ids`: Label IDs
- `data.visible_to`: Visible To
- `data.is_deleted`: Deleted (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)
- `data.open_deals_count`: Open Deals (number)
- `data.won_deals_count`: Won Deals (number)
- `data.lost_deals_count`: Lost Deals (number)
- `data.closed_deals_count`: Closed Deals (number)
- `data.activities_count`: Activities (number)
- `data.done_activities_count`: Done Activities (number)
- `data.undone_activities_count`: Undone Activities (number)
- `data.notes_count`: Notes (number)
- `data.files_count`: Files (number)
- `data.followers_count`: Followers (number)
- `data.last_activity_id`: Last Activity ID (number)
- `data.next_activity_id`: Next Activity ID (number)
- `data.last_incoming_mail_time`: Last Incoming Mail (datetime)
- `data.last_outgoing_mail_time`: Last Outgoing Mail (datetime)
- `data.related_open_deals_count`: Related Open Deals (number)
- `data.related_closed_deals_count`: Related Closed Deals (number)
- `data.related_won_deals_count`: Related Won Deals (number)
- `data.related_lost_deals_count`: Related Lost Deals (number)
- `data.email_messages_count`: Email Messages (number)
- `data.picture_id`: Picture ID (number)
- `data.participant_open_deals_count`: Participant Open Deals (number)
- `data.participant_closed_deals_count`: Participant Closed Deals (number)

### `list-persons`

**List Persons.** Returns one bounded page of persons (contacts) filtered by owner, organization, deal or update time; pass next_cursor back as Cursor for the next page. Use Search Persons to find someone by name, email or phone. Custom fields are keyed by field hash here; use Get Person for named custom fields. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ownerId` | number | no |  | Owner ID. Only persons owned by this user ID (from List Users). |
| `organizationId` | number | no |  | Organization ID. Only persons linked to this organization ID (from Search Organizations). |
| `dealId` | number | no |  | Deal ID. Only persons linked to this deal ID (from Search Deals). |
| `updatedSince` | ISO date-time string | no |  | Updated Since. Only persons updated at or after this time. |
| `updatedUntil` | ISO date-time string | no |  | Updated Until. Only persons updated before this time. |
| `sortBy` | string | no |  | Sort By. Field to sort by. Defaults to ID. One of `"id"`, `"update_time"`, `"add_time"`. |
| `sortDirection` | string | no |  | Sort Direction. Sort order. Defaults to ascending. One of `"asc"`, `"desc"`. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return in this page (1-500). Defaults to 50. |
| `cursor` | string | no |  | Cursor. The next_cursor value from the previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `found`: Found (boolean)
- `data`: People
- `data[].id`: Person ID (number)
- `data[].name`: Name
- `data[].first_name`: First Name
- `data[].last_name`: Last Name
- `data[].emails`: Emails
- `data[].emails[].value`: Value
- `data[].emails[].label`: Label
- `data[].emails[].primary`: Primary (boolean)
- `data[].phones`: Phones
- `data[].phones[].value`: Value
- `data[].phones[].label`: Label
- `data[].phones[].primary`: Primary (boolean)
- `data[].org_id`: Organization ID (number)
- `data[].owner_id`: Owner ID (number)
- `data[].label_ids`: Label IDs
- `data[].visible_to`: Visible To
- `data[].is_deleted`: Deleted (boolean)
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)
- `data[].picture_id`: Picture ID (number)
- `data[].custom_fields`: Custom Fields (an object whose keys vary)
- `next_cursor`: Next Cursor

### `search-persons`

**Search Persons.** Fuzzy text search over person names, emails, phones, notes and custom fields, ranked by relevance and optionally limited to one organization; returns one page with next_cursor. Use this to find a contact like "Jane at Acme"; Find Person instead does an exact match on one chosen field. The term needs at least 2 characters (1 with Exact Match). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | yes |  | Search Term. Text to search for. At least 2 characters, or 1 when Exact Match is Yes. |
| `fields` | array | no |  | Search In. Fields to search. Leave empty to search all of them. One of `"name"`, `"email"`, `"phone"`, `"notes"`, `"custom_fields"`. |
| `exactMatch` | string | no |  | Exact Match. Yes returns only exact matches of the full term. Leave empty for partial matching. One of `true`, `false`. |
| `organizationId` | number | no |  | Organization ID. Only persons linked to this organization ID (from Search Organizations). |
| `limit` | number | no | `50` | Limit. Maximum number of items to return in this page (1-500). Defaults to 50. |
| `cursor` | string | no |  | Cursor. The next_cursor value from the previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `found`: Found (boolean)
- `data`: People
- `data[].id`: Person ID (number)
- `data[].type`: Type
- `data[].name`: Name
- `data[].phones`: Phones
- `data[].emails`: Emails
- `data[].primary_email`: Primary Email (email)
- `data[].visible_to`: Visible To
- `data[].owner`: Owner
- `data[].owner.id`: Owner ID (number)
- `data[].organization`: Organization
- `data[].organization.id`: ID (number)
- `data[].organization.name`: Name
- `data[].organization.address`: Address
- `data[].custom_fields`: Custom Fields
- `data[].notes`: Notes
- `data[].update_time`: Updated At (datetime)
- `data[].result_score`: Result Score (number)
- `next_cursor`: Next Cursor

### `delete-person`

**Delete Person.** Deletes one person (contact) by numeric ID. The person is soft-deleted; Pipedrive purges it after 30 days and it cannot be restored via this piece. Not safe to retry blindly. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personId` | number | yes |  | Person ID. The numeric ID of the person to delete (from Search Persons or List Persons). |

Output fields:

- `success`: Success (boolean)
- `data`: Deleted Record
- `data.id`: Deleted ID

### `get-organization`

**Get Organization.** Reads one organization by numeric ID, including people/deal/activity counters and custom fields by their names. Use when you already hold the organization ID; to locate one by name use Search Organizations, and for an exact single-field match use Find Organization. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationId` | number | yes |  | Organization ID. The numeric organization ID (from Search Organizations, List Organizations or an organization trigger). |

Output fields:

- `success`: Success (boolean)
- `data`: Organization
- `data.id`: Organization ID (number)
- `data.name`: Name
- `data.address`: Address
- `data.website`: Website (url)
- `data.linkedin`: LinkedIn (url)
- `data.industry`: Industry
- `data.employee_count`: Employees (number)
- `data.annual_revenue`: Annual Revenue (number)
- `data.owner_id`: Owner ID (number)
- `data.label_ids`: Label IDs
- `data.visible_to`: Visible To
- `data.is_deleted`: Deleted (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)
- `data.people_count`: People (number)
- `data.open_deals_count`: Open Deals (number)
- `data.won_deals_count`: Won Deals (number)
- `data.lost_deals_count`: Lost Deals (number)
- `data.closed_deals_count`: Closed Deals (number)
- `data.activities_count`: Activities (number)
- `data.notes_count`: Notes (number)
- `data.files_count`: Files (number)
- `data.followers_count`: Followers (number)
- `data.last_activity_id`: Last Activity ID (number)
- `data.next_activity_id`: Next Activity ID (number)
- `data.related_open_deals_count`: Related Open Deals (number)
- `data.related_closed_deals_count`: Related Closed Deals (number)
- `data.related_won_deals_count`: Related Won Deals (number)
- `data.related_lost_deals_count`: Related Lost Deals (number)
- `data.email_messages_count`: Email Messages (number)
- `data.done_activities_count`: Done Activities (number)
- `data.undone_activities_count`: Undone Activities (number)

### `list-organizations`

**List Organizations.** Returns one bounded page of organizations filtered by owner or update time; pass next_cursor back as Cursor for the next page. Use Search Organizations to find one by name or address. Custom fields are keyed by field hash here; use Get Organization for named custom fields. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ownerId` | number | no |  | Owner ID. Only organizations owned by this user ID (from List Users). |
| `updatedSince` | ISO date-time string | no |  | Updated Since. Only organizations updated at or after this time. |
| `updatedUntil` | ISO date-time string | no |  | Updated Until. Only organizations updated before this time. |
| `sortBy` | string | no |  | Sort By. Field to sort by. Defaults to ID. One of `"id"`, `"update_time"`, `"add_time"`. |
| `sortDirection` | string | no |  | Sort Direction. Sort order. Defaults to ascending. One of `"asc"`, `"desc"`. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return in this page (1-500). Defaults to 50. |
| `cursor` | string | no |  | Cursor. The next_cursor value from the previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `found`: Found (boolean)
- `data`: Organizations
- `data[].id`: Organization ID (number)
- `data[].name`: Name
- `data[].address`: Address
- `data[].website`: Website (url)
- `data[].linkedin`: LinkedIn (url)
- `data[].industry`: Industry
- `data[].employee_count`: Employees (number)
- `data[].annual_revenue`: Annual Revenue (number)
- `data[].owner_id`: Owner ID (number)
- `data[].label_ids`: Label IDs
- `data[].visible_to`: Visible To
- `data[].is_deleted`: Deleted (boolean)
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)
- `data[].custom_fields`: Custom Fields (an object whose keys vary)
- `next_cursor`: Next Cursor

### `search-organizations`

**Search Organizations.** Fuzzy text search over organization names, addresses, notes and custom fields, ranked by relevance; returns one page with next_cursor. Use this to find a company by name; Find Organization instead does an exact match on one chosen field. The term needs at least 2 characters (1 with Exact Match). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | yes |  | Search Term. Text to search for. At least 2 characters, or 1 when Exact Match is Yes. |
| `fields` | array | no |  | Search In. Fields to search. Leave empty to search all of them. One of `"name"`, `"address"`, `"notes"`, `"custom_fields"`. |
| `exactMatch` | string | no |  | Exact Match. Yes returns only exact matches of the full term. Leave empty for partial matching. One of `true`, `false`. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return in this page (1-500). Defaults to 50. |
| `cursor` | string | no |  | Cursor. The next_cursor value from the previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `found`: Found (boolean)
- `data`: Organizations
- `data[].id`: Organization ID (number)
- `data[].type`: Type
- `data[].name`: Name
- `data[].address`: Address
- `data[].visible_to`: Visible To
- `data[].owner`: Owner
- `data[].owner.id`: Owner ID (number)
- `data[].custom_fields`: Custom Fields
- `data[].notes`: Notes
- `data[].result_score`: Result Score (number)
- `next_cursor`: Next Cursor

### `delete-organization`

**Delete Organization.** Deletes one organization by numeric ID. The organization is soft-deleted; Pipedrive purges it after 30 days and it cannot be restored via this piece. Not safe to retry blindly. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationId` | number | yes |  | Organization ID. The numeric ID of the organization to delete (from Search Organizations or List Organizations). |

Output fields:

- `success`: Success (boolean)
- `data`: Deleted Record
- `data.id`: Deleted ID

### `get-activity`

**Get Activity.** Reads one activity (call, meeting, task, etc.) by numeric ID, including its attendees and linked deal, lead, person and organization. Use when you already hold the activity ID; to browse activities of a deal or person use List Activities, and for an exact single-field match use Find Activity. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `activityId` | number | yes |  | Activity ID. The numeric activity ID (from List Activities or an activity trigger). |

Output fields:

- `success`: Success (boolean)
- `data`: Activity
- `data.id`: Activity ID (number)
- `data.subject`: Subject
- `data.type`: Type
- `data.done`: Done (boolean)
- `data.due_date`: Due Date (date)
- `data.due_time`: Due Time
- `data.duration`: Duration (duration)
- `data.priority`: Priority
- `data.note`: Note (html)
- `data.public_description`: Public Description
- `data.location`: Location
- `data.outcome`: Outcome
- `data.busy`: Busy (boolean)
- `data.deal_id`: Deal ID (number)
- `data.person_id`: Person ID (number)
- `data.org_id`: Organization ID (number)
- `data.lead_id`: Lead ID
- `data.owner_id`: Owner ID (number)
- `data.creator_user_id`: Creator User ID (number)
- `data.participants`: Participants
- `data.conference_meeting_url`: Meeting URL (url)
- `data.marked_as_done_time`: Marked Done At (datetime)
- `data.is_deleted`: Deleted (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)
- `data.private`: Private (boolean)
- `data.project_id`: Project ID (number)
- `data.conference_meeting_client`: Meeting Client
- `data.conference_meeting_id`: Meeting ID
- `data.custom_fields`: Custom Fields (an object whose keys vary)
- `data.attendees`: Attendees

### `list-activities`

**List Activities.** Returns one bounded page of activities filtered by deal, lead, person, organization, owner, done state or update time; pass next_cursor back as Cursor for the next page. Use this to see what is scheduled or done for a record; Find Activity instead does an exact match on one chosen field. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | number | no |  | Deal ID. Only activities linked to this deal ID (from Search Deals). |
| `leadId` | string | no |  | Lead ID. Only activities linked to this lead ID, a UUID (from Find Lead). |
| `personId` | number | no |  | Person ID. Only activities linked to this person ID (from Search Persons). |
| `organizationId` | number | no |  | Organization ID. Only activities linked to this organization ID (from Search Organizations). |
| `ownerId` | number | no |  | Owner ID. Only activities owned by this user ID (from List Users). |
| `done` | string | no |  | Done. Yes for completed activities only, No for pending only. Leave empty for both. One of `true`, `false`. |
| `updatedSince` | ISO date-time string | no |  | Updated Since. Only activities updated at or after this time. |
| `updatedUntil` | ISO date-time string | no |  | Updated Until. Only activities updated before this time. |
| `sortBy` | string | no |  | Sort By. Field to sort by. Defaults to ID. One of `"id"`, `"update_time"`, `"add_time"`, `"due_date"`. |
| `sortDirection` | string | no |  | Sort Direction. Sort order. Defaults to ascending. One of `"asc"`, `"desc"`. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return in this page (1-500). Defaults to 50. |
| `cursor` | string | no |  | Cursor. The next_cursor value from the previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `found`: Found (boolean)
- `data`: Activities
- `data[].id`: Activity ID (number)
- `data[].subject`: Subject
- `data[].type`: Type
- `data[].done`: Done (boolean)
- `data[].due_date`: Due Date (date)
- `data[].due_time`: Due Time
- `data[].duration`: Duration (duration)
- `data[].priority`: Priority
- `data[].note`: Note (html)
- `data[].public_description`: Public Description
- `data[].location`: Location
- `data[].outcome`: Outcome
- `data[].busy`: Busy (boolean)
- `data[].deal_id`: Deal ID (number)
- `data[].person_id`: Person ID (number)
- `data[].org_id`: Organization ID (number)
- `data[].lead_id`: Lead ID
- `data[].owner_id`: Owner ID (number)
- `data[].creator_user_id`: Creator User ID (number)
- `data[].participants`: Participants
- `data[].conference_meeting_url`: Meeting URL (url)
- `data[].marked_as_done_time`: Marked Done At (datetime)
- `data[].is_deleted`: Deleted (boolean)
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)
- `data[].private`: Private (boolean)
- `data[].project_id`: Project ID (number)
- `data[].conference_meeting_client`: Meeting Client
- `data[].conference_meeting_id`: Meeting ID
- `data[].custom_fields`: Custom Fields (an object whose keys vary)
- `next_cursor`: Next Cursor

### `delete-activity`

**Delete Activity.** Deletes one activity by numeric ID. The activity is soft-deleted; Pipedrive purges it after 30 days and it cannot be restored via this piece. To mark an activity complete instead, use Update Activity. Not safe to retry blindly. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `activityId` | number | yes |  | Activity ID. The numeric ID of the activity to delete (from List Activities). |

Output fields:

- `success`: Success (boolean)
- `data`: Deleted Record
- `data.id`: Deleted ID

### `get-lead`

**Get Lead.** Reads one lead by its UUID, including title, value, owner, linked person/organization and labels. Use when you already hold the lead ID; to locate a lead by text use Find Lead. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead ID. The lead UUID (from Find Lead or a lead trigger). |

Output fields:

- `success`: Success (boolean)
- `data`: Lead
- `data.id`: Lead ID
- `data.title`: Title
- `data.value`: Value
- `data.owner_id`: Owner ID (number)
- `data.creator_id`: Creator ID (number)
- `data.person_id`: Person ID (number)
- `data.organization_id`: Organization ID (number)
- `data.label_ids`: Label IDs
- `data.expected_close_date`: Expected Close Date (date)
- `data.source_name`: Source
- `data.channel`: Channel
- `data.cc_email`: CC Email (email)
- `data.was_seen`: Seen (boolean)
- `data.is_archived`: Archived (boolean)
- `data.next_activity_id`: Next Activity ID (number)
- `data.visible_to`: Visible To
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)
- `data.archive_time`: Archived At (datetime)
- `data.archive_reason`: Archive Reason
- `data.channel_id`: Channel ID
- `data.origin`: Origin
- `data.origin_id`: Origin ID
- `data.source_deal_id`: Source Deal ID (number)
- `additional_data`: Additional Data

### `delete-lead`

**Delete Lead.** Deletes one lead by its UUID; it cannot be restored via this piece. To turn a lead into a deal instead, use Convert Lead to Deal; to archive it, use Update Lead. Safe to retry: a repeat call on an already deleted record also succeeds. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead ID. The UUID of the lead to delete (from Find Lead). |

Output fields:

- `success`: Success (boolean)
- `data`: Deleted Record
- `data.id`: Deleted ID
- `additional_data`: Additional Data

### `convert-lead-to-deal`

**Convert Lead to Deal.** Starts an asynchronous conversion of a lead into a deal and returns a conversion_id, not the deal. The new deal_id comes from Get Lead Conversion Status (call it with the lead ID and conversion_id until status is completed). On success Pipedrive deletes the lead. Set Stage ID or Pipeline ID, not both (Pipedrive ignores the pipeline when a stage is given); leave both empty to let Pipedrive pick the placement. Not safe to retry: poll the status instead of calling this again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead ID. The UUID of the lead to convert (from Find Lead). |
| `stageId` | number | no |  | Stage ID. Stage for the new deal (from List Stages); its pipeline is used. Set this or Pipeline ID, not both. |
| `pipelineId` | number | no |  | Pipeline ID. Pipeline for the new deal (from List Pipelines). Set this or Stage ID, not both. |

Output fields:

- `conversion_id`: Conversion ID
- `lead_id`: Lead ID

### `get-lead-conversion-status`

**Get Lead Conversion Status.** Reads the current status of a conversion started by Convert Lead to Deal: not_started, running, completed, failed or rejected. When completed, deal_id holds the new deal (read it with Get Deal). Makes one check per call; call again after a short wait while running. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead ID. The UUID of the lead that is being converted. |
| `conversionId` | string | yes |  | Conversion ID. The conversion_id returned by Convert Lead to Deal. |

Output fields:

- `success`: Success (boolean)
- `data`: Conversion
- `data.conversion_id`: Conversion ID
- `data.status`: Status
- `data.deal_id`: Deal ID (number)
- `additional_data`: Additional Data

### `update-note`

**Update Note.** Changes an existing note: its content, the deal, lead, person or organization it is attached to, its author, or its pinned flags. Only the fields you set are sent; at least one is required. To add a new note use Create Note. Setting the same values again gives the same result, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `noteId` | number | yes |  | Note ID. The numeric ID of the note to update (from Find Notes or Create Note). |
| `content` | string | no |  | Content. New note content. HTML is allowed. Leave empty to keep the current content. |
| `dealId` | number | no |  | Deal ID. Attach the note to this deal ID (from Search Deals). |
| `leadId` | string | no |  | Lead ID. Attach the note to this lead UUID (from Find Lead). |
| `personId` | number | no |  | Person ID. Attach the note to this person ID (from Search Persons). |
| `organizationId` | number | no |  | Organization ID. Attach the note to this organization ID (from Search Organizations). |
| `userId` | number | no |  | Author User ID. Make this user ID the note author (from List Users). |
| `pinnedToDeal` | string | no |  | Pinned to Deal. Yes to pin, No to unpin. Leave empty to keep the current setting. One of `1`, `0`. |
| `pinnedToLead` | string | no |  | Pinned to Lead. Yes to pin, No to unpin. Leave empty to keep the current setting. One of `1`, `0`. |
| `pinnedToPerson` | string | no |  | Pinned to Person. Yes to pin, No to unpin. Leave empty to keep the current setting. One of `1`, `0`. |
| `pinnedToOrganization` | string | no |  | Pinned to Organization. Yes to pin, No to unpin. Leave empty to keep the current setting. One of `1`, `0`. |

Output fields:

- `success`: Success (boolean)
- `data`: Note
- `data.id`: Note ID (number)
- `data.content`: Content (html)
- `data.deal_id`: Deal ID (number)
- `data.person_id`: Person ID (number)
- `data.org_id`: Organization ID (number)
- `data.lead_id`: Lead ID
- `data.deal`: Deal
- `data.deal.title`: Title
- `data.user_id`: Author ID (number)
- `data.last_update_user_id`: Last Updated By (number)
- `data.pinned_to_deal_flag`: Pinned to Deal (boolean)
- `data.pinned_to_person_flag`: Pinned to Person (boolean)
- `data.pinned_to_organization_flag`: Pinned to Organization (boolean)
- `data.active_flag`: Active (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)
- `data.user`: Author
- `data.user.name`: Name
- `data.user.email`: Email (email)
- `data.user.icon_url`: Icon URL (url)
- `data.user.is_you`: Is Connected User (boolean)
- `data.lead`: Lead
- `data.lead.title`: Title
- `data.person`: Person
- `data.person.name`: Name
- `data.organization`: Organization
- `data.organization.name`: Name
- `data.pinned_to_lead_flag`: Pinned to Lead (boolean)
- `data.pinned_to_project_flag`: Pinned to Project (boolean)
- `data.pinned_to_task_flag`: Pinned to Task (boolean)
- `data.project_id`: Project ID (number)
- `data.task_id`: Task ID (number)

### `delete-note`

**Delete Note.** Deletes one note by numeric ID; it cannot be restored via this piece. To change a note's text or pins instead, use Update Note. Not safe to retry blindly. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `noteId` | number | yes |  | Note ID. The numeric ID of the note to delete (from Find Notes). |

Output fields:

- `success`: Success (boolean)
- `data`: Deleted (boolean)

### `delete-product`

**Delete Product.** Deletes one product from the product catalog by numeric ID. The product is soft-deleted; Pipedrive purges it after 30 days and it cannot be restored via this piece. To detach a product from a single deal instead, use Remove Product From Deal. Safe to retry: a repeat call on an already deleted record also succeeds. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | number | yes |  | Product ID. The numeric ID of the product to delete (from Find Product or Find Products). |

Output fields:

- `success`: Success (boolean)
- `data`: Deleted Record
- `data.id`: Deleted ID
- `additional_data`: Additional Data

### `list-pipelines`

**List Pipelines.** Lists the sales pipelines with their IDs and names, one page at a time. Use it to turn a pipeline name into the Pipeline ID that deal filters, Create Deal and Convert Lead to Deal expect; use List Stages for the stages inside a pipeline. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sortBy` | string | no |  | Sort By. Field to sort by. Defaults to ID. One of `"id"`, `"update_time"`, `"add_time"`. |
| `sortDirection` | string | no |  | Sort Direction. Sort order. Defaults to ascending. One of `"asc"`, `"desc"`. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return in this page (1-500). Defaults to 50. |
| `cursor` | string | no |  | Cursor. The next_cursor value from the previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `found`: Found (boolean)
- `data`: Pipelines
- `data[].id`: Pipeline ID (number)
- `data[].name`: Name
- `data[].order_nr`: Order (number)
- `data[].is_deal_probability_enabled`: Deal Probability Enabled (boolean)
- `data[].is_deleted`: Deleted (boolean)
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)
- `next_cursor`: Next Cursor

### `list-stages`

**List Stages.** Lists deal stages with their IDs, names and pipeline, optionally for one pipeline only, one page at a time. Use it to turn a stage name into the Stage ID that deal filters, Create Deal, Update Deal and Convert Lead to Deal expect. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipelineId` | number | no |  | Pipeline ID. Only stages of this pipeline ID (from List Pipelines). Leave empty for all pipelines. |
| `sortBy` | string | no |  | Sort By. Field to sort by. Defaults to ID. One of `"id"`, `"update_time"`, `"add_time"`, `"order_nr"`. |
| `sortDirection` | string | no |  | Sort Direction. Sort order. Defaults to ascending. One of `"asc"`, `"desc"`. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return in this page (1-500). Defaults to 50. |
| `cursor` | string | no |  | Cursor. The next_cursor value from the previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `found`: Found (boolean)
- `data`: Stages
- `data[].id`: Stage ID (number)
- `data[].name`: Name
- `data[].pipeline_id`: Pipeline ID (number)
- `data[].order_nr`: Order (number)
- `data[].deal_probability`: Deal Probability (number)
- `data[].is_deal_rot_enabled`: Rotting Enabled (boolean)
- `data[].days_to_rotten`: Days to Rotten (number)
- `data[].is_deleted`: Deleted (boolean)
- `data[].add_time`: Created At (datetime)
- `data[].update_time`: Updated At (datetime)
- `next_cursor`: Next Cursor

### `list-activity-types`

**List Activity Types.** Lists every activity type (call, meeting, task, custom types) with its name and key_string. The key_string is the type value that Create Activity and Update Activity expect. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `found`: Found (boolean)
- `data`: Activity Types
- `data[].id`: Activity Type ID (number)
- `data[].name`: Name
- `data[].key_string`: Key
- `data[].icon_key`: Icon
- `data[].color`: Color
- `data[].order_nr`: Order (number)
- `data[].active_flag`: Active (boolean)
- `data[].is_custom_flag`: Custom (boolean)
- `data[].add_time`: Created At
- `data[].update_time`: Updated At

### `list-users`

**List Users.** Lists every user in the Pipedrive company with ID, name, email and active state. Use it to turn a teammate's name into the Owner ID or User ID other actions expect; Find User instead looks up one user by name or email, and Get Current User returns the connected user. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `found`: Found (boolean)
- `data`: Users
- `data[].id`: User ID (number)
- `data[].name`: Name
- `data[].email`: Email (email)
- `data[].phone`: Phone
- `data[].active_flag`: Active (boolean)
- `data[].is_deleted`: Deleted (boolean)
- `data[].has_created_company`: Has Created Company (boolean)
- `data[].access`: Access
- `data[].access[].app`: App
- `data[].access[].admin`: Admin (boolean)
- `data[].access[].permission_set_id`: Permission Set ID
- `data[].is_admin`: Admin
- `data[].role_id`: Role ID (number)
- `data[].default_currency`: Default Currency
- `data[].locale`: Locale
- `data[].lang`: Language ID (number)
- `data[].timezone_name`: Timezone
- `data[].timezone_offset`: Timezone Offset
- `data[].icon_url`: Icon URL (url)
- `data[].is_you`: Is Connected User (boolean)
- `data[].last_login`: Last Login
- `data[].created`: Created At
- `data[].modified`: Updated At

### `get-current-user`

**Get Current User.** Returns the user this connection acts as, with user ID, email, timezone, default currency and company details. Use it for "me" or "my deals" requests to get your own Owner ID; use List Users for teammates. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `success`: Success (boolean)
- `data`: User
- `data.id`: User ID (number)
- `data.name`: Name
- `data.email`: Email (email)
- `data.phone`: Phone
- `data.active_flag`: Active (boolean)
- `data.is_deleted`: Deleted (boolean)
- `data.has_created_company`: Has Created Company (boolean)
- `data.access`: Access
- `data.access[].app`: App
- `data.access[].admin`: Admin (boolean)
- `data.access[].permission_set_id`: Permission Set ID
- `data.is_admin`: Admin
- `data.role_id`: Role ID (number)
- `data.default_currency`: Default Currency
- `data.locale`: Locale
- `data.lang`: Language ID (number)
- `data.timezone_name`: Timezone
- `data.timezone_offset`: Timezone Offset
- `data.icon_url`: Icon URL (url)
- `data.is_you`: Is Connected User (boolean)
- `data.last_login`: Last Login
- `data.created`: Created At
- `data.modified`: Updated At
- `data.company_id`: Company ID (number)
- `data.company_name`: Company Name
- `data.company_domain`: Company Domain
- `data.company_country`: Company Country
- `data.language`: Language
- `data.language.language_code`: Language Code
- `data.language.country_code`: Country Code
- `additional_data`: Additional Data

### `merge-deals`

**Merge Deals.** Merges one deal into another: the deal given as Deal ID To Merge Away is REMOVED, and its data, notes and activities move to the deal given as Surviving Deal ID, which is the only one that still exists afterwards. Irreversible - confirm both IDs with Get Deal before calling, and note the two deals must use the same currency. Not safe to retry. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | number | yes |  | Deal ID To Merge Away (this deal is removed). The numeric ID of the deal that will be CONSUMED and no longer exist after the merge. |
| `mergeWithId` | number | yes |  | Surviving Deal ID (this deal is kept). The numeric ID of the deal that SURVIVES the merge and receives the other deal's data. |

Output fields:

- `success`: Success (boolean)
- `data`: Surviving Deal
- `data.id`: Surviving Deal ID (number)
- `data.title`: Title
- `data.value`: Value (number)
- `data.formatted_value`: Formatted Value
- `data.currency`: Currency
- `data.status`: Status
- `data.pipeline_id`: Pipeline ID (number)
- `data.stage_id`: Stage ID (number)
- `data.stage_order_nr`: Stage Order (number)
- `data.person_id`: Person
- `data.person_name`: Person Name
- `data.org_id`: Organization
- `data.org_name`: Organization Name
- `data.user_id`: Owner User ID (number)
- `data.owner_name`: Owner Name
- `data.creator_user_id`: Creator User ID (number)
- `data.probability`: Probability (number)
- `data.weighted_value`: Weighted Value (number)
- `data.expected_close_date`: Expected Close Date (date)
- `data.close_time`: Closed At (datetime)
- `data.won_time`: Won At (datetime)
- `data.first_won_time`: First Won At (datetime)
- `data.lost_time`: Lost At (datetime)
- `data.lost_reason`: Lost Reason
- `data.label`: Label
- `data.active`: Active (boolean)
- `data.deleted`: Deleted (boolean)
- `data.is_archived`: Archived (boolean)
- `data.visible_to`: Visible To
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)
- `data.stage_change_time`: Stage Changed At (datetime)
- `data.next_activity_id`: Next Activity ID (number)
- `data.next_activity_date`: Next Activity Date (date)
- `data.next_activity_subject`: Next Activity Subject
- `data.last_activity_id`: Last Activity ID (number)
- `data.last_activity_date`: Last Activity Date (date)
- `data.activities_count`: Activities (number)
- `data.done_activities_count`: Done Activities (number)
- `data.undone_activities_count`: Undone Activities (number)
- `data.notes_count`: Notes (number)
- `data.files_count`: Files (number)
- `data.followers_count`: Followers (number)
- `data.participants_count`: Participants (number)
- `data.products_count`: Products (number)
- `data.email_messages_count`: Email Messages (number)
- `data.cc_email`: Smart BCC Email (email)
- `data.origin`: Origin
- `data.source_lead_id`: Source Lead ID
- `data.merge_what_id`: Merged-Away Record ID (number)

### `merge-persons`

**Merge Persons.** Merges one person into another: the person given as Person ID To Merge Away is REMOVED, and their deals, notes and activities move to the person given as Surviving Person ID, whose own field values are not overwritten on conflict. Irreversible - confirm both IDs with Get Person first. Not safe to retry. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personId` | number | yes |  | Person ID To Merge Away (this person is removed). The numeric ID of the person that will be CONSUMED and no longer exist after the merge. |
| `mergeWithId` | number | yes |  | Surviving Person ID (this person is kept). The numeric ID of the person that SURVIVES the merge and will NOT be overwritten. |

Output fields:

- `success`: Success (boolean)
- `data`: Surviving Person
- `data.id`: Surviving Person ID (number)
- `data.name`: Name
- `data.first_name`: First Name
- `data.last_name`: Last Name
- `data.primary_email`: Primary Email (email)
- `data.email`: Emails
- `data.email[].value`: Value
- `data.email[].label`: Label
- `data.email[].primary`: Primary (boolean)
- `data.phone`: Phones
- `data.phone[].value`: Value
- `data.phone[].label`: Label
- `data.phone[].primary`: Primary (boolean)
- `data.org_id`: Organization
- `data.org_name`: Organization Name
- `data.owner_id`: Owner ID (number)
- `data.owner_name`: Owner Name
- `data.job_title`: Job Title
- `data.birthday`: Birthday (date)
- `data.label`: Label
- `data.label_ids`: Label IDs
- `data.visible_to`: Visible To
- `data.active_flag`: Active (boolean)
- `data.add_time`: Created At (datetime)
- `data.update_time`: Updated At (datetime)
- `data.open_deals_count`: Open Deals (number)
- `data.won_deals_count`: Won Deals (number)
- `data.lost_deals_count`: Lost Deals (number)
- `data.closed_deals_count`: Closed Deals (number)
- `data.activities_count`: Activities (number)
- `data.done_activities_count`: Done Activities (number)
- `data.undone_activities_count`: Undone Activities (number)
- `data.notes_count`: Notes (number)
- `data.files_count`: Files (number)
- `data.followers_count`: Followers (number)
- `data.email_messages_count`: Email Messages (number)
- `data.last_activity_id`: Last Activity ID (number)
- `data.next_activity_id`: Next Activity ID (number)
- `data.next_activity_date`: Next Activity Date (date)
- `data.last_incoming_mail_time`: Last Incoming Mail (datetime)
- `data.last_outgoing_mail_time`: Last Outgoing Mail (datetime)
- `data.postal_address_formatted_address`: Postal Address
- `data.cc_email`: Smart BCC Email (email)
- `data.merge_what_id`: Merged-Away Record ID (number)

### `merge-organizations`

**Merge Organizations.** Merges one organization into another: the organization given as Organization ID To Merge Away is REMOVED, and its people, deals and activities move to the organization given as Surviving Organization ID, which is the only one that still exists afterwards. Irreversible - confirm both IDs with Get Organization first. Not safe to retry. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationId` | number | yes |  | Organization ID To Merge Away (this organization is removed). The numeric ID of the organization that will be CONSUMED and no longer exist after the merge. |
| `mergeWithId` | number | yes |  | Surviving Organization ID (this organization is kept). The numeric ID of the organization that SURVIVES the merge and will NOT be overwritten. |

Output fields:

- `success`: Success (boolean)
- `data`: Surviving Organization
- `data.id`: Surviving Organization ID (number)

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
