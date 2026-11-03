# Azure Active Directory

Manage users, groups, and licenses in Microsoft Entra ID (Azure AD) via Microsoft Graph.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-azure-ad'
  version: '0.3.2'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> If you'd like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Microsoft Graph (Delegated) permissions** under **API permissions** (the app must expose the full set; the **Permissions** dropdown below only controls which of them are requested per connection):
> - User.Read.All
> - User.ReadWrite.All
> - Group.ReadWrite.All
> - Directory.Read.All
> - LicenseAssignment.ReadWrite.All
> - User.RevokeSessions.All
> - offline_access
>
> The **Permissions** dropdown picks which of those scopes are requested for this connection. Tiers are additive (each includes everything above it); every tier also includes `User.Read.All` (so the connection can be validated) and `offline_access` (so it can refresh):
> - **Read only (users & directory)** — `User.Read.All`, `Directory.Read.All`
> - **User management** — adds `User.ReadWrite.All`, `User.RevokeSessions.All`
> - **User & group management** — adds `Group.ReadWrite.All`
> - **Full management (users, groups, licenses)** — adds `LicenseAssignment.ReadWrite.All`
>
> Leave **Tenant ID** as `common` for the default multi-tenant flow, or set it to your Directory (tenant) ID if your app registration is single-tenant.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenantId` | string | yes | `"common"` | Tenant ID. Use "common" for the default multi-tenant flow, or your Directory (tenant) ID (a GUID) / "<name>.onmicrosoft.com" domain for a single-tenant app registration. |
| `permissions` | string | yes | `"User.Read.All User.ReadWrite.All Group.ReadWrite.All Directory.Read.All LicenseAssignment.ReadWrite.All User.RevokeSessions.All offline_access openid email profile"` | Permissions. Choose the level of access to request. Tiers are additive - each includes everything below it. Group actions (create group, add/remove members) require "User & group management" or higher. All options include sign-in (offline_access) so the connection can refresh, and basic user read so the connect… One of `"User.Read.All Directory.Read.All offline_access openid email profile"`, `"User.Read.All User.ReadWrite.All User.RevokeSessions.All Directory.Read.All offline_access openid email profile"`, `"User.Read.All User.ReadWrite.All User.RevokeSessions.All Group.ReadWrite.All Directory.Read.All offline_access openid email profile"`, `"User.Read.All User.ReadWrite.All Group.ReadWrite.All Directory.Read.All LicenseAssignment.ReadWrite.All User.RevokeSessions.All offline_access openid email profile"`. |

## Actions

### `add_member_to_group`

**Add Member to Group.** Adds an existing user or group (by directory object ID) as a member of an Azure AD group. Use when granting group-based access or distribution membership; both the group and the member must already exist. Not idempotent — re-adding someone who is already a member fails with a Graph error, so check membership with List Group Members first if unsure. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group. Select the group. Groups are loaded from your Microsoft Entra ID directory. A value the product loads from the provider, such as an id; write the value itself. |
| `memberId` | string | yes |  | Member. Select the user or group to add as a member. A value the product loads from the provider, such as an id; write the value itself. |

### `add_or_remove_user_license`

**Add or Remove User License.** Assigns and/or removes Microsoft 365 license SKUs for an existing user in one call: pass skuId entries to add (optionally with disabledPlans to switch off specific service plans) and SKU ID strings to remove. The user must have a usageLocation set before licenses can be assigned. Not idempotent — removing a license the user does not hold fails, so verify current assignments before retrying. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select the user. Users are loaded from your Microsoft Entra ID directory. A value the product loads from the provider, such as an id; write the value itself. |
| `addLicenses` | JSON | no | `[]` | Add Licenses. JSON array of license assignments. Example: [{"skuId":"sku-guid"}] or [{"skuId":"sku-guid","disabledPlans":["plan-guid-1"]}] to disable specific plans. |
| `removeLicenses` | JSON | no | `[]` | Remove Licenses. JSON array of SKU IDs (strings) to remove. Example: ["sku-guid-1","sku-guid-2"]. |

### `create_group`

**Create Group.** Creates a new Azure AD security or Microsoft 365 group with a display name and a unique mail nickname (toggle mailEnabled/securityEnabled for the group type). Use only when provisioning a fresh group, not to modify an existing one. Not idempotent — display names are not unique, so repeating the call can create duplicate groups. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `displayName` | string | yes |  | Display Name. The display name of the group. |
| `description` | string | no |  | Description. Optional description for the group. |
| `mailNickname` | string | yes |  | Mail Nickname. Mail alias (e.g. "team-alpha"). Used for mail-enabled groups; must be unique. |
| `mailEnabled` | boolean | no | `false` | Mail Enabled. Set to true for a mail-enabled security or Microsoft 365 group. |
| `securityEnabled` | boolean | no | `true` | Security Enabled. Set to true for a security group. |

### `create_user`

**Create User.** Provisions a new Microsoft Entra ID (Azure AD) user with a unique user principal name, initial password, and optional profile fields; set usageLocation if licenses will be assigned afterwards. Not idempotent — a retry fails on the duplicate UPN rather than updating the account. Use Update User to change an existing user instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `displayName` | string | yes |  | Display Name. The name displayed in the address book for the user. |
| `userPrincipalName` | string | yes |  | User Principal Name. The sign-in name (UPN), e.g. ada@contoso.onmicrosoft.com. |
| `mailNickname` | string | yes |  | Mail Nickname. The mail alias for the user (local part, no @domain). |
| `password` | string | yes |  | Password. Initial password for the user. Must satisfy your tenant password policy. |
| `forceChangePasswordNextSignIn` | boolean | no | `true` | Force Password Change on Next Sign-in. If enabled, the user must change their password at first sign-in. |
| `accountEnabled` | boolean | no | `true` | Account Enabled. Whether the user can sign in. |
| `givenName` | string | no |  | Given Name. |
| `surname` | string | no |  | Surname. |
| `jobTitle` | string | no |  | Job Title. |
| `mail` | string | no |  | Mail. Primary SMTP address. |
| `mobilePhone` | string | no |  | Mobile Phone. |
| `usageLocation` | string | no |  | Usage Location. Two-letter ISO 3166 country code (e.g. "US"). Required before assigning licenses. |

### `delete_group`

**Delete Group.** Permanently deletes an Azure AD group by its object ID, removing its memberships with it. Destructive and not idempotent — a repeat call fails with 404 once the group is gone, so confirm the target with Get Group by ID before deleting. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group. Select the group. Groups are loaded from your Microsoft Entra ID directory. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_user`

**Delete User.** Permanently deletes an Azure AD user account by object ID or user principal name. Destructive and not idempotent — repeating the call fails with 404 after the first success. If the removal may need to be reversed, prefer disabling sign-in via Update User (accountEnabled) instead. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select the user. Users are loaded from your Microsoft Entra ID directory. A value the product loads from the provider, such as an id; write the value itself. |

### `get_enabled_users`

**Get Enabled Users.** Fetches a single page (up to 999) of directory users whose accounts are enabled. Read-only and idempotent. Pick List Enabled Users instead when you need the complete set across all pages, or List Users for arbitrary OData filters. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `top` | number | no | `100` | Top. Maximum number of users to return (1–999). Default 100. |

### `get_group_by_id`

**Get Group by ID.** Retrieves one Azure AD group profile (name, description, mail settings, security flags) by its object ID. Read-only and idempotent; use it to confirm a group exists or inspect it before membership changes or deletion. For extension attributes, use Get Group Custom Attributes instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group. Select the group. Groups are loaded from your Microsoft Entra ID directory. A value the product loads from the provider, such as an id; write the value itself. |

### `get_group_custom_attributes`

**Get Group Custom Attributes.** Reads only the extension/custom attributes (extension_* and ext_* properties) of an Azure AD group, along with its ID and display name. Read-only and idempotent. Pick Get Group by ID when you need the standard group profile rather than custom attributes. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group. Select the group. Groups are loaded from your Microsoft Entra ID directory. A value the product loads from the provider, such as an id; write the value itself. |

### `get_user_by_id`

**Get User by ID.** Retrieves a single Azure AD user profile by object ID or user principal name. Read-only and idempotent; use it to verify a user exists or fetch their details before update, license, or delete operations. Use List Users when you only know a partial name or other attribute. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select the user. Users are loaded from your Microsoft Entra ID directory. A value the product loads from the provider, such as an id; write the value itself. |

### `list_enabled_users`

**List Enabled Users.** Lists every enabled user in the directory, automatically following pagination until all pages are fetched. Read-only and idempotent, but can be slow and return very large results in big tenants — use Get Enabled Users when a single bounded page is enough. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageSize` | number | no | `100` | Page Size. Number of users per page (1–999). Default 100. |

### `list_group_members`

**List Group Members.** Lists the direct members (users, groups, devices) of an Azure AD group, returning only the first page of up to 999 entries. Read-only and idempotent. Note it does not expand transitive/nested group membership. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group. Select the group. Groups are loaded from your Microsoft Entra ID directory. A value the product loads from the provider, such as an id; write the value itself. |
| `top` | number | no | `100` | Top. Maximum number of members to return (1–999). Default 100. |

### `list_users`

**List Users.** Lists directory users with an optional OData $filter expression and a page-size cap (max 999), returning only the first page. Read-only and idempotent — the most flexible user search when you need filtering beyond enabled-only; use Get User by ID when you already know the exact user. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `top` | number | no | `100` | Top. Maximum number of users to return (1–999). Default 100. |
| `filter` | string | no |  | Filter. OData filter (e.g. startswith(displayName,'A')). Optional. |

### `reset_custom_attributes`

**Reset Custom Attributes.** Clears extension/custom attribute values on a chosen user or group by setting them to null; pass specific extension property names, or leave empty to clear every detected extension_*/ext_* key (broader blast radius). Destructive to the attribute data but idempotent — re-running finds nothing left to clear and becomes a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceType` | string | yes |  | Resource Type. User or Group. One of `"users"`, `"groups"`. |
| `resourceId` | string | yes |  | Resource. Select the user or group to clear extension attributes from. A value the product loads from the provider, such as an id; write the value itself. |
| `extensionNames` | string | no |  | Extension Property Names. Comma-separated extension property names to clear (e.g. extension_xxx_AttributeName). Leave empty to clear known extension keys. |

### `revoke_sign_in_session`

**Revoke Sign-in Session.** Invalidates all of a user's refresh and session tokens, forcing re-authentication on every device — use to cut off access after a compromise or during offboarding, typically alongside disabling the account. Safe to repeat: calling it again just renews the revocation. It does not disable the account or reset the password. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select the user. Users are loaded from your Microsoft Entra ID directory. A value the product loads from the provider, such as an id; write the value itself. |

### `update_user`

**Update User.** Updates profile fields (display name, given name/surname, job title, mail, mobile phone, accountEnabled) on an existing Azure AD user; only the supplied fields change, and at least one is required. Idempotent — re-applying the same values leaves the same state. Also the way to disable or re-enable sign-in via accountEnabled without deleting the account. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select the user. Users are loaded from your Microsoft Entra ID directory. A value the product loads from the provider, such as an id; write the value itself. |
| `displayName` | string | no |  | Display Name. |
| `givenName` | string | no |  | Given Name. |
| `surname` | string | no |  | Surname. |
| `jobTitle` | string | no |  | Job Title. |
| `mail` | string | no |  | Mail. Primary SMTP address. |
| `mobilePhone` | string | no |  | Mobile Phone. |
| `accountEnabled` | boolean | no |  | Account Enabled. |

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
