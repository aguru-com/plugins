# Okta

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-okta'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Okta Domain. Your Okta organization domain (e.g., https://dev-12345.okta.com or dev-12345.okta.com) |
| `apiToken` | string | yes |  | API Token. Your Okta API token (from Admin → Security → API → Tokens) |

## Actions

### `create_user`

**Create User.** Creates a new user account in Okta from a first name, last name, and email (login defaults to the email). Use to provision a person into the org; optionally activates and sends the account-setup email when Send Email is enabled. Not idempotent — each call creates another user, so guard against duplicates by checking for an existing account first. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First Name. User first name. |
| `lastName` | string | yes |  | Last Name. User last name. |
| `email` | string | yes |  | Email. User email address. |
| `login` | string | no |  | Login. User login (typically same as email) |
| `mobilePhone` | string | no |  | Mobile Phone. User mobile phone number. |
| `sendEmail` | boolean | no | `true` | Send Email. Send account creation email to user. |

### `activate_user`

**Activate User.** Transitions an existing Okta user (identified by user ID) to the ACTIVE lifecycle state, optionally emailing them an activation link. Use to re-enable a deactivated or pending account. Idempotent on end-state — re-running leaves the user active, though it may re-send the activation email if that option is on. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select a user. A value the product loads from the provider, such as an id; write the value itself. |
| `sendEmail` | boolean | no | `false` | Send Email. Send activation email to user. |

### `deactivate_user`

**Deactivate User.** Transitions an existing Okta user (by user ID) to the DEACTIVATED lifecycle state, disabling their access while preserving the account. Use to offboard or temporarily disable someone. Idempotent on end-state — re-running leaves the user deactivated, though it may re-send the notification email if that option is on. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select a user. A value the product loads from the provider, such as an id; write the value itself. |
| `sendEmail` | boolean | no | `false` | Send Email. Send deactivation email to user. |

### `suspend_user`

**Suspend User.** Transitions an existing Okta user (by user ID) to the SUSPENDED lifecycle state, temporarily blocking sign-in without deactivating the account. Use for a reversible hold; reverse it with the unsuspend/activate flow. Idempotent on end-state — re-running leaves the user suspended. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select a user. A value the product loads from the provider, such as an id; write the value itself. |

### `add_user_to_group`

**Add User to Group.** Adds an existing user to a specific Okta group, identified by user ID and group ID. Use to grant group-based access or roles. Idempotent — adding a user who is already a member leaves membership unchanged. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select a user. A value the product loads from the provider, such as an id; write the value itself. |
| `groupId` | string | yes |  | Group. Select a group. A value the product loads from the provider, such as an id; write the value itself. |

### `remove_user_from_group`

**Remove User from Group.** Removes a user from a specific Okta group, identified by group ID and user ID. Use to revoke group-based access or roles. Idempotent — removing a user who is not a member leaves membership unchanged. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group. Select a group. A value the product loads from the provider, such as an id; write the value itself. |
| `userId` | string | yes |  | User. Select a user. A value the product loads from the provider, such as an id; write the value itself. |

### `update_user`

**Update User.** Updates an existing Okta user profile (by user ID) with any supplied fields — first/last name, email, mobile phone, plus arbitrary custom attributes via a JSON object; only provided fields are sent. Use to edit a known account. Idempotent — applying the same values again yields the same profile state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select a user. A value the product loads from the provider, such as an id; write the value itself. |
| `firstName` | string | no |  | First Name. Updated first name. |
| `lastName` | string | no |  | Last Name. Updated last name. |
| `email` | string | no |  | Email. Updated email address. |
| `mobilePhone` | string | no |  | Mobile Phone. Updated mobile phone number. |
| `customAttributes` | JSON | no |  | Custom Attributes. JSON object with custom profile attributes. |

### `find_user_by_email`

**Find User by Email.** Searches Okta for a user by exact email address and returns the first match. Use as a read-only lookup to resolve an email to an Okta user (e.g. to obtain a user ID before a lifecycle or group action). Idempotent — returns a not-found indicator when no user matches. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The user email address. |

### `find_group_by_name`

**Find Group by Name.** Searches Okta groups by name (substring query) and returns matching groups. Use as a read-only lookup to resolve a group name to its ID before a membership action. Idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupName` | string | yes |  | Group Name. The group name to search for. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | no |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | no |  | Query Parameters. Appended to the URL as ?key=value. |
| `body_type` | string | no | `"none"` | Body Type. One of `"none"`, `"json"`, `"form_data"`, `"raw"`. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | Return Error as Output. On a failed request, output the error instead of failing the step. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning them as the response. |
