# Mempool

The mempool.space website invented the concept of visualizing a Bitcoin node's mempool as projected blocks.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mempool-space'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `get_difficulty_adjustment`

**Get Difficulty Adjustment.** Read the current Bitcoin mining difficulty-adjustment status: progress through the current 2016-block epoch, estimated next-retarget difficulty change, and time/blocks remaining. Pick this for network-wide difficulty/retarget questions, not for a specific block or transaction. Read-only and takes no input.

Kind: safe to repeat.

No inputs.

### `get_price`

**Get Price.** Read the latest spot Bitcoin price across major fiat currencies (USD, EUR, GBP, etc.). Pick this for the current/most-recent price; use Get Historical Price instead when you need the price at a specific past date. Read-only and takes no input.

Kind: safe to repeat.

No inputs.

### `get_historical_price`

**Get Historical Price.** Look up the Bitcoin price for a single chosen currency at a specific past date/timestamp. Pick this for "what was BTC worth on date X" questions; use Get Price instead for the current spot price. Requires a currency and a lookup date, and is read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `currency` | string | yes |  | Currency. Select the currency for historical price. One of `"USD"`, `"EUR"`, `"GBP"`, `"CAD"`, `"CHF"`, `"AUD"`, `"JPY"`. |
| `dateTime` | ISO date-time string | yes |  | Price lookup date. Provide YYYY-MM-DD format. |

### `get_address_details`

**Get Address Details.** Returns aggregate statistics for a Bitcoin address: total funded/spent amounts and transaction counts split across confirmed chain and pending mempool. Read-only and idempotent. Use this to compute an address balance or activity summary in one call; use the transaction-list actions to enumerate individual transactions or Get Address UTXO for spendable outputs.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `address` | string | yes |  | Address. The Bitcoin address to look up. |

### `get_address_transactions`

**Get Address Transactions.** Returns the combined transaction history for a Bitcoin address (up to 50 unconfirmed mempool plus 25 confirmed transactions), with an optional after transaction ID to page through older entries. Read-only and idempotent. Use this for a single mixed view; choose the dedicated Chain or Mempool variants when you need only confirmed or only pending transactions.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `address` | string | yes |  | Address. The Bitcoin address to look up transactions for. |
| `after_txid` | string | no |  | After Transaction ID. Optional: Get transactions after this transaction ID (for pagination) |

### `get_address_transactions_chain`

**Get Address Transactions (Chain).** Returns only the confirmed (on-chain) transaction history for a Bitcoin address, 25 per page, newest first, with an optional last transaction ID to page through older entries. Read-only and idempotent. Choose this for settled history; use the Mempool variant for unconfirmed transactions, or Get Address Transactions for a combined view.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `address` | string | yes |  | Address. The Bitcoin address to look up transactions for. |
| `last_txid` | string | no |  | Last Transaction ID. Optional: Last transaction ID for pagination. |

### `get_address_transactions_mempool`

**Get Address Transactions (Mempool).** Returns only the pending, unconfirmed mempool transactions for a Bitcoin address (up to 50). Read-only and idempotent, though entries disappear as they confirm or are dropped. Choose this to detect incoming/outgoing payments not yet mined; use the Chain variant for confirmed history.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `address` | string | yes |  | Address. The Bitcoin address to look up mempool transactions for. |

### `get_address_utxo`

**Get Address UTXO.** Lists the unspent transaction outputs (UTXOs) currently held by a Bitcoin address, each with its txid, output index, value, and confirmation status. Read-only and idempotent, though the set changes as funds are spent or received. Use this to determine spendable coins or compute available balance for an address.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `address` | string | yes |  | Address. The Bitcoin address to look up UTXOs for. |

### `validate_address`

**Validate Address.** Checks whether a string is a valid Bitcoin address and reports its type and script details without touching chain history. Read-only and idempotent. Use this as a cheap pre-check before any address lookup; it confirms format/validity only, not whether the address has ever been used or holds funds.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `address` | string | yes |  | Address. The Bitcoin address to validate. |

### `get_mempool_blocks_fees`

**Get Mempool Blocks Fees.** Returns the current mempool modeled as a series of projected upcoming blocks, each with its fee-rate range, median fee, size, and transaction count. Takes no input and is read-only and idempotent, but reflects a live snapshot that shifts every few seconds. Use this for detailed fee-tier/congestion analysis; use Get Recommended Fees for simple confirmation-target fee picks.

Kind: safe to repeat.

No inputs.

### `get_recommended_fees`

**Get Recommended Fees.** Returns suggested Bitcoin fee rates (in sat/vB) for several confirmation targets such as fastest, half-hour, hour, economy, and minimum. Takes no input and is read-only and idempotent, but values track live mempool conditions and update continuously. Use this to pick a fee for a transaction; use Get Mempool Blocks Fees when you need the full per-block fee breakdown instead.

Kind: safe to repeat.

No inputs.

### `get_block`

**Get Block.** Look up full metadata for one Bitcoin block by its block hash (height, timestamp, transaction count, size, weight, merkle root, etc.). Read-only and idempotent. Requires the exact 64-character block hash; if you only have a height, resolve the hash first. Use Get Block Status for confirmation depth, Get Block Header for the raw hex header, or Get Block Raw for the binary serialization.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `hash` | string | yes |  | Block Hash. The hash of the block to look up. |

### `get_block_header`

**Get Block Header.** Returns the hex-encoded 80-byte block header for a given block hash (version, previous hash, merkle root, timestamp, bits, nonce). Read-only and idempotent. Pick this when you only need the header rather than the full block; use Get Block for parsed fields or Get Block Raw for the entire serialized block.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `hash` | string | yes |  | Block Hash. The hash of the block to look up. |

### `get_block_height`

**Get Block Height.** Resolve a block height to its block hash. Pick this to translate a numeric height into the hash other block actions need; use Get Block Timestamp to find a block by time, or Get Block Tip Hash for the latest block. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `height` | number | yes |  | Block Height. The height of the block to look up. |

### `get_block_timestamp`

**Get Block Timestamp.** Find the block mined closest to a given Unix timestamp, returning its height and hash. Pick this to locate a block by time; use Get Block Height when you already know the numeric height. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timestamp` | number | yes |  | Timestamp. Unix timestamp to find the closest block to. |

### `get_block_raw`

**Get Block Raw.** Fetches the full raw serialized block (binary representation) for a given block hash. Read-only and idempotent. Choose this only when you need the complete on-the-wire block bytes; for human-readable fields use Get Block, and for just the 80-byte header use Get Block Header.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `hash` | string | yes |  | Block Hash. The hash of the block to look up. |

### `get_block_status`

**Get Block Status.** Checks whether a block (by hash) is currently in the best chain and reports its confirmation state. Read-only and idempotent, but the result can change if the block is reorganized out of the chain. Use this to verify a block is still confirmed; use Get Block for full block details.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `hash` | string | yes |  | Block Hash. The hash of the block to check status. |

### `get_block_tip_height`

**Get Block Tip Height.** Returns the current Bitcoin chain tip height (the height of the most recently mined block) as a single number. Takes no input and is read-only and idempotent, though the value advances roughly every ten minutes as new blocks arrive. Use this to learn the latest height or to compute confirmation counts.

Kind: safe to repeat.

No inputs.

### `get_block_tip_hash`

**Get Block Tip Hash.** Get the hash of the current chain-tip (latest) block. Pick this as the starting point for "most recent block" queries, then feed the hash into other block actions. Read-only and takes no input; the result changes as new blocks are mined.

Kind: safe to repeat.

No inputs.

### `get_block_transaction_id`

**Get Block Transaction ID.** Resolves the transaction ID (txid) at a specific positional index within a block, given the block hash and a zero-based index (index 0 is the coinbase transaction). Read-only and idempotent. Use this to map a block position to its txid; the index must be within the block transaction count or the lookup fails.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `hash` | string | yes |  | Block Hash. The hash of the block. |
| `index` | number | yes |  | Transaction Index. The index of the transaction within the block. |

### `get_block_transaction_ids`

**Get Block Transaction IDs.** List the transaction IDs of every transaction in a block, given the block hash. Pick this for the complete set of IDs only; use Get Block Transactions when you need full transaction objects (paginated, 25 at a time). Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `hash` | string | yes |  | Block Hash. The hash of the block. |

### `get_block_transactions`

**Get Block Transactions.** List full transaction objects within a block by block hash, returning up to 25 per call with an optional start index for pagination. Pick this for transaction detail; use Get Block Transaction IDs when you only need the IDs. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `hash` | string | yes |  | Block Hash. The hash of the block. |
| `startIndex` | number | no |  | Start Index. Optional: Starting index for pagination. |

### `get_blocks_bulk`

**Get Blocks (Bulk).** Retrieve details for a contiguous range of blocks by height (minimum required, maximum optional and defaulting to the current tip), capped at 10 blocks per call. Pick this for surveying several consecutive blocks at once rather than fetching them one by one. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `minHeight` | number | yes |  | Minimum Height. The starting block height. |
| `maxHeight` | number | no |  | Maximum Height. Optional: The ending block height. If not specified, defaults to the current tip. |

### `get_transaction`

**Get Transaction.** Retrieve full parsed details of a Bitcoin transaction by its transaction ID: inputs, outputs, fee, size, and confirmation status. Pick this as the general-purpose transaction lookup; use narrower actions (status, times, hex, outspends) when you only need one facet. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `txid` | string | yes |  | Transaction ID. The transaction ID to retrieve. |

### `get_transaction_hex`

**Get Transaction Hex.** Fetch the hex-encoded serialized form of a transaction by its transaction ID from the /hex endpoint. Functionally equivalent to Get Raw Transaction; use Get Transaction instead for parsed/structured detail. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `txid` | string | yes |  | Transaction ID. The transaction ID to get hex data for. |

### `get_transaction_merkleblock_proof`

**Get Transaction Merkleblock Proof.** Get the merkleblock-encoded inclusion proof for a confirmed transaction by its ID. Pick this for the Bitcoin merkleblock hex format; use Get Transaction Merkle Proof for the structured merkle-path form. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `txid` | string | yes |  | Transaction ID. The transaction ID to get merkle block proof for. |

### `get_transaction_merkle_proof`

**Get Transaction Merkle Proof.** Get the Merkle inclusion proof for a confirmed transaction (block height, merkle path, position) to verify it belongs to its block. Pick this for the SPV-style merkle path; use Get Transaction Merkleblock Proof for the encoded merkleblock format. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `txid` | string | yes |  | Transaction ID. The transaction ID to get merkle proof for. |

### `get_transaction_outspend`

**Get Transaction Output Spend Status.** Check whether one specific output (by transaction ID plus 0-based output index/vout) has been spent. Pick this when you care about a single output; use Get All Transaction Output Spend Statuses to check every output of a transaction at once. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `txid` | string | yes |  | Transaction ID. The transaction ID to check output spending status. |
| `vout` | number | yes |  | Output Index. The index of the output to check (0-based) |

### `get_transaction_outspends`

**Get All Transaction Output Spend Statuses.** Check the spent/unspent status of every output of a transaction at once, by its transaction ID. Pick this to survey all outputs; use Get Transaction Output Spend Status to check a single output by index. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `txid` | string | yes |  | Transaction ID. The transaction ID to check all output spending statuses. |

### `get_transaction_raw`

**Get Raw Transaction.** Fetch the raw serialized bytes of a transaction by its transaction ID from the /raw endpoint. Functionally equivalent to Get Transaction Hex; pick this for the binary raw form, and use Get Transaction for the parsed/structured detail. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `txid` | string | yes |  | Transaction ID. The transaction ID to get raw data for. |

### `get_transaction_rbf_timeline`

**Get Transaction RBF Timeline.** Retrieve the Replace-By-Fee (RBF) history for a transaction ID, showing the chain of fee-bumping replacements over time. Pick this when investigating whether/how a transaction was replaced or fee-bumped. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `txid` | string | yes |  | Transaction ID. The transaction ID to get RBF timeline for. |

### `get_transaction_status`

**Get Transaction Status.** Check whether a transaction is confirmed and, if so, in which block (height, hash, time) by its transaction ID. Pick this for a quick confirmed/unconfirmed answer; use Get Transaction for the full transaction detail. Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `txid` | string | yes |  | Transaction ID. The transaction ID to check status for. |

### `get_transaction_times`

**Get Transaction Times.** Get timing information for a transaction by its ID, such as when it was first seen in the mempool. Pick this for propagation/first-seen timing rather than confirmation state (use Get Transaction Status) or full detail (use Get Transaction). Read-only.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `txid` | string | yes |  | Transaction ID. The transaction ID to get timing information for. |

### `post_transaction`

**Post Transaction.** Broadcast a signed raw Bitcoin transaction (hex) to the network for inclusion in the mempool. This is the only write action here and is not idempotent: re-submitting may error or have real on-chain effects, so call it once with a fully signed transaction. Returns the resulting transaction ID.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `rawTx` | string | yes |  | Raw Transaction. The raw transaction in hex format to broadcast. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint.

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
