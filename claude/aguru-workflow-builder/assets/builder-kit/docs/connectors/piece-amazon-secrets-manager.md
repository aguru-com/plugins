# AWS Secrets Manager

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-amazon-secrets-manager'
  version: '0.2.1'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessKeyId` | string | yes |  | Access Key ID. |
| `secretAccessKey` | string | yes |  | Secret Access Key. |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-1"`, `"us-east-2"`, `"us-west-1"`, `"us-west-2"`, `"af-south-1"`, `"ap-east-1"`, `"ap-south-1"`, `"ap-northeast-3"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ap-northeast-1"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-south-1"`, `"eu-west-3"`, `"eu-north-1"`, `"me-south-1"`, `"sa-east-1"`, `"eu-south-2"`, `"ap-south-2"`, `"ap-southeast-3"` and 5 more. |

### `OIDC`: AWS Secrets Manager (IAM Role / OIDC)

> Connect your AWS account using an IAM Role via OIDC — no permanent keys required.
>
> Activepieces acts as an OIDC identity provider. AWS trusts this provider and issues temporary credentials via `AssumeRoleWithWebIdentity`.
>
> **Setup steps:**
> 1. In AWS IAM → Identity Providers → Create Provider:
> - Provider type: **OpenID Connect**
> - Provider URL: `{{frontendUrl}}`
> - Audience: `sts.amazonaws.com`
>
> > AWS fetches `{{frontendUrl}}/.well-known/openid-configuration` to discover the OIDC metadata. If your frontend and API run on different domains, make sure the API server is reachable at `{{frontendUrl}}` (or that your frontend proxies `/.well-known/*` to the API), otherwise `AssumeRoleWithWebIdentity` will fail.
> 2. Create an IAM Role with this trust policy:
> ```json
> {
> "Version": "2012-10-17",
> "Statement": [{
> "Effect": "Allow",
> "Principal": { "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/{{frontendHost}}" },
> "Action": "sts:AssumeRoleWithWebIdentity",
> "Condition": {
> "StringEquals": {
> "{{frontendHost}}:aud": "sts.amazonaws.com"
> },
> "StringLike": {
> "{{frontendHost}}:sub": "platform:{{platformId}}:project:{{projectId}}"
> }
> }
> }]
> }
> ```
> 3. Attach Secrets Manager permissions to the role (e.g. the `SecretsManagerReadWrite` policy) and paste the **Role ARN** below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roleArn` | string | yes |  | Role ARN. The ARN of the IAM role to assume (e.g. arn:aws:iam::123456789012:role/MyRole). |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-1"`, `"us-east-2"`, `"us-west-1"`, `"us-west-2"`, `"af-south-1"`, `"ap-east-1"`, `"ap-south-1"`, `"ap-northeast-3"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ap-northeast-1"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-south-1"`, `"eu-west-3"`, `"eu-north-1"`, `"me-south-1"`, `"sa-east-1"`, `"eu-south-2"`, `"ap-south-2"`, `"ap-southeast-3"` and 5 more. |

## Actions

### `createSecret`

**Create Secret.** Creates a new secret in AWS Secrets Manager in the connection's region, storing the supplied text value under a given name with optional description and tags. Use when provisioning a brand-new credential or config value to store. Not idempotent: the name must be unique, and re-running fails (or duplicates) rather than updating — use Update Secret to change an existing secret. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Secret Name. The name of the secret. |
| `secretValue` | string | yes |  | Secret Value. The secret value (text) |
| `description` | string | no |  | Description. A description of the secret (optional) |
| `tags` | array | no |  | Tags. Tags. Each item: { `key`, `value` }. |

### `getSecretValue`

**Get Secret Value.** Retrieves the stored value of a secret in AWS Secrets Manager, identified by name or ARN (selectable from a list or passed directly). Use when a flow needs the current credential/config held in a secret. Optionally targets a specific version ID or staging label, defaulting to the current (AWSCURRENT) version. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretId` | string | yes |  | Secret ID or ARN. The name or ARN of the secret. A value the product loads from the provider, such as an id; write the value itself. |
| `versionId` | string | no |  | Version ID. The unique identifier of the version (optional) |
| `versionStage` | string | no |  | Version Stage. The staging label to retrieve (defaults to AWSCURRENT) |

### `updateSecret`

**Update Secret.** Overwrites an existing AWS Secrets Manager secret (identified by name or ARN, selectable from a list or passed directly) with a new text value and optional description. Use when rotating or changing a credential that already exists; the secret must already exist. Repeating with the same value converges to the same stored value, so it is idempotent, though each call records a new version. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretId` | string | yes |  | Secret ID or ARN. The name or ARN of the secret. A value the product loads from the provider, such as an id; write the value itself. |
| `secretValue` | string | yes |  | Secret Value. The new secret value (text) |
| `description` | string | no |  | Description. Updated description of the secret (optional) |
| `clientRequestToken` | string | no |  | Client Request Token. A unique token to ensure idempotency (optional) |

### `deleteSecret`

**Delete Secret.** Deletes an existing AWS Secrets Manager secret (identified by name or ARN, selectable from a list or passed directly). By default schedules deletion after a recovery window (7-30 days, default 30) during which it can be restored; enabling force-delete removes it immediately and irreversibly. Use to decommission a credential. Destructive and not idempotent — a repeat call on an already-deleted secret errors. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretId` | string | yes |  | Secret ID or ARN. The name or ARN of the secret. A value the product loads from the provider, such as an id; write the value itself. |
| `recoveryWindowInDays` | number | no |  | Recovery Window (days). The number of days before the secret is permanently deleted (7-30, default 30). Set to 0 for immediate deletion. |
| `forceDeleteWithoutRecovery` | boolean | no |  | Force Delete Without Recovery. If enabled, the secret is deleted immediately without a recovery window. |

### `findSecret`

**Find Secret.** Lists/searches secrets in AWS Secrets Manager, filtering by a chosen field (name, description, tag key, tag value, primary region, owning service, or "all") against a search value, with optional max results and sort. Use to discover secrets or resolve a name/ARN before another action. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filterKey` | string | yes |  | Filter Key. The field to filter by. One of `"name"`, `"description"`, `"tag-key"`, `"tag-value"`, `"primary-region"`, `"owning-service"`, `"all"`. |
| `filterValue` | string | yes |  | Filter Value. The value to search for. |
| `maxResults` | number | no |  | Max Results. Maximum number of results to return (1-100) |
| `sortBy` | string | no |  | Sort By. Sort results by. One of `"created-date"`, `"last-accessed-date"`, `"last-changed-date"`, `"name"`. |
| `sortOrder` | string | no |  | Sort Order. Sort order for results. One of `"asc"`, `"desc"`. |

### `getARandomPassword`

**Generate Random Password.** Generates a random password using the AWS Secrets Manager service, with optional length and character-set controls (exclude specific characters/numbers/punctuation/case, include spaces, require each included type). Use when a flow needs a freshly generated strong password; it does not store anything. Not idempotent — each call returns a different password. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `passwordLength` | number | no |  | Password Length. The length of the password (default: 32) |
| `excludeCharacters` | string | no |  | Exclude Characters. Characters to exclude from the password. |
| `excludeNumbers` | boolean | no |  | Exclude Numbers. Exclude numbers from the password. |
| `excludePunctuation` | boolean | no |  | Exclude Punctuation. Exclude punctuation from the password. |
| `excludeUppercase` | boolean | no |  | Exclude Uppercase. Exclude uppercase letters from the password. |
| `excludeLowercase` | boolean | no |  | Exclude Lowercase. Exclude lowercase letters from the password. |
| `includeSpace` | boolean | no |  | Include Space. Include space character in the password. |
| `requireEachIncludedType` | boolean | no |  | Require Each Included Type. Require at least one of each included character type. |
