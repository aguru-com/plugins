# Help Scout

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-help-scout'
  version: '0.2.1'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> 1. Click on your profile icon at the top right and select **Your Profile**.
> 2. Go to **My Apps** and click on **Create App**.
> 3. Provide **App Name** and use below redirect URL.
> 4. Copy the **App ID** and **App Secret**, and provide them as the **Client ID** and **Client Secret**, respectively.

## Actions

### `create_conversation`

**Create Conversation.** Creates a new conversation in a Help Scout mailbox with an initial thread, addressed to a customer email. Use to open a support thread (chat, phone, reply, or customer-initiated, set via thread type) rather than replying to an existing one. Requires a mailbox, subject, customer email, status, and body; not idempotent — each call creates a separate conversation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mailboxId` | string | yes |  | Mailbox. A value the product loads from the provider, such as an id; write the value itself. |
| `subject` | string | yes |  | Subject. |
| `customerEmail` | string | yes |  | Customer Email. |
| `fromUser` | string | no |  | From User. A value the product loads from the provider, such as an id; write the value itself. |
| `threadType` | string | yes |  | Thread Type. One of `"chat"`, `"phone"`, `"reply"`, `"customer"`. |
| `status` | string | yes |  | Conversation Status. One of `"active"`, `"closed"`, `"pending"`. |
| `body` | string | yes |  | Body. |
| `assignTo` | string | no |  | Assigned User. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. |
| `cc` | array | no |  | CC. |
| `bcc` | array | no |  | BCC. |
| `imported` | boolean | no |  | Imported. |

### `send_reply`

**Send Reply.** Adds a customer-facing reply thread to an existing Help Scout conversation identified by conversation ID. Use after locating the target conversation to respond to a customer; can optionally be saved as a draft instead of sent. Not idempotent — each call appends a new reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | no |  | Conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Reply Text. |
| `customerEmail` | string | yes |  | Customer Email. |
| `draft` | boolean | no |  | Draft. |
| `status` | string | no |  | Conversation Status. One of `"active"`, `"pending"`, `"closed"`, `"spam"`. |
| `userId` | string | no |  | User (who adds the reply). A value the product loads from the provider, such as an id; write the value itself. |
| `cc` | array | no |  | CC (emails). |
| `bcc` | array | no |  | BCC (emails). |

### `add_note`

**Add Note.** Adds an internal note (not visible to the customer) to an existing Help Scout conversation identified by conversation ID. Use for agent-only annotations rather than a customer-facing reply. Not idempotent — each call appends a new note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | no |  | Conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Note Text. |
| `userId` | string | no |  | User. A value the product loads from the provider, such as an id; write the value itself. |

### `create_customer`

**Create Customer.** Creates a new customer record in Help Scout from an email plus optional profile details (name, phone, organization, social profiles, etc.). Use to register a contact before associating conversations. Email is required and must be valid; not idempotent — each call creates a new customer even if one already exists for that email, so look the customer up first if duplicates matter. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `phone` | string | no |  | Phone. |
| `photoUrl` | string | no |  | Photo URL. |
| `jobTitle` | string | no |  | Job Title. |
| `location` | string | no |  | Location. |
| `background` | string | no |  | Background. |
| `age` | string | no |  | Age. Customer’s age (string, e.g. "30-35") |
| `gender` | string | no |  | Gender. One of `"male"`, `"female"`, `"unknown"`. |
| `organization` | string | no |  | Organization. |
| `socialProfiles` | array | no |  | Social Profile URLs. URLs for social profiles (type will be set to "other") |

### `update_customer_properties`

**Update Customer Properties.** Updates a Help Scout customer's editable property fields (the supplied fields are replaced) for the customer identified by customer ID. Use to modify an existing customer's attributes; only non-empty fields are applied. Repeating the call with the same values is safe and converges to the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Customer Properties. An object whose fields depend on other inputs; the product shows them. |

### `find_conversation`

**Find Conversation.** Searches Help Scout conversations by filters (subject, mailbox, status, assigned user, customer email, tags, or a raw query string) and returns the first match. Use to locate a conversation ID before replying, adding a note, or routing. At least one filter is required; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | no |  | Subject. |
| `mailboxId` | string | no |  | Mailbox. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. One of `"active"`, `"open"`, `"closed"`, `"pending"`, `"spam"`, `"all"`. |
| `assignTo` | string | no |  | Assigned User. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | no |  | Email. |
| `tags` | array | no |  | Tags. |
| `query` | string | no |  | Custom Query. |

### `find_customer`

**Find Customer.** Looks up a Help Scout customer by exact email and returns the first match (with a found flag). Use to resolve a customer ID or check existence before creating a customer or associating a conversation. Email is required; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |

### `find_user`

**Find User.** Looks up a Help Scout user (a teammate/agent, not a customer) by email and returns the first match (with a found flag). Use to resolve a user ID for assignment or reply attribution. Email is required; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |

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
