# CyberArk

Manage users, groups, and access controls in CyberArk Privileged Access Management

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cyberark'
  version: '0.1.8'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> CyberArk PVWA Authentication

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serverUrl` | string | yes |  | PVWA Server URL. The PVWA server URL (e.g., https://pvwa-server) |
| `username` | string | yes |  | Username. CyberArk username. |
| `password` | string | yes |  | Password. CyberArk password. |

## Actions

### `create_user`

**Create User.** Provisions a new user account in the CyberArk Vault with the given username, user type, authentication method, vault authorizations, and optional profile details. Use to onboard a Vault user. Not idempotent: each call creates another user, and a duplicate username will fail. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. The name of the user (max 128 characters) |
| `userType` | string | no | `"EPVUser"` | User Type. The user type according to license. |
| `initialPassword` | string | no |  | Initial Password. Password for first-time login (max 39 characters) |
| `authenticationMethod` | string | no | `"AuthTypePass"` | Authentication Method. The authentication method for login. One of `"AuthTypePass"`, `"AuthTypeRadius"`, `"AuthTypeLDAP"`. |
| `allowedAuthenticationMethods` | array | no |  | Allowed Authentication Methods. Non-Vault authentication methods the user can use. One of `"SAML"`, `"PKI"`. |
| `location` | string | no | `"\\\\"` | Location. Vault location for user creation (must start with \\) |
| `enableUser` | boolean | no | `true` | Enable User. Whether the user will be enabled upon creation. |
| `changePassOnNextLogon` | boolean | no | `true` | Change Password on Next Logon. User must change password on next login. |
| `passwordNeverExpires` | boolean | no | `false` | Password Never Expires. Password will not expire unless user changes it. |
| `description` | string | no |  | Description. Notes and comments (max 99 characters) |
| `vaultAuthorization` | array | no |  | Vault Authorization. User permissions. One of `"AddSafes"`, `"AuditUsers"`, `"AddUpdateUsers"`, `"ResetUsersPasswords"`, `"ActivateUsers"`, `"AddNetworkAreas"`, `"ManageDirectoryMapping"`, `"ManageServerFileCategories"`, `"BackupAllSafes"`, `"RestoreAllSafes"`. |
| `firstName` | string | no |  | First Name. First name (max 29 characters) |
| `middleName` | string | no |  | Middle Name. Middle name (max 29 characters) |
| `lastName` | string | no |  | Last Name. Last name (max 29 characters) |
| `homeEmail` | string | no |  | Home Email. Home email address (max 319 characters) |
| `businessEmail` | string | no |  | Business Email. Business email address (max 319 characters) |
| `homeNumber` | string | no |  | Home Phone. Home phone number (max 24 characters) |
| `businessNumber` | string | no |  | Business Phone. Business phone number (max 24 characters) |
| `cellularNumber` | string | no |  | Cellular Phone. Cellular phone number (max 24 characters) |
| `faxNumber` | string | no |  | Fax Number. Fax number (max 24 characters) |
| `pagerNumber` | string | no |  | Pager Number. Pager number (max 24 characters) |
| `expiryDate` | ISO date-time string | no |  | Expiry Date. Date when the user expires. |
| `unAuthorizedInterfaces` | array | no |  | Unauthorized Interfaces. Interfaces the user cannot access. One of `"PSM"`, `"PSMP"`, `"PVWA"`, `"WINCLIENT"`, `"PTA"`, `"PACLI"`, `"HTTPGW"`, `"EVD"`, `"PIMSu"`, `"AIMApp"`, `"CPM"`, `"PVWAApp"`, `"PSMApp"`, `"AppPrv"`, `"PSMPApp"`. |
| `workStreet` | string | no |  | Work Street. Business street address (max 29 characters) |
| `workCity` | string | no |  | Work City. Business city (max 19 characters) |
| `workState` | string | no |  | Work State. Business state (max 19 characters) |
| `workZip` | string | no |  | Work ZIP. Business ZIP code (max 19 characters) |
| `workCountry` | string | no |  | Work Country. Business country (max 19 characters) |
| `street` | string | no |  | Home Street. Home street address (max 29 characters) |
| `city` | string | no |  | Home City. Home city (max 19 characters) |
| `state` | string | no |  | Home State. Home state (max 19 characters) |
| `zip` | string | no |  | Home ZIP. Home ZIP code (max 19 characters) |
| `country` | string | no |  | Home Country. Home country (max 19 characters) |
| `title` | string | no |  | Title. Professional title (max 49 characters) |
| `organization` | string | no |  | Organization. Organization name (max 49 characters) |
| `department` | string | no |  | Department. Department (max 49 characters) |
| `profession` | string | no |  | Profession. Profession (max 49 characters) |
| `homePage` | string | no |  | Home Page. Personal website (max 319 characters) |
| `otherEmail` | string | no |  | Other Email. Additional email address (max 319 characters) |

### `update_user`

**Update User.** Updates the properties of an existing Vault user identified by user ID — including username, user type, enabled/suspended state, authentication methods, vault authorizations, and profile details. Use to modify an already-provisioned user; cannot target the built-in Master or Batch users. Idempotent: re-sending the same field values leaves the user in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select a user from the Vault (shows username, ID, type, and status) A value the product loads from the provider, such as an id; write the value itself. |
| `username` | string | yes |  | Username. The name of the user (max 128 characters) |
| `userType` | string | no | `"EPVUser"` | User Type. The user type according to license. |
| `enableUser` | boolean | no | `true` | Enable User. Whether the user is enabled. |
| `changePassOnNextLogon` | boolean | no | `true` | Change Password on Next Logon. User must change password on next login. |
| `passwordNeverExpires` | boolean | no | `false` | Password Never Expires. Password will not expire unless user changes it. |
| `suspended` | boolean | no | `false` | Suspended. Whether the user is suspended. |
| `expiryDate` | ISO date-time string | no |  | Expiry Date. Date when the user expires. |
| `userActivityLogRetentionDays` | number | no | `90` | Activity Log Retention Days. Days to retain user activity records (default: 90) |
| `authenticationMethod` | string | no | `"AuthTypePass"` | Authentication Method. The authentication method for login. One of `"AuthTypePass"`, `"AuthTypeRadius"`, `"AuthTypeLDAP"`. |
| `allowedAuthenticationMethods` | array | no |  | Allowed Authentication Methods. Non-Vault authentication methods the user can use. One of `"SAML"`, `"PKI"`. |
| `unAuthorizedInterfaces` | array | no |  | Unauthorized Interfaces. CyberArk interfaces this user cannot access. One of `"PIMSU"`, `"PSM"`, `"PSMP"`, `"PVWA"`, `"WINCLIENT"`, `"PTA"`, `"PACLI"`, `"HTTPGW"`, `"EVD"`, `"PIMSu"`, `"AIMApp"`, `"CPM"`, `"PVWAApp"`, `"PSMApp"`, `"AppPrv"`, `"PSMPApp"`. |
| `location` | string | no | `"\\\\"` | Location. Vault location (must start with \\) |
| `distinguishedName` | string | no |  | Distinguished Name. Distinguished name for PKI authentication. |
| `password` | string | no |  | Password. New password for the user (max 39 characters) |
| `description` | string | no |  | Description. Notes and comments (max 99 characters) |
| `vaultAuthorization` | array | no |  | Vault Authorization. User permissions. One of `"AddSafes"`, `"AuditUsers"`, `"AddUpdateUsers"`, `"ResetUsersPasswords"`, `"ActivateUsers"`, `"AddNetworkAreas"`, `"ManageDirectoryMapping"`, `"ManageServerFileCategories"`, `"BackupAllSafes"`, `"RestoreAllSafes"`. |
| `firstName` | string | no |  | First Name. First name (max 29 characters) |
| `middleName` | string | no |  | Middle Name. Middle name (max 29 characters) |
| `lastName` | string | no |  | Last Name. Last name (max 29 characters) |
| `title` | string | no |  | Title. Title (max 49 characters) |
| `organization` | string | no |  | Organization. Organization (max 49 characters) |
| `department` | string | no |  | Department. Department (max 49 characters) |
| `profession` | string | no |  | Profession. Profession (max 49 characters) |
| `street` | string | no |  | Street. Street address (max 29 characters) |
| `city` | string | no |  | City. City (max 19 characters) |
| `state` | string | no |  | State. State (max 19 characters) |
| `zip` | string | no |  | ZIP Code. ZIP code (max 19 characters) |
| `country` | string | no |  | Country. Country (max 19 characters) |
| `workStreet` | string | no |  | Work Street. Work street address (max 29 characters) |
| `workCity` | string | no |  | Work City. Work city (max 19 characters) |
| `workState` | string | no |  | Work State. Work state (max 19 characters) |
| `workZip` | string | no |  | Work ZIP. Work ZIP code (max 19 characters) |
| `workCountry` | string | no |  | Work Country. Work country (max 19 characters) |
| `homePage` | string | no |  | Home Page. Home page URL (max 319 characters) |
| `homeEmail` | string | no |  | Home Email. Home email address (max 319 characters) |
| `businessEmail` | string | no |  | Business Email. Business email address (max 319 characters) |
| `otherEmail` | string | no |  | Other Email. Other email address (max 319 characters) |
| `homeNumber` | string | no |  | Home Phone. Home phone number (max 24 characters) |
| `businessNumber` | string | no |  | Business Phone. Business phone number (max 24 characters) |
| `cellularNumber` | string | no |  | Cellular Phone. Cellular phone number (max 24 characters) |
| `faxNumber` | string | no |  | Fax Number. Fax number (max 24 characters) |
| `pagerNumber` | string | no |  | Pager Number. Pager number (max 24 characters) |
| `loginFromHour` | ISO date-time string | no |  | Login From Hour. Starting time when user can log in. |
| `loginToHour` | ISO date-time string | no |  | Login To Hour. Ending time when user can log in. |

### `delete_user`

**Delete User.** Permanently deletes a Vault user identified by user ID; requires Add/Update Users authorization and an explicit confirmation flag before it will proceed. Use to deprovision a user. Effectively idempotent: once the user is gone, repeating the call has no further effect (it targets a stable ID, not a create). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select a user from the Vault (shows username, ID, type, and status) A value the product loads from the provider, such as an id; write the value itself. |
| `confirmDeletion` | boolean | yes | `false` | Confirm Deletion. Check this box to confirm you want to delete the selected user. This action cannot be undone. |

### `activate_user`

**Activate User.** Reactivates a Vault user identified by user ID who was suspended after too many failed login attempts. Use to lift an automatic lockout. Idempotent: activating an already-active user leaves it active. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select a user from the Vault (shows username, ID, type, and status) A value the product loads from the provider, such as an id; write the value itself. |

### `enable_user`

**Enable User.** Enables a Vault user identified by user ID so they can authenticate and access the Vault. Use to restore access to a disabled account. Idempotent: enabling an already-enabled user leaves it enabled. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select a user from the Vault (shows username, ID, type, and status) A value the product loads from the provider, such as an id; write the value itself. |

### `disable_user`

**Disable User.** Disables a Vault user identified by user ID so they can no longer authenticate, without deleting the account. Use to temporarily revoke access. Idempotent: disabling an already-disabled user leaves it disabled. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Select a user from the Vault (shows username, ID, type, and status) A value the product loads from the provider, such as an id; write the value itself. |

### `find_user`

**Find User.** Searches and lists Vault users, optionally narrowing by filter (userType, componentUser, userName), free-text search, user type, sort, and pagination; with no criteria it returns all users. Use to look up a user ID or discover existing users before acting on them. Requires Audit Users permissions. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | string | no |  | Filter. Filter users by userType, componentUser, or userName. |
| `search` | string | no |  | Search. Search by username, firstname, or lastname. |
| `sort` | string | no |  | Sort. Sort by property (username, source, userType, location, lastname, firstname, middlename) followed by asc/desc. |
| `extendedDetails` | boolean | no | `false` | Extended Details. Returns additional user details including groups and userDN for LDAP users. |
| `pageOffset` | number | no | `0` | Page Offset. Offset the first user returned in results. |
| `pageSize` | number | no | `0` | Page Size. Maximum number of users to return (used with offset) |
| `componentUser` | boolean | no |  | Component User Only. Filter to show only component users. |
| `userType` | string | no |  | User Type. Filter by specific user type. One of `"EPVUser"`, `"Built-InAdmins"`, `"LDAP"`, `"CPM"`, `"PVWA"`, `"PSM"`, `"AppProvider"`, `""`. |

### `add_member_to_group`

**Add Member to Group.** Adds a member to an existing Vault user group, where the member is either a Vault user or a domain user (domain mode requires the domain DNS name). Use to grant group-based permissions. Requires Add/Update Users permissions. Effectively idempotent on the membership keyed by group and member, though re-adding an existing member may surface an error. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group. Select a group from the Vault. A value the product loads from the provider, such as an id; write the value itself. |
| `memberId` | string | yes |  | Member. Select a Vault user or enter LDAP group name to add to the group. A value the product loads from the provider, such as an id; write the value itself. |
| `memberType` | string | yes | `"Vault"` | Member Type. The type of user being added to the Vault group. One of `"Vault"`, `"domain"`. |
| `domainName` | string | no |  | Domain Name. The DNS address of the domain (required if memberType is domain) |

### `remove_member_from_group`

**Remove Member from Group.** Removes a member from a Vault user group, identified by group ID and member ID. Use to revoke a user's group-based permissions. Effectively idempotent: once removed, repeating the call has no further effect on the membership. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group. Select a group from the Vault. A value the product loads from the provider, such as an id; write the value itself. |
| `memberId` | string | yes |  | Member. Select a Vault user or enter LDAP group name to add to the group. A value the product loads from the provider, such as an id; write the value itself. |

### `get_password_value`

**Get Password Value.** Retrieves the secret (password or SSH key) of a stored CyberArk account by its account ID, optionally for a specific version and with an audit reason/ticket reference. Use to fetch a credential for downstream use; the retrieval itself does not change the stored secret, so repeating it returns the same value (it is logged for audit each time). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account. Select an account from the Vault. A value the product loads from the provider, such as an id; write the value itself. |
| `reason` | string | no |  | Reason. The reason for retrieving the password/SSH key. |
| `ticketingSystemName` | string | no |  | Ticketing System Name. The name of the Ticketing System. |
| `ticketId` | string | no |  | Ticket ID. The ticket ID of the ticketing system. |
| `version` | number | no |  | Version. The version number of the required password. If there are no previous versions, the current password/key version is returned. |
| `actionType` | string | no |  | Action Type. The action this password will be used for. One of `"show"`, `"copy"`, `"connect"`. |
| `isUse` | boolean | no | `false` | Is Use. Internal parameter (for PSM for SSH only) |
| `machine` | string | no |  | Machine. The address of the remote machine to connect to. |

### `retrieve_private_ssh_key`

**Retrieve Private SSH Key.** Retrieves the private SSH key secret of a stored CyberArk account by its account ID, optionally for a specific version and with an audit reason/ticket reference. Use to fetch an SSH private key for downstream use; the retrieval does not alter the stored key, so repeating it returns the same value (logged for audit each time). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account. Select an account from the Vault. A value the product loads from the provider, such as an id; write the value itself. |
| `reason` | string | no |  | Reason. The reason for retrieving the private SSH key. |
| `ticketingSystemName` | string | no |  | Ticketing System Name. The name of the ticketing system. |
| `ticketId` | string | no |  | Ticket ID. The ticket ID defined in the ticketing system. |
| `version` | number | no |  | Version. The version number of the required SSH key. Must be a positive number. If left empty or the value does not exist, the current SSH key version is returned. |
| `actionType` | string | no |  | Action Type. The action this SSH key is used for. One of `"download"`. |
| `isUse` | boolean | no | `false` | Is Use. Internal parameter (for use of PSMP only) |
| `machine` | string | no |  | Machine. The address of the remote machine to connect to using the SSH key. |

### `change_credentials_in_vault`

**Change Credentials in the Vault.** Sets a new credential value for a stored CyberArk account (by account ID) and updates it in the Vault only — it does NOT change the credential on the target device, so the Vault may end up out of sync with the managed system. Use when you need to record a known credential in the Vault. Not idempotent: each call writes a new Vault password version. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account. Select an account from the Vault. A value the product loads from the provider, such as an id; write the value itself. |
| `newCredentials` | string | yes |  | New Credentials. The new account credentials that will be allocated to the account in the Vault. Leading and trailing white spaces will be automatically removed. |

### `verify_credentials_bulk`

**Verify Credentials in Bulk.** Flags a list of CyberArk accounts (by account ID) for credential verification by the CPM, which checks that the stored credential still matches the target device. Use to trigger a verification sweep across many accounts at once. Effectively idempotent: it only marks the accounts for verification rather than mutating any credential. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountIds` | array | yes |  | Account IDs. List of unique account IDs to verify. |

### `change_credentials_bulk`

**Change Credentials Immediately in Bulk.** Marks a list of CyberArk accounts (by account ID) for an immediate CPM credential change to a new random value on both the Vault and the target device, optionally rotating every account in the same account group. Use to force a rotation across many accounts at once. Not idempotent: each call triggers another rotation to a fresh random secret. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountIds` | array | yes |  | Account IDs. List of unique account IDs to change credentials for. |
| `changeEntireGroup` | boolean | no | `false` | Change Entire Group. Whether the CPM changes the credentials for all accounts in the same account group. Only applies to accounts that belong to an account group. |

### `set_next_password_bulk`

**Set Next Password in Bulk.** Sets the specific credential value the CPM will apply on the next change for a list of CyberArk accounts (each item carries an account ID, an optional changeImmediately flag, and the new credentials). Use to pre-stage a known password for accounts rather than letting the CPM pick a random one. Not idempotent: each call writes a new pending/applied credential and, when changeImmediately is set, triggers a change. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bulkItems` | array | yes |  | Bulk Items. List of account items. Each item should be a JSON object with accountId (required), changeImmediately (optional), and newCredentials (optional). |

### `change_credentials_in_vault_bulk`

**Change Credentials in the Vault in Bulk.** Sets new credential values for a list of CyberArk accounts (each item carries an account ID and optional new credentials) and updates them in the Vault only — it does NOT change the credentials on the target devices, so the Vault may end up out of sync. Use to record known credentials for many accounts at once. Not idempotent: each call writes a new Vault password version. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bulkItems` | array | yes |  | Bulk Items. List of account items. Each item should be a JSON object with accountId (required) and newCredentials (optional). |

### `reconcile_credentials_bulk`

**Reconcile Credentials in Bulk.** Flags a list of CyberArk accounts (by account ID) for automatic reconciliation by the CPM, which resets the credential on both the Vault and the target device using the reconciliation account. Use to recover accounts whose stored and device credentials have diverged. Effectively idempotent: it only marks the accounts for reconciliation rather than mutating a credential per call. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountIds` | array | yes |  | Account IDs. List of unique account IDs to reconcile. |
