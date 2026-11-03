# Intercom

Customer messaging platform for sales, marketing, and support

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-intercom'
  version: '0.9.2'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Please follow the instructions to connect your Intercom account via OAuth2.
>
> 1. Log in to your Intercom account and navigate to **Settings > Integrations > Developer Hub**.
> 2. Click on **Create a new app** and select the appropriate workspace.
> 3. In the **Authentication** section, add the Redirect URL shown above to the allowed redirect URLs.
> 4. Go to the **Basic Information** section and copy the **Client ID** and **Client Secret**.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `region` | string | yes |  | Region. One of `"intercom"`, `"eu.intercom"`, `"au.intercom"`. |

### `CUSTOM_AUTH`: Access Token

> Connect using an Intercom Access Token. You can find your token in **Settings > Integrations > Developer Hub > Your App > Authentication**.
> For more information, please refer to [Access Token Authentication](https://developers.intercom.com/docs/build-an-integration/learn-more/authentication#how-to-get-your-access-token).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessToken` | string | yes |  | Access Token. |
| `region` | string | yes |  | Region. One of `"intercom"`, `"eu.intercom"`, `"au.intercom"`. |

## Actions

### `add-note-to-user`

**Add Note.** Add an internal note to a contact resolved by email address; errors if no contact matches, and when several contacts (users or leads) share the email it uses the first match, so prefer a unique email. Each call appends a new note, so it is not idempotent. This attaches a note to a contact, distinct from Add note to conversation which annotates a conversation thread. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `body` | string | yes |  | Note Text. |

Output fields:

- `id`: Note ID
- `body`: Body (html)
- `created_at`: Created At
- `author`: Author
- `author.id`: Admin ID
- `author.name`: Name
- `author.email`: Email (email)
- `contact`: Contact
- `contact.id`: Contact ID

### `addNoteToConversation`

**Add note to conversation.** Append an internal admin-only note to an existing conversation; the note is visible to admins but never sent to the contact. Each call adds a new note, so it is not idempotent. To send a customer-visible reply instead, use Reply to conversation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From (Admin). A value the product loads from the provider, such as an id; write the value itself. |
| `conversationId` | string | yes |  | Conversation ID. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Message Body. |

Output fields:

- `id`: Conversation ID
- `title`: Title
- `state`: State
- `open`: Open (boolean)
- `read`: Read (boolean)
- `priority`: Priority
- `created_at`: Created At
- `updated_at`: Updated At
- `waiting_since`: Waiting Since
- `snoozed_until`: Snoozed Until
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `source`: First Message
- `source.type`: Type
- `source.delivered_as`: Delivered As
- `source.subject`: Subject
- `source.body`: Body (html)
- `source.url`: URL (url)
- `source.author`: Author
- `source.author.type`: Type
- `source.author.id`: ID
- `source.author.name`: Name
- `source.author.email`: Email (email)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name
- `conversation_rating`: Rating
- `conversation_rating.rating`: Rating (number)
- `conversation_rating.remark`: Remark
- `conversation_rating.created_at`: Rated At
- `statistics`: Statistics
- `statistics.first_admin_reply_at`: First Admin Reply At
- `statistics.last_close_at`: Last Closed At
- `statistics.count_reopens`: Reopen Count (number)
- `statistics.count_conversation_parts`: Part Count (number)
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `ai_agent_participated`: AI Agent Participated (boolean)

### `add-or-remove-tag-on-contact`

**Add/Remove Tag on Contact.** Tag or untag a contact by contact ID and tag ID; set the Untag flag to remove rather than add. Adding a tag that is already there changes nothing; removing a tag that is gone can fail, so it is not marked idempotent. Requires an existing tag ID (use List Tags to discover one). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. A value the product loads from the provider, such as an id; write the value itself. |
| `tagId` | string | yes |  | Tag Name. A value the product loads from the provider, such as an id; write the value itself. |
| `untag` | boolean | no | `false` | Untag ?. |

Output fields:

- `id`: Tag ID
- `name`: Name

### `add-or-remove-tag-on-company`

**Add/Remove Tag on Company.** Attach or remove a tag (by tag name) on a company identified by its Intercom company ID; set the Untag flag to remove rather than add. Tags are created or reused by name. Adding a tag that is already there changes nothing; removing needs the tag to exist, so a retry after removal can fail and the action is not marked idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company ID. A value the product loads from the provider, such as an id; write the value itself. |
| `tagName` | string | yes |  | Tag Name. |
| `untag` | boolean | no | `false` | Untag ?. |

Output fields:

- `id`: Tag ID
- `name`: Name

### `add-or-remove-tag-on-conversation`

**Add/Remove Tag on Conversation.** Tag or untag a conversation by conversation ID and tag ID; set the Untag flag to remove rather than add. Adding a tag that is already there changes nothing; removing a tag that is gone can fail, so it is not marked idempotent. Requires an existing tag ID (use List Tags to discover one). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | yes |  | Conversation ID. A value the product loads from the provider, such as an id; write the value itself. |
| `tagId` | string | yes |  | Tag. A value the product loads from the provider, such as an id; write the value itself. |
| `untag` | boolean | no | `false` | Untag ?. |

Output fields:

- `id`: Tag ID
- `name`: Name

### `assignConversationAction`

**Assign conversation to an admin or a team.** Reassign an existing conversation to a specific admin or team by assignee ID, optionally with a message body. The assignee converges on retry, but each call logs a new assignment part and posts the optional message again, so it is not idempotent. The assignee ID must be a valid admin or team ID. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From (Admin). A value the product loads from the provider, such as an id; write the value itself. |
| `conversationId` | string | yes |  | Conversation ID. A value the product loads from the provider, such as an id; write the value itself. |
| `assigneeId` | string | yes |  | Assignee ID. The ID of the admin or team to assign this conversation to. |
| `body` | string | no |  | Message Body. |

Output fields:

- `id`: Conversation ID
- `title`: Title
- `state`: State
- `open`: Open (boolean)
- `read`: Read (boolean)
- `priority`: Priority
- `created_at`: Created At
- `updated_at`: Updated At
- `waiting_since`: Waiting Since
- `snoozed_until`: Snoozed Until
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `source`: First Message
- `source.type`: Type
- `source.delivered_as`: Delivered As
- `source.subject`: Subject
- `source.body`: Body (html)
- `source.url`: URL (url)
- `source.author`: Author
- `source.author.type`: Type
- `source.author.id`: ID
- `source.author.name`: Name
- `source.author.email`: Email (email)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name
- `conversation_rating`: Rating
- `conversation_rating.rating`: Rating (number)
- `conversation_rating.remark`: Remark
- `conversation_rating.created_at`: Rated At
- `statistics`: Statistics
- `statistics.first_admin_reply_at`: First Admin Reply At
- `statistics.last_close_at`: Last Closed At
- `statistics.count_reopens`: Reopen Count (number)
- `statistics.count_conversation_parts`: Part Count (number)
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `ai_agent_participated`: AI Agent Participated (boolean)

### `create-article`

**Create Article.** Create a new Help Center article with title, optional description and body, an author admin, and a draft or published state, optionally nested under a parent collection. Always creates a new article, so it is not idempotent and repeated calls produce duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `description` | string | no |  | Description. |
| `body` | string | no |  | Body. |
| `authorId` | string | yes |  | Author. A value the product loads from the provider, such as an id; write the value itself. |
| `state` | string | yes | `"draft"` | State. One of `"draft"`, `"published"`. |
| `collectionId` | string | no |  | Parent Collection. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Article ID
- `title`: Title
- `description`: Description
- `body`: Body (html)
- `author_id`: Author ID
- `state`: State
- `url`: URL (url)
- `parent_id`: Parent Collection ID
- `created_at`: Created At
- `updated_at`: Updated At

### `create-conversation`

**Create Conversation.** Start a new Intercom conversation on behalf of an existing contact by sending an initial message body from that contact. Pick this to open a fresh thread tied to a known user or lead; it does not reply to or search existing conversations. Requires a valid contact ID and the matching contact type (user or lead). Not idempotent — each call creates a separate conversation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactType` | string | yes | `"user"` | Contact Type. One of `"user"`, `"lead"`. |
| `contactId` | string | yes |  | Contact ID. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Message Body. |

Output fields:

- `type`: Type
- `id`: Message ID
- `created_at`: Created At
- `subject`: Subject
- `body`: Body (html)
- `message_type`: Message Type
- `template`: Email Template
- `conversation_id`: Conversation ID
- `owner`: Sent By
- `owner.id`: Admin ID
- `owner.name`: Name
- `owner.email`: Email (email)

### `create-data-event`

**Create Data Event.** Submit a data (tracking) event against a contact, identified by their Intercom ID, external User ID, or email. Records something the contact did (an event name) with an optional metadata payload of string values. Each call logs a new event, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifierType` | string | yes | `"email"` | Identify Contact By. One of `"email"`, `"id"`, `"user_id"`. |
| `identifierValue` | string | yes |  | Identifier Value. |
| `eventName` | string | yes |  | Event Name. The name of the event that occurred. |
| `createdAt` | ISO date-time string | no |  | Created At. When the event happened. Defaults to now if left empty. |
| `metadata` | object | no |  | Metadata. Optional key/value pairs describing the event. |

Output fields:

- `success`: Success (boolean)

### `create-ticket`

**Create Ticket.** Create a new ticket of a given ticket type for a contact, optionally tied to a company, with type-specific ticket attributes (only attributes the ticket type defines as date-time are converted to timestamps; text and list values are sent as given). Always creates a new ticket, so it is not idempotent. To change an existing ticket instead, use Update Ticket. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketTypeId` | string | yes |  | Ticket Type. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes |  | Contact ID. A value the product loads from the provider, such as an id; write the value itself. |
| `companyId` | string | no |  | Company ID. A value the product loads from the provider, such as an id; write the value itself. |
| `ticketProperties` | object | yes |  | Ticket Properties. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Ticket ID
- `ticket_id`: Inbox Ticket Number
- `category`: Category
- `ticket_state`: State
- `ticket_state_internal_label`: State (Internal Label)
- `ticket_state_external_label`: State (Customer Label)
- `open`: Open (boolean)
- `is_shared`: Shared With Customer (boolean)
- `ticket_type`: Ticket Type
- `ticket_type.id`: Ticket Type ID
- `ticket_type.name`: Name
- `ticket_attributes`: Ticket Attributes (an object whose keys vary)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `created_at`: Created At
- `updated_at`: Updated At
- `snoozed_until`: Snoozed Until

### `create-user`

**Create User.** Create a new user-role contact in Intercom from email and optional name, external user ID, signup time, and custom attributes. Always creates a record and does not check for an existing match, so it is not idempotent and repeated calls may produce duplicates. To update-if-exists instead, use Create/Update User. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `createdAt` | ISO date-time string | no |  | Created At. |
| `userId` | string | no |  | User ID. |
| `name` | string | no |  | Full Name. |
| `customAttributes` | object | no |  | Custom Attributes. |

Output fields:

- `id`: Contact ID
- `role`: Role
- `email`: Email (email)
- `name`: Name
- `phone`: Phone
- `external_id`: External ID
- `owner_id`: Owner ID
- `created_at`: Created At
- `updated_at`: Updated At
- `signed_up_at`: Signed Up At
- `last_seen_at`: Last Seen At
- `last_replied_at`: Last Replied At
- `last_contacted_at`: Last Contacted At
- `unsubscribed_from_emails`: Unsubscribed From Emails (boolean)
- `has_hard_bounced`: Has Hard Bounced (boolean)
- `marked_email_as_spam`: Marked Email As Spam (boolean)
- `location`: Location
- `location.country`: Country
- `location.region`: Region
- `location.city`: City
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `tags`: Tags
- `tags.data`: Tag References
- `tags.data[].id`: ID
- `tags.total_count`: Total Count (number)
- `tags.has_more`: Has More (boolean)
- `companies`: Companies
- `companies.data`: Company References
- `companies.data[].id`: ID
- `companies.total_count`: Total Count (number)
- `companies.has_more`: Has More (boolean)

### `create-or-update-company`

**Create or Update Company.** Create or update a company. With a Company ID, Intercom updates the company that has it or creates one with it, so a retry converges; without a Company ID every call creates a new company. Company ID cannot be changed after creation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | no |  | Company ID. The company ID you have defined for the company. Cannot be updated later. |
| `name` | string | no |  | Name. |
| `plan` | string | no |  | Plan. |
| `size` | number | no |  | Size. The number of employees in this company. |
| `website` | string | no |  | Website. |
| `industry` | string | no |  | Industry. |
| `monthlySpend` | number | no |  | Monthly Spend. How much revenue the company generates for your business (whole integers only). |
| `remoteCreatedAt` | ISO date-time string | no |  | Created At. The time the company was created by you. |
| `customAttributes` | object | no |  | Custom Attributes. |

Output fields:

- `id`: Intercom Company ID
- `company_id`: Your Company ID
- `name`: Name
- `plan`: Plan
- `plan.name`: Plan Name
- `size`: Size (number)
- `website`: Website (url)
- `industry`: Industry
- `monthly_spend`: Monthly Spend (number)
- `user_count`: User Count (number)
- `session_count`: Session Count (number)
- `created_at`: Created At
- `updated_at`: Updated At
- `remote_created_at`: Created At (Your System)
- `last_request_at`: Last Request At
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name

### `create-or-update-lead`

**Create or Update Lead.** Update a lead (prospect contact) when a Lead ID is given (errors if none is found), otherwise create a new lead. With a Lead ID a retry writes the same values; without one each call creates another lead, so it is not marked idempotent. For signed-up users use Create/Update User instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | no |  | Lead ID. |
| `name` | string | no |  | Full Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `unsubscribe` | boolean | no |  | Unsubscribed From Emails. |
| `createdAt` | ISO date-time string | no |  | Created At. |
| `customAttributes` | object | no |  | Custom Attributes. |

Output fields:

- `id`: Contact ID
- `role`: Role
- `email`: Email (email)
- `name`: Name
- `phone`: Phone
- `external_id`: External ID
- `owner_id`: Owner ID
- `created_at`: Created At
- `updated_at`: Updated At
- `signed_up_at`: Signed Up At
- `last_seen_at`: Last Seen At
- `last_replied_at`: Last Replied At
- `last_contacted_at`: Last Contacted At
- `unsubscribed_from_emails`: Unsubscribed From Emails (boolean)
- `has_hard_bounced`: Has Hard Bounced (boolean)
- `marked_email_as_spam`: Marked Email As Spam (boolean)
- `location`: Location
- `location.country`: Country
- `location.region`: Region
- `location.city`: City
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `tags`: Tags
- `tags.data`: Tag References
- `tags.data[].id`: ID
- `tags.total_count`: Total Count (number)
- `tags.has_more`: Has More (boolean)
- `companies`: Companies
- `companies.data`: Company References
- `companies.data[].id`: ID
- `companies.total_count`: Total Count (number)
- `companies.has_more`: Has More (boolean)

### `create-or-update-user`

**Create/Update User.** Upsert a user-role contact keyed by email: updates the existing user if one matches that email, otherwise creates a new one. Repeating with the same email and fields converges on the same record, so it is effectively idempotent. Use for users (signed-up contacts); for prospects use Create or Update Lead. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Lookup Email. |
| `name` | string | no |  | Full Name. |
| `userId` | string | no |  | User ID. |
| `phone` | string | no |  | Phone. |
| `createdAt` | ISO date-time string | no |  | Created At. |
| `customAttributes` | object | no |  | Custom Attributes. |

Output fields:

- `id`: Contact ID
- `role`: Role
- `email`: Email (email)
- `name`: Name
- `phone`: Phone
- `external_id`: External ID
- `owner_id`: Owner ID
- `created_at`: Created At
- `updated_at`: Updated At
- `signed_up_at`: Signed Up At
- `last_seen_at`: Last Seen At
- `last_replied_at`: Last Replied At
- `last_contacted_at`: Last Contacted At
- `unsubscribed_from_emails`: Unsubscribed From Emails (boolean)
- `has_hard_bounced`: Has Hard Bounced (boolean)
- `marked_email_as_spam`: Marked Email As Spam (boolean)
- `location`: Location
- `location.country`: Country
- `location.region`: Region
- `location.city`: City
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `tags`: Tags
- `tags.data`: Tag References
- `tags.data[].id`: ID
- `tags.total_count`: Total Count (number)
- `tags.has_more`: Has More (boolean)
- `companies`: Companies
- `companies.data`: Company References
- `companies.data[].id`: ID
- `companies.total_count`: Total Count (number)
- `companies.has_more`: Has More (boolean)

### `replyToConversation`

**Reply to conversation.** Post an admin reply (a customer-visible comment) to an existing conversation. Each call adds a new reply, so it is not idempotent. Use to respond within an ongoing conversation; for an admin-only internal note use Add note to conversation, and to start a brand-new message use Send Message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From (Admin). A value the product loads from the provider, such as an id; write the value itself. |
| `conversationId` | string | yes |  | Conversation ID. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Message Body. |

Output fields:

- `id`: Conversation ID
- `title`: Title
- `state`: State
- `open`: Open (boolean)
- `read`: Read (boolean)
- `priority`: Priority
- `created_at`: Created At
- `updated_at`: Updated At
- `waiting_since`: Waiting Since
- `snoozed_until`: Snoozed Until
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `source`: First Message
- `source.type`: Type
- `source.delivered_as`: Delivered As
- `source.subject`: Subject
- `source.body`: Body (html)
- `source.url`: URL (url)
- `source.author`: Author
- `source.author.type`: Type
- `source.author.id`: ID
- `source.author.name`: Name
- `source.author.email`: Email (email)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name
- `conversation_rating`: Rating
- `conversation_rating.rating`: Rating (number)
- `conversation_rating.remark`: Remark
- `conversation_rating.created_at`: Rated At
- `statistics`: Statistics
- `statistics.first_admin_reply_at`: First Admin Reply At
- `statistics.last_close_at`: Last Closed At
- `statistics.count_reopens`: Reopen Count (number)
- `statistics.count_conversation_parts`: Part Count (number)
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `ai_agent_participated`: AI Agent Participated (boolean)

### `send_message`

**Send Message.** Send a new outbound message from an admin to a contact, as either an email (with subject and template) or an in-app chat message. Each call sends a new message and may open a conversation, so it is not idempotent. Use to initiate contact; to respond within an existing conversation use Reply to conversation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_type` | string | yes | `"email"` | Message Type. One of `"email"`, `"inapp"`. |
| `email_required_fields` | object | yes |  | Email Required Fields. An object whose fields depend on other inputs; the product shows them. |
| `from` | string | yes |  | From (Admin). A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Message Body. |
| `create_conversation_without_contact_reply` | boolean | no | `false` | Create Conversation Without Contact Reply. Whether a conversation should be opened in the inbox for the message without the contact replying. Defaults to false if not provided. |

Output fields:

- `type`: Type
- `id`: Message ID
- `created_at`: Created At
- `subject`: Subject
- `body`: Body (html)
- `message_type`: Message Type
- `template`: Email Template
- `conversation_id`: Conversation ID
- `owner`: Sent By
- `owner.id`: Admin ID
- `owner.name`: Name
- `owner.email`: Email (email)

### `update-ticket`

**Update Ticket.** Modify an existing ticket by ID: change its open flag, state (in progress / waiting on customer / resolved), snooze time, assigned admin, and ticket-type attributes. Updating with the same values converges on the same result, so it is effectively idempotent. To create a new ticket instead, use Create Ticket. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketTypeId` | string | yes |  | Ticket Type. A value the product loads from the provider, such as an id; write the value itself. |
| `ticketId` | string | yes |  | Ticket. A value the product loads from the provider, such as an id; write the value itself. |
| `ticketProperties` | object | yes |  | Ticket Properties. An object whose fields depend on other inputs; the product shows them. |
| `isOpen` | boolean | no |  | Is Open. |
| `state` | string | no |  | State. One of `"in_progress"`, `"waiting_on_customer"`, `"resolved"`. |
| `snoozedTill` | ISO date-time string | no |  | Snoozed Until. |
| `assignedAdminId` | string | no |  | Assigned Admin. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Ticket ID
- `ticket_id`: Inbox Ticket Number
- `category`: Category
- `ticket_state`: State
- `ticket_state_internal_label`: State (Internal Label)
- `ticket_state_external_label`: State (Customer Label)
- `open`: Open (boolean)
- `is_shared`: Shared With Customer (boolean)
- `ticket_type`: Ticket Type
- `ticket_type.id`: Ticket Type ID
- `ticket_type.name`: Name
- `ticket_attributes`: Ticket Attributes (an object whose keys vary)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `created_at`: Created At
- `updated_at`: Updated At
- `snoozed_until`: Snoozed Until

### `find-company`

**Find Company.** Look up a single existing company by its exact name or your own Company ID (choose the search field). Returns found=false when nothing matches; a name lookup only finds companies that already have a contact attached; the company is under "company" ("user" is a legacy copy). Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchField` | string | yes |  | Search Field. One of `"name"`, `"company_id"`. |
| `searchValue` | string | yes |  | Search Value. |

Output fields:

- `found`: Found (boolean)
- `company`: Company
- `company.id`: Intercom Company ID
- `company.company_id`: Your Company ID
- `company.name`: Name
- `company.plan`: Plan
- `company.plan.name`: Plan Name
- `company.size`: Size (number)
- `company.website`: Website (url)
- `company.industry`: Industry
- `company.monthly_spend`: Monthly Spend (number)
- `company.user_count`: User Count (number)
- `company.session_count`: Session Count (number)
- `company.created_at`: Created At
- `company.updated_at`: Updated At
- `company.remote_created_at`: Created At (Your System)
- `company.last_request_at`: Last Request At
- `company.custom_attributes`: Custom Attributes (an object whose keys vary)
- `company.tags`: Tags
- `company.tags.tags`: Tags
- `company.tags.tags[].id`: Tag ID
- `company.tags.tags[].name`: Name
- `user`: Company (Legacy Key)
- `user.id`: Intercom Company ID
- `user.company_id`: Your Company ID
- `user.name`: Name
- `user.plan`: Plan
- `user.plan.name`: Plan Name
- `user.size`: Size (number)
- `user.website`: Website (url)
- `user.industry`: Industry
- `user.monthly_spend`: Monthly Spend (number)
- `user.user_count`: User Count (number)
- `user.session_count`: Session Count (number)
- `user.created_at`: Created At
- `user.updated_at`: Updated At
- `user.remote_created_at`: Created At (Your System)
- `user.last_request_at`: Last Request At
- `user.custom_attributes`: Custom Attributes (an object whose keys vary)
- `user.tags`: Tags
- `user.tags.tags`: Tags
- `user.tags.tags[].id`: Tag ID
- `user.tags.tags[].name`: Name

### `find-conversation`

**Find Conversation.** Search conversations by a chosen field (ID, subject, message body, author email, assigned admin, team, or tag IDs) with a contains/equals/starts-with match (IDs: equals only), optionally filtered by open/closed/snoozed status and an update-time window. Read-only and repeatable; returns the first match plus a found flag. Use when you do not already have the conversation ID — otherwise use Retrieve a Conversation. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchField` | string | yes |  | Search Field. One of `"id"`, `"source.subject"`, `"source.body"`, `"source.author.email"`, `"admin_assignee_id"`, `"team_assignee_id"`, `"tag_ids"`. |
| `matchType` | string | yes |  | Match Type. One of `"contains"`, `"equals"`, `"starts_with"`. |
| `searchTerm` | string | yes |  | Search Term. Conversation ID, Assigned Admin, Team and Tag IDs only support Equals. |
| `status` | string | no |  | Status. One of `"open"`, `"closed"`, `"snoozed"`. |
| `updateAfter` | ISO date-time string | no |  | Update After. Intercom compares dates by calendar day in your workspace time zone. |
| `updateBefore` | ISO date-time string | no |  | Update Before. |

Output fields:

- `found`: Found (boolean)
- `conversation`: Conversation
- `conversation.id`: Conversation ID
- `conversation.title`: Title
- `conversation.state`: State
- `conversation.open`: Open (boolean)
- `conversation.read`: Read (boolean)
- `conversation.priority`: Priority
- `conversation.created_at`: Created At
- `conversation.updated_at`: Updated At
- `conversation.waiting_since`: Waiting Since
- `conversation.snoozed_until`: Snoozed Until
- `conversation.admin_assignee_id`: Assigned Admin ID
- `conversation.team_assignee_id`: Assigned Team ID
- `conversation.source`: First Message
- `conversation.source.type`: Type
- `conversation.source.delivered_as`: Delivered As
- `conversation.source.subject`: Subject
- `conversation.source.body`: Body (html)
- `conversation.source.url`: URL (url)
- `conversation.source.author`: Author
- `conversation.source.author.type`: Type
- `conversation.source.author.id`: ID
- `conversation.source.author.name`: Name
- `conversation.source.author.email`: Email (email)
- `conversation.contacts`: Contacts
- `conversation.contacts.contacts`: Contacts
- `conversation.contacts.contacts[].id`: Contact ID
- `conversation.contacts.contacts[].external_id`: External ID
- `conversation.tags`: Tags
- `conversation.tags.tags`: Tags
- `conversation.tags.tags[].id`: Tag ID
- `conversation.tags.tags[].name`: Name
- `conversation.conversation_rating`: Rating
- `conversation.conversation_rating.rating`: Rating (number)
- `conversation.conversation_rating.remark`: Remark
- `conversation.conversation_rating.created_at`: Rated At
- `conversation.statistics`: Statistics
- `conversation.statistics.first_admin_reply_at`: First Admin Reply At
- `conversation.statistics.last_close_at`: Last Closed At
- `conversation.statistics.count_reopens`: Reopen Count (number)
- `conversation.statistics.count_conversation_parts`: Part Count (number)
- `conversation.custom_attributes`: Custom Attributes (an object whose keys vary)
- `conversation.ai_agent_participated`: AI Agent Participated (boolean)

### `find-lead`

**Find Lead.** Look up a single existing lead (prospect contact) by email, Intercom ID, or external user ID. Read-only and repeatable; returns the first match plus a found flag and only matches role=lead. To find a signed-up user instead, use Find User. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchField` | string | yes |  | Search Field. One of `"email"`, `"id"`, `"external_id"`. |
| `searchValue` | string | yes |  | Search Value. |

Output fields:

- `found`: Found (boolean)
- `lead`: Lead
- `lead.id`: Contact ID
- `lead.role`: Role
- `lead.email`: Email (email)
- `lead.name`: Name
- `lead.phone`: Phone
- `lead.external_id`: External ID
- `lead.owner_id`: Owner ID
- `lead.created_at`: Created At
- `lead.updated_at`: Updated At
- `lead.signed_up_at`: Signed Up At
- `lead.last_seen_at`: Last Seen At
- `lead.last_replied_at`: Last Replied At
- `lead.last_contacted_at`: Last Contacted At
- `lead.unsubscribed_from_emails`: Unsubscribed From Emails (boolean)
- `lead.has_hard_bounced`: Has Hard Bounced (boolean)
- `lead.marked_email_as_spam`: Marked Email As Spam (boolean)
- `lead.location`: Location
- `lead.location.country`: Country
- `lead.location.region`: Region
- `lead.location.city`: City
- `lead.custom_attributes`: Custom Attributes (an object whose keys vary)
- `lead.tags`: Tags
- `lead.tags.data`: Tag References
- `lead.tags.data[].id`: ID
- `lead.tags.total_count`: Total Count (number)
- `lead.tags.has_more`: Has More (boolean)
- `lead.companies`: Companies
- `lead.companies.data`: Company References
- `lead.companies.data[].id`: ID
- `lead.companies.total_count`: Total Count (number)
- `lead.companies.has_more`: Has More (boolean)

### `find-or-create-company`

**Find or Create Company.** Resolve a company to a single record: looks it up by your Company ID (preferred) or exact name and returns the match, or creates a new company when none exists. Returns the company plus a "created" flag. With a Company ID a retry finds the same company; with only a name, a company that has no contact yet is not found by name, so a duplicate can be created. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | no |  | Company ID. The company ID you have defined for the company. Used to look up and create. |
| `name` | string | no |  | Name. Used to look up by name when no Company ID is given, and when creating. |
| `plan` | string | no |  | Plan. |
| `size` | number | no |  | Size. |
| `website` | string | no |  | Website. |
| `industry` | string | no |  | Industry. |
| `customAttributes` | object | no |  | Custom Attributes. |

Output fields:

- `created`: Created (boolean)
- `company`: Company
- `company.id`: Intercom Company ID
- `company.company_id`: Your Company ID
- `company.name`: Name
- `company.plan`: Plan
- `company.plan.name`: Plan Name
- `company.size`: Size (number)
- `company.website`: Website (url)
- `company.industry`: Industry
- `company.monthly_spend`: Monthly Spend (number)
- `company.user_count`: User Count (number)
- `company.session_count`: Session Count (number)
- `company.created_at`: Created At
- `company.updated_at`: Updated At
- `company.remote_created_at`: Created At (Your System)
- `company.last_request_at`: Last Request At
- `company.custom_attributes`: Custom Attributes (an object whose keys vary)
- `company.tags`: Tags
- `company.tags.tags`: Tags
- `company.tags.tags[].id`: Tag ID
- `company.tags.tags[].name`: Name

### `find-or-create-lead`

**Find or Create Lead.** Resolve a lead (role=lead prospect) to a single record: searches by email, Intercom ID, or external User ID and returns the match, or creates a new lead when none exists. Returns the lead plus a "created" flag. For signed-up users use Get Contact or Create User instead. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchField` | string | yes | `"email"` | Search Field. One of `"email"`, `"id"`, `"external_id"`. |
| `searchValue` | string | yes |  | Search Value. |
| `name` | string | no |  | Full Name. |
| `phone` | string | no |  | Phone. |
| `customAttributes` | object | no |  | Custom Attributes. |

Output fields:

- `created`: Created (boolean)
- `lead`: Lead
- `lead.id`: Contact ID
- `lead.role`: Role
- `lead.email`: Email (email)
- `lead.name`: Name
- `lead.phone`: Phone
- `lead.external_id`: External ID
- `lead.owner_id`: Owner ID
- `lead.created_at`: Created At
- `lead.updated_at`: Updated At
- `lead.signed_up_at`: Signed Up At
- `lead.last_seen_at`: Last Seen At
- `lead.last_replied_at`: Last Replied At
- `lead.last_contacted_at`: Last Contacted At
- `lead.unsubscribed_from_emails`: Unsubscribed From Emails (boolean)
- `lead.has_hard_bounced`: Has Hard Bounced (boolean)
- `lead.marked_email_as_spam`: Marked Email As Spam (boolean)
- `lead.location`: Location
- `lead.location.country`: Country
- `lead.location.region`: Region
- `lead.location.city`: City
- `lead.custom_attributes`: Custom Attributes (an object whose keys vary)
- `lead.tags`: Tags
- `lead.tags.data`: Tag References
- `lead.tags.data[].id`: ID
- `lead.tags.total_count`: Total Count (number)
- `lead.tags.has_more`: Has More (boolean)
- `lead.companies`: Companies
- `lead.companies.data`: Company References
- `lead.companies.data[].id`: ID
- `lead.companies.total_count`: Total Count (number)
- `lead.companies.has_more`: Has More (boolean)

### `find-user`

**Find User.** Look up a single existing user (signed-up contact) by email, Intercom ID, or external user ID. Read-only and repeatable; returns the first match plus a found flag and only matches role=user. To find a prospect instead, use Find Lead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchField` | string | yes |  | Search Field. One of `"email"`, `"id"`, `"external_id"`. |
| `searchValue` | string | yes |  | Search Value. |

Output fields:

- `found`: Found (boolean)
- `user`: User
- `user.id`: Contact ID
- `user.role`: Role
- `user.email`: Email (email)
- `user.name`: Name
- `user.phone`: Phone
- `user.external_id`: External ID
- `user.owner_id`: Owner ID
- `user.created_at`: Created At
- `user.updated_at`: Updated At
- `user.signed_up_at`: Signed Up At
- `user.last_seen_at`: Last Seen At
- `user.last_replied_at`: Last Replied At
- `user.last_contacted_at`: Last Contacted At
- `user.unsubscribed_from_emails`: Unsubscribed From Emails (boolean)
- `user.has_hard_bounced`: Has Hard Bounced (boolean)
- `user.marked_email_as_spam`: Marked Email As Spam (boolean)
- `user.location`: Location
- `user.location.country`: Country
- `user.location.region`: Region
- `user.location.city`: City
- `user.custom_attributes`: Custom Attributes (an object whose keys vary)
- `user.tags`: Tags
- `user.tags.data`: Tag References
- `user.tags.data[].id`: ID
- `user.tags.total_count`: Total Count (number)
- `user.tags.has_more`: Has More (boolean)
- `user.companies`: Companies
- `user.companies.data`: Company References
- `user.companies.data[].id`: ID
- `user.companies.total_count`: Total Count (number)
- `user.companies.has_more`: Has More (boolean)

### `list-all-tags`

**List Tags.** List all tags defined in the Intercom workspace. Takes no input; read-only and repeatable. Use to discover tag IDs before tagging or untagging a conversation, contact, or company. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `data`: Tags
- `data[].id`: Tag ID
- `data[].name`: Name

### `get-conversation`

**Retrieve a Conversation.** Fetch a single Intercom conversation by its conversation ID. Use when you already have the exact ID and need its full details (messages, parts, assignee, state); read-only and repeatable. To locate a conversation by subject, body, author, assignee, or tag instead, use Find Conversation. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | yes |  | Conversation ID. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Conversation ID
- `title`: Title
- `state`: State
- `open`: Open (boolean)
- `read`: Read (boolean)
- `priority`: Priority
- `created_at`: Created At
- `updated_at`: Updated At
- `waiting_since`: Waiting Since
- `snoozed_until`: Snoozed Until
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `source`: First Message
- `source.type`: Type
- `source.delivered_as`: Delivered As
- `source.subject`: Subject
- `source.body`: Body (html)
- `source.url`: URL (url)
- `source.author`: Author
- `source.author.type`: Type
- `source.author.id`: ID
- `source.author.name`: Name
- `source.author.email`: Email (email)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name
- `conversation_rating`: Rating
- `conversation_rating.rating`: Rating (number)
- `conversation_rating.remark`: Remark
- `conversation_rating.created_at`: Rated At
- `statistics`: Statistics
- `statistics.first_admin_reply_at`: First Admin Reply At
- `statistics.last_close_at`: Last Closed At
- `statistics.count_reopens`: Reopen Count (number)
- `statistics.count_conversation_parts`: Part Count (number)
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `ai_agent_participated`: AI Agent Participated (boolean)
- `conversation_parts`: Conversation Parts
- `conversation_parts.conversation_parts`: Parts
- `conversation_parts.conversation_parts[].id`: Part ID
- `conversation_parts.conversation_parts[].part_type`: Part Type
- `conversation_parts.conversation_parts[].body`: Body (html)
- `conversation_parts.conversation_parts[].created_at`: Created At
- `conversation_parts.conversation_parts[].author`: Author
- `conversation_parts.conversation_parts[].author.type`: Type
- `conversation_parts.conversation_parts[].author.id`: ID
- `conversation_parts.conversation_parts[].author.name`: Name
- `conversation_parts.conversation_parts[].author.email`: Email (email)
- `conversation_parts.total_count`: Total Parts (number)

### `get_conversation_by_id`

**Get Conversation (by ID).** Fetch one conversation by its ID, with every message flattened into parts (author type, author ID and name, part type, body, time). Use after Search Conversations or a trigger gives you the ID; use Search Conversations when you only know the customer or topic. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | yes |  | Conversation ID. The Intercom conversation ID, for example from Search Conversations. |
| `plainText` | boolean | no | `true` | Plain Text Bodies. Return message bodies as plain text instead of HTML. |

Output fields:

- `id`: Conversation ID
- `title`: Title
- `state`: State
- `open`: Open (boolean)
- `read`: Read (boolean)
- `priority`: Priority
- `created_at`: Created At
- `updated_at`: Updated At
- `waiting_since`: Waiting Since
- `snoozed_until`: Snoozed Until
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `source`: First Message
- `source.type`: Type
- `source.delivered_as`: Delivered As
- `source.subject`: Subject
- `source.body`: Body (html)
- `source.url`: URL (url)
- `source.author`: Author
- `source.author.type`: Type
- `source.author.id`: ID
- `source.author.name`: Name
- `source.author.email`: Email (email)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name
- `conversation_rating`: Rating
- `conversation_rating.rating`: Rating (number)
- `conversation_rating.remark`: Remark
- `conversation_rating.created_at`: Rated At
- `statistics`: Statistics
- `statistics.first_admin_reply_at`: First Admin Reply At
- `statistics.last_close_at`: Last Closed At
- `statistics.count_reopens`: Reopen Count (number)
- `statistics.count_conversation_parts`: Part Count (number)
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `ai_agent_participated`: AI Agent Participated (boolean)
- `parts`: Parts
- `parts[].id`: Part ID
- `parts[].part_type`: Part Type
- `parts[].author_type`: Author Type
- `parts[].author_id`: Author ID
- `parts[].author_name`: Author Name
- `parts[].body`: Body
- `parts[].created_at`: Created At

### `reply_to_conversation_by_id`

**Reply to Conversation (by ID).** Posts a customer-visible admin reply in an existing conversation; Intercom may also email it to the contact. Use Add Note to Conversation (by ID) for internal remarks and Send Message to Contact to start a new thread. Each call posts a new reply, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | yes |  | Conversation ID. The Intercom conversation ID. |
| `body` | string | yes |  | Reply. The reply text. Simple HTML is allowed. |
| `adminId` | string | no |  | Admin ID. The admin who replies. Leave empty to reply as the admin who owns this connection (see List Admins). |
| `attachmentUrls` | array | no |  | Attachment URLs. Up to 10 public image URLs to attach. |

Output fields:

- `id`: Conversation ID
- `title`: Title
- `state`: State
- `open`: Open (boolean)
- `read`: Read (boolean)
- `priority`: Priority
- `created_at`: Created At
- `updated_at`: Updated At
- `waiting_since`: Waiting Since
- `snoozed_until`: Snoozed Until
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `source`: First Message
- `source.type`: Type
- `source.delivered_as`: Delivered As
- `source.subject`: Subject
- `source.body`: Body (html)
- `source.url`: URL (url)
- `source.author`: Author
- `source.author.type`: Type
- `source.author.id`: ID
- `source.author.name`: Name
- `source.author.email`: Email (email)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name
- `conversation_rating`: Rating
- `conversation_rating.rating`: Rating (number)
- `conversation_rating.remark`: Remark
- `conversation_rating.created_at`: Rated At
- `statistics`: Statistics
- `statistics.first_admin_reply_at`: First Admin Reply At
- `statistics.last_close_at`: Last Closed At
- `statistics.count_reopens`: Reopen Count (number)
- `statistics.count_conversation_parts`: Part Count (number)
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `ai_agent_participated`: AI Agent Participated (boolean)

### `add_note_to_conversation_by_id`

**Add Note to Conversation (by ID).** Adds an internal note to an existing conversation; only teammates see it, the customer never does. Use Reply to Conversation (by ID) to answer the customer. Each call adds another note, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | yes |  | Conversation ID. The Intercom conversation ID. |
| `body` | string | yes |  | Note. The note text. Simple HTML is allowed. |
| `adminId` | string | no |  | Admin ID. The admin who writes the note. Leave empty to use the admin who owns this connection. |

Output fields:

- `id`: Conversation ID
- `title`: Title
- `state`: State
- `open`: Open (boolean)
- `read`: Read (boolean)
- `priority`: Priority
- `created_at`: Created At
- `updated_at`: Updated At
- `waiting_since`: Waiting Since
- `snoozed_until`: Snoozed Until
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `source`: First Message
- `source.type`: Type
- `source.delivered_as`: Delivered As
- `source.subject`: Subject
- `source.body`: Body (html)
- `source.url`: URL (url)
- `source.author`: Author
- `source.author.type`: Type
- `source.author.id`: ID
- `source.author.name`: Name
- `source.author.email`: Email (email)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name
- `conversation_rating`: Rating
- `conversation_rating.rating`: Rating (number)
- `conversation_rating.remark`: Remark
- `conversation_rating.created_at`: Rated At
- `statistics`: Statistics
- `statistics.first_admin_reply_at`: First Admin Reply At
- `statistics.last_close_at`: Last Closed At
- `statistics.count_reopens`: Reopen Count (number)
- `statistics.count_conversation_parts`: Part Count (number)
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `ai_agent_participated`: AI Agent Participated (boolean)

### `assign_conversation_by_id`

**Assign Conversation (by ID).** Assigns an existing conversation to an admin or a team by ID; assignee ID 0 unassigns it. Get IDs from List Admins or List Teams. No message is posted, and assigning to the same assignee again leaves the same state, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | yes |  | Conversation ID. The Intercom conversation ID. |
| `assigneeType` | string | yes | `"admin"` | Assign To. One of `"admin"`, `"team"`. |
| `assigneeId` | string | yes |  | Assignee ID. The admin or team ID. Use 0 to unassign. |
| `adminId` | string | no |  | Acting Admin ID. The admin who performs the assignment. Leave empty to use the admin who owns this connection. |

Output fields:

- `id`: Conversation ID
- `title`: Title
- `state`: State
- `open`: Open (boolean)
- `read`: Read (boolean)
- `priority`: Priority
- `created_at`: Created At
- `updated_at`: Updated At
- `waiting_since`: Waiting Since
- `snoozed_until`: Snoozed Until
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `source`: First Message
- `source.type`: Type
- `source.delivered_as`: Delivered As
- `source.subject`: Subject
- `source.body`: Body (html)
- `source.url`: URL (url)
- `source.author`: Author
- `source.author.type`: Type
- `source.author.id`: ID
- `source.author.name`: Name
- `source.author.email`: Email (email)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name
- `conversation_rating`: Rating
- `conversation_rating.rating`: Rating (number)
- `conversation_rating.remark`: Remark
- `conversation_rating.created_at`: Rated At
- `statistics`: Statistics
- `statistics.first_admin_reply_at`: First Admin Reply At
- `statistics.last_close_at`: Last Closed At
- `statistics.count_reopens`: Reopen Count (number)
- `statistics.count_conversation_parts`: Part Count (number)
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `ai_agent_participated`: AI Agent Participated (boolean)

### `tag_or_untag_record`

**Tag or Untag Record.** Adds or removes a tag on a contact, conversation, company or ticket by record ID. Pass a tag ID or a tag name; when adding, a name that does not exist yet is created. Applying a tag that is already there, or removing one that is not applied, succeeds and leaves the same state (already_in_state is true only when the tag does not exist at all), so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target` | string | yes |  | Record Type. One of `"contact"`, `"conversation"`, `"company"`, `"ticket"`. |
| `recordId` | string | yes |  | Record ID. The Intercom ID of the contact, conversation, company (Intercom company ID, not your Company ID) or ticket. |
| `tagId` | string | no |  | Tag ID. The tag ID from List Tags. Give either Tag ID or Tag Name. |
| `tagName` | string | no |  | Tag Name. The tag name (case-insensitive). Give either Tag ID or Tag Name. |
| `remove` | boolean | no | `false` | Remove Tag. Turn on to remove the tag instead of adding it. |

Output fields:

- `target`: Record Type
- `record_id`: Record ID
- `tag`: Tag
- `tag.id`: Tag ID
- `tag.name`: Name
- `removed`: Removed (boolean)
- `already_in_state`: Already In That State (boolean)

### `send_message_to_contact`

**Send Message to Contact.** Sends a new outbound email or in-app message from an admin to one contact (by contact ID or a unique email); it reaches a real person. Use Reply to Conversation (by ID) to answer inside an existing conversation. Each call sends again, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | no |  | Contact ID. The Intercom contact ID. Give either Contact ID or Contact Email. |
| `email` | string | no |  | Contact Email. Used when no Contact ID is given. Fails if several contacts share this email. |
| `messageType` | string | yes | `"email"` | Message Type. One of `"email"`, `"in_app"`. |
| `subject` | string | no |  | Subject. Required for email. |
| `template` | string | no | `"plain"` | Email Template. One of `"plain"`, `"personal"`. |
| `body` | string | yes |  | Message. The message text. Simple HTML is allowed. |
| `adminId` | string | no |  | From Admin ID. The sending admin. Leave empty to send as the admin who owns this connection. |
| `openConversation` | boolean | no | `false` | Open Conversation Right Away. Open a conversation in the inbox without waiting for the contact to reply. |

Output fields:

- `type`: Type
- `id`: Message ID
- `created_at`: Created At
- `subject`: Subject
- `body`: Body (html)
- `message_type`: Message Type
- `template`: Email Template
- `conversation_id`: Conversation ID
- `owner`: Sent By
- `owner.id`: Admin ID
- `owner.name`: Name
- `owner.email`: Email (email)

### `create_ticket_by_type_id`

**Create Ticket (by Type ID).** Creates a ticket of a given ticket type for one contact (by contact ID, email or external ID). An email that matches no contact makes Intercom create a new contact for it, so look the contact up first if that is not wanted. Call List Ticket Types first to get the type ID and its attribute names; list attributes take the option ID, dates take ISO 8601. Each call creates another ticket, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketTypeId` | string | yes |  | Ticket Type ID. From List Ticket Types. |
| `contactLookupBy` | string | yes | `"id"` | Identify Contact By. One of `"id"`, `"email"`, `"external_id"`. |
| `contactValue` | string | yes |  | Contact. The contact ID, email or external ID, matching Identify Contact By. An unknown email creates a new contact. |
| `title` | string | no |  | Title. |
| `description` | string | no |  | Description. |
| `attributes` | object | no |  | Other Attributes. Ticket type attributes by name, for example {"Priority": "<list option ID>", "Due": "2026-10-20T12:00:00Z"}. |
| `companyId` | string | no |  | Company ID. Optional Intercom company ID to link. |

Output fields:

- `id`: Ticket ID
- `ticket_id`: Inbox Ticket Number
- `category`: Category
- `ticket_state`: State
- `ticket_state_internal_label`: State (Internal Label)
- `ticket_state_external_label`: State (Customer Label)
- `open`: Open (boolean)
- `is_shared`: Shared With Customer (boolean)
- `ticket_type`: Ticket Type
- `ticket_type.id`: Ticket Type ID
- `ticket_type.name`: Name
- `ticket_attributes`: Ticket Attributes (an object whose keys vary)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `created_at`: Created At
- `updated_at`: Updated At
- `snoozed_until`: Snoozed Until

### `update_ticket_by_id`

**Update Ticket (by ID).** Changes a ticket's state, open flag, shared flag, assignee, snooze time or attributes by ticket ID (the API id, not the inbox number). Omitted fields stay as they are; an attribute set to null is cleared. Setting the same values again changes nothing, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketId` | string | yes |  | Ticket ID. The ticket "id" from Intercom, not the inbox ticket number. |
| `state` | string | no |  | State. One of `"in_progress"`, `"waiting_on_customer"`, `"resolved"`. |
| `open` | string | no |  | Open or Closed. One of `"open"`, `"closed"`. |
| `isShared` | string | no |  | Visible to Customer. One of `"shared"`, `"not_shared"`. |
| `snoozedUntil` | ISO date-time string | no |  | Snooze Until. |
| `assigneeId` | string | no |  | Assignee Admin ID. Assign the ticket to this admin (see List Admins). Use 0 to unassign. |
| `adminId` | string | no |  | Acting Admin ID. The admin who makes the assignment. Leave empty to use the admin who owns this connection. |
| `attributes` | object | no |  | Attributes. Ticket attributes by name; null clears one. Dates take ISO 8601; list attributes take the option ID. |

Output fields:

- `id`: Ticket ID
- `ticket_id`: Inbox Ticket Number
- `category`: Category
- `ticket_state`: State
- `ticket_state_internal_label`: State (Internal Label)
- `ticket_state_external_label`: State (Customer Label)
- `open`: Open (boolean)
- `is_shared`: Shared With Customer (boolean)
- `ticket_type`: Ticket Type
- `ticket_type.id`: Ticket Type ID
- `ticket_type.name`: Name
- `ticket_attributes`: Ticket Attributes (an object whose keys vary)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `created_at`: Created At
- `updated_at`: Updated At
- `snoozed_until`: Snoozed Until

### `get_contact`

**Get Contact.** Gets one contact (user or lead) by Intercom ID, email or external ID. Fails when no contact matches, or when several contacts share the email (then use Search Contacts). Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookupBy` | string | yes | `"id"` | Look Up By. One of `"id"`, `"email"`, `"external_id"`. |
| `value` | string | yes |  | Value. The contact ID, email or external ID. |

Output fields:

- `id`: Contact ID
- `role`: Role
- `email`: Email (email)
- `name`: Name
- `phone`: Phone
- `external_id`: External ID
- `owner_id`: Owner ID
- `created_at`: Created At
- `updated_at`: Updated At
- `signed_up_at`: Signed Up At
- `last_seen_at`: Last Seen At
- `last_replied_at`: Last Replied At
- `last_contacted_at`: Last Contacted At
- `unsubscribed_from_emails`: Unsubscribed From Emails (boolean)
- `has_hard_bounced`: Has Hard Bounced (boolean)
- `marked_email_as_spam`: Marked Email As Spam (boolean)
- `location`: Location
- `location.country`: Country
- `location.region`: Region
- `location.city`: City
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `tags`: Tags
- `tags.data`: Tag References
- `tags.data[].id`: ID
- `tags.total_count`: Total Count (number)
- `tags.has_more`: Has More (boolean)
- `companies`: Companies
- `companies.data`: Company References
- `companies.data[].id`: ID
- `companies.total_count`: Total Count (number)
- `companies.has_more`: Has More (boolean)

### `search_contacts`

**Search Contacts.** Finds contacts (users and leads) by email, name, tag, segment, update time or a custom attribute, one page at a time. Use to get contact IDs before Get Contact, Update Contact or Send Message to Contact; pass next_starting_after to continue. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email Is. |
| `nameContains` | string | no |  | Name Contains. |
| `role` | string | no |  | Role. One of `"user"`, `"lead"`. |
| `tagId` | string | no |  | Tag ID. From List Tags. |
| `segmentId` | string | no |  | Segment ID. |
| `updatedAfter` | ISO date-time string | no |  | Updated After. Intercom compares dates by calendar day in your workspace time zone. |
| `updatedBefore` | ISO date-time string | no |  | Updated Before. |
| `customAttribute` | string | no |  | Custom Attribute Name. Match contacts whose custom attribute equals Custom Attribute Value. |
| `customValue` | string | no |  | Custom Attribute Value. |
| `advancedQuery` | JSON | no |  | Advanced Query. Optional Intercom search filter, combined with the fields above using AND. |
| `perPage` | number | no |  | Results Per Page. 1 to 150. Default 50. |
| `startingAfter` | string | no |  | Starting After. The next_starting_after value from the previous page. |

Output fields:

- `items`: Contacts
- `items[].id`: Contact ID
- `items[].role`: Role
- `items[].email`: Email (email)
- `items[].name`: Name
- `items[].phone`: Phone
- `items[].external_id`: External ID
- `items[].owner_id`: Owner ID
- `items[].created_at`: Created At
- `items[].updated_at`: Updated At
- `items[].signed_up_at`: Signed Up At
- `items[].last_seen_at`: Last Seen At
- `items[].last_replied_at`: Last Replied At
- `items[].last_contacted_at`: Last Contacted At
- `items[].unsubscribed_from_emails`: Unsubscribed From Emails (boolean)
- `items[].has_hard_bounced`: Has Hard Bounced (boolean)
- `items[].marked_email_as_spam`: Marked Email As Spam (boolean)
- `items[].location`: Location
- `items[].location.country`: Country
- `items[].location.region`: Region
- `items[].location.city`: City
- `items[].custom_attributes`: Custom Attributes (an object whose keys vary)
- `items[].tags`: Tags
- `items[].tags.data`: Tag References
- `items[].tags.data[].id`: ID
- `items[].tags.total_count`: Total Count (number)
- `items[].tags.has_more`: Has More (boolean)
- `items[].companies`: Companies
- `items[].companies.data`: Company References
- `items[].companies.data[].id`: ID
- `items[].companies.total_count`: Total Count (number)
- `items[].companies.has_more`: Has More (boolean)
- `total_count`: Total Matches (number)
- `has_more`: Has More (boolean)
- `next_starting_after`: Next Page Cursor

### `update_contact`

**Update Contact.** Updates one contact by Intercom ID: role, email, name, phone, external ID, owner, email subscription or custom attributes. Omitted fields stay as they are; list a field under Clear Fields to blank it. Setting the same values again changes nothing, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The Intercom contact ID (see Search Contacts or Get Contact). |
| `role` | string | no |  | Role. One of `"user"`, `"lead"`. |
| `email` | string | no |  | Email. |
| `name` | string | no |  | Name. |
| `phone` | string | no |  | Phone. |
| `externalId` | string | no |  | External ID. |
| `ownerId` | string | no |  | Owner Admin ID. |
| `unsubscribed` | string | no |  | Email Subscription. One of `"subscribed"`, `"unsubscribed"`. |
| `customAttributes` | object | no |  | Custom Attributes. Custom attributes by name. Only the ones you list change. |
| `clearFields` | array | no |  | Clear Fields. Fields to blank on the contact. One of `"name"`, `"phone"`, `"external_id"`, `"owner_id"`. |

Output fields:

- `id`: Contact ID
- `role`: Role
- `email`: Email (email)
- `name`: Name
- `phone`: Phone
- `external_id`: External ID
- `owner_id`: Owner ID
- `created_at`: Created At
- `updated_at`: Updated At
- `signed_up_at`: Signed Up At
- `last_seen_at`: Last Seen At
- `last_replied_at`: Last Replied At
- `last_contacted_at`: Last Contacted At
- `unsubscribed_from_emails`: Unsubscribed From Emails (boolean)
- `has_hard_bounced`: Has Hard Bounced (boolean)
- `marked_email_as_spam`: Marked Email As Spam (boolean)
- `location`: Location
- `location.country`: Country
- `location.region`: Region
- `location.city`: City
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `tags`: Tags
- `tags.data`: Tag References
- `tags.data[].id`: ID
- `tags.total_count`: Total Count (number)
- `tags.has_more`: Has More (boolean)
- `companies`: Companies
- `companies.data`: Company References
- `companies.data[].id`: ID
- `companies.total_count`: Total Count (number)
- `companies.has_more`: Has More (boolean)

### `attach_contact_to_company`

**Attach Contact to Company.** Links a contact to a company, both by Intercom ID (use Get Company to turn your own Company ID into the Intercom ID). A contact can belong to several companies; attaching an existing link leaves the same state, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. |
| `companyId` | string | yes |  | Intercom Company ID. The Intercom "id" of the company, not your own Company ID. |

Output fields:

- `id`: Intercom Company ID
- `company_id`: Your Company ID
- `name`: Name
- `plan`: Plan
- `plan.name`: Plan Name
- `size`: Size (number)
- `website`: Website (url)
- `industry`: Industry
- `monthly_spend`: Monthly Spend (number)
- `user_count`: User Count (number)
- `session_count`: Session Count (number)
- `created_at`: Created At
- `updated_at`: Updated At
- `remote_created_at`: Created At (Your System)
- `last_request_at`: Last Request At
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name

### `list_contact_notes`

**List Contact Notes.** Lists the internal notes on one contact, newest first, one page at a time; pass next_page to continue. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. |
| `page` | number | no |  | Page. Starts at 1. |
| `perPage` | number | no |  | Results Per Page. 1 to 150. Default 50. |

Output fields:

- `items`: Notes
- `items[].id`: Note ID
- `items[].body`: Body (html)
- `items[].created_at`: Created At
- `items[].author`: Author
- `items[].author.id`: Admin ID
- `items[].author.name`: Name
- `items[].author.email`: Email (email)
- `items[].contact`: Contact
- `items[].contact.id`: Contact ID
- `total_count`: Total Count (number)
- `has_more`: Has More (boolean)
- `next_page`: Next Page (number)

### `search_conversations`

**Search Conversations.** Finds conversations by state, assigned admin or team, contact, tag, author email, words in the first message or subject, and created/updated dates, one page at a time. Returns conversations without their replies; use Get Conversation (by ID) for the messages. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `state` | string | no |  | State. One of `"open"`, `"closed"`, `"snoozed"`. |
| `adminAssigneeId` | string | no |  | Assigned Admin ID. |
| `teamAssigneeId` | string | no |  | Assigned Team ID. |
| `contactId` | string | no |  | Contact ID. |
| `tagId` | string | no |  | Tag ID. |
| `authorEmail` | string | no |  | Author Email. |
| `bodyContains` | string | no |  | First Message Contains. Intercom matches single words of the first message best. |
| `subjectContains` | string | no |  | Subject Contains. |
| `createdAfter` | ISO date-time string | no |  | Created After. Intercom compares dates by calendar day in your workspace time zone. |
| `createdBefore` | ISO date-time string | no |  | Created Before. |
| `updatedAfter` | ISO date-time string | no |  | Updated After. |
| `updatedBefore` | ISO date-time string | no |  | Updated Before. |
| `advancedQuery` | JSON | no |  | Advanced Query. Optional Intercom search filter, combined with the fields above using AND. |
| `perPage` | number | no |  | Results Per Page. 1 to 150. Default 50. |
| `startingAfter` | string | no |  | Starting After. The next_starting_after value from the previous page. |

Output fields:

- `items`: Conversations
- `items[].id`: Conversation ID
- `items[].title`: Title
- `items[].state`: State
- `items[].open`: Open (boolean)
- `items[].read`: Read (boolean)
- `items[].priority`: Priority
- `items[].created_at`: Created At
- `items[].updated_at`: Updated At
- `items[].waiting_since`: Waiting Since
- `items[].snoozed_until`: Snoozed Until
- `items[].admin_assignee_id`: Assigned Admin ID
- `items[].team_assignee_id`: Assigned Team ID
- `items[].source`: First Message
- `items[].source.type`: Type
- `items[].source.delivered_as`: Delivered As
- `items[].source.subject`: Subject
- `items[].source.body`: Body (html)
- `items[].source.url`: URL (url)
- `items[].source.author`: Author
- `items[].source.author.type`: Type
- `items[].source.author.id`: ID
- `items[].source.author.name`: Name
- `items[].source.author.email`: Email (email)
- `items[].contacts`: Contacts
- `items[].contacts.contacts`: Contacts
- `items[].contacts.contacts[].id`: Contact ID
- `items[].contacts.contacts[].external_id`: External ID
- `items[].tags`: Tags
- `items[].tags.tags`: Tags
- `items[].tags.tags[].id`: Tag ID
- `items[].tags.tags[].name`: Name
- `items[].conversation_rating`: Rating
- `items[].conversation_rating.rating`: Rating (number)
- `items[].conversation_rating.remark`: Remark
- `items[].conversation_rating.created_at`: Rated At
- `items[].statistics`: Statistics
- `items[].statistics.first_admin_reply_at`: First Admin Reply At
- `items[].statistics.last_close_at`: Last Closed At
- `items[].statistics.count_reopens`: Reopen Count (number)
- `items[].statistics.count_conversation_parts`: Part Count (number)
- `items[].custom_attributes`: Custom Attributes (an object whose keys vary)
- `items[].ai_agent_participated`: AI Agent Participated (boolean)
- `total_count`: Total Matches (number)
- `has_more`: Has More (boolean)
- `next_starting_after`: Next Page Cursor

### `set_conversation_state`

**Close, Reopen or Snooze Conversation.** Closes, reopens or snoozes a conversation until a future time, by conversation ID. A closing message, if given, is shown to the customer and is posted again on every call, so the action is not marked idempotent; without one, setting the same state again leaves the same state. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | yes |  | Conversation ID. |
| `state` | string | yes |  | New State. One of `"close"`, `"open"`, `"snoozed"`. |
| `snoozedUntil` | ISO date-time string | no |  | Snooze Until. Required for Snooze; must be in the future. |
| `closingMessage` | string | no |  | Closing Message. Optional, Close only. The customer sees this message. |
| `adminId` | string | no |  | Acting Admin ID. Leave empty to act as the admin who owns this connection. |

Output fields:

- `id`: Conversation ID
- `title`: Title
- `state`: State
- `open`: Open (boolean)
- `read`: Read (boolean)
- `priority`: Priority
- `created_at`: Created At
- `updated_at`: Updated At
- `waiting_since`: Waiting Since
- `snoozed_until`: Snoozed Until
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `source`: First Message
- `source.type`: Type
- `source.delivered_as`: Delivered As
- `source.subject`: Subject
- `source.body`: Body (html)
- `source.url`: URL (url)
- `source.author`: Author
- `source.author.type`: Type
- `source.author.id`: ID
- `source.author.name`: Name
- `source.author.email`: Email (email)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name
- `conversation_rating`: Rating
- `conversation_rating.rating`: Rating (number)
- `conversation_rating.remark`: Remark
- `conversation_rating.created_at`: Rated At
- `statistics`: Statistics
- `statistics.first_admin_reply_at`: First Admin Reply At
- `statistics.last_close_at`: Last Closed At
- `statistics.count_reopens`: Reopen Count (number)
- `statistics.count_conversation_parts`: Part Count (number)
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `ai_agent_participated`: AI Agent Participated (boolean)

### `convert_conversation_to_ticket`

**Convert Conversation to Ticket.** Turns an existing conversation into a ticket of the given ticket type (only Customer-category types), optionally setting ticket attributes. The customer may be notified. Converting is a one-off change, so retries fail or duplicate; it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | yes |  | Conversation ID. |
| `ticketTypeId` | string | yes |  | Ticket Type ID. From List Ticket Types. |
| `attributes` | object | no |  | Ticket Attributes. Optional attributes by name. Dates take ISO 8601; list attributes take the option ID. |

Output fields:

- `id`: Ticket ID
- `ticket_id`: Inbox Ticket Number
- `category`: Category
- `ticket_state`: State
- `ticket_state_internal_label`: State (Internal Label)
- `ticket_state_external_label`: State (Customer Label)
- `open`: Open (boolean)
- `is_shared`: Shared With Customer (boolean)
- `ticket_type`: Ticket Type
- `ticket_type.id`: Ticket Type ID
- `ticket_type.name`: Name
- `ticket_attributes`: Ticket Attributes (an object whose keys vary)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `created_at`: Created At
- `updated_at`: Updated At
- `snoozed_until`: Snoozed Until

### `get_ticket`

**Get Ticket.** Gets one ticket by its API ID (the ticket "id", not the inbox ticket number shown to teammates). Use Search Tickets when you only know the contact, type or title. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketId` | string | yes |  | Ticket ID. The ticket "id" from Intercom, not the inbox ticket number. |

Output fields:

- `id`: Ticket ID
- `ticket_id`: Inbox Ticket Number
- `category`: Category
- `ticket_state`: State
- `ticket_state_internal_label`: State (Internal Label)
- `ticket_state_external_label`: State (Customer Label)
- `open`: Open (boolean)
- `is_shared`: Shared With Customer (boolean)
- `ticket_type`: Ticket Type
- `ticket_type.id`: Ticket Type ID
- `ticket_type.name`: Name
- `ticket_attributes`: Ticket Attributes (an object whose keys vary)
- `contacts`: Contacts
- `contacts.contacts`: Contacts
- `contacts.contacts[].id`: Contact ID
- `contacts.contacts[].external_id`: External ID
- `admin_assignee_id`: Assigned Admin ID
- `team_assignee_id`: Assigned Team ID
- `created_at`: Created At
- `updated_at`: Updated At
- `snoozed_until`: Snoozed Until

### `search_tickets`

**Search Tickets.** Finds tickets by ticket type, state, open flag, contact, assigned admin, words in the title and created/updated dates, one page at a time; pass next_starting_after to continue. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketTypeId` | string | no |  | Ticket Type ID. |
| `state` | string | no |  | State. One of `"submitted"`, `"in_progress"`, `"waiting_on_customer"`, `"resolved"`. |
| `open` | string | no |  | Open or Closed. One of `"open"`, `"closed"`. |
| `contactId` | string | no |  | Contact ID. |
| `adminAssigneeId` | string | no |  | Assigned Admin ID. |
| `titleContains` | string | no |  | Title Contains. |
| `createdAfter` | ISO date-time string | no |  | Created After. Intercom compares dates by calendar day in your workspace time zone. |
| `createdBefore` | ISO date-time string | no |  | Created Before. |
| `updatedAfter` | ISO date-time string | no |  | Updated After. |
| `updatedBefore` | ISO date-time string | no |  | Updated Before. |
| `advancedQuery` | JSON | no |  | Advanced Query. Optional Intercom search filter, combined with the fields above using AND. |
| `perPage` | number | no |  | Results Per Page. 1 to 150. Default 50. |
| `startingAfter` | string | no |  | Starting After. The next_starting_after value from the previous page. |

Output fields:

- `items`: Tickets
- `items[].id`: Ticket ID
- `items[].ticket_id`: Inbox Ticket Number
- `items[].category`: Category
- `items[].ticket_state`: State
- `items[].ticket_state_internal_label`: State (Internal Label)
- `items[].ticket_state_external_label`: State (Customer Label)
- `items[].open`: Open (boolean)
- `items[].is_shared`: Shared With Customer (boolean)
- `items[].ticket_type`: Ticket Type
- `items[].ticket_type.id`: Ticket Type ID
- `items[].ticket_type.name`: Name
- `items[].ticket_attributes`: Ticket Attributes (an object whose keys vary)
- `items[].contacts`: Contacts
- `items[].contacts.contacts`: Contacts
- `items[].contacts.contacts[].id`: Contact ID
- `items[].contacts.contacts[].external_id`: External ID
- `items[].admin_assignee_id`: Assigned Admin ID
- `items[].team_assignee_id`: Assigned Team ID
- `items[].created_at`: Created At
- `items[].updated_at`: Updated At
- `items[].snoozed_until`: Snoozed Until
- `total_count`: Total Matches (number)
- `has_more`: Has More (boolean)
- `next_starting_after`: Next Page Cursor

### `reply_to_ticket`

**Reply to Ticket.** Adds an admin reply (customer-visible on shared Customer tickets) or an internal note to a ticket by ticket ID. Tracker and unshared back-office tickets only accept notes. Each call adds another part, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketId` | string | yes |  | Ticket ID. The ticket "id" from Intercom, not the inbox ticket number. |
| `messageType` | string | yes | `"note"` | Reply Type. One of `"note"`, `"comment"`. |
| `body` | string | yes |  | Text. |
| `adminId` | string | no |  | Admin ID. Leave empty to reply as the admin who owns this connection. |
| `attachmentUrls` | array | no |  | Attachment URLs. Up to 10 public image URLs to attach. |

Output fields:

- `type`: Type
- `id`: Part ID
- `part_type`: Part Type
- `body`: Body (html)
- `created_at`: Created At
- `author`: Author
- `author.type`: Type
- `author.id`: ID
- `author.name`: Name
- `author.email`: Email (email)

### `list_ticket_types`

**List Ticket Types.** Lists the ticket types in the workspace with each attribute (name, data type, required to create) and list option IDs. Call before Create Ticket (by Type ID), Update Ticket (by ID) or Convert Conversation to Ticket. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeArchived` | boolean | no | `false` | Include Archived. |

Output fields:

- `items`: Ticket Types
- `items[].id`: Ticket Type ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].category`: Category
- `items[].archived`: Archived (boolean)
- `items[].attributes`: Attributes
- `items[].attributes[].name`: Name
- `items[].attributes[].data_type`: Data Type
- `items[].attributes[].required_to_create`: Required To Create (boolean)
- `items[].attributes[].visible_to_contacts`: Visible To Contacts (boolean)
- `items[].attributes[].options`: List Options
- `items[].attributes[].options[].id`: Option ID
- `items[].attributes[].options[].label`: Label

### `list_admins`

**List Admins.** Lists the admins (teammates) with ID, name, email, away status and team IDs, plus the ID of the admin who owns this connection. Use to find an admin ID for replies, notes or assignments. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Admins
- `items[].id`: Admin ID
- `items[].name`: Name
- `items[].email`: Email (email)
- `items[].job_title`: Job Title
- `items[].away_mode_enabled`: Away (boolean)
- `items[].has_inbox_seat`: Has Inbox Seat (boolean)
- `items[].team_ids`: Team IDs
- `current_admin_id`: Connected Admin ID

### `list_teams`

**List Teams.** Lists the teams with ID, name and member admin IDs. Use to find a team ID before assigning a conversation to a team. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Teams
- `items[].id`: Team ID
- `items[].name`: Name
- `items[].admin_ids`: Admin IDs

### `list_data_attributes`

**List Data Attributes.** Lists the data attributes (standard and custom) for contacts, companies or conversations, with name, label, data type, options and whether the API can write them. Use to learn custom attribute names before Search Contacts or Update Contact. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | no |  | Object. One of `"contact"`, `"company"`, `"conversation"`. |
| `includeArchived` | boolean | no | `false` | Include Archived. |

Output fields:

- `items`: Data Attributes
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].label`: Label
- `items[].data_type`: Data Type
- `items[].model`: Model
- `items[].custom`: Custom (boolean)
- `items[].api_writable`: Writable Through API (boolean)
- `items[].options`: Options

### `create_tag`

**Create Tag.** Creates a tag with the given name, or returns the existing tag when one already has that name in any letter case (the existing name is left as it is). Calling it again returns the same tag, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Tag Name. |

Output fields:

- `id`: Tag ID
- `name`: Name

### `get_company`

**Get Company.** Gets one company by its Intercom ID or by your own Company ID, and fails with a clear error when none matches. Use Find Company to look up by name without failing. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookupBy` | string | yes | `"id"` | Look Up By. One of `"id"`, `"company_id"`. |
| `value` | string | yes |  | Value. |

Output fields:

- `id`: Intercom Company ID
- `company_id`: Your Company ID
- `name`: Name
- `plan`: Plan
- `plan.name`: Plan Name
- `size`: Size (number)
- `website`: Website (url)
- `industry`: Industry
- `monthly_spend`: Monthly Spend (number)
- `user_count`: User Count (number)
- `session_count`: Session Count (number)
- `created_at`: Created At
- `updated_at`: Updated At
- `remote_created_at`: Created At (Your System)
- `last_request_at`: Last Request At
- `custom_attributes`: Custom Attributes (an object whose keys vary)
- `tags`: Tags
- `tags.tags`: Tags
- `tags.tags[].id`: Tag ID
- `tags.tags[].name`: Name

### `list_companies`

**List Companies.** Lists companies one page at a time, optionally only those with a tag or in a segment; pass next_page to continue. Intercom only lists companies that have at least one contact. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tagId` | string | no |  | Tag ID. |
| `segmentId` | string | no |  | Segment ID. |
| `page` | number | no |  | Page. Starts at 1. |
| `perPage` | number | no |  | Results Per Page. 1 to 150. Default 50. |

Output fields:

- `items`: Companies
- `items[].id`: Intercom Company ID
- `items[].company_id`: Your Company ID
- `items[].name`: Name
- `items[].plan`: Plan
- `items[].plan.name`: Plan Name
- `items[].size`: Size (number)
- `items[].website`: Website (url)
- `items[].industry`: Industry
- `items[].monthly_spend`: Monthly Spend (number)
- `items[].user_count`: User Count (number)
- `items[].session_count`: Session Count (number)
- `items[].created_at`: Created At
- `items[].updated_at`: Updated At
- `items[].remote_created_at`: Created At (Your System)
- `items[].last_request_at`: Last Request At
- `items[].custom_attributes`: Custom Attributes (an object whose keys vary)
- `items[].tags`: Tags
- `items[].tags.tags`: Tags
- `items[].tags.tags[].id`: Tag ID
- `items[].tags.tags[].name`: Name
- `total_count`: Total Count (number)
- `has_more`: Has More (boolean)
- `next_page`: Next Page (number)

### `search_articles`

**Search Help Center Articles.** Searches Help Center articles for a phrase and returns matching articles with title, description, body, URL and state. Use to find an answer to send a customer. Searches published articles unless another state is chosen. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phrase` | string | yes |  | Phrase. |
| `state` | string | no | `"published"` | State. One of `"published"`, `"draft"`, `"all"`. |
| `helpCenterId` | string | no |  | Help Center ID. Only needed when the workspace has several Help Centers. |

Output fields:

- `items`: Articles
- `items[].id`: Article ID
- `items[].title`: Title
- `items[].description`: Description
- `items[].body`: Body (html)
- `items[].url`: URL (url)
- `items[].state`: State
- `items[].updated_at`: Updated At
- `total_count`: Total Matches (number)

### `list_segments`

**List Segments.** Lists every contact segment with ID, name and person type, optionally with the number of contacts in each. Use to find a segment ID before Search Contacts or List Companies. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeCount` | boolean | no | `false` | Include Counts. Also return how many contacts are in each segment. |

Output fields:

- `items`: Segments
- `items[].id`: Segment ID
- `items[].name`: Name
- `items[].person_type`: Person Type
- `items[].count`: Contact Count (number)
- `items[].created_at`: Created At
- `items[].updated_at`: Updated At

### `add_note_to_contact`

**Add Note to Contact (by ID).** Adds an internal note to one contact (user or lead) by Intercom contact ID; only teammates see it. Get the ID from Get Contact or Search Contacts. Use Add Note to Conversation (by ID) to annotate a conversation instead. Each call adds another note, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The Intercom contact ID. |
| `body` | string | yes |  | Note Text. The note text. Simple HTML is allowed. |
| `adminId` | string | no |  | Author Admin ID. The admin shown as the author. Leave empty to use the admin who owns this connection. |

Output fields:

- `id`: Note ID
- `body`: Body (html)
- `created_at`: Created At
- `author`: Author
- `author.id`: Admin ID
- `author.name`: Name
- `author.email`: Email (email)
- `contact`: Contact
- `contact.id`: Contact ID

### `create_conversation_from_contact`

**Create Conversation from Contact.** Starts a new inbox conversation whose first message is authored by the contact (as if they wrote in), by Intercom contact ID. It does not message the contact; use Send Message to Contact for an outbound admin message and Reply to Conversation (by ID) to answer an existing thread. Returns the message with its conversation_id. Each call opens another conversation, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The Intercom contact ID (user or lead). |
| `body` | string | yes |  | Message Body. Plain text; HTML is not supported here. |

Output fields:

- `type`: Type
- `id`: Message ID
- `created_at`: Created At
- `subject`: Subject
- `body`: Body (html)
- `message_type`: Message Type
- `template`: Email Template
- `conversation_id`: Conversation ID
- `owner`: Sent By
- `owner.id`: Admin ID
- `owner.name`: Name
- `owner.email`: Email (email)

### `create_help_center_article`

**Create Help Center Article.** Creates a Help Center article with a title and optional description, HTML body, author admin ID and parent collection ID. It is saved as a draft unless State is published, which makes it public. Use Search Help Center Articles to check for an existing article first. Each call creates another article, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `description` | string | no |  | Description. |
| `body` | string | no |  | Body. The article content. HTML is allowed. |
| `authorId` | string | no |  | Author Admin ID. Leave empty to use the admin who owns this connection. |
| `state` | string | no | `"draft"` | State. One of `"draft"`, `"published"`. |
| `collectionId` | string | no |  | Parent Collection ID. The Help Center collection to put the article in. Leave empty for none. |

Output fields:

- `id`: Article ID
- `title`: Title
- `description`: Description
- `body`: Body (html)
- `author_id`: Author ID
- `state`: State
- `url`: URL (url)
- `parent_id`: Parent Collection ID
- `created_at`: Created At
- `updated_at`: Updated At

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
