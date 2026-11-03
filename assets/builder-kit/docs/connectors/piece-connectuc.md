# ConnectUC

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-connectuc'
  version: '0.0.13'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create-contact`

**Create Contact.** Creates a new contact in a ConnectUC user's address book under the given domain and subscriber. Use when an agent needs to add a person (name, phone numbers, optional email, company, and tags) to a user's contacts. Not idempotent: each call adds another contact record, so calling it repeatedly with the same input creates duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | no |  | Domain. Select domain to which this trigger applies. A value the product loads from the provider, such as an id; write the value itself. |
| `user` | string | yes |  | User. Select the user who owns this contact. A value the product loads from the provider, such as an id; write the value itself. |
| `first_name` | string | yes |  | First Name. The first name of the contact. |
| `last_name` | string | yes |  | Last Name. The last name of the contact. |
| `email` | string | no |  | Email. The email address of the contact. |
| `phones` | array | yes |  | Phones. The phone numbers of the contact. |
| `company` | string | no |  | Company. The company of the contact. |
| `tags` | array | no |  | Tags. The tags of the contact. |

### `do-not-disturb`

**Set Do Not Disturb.** Sets a ConnectUC user's Do Not Disturb (DND) state to on or off via the DND checkbox, for the given domain and subscriber. Use when an agent needs to silence or re-enable a user's incoming calls. Idempotent: it sets DND to an absolute on/off value, so repeating the same call leaves the user in the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | no |  | Domain. Select domain to which this trigger applies. A value the product loads from the provider, such as an id; write the value itself. |
| `user` | string | yes |  | User. Select the user who owns this contact. A value the product loads from the provider, such as an id; write the value itself. |
| `dnd` | boolean | yes |  | Do Not Disturb. Enable or disable Do Not Disturb status. |

### `find-cdr`

**Find CDR.** Looks up a single Call Detail Record (CDR) for the authenticated user by its original call ID (origCallid). Use when an agent has a call ID and needs that call's details, such as before updating its notes. Idempotent: it is a read-only lookup that does not modify anything. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `origCallid` | string | yes |  | Original Call ID. The original call ID (origCallid) to search for. |

### `initiate-call`

**Initiate Call.** Places an outbound (click-to-call) phone call from a specific ConnectUC device/extension to a destination number, under the given domain and subscriber. Use when an agent needs to ring a user's device and connect it to a phone number. Not idempotent: each call starts a new outbound call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | no |  | Domain. Select domain to which this trigger applies. A value the product loads from the provider, such as an id; write the value itself. |
| `user` | string | yes |  | User. Select the user who owns this contact. A value the product loads from the provider, such as an id; write the value itself. |
| `device` | string | yes |  | Device. Select the device to use for the call. A value the product loads from the provider, such as an id; write the value itself. |
| `toNumber` | string | yes |  | To Number. The destination number of the call. |

### `send-sms`

**Send SMS.** Sends an SMS/MMS text message from a ConnectUC sender number to one or more recipient phone numbers, optionally with media attachment URLs. Use when an agent needs to text a person or group. Not idempotent: each call sends a new message (a fresh reference ID is generated per call), so repeating it delivers duplicate texts. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recipients` | array | yes |  | SMS Destinations. The phone number to send the SMS to. |
| `content` | string | yes |  | Message. The SMS message content. |
| `sender` | string | yes |  | SMS Sender. Select the SMS sender number. A value the product loads from the provider, such as an id; write the value itself. |
| `attachment_urls` | array | no |  | Media Attachments. The media attachment urls for the SMS message. |

### `update-cdr`

**Update CDR.** Updates the notes on an existing Call Detail Record (CDR) for the authenticated user, setting a required note plus optional disposition and reason. Use when an agent needs to annotate a known call with an outcome or comment; requires the CDR ID. Idempotent: it overwrites the same fields on the identified CDR, so repeating the call with the same input yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cdrId` | string | yes |  | CDR ID. The ID of the CDR to update. |
| `note` | string | yes |  | Note. Note about the call. |
| `disposition` | string | no |  | Disposition. The call disposition or outcome. |
| `reason` | string | no |  | Reason. The reason for the call outcome. |
