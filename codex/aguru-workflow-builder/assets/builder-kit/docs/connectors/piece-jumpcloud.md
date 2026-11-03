# JumpCloud

Manage JumpCloud users, devices, groups and applications.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-jumpcloud'
  version: '0.0.2'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: JumpCloud Connection

> Connect with a JumpCloud administrator API key.
>
> 1. Sign in to the [JumpCloud Admin Portal](https://console.jumpcloud.com).
> 2. Click your account initials in the top-right corner and choose **My API Key**.
> 3. Generate a key if you have none, copy it and paste it below.
> 4. Pick the region your organization lives in. Use **EU** if you sign in at console.eu.jumpcloud.com, **India** for console.in.jumpcloud.com.
>
> The key acts with the permissions of the admin who owns it.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. The administrator API key from My API Key in the Admin Portal. |
| `region` | string | yes | `"us"` | Region. The data center your JumpCloud organization lives in. One of `"us"`, `"eu"`, `"in"`. |
| `orgId` | string | no |  | Organization ID. Only needed if you manage several organizations (multi-tenant admin). Find it in the Admin Portal under Settings > Organization Profile. Leave empty otherwise. |

## Actions

### `create_object`

**Create Object.** Creates a JumpCloud user, user group, device group or SSO/bookmark application and returns it with its new ID. Users need a unique username and email; groups a unique name; applications a display label and URL. Systems (devices) cannot be created through the API. Each call creates a new object, so retries fail on the duplicate name or create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes | `"user"` | Object Type. The kind of JumpCloud object to work with. One of `"user"`, `"user_group"`, `"system_group"`, `"application"`. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |
| `additionalFields` | JSON | no |  | Additional Fields. Any other JumpCloud fields for this object, as a JSON object, for example {"phoneNumbers": [{"type": "work", "number": "+1 555 0100"}]}. Fields above take precedence. See the JumpCloud API reference for the field names. |

### `update_object`

**Update Object.** Updates the given fields of one JumpCloud user, system (device), user group, device group or SSO application by ID and returns the updated object. Only provided fields change; to lock or unlock a user use Lock User / Unlock User. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes | `"user"` | Object Type. The kind of JumpCloud object to work with. One of `"user"`, `"system"`, `"user_group"`, `"system_group"`, `"application"`. |
| `objectId` | string | yes |  | Object. Pick the object, or type to search by name. You can also map an ID from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields to Change. Only filled-in fields are changed. Empty fields keep their current value. An object whose fields depend on other inputs; the product shows them. |
| `additionalFields` | JSON | no |  | Additional Fields. Any other JumpCloud fields for this object, as a JSON object, for example {"phoneNumbers": [{"type": "work", "number": "+1 555 0100"}]}. Fields above take precedence. See the JumpCloud API reference for the field names. |

### `delete_object`

**Delete Object.** Permanently deletes one JumpCloud user, system (device), user group, device group or SSO application by ID. Deleting a system removes it from management; deleting a user removes their access everywhere JumpCloud provisions it. Prefer Lock User to suspend access reversibly. Not safe to retry: a second call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes | `"user"` | Object Type. The kind of JumpCloud object to work with. One of `"user"`, `"system"`, `"user_group"`, `"system_group"`, `"application"`. |
| `objectId` | string | yes |  | Object. The object to delete. This cannot be undone. A value the product loads from the provider, such as an id; write the value itself. |

### `get_object`

**Get Object by ID.** Fetches one JumpCloud user, system (device), user group, device group or SSO application by its ID and returns its main fields plus the complete JumpCloud record under raw. Use List Objects by ID for several IDs at once, or Search Objects when you only know a name or attribute. Safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes | `"user"` | Object Type. The kind of JumpCloud object to work with. One of `"user"`, `"system"`, `"user_group"`, `"system_group"`, `"application"`. |
| `objectId` | string | yes |  | Object. Pick the object, or type to search by name. You can also map an ID from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |

### `list_objects`

**List Objects (Batch).** Lists JumpCloud objects of one type (users, systems/devices, user groups, device groups or SSO applications) in a stable order, with paging. Returns items plus total_count and next_skip; pass next_skip back as Skip to continue. Use Search Objects to filter by name or field. Safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes | `"user"` | Object Type. The kind of JumpCloud object to work with. One of `"user"`, `"system"`, `"user_group"`, `"system_group"`, `"application"`. |
| `limit` | number | no | `50` | Max Results. How many objects to return per run, from 1 to 100. Ignored when Fetch All Pages is on. |
| `skip` | number | no | `0` | Skip. How many objects to skip before the first result. Use the Next Skip value from a previous run to get the next page. |
| `fetchAll` | boolean | no | `false` | Fetch All Pages. Keep requesting pages until every object is returned, up to Max Objects. |
| `maxItems` | number | no | `1000` | Max Objects. Safety cap when fetching all pages, up to 10000. |

### `list_objects_by_id`

**List Objects by ID (Batch).** Fetches JumpCloud objects of one type for a list of IDs and returns them in the order given, plus missing_ids for IDs that were not found. Pages over the ID list with Max Results / Skip. Use Get Object by ID for a single object. Safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes | `"user"` | Object Type. The kind of JumpCloud object to work with. One of `"user"`, `"system"`, `"user_group"`, `"system_group"`, `"application"`. |
| `ids` | array | yes |  | Object IDs. The IDs to fetch. Map a list from an earlier step or add them one by one. Duplicates are ignored. |
| `limit` | number | no | `50` | Max Results. How many objects to return per run, from 1 to 100. Ignored when Fetch All Pages is on. |
| `skip` | number | no | `0` | Skip. How many objects to skip before the first result. Use the Next Skip value from a previous run to get the next page. |
| `fetchAll` | boolean | no | `false` | Fetch All Pages. Keep requesting pages until every object is returned, up to Max Objects. |
| `maxItems` | number | no | `1000` | Max Objects. Safety cap when fetching all pages, up to 10000. |

### `search_objects`

**Search Objects (Batch).** Searches JumpCloud objects of one type either by free text (names, usernames, emails, hostnames) or by one field condition such as department equals Finance, with paging. Returns items plus total_count and next_skip. Use Search User by Employee ID for that exact lookup. Safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes | `"user"` | Object Type. The kind of JumpCloud object to work with. One of `"user"`, `"system"`, `"user_group"`, `"system_group"`, `"application"`. |
| `searchText` | string | no |  | Search Text. Matches names, usernames, emails or hostnames. Leave empty to filter by a field instead. |
| `filterField` | string | no |  | Filter Field. A JumpCloud field name, for example department, jobTitle, email or name. Leave empty to search by text. |
| `filterOperator` | string | no | `"equals"` | Filter Operator. One of `"equals"`, `"not_equals"`, `"starts_with"`, `"in"`, `"greater_than"`, `"greater_or_equal"`, `"less_than"`, `"less_or_equal"`. |
| `filterValue` | string | no |  | Filter Value. The value to compare with. Matching is case-sensitive. |
| `limit` | number | no | `50` | Max Results. How many objects to return per run, from 1 to 100. Ignored when Fetch All Pages is on. |
| `skip` | number | no | `0` | Skip. How many objects to skip before the first result. Use the Next Skip value from a previous run to get the next page. |
| `fetchAll` | boolean | no | `false` | Fetch All Pages. Keep requesting pages until every object is returned, up to Max Objects. |
| `maxItems` | number | no | `1000` | Max Objects. Safety cap when fetching all pages, up to 10000. |

### `create_association`

**Create Association.** Associates two JumpCloud objects: user group or device group membership, or access between users/user groups and devices, device groups and SSO applications. Errors when the pair cannot be associated and lists the valid targets. Re-adding an existing association may fail with a conflict, so check before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes | `"user"` | Object Type. The kind of the first object. One of `"user"`, `"system"`, `"user_group"`, `"system_group"`, `"application"`. |
| `objectId` | string | yes |  | Object. Pick the object, or type to search by name. You can also map an ID from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `targetType` | string | yes | `"user"` | Associate With. The kind of object to link it to. One of `"user"`, `"system"`, `"user_group"`, `"system_group"`, `"application"`. |
| `targetId` | string | yes |  | Associated Object. Pick the object, or type to search by name. You can also map an ID from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `object_type`: Object Type
- `object_id`: Object ID
- `associated_type`: Associated Type
- `associated_id`: Associated Object ID
- `associated`: Associated (boolean)

### `delete_association`

**Delete Association.** Removes the association between two JumpCloud objects: group membership, or access between users/user groups and devices, device groups and SSO applications. Access is revoked at the next agent check-in or sign-in. Not safe to retry blindly: a second call may fail because the association is already gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes | `"user"` | Object Type. The kind of the first object. One of `"user"`, `"system"`, `"user_group"`, `"system_group"`, `"application"`. |
| `objectId` | string | yes |  | Object. Pick the object, or type to search by name. You can also map an ID from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `targetType` | string | yes | `"user"` | Remove Association With. The kind of object to unlink it from. One of `"user"`, `"system"`, `"user_group"`, `"system_group"`, `"application"`. |
| `targetId` | string | yes |  | Associated Object. Pick the object, or type to search by name. You can also map an ID from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `object_type`: Object Type
- `object_id`: Object ID
- `associated_type`: Associated Type
- `associated_id`: Associated Object ID
- `associated`: Associated (boolean)

### `find_user_by_employee_id`

**Search User by Employee ID.** Looks up the JumpCloud user whose employeeIdentifier exactly matches the given value (case-sensitive) and returns found plus the user fields, or found=false with empty fields. Use Search Objects for partial or other-field matches. Safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `employeeId` | string | yes |  | Employee ID. The exact employee ID stored on the user in JumpCloud. Matching is case-sensitive. |

Output fields:

- `found`: Found (boolean)
- `id`: User ID
- `username`: Username
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `display_name`: Display Name
- `employee_id`: Employee ID
- `employee_type`: Employee Type
- `job_title`: Job Title
- `department`: Department
- `company`: Company
- `cost_center`: Cost Center
- `location`: Location
- `manager_id`: Manager ID
- `state`: State
- `activated`: Activated (boolean)
- `account_locked`: Account Locked (boolean)
- `suspended`: Suspended (boolean)
- `password_expired`: Password Expired (boolean)
- `mfa_configured`: MFA Configured (boolean)
- `totp_enabled`: TOTP Enabled (boolean)
- `created`: Created (datetime)

### `lock_user`

**Lock User.** Locks a JumpCloud user account (account_locked=true), blocking sign-in everywhere JumpCloud authenticates them, and returns the user. Reversible with Unlock User; prefer it over Delete Object to cut access temporarily. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Pick the object, or type to search by name. You can also map an ID from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: User ID
- `username`: Username
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `display_name`: Display Name
- `employee_id`: Employee ID
- `employee_type`: Employee Type
- `job_title`: Job Title
- `department`: Department
- `company`: Company
- `cost_center`: Cost Center
- `location`: Location
- `manager_id`: Manager ID
- `state`: State
- `activated`: Activated (boolean)
- `account_locked`: Account Locked (boolean)
- `suspended`: Suspended (boolean)
- `password_expired`: Password Expired (boolean)
- `mfa_configured`: MFA Configured (boolean)
- `totp_enabled`: TOTP Enabled (boolean)
- `created`: Created (datetime)

### `unlock_user`

**Unlock User.** Unlocks a JumpCloud user account, whether locked by an admin or by failed sign-ins, and returns the user as it is afterwards. Use Lock User to block access again. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Pick the object, or type to search by name. You can also map an ID from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: User ID
- `username`: Username
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `display_name`: Display Name
- `employee_id`: Employee ID
- `employee_type`: Employee Type
- `job_title`: Job Title
- `department`: Department
- `company`: Company
- `cost_center`: Cost Center
- `location`: Location
- `manager_id`: Manager ID
- `state`: State
- `activated`: Activated (boolean)
- `account_locked`: Account Locked (boolean)
- `suspended`: Suspended (boolean)
- `password_expired`: Password Expired (boolean)
- `mfa_configured`: MFA Configured (boolean)
- `totp_enabled`: TOTP Enabled (boolean)
- `created`: Created (datetime)

### `reset_user_mfa`

**Reset User MFA.** Resets a JumpCloud user's MFA (TOTP) enrollment so they must enroll again, optionally with a grace period of days during which they can sign in without MFA. Each call resets again, which forces the user to re-enroll if they already did. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Pick the object, or type to search by name. You can also map an ID from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `allowGracePeriod` | boolean | no | `false` | Allow Sign-in Without MFA for a While. Lets the user sign in without MFA until they enroll again, for the number of days below. |
| `gracePeriodDays` | number | no | `7` | Grace Period (days). How many days the user can sign in without MFA, from 1 to 365. |

Output fields:

- `user_id`: User ID
- `mfa_reset`: MFA Reset (boolean)
- `grace_period_days`: Grace Period (days) (number)

### `update_user_on_system`

**Update User on System.** Sets the binding between a JumpCloud user and a system (device): whether the user has administrator/sudo rights and whether sudo asks for a password. With Bind If Needed it also creates the binding; otherwise the user must already be bound. Use Create Association for a plain binding. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Pick the object, or type to search by name. You can also map an ID from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `systemId` | string | yes |  | System (device). Pick the object, or type to search by name. You can also map an ID from an earlier step. A value the product loads from the provider, such as an id; write the value itself. |
| `sudoEnabled` | boolean | no | `false` | Administrator (sudo) Rights. Gives the user administrator rights on this device. |
| `sudoWithoutPassword` | boolean | no | `false` | Sudo Without Password. Lets the user run administrator commands without typing their password. Only applies with administrator rights. |
| `bindIfNeeded` | boolean | no | `false` | Bind If Needed. Binds the user to the device when they are not bound yet. Leave off to only change an existing binding. |

Output fields:

- `user_id`: User ID
- `system_id`: System ID
- `sudo_enabled`: Administrator (sudo) Rights (boolean)
- `sudo_without_password`: Sudo Without Password (boolean)

### `run_trigger_command`

**Run Trigger Command.** Launches every JumpCloud command whose launch event is "Run on Trigger" with the given trigger name, passing optional JSON variables, and returns the launched command IDs; with Wait For Results it also returns each device result (exit code, output) reported within the wait time. Each call runs the commands again on their devices. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `triggerName` | string | yes |  | Trigger Name. The Trigger Name set on the command in JumpCloud. Every command with this name runs. |
| `variables` | JSON | no |  | Variables. Optional JSON object passed to the command. JumpCloud exposes each key to the script as an environment variable. |
| `waitForResults` | boolean | no | `false` | Wait For Results. Wait until each command reports a result, up to the time below. |
| `waitSeconds` | number | no | `60` | Max Wait (seconds). How long to wait for results, from 5 to 300 seconds. Devices that are offline report later. |

Output fields:

- `trigger_name`: Trigger Name
- `command_ids`: Launched Command IDs
- `waited`: Waited For Results (boolean)
- `completed`: All Commands Reported (boolean)
- `results`: Results
- `results[].command_id`: Command ID
- `results[].command_name`: Command Name
- `results[].system_id`: System ID
- `results[].system_name`: System Name
- `results[].run_as_user`: Run As User
- `results[].exit_code`: Exit Code (number)
- `results[].output`: Output
- `results[].error`: Error
- `results[].request_time`: Requested At (datetime)
- `results[].response_time`: Completed At (datetime)

### `custom_api_call`

**Custom API Call.** Call any JumpCloud API endpoint with this connection. Use a path such as /systemusers for the v1 API or /v2/usergroups for the v2 API. Needs authentication.

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
