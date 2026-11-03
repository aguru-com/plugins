# Campaign Monitor

Email marketing platform for delivering exceptional email campaigns.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-campaign-monitor'
  version: '0.1.8'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To use Campaign Monitor, you need to get an API key:
> 1. Login to your account at https://www.campaignmonitor.com.
> 2. Navigate to Account Settings.
> 3. Click on API Keys.
> 4. Create a new API key or use an existing one.

## Actions

### `add_subscriber_to_list`

**Add Subscriber.** Adds a subscriber (by email) to a specific Campaign Monitor list under a client, optionally setting name, phone, custom fields, and tracking/SMS consent. Choose this to enroll a new contact into an email list; enable Resubscribe to re-add someone who previously unsubscribed. Not idempotent: each call posts a new subscription and may overwrite or re-add the contact, so guard against duplicate runs. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Client Account. A value the product loads from the provider, such as an id; write the value itself. |
| `listId` | string | yes |  | List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. |
| `name` | string | no |  | Name. |
| `phone` | string | no |  | Phone. |
| `consentToTrack` | string | yes | `"Unchanged"` | Consent to Track. Whether the subscriber has consented to tracking. One of `"Yes"`, `"No"`, `"Unchanged"`. |
| `consentToSendSms` | string | no | `"Unchanged"` | Consent to Send SMS. Whether the subscriber has consented to send SMS. One of `"Yes"`, `"No"`, `"Unchanged"`. |
| `resubscribe` | boolean | no | `false` | Resubscribe. If true, the subscriber will be resubscribed if they previously unsubscribed. |
| `fields` | object | yes |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `update_subscriber_details`

**Update Subscriber.** Updates an existing subscriber, identified by their current email address, in a specific Campaign Monitor list under a client — changing name, phone, custom fields, and tracking/SMS consent. Choose this to modify a contact already on a list rather than to add one. Idempotent: it keys on the email and overwrites the same record, so repeating with identical input leaves the subscriber in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Client Account. A value the product loads from the provider, such as an id; write the value itself. |
| `listId` | string | yes |  | List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. |
| `name` | string | no |  | Name. |
| `phone` | string | no |  | Phone. |
| `consentToTrack` | string | no | `"Yes"` | Consent to Track. Whether the subscriber has consented to tracking. One of `"Yes"`, `"No"`, `"Unchanged"`. |
| `consentToSendSms` | string | no | `"Unchanged"` | Consent to Send SMS. Whether the subscriber has consented to send SMS. One of `"Yes"`, `"No"`, `"Unchanged"`. |
| `resubscribe` | boolean | no | `false` | Resubscribe. If true, the subscriber will be resubscribed if they previously unsubscribed. |
| `fields` | object | yes |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `unsubscribe_subscriber`

**Unsubscribe Subscriber.** Unsubscribes a subscriber, identified by email, from a specific Campaign Monitor list under a client, marking them as opted out. Choose this to suppress a contact from further sends on that list. Idempotent: repeating the call leaves the subscriber in the same unsubscribed state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Client Account. A value the product loads from the provider, such as an id; write the value itself. |
| `listId` | string | yes |  | List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. The email address of the subscriber to unsubscribe. |

### `find_subscriber`

**Find Subscriber.** Looks up a single subscriber by exact email address within a specific Campaign Monitor list under a client, returning their details and tracking preference. Choose this to check whether a contact exists on a list or to read their state before adding/updating; a missing subscriber resolves as not found rather than an error. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Client Account. A value the product loads from the provider, such as an id; write the value itself. |
| `listId` | string | yes |  | List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. The email address of the subscriber to find. |
