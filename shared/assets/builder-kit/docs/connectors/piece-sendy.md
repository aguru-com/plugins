# Sendy

Self-hosted email marketing software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sendy'
  version: '0.1.7'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Your sendy domain should be the base URL of your Sendy installation. Example: https://sendy.example.com
>
> Follow these instructions to get your Sendy API Key:
>
> 1. Visit the Settings page of your Sendy domain: _https://sendy-domain.com_/settings
> 2. Once on the website, locate and click on the API Key and copy it.
>
> Get your Brand ID from the main Brands page. The ID is the first column in the table.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Sendy Domain. The domain of your Sendy account. |
| `apiKey` | string | yes |  | API Key. The API key for your Sendy account. |
| `brandId` | string | yes |  | Brand ID. The brand ID that will be associated to this connection. Brand IDs can be found on the main Brands page. |

## Actions

### `count_subscribers`

**Count Active Subscribers.** Returns the number of currently active (confirmed, non-unsubscribed) subscribers in a single Sendy list. Use to report list size or check growth; requires the target list. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. Select the list to get the status from. A value the product loads from the provider, such as an id; write the value itself. |

### `create_campaign`

**Create Campaign.** Creates a new email campaign in Sendy from the supplied from/reply-to addresses, subject, and HTML (plus optional plain text), targeting selected lists/segments. By default it is saved as a draft, but it can instead be sent immediately or scheduled for a future date/time via the auto-send and schedule options. Use to author or dispatch a campaign; HTML body and sender fields are required. Not idempotent — each call creates (and may send) a separate campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromEmail` | string | yes |  | From Email. The email address the campaign will be sent from. |
| `fromName` | string | yes |  | From Name. The name the campaign will be sent from. |
| `replyTo` | string | yes |  | Reply To. The email address that will be used for replies. |
| `title` | string | yes |  | Title. The title of the campaign. |
| `subject` | string | yes |  | Subject. The subject of the campaign email. |
| `plainText` | string | no |  | Plain Text. The plain text version of the campaign email. |
| `html` | string | yes |  | HTML. The HTML version of the campaign email. |
| `lists` | array | no |  | Lists. Select lists to send the campaign to. Values the product loads from the provider, such as ids; write an array of them. |
| `excludeLists` | array | no |  | Exclude Lists. Select lists to exclude from the campaign send. Values the product loads from the provider, such as ids; write an array of them. |
| `segments` | string | no |  | Segment IDs. Comma separated list of segment IDs to send the campaign to. |
| `excludeSegments` | string | no |  | Exclude Segment IDs. Comma separated list of segment IDs to exclude from the campaign send. |
| `queryString` | string | no |  | Query String. The query string to append to the campaign URL. |
| `trackOpens` | string | yes | `"1"` | Track Opens. Enable open tracking. One of `"0"`, `"1"`, `"2"`. |
| `trackClicks` | string | yes | `"1"` | Track Clicks. Enable click tracking. One of `"0"`, `"1"`, `"2"`. |
| `autoSend` | boolean | no | `false` | Automatically Send. Automatically send the campaign after creation. |
| `schedule` | ISO date-time string | no |  | Schedule the Campaign. Schedule the campaign to be sent at a specific date and time. Date/time format: 2023-06-09T12:00:00Z. |
| `timezone` | string | no |  | Timezone. The timezone to use for the schedule. One of `"Africa/Abidjan"`, `"Africa/Accra"`, `"Africa/Addis_Ababa"`, `"Africa/Algiers"`, `"Africa/Asmara"`, `"Africa/Bamako"`, `"Africa/Bangui"`, `"Africa/Banjul"`, `"Africa/Bissau"`, `"Africa/Blantyre"`, `"Africa/Brazzaville"`, `"Africa/Bujumbura"`, `"Africa/Cairo"`, `"Africa/Casablanca"`, `"Africa/Ceuta"`, `"Africa/Conakry"`, `"Africa/Dakar"`, `"Africa/Dar_es_Salaam"`, `"Africa/Djibouti"`, `"Africa/Douala"`, `"Africa/El_Aaiun"`, `"Africa/Freetown"`, `"Africa/Gaborone"`, `"Africa/Harare"`, `"Africa/Johannesburg"` and 393 more. |

### `delete_subscriber`

**Delete Subscriber.** Permanently removes a subscriber, identified by email, from a specific Sendy list. Use to purge a contact rather than just unsubscribing them. Requires the list and a valid email; deleting an already-absent subscriber has no further effect, so repeating the call is effectively idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. Select the list to delete from. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The user's email. |

### `get_brands`

**Get Brands.** Retrieves all brands configured in the connected Sendy installation. Use to discover available brand IDs, e.g. before listing a brand's lists. Takes no input and is read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `get_brand_lists`

**Get Lists for a Brand.** Retrieves the email lists belonging to the brand configured in the connection, optionally including hidden lists. Use to discover available list IDs before subscribing, unsubscribing, or sending a campaign. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeHidden` | boolean | no | `false` | Include Hidden Lists. Include hidden lists in the results. |

### `get_subscription_status`

**Get Subscription Status.** Looks up the subscription state (e.g. subscribed, unsubscribed, unconfirmed, bounced, complained) of a subscriber, identified by email, within a specific Sendy list. Use to check whether a contact is on a list before acting. Requires the list and a valid email; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. Select the list to get the status from. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The user's email. |

### `subscribe`

**Subscribe Updated.** Adds a subscriber (by email, plus optional name, country, IP, referrer) to a single Sendy list. Use to opt a contact into one list; for several lists at once use Subscribe Multiple Lists instead. Honors the list's double opt-in unless the silent flag forces single opt-in. Effectively an upsert on the email, so re-running with the same email is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. Select the list to subscribe to. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The user's email. |
| `name` | string | no |  | Name. The user's name. |
| `country` | string | no |  | Country. The user's 2 letter country code. |
| `ipaddress` | string | no |  | IP Address. The user's IP address. |
| `referrer` | string | no |  | Referrer. The URL where the user signed up from. |
| `gdpr` | boolean | no | `true` | GDPR compliant. If you're signing up EU users in a GDPR compliant manner, set to true. |
| `silent` | boolean | no | `false` | Silent. set to true if your list is 'Double opt-in' but you want to bypass that and signup the user to the list as 'Single Opt-in instead'. |

### `subscribe_multiple_lists`

**Subscribe Multiple Lists.** Adds the same subscriber (by email, plus optional name, country, IP, referrer) to several Sendy lists in one call, iterating over each selected list. Use when a contact should join multiple lists at once; for a single list use Subscribe instead. Honors each list's double opt-in unless the silent flag forces single opt-in. Effectively an upsert on the email, so re-running with the same input is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lists` | array | yes |  | Lists. Select the lists to subscribe to. Values the product loads from the provider, such as ids; write an array of them. |
| `email` | string | yes |  | Email. The user's email. |
| `name` | string | no |  | Name. The user's name. |
| `country` | string | no |  | Country. The user's 2 letter country code. |
| `ipaddress` | string | no |  | IP Address. The user's IP address. |
| `referrer` | string | no |  | Referrer. The URL where the user signed up from. |
| `gdpr` | boolean | no | `true` | GDPR compliant. If you're signing up EU users in a GDPR compliant manner, set to true. |
| `silent` | boolean | no | `false` | Silent. set to true if your list is 'Double opt-in' but you want to bypass that and signup the user to the list as 'Single Opt-in instead'. |

### `unsubscribe`

**Unsubscribe.** Marks a subscriber, identified by email, as unsubscribed from a single Sendy list while keeping the record (unlike Delete Subscriber, which removes it). Use to opt a contact out of one list; for several lists use Unsubscribe Multiple Lists. Requires the list and a valid email; unsubscribing an already-unsubscribed contact has no further effect, so repeating the call is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. Select the list to unsubscribe from. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The user's email. |

### `unsubscribe_multiple`

**Unsubscribe Multiple Lists.** Marks the same subscriber, identified by email, as unsubscribed across several Sendy lists in one call, iterating over each selected list while keeping the records. Use to opt a contact out of multiple lists at once; for a single list use Unsubscribe. Requires the lists and a valid email; repeating the call on already-unsubscribed lists has no further effect, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lists` | array | yes |  | Lists. Select the lists to subscribe to. Values the product loads from the provider, such as ids; write an array of them. |
| `email` | string | yes |  | Email. The user's email. |
