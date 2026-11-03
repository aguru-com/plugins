# AskHandle

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-ask-handle'
  version: '0.1.8'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API Key:
>
> 1. Go to https://dashboard.askhandle.com
> 2. Sign in to your account
> 3. Navigate to API settings
> 4. Create or copy your API token
> 5. Paste it here

## Actions

### `create_message`

**Create Message.** Posts a message to a specific AskHandle chat room, identified by its room UUID. Use to send a reply or note into an existing conversation; optionally attach a sender nickname, email, and phone number. Not idempotent — each call appends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `room` | string | yes |  | Room. Select a room. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Message. The message content. |
| `nickname` | string | no |  | Nickname. Sender nickname. |
| `email` | string | no |  | Email. Sender email. |
| `phone_number` | string | no |  | Phone Number. Sender phone number. |

### `create_lead`

**Create Lead.** Creates a new lead record in AskHandle from optional contact and context fields (nickname, email, phone, device, originating page title, referrer). Use to capture a prospect. Not idempotent — each call creates a separate lead, with no de-duplication on email or phone. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `nickname` | string | no |  | Nickname. Lead nickname. |
| `email` | string | no |  | Email. Lead email. |
| `phone_number` | string | no |  | Phone Number. Lead phone number. |
| `device` | string | no |  | Device. Device information. |
| `from_page_title` | string | no |  | From Page Title. Page title where lead originated. |
| `referrer` | string | no |  | Referrer. Referrer URL. |

### `list_rooms`

**List Rooms.** Retrieves all chat rooms in the AskHandle account. Use to discover available rooms or look up a room UUID before sending a message. Takes no input and is a read-only lookup, so it is idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `list_leads`

**List Leads.** Retrieves leads from AskHandle, optionally narrowed by a start date, end date, and a maximum result limit; with no filters set it returns all leads. Use to query captured prospects over a time window. Read-only lookup, so it is idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `start_date` | ISO date-time string | no |  | Start Date. Filter leads from this date. |
| `end_date` | ISO date-time string | no |  | End Date. Filter leads until this date. |
| `limit` | number | no |  | Limit. Maximum number of leads to return. |
