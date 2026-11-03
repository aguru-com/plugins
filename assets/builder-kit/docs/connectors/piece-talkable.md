# Talkable

Referral marketing programs that drive revenue

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-talkable'
  version: '0.3.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Follow these steps:
>
> 1. **Log in to your Talkable account:** Open Talkable https://www.talkable.com/login.
>
> 2. **Enter the Talkable site slug and API key:** Go to **All site Settings** > **API Settings**, and copy Site ID and API key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site` | string | yes |  | Talkable site ID. |
| `api_key` | string | yes |  | API key. |

## Actions

### `find_person`

**Find person.** Look up a Talkable person record by email and return the requested slice of their data; the scope selector switches between general profile info, referrals as advocate, referrals as friend, rewards, shares, or personal data. Use to fetch a known customer's referral/loyalty details. Read-only; the email and chosen scope are required. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Person email. |
| `scope` | string | yes |  | Scope. Select scope. One of `"/"`, `"/referrals_as_advocate"`, `"/referrals_as_friend"`, `"/rewards"`, `"/shares_by"`, `"/personal_data"`. |

### `find_coupon`

**Find coupon.** Look up a Talkable coupon by its code and return its details. Use to verify a coupon exists or inspect its status/value. Read-only; the coupon code is required. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `code` | string | yes |  | Coupon code. |

### `update_person`

**Update person.** Update a Talkable person identified by email, setting profile fields such as name, phone, username, customer ID, custom properties, and opt-in/unsubscribe status. Use to keep an existing customer's details or subscription state current. Idempotent: it overwrites the same fields to the same values on repeat; the email is required. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Person email. |
| `first_name` | string | no |  | Person first name. |
| `last_name` | string | no |  | Person last name. |
| `phone_number` | string | no |  | Person phone number. |
| `username` | string | no |  | Person username. |
| `customer_id` | number | no |  | Customer ID. |
| `custom_properties` | object | no |  | Custom properties. |
| `gated_param_subscribed` | string | no |  | Opt-in status. Opt-in status true/false. One of `"true"`, `"false"`. |
| `unsubscribed` | string | no |  | Unsubscribe status. Unsubscribe status true/false. One of `"true"`, `"false"`. |
| `unsubscribed_at` | ISO date-time string | no |  | Unsubscribed date. |

### `anonymize_person`

**Anonymize person.** Permanently anonymize a Talkable person's personal data, identified by email, for privacy/GDPR-style erasure requests. Use only when a customer's identifying information must be scrubbed. Destructive and irreversible; repeating leaves the record anonymized (no further effect). The email is required. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Person email. |

### `unsubscribe_person`

**Unsubscribe person.** Mark a Talkable person, identified by email, as unsubscribed from referral/marketing communications. Use to honor an opt-out request. Idempotent: an already-unsubscribed person stays unsubscribed with no extra effect; the email is required. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Person email. |

### `create_purchase`

**Create purchase.** Record a single purchase origin in Talkable for a customer (by email), used to attribute referrals and trigger rewards. Use after a customer completes an order; requires email, order number, and subtotal. Not idempotent: each call posts a new purchase, so guard against duplicates (use Create batch of purchases for multiple at once). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `order_number` | string | yes |  | Order number. |
| `subtotal` | number | yes |  | Subtotal. |
| `first_name` | string | no |  | First name. |
| `last_name` | string | no |  | Last name. |
| `username` | string | no |  | Username. |
| `customer_id` | string | no |  | Customer id. |
| `custom_properties` | object | no |  | Custom properties. |
| `phone_number` | string | no |  | Phone number. |
| `campaign_tags` | string | no |  | Campaign tags. |
| `sharing_channels` | array | no |  | Sharing channels. |
| `ip_address` | string | no |  | IP address. |
| `uuid` | string | no |  | UUID. |
| `created_at` | string | no |  | Created at. |
| `traffic_source` | string | no |  | Traffic source. |
| `coupon_codes` | array | no |  | Coupon codes. |
| `currency_iso_code` | string | no | `"USD"` | Currency iso code. Required for multi-currency sites. |
| `custom_field` | string | no |  | Custom field. |
| `shipping_address` | string | no |  | Shipping address. |
| `shipping_zip` | string | no |  | Shipping zip. |
| `items` | JSON | no | `[{"price":10,"quantity":1,"product_id":"SKU1"}]` | Items. You can pass items with purchase. |

### `create_purchases_batch`

**Create batch of purchases.** Record multiple purchase origins in Talkable in one call by passing an array of purchase objects (each keyed to a customer email). Use to ingest orders in bulk rather than one at a time; optionally create campaign offers for them. Not idempotent: each call posts the purchases again, so avoid resubmitting the same batch. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `create_offers` | boolean | no | `false` | Create offers. Create offers for campaign. |
| `purchases` | JSON | no | `[{"email":"customer@store.com","order_number":"20","subtotal":100.44,"first_name":"John","last_name":"Doe","username":"johndoe1992","customer_id":"1024","custom_properties":{"country":"US","eye_color":"brown","person_occupation":"marketing"},"custom_field":"","phone_number":"+12025551111","campaign_tags":"post-purchase","sharing_channels":["facebook","custom"],"ip_address":"192.0.2.255","uuid":"123e4567-e89b-32d1-a456-426614174000","created_at":"2023-04-27T11:30:42.769-07:00","traffic_source":"in-store","coupon_codes":["C0001","C0002"],"currency_iso_code":"USD","shipping_address":"456 White Finch St., North Augusta, South Carolina, 29860, United States","shipping_zip":"29860","items":[{"price":25.11,"quantity":4,"product_id":"TSHIRT"}]}]` | Purchases. |

### `create_event`

**Create event.** Record a single non-purchase event origin (e.g. a signup or newsletter subscription) in Talkable for a customer by email, used to attribute referrals and trigger rewards. Use for conversion events that are not purchases; requires email, event category, event number, and subtotal. Not idempotent: each call posts a new event (use Create batch of events for multiple at once). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `event_category` | string | yes |  | Event category. |
| `event_number` | string | yes |  | Event number. |
| `subtotal` | number | yes |  | Subtotal. |
| `first_name` | string | no |  | First name. |
| `last_name` | string | no |  | Last name. |
| `username` | string | no |  | Username. |
| `customer_id` | string | no |  | Customer id. |
| `custom_properties` | object | no |  | Custom properties. |
| `phone_number` | string | no |  | Phone number. |
| `campaign_tags` | string | no |  | Campaign tags. |
| `sharing_channels` | array | no |  | Sharing channels. |
| `ip_address` | string | no |  | IP address. |
| `uuid` | string | no |  | UUID. |
| `created_at` | string | no |  | Created at. |
| `traffic_source` | string | no |  | Traffic source. |
| `coupon_codes` | array | no |  | Coupon codes. |
| `currency_iso_code` | string | no | `"USD"` | Currency iso code. Required for multi-currency sites. |
| `custom_field` | string | no |  | Custom field. |
| `shipping_address` | string | no |  | Shipping address. |
| `shipping_zip` | string | no |  | Shipping zip. |
| `items` | JSON | no | `[{"price":10,"quantity":1,"product_id":"SKU1"}]` | Items. You can pass items with event. |

### `create_events_batch`

**Create batch of events.** Record multiple non-purchase event origins in Talkable in one call by passing an array of event objects (each keyed to a customer email). Use to ingest events in bulk rather than one at a time; optionally create campaign offers for them. Not idempotent: each call posts the events again, so avoid resubmitting the same batch. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `create_offers` | boolean | no | `false` | Create offers. Create offers for campaign. |
| `events` | JSON | no | `[{"email":"user@store.com","event_category":"newsletter_subscription","event_number":"42","subtotal":100.44,"first_name":"John","last_name":"Doe","username":"johndoe1992","customer_id":"1024","custom_properties":{"country":"US","eye_color":"brown","person_occupation":"marketing"},"custom_field":"","phone_number":"+12025551111","campaign_tags":"post-purchase","sharing_channels":["facebook","custom"],"ip_address":"192.0.2.255","uuid":"123e4567-e89b-32d1-a456-426614174000","created_at":"2023-04-27T11:30:42.769-07:00","traffic_source":"in-store","coupon_codes":["C0001","C0002"],"currency_iso_code":"USD","shipping_address":"456 White Finch St., North Augusta, South Carolina, 29860, United States","shipping_zip":"29860","items":[{"price":100.44,"quantity":1,"product_id":"SUBSCRIPTION"}]}]` | Events. |

### `refund`

**Refund purchase/event.** Mark an existing purchase or event origin in Talkable as refunded, identified by its order/event number (origin slug), optionally with a partial refund subtotal and refund date. Use when an order is returned or canceled so referral attribution is reversed. Not idempotent: each call records a refund against the origin. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `origin_slug` | string | yes |  | Order or event number. |
| `refund_subtotal` | number | no |  | Refund subtotal. |
| `refunded_at` | ISO date-time string | no |  | Refunded date. |

### `get_loyalty_redeem_actions`

**Get loyalty actions.** Retrieve the list of loyalty redeem actions available to a Talkable loyalty member, identified by their email. Use to see what rewards a customer can redeem. Read-only; the person's email is required. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `person_email` | string | yes |  | Person email. |

### `update-referral-status`

**Update referral status.** Set the status of a referral tied to a purchase/event origin in Talkable to either "approved" or "voided", identified by its order/event number (origin slug). Use to manually approve a pending referral reward or void a fraudulent/invalid one. Idempotent: re-applying the same status leaves it unchanged; origin slug and a status of approved or voided are required. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `origin_slug` | string | yes |  | Order or event number. |
| `status` | string | yes |  | Status. Select referral status. Only "approved" or "voided" are accepted. One of `"approved"`, `"voided"`. |

### `claim-offer`

**Share and claim offer.** Create an offer claim in Talkable on behalf of an advocate sharing a campaign with a friend, generating the friend's referral reward. Use to programmatically trigger a share-and-claim within a referral campaign; requires advocate email, friend email, and the campaign tag. Not idempotent: each call creates a new offer claim. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `advocate_email` | string | yes |  | Advocate email. Example : advocate@example.com. |
| `friend_email` | string | yes |  | Friend email. Example : friend@example.com. |
| `campaign_tag` | string | yes |  | Campaign tag. Example : invite. |

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
