# Ethereum Name Service (ENS)

Ethereum Name Service (ENS) is a decentralized naming system on the Ethereum blockchain.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-eth-name-service'
  version: '0.1.6'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> *Get your api Key: https://thegraph.com/studio/apikeys

## Actions

### `listEnsDomains`

**List ENS Domains.** Look up all Ethereum Name Service (ENS) domains owned by a given Ethereum address by querying the ENS subgraph on The Graph. Use to discover which ENS names an address controls, along with their subdomains, resolver, and metadata. Requires the wallet address; case is normalized automatically. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `address` | string | yes |  | Address. Address to list ENS domains for. |
