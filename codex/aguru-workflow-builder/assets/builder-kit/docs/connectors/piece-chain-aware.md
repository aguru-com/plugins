# ChainAware.AI

Detect risky wallet behavior

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chain-aware'
  version: '0.1.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your ChainAware API key.

## Actions

### `auditWalletAddress`

**Audit Wallet Address.** Run a ChainAware fraud-risk audit on a single on-chain wallet address for a given network (e.g. ethereum, bsc). Choose this for a broad risk overview of a wallet; use Fraud Check when you specifically need a fraud-probability score. Requires the network name and wallet address. Read-only analysis — idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `network` | string | yes |  | Network. |
| `walletAddress` | string | yes |  | Wallet Address. |

### `creditScore`

**Credit Score.** Look up the ChainAware on-chain credit score for a wallet address on a given network. Choose this to assess a wallet's creditworthiness or borrowing history rather than fraud risk. Requires the network name and wallet address. Read-only lookup — idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `network` | string | yes |  | Network. |
| `walletAddress` | string | yes |  | Wallet Address. |

### `fraudCheck`

**Fraud Check.** Calculate a ChainAware fraud-probability score for a wallet address on a given network. Choose this when you need a quantified fraud likelihood for a wallet; the optional "Only Fraud" flag narrows the result to fraud-related signals only. Requires the network name and wallet address. Read-only analysis — idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `network` | string | yes |  | Network. |
| `walletAddress` | string | yes |  | Wallet Address. |
| `onlyFraud` | boolean | no | `false` | Only Fraud. |

### `rugPullCheck`

**Rug Pull Check.** Calculate a ChainAware rug-pull / fraud-probability score for a smart-contract address (e.g. a token contract) on a given network. Choose this when assessing a token or contract rather than a user wallet — for wallets use Fraud Check instead. Requires the network name and contract address. Read-only analysis — idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `network` | string | yes |  | Network. |
| `contractAddress` | string | yes |  | Contract Address. |

### `walletSegment`

**Wallet Segment.** Retrieve ChainAware behavioural segmentation for a wallet address on a given network — how the wallet is categorized based on its on-chain activity. Choose this to profile or classify a wallet rather than score its fraud risk. Requires the network name and wallet address. Read-only lookup — idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `network` | string | yes |  | Network. |
| `walletAddress` | string | yes |  | Wallet Address. |

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
