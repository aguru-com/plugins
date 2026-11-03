# Vero

Vero is an event-based messaging platform. Increase conversions and customer satisfaction by sending more targeted emails.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vero'
  version: '0.1.7'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Auth Token

> Vero auth token

## Actions

### `aliasAUser`

**Alias a User.** Re-identifies a Vero user by remapping an existing record from an old user ID to a new user ID, merging the two identities. Use when a user's stable identifier has changed and their history must be preserved under the new ID. Both the old and new IDs are required; re-running with the same pair is effectively idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Old User ID. The old unique identifier of the user. |
| `new_id` | string | yes |  | New User ID. The new unique identifier of the user. |

### `createOrUpdateUser`

**Create or Update User.** Upserts a Vero user profile keyed on the supplied user ID, setting the email and any custom properties and communication channels (e.g. push device tokens). Use to register a new contact or to enrich/refresh an existing one. ID and email are required; because it is keyed on the stable ID, repeating the same call is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | User ID. The unique identifier of the user. |
| `email` | string | yes |  | Email. The email address of the user. |
| `data` | object | no |  | User Data. Custom user properties (e.g., first_name, last_name, timezone). Reserved properties: language, timezone, userAgent. |
| `channels` | array | no |  | Channels. Device tokens for push notifications and other communication channels. Each item: { `type`, `address`, `platform`? }. |

### `deleteUser`

**Delete User.** Permanently deletes a Vero user, identified by user ID, along with all of their properties and activity history. This is irreversible. Re-running on an already-deleted ID has no further effect, so it is effectively idempotent on the same target. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | User ID. The unique identifier of the user to delete. |

### `resubscribeUser`

**Resubscribe User.** Globally resubscribes a Vero user, identified by user ID, restoring their consent to receive all communications. Use to reverse a prior unsubscribe. Repeating the call leaves the user subscribed, so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | User ID. The unique identifier of the user. |

### `trackEvent`

**Track Event.** Records a custom analytics event in Vero for a user (identified by user ID and email), with an event name and optional event data and metadata. Use to log a user action that can drive campaigns or segmentation. Each call appends a new event occurrence, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. Unique database identifier for the user. |
| `userEmail` | string | yes |  | User Email. Email address of the user. |
| `eventName` | string | yes |  | Event Name. Name of the event being tracked. |
| `eventData` | object | no |  | Event Data. Event-specific data and properties. |
| `extras` | object | no |  | Extras. Additional metadata for the event (e.g., source, createdAt) |

### `unsubscribe`

**Unsubscribe.** Globally unsubscribes a Vero user, identified by user ID, withdrawing their consent so they no longer receive any communications. Use to honor an opt-out. Repeating the call leaves the user unsubscribed, so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | User ID. The unique identifier of the user. |

### `updateUsersTags`

**Update User Tags.** Adds and/or removes tags on a Vero user profile identified by user ID, supplying lists of tags to add, remove, or both. Use to segment or label a user. Applying the same add/remove sets converges to the same tag state, so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | User ID. The unique identifier of the user. |
| `add` | array | no |  | Tags to Add. An array of tags to add to the user. |
| `remove` | array | no |  | Tags to Remove. An array of tags to remove from the user. |
