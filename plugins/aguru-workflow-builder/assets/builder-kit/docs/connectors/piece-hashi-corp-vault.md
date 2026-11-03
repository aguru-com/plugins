# HashiCorp Vault

Securely manage secrets and sensitive data with HashiCorp Vault

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-hashi-corp-vault'
  version: '0.1.0'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect to HashiCorp Vault to securely manage secrets.
>
> **Authentication Methods:**
> - **Token**: Use a Vault token directly
> - **AppRole**: Use Role ID and Secret ID for machine authentication

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Vault URL. The URL of your HashiCorp Vault instance (e.g., https://vault.example.com:8200) |
| `authMethod` | string | yes | `"token"` | Authentication Method. Choose how to authenticate with Vault. One of `"token"`, `"appRole"`. |
| `token` | string | no |  | Vault Token. Your Vault authentication token. |
| `roleId` | string | no |  | Role ID. The Role ID for AppRole authentication. |
| `secretId` | string | no |  | Secret ID. The Secret ID for AppRole authentication. |
| `appRolePath` | string | no | `"approle"` | AppRole Mount Path. The mount path of the AppRole auth method. |
| `namespace` | string | no |  | Namespace. Vault namespace (Enterprise feature, leave empty if not using) |
| `apiVersion` | string | yes | `"v2"` | KV Secrets Engine Version. The version of the KV secrets engine. One of `"v1"`, `"v2"`. |

## Actions

### `read_secret`

**Read Secret.** Fetch the key-value data stored at a secret path in a HashiCorp Vault secrets engine (mount). Use to retrieve credentials or config an agent needs at runtime. Requires the secrets-engine mount name and the path; on KV v2 engines an optional version number reads a specific historical version (0/omitted = latest). Read-only and idempotent; a missing path returns success:false rather than erroring. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretEngine` | string | yes | `"secret"` | Secret Engine. The name of the secrets engine (mount path) |
| `secretPath` | string | yes |  | Secret Path. The path to the secret (e.g., myapp/database) |
| `version` | number | no | `0` | Version. Version of the secret to read (0 for latest, KV v2 only) |

### `write_secret`

**Write Secret.** Store key-value data at a secret path in a HashiCorp Vault secrets engine (mount), creating the secret or overwriting the data there. Use to persist credentials or config the flow generated. Requires the secrets-engine mount name, the path, and the secret data as a JSON object. On KV v2 engines this records a new secret version each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretEngine` | string | yes | `"secret"` | Secret Engine. The name of the secrets engine (mount path) |
| `secretPath` | string | yes |  | Secret Path. The path to store the secret (e.g., myapp/database) |
| `secretData` | JSON | yes | `{"username":"myuser","password":"mypassword"}` | Secret Data. The secret data to store as JSON. |

### `delete_secret`

**Delete Secret.** Remove the secret stored at a path in a HashiCorp Vault secrets engine (mount); on KV v2 engines this deletes the metadata and all versions at that path. Use to revoke or clean up credentials. Requires the secrets-engine mount name and the path. Idempotent: deleting an already-missing path still reports success rather than erroring. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretEngine` | string | yes | `"secret"` | Secret Engine. The name of the secrets engine (mount path) |
| `secretPath` | string | yes |  | Secret Path. The path to the secret to delete (e.g., myapp/database) |

### `list_secrets`

**List Secrets.** List the secret keys and sub-paths directly under a path in a HashiCorp Vault secrets engine (mount). Use to discover what secrets exist before reading them. Requires the secrets-engine mount name; the path is optional and defaults to the engine root, so leaving it empty lists the top level. Read-only and idempotent; returns only immediate child keys, not nested values, and an empty/missing path returns no keys rather than erroring. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretEngine` | string | yes | `"secret"` | Secret Engine. The name of the secrets engine (mount path) |
| `listPath` | string | no | `""` | Path. The path to list secrets from (e.g., myapp/) |

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
