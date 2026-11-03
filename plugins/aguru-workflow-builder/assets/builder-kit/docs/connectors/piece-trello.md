# Trello

Project management tool for teams

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-trello'
  version: '0.7.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `BASIC_AUTH`: Connection

> To obtain your API key and token, follow these steps:
>
> 1. Go to https://trello.com/power-ups/admin.
> 2. Click **New** to create a new power-up.
> 3. Enter power-up information, and click **Create**.
> 4. From the API Key page, click **Generate a new API key**.
> 5. Copy **API Key** and enter it into the Trello API Key connection.
> 6. On the right side of the page, find the text *"you can manually generate a Token"* and click the **Token** link.**Do not use the Secret field below the API key**.
> 7. Authorize the app and copy the generated token.
> 8. Paste the token into the Trello Token field.

## Actions

### `create_card`

**Create Card.** Creates a new Trello card in a specific list, optionally with a description, position, and labels. Use to add a task or item to a board. Requires the target list_id (and the board_id it belongs to); each call creates a distinct card, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Boards. List of boards. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | Lists. Get lists from a board. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Task Name. The name of the card to create. |
| `description` | string | no |  | Task Description. The description of the card to create. |
| `position` | string | no |  | Position. Place the card on top or bottom of the list. One of `"top"`, `"bottom"`. |
| `labels` | array | no |  | Labels. Assign labels to the card. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Card ID
- `name`: Name
- `desc`: Description
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `closed`: Archived (boolean)
- `due`: Due Date (datetime)
- `dueComplete`: Due Complete (boolean)
- `dateLastActivity`: Last Activity (datetime)
- `idBoard`: Board ID
- `idList`: List ID
- `idMembers`: Member IDs
- `idChecklists`: Checklist IDs
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color

### `get_card`

**Get Card.** Retrieves the full details of a single Trello card by its card ID. Use to look up the current name, description, due date, labels, list, and other fields of a card before acting on it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cardId` | string | yes |  | Card ID. The card ID. |

Output fields:

- `id`: Card ID
- `name`: Name
- `desc`: Description
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `closed`: Archived (boolean)
- `due`: Due Date (datetime)
- `dueComplete`: Due Complete (boolean)
- `dateLastActivity`: Last Activity (datetime)
- `idBoard`: Board ID
- `idList`: List ID
- `idMembers`: Member IDs
- `idChecklists`: Checklist IDs
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color

### `update_card`

**Update Card.** Updates fields on an existing Trello card identified by card_id, including name, description, due date, labels, position, and archived (closed) state, and can move it to a different list. Use to edit, archive, or relocate a card. Requires card_id; only provided fields change. Repeating with the same inputs converges to the same card state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card to update. |
| `name` | string | no |  | Card Name. The new name of the card. |
| `description` | string | no |  | Card Description. The new description of the card. |
| `board_id` | string | no |  | Boards. List of boards. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | no |  | Lists. Get lists from a board. A value the product loads from the provider, such as an id; write the value itself. |
| `position` | string | no |  | Position. Move the card to a new position. One of `"top"`, `"bottom"`. |
| `labels` | array | no |  | Labels. Assign labels to the card. Values the product loads from the provider, such as ids; write an array of them. |
| `closed` | boolean | no |  | Archived. Archive or unarchive the card. |
| `due` | ISO date-time string | no |  | Due Date. Set a due date for the card. |

Output fields:

- `id`: Card ID
- `name`: Name
- `desc`: Description
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `closed`: Archived (boolean)
- `due`: Due Date (datetime)
- `dueComplete`: Due Complete (boolean)
- `dateLastActivity`: Last Activity (datetime)
- `idBoard`: Board ID
- `idList`: List ID
- `idMembers`: Member IDs
- `idChecklists`: Checklist IDs
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color

### `delete_card`

**Delete Card.** Permanently deletes a Trello card by its card_id. Use to remove a card entirely (this is irreversible, unlike archiving via Update Card with closed=true). Requires card_id; deleting the same id again returns an error once it no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card to delete. |

### `get_card_attachments`

**Get All Card Attachments.** Lists all attachments on a Trello card identified by card_id. Use to enumerate the files and links attached to a card, e.g. to find an attachment id before fetching or deleting it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card to get attachments from. |

Output fields:

- `[].id`: Attachment ID
- `[].name`: Name
- `[].url`: URL (url)
- `[].mimeType`: MIME Type
- `[].bytes`: Size (Bytes) (filesize)
- `[].isUpload`: Is Upload (boolean)
- `[].date`: Added At (datetime)

### `add_card_attachment`

**Add Card Attachment.** Adds an attachment to a card. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card to add attachment to. |
| `attachment` | file | yes |  | Attachment File. Files are not supported; an action that needs one fails. |
| `name` | string | no |  | Attachment Name. |
| `mime_type` | string | no |  | MIME Type. |
| `set_cover` | boolean | no |  | Set as Cover. Set this attachment as the card cover. |

Output fields:

- `id`: Attachment ID
- `name`: Name
- `url`: URL (url)
- `mimeType`: MIME Type
- `bytes`: Size (Bytes) (filesize)
- `isUpload`: Is Upload (boolean)
- `date`: Added At (datetime)

### `get_card_attachment`

**Get Card Attachment.** Retrieves the details of one specific attachment on a Trello card, identified by both card_id and attachment_id. Use to inspect a single attachment when you already know its id (e.g. from Get All Card Attachments). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. |
| `attachment_id` | string | yes |  | Attachment ID. The ID of the attachment to retrieve. |

Output fields:

- `id`: Attachment ID
- `name`: Name
- `url`: URL (url)
- `mimeType`: MIME Type
- `bytes`: Size (Bytes) (filesize)
- `isUpload`: Is Upload (boolean)
- `date`: Added At (datetime)

### `delete_card_attachment`

**Delete Card Attachment.** Permanently removes a specific attachment from a Trello card, identified by both card_id and attachment_id. Use to delete a file or link from a card. Requires both ids; deleting the same attachment again returns an error once it no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. |
| `attachment_id` | string | yes |  | Attachment ID. The ID of the attachment to delete. |

### `create_card_ai`

**Create Card (Agent).** Creates a new Trello card in a specific list, optionally with a description, position (top/bottom), and label ids. Requires the target list_id (resolve it via List Lists for a board, which you can find via List Boards). Each call creates a distinct card, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The ID of the list to create the card in. Obtain it from List Lists (which takes a board_id from List Boards). |
| `name` | string | yes |  | Card Name. The name of the card to create. |
| `description` | string | no |  | Card Description. The description of the card to create. |
| `position` | string | no |  | Position. Place the card on top or bottom of the list. One of `"top"`, `"bottom"`. |
| `labels` | array | no |  | Label IDs. Label ids to attach to the card. Obtain them from List Board Labels. |

Output fields:

- `id`: Card ID
- `name`: Name
- `desc`: Description
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `closed`: Archived (boolean)
- `due`: Due Date (datetime)
- `dueComplete`: Due Complete (boolean)
- `dateLastActivity`: Last Activity (datetime)
- `idBoard`: Board ID
- `idList`: List ID
- `idMembers`: Member IDs
- `idChecklists`: Checklist IDs
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color

### `get_card_ai`

**Get Card (Agent).** Retrieves the full details of a single Trello card by its card_id (name, description, due date, labels, list, members, and more). Obtain the card_id from Search Cards, List Cards In List, or List Cards In Board. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards, List Cards In List, or List Cards In Board. |

Output fields:

- `id`: Card ID
- `name`: Name
- `desc`: Description
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `closed`: Archived (boolean)
- `due`: Due Date (datetime)
- `dueComplete`: Due Complete (boolean)
- `dateLastActivity`: Last Activity (datetime)
- `idBoard`: Board ID
- `idList`: List ID
- `idMembers`: Member IDs
- `idChecklists`: Checklist IDs
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color

### `update_card_ai`

**Update Card (Agent).** Updates fields on an existing Trello card identified by card_id: name, description, due date, label ids, position, archived (closed) state, and target list_id (to move it). This is the broad editor; for a single high-intent change prefer Move Card or Archive Card. Obtain card_id from Search Cards and list_id from List Lists. Only provided fields change; repeating with the same inputs converges to the same card state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card to update. Obtain it from Search Cards. |
| `name` | string | no |  | Card Name. The new name of the card. |
| `description` | string | no |  | Card Description. The new description of the card. |
| `list_id` | string | no |  | List ID. Move the card to this list. Obtain the list id from List Lists. |
| `position` | string | no |  | Position. Move the card to a new position. One of `"top"`, `"bottom"`. |
| `labels` | array | no |  | Label IDs. Replace the card label set with these label ids. Obtain them from List Board Labels. |
| `closed` | boolean | no |  | Archived. Archive (true) or unarchive (false) the card. |
| `due` | ISO date-time string | no |  | Due Date. Set a due date for the card. |

Output fields:

- `id`: Card ID
- `name`: Name
- `desc`: Description
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `closed`: Archived (boolean)
- `due`: Due Date (datetime)
- `dueComplete`: Due Complete (boolean)
- `dateLastActivity`: Last Activity (datetime)
- `idBoard`: Board ID
- `idList`: List ID
- `idMembers`: Member IDs
- `idChecklists`: Checklist IDs
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color

### `delete_card_ai`

**Delete Card (Agent).** Permanently deletes a Trello card by its card_id. This is irreversible; prefer Archive Card (recoverable) unless the card must be erased entirely. Obtain card_id from Search Cards. Deleting the same id again returns an error once it no longer exists, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card to delete. Obtain it from Search Cards. |

### `list_card_attachments_ai`

**List Card Attachments (Agent).** Lists all attachments on a Trello card identified by card_id, returning each attachment id, name, and url. Use it to find an attachment id before fetching or deleting it. Obtain card_id from Search Cards. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card to list attachments for. Obtain it from Search Cards. |

Output fields:

- `[].id`: Attachment ID
- `[].name`: Name
- `[].url`: URL (url)
- `[].mimeType`: MIME Type
- `[].bytes`: Size (Bytes) (filesize)
- `[].isUpload`: Is Upload (boolean)
- `[].date`: Added At (datetime)

### `search_cards`

**Search Cards (Agent).** Searches Trello cards by free-text query (name, description, comments) and returns matching cards with their ids. This is the primary way to resolve a card from text before acting on it; results are best-effort/eventually-consistent, so hydrate full fields via Get Card. Optionally narrow to specific boards or a list. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The search text to match against cards. |
| `board_ids` | array | no |  | Board IDs. Restrict the search to these board ids (obtain from List Boards). Leave empty to search all boards you can access. |
| `list_id` | string | no |  | List ID. Restrict the search to a single list id. |
| `limit` | number | no |  | Limit. Maximum number of cards to return (1-1000, default 50). |

Output fields:

- `count`: Count (number)
- `cards`: Cards
- `cards[].id`: Card ID
- `cards[].name`: Name
- `cards[].desc`: Description
- `cards[].url`: URL (url)
- `cards[].shortUrl`: Short URL (url)
- `cards[].closed`: Archived (boolean)
- `cards[].due`: Due Date (datetime)
- `cards[].dueComplete`: Due Complete (boolean)
- `cards[].dateLastActivity`: Last Activity (datetime)
- `cards[].idBoard`: Board ID
- `cards[].idList`: List ID
- `cards[].idMembers`: Member IDs
- `cards[].idChecklists`: Checklist IDs
- `cards[].labels`: Labels
- `cards[].labels[].id`: Label ID
- `cards[].labels[].name`: Name
- `cards[].labels[].color`: Color

### `search_members`

**Search Members (Agent).** Searches Trello members by name or username and returns matches with their member ids. Use it to resolve a person to a member_id before assigning them with Add Member To Card. Optionally restrict to a board or to organization members. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Name or username to search for. |
| `board_id` | string | no |  | Board ID. Restrict the search to members of this board (optional). |
| `only_org_members` | boolean | no |  | Only Organization Members. |
| `limit` | number | no |  | Limit. Maximum number of members to return (1-20, default 8). |

Output fields:

- `count`: Count (number)
- `members`: Members
- `members[].id`: Member ID
- `members[].fullName`: Full Name
- `members[].username`: Username
- `members[].avatarUrl`: Avatar URL (image)
- `members[].initials`: Initials
- `members[].email`: Email (email)
- `members[].active`: Active (boolean)

### `list_cards_in_list`

**List Cards In List (Agent).** Lists the cards in a single Trello list identified by list_id, returning each card id and fields. Use it to enumerate the cards of a column (e.g. "what is in To Do"). Obtain list_id from List Lists. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The ID of the list. Obtain it from List Lists. |
| `filter` | string | no |  | Filter. Which cards to include. One of `"open"`, `"closed"`, `"all"`. |

Output fields:

- `count`: Count (number)
- `cards`: Cards
- `cards[].id`: Card ID
- `cards[].name`: Name
- `cards[].desc`: Description
- `cards[].url`: URL (url)
- `cards[].shortUrl`: Short URL (url)
- `cards[].closed`: Archived (boolean)
- `cards[].due`: Due Date (datetime)
- `cards[].dueComplete`: Due Complete (boolean)
- `cards[].dateLastActivity`: Last Activity (datetime)
- `cards[].idBoard`: Board ID
- `cards[].idList`: List ID
- `cards[].idMembers`: Member IDs
- `cards[].idChecklists`: Checklist IDs
- `cards[].labels`: Labels
- `cards[].labels[].id`: Label ID
- `cards[].labels[].name`: Name
- `cards[].labels[].color`: Color

### `list_cards_in_board`

**List Cards In Board (Agent).** Lists every card on a Trello board identified by board_id, returning each card id and fields. Use it to enumerate all cards across a board. Obtain board_id from List Boards. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The ID of the board. Obtain it from List Boards. |
| `filter` | string | no |  | Filter. Which cards to include. One of `"open"`, `"closed"`, `"all"`, `"visible"`. |

Output fields:

- `count`: Count (number)
- `cards`: Cards
- `cards[].id`: Card ID
- `cards[].name`: Name
- `cards[].desc`: Description
- `cards[].url`: URL (url)
- `cards[].shortUrl`: Short URL (url)
- `cards[].closed`: Archived (boolean)
- `cards[].due`: Due Date (datetime)
- `cards[].dueComplete`: Due Complete (boolean)
- `cards[].dateLastActivity`: Last Activity (datetime)
- `cards[].idBoard`: Board ID
- `cards[].idList`: List ID
- `cards[].idMembers`: Member IDs
- `cards[].idChecklists`: Checklist IDs
- `cards[].labels`: Labels
- `cards[].labels[].id`: Label ID
- `cards[].labels[].name`: Name
- `cards[].labels[].color`: Color

### `add_comment_to_card`

**Add Comment To Card (Agent).** Posts a comment on a Trello card identified by card_id. This is the primary way for an agent to report status or notes on a card. Obtain card_id from Search Cards. Each call adds a new comment, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card to comment on. Obtain it from Search Cards. |
| `text` | string | yes |  | Comment Text. |

Output fields:

- `id`: Comment ID
- `type`: Type
- `date`: Date (datetime)
- `data`: Data
- `data.text`: Text
- `data.card`: Card
- `data.card.id`: Card ID
- `data.card.name`: Name
- `data.dateLastEdited`: Last Edited (datetime)
- `memberCreator`: Member Creator
- `memberCreator.id`: Member ID
- `memberCreator.fullName`: Full Name
- `memberCreator.username`: Username

### `list_card_comments`

**List Card Comments (Agent).** Lists the comments on a Trello card identified by card_id, returning each comment's id (idAction), text, author, and date. Use the returned comment id with Update Comment / Delete Comment. Obtain card_id from Search Cards. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `limit` | number | no |  | Limit. Maximum number of comments to return (1-1000, default 50). |

Output fields:

- `count`: Count (number)
- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].type`: Type
- `comments[].date`: Date (datetime)
- `comments[].data`: Data
- `comments[].data.text`: Text
- `comments[].data.card`: Card
- `comments[].data.card.id`: Card ID
- `comments[].data.card.name`: Name
- `comments[].data.dateLastEdited`: Last Edited (datetime)
- `comments[].memberCreator`: Member Creator
- `comments[].memberCreator.id`: Member ID
- `comments[].memberCreator.fullName`: Full Name
- `comments[].memberCreator.username`: Username

### `update_comment`

**Update Comment (Agent).** Edits the text of an existing comment on a Trello card, identified by card_id and comment_id (the action id). Obtain card_id from Search Cards and comment_id from List Card Comments. Setting the same text again converges to the same comment, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `comment_id` | string | yes |  | Comment ID. The comment (action) id. Obtain it from List Card Comments. |
| `text` | string | yes |  | New Comment Text. |

Output fields:

- `id`: Comment ID
- `type`: Type
- `date`: Date (datetime)
- `data`: Data
- `data.text`: Text
- `data.card`: Card
- `data.card.id`: Card ID
- `data.card.name`: Name
- `data.dateLastEdited`: Last Edited (datetime)
- `memberCreator`: Member Creator
- `memberCreator.id`: Member ID
- `memberCreator.fullName`: Full Name
- `memberCreator.username`: Username

### `delete_comment`

**Delete Comment (Agent).** Deletes a comment on a Trello card, identified by card_id and comment_id (the action id). Obtain card_id from Search Cards and comment_id from List Card Comments. Deleting the same comment again returns an error once it no longer exists, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `comment_id` | string | yes |  | Comment ID. The comment (action) id. Obtain it from List Card Comments. |

### `add_member_to_card`

**Add Member To Card (Agent).** Assigns a member to a Trello card. Obtain card_id from Search Cards and member_id from Search Members or List Board Members. Re-adding an already-assigned member converges to the same member set (Trello returns the full member list rather than a clean no-op), so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `member_id` | string | yes |  | Member ID. The member id to assign. Obtain it from Search Members or List Board Members. |

Output fields:

- `[].id`: Member ID
- `[].fullName`: Full Name
- `[].username`: Username
- `[].avatarUrl`: Avatar URL (image)
- `[].initials`: Initials

### `remove_member_from_card`

**Remove Member From Card (Agent).** Unassigns a member from a Trello card. Obtain card_id from Search Cards and member_id from List Card Members. Removing an already-absent member converges to the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `member_id` | string | yes |  | Member ID. The member id to unassign. Obtain it from List Card Members. |

Output fields:

- `[].id`: Member ID
- `[].fullName`: Full Name
- `[].username`: Username
- `[].avatarUrl`: Avatar URL (image)
- `[].initials`: Initials

### `list_card_members`

**List Card Members (Agent).** Lists the members currently assigned to a Trello card, returning each member id and username. Use it to see who is on a card or to get a member_id for Remove Member From Card. Obtain card_id from Search Cards. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |

Output fields:

- `count`: Count (number)
- `members`: Members
- `members[].id`: Member ID
- `members[].fullName`: Full Name
- `members[].username`: Username
- `members[].avatarUrl`: Avatar URL (image)
- `members[].initials`: Initials

### `create_board_label`

**Create Board Label (Agent).** Creates a reusable label (name + color) on a Trello board. Returns the new label id, which you can then attach to cards with Add Label To Card. Obtain board_id from List Boards. Each call creates a distinct label, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The board to create the label on. Obtain it from List Boards. |
| `name` | string | no |  | Label Name. |
| `color` | string | no |  | Color. Label color (e.g. green, yellow, orange, red, purple, blue, sky, lime, pink, black) or leave empty for no color. |

Output fields:

- `id`: Label ID
- `name`: Name
- `color`: Color
- `idBoard`: Board ID
- `uses`: Uses (number)

### `add_label_to_card`

**Add Label To Card (Agent).** Attaches an existing board label to a Trello card. Obtain card_id from Search Cards and label_id from List Board Labels (or Create Board Label). Re-attaching an already-present label converges to the same label set, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `label_id` | string | yes |  | Label ID. The label id to attach. Obtain it from List Board Labels or Create Board Label. |

### `remove_label_from_card`

**Remove Label From Card (Agent).** Detaches a label from a Trello card. Obtain card_id from Search Cards and label_id from Get Card or List Board Labels. Removing an already-absent label converges to the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `label_id` | string | yes |  | Label ID. The label id to detach. Obtain it from Get Card or List Board Labels. |

### `list_board_labels`

**List Board Labels (Agent).** Lists the labels defined on a Trello board, returning each label id, name, and color. Use it to resolve a label_id for Add Label To Card / Remove Label From Card. Obtain board_id from List Boards. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The ID of the board. Obtain it from List Boards. |
| `limit` | number | no |  | Limit. Maximum number of labels to return (1-1000, default 50). |

Output fields:

- `count`: Count (number)
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].idBoard`: Board ID
- `labels[].uses`: Uses (number)

### `update_label`

**Update Label (Agent).** Renames or recolors an existing Trello label identified by label_id. Obtain label_id from List Board Labels. Only provided fields change; setting the same values again converges to the same label, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label_id` | string | yes |  | Label ID. The ID of the label. Obtain it from List Board Labels. |
| `name` | string | no |  | New Name. |
| `color` | string | no |  | New Color. New label color (e.g. green, yellow, orange, red, purple, blue, sky, lime, pink, black). |

Output fields:

- `id`: Label ID
- `name`: Name
- `color`: Color
- `idBoard`: Board ID
- `uses`: Uses (number)

### `move_card`

**Move Card (Agent).** Moves a Trello card to a different list (the high-intent single-purpose alternative to Update Card). Obtain card_id from Search Cards and the destination list_id from List Lists. Moving to the list it is already in converges to the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card to move. Obtain it from Search Cards. |
| `list_id` | string | yes |  | Destination List ID. The list to move the card into. Obtain it from List Lists. |

Output fields:

- `id`: Card ID
- `name`: Name
- `desc`: Description
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `closed`: Archived (boolean)
- `due`: Due Date (datetime)
- `dueComplete`: Due Complete (boolean)
- `dateLastActivity`: Last Activity (datetime)
- `idBoard`: Board ID
- `idList`: List ID
- `idMembers`: Member IDs
- `idChecklists`: Checklist IDs
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color

### `archive_card`

**Archive Card (Agent).** Archives (closed=true) or unarchives (closed=false) a Trello card. Archiving is recoverable, so prefer this over Delete Card. Obtain card_id from Search Cards. Setting the same closed state again converges, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `archived` | boolean | no | `true` | Archived. True to archive the card, false to unarchive it. |

Output fields:

- `id`: Card ID
- `name`: Name
- `desc`: Description
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `closed`: Archived (boolean)
- `due`: Due Date (datetime)
- `dueComplete`: Due Complete (boolean)
- `dateLastActivity`: Last Activity (datetime)
- `idBoard`: Board ID
- `idList`: List ID
- `idMembers`: Member IDs
- `idChecklists`: Checklist IDs
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color

### `create_list`

**Create List (Agent).** Creates a new list (column) on a Trello board. Returns the new list id for use with card actions. Obtain board_id from List Boards. Each call creates a distinct list, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The board to create the list on. Obtain it from List Boards. |
| `name` | string | yes |  | List Name. |
| `position` | string | no |  | Position. One of `"top"`, `"bottom"`. |

Output fields:

- `id`: List ID
- `name`: Name
- `closed`: Archived (boolean)
- `color`: Color
- `idBoard`: Board ID
- `pos`: Position (number)

### `list_lists`

**List Lists (Agent).** Lists the lists (columns) on a Trello board, returning each list id and name. This is the key resolver for turning a column name into a list_id used by Create Card, Move Card, and other list actions. Obtain board_id from List Boards. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The ID of the board. Obtain it from List Boards. |
| `filter` | string | no |  | Filter. Which lists to include. One of `"open"`, `"closed"`, `"all"`. |

Output fields:

- `count`: Count (number)
- `lists`: Lists
- `lists[].id`: List ID
- `lists[].name`: Name
- `lists[].closed`: Archived (boolean)
- `lists[].color`: Color
- `lists[].idBoard`: Board ID
- `lists[].pos`: Position (number)

### `get_list`

**Get List (Agent).** Retrieves the details of a single Trello list by its list_id (name, board, open/closed state). Obtain list_id from List Lists. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The ID of the list. Obtain it from List Lists. |

Output fields:

- `id`: List ID
- `name`: Name
- `closed`: Archived (boolean)
- `color`: Color
- `idBoard`: Board ID
- `pos`: Position (number)

### `rename_list`

**Rename List (Agent).** Renames a Trello list identified by list_id. Obtain list_id from List Lists. Setting the same name again converges to the same list, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The ID of the list. Obtain it from List Lists. |
| `name` | string | yes |  | New Name. |

Output fields:

- `id`: List ID
- `name`: Name
- `closed`: Archived (boolean)
- `color`: Color
- `idBoard`: Board ID
- `pos`: Position (number)

### `archive_list`

**Archive List (Agent).** Archives (closed=true) or unarchives (closed=false) a Trello list identified by list_id. Obtain list_id from List Lists. Setting the same closed state again converges, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The ID of the list. Obtain it from List Lists. |
| `archived` | boolean | no | `true` | Archived. True to archive the list, false to unarchive it. |

Output fields:

- `id`: List ID
- `name`: Name
- `closed`: Archived (boolean)
- `color`: Color
- `idBoard`: Board ID
- `pos`: Position (number)

### `move_all_cards_in_list`

**Move All Cards In List (Agent).** Moves every card from a source list to a destination list (e.g. clear a "Done" column into an "Archive" list). Obtain board_id from List Boards and both list ids from List Lists; the destination list must be on the given board. This is a bulk mutation, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Source List ID. The list to move all cards from. Obtain it from List Lists. |
| `board_id` | string | yes |  | Destination Board ID. The board the destination list belongs to. Obtain it from List Boards. |
| `destination_list_id` | string | yes |  | Destination List ID. The list to move all cards into. Obtain it from List Lists. |

### `archive_all_cards_in_list`

**Archive All Cards In List (Agent).** Archives every card in a Trello list identified by list_id (recoverable bulk archive). Obtain list_id from List Lists. This is a bulk mutation, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The ID of the list. Obtain it from List Lists. |

### `create_board`

**Create Board (Agent).** Creates a new Trello board with a name and optional description, optionally inside a workspace (organization). Returns the new board id. Obtain org_id (if used) from List Boards / Get My Member. Each call creates a distinct board, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Board Name. |
| `description` | string | no |  | Description. |
| `org_id` | string | no |  | Organization ID. The workspace (organization) id to create the board in (optional). |

Output fields:

- `id`: Board ID
- `name`: Name
- `desc`: Description
- `closed`: Archived (boolean)
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `idOrganization`: Organization ID
- `prefs`: Preferences
- `prefs.permissionLevel`: Permission Level
- `prefs.background`: Background Color

### `get_board`

**Get Board (Agent).** Retrieves the details of a single Trello board by its board_id (name, description, url, prefs). Obtain board_id from List Boards. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The ID of the board. Obtain it from List Boards. |

Output fields:

- `id`: Board ID
- `name`: Name
- `desc`: Description
- `closed`: Archived (boolean)
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `idOrganization`: Organization ID
- `prefs`: Preferences
- `prefs.permissionLevel`: Permission Level
- `prefs.background`: Background Color

### `list_boards`

**List Boards (Agent).** Lists the Trello boards the connected user can access, returning each board id and name. This is the top-level resolver: start here to get a board_id, then use List Lists / List Board Labels / List Board Members to drill down. Defaults to the connected user (member "me"). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `member_id` | string | no |  | Member ID. Whose boards to list. Defaults to the connected user ("me"). Obtain another member id from Search Members. |
| `filter` | string | no |  | Filter. Which boards to include. One of `"open"`, `"closed"`, `"all"`. |

Output fields:

- `count`: Count (number)
- `boards`: Boards
- `boards[].id`: Board ID
- `boards[].name`: Name
- `boards[].desc`: Description
- `boards[].closed`: Archived (boolean)
- `boards[].url`: URL (url)
- `boards[].shortUrl`: Short URL (url)
- `boards[].idOrganization`: Organization ID
- `boards[].prefs`: Preferences
- `boards[].prefs.permissionLevel`: Permission Level
- `boards[].prefs.background`: Background Color

### `update_board`

**Update Board (Agent).** Updates the name and/or description of a Trello board identified by board_id. Obtain board_id from List Boards. Only provided fields change; setting the same values again converges to the same board, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The ID of the board. Obtain it from List Boards. |
| `name` | string | no |  | New Name. |
| `description` | string | no |  | New Description. |

Output fields:

- `id`: Board ID
- `name`: Name
- `desc`: Description
- `closed`: Archived (boolean)
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `idOrganization`: Organization ID
- `prefs`: Preferences
- `prefs.permissionLevel`: Permission Level
- `prefs.background`: Background Color

### `archive_board`

**Archive Board (Agent).** Closes (archives, closed=true) or reopens (closed=false) a Trello board identified by board_id. Archiving is recoverable; prefer this over permanently deleting a board. Obtain board_id from List Boards. Setting the same closed state again converges, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The ID of the board. Obtain it from List Boards. |
| `closed` | boolean | no | `true` | Closed. True to close (archive) the board, false to reopen it. |

Output fields:

- `id`: Board ID
- `name`: Name
- `desc`: Description
- `closed`: Archived (boolean)
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `idOrganization`: Organization ID
- `prefs`: Preferences
- `prefs.permissionLevel`: Permission Level
- `prefs.background`: Background Color

### `list_board_members`

**List Board Members (Agent).** Lists the members of a Trello board, returning each member id, username, and full name. Use it to resolve a member_id for card assignment (Add Member To Card) or board removal. Obtain board_id from List Boards. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The ID of the board. Obtain it from List Boards. |

Output fields:

- `count`: Count (number)
- `members`: Members
- `members[].id`: Member ID
- `members[].fullName`: Full Name
- `members[].username`: Username

### `add_checklist_to_card`

**Add Checklist To Card (Agent).** Creates a checklist on a Trello card and returns its idChecklist, which you then pass to Add Checklist Item and Set Checklist Item State. Obtain card_id from Search Cards. Each call creates a distinct checklist, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `name` | string | no |  | Checklist Name. |

Output fields:

- `id`: Checklist ID
- `name`: Name
- `idBoard`: Board ID
- `idCard`: Card ID
- `checkItems`: Check Items
- `checkItems[].id`: Check Item ID
- `checkItems[].name`: Name
- `checkItems[].state`: State
- `checkItems[].due`: Due Date (datetime)
- `checkItems[].idMember`: Member ID
- `checkItems[].idChecklist`: Checklist ID

### `list_card_checklists`

**List Card Checklists (Agent).** Lists the checklists on a Trello card, each with its idChecklist and its check items (idCheckItem, name, state). This is the source for the ids needed by Set Checklist Item State, Add Checklist Item, Delete Checklist, and Delete Checklist Item. Obtain card_id from Search Cards. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |

Output fields:

- `count`: Count (number)
- `checklists`: Checklists
- `checklists[].id`: Checklist ID
- `checklists[].name`: Name
- `checklists[].idBoard`: Board ID
- `checklists[].idCard`: Card ID
- `checklists[].checkItems`: Check Items
- `checklists[].checkItems[].id`: Check Item ID
- `checklists[].checkItems[].name`: Name
- `checklists[].checkItems[].state`: State
- `checklists[].checkItems[].due`: Due Date (datetime)
- `checklists[].checkItems[].idMember`: Member ID
- `checklists[].checkItems[].idChecklist`: Checklist ID

### `delete_checklist`

**Delete Checklist (Agent).** Deletes an entire checklist (and all of its items) identified by checklist_id. Obtain checklist_id (idChecklist) from List Card Checklists. Deleting the same checklist again returns an error once it no longer exists, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checklist_id` | string | yes |  | Checklist ID. The checklist id (idChecklist). Obtain it from List Card Checklists. |

### `set_checklist_item_state`

**Set Checklist Item State (Agent).** Marks a checklist item complete or incomplete. This needs three ids that all come from List Card Checklists for the card: card_id, checklist_id (idChecklist), and checkitem_id (idCheckItem). Setting the same state again converges, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `checklist_id` | string | yes |  | Checklist ID. The checklist id (idChecklist). Obtain it from List Card Checklists. |
| `checkitem_id` | string | yes |  | Check Item ID. The check item id (idCheckItem). Obtain it from List Card Checklists. |
| `state` | string | yes |  | State. One of `"complete"`, `"incomplete"`. |

Output fields:

- `id`: Check Item ID
- `name`: Name
- `state`: State
- `due`: Due Date (datetime)
- `idMember`: Member ID
- `idChecklist`: Checklist ID

### `delete_checklist_item`

**Delete Checklist Item (Agent).** Removes a single check item from a checklist. Both ids come from List Card Checklists: checklist_id (idChecklist) and checkitem_id (idCheckItem). Deleting the same item again returns an error once it no longer exists, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checklist_id` | string | yes |  | Checklist ID. The checklist id (idChecklist). Obtain it from List Card Checklists. |
| `checkitem_id` | string | yes |  | Check Item ID. The check item id (idCheckItem). Obtain it from List Card Checklists. |

### `add_checklist_item`

**Add Checklist Item (Agent).** Adds a check item to an existing Trello checklist. Obtain checklist_id (idChecklist) from List Card Checklists (or the output of Add Checklist To Card). Each call adds a distinct item, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checklist_id` | string | yes |  | Checklist ID. The checklist id (idChecklist). Obtain it from List Card Checklists or Add Checklist To Card. |
| `name` | string | yes |  | Item Name. |
| `checked` | boolean | no |  | Checked. Create the item already marked complete. |

Output fields:

- `id`: Check Item ID
- `name`: Name
- `state`: State
- `due`: Due Date (datetime)
- `idMember`: Member ID
- `idChecklist`: Checklist ID

### `get_my_member`

**Get My Member (Agent).** Returns the connected Trello user (id, username, full name). Use it to resolve "me" — your own member id — for assigning yourself to cards or as the member filter in List Boards. Takes no inputs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: Member ID
- `username`: Username
- `fullName`: Full Name
- `email`: Email (email)
- `url`: URL (url)
- `avatarUrl`: Avatar URL (image)

### `get_member`

**Get Member (Agent).** Retrieves a Trello member profile by member id or username. Obtain a member id from Search Members or List Board Members. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `member_id` | string | yes |  | Member ID or Username. The member id or username. Obtain it from Search Members or List Board Members. |

Output fields:

- `id`: Member ID
- `username`: Username
- `fullName`: Full Name
- `email`: Email (email)
- `url`: URL (url)
- `avatarUrl`: Avatar URL (image)

### `list_organization_boards`

**List Organization Boards (Agent).** Lists the boards in a Trello workspace (organization), returning each board id and name. Use it when you have an org_id and want only that workspace's boards; for all boards you can access, use List Boards instead. Obtain org_id from Get My Member or List Boards. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `org_id` | string | yes |  | Organization ID. The workspace (organization) id. Obtain it from Get My Member or a board's details. |

Output fields:

- `count`: Count (number)
- `boards`: Boards
- `boards[].id`: Board ID
- `boards[].name`: Name
- `boards[].desc`: Description
- `boards[].closed`: Archived (boolean)
- `boards[].url`: URL (url)
- `boards[].shortUrl`: Short URL (url)
- `boards[].idOrganization`: Organization ID
- `boards[].prefs`: Preferences
- `boards[].prefs.permissionLevel`: Permission Level
- `boards[].prefs.background`: Background Color

### `add_reaction_to_comment`

**Add Reaction To Comment (Agent).** Adds an emoji reaction to a comment action on a Trello card. Provide the comment id (action_id) from List Card Comments and identify the emoji by its shortName (e.g. "thumbsup"). Each call adds a reaction, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `action_id` | string | yes |  | Comment ID. The comment (action) id to react to. Obtain it from List Card Comments. |
| `short_name` | string | yes |  | Emoji Short Name. The emoji short name, e.g. "thumbsup", "heart", "tada". |

Output fields:

- `id`: Reaction ID
- `idMember`: Member ID
- `idModel`: Comment ID
- `member`: Member
- `member.id`: Member ID
- `member.fullName`: Full Name
- `member.username`: Username
- `emoji`: Emoji
- `emoji.shortName`: Short Name
- `emoji.native`: Native
- `emoji.name`: Name

### `list_board_custom_fields`

**List Board Custom Fields (Agent).** Lists the custom fields defined on a board, returning each field id, name and type. Use it to resolve a custom_field_id before reading or writing a card value with List Card Custom Field Values or Set Card Custom Field Value. Custom fields need the Custom Fields Power-Up enabled on the board; obtain board_id from List Boards. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The ID of the board. Obtain it from List Boards. |

Output fields:

- `custom_fields`: Custom Fields
- `custom_fields[].id`: Custom Field ID
- `custom_fields[].name`: Name
- `custom_fields[].type`: Type
- `custom_fields[].idModel`: Board ID
- `custom_fields[].modelType`: Model Type
- `custom_fields[].fieldGroup`: Field Group
- `custom_fields[].display`: Display
- `custom_fields[].display.cardFront`: Show on Card Front (boolean)
- `custom_fields[].pos`: Position (number)
- `custom_fields[].options`: Options
- `custom_fields[].options[].id`: Option ID
- `custom_fields[].options[].idCustomField`: Custom Field ID
- `custom_fields[].options[].value`: Value
- `custom_fields[].options[].value.text`: Text
- `custom_fields[].options[].color`: Color
- `custom_fields[].options[].pos`: Position (number)
- `count`: Count (number)

### `get_custom_field`

**Get Custom Field (Agent).** Reads a single custom field definition, returning its name, type and the board it belongs to. Use it to confirm a field type before writing a value, since Set Card Custom Field Value needs a different body per type. Use List Board Custom Fields when only the board is known. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_field_id` | string | yes |  | Custom Field ID. The ID of the custom field. Obtain it from List Board Custom Fields. |

Output fields:

- `id`: Custom Field ID
- `name`: Name
- `type`: Type
- `idModel`: Board ID
- `modelType`: Model Type
- `fieldGroup`: Field Group
- `display`: Display
- `display.cardFront`: Show on Card Front (boolean)
- `pos`: Position (number)
- `options`: Options
- `options[].id`: Option ID
- `options[].idCustomField`: Custom Field ID
- `options[].value`: Value
- `options[].value.text`: Text
- `options[].color`: Color
- `options[].pos`: Position (number)

### `list_custom_field_options`

**List Custom Field Options (Agent).** Lists the selectable options of a dropdown (list) custom field, returning each option id and its text. Use it to resolve the option id that Set Card Custom Field Value requires, because a dropdown field is written by option id rather than by text. Only dropdown fields have options; other field types return an empty list. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_field_id` | string | yes |  | Custom Field ID. The ID of a dropdown custom field. Obtain it from List Board Custom Fields. |

Output fields:

- `options`: Options
- `options[].id`: Option ID
- `options[].idCustomField`: Custom Field ID
- `options[].value`: Value
- `options[].value.text`: Text
- `options[].color`: Color
- `options[].pos`: Position (number)
- `count`: Count (number)

### `list_card_custom_field_values`

**List Card Custom Field Values (Agent).** Reads the custom field values set on one card, returning each custom_field_id with its value. Get Card does not include custom fields, so this is the only way to read them. Only fields that have a value on the card come back, so a field missing from the result is unset rather than empty, and dropdown fields return an option id that List Custom Field Options resolves to text. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |

Output fields:

- `custom_field_values`: Custom Field Values
- `custom_field_values[].id`: Item ID
- `custom_field_values[].idCustomField`: Custom Field ID
- `custom_field_values[].idModel`: Card ID
- `custom_field_values[].modelType`: Model Type
- `custom_field_values[].idValue`: Selected Option ID
- `custom_field_values[].value`: Value
- `custom_field_values[].value.text`: Text
- `custom_field_values[].value.number`: Number
- `custom_field_values[].value.date`: Date (datetime)
- `custom_field_values[].value.checked`: Checked
- `count`: Count (number)

### `set_card_custom_field_value`

**Set Card Custom Field Value (Agent).** Sets one custom field value on one card. The Field Type must match the field definition from List Board Custom Fields, because Trello rejects a value written in the wrong shape: text, number and date take the value directly, checkbox takes true or false, and a dropdown takes an option id from List Custom Field Options rather than the option text. Writing the same value again produces the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `custom_field_id` | string | yes |  | Custom Field ID. The ID of the custom field. Obtain it from List Board Custom Fields. |
| `field_type` | string | yes |  | Field Type. Must match the type of the custom field being written, as reported by List Board Custom Fields. One of `"text"`, `"number"`, `"date"`, `"checkbox"`, `"list"`. |
| `value` | string | yes |  | Value. Text for a text field, digits for a number, an ISO 8601 timestamp such as 2026-03-13T16:00:00.000Z for a date, true or false for a checkbox, or an option id from List Custom Field Options for a dropdown. |

Output fields:

- `id`: Item ID
- `idCustomField`: Custom Field ID
- `idModel`: Card ID
- `modelType`: Model Type
- `idValue`: Selected Option ID
- `value`: Value
- `value.text`: Text
- `value.number`: Number
- `value.date`: Date (datetime)
- `value.checked`: Checked

### `create_board_custom_field`

**Create Board Custom Field (Agent).** Defines a new custom field on a board and returns its id. Use it when a board lacks a field the workflow needs; check List Board Custom Fields first, because Trello allows two fields with the same name and each call creates another one. A dropdown field is created empty, so follow up with Create Custom Field Option for each choice before any card can be given a value. Requires the Custom Fields Power-Up on the board; not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The ID of the board. Obtain it from List Boards. |
| `name` | string | yes |  | Name. The name of the custom field. |
| `type` | string | yes |  | Type. The kind of value the field holds. It cannot be changed later. One of `"text"`, `"number"`, `"date"`, `"checkbox"`, `"list"`. |
| `display_on_card` | boolean | no | `false` | Show on Card Front. Display the field on the front of the card. |

Output fields:

- `id`: Custom Field ID
- `name`: Name
- `type`: Type
- `idModel`: Board ID
- `modelType`: Model Type
- `fieldGroup`: Field Group
- `display`: Display
- `display.cardFront`: Show on Card Front (boolean)
- `pos`: Position (number)
- `options`: Options
- `options[].id`: Option ID
- `options[].idCustomField`: Custom Field ID
- `options[].value`: Value
- `options[].value.text`: Text
- `options[].color`: Color
- `options[].pos`: Position (number)

### `create_custom_field_option`

**Create Custom Field Option (Agent).** Adds one selectable option to a dropdown custom field and returns the new option id. A dropdown field created by Create Board Custom Field starts with no options and no card can be given a value until options exist, so call this once per choice. Only dropdown fields accept options. Each call adds another option even if the text repeats, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_field_id` | string | yes |  | Custom Field ID. The ID of a dropdown custom field. Obtain it from List Board Custom Fields. |
| `value` | string | yes |  | Option Text. The text shown for this option. |

Output fields:

- `id`: Option ID
- `idCustomField`: Custom Field ID
- `value`: Value
- `value.text`: Text
- `color`: Color
- `pos`: Position (number)

### `delete_custom_field`

**Delete Custom Field (Agent).** Permanently deletes a custom field definition from its board, discarding the value every card held in that field. This cannot be undone and affects all cards on the board at once, so confirm the field with Get Custom Field first. Deleting an already-deleted field errors rather than succeeding, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_field_id` | string | yes |  | Custom Field ID. The ID of the custom field to delete. Obtain it from List Board Custom Fields. |

Output fields:

- `success`: Success (boolean)
- `custom_field_id`: Custom Field ID

### `copy_card`

**Copy Card (Agent).** Copies an existing card into a list, optionally carrying over parts of the original such as its checklists, attachments, comments, custom fields, labels, members or dates. Only the parts listed in Keep From Source are carried over, so leaving it empty produces a bare copy. Use it to instantiate a template card; use Create Card when there is nothing to copy from. Both the source card id and the destination list id are required, and each call produces another copy, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_card_id` | string | yes |  | Source Card ID. The ID of the card to copy. Obtain it from Search Cards. |
| `list_id` | string | yes |  | Destination List ID. The ID of the list the copy is created in. Obtain it from List Lists. |
| `name` | string | no |  | Name. Name for the copy. Defaults to the source card name. |
| `keep_from_source` | array | no |  | Keep From Source. Which parts of the original to carry over. Leave empty to copy the card without any of them. One of `"attachments"`, `"checklists"`, `"comments"`, `"customFields"`, `"due"`, `"labels"`, `"members"`, `"start"`, `"stickers"`. |
| `position` | string | no |  | Position. Where the copy lands in the destination list. One of `"top"`, `"bottom"`. |

Output fields:

- `id`: Card ID
- `name`: Name
- `desc`: Description
- `url`: URL (url)
- `shortUrl`: Short URL (url)
- `closed`: Archived (boolean)
- `due`: Due Date (datetime)
- `dueComplete`: Due Complete (boolean)
- `dateLastActivity`: Last Activity (datetime)
- `idBoard`: Board ID
- `idList`: List ID
- `idMembers`: Member IDs
- `idChecklists`: Checklist IDs
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].color`: Color

### `list_card_activity`

**List Card Activity (Agent).** Reads the activity history of a card: when it was created, moved between lists, and who changed it. Use it to answer questions about how a card got to its current state; use List Card Comments for the discussion on a card, which this action leaves out by default. Results are newest first and paginated 50 at a time, so pass an increasing Page to reach older entries. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `filter` | string | no | `"updateCard"` | Activity Type. Which kind of activity to return. Defaults to card updates such as moves between lists. One of `"updateCard"`, `"createCard"`, `"commentCard"`, `"all"`. |
| `page` | number | no |  | Page. Zero-based page of 50 entries, up to 19. Omit for the most recent page. |

Output fields:

- `activity`: Activity
- `activity[].id`: Action ID
- `activity[].type`: Type
- `activity[].date`: Date (datetime)
- `activity[].idMemberCreator`: Member ID
- `activity[].memberCreator`: Member
- `activity[].memberCreator.id`: Member ID
- `activity[].memberCreator.fullName`: Full Name
- `activity[].memberCreator.username`: Username
- `activity[].data`: Data (an object whose keys vary)
- `count`: Count on This Page (number)

### `vote_on_card`

**Vote On Card (Agent).** Records a vote on a card on behalf of a board member, whose id comes from Get My Member for the connected user or Search Members for someone else. Voting requires the Voting Power-Up to be enabled on the board, and the member must belong to the board. Voting again as the same member fails rather than doubling the vote, so treat it as not idempotent and use List Card Votes to check first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `member_id` | string | yes |  | Member ID. The ID of the member casting the vote. Obtain it from Get My Member or Search Members. |

### `remove_card_vote`

**Remove Card Vote (Agent).** Removes one member's vote from a card. Use it to undo a vote cast by Vote On Card; check List Card Votes first to confirm the member actually voted, because removing a vote that was never cast returns an error rather than succeeding. Requires the Voting Power-Up on the board. Not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `member_id` | string | yes |  | Member ID. The ID of the member whose vote is removed. Obtain it from List Card Votes. |

Output fields:

- `success`: Success (boolean)
- `card_id`: Card ID
- `member_id`: Member ID

### `list_card_votes`

**List Card Votes (Agent).** Lists the members who have voted on a card, returning each member id and username, with the count as the vote tally. Use it to rank cards by support, or to check whether a member has already voted before calling Vote On Card or Remove Card Vote. Requires the Voting Power-Up on the board. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |

Output fields:

- `voters`: Voters
- `voters[].id`: Member ID
- `voters[].fullName`: Full Name
- `voters[].username`: Username
- `count`: Vote Count (number)

### `delete_board`

**Delete Board (Agent).** Permanently deletes a board together with every list, card, comment and attachment on it. This is irreversible: Trello offers no way to restore a deleted board, and the data is gone for every member of the board, not just the connected user. Prefer Archive Board, which hides the board and can be undone, and only use this when permanent destruction is explicitly intended. Confirm the board with Get Board first, since a board id that belongs to the wrong board destroys the wrong data. Deleting an already-deleted board errors rather than succeeding, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The ID of the board to permanently delete. Obtain it from List Boards and confirm it with Get Board first. |

Output fields:

- `success`: Success (boolean)
- `board_id`: Board ID

### `delete_label`

**Delete Label (Agent).** Permanently deletes a label from its board, which also strips it from every card that carried it. This affects the whole board rather than one card, so use Remove Label From Card when the intent is to untag a single card. Resolve the label_id with List Board Labels first; deleting an already-deleted label errors rather than succeeding, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label_id` | string | yes |  | Label ID. The ID of the label to delete. Obtain it from List Board Labels. |

Output fields:

- `success`: Success (boolean)
- `label_id`: Label ID

### `move_list_to_board`

**Move List To Board (Agent).** Moves an entire list, and every card on it, to a different board. Use it to reorganise across boards; use Move All Cards In List to move the cards while leaving the list where it is, and Move Card for a single card. Labels and members that do not exist on the destination board may be dropped from the moved cards, so check the result. Moving a list that already sits on that board is a no-op, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. The ID of the list to move. Obtain it from List Lists. |
| `board_id` | string | yes |  | Destination Board ID. The ID of the board to move the list to. Obtain it from List Boards. |

Output fields:

- `id`: List ID
- `name`: Name
- `closed`: Archived (boolean)
- `color`: Color
- `idBoard`: Board ID
- `pos`: Position (number)

### `update_checklist`

**Update Checklist (Agent).** Renames a checklist or moves it up or down among the checklists on its card. Anything left unset keeps its current value, so the name can be corrected without touching the position. Use Update Checklist Item to change an entry inside the checklist rather than the checklist itself. Re-sending the same values converges on the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checklist_id` | string | yes |  | Checklist ID. The ID of the checklist. Obtain it from List Card Checklists. |
| `name` | string | no |  | Name. New name for the checklist. Leave empty to keep it. |
| `position` | string | no |  | Position. Where the checklist sits among the card checklists. Leave empty to keep it. One of `"top"`, `"bottom"`. |

Output fields:

- `id`: Checklist ID
- `name`: Name
- `idBoard`: Board ID
- `idCard`: Card ID
- `checkItems`: Check Items
- `checkItems[].id`: Check Item ID
- `checkItems[].name`: Name
- `checkItems[].state`: State
- `checkItems[].due`: Due Date (datetime)
- `checkItems[].idMember`: Member ID
- `checkItems[].idChecklist`: Checklist ID

### `update_checklist_item`

**Update Checklist Item (Agent).** Renames a checklist item or moves it within its checklist, and can also set its complete or incomplete state in the same call. Anything left unset keeps its current value. Use Set Checklist Item State when only ticking or unticking is needed, and Add Checklist Item to create a new entry. Re-sending the same values converges on the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card the checklist belongs to. |
| `checkitem_id` | string | yes |  | Checklist Item ID. The ID of the checklist item. Obtain it from List Card Checklists. |
| `name` | string | no |  | Name. New text for the item. Leave empty to keep it. |
| `state` | string | no |  | State. Completion state. Leave empty to keep it. One of `"complete"`, `"incomplete"`. |
| `position` | string | no |  | Position. Where the item sits within its checklist. Leave empty to keep it. One of `"top"`, `"bottom"`. |

Output fields:

- `id`: Check Item ID
- `name`: Name
- `state`: State
- `due`: Due Date (datetime)
- `idMember`: Member ID
- `idChecklist`: Checklist ID

### `list_board_memberships`

**List Board Memberships (Agent).** Lists the members of a board with the role each one holds, such as admin, normal or observer, alongside their username. Use it when the role matters, for example before an action that needs board admin rights; List Board Members returns the same people without their roles. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. The ID of the board. Obtain it from List Boards. |

Output fields:

- `memberships`: Memberships
- `memberships[].id`: Membership ID
- `memberships[].idMember`: Member ID
- `memberships[].memberType`: Role
- `memberships[].unconfirmed`: Invite Pending (boolean)
- `memberships[].deactivated`: Deactivated (boolean)
- `memberships[].member`: Member
- `memberships[].member.id`: Member ID
- `memberships[].member.fullName`: Full Name
- `memberships[].member.username`: Username
- `count`: Count (number)

### `add_card_attachment_from_url`

**Add Card Attachment From URL (Agent).** Attaches a link to a card by URL, optionally naming it and making it the card cover. Use it to attach a document, image or page that is already hosted somewhere; the file-upload variant of this action takes binary content and is meant for people working in the flow builder, not agents. The URL must start with http:// or https://, and Trello stores the link without downloading it, so a private URL stays unreachable to anyone who cannot already open it. Each call adds another attachment, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `card_id` | string | yes |  | Card ID. The ID of the card. Obtain it from Search Cards. |
| `url` | string | yes |  | URL. The link to attach. Must start with http:// or https://. |
| `name` | string | no |  | Name. Display name for the attachment (max 256 characters). Defaults to the URL. |
| `set_cover` | boolean | no | `false` | Set As Cover. Use the attachment as the card cover. Only meaningful for images. |

Output fields:

- `id`: Attachment ID
- `name`: Name
- `url`: URL (url)
- `mimeType`: MIME Type
- `bytes`: Size (Bytes) (filesize)
- `isUpload`: Is Upload (boolean)
- `date`: Added At (datetime)

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
