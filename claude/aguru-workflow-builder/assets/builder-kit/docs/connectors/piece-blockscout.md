# Blockscout

Blockscout is a tool for inspecting and analyzing EVM chains.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-blockscout'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `search`

**Search.** Run a free-text search across the chain for addresses, transactions, blocks, and tokens, returning ranked matches. Pick this when you have a name, symbol, or partial identifier and need to resolve it to an entity; use the dedicated by-hash lookups when you already hold an exact hash. Read-only lookup on eth.blockscout.com.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Search query for addresses, transactions, blocks, or tokens. |

### `check_redirect`

**Check Search Redirect.** Check whether a search query maps unambiguously to a single resource (address, transaction, block, or token) and should redirect straight to it. Pick this to disambiguate an exact identifier into one entity rather than browsing ranked results from Search. Read-only lookup on eth.blockscout.com.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Search query to check for redirect. |

### `get_blocks`

**Get Blocks.** List recent Ethereum blocks across the chain (newest first), takes no inputs. Read-only. Use this for chain-wide block browsing; to fetch one specific block use Get Block by Hash or Number.

Kind: search, safe to repeat.

No inputs.

### `get_main_page_blocks`

**Get Main Page Blocks.** Get the short list of latest blocks shown on the Blockscout explorer home page, takes no inputs. Read-only. Use this for a quick at-a-glance feed of the newest blocks; for a fuller paginated block list use Get Blocks.

Kind: search, safe to repeat.

No inputs.

### `get_block_by_hash`

**Get Block by Hash or Number.** Look up a single Ethereum block by either its hash or its block number and return its details (miner, timestamp, gas, transaction count). Read-only; accepts both identifier forms. Use this when you know which block you want; to browse recent blocks without an identifier use Get Blocks.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `blockIdentifier` | string | yes |  | Block Hash or Number. Block hash or block number to fetch. |

### `get_block_transactions`

**Get Block Transactions.** List the transactions contained in one Ethereum block, identified by its hash or number. Read-only. Use this to scope transactions to a single block; for chain-wide recent transactions use the Transactions Get Transactions action, and for that block's staking withdrawals use Get Block Withdrawals.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `blockIdentifier` | string | yes |  | Block Hash or Number. Block hash or block number to fetch transactions for. |

### `get_block_withdrawals`

**Get Block Withdrawals.** List the validator (beacon-chain) staking withdrawals included in one Ethereum block, identified by its hash or number. Read-only. Use this for post-Merge withdrawal data of a specific block; for the regular transactions in that block use Get Block Transactions instead.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `blockIdentifier` | string | yes |  | Block Hash or Number. Block hash or block number to fetch withdrawals for. |

### `get_transactions`

**Get Transactions.** List recent Ethereum transactions across the whole chain (validated mainnet transactions, newest first). Read-only and takes no inputs. Use this for chain-wide browsing; to fetch one known transaction use Get Transaction by Hash, and to scope to a single block use Get Block Transactions.

Kind: search, safe to repeat.

No inputs.

### `get_main_page_transactions`

**Get Main Page Transactions.** Get the short list of latest Ethereum transactions shown on the Blockscout explorer home page. Read-only and takes no inputs. Use this for a quick at-a-glance feed of the most recent activity; for a fuller paginated transaction list use Get Transactions instead.

Kind: search, safe to repeat.

No inputs.

### `get_transaction_by_hash`

**Get Transaction by Hash.** Look up a single Ethereum transaction by its full hash and return its core details (status, value, gas, from/to, block). Read-only. Use this when you have a specific transaction hash; for the related transfers, logs, internal calls, or state changes of that same transaction use the dedicated per-transaction actions instead.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionHash` | string | yes |  | Transaction Hash. Hash of the transaction to fetch details for. |

### `get_transaction_token_transfers`

**Get Transaction Token Transfers.** List the ERC-20/721/1155 token transfers that occurred within one Ethereum transaction, identified by its hash. Read-only. Use this when you have a transaction hash and want the tokens it moved; for token transfers across a token contract over time use the Tokens Get Token Transfers action instead.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionHash` | string | yes |  | Transaction Hash. Hash of the transaction to fetch token transfers for. |

### `get_transaction_internal_transactions`

**Get Transaction Internal Transactions.** List the internal transactions (value-transferring calls made by contracts, not separate top-level transactions) triggered within one Ethereum transaction, identified by its hash. Read-only. Use this to trace contract-to-contract ETH movement inside a single transaction; for ERC token movements in that transaction use Get Transaction Token Transfers instead.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionHash` | string | yes |  | Transaction Hash. Hash of the transaction to fetch internal transactions for. |

### `get_transaction_logs`

**Get Transaction Logs.** List the event logs emitted by one Ethereum transaction, identified by its hash (decoded contract events with topics and data). Read-only. Use this to inspect what events a transaction fired; for the resulting account/storage changes use Get Transaction State Changes instead.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionHash` | string | yes |  | Transaction Hash. Hash of the transaction to fetch logs for. |

### `get_transaction_raw_trace`

**Get Transaction Raw Trace.** Get the low-level raw execution trace (opcode-level call frames) for one Ethereum transaction by hash. Read-only and intended for deep debugging of contract execution. Prefer the higher-level Get Transaction Internal Transactions or Get Transaction by Hash actions for ordinary lookups; reach for this only when you need the full unprocessed trace.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionHash` | string | yes |  | Transaction Hash. Hash of the transaction to fetch raw trace for. |

### `get_transaction_state_changes`

**Get Transaction State Changes.** List the account balance and storage state changes (before/after values) caused by one Ethereum transaction, identified by its hash. Read-only. Use this to see how a transaction altered account or contract state; for the events it emitted use Get Transaction Logs instead.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionHash` | string | yes |  | Transaction Hash. Hash of the transaction to fetch state changes for. |

### `get_transaction_summary`

**Get Transaction Summary.** Get Blockscout's interpreted, human-readable summary of one Ethereum transaction by hash (e.g. a plain-language description of what the transaction did, such as a swap or transfer). Read-only. Use this for a quick natural-language explanation; for the structured raw fields use Get Transaction by Hash instead.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionHash` | string | yes |  | Transaction Hash. Hash of the transaction to fetch summary for. |

### `get_addresses`

**Get Addresses.** List the top native-coin (ETH) holding addresses on the chain, ordered by balance. Pick this to discover or rank wealthy accounts; it takes no input and does not target a specific address (use Get Address by Hash for a single account). Read-only lookup on eth.blockscout.com.

Kind: search, safe to repeat.

No inputs.

### `get_address_by_hash`

**Get Address by Hash.** Look up the core profile of a single address: current balance, contract/EOA status, name tags, and implementation details. Pick this as the first lookup for one known address before drilling into its transactions, tokens, or logs. Read-only lookup on eth.blockscout.com; requires a 0x address hash.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Address Hash. Hash of the address to fetch info for. |

### `get_address_counters`

**Get Address Counters.** Fetch aggregate activity counts for an Ethereum address (total transactions, token transfers, gas usage). Pick this for a quick summary of how active an address is rather than retrieving the underlying records. Read-only lookup on eth.blockscout.com; requires a 0x address hash.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Address Hash. Hash of the address to fetch counters for. |

### `get_address_transactions`

**Get Address Transactions.** List the top-level transactions in which an address was the sender or receiver. Pick this for an account’s normal transaction history; use Get Address Internal Transactions for contract-internal value moves or Get Address Token Transfers for token movements. Read-only lookup on eth.blockscout.com; requires a 0x address hash.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Address Hash. Hash of the address to fetch transactions for. |

### `get_address_token_transfers`

**Get Address Token Transfers.** List the token transfer events (ERC-20/721/1155) in which an address sent or received tokens. Pick this for token movement history; use Get Address Token Balances for current holdings or Get Address Transactions for native-coin transfers. Read-only lookup on eth.blockscout.com; requires a 0x address hash.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Address Hash. Hash of the address to fetch token transfers for. |

### `get_address_logs`

**Get Address Logs.** List the event logs emitted by a contract address (decoded where an ABI is known). Pick this to read smart-contract events such as Transfer or Approval for a given contract rather than its transactions or token balances. Read-only lookup on eth.blockscout.com; requires a 0x address hash.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Address Hash. Hash of the address to fetch logs for. |

### `get_address_blocks_validated`

**Get Address Blocks Validated.** List the blocks an address validated or produced (relevant for validator/miner addresses). Choose this to inspect an account’s block-production history rather than its transactions or balances. Read-only lookup on eth.blockscout.com; requires a 0x address hash and returns empty for non-validator addresses.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Address Hash. Hash of the address to fetch validated blocks for. |

### `get_address_token_balances`

**Get Address Token Balances.** Get the full current token holdings of an address as a flat list of balances. Choose this for a snapshot of what tokens an account holds and how much; use Get Address Token Transfers for movement history or Get Address Tokens for the paginated/filterable variant. Read-only lookup on eth.blockscout.com; requires a 0x address hash.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Address Hash. Hash of the address to fetch token balances for. |

### `get_address_tokens`

**Get Address Tokens.** List the tokens owned by an address, the paginated/filterable view of its holdings (e.g. by token type). Choose this when iterating through many holdings; use Get Address Token Balances for a simple full snapshot. Read-only lookup on eth.blockscout.com; requires a 0x address hash.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Address Hash. Hash of the address to fetch tokens for. |

### `get_address_withdrawals`

**Get Address Withdrawals.** List beacon-chain (staking) withdrawals credited to an address. Choose this to inspect validator-staking payout history for an account; returns empty for addresses that received no withdrawals. Read-only lookup on eth.blockscout.com; requires a 0x address hash.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Address Hash. Hash of the address to fetch withdrawals for. |

### `get_address_coin_balance_history`

**Get Address Coin Balance History.** List per-event native-coin (ETH) balance changes for an address, one entry per balance-altering block. Pick this for fine-grained balance history; use Get Address Coin Balance History By Day for a daily-aggregated series instead. Read-only lookup on eth.blockscout.com; requires a 0x address hash.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Address Hash. Hash of the address to fetch coin balance history for. |

### `get_address_coin_balance_history_by_day`

**Get Address Coin Balance History By Day.** Get an address’s native-coin (ETH) balance aggregated into one value per day, suited for charting or trend analysis. Pick this over Get Address Coin Balance History when you want a daily time series rather than every individual balance-changing event. Read-only lookup on eth.blockscout.com; requires a 0x address hash.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Address Hash. Hash of the address to fetch daily coin balance history for. |

### `get_tokens`

**Get Tokens.** List tokens tracked on the chain (ERC-20/721/1155), takes no inputs. Read-only. Use this to browse or discover tokens when you do not have a specific contract address; once you have an address use Get Token by Address for its details.

Kind: search, safe to repeat.

No inputs.

### `get_token_by_address`

**Get Token by Address.** Look up the metadata for a single token by its contract address (name, symbol, decimals, type, total supply). Read-only. Use this when you have a specific token contract address; to discover tokens without an address use Get Tokens, and for holder or transfer detail use the dedicated token actions.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Token Address. Contract address of the token to fetch info for. |

### `get_token_transfers`

**Get Token Transfers.** List recent transfers of one token, identified by its contract address, across all holders (newest first). Read-only. Use this to track movement of a specific token over time; for the token transfers inside a single transaction use the Transactions Get Transaction Token Transfers action instead.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Token Address. Contract address of the token to fetch transfers for. |

### `get_token_holders`

**Get Token Holders.** List the addresses holding one token, identified by its contract address, with their balances (largest holders first). Read-only. Use this to see who owns a token; for just the total holder count use Get Token Counters, and for NFT item IDs use Get Token Instances.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Token Address. Contract address of the token to fetch holders for. |

### `get_token_counters`

**Get Token Counters.** Get aggregate counts for one token by its contract address, such as total number of holders and total transfers. Read-only. Use this when you just need the summary numbers; to enumerate the actual holders or transfers use Get Token Holders or Get Token Transfers instead.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Token Address. Contract address of the token to fetch counters for. |

### `get_token_instances`

**Get Token Instances.** List the individual NFT instances (token IDs) minted under one NFT contract, identified by its address. Read-only and only meaningful for ERC-721/1155 collections. Use this to enumerate items in a collection; for fungible token holders use Get Token Holders and for general token info use Get Token by Address.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `addressHash` | string | yes |  | Token Address. Contract address of the token to fetch instances for. |
