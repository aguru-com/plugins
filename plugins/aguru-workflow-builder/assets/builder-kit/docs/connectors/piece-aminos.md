# Aminos

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-aminos'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter Aminos One authentication details

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Base URL. Enter the base URL. |
| `access_token` | string | yes |  | API key. Enter the API key from your Aminos One panel. |

## Actions

### `createUser`

**Create User on Aminos One.** Provisions a new user account on an Aminos One panel by POSTing the user email, display name, and a numeric plan ID to the configured panel base URL. Use to onboard a customer or assign them to a specific pricing plan. Not idempotent: each call attempts a fresh creation and the panel returns an error if the email already exists, so it is not a safe retry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `useremail` | string | yes |  | Username (e-mail). Username, should be an e-mail address. |
| `userfriendlyname` | string | yes |  | Name of user. The name of the user. |
| `userplanid` | number | yes |  | Plan ID. Plan ID number from the plans in your Aminos One panel. |
