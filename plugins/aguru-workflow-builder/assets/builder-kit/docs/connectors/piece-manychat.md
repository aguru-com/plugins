# Manychat

Automations for Instagram, WhatsApp, TikTok, and Messenger marketing.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-manychat'
  version: '0.1.7'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can create an API key by navigating to **Setting -> Extensions -> API**.

## Actions

### `addTagToUser`

**Add Tag to User.** Assigns an existing tag to a Manychat subscriber, identified by subscriber ID and tag ID, then returns the updated subscriber info. Use to label or segment a known contact (e.g. mark them as a lead). Idempotent: re-adding the same tag leaves the subscriber in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriberId` | number | yes |  | User ID. Please refer [Manychat Guide](https://help.manychat.com/hc/en-us/articles/14959510331420-How-to-generate-a-token-for-the-Manychat-API-and-where-to-get-parameters#h_01JCR55RJ0B0PQW6HDW6RW0A42) to obtain user/contact ID. |
| `tagId` | string | yes |  | Tag. A value the product loads from the provider, such as an id; write the value itself. |

### `createSubscriber`

**Create Subscriber.** Creates a new Manychat subscriber from contact details such as name, email, phone, or WhatsApp phone. Use when onboarding a new contact into Manychat. At least one of phone, email, or WhatsApp phone must be provided. Not idempotent: each call creates another subscriber. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `phone` | string | no |  | Phone Number. Fill in at least one field: phone or email or whatsapp phone. |
| `whatsapp_phone` | string | no |  | WhatsApp Phone. Fill in at least one field: phone or email or whatsapp phone. |
| `email` | string | no |  | Email. Fill in at least one field: phone or email or whatsapp phone. |
| `gender` | string | no |  | Gender. |
| `has_opt_in_sms` | boolean | no |  | SMS Opt-in. |
| `has_opt_in_email` | boolean | no |  | Email Opt-in. |
| `consent_phrase` | string | no |  | Consent Phrase. The consent phrase provided by the subscriber. |

### `findUserByCustomField`

**Find User by Custom Field.** Searches Manychat subscribers by a custom field (text or number type) matching a given value, returning whether any matched and the list of matches. Use to look up a subscriber by a stored attribute when you do not have their subscriber ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `field` | string | yes |  | Custom Field. A value the product loads from the provider, such as an id; write the value itself. |
| `value` | string | yes |  | Value. The value to search for. |

### `findUserByName`

**Find User by Name.** Searches Manychat subscribers by full name, returning whether any matched and the list of matches. Use to resolve a contact to their subscriber record when you only know their name. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Provide user's full name to search. |

### `removeTagFromUser`

**Remove Tag from User.** Removes a tag from a Manychat subscriber, identified by subscriber ID and tag ID, then returns the updated subscriber info. Use to unlabel or de-segment a known contact. Idempotent: removing a tag the subscriber no longer has leaves the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriberId` | number | yes |  | User ID. Please refer [Manychat Guide](https://help.manychat.com/hc/en-us/articles/14959510331420-How-to-generate-a-token-for-the-Manychat-API-and-where-to-get-parameters#h_01JCR55RJ0B0PQW6HDW6RW0A42) to obtain user/contact ID. |
| `tagId` | string | yes |  | Tag. A value the product loads from the provider, such as an id; write the value itself. |

### `sendContentToUser`

**Send Content to User.** Sends a message to a Manychat subscriber, identified by subscriber ID, where the content type selects the mode: a text message, or a media message (image, video, audio, or file) referenced by URL. Use to deliver an outbound message to a known contact, optionally targeting a specific platform and applying a message tag. Text content is required for text mode and a media URL for media modes. Not idempotent: each call sends another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber_id` | number | yes |  | User ID. Please refer [Manychat Guide](https://help.manychat.com/hc/en-us/articles/14959510331420-How-to-generate-a-token-for-the-Manychat-API-and-where-to-get-parameters#h_01JCR55RJ0B0PQW6HDW6RW0A42) to obtain user/contact ID. |
| `platform` | string | no |  | Platform. The platform to send the content to. One of `"facebook"`, `"instagram"`, `"whatsapp"`, `"telegram"`. |
| `content_type` | string | yes |  | Content Type. The type of content to send. One of `"text"`, `"image"`, `"video"`, `"audio"`, `"file"`. |
| `text_content` | string | no | `""` | Text Content. The text content to send. Required when content type is Text. |
| `media_url` | string | no |  | Media URL. URL of the media to send (image, video, audio, or file). Required for media content types. |
| `message_tag` | string | no |  | Message Tag. The tag to use for the message. One of `"ACCOUNT_UPDATE"`, `"CONFIRMED_EVENT_UPDATE"`, `"HUMAN_AGENT"`, `"POST_PURCHASE_UPDATE"`, `"BUSINESS_PRODUCTIVITY"`. |

### `setCustomField`

**Set Custom Field.** Sets or updates a custom field value on a Manychat subscriber, identified by subscriber ID and the chosen custom field, then returns the updated subscriber info. Use to store or change a single attribute on a known contact; the input type adapts to the field (text, number, date, or boolean). Idempotent: setting the same value again yields the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber_id` | number | yes |  | User ID. Please refer [Manychat Guide](https://help.manychat.com/hc/en-us/articles/14959510331420-How-to-generate-a-token-for-the-Manychat-API-and-where-to-get-parameters#h_01JCR55RJ0B0PQW6HDW6RW0A42) to obtain user/contact ID. |
| `field_id` | string | yes |  | Custom Field. A value the product loads from the provider, such as an id; write the value itself. |
| `field_value` | object | yes |  | Field Value. An object whose fields depend on other inputs; the product shows them. |
