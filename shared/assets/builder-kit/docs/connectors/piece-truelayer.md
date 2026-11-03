# TrueLayer

Connect with TrueLayer to leverage secure open banking services. This integration allows seamless interaction with TrueLayer's API to manage various financial processes.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-truelayer'
  version: '0.2.1'
```

Categories: PAYMENT_PROCESSING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Authentication for TrueLayer API

## Actions

### `create-payout`

**Create payout.** Initiate a payout (transfer of funds) from one of your TrueLayer merchant accounts to a beneficiary. This moves money and is not idempotent on its own, so supply the required idempotency key so retries do not duplicate the payout. To check a payout afterward use Get Payout, and to authorize it use Start authorization flow. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `IdempotencyKeyHeader` | string | yes |  | Used to ensure idempotent requests. |
| `SignatureHeader` | string | yes |  | Used for request signature verification. |

### `get-payout`

**Get payout.** Retrieve the details and current status of a single payout by its ID. Use to check the outcome or state of a payout you previously created; read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | ID of the payout. |

### `start-payout-authorization-flow`

**Start authorization flow.** Begin the authorization flow for an existing payout identified by its ID, transitioning it toward execution. Use after creating a payout that requires authorization; this advances payout state and is not idempotent. To create the payout first, use Create Payout. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | ID of the payout. |

### `submit-payments-provider-return-parameters`

**Submit payments return parameters.** Forward the query and fragment parameters TrueLayer returned to your direct redirect URI back to TrueLayer to continue the payment/payout authorization flow. Use only when handling a provider redirect return; pass an idempotency key to make retries safe. Not a read or status-check operation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `IdempotencyKeyHeader` | string | no |  | Idempotency Key Header. Used to ensure idempotent requests. |

### `create-mandate`

**Create Mandate.** Create a new TrueLayer payment mandate (a recurring-payment authorization) using a backend bearer token. Use when setting up variable recurring payments before any individual payment is taken. This writes a new resource each call; supply the optional idempotency key to prevent duplicate mandates on retry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `IdempotencyKeyHeader` | string | no |  | Idempotency Key Header. Used to ensure idempotent requests. |
| `SignatureHeader` | string | no |  | Signature Header. Used for request signature verification. |

### `list-mandate`

**List Mandates.** List the variable recurring payment (VRP) mandates belonging to your client, optionally filtered by user ID and paged via cursor. Use to discover mandate IDs or audit a user's mandates; read-only and safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | no |  | User ID. Optional ID of the user whose mandates you want to list. |
| `cursor` | string | no |  | Cursor. Optional cursor for pagination. |
| `limit` | string | no |  | Limit. Optional limit on the number of mandates to return. |

### `get-mandate`

**Get Mandate.** Retrieve a single TrueLayer mandate by its ID, including its current status and details. Use when you have a known mandate ID and need to inspect or poll its state. Read-only and safe to repeat; callable with either a backend bearer token or that mandate's mandate token. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Mandate ID. The ID of the mandate to retrieve. |

### `start-mandate-authorization-flow`

**Start Authorization Flow.** Begin the authorization flow for an existing mandate identified by its ID so the user can authorize the recurring payment arrangement. Use after the mandate is created; this advances mandate state and is not idempotent. Follow with Submit consent if the flow requires it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Mandate ID. The ID of the mandate to start the authorization flow for. |

### `submit-consent-mandate`

**Submit consent.** Submit the user's consent action within a mandate authorization flow, identified by the mandate ID. Use after Start Authorization Flow when the flow requires a consent step; this advances mandate state and is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Mandate ID. The ID of the mandate for which consent is being submitted. |

### `submit-mandate-provider-selection`

**Submit provider selection.** Advance a mandate's authorization flow by submitting the bank provider the user selected. Use during an interactive mandate setup when the flow requires a provider-selection step. This mutates the flow state and is not safe to repeat; it is the mandate counterpart to the payment provider-selection action. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Mandate ID. The ID of the mandate for which provider selection is being submitted. |

### `revoke-mandate`

**Revoke Mandate.** Permanently revoke a mandate so no further payments can be taken under it, using a backend bearer token. Use to cancel a recurring-payment authorization. This is a destructive state change on the mandate; re-running after success has no further effect but should be treated as one-time. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Mandate ID. The ID of the mandate to revoke. |

### `confirm-mandate-funds`

**Confirm Mandate Funds.** Check whether the payment service user behind a mandate has sufficient funds for a given amount and currency, identified by the mandate ID. This is a read-only funds availability check that does not move money and is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Mandate ID. ID of the Mandate to be confirmed. |
| `amount_in_minor` | string | yes |  | Amount in Minor Units. A "cent" value representing the amount. For example, 100 == 1 GBP. |
| `currency` | string | yes |  | Currency. Currency code (e.g., GBP, EUR). |

### `get-constraints`

**Get Mandate Constraints.** Look up the spending constraints set on a mandate and how much has already been used within each period. Use to check remaining headroom or limits before initiating a payment under the mandate. Read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Mandate ID. The ID of the mandate to retrieve the constraints for. |

### `list-operating-accounts`

**List Merchant Accounts.** List all merchant accounts belonging to your TrueLayer client, including their currencies and balances. Use to discover available merchant account IDs before creating payouts or configuring sweeping; read-only and safe to repeat. To fetch one account by ID instead, use Get Merchant Account. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `get-operating-account`

**Get Merchant Account.** Retrieve the details of a single merchant account by its ID, including currency, balance, and account identifiers. Use when you already have the account ID; read-only and safe to repeat. To discover account IDs first, use List Merchant Accounts. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Merchant Account ID. The ID of the merchant account to be retrieved. |

### `merchant-account-get-transactions`

**Get Transactions.** Retrieve the transaction history for one merchant account over a required ISO-8601 from/to date range, optionally filtered by type (payments or payouts) and paged via cursor. Use to reconcile activity on a specific account; read-only and safe to repeat. To get account metadata instead, use Get Merchant Account. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Merchant Account ID. The ID of the merchant account to return the transactions for. |
| `from` | string | yes |  | Start Timestamp. Timestamp for the start of the range to query (inclusive). Uses the ISO-8601 format of YYYY-MM-DDTHH:MM:SS±HHMM. |
| `to` | string | yes |  | End Timestamp. Timestamp for the end of the range to query (inclusive). Uses the ISO-8601 format of YYYY-MM-DDTHH:MM:SS±HHMM. |
| `cursor` | string | no |  | Cursor. Cursor used for pagination purposes, returned as `next_cursor` in the response payload of the initial request. Not required for the first page. |
| `type` | string | no |  | Transaction Type. Filters transactions by payments or payouts. If omitted, both are returned. |

### `merchant-account-setup-sweeping`

**Set Up or Update Sweeping.** Configure or update automatic sweeping for a merchant account so balance above a threshold is periodically withdrawn to a fixed IBAN at the chosen frequency. Idempotent: it sets the full sweeping configuration for the account, so repeating with the same values leaves the same settings. To stop sweeping use Disable Sweeping; to read current settings use Get Sweeping Settings. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Merchant Account ID. The ID of the merchant account to set or update sweeping settings for. |
| `max_amount_in_minor` | string | yes |  | Max Amount in Minor Units. The amount above which sweeping will occur, expressed in minor units (e.g., 100 means 1 GBP). |
| `frequency` | string | yes |  | Sweeping Frequency. The frequency of the sweeping operation (e.g., daily, weekly). |
| `iban` | string | yes |  | IBAN. The IBAN to which sweeping funds will be transferred. |

### `merchant-account-disable-sweeping`

**Disable Sweeping.** Turn off automatic sweeping for a merchant account by its ID, deleting the current sweeping configuration. Idempotent in effect: once sweeping is off, repeating leaves it off. To configure or re-enable sweeping use Set Up or Update Sweeping. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Merchant Account ID. The ID of the merchant account to disable sweeping for. |

### `merchant-account-get-sweeping`

**Get Sweeping Settings.** Retrieve the current automatic sweeping configuration (threshold, frequency, destination IBAN) for a merchant account by its ID. Use to check whether and how sweeping is set up; read-only and safe to repeat. To change it use Set Up or Update Sweeping, or Disable Sweeping. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Merchant Account ID. The ID of the merchant account to fetch the sweeping settings for. |

### `get-merchant-account-payment-sources`

**Get Payment Sources.** List the verified payment sources (payer bank details) from which a given user has previously paid into a merchant account. Use to obtain a payer source for refunds or returning payouts; read-only and safe to repeat. Requires both the merchant account ID and the user ID. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Merchant Account ID. The ID of the merchant account into which payments were made. |
| `user_id` | string | yes |  | User ID. The ID of the user whose payment sources are being retrieved. |

### `create-payment-link`

**Create Payment Link.** Create a new hosted payment link that a payer can use to make a payment. This provisions a new resource and is not idempotent on its own, so supply the optional idempotency key so retries do not create duplicate links. To read a link or its payments afterward, use Get Payment Link or Get Payments. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `IdempotencyKeyHeader` | string | no |  | Idempotency Key Header. Used to ensure idempotent requests. |
| `SignatureHeader` | string | no |  | Signature Header. Used for request signature verification. |

### `get-payment-link`

**Get Payment Link.** Retrieve the configuration and status of a single payment link by its ID. Use to inspect a link you created; read-only and safe to repeat. To list the payments collected through it instead, use Get Payments. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment Link ID. The ID of the payment link to retrieve. |

### `get-payment-link-payments`

**Get Payments.** List the payments made against a specific payment link, identified by the link ID, with cursor-based pagination. Use to reconcile or review payments collected through a payment link; read-only and safe to repeat. To fetch the link itself use Get Payment Link. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment Link ID. The ID of the payment link for which payments are being retrieved. |
| `cursor` | string | no |  | Cursor. Cursor used for pagination purposes, returned as `next_cursor` in the response payload of the initial request. Not required for the first page of items. |
| `limit` | string | no |  | Limit. Optional limit on the number of payments to return. |

### `create-payment`

**Create Payment.** Initiate a new TrueLayer single payment using a backend bearer token, returning the payment resource and token used to drive its authorization. Use as the first step of taking a payment from a user. This creates a new payment each call; the required idempotency key prevents duplicate charges when retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `IdempotencyKeyHeader` | string | yes |  | Idempotency Key. A key that uniquely identifies the request. If the same key is sent in another request, the operation will have the same result as the first request. |
| `SignatureHeader` | string | yes |  | Signature Header. Header containing the signature of the request payload for authentication purposes. |
| `PsuIpAddressHeader` | string | no |  | PSU IP Address. Used to collect and record the end-user's IP address. Only considered if the authorization_flow object in the request body is specified. |
| `DeviceUserAgentHeader` | string | no |  | Device User Agent. Used to improve the end-user's authentication experience based on the device type. If omitted, the `User-Agent` header will be used instead. Only considered if the authorization_flow object in the request body is specified. |

### `start-payment-authorization-flow`

**Start Payment Authorization Flow.** Begin the authorization flow for an existing payment, returning the first action the user must take (e.g. provider selection or redirect). Use after create-payment to start driving the user through authorization. This mutates the payment's flow state and should be called once per payment, not repeatedly. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment ID. The ID of the payment for which to start the authorization flow. |

### `submit-provider-selection`

**Submit Provider Selection.** Advance a payment's authorization flow by submitting the bank provider the user selected. Use only when the flow has reached a provider-selection step. This mutates flow state and is not safe to repeat; it is the payment counterpart to the mandate provider-selection action. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment ID. The ID of the payment for which provider selection is being submitted. |

### `submit-scheme-selection`

**Submit Scheme Selection.** Advance a payment's authorization flow by submitting the payment scheme the user chose. Use only when the flow has reached a scheme-selection step. This mutates flow state and is not safe to repeat; distinct from the provider-selection, consent, and form submission steps of the same flow. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment ID. The ID of the payment for which the scheme details are being submitted. |

### `submit-form`

**Submit Form.** Advance a payment's authorization flow by submitting form input the user filled in (e.g. additional bank-required fields). Use only when the flow has reached a form step. This mutates flow state and is not safe to repeat; distinct from provider, scheme, consent, and account-selection steps. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment ID. The ID of the payment for which the form is being submitted. |

### `submit-consent`

**Submit Consent.** Advance a payment's authorization flow by recording the user's consent. Use only when the flow has reached a consent step. This mutates flow state and is not safe to repeat; it is one of several authorization-flow steps (provider, scheme, form, account selection). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment ID. The ID of the payment for which consent is being submitted. |

### `submit-user-account-selection`

**Submit User Account Selection.** Advance a payment's authorization flow by submitting which of the user's accounts to pay from. Use only when the flow has reached a user-account-selection step. This mutates flow state and is not safe to repeat; distinct from provider, scheme, consent, and form steps. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment ID. The ID of the payment for which the user account selection is being submitted. |

### `cancel-payment`

**Cancel Payment.** Cancel an in-progress payment so it can no longer be authorized or executed. Use to abandon a payment before it completes. This is a state change on the payment and should be treated as one-time; callable with the payment resource token or a backend bearer token. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment ID. The ID of the payment to cancel. |

### `save-user-account-payment`

**Save Payment Account.** Save the payer's account details from a payment so they can be reused for future payments. Use after a successful payment to store the account for repeat use. This writes new stored-account state and is not a read; callable with the payment resource token or a backend bearer token. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment ID. The ID of the payment to save the account details for. |

### `get-payment`

**Get Payment.** Retrieve a single payment by its ID, including its current status. Use when you have a known payment ID and need to inspect or poll the payment's state (e.g. waiting for it to settle). Read-only and safe to repeat; callable with either the payment resource token or a backend bearer token. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment ID. The ID of the payment to retrieve. |

### `create-payment-refund`

**Create Payment Refund.** Issue a refund against an existing merchant-account payment, given its payment ID; omit the amount to refund in full or set an amount in minor units for a partial refund. Use to return funds to a payer. This creates a new refund each call and is not safe to repeat without external deduplication. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment ID. The payment ID for the payment to be fully or partially refunded. |
| `amount_in_minor` | string | no |  | Amount in Minor Units. The amount to refund, expressed in minor units (e.g., 100 means 1 GBP). |

### `get-payment-refunds`

**Get Payment Refunds.** List all refunds issued against a given merchant-account payment. Use to review a payment's refund history or find a refund ID. Read-only and safe to repeat; to fetch one refund by its ID, use the single-refund lookup action instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment ID. The ID of the merchant account payment to retrieve all refunds for. |

### `get-payment-refund`

**Get Payment Refund.** Retrieve details and status of a single refund, identified by both its payment ID and refund ID. Use when you know the specific refund you want to inspect. Read-only and safe to repeat; to list every refund on a payment instead, use the get-all-refunds action. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payment_id` | string | yes |  | Payment ID. The ID of the payment for which the refund was made. |
| `refund_id` | string | yes |  | Refund ID. The ID of the refund to retrieve details for. |

### `search-payment-providers`

**Search Payment Providers.** Search and list available TrueLayer payment providers (banks) that can be offered to a payer. Use to discover provider options before initiating a payment; read-only and safe to repeat. To fetch one provider by its known ID instead, use Get Payment Provider. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `get-payment-provider`

**Get Payment Provider.** Retrieve full details for a single TrueLayer payment provider (bank) by its known provider ID, optionally selecting an icon variant. Use when you already have the provider ID; read-only and safe to repeat. To discover providers by criteria instead, use Search Payment Providers. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Payment Provider ID. The ID of the payment provider to retrieve details for. |
| `client_id` | string | no |  | Client ID. Optional client ID to retrieve specific provider details. |
| `icon_type` | string | no |  | Icon Type. Optional configuration for the type of icon: - `default`: Default icon with no background (SVG). - `extended`: Extended to a square with an appropriate background color (SVG). - `extended_small`: Extended icon with 192x192 px size (JPEG). - `extended_medium`: Extended icon with 432x432 px size (JPE… |

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
