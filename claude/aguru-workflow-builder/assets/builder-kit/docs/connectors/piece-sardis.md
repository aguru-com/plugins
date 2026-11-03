# Sardis

Policy-controlled payments for AI agents.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sardis'
  version: '0.2.0'
```

Categories: PAYMENT_PROCESSING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your Sardis API key:
> 1. Log in to your [Sardis Dashboard](https://sardis.sh/dashboard).
> 2. Navigate to **Settings** -> **API Keys**.
> 3. Copy your API key (starts with `sk_`).

## Actions

### `send_payment`

**Send Payment.** Sends a stablecoin payment from a Sardis wallet to a recipient address or merchant identifier, subject to the wallet's spending policies. Choose this to actually move funds; to test a payment against policy without moving money, use Check Policy instead. Not idempotent — each call submits a new transfer, so do not retry blindly on an unclear failure. Requires the source wallet ID, recipient, and amount; token defaults to USDC and chain to Base. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `walletId` | string | yes |  | Wallet ID. Your Sardis wallet ID (starts with wal_) |
| `to` | string | yes |  | Recipient. Recipient address or merchant identifier (e.g. "0xabc...", "openai.com") |
| `amount` | number | yes |  | Amount. Payment amount in token units (e.g. 25.00) |
| `token` | string | no | `"USDC"` | Token. Stablecoin to use for the transaction. One of `"USDC"`, `"USDT"`, `"PYUSD"`, `"EURC"`. |
| `chain` | string | no | `"base"` | Chain. Blockchain network. One of `"base"`, `"ethereum"`, `"polygon"`, `"arbitrum"`, `"optimism"`. |
| `memo` | string | no |  | Memo. Reason for payment (e.g. "Monthly API subscription") |

### `check_balance`

**Check Balance.** Reads the current balance and remaining spending limits for a Sardis wallet on a given token and chain. Use it before sending a payment to confirm sufficient funds and policy headroom. Read-only and idempotent. Requires the wallet ID; token defaults to USDC and chain to Base. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `walletId` | string | yes |  | Wallet ID. Your Sardis wallet ID (starts with wal_) |
| `token` | string | no | `"USDC"` | Token. Stablecoin to use for the transaction. One of `"USDC"`, `"USDT"`, `"PYUSD"`, `"EURC"`. |
| `chain` | string | no | `"base"` | Chain. Blockchain network. One of `"base"`, `"ethereum"`, `"polygon"`, `"arbitrum"`, `"optimism"`. |

### `check_policy`

**Check Policy.** Dry-runs a proposed payment against a Sardis wallet's spending policies and reports whether it would be allowed, without moving any funds. Use it to validate an amount and recipient before calling Send Payment. Idempotent and side-effect-free — it only simulates. Requires the wallet ID, amount, and recipient/merchant; token defaults to USDC and chain to Base. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `walletId` | string | yes |  | Wallet ID. Your Sardis wallet ID (starts with wal_) |
| `amount` | number | yes |  | Amount. Transaction amount to validate. |
| `merchant` | string | yes |  | Merchant. Recipient address or merchant identifier. |
| `token` | string | no | `"USDC"` | Token. Stablecoin to use for the transaction. One of `"USDC"`, `"USDT"`, `"PYUSD"`, `"EURC"`. |
| `chain` | string | no | `"base"` | Chain. Blockchain network. One of `"base"`, `"ethereum"`, `"polygon"`, `"arbitrum"`, `"optimism"`. |

### `set_policy`

**Set Spending Policy.** Sets or replaces the spending policy on a Sardis agent from a plain-English description of the rules (e.g. per-transaction caps, daily limits, blocked merchant categories). Use it to configure how an agent is allowed to spend before it sends payments. Idempotent in effect — re-applying the same policy text to the same agent yields the same resulting policy. Requires the agent ID and the natural-language policy text. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. Your Sardis agent ID. |
| `policyText` | string | yes |  | Policy (Natural Language). Describe the spending rules in plain English. e.g. "Max $50 per transaction, daily limit $500, block gambling merchants". |

### `list_transactions`

**List Transactions.** Retrieves recent ledger entries (transaction history) for a Sardis wallet. Use it to audit past payments or confirm whether a transfer was recorded. Read-only and idempotent. Requires the wallet ID; limit is optional and defaults to 50 (capped at 500). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `walletId` | string | yes |  | Wallet ID. Your Sardis wallet ID (starts with wal_) |
| `limit` | number | no | `50` | Limit. Maximum number of transactions to return (default: 50) |

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
