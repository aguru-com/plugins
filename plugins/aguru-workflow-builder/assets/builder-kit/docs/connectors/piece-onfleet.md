# Onfleet

Last mile delivery software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-onfleet'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get an API key, follow the steps below:
> 1. Go to settings -> API & Webhooks.
> 2. Click the plus sign under API Keys.
> 3. Enter API key name and click create key.
> 4. Copy the generated key to the input below.

## Actions

### `create_recipient`

**Create Recipient.** Create a new Onfleet recipient with a name and a unique valid phone number, plus optional notes and SMS/phone-validation settings. Not idempotent: each call creates a recipient, and Onfleet rejects a phone number already in use. Use Update Recipient to change an existing one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The recipient's full name. |
| `phone` | string | yes |  | Phone. A unique, valid phone number as per the organization's country if there's no leading + sign. If a phone number has a leading + sign, it will disregard the organization's country setting. |
| `notes` | string | no |  | Notes. |
| `skipSMSNotifications` | boolean | no | `false` | Skip SMS Notifications. |
| `skipPhoneNumberValidation` | boolean | no | `false` | Skip Phone Number Validation. |
| `useLongCodeForText` | boolean | no | `false` | Use Long Code for Text - Canadian Organizations Only. Checking this option will default the Onfleet system to use a toll-free long code number for SMS communication. |

### `update_recipient`

**Update Recipient.** Update an existing Onfleet recipient identified by recipient ID, changing name, notes, or the skip-SMS-notifications setting. Idempotent: it modifies the same record in place by ID, so repeated calls with the same values leave it unchanged. Use Create Recipient when no recipient exists yet. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Recipient ID. The ID of the recipient you want to update. |
| `name` | string | no |  | Name. The recipient's full name. |
| `notes` | string | no |  | Notes. |
| `skipSMSNotifications` | boolean | no |  | Skip SMS Notifications. |

### `get_recipient`

**Get Recipient.** Fetches a single Onfleet recipient (the customer receiving a delivery) by recipient ID. Read-only and idempotent. Requires a known recipient ID; this action only looks up by ID, not by name or phone. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Recipient ID. The recipient's ID. |

### `create_task`

**Create Task.** Create a new Onfleet delivery or pickup task with a destination address and recipient. Each call creates a separate task, so it is not idempotent (re-running adds duplicates). Provide an existing recipient by ID, or supply recipient name and phone to create one inline; set the pickup flag to make it a pickup rather than a drop-off. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `merchant` | string | no |  | Merchant ID. ID of the organization that will be displayed on the task. |
| `executor` | string | no |  | Executor ID. ID of the organization that will be executing the task. |
| `destination` | object | yes |  | Destination. The task destination. An object whose fields depend on other inputs; the product shows them. |
| `unparsedDestination` | boolean | yes | `false` | Unparsed Destination. Check this box if the destination is a single unparsed string. |
| `recipient` | object | yes |  | Destination. The task destination. An object whose fields depend on other inputs; the product shows them. |
| `useRecipientID` | boolean | yes | `false` | Use Recipient ID. Check this box if you want to use an ID for the recipient. |
| `completeAfter` | ISO date-time string | no |  | Complete After. The earliest time the task should be completed. |
| `completeBefore` | ISO date-time string | no |  | Complete Before. The latest time the task should be completed. |
| `pickupTask` | boolean | no |  | Pickup. Whether the task is pickup. |
| `quantity` | number | no |  | Quantity. The number of units to be dropped off. |
| `recipientName` | string | no |  | Recipient Name Override. Override the recipient name for this task only. |
| `recipientNotes` | string | no |  | Recipient Notes Override. Override the recipient notes for this task only. |
| `recipientSkipSMSNotifications` | boolean | no |  | Recipient Skip SMS Override. Override the recipient skip SMS option for this task only. |
| `serviceTime` | number | no |  | Service Time. The number of minutes to be spent by the worker on arrival at this task's destination. |

### `delete_task`

**Delete Task.** Permanently delete an Onfleet task by its ID. Idempotent in effect: once the task is gone the result is the same, though deleting an already-removed task may error. Destructive and irreversible, so confirm the task ID before calling. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task ID. The ID of the task you want to delete. |

### `complete_task`

**Force Complete Task.** Force-completes an Onfleet task by task ID on behalf of the worker, marking it success or failure with optional notes, without the driver completing it in-app. Not idempotent and a state transition: only valid on a started/active task, and once completed it cannot be re-completed. Use update-task for non-completion edits. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task ID. The ID of the task you want to complete. |
| `success` | boolean | yes | `true` | Complete as Success. Whether to complete the task as a success or not. |
| `notes` | string | no |  | Notes. |

### `clone_task`

**Clone Task.** Duplicate an existing Onfleet task by its ID, producing a new task that copies the original. Not idempotent: every call creates an additional clone. Use to replicate a task setup rather than re-enter all details with Create Task. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task ID. ID of the task you want to clone. |

### `update_task`

**Update Task.** Updates an existing Onfleet delivery/pickup task by its task ID, changing fields such as merchant, executor, complete-after/before window, quantity, or service time. Not idempotent: each call patches the live task, so passing a different value overwrites the prior one. Requires a known task ID; to create a task instead use the create-task action. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task ID. ID of the task you want to update. |
| `merchant` | string | no |  | Merchant ID. ID of the organization that will be displayed on the task. |
| `executor` | string | no |  | Executor ID. ID of the organization that will be executing the task. |
| `completeAfter` | ISO date-time string | no |  | Complete After. The earliest time the task should be completed. |
| `completeBefore` | ISO date-time string | no |  | Complete Before. The latest time the task should be completed. |
| `pickupTask` | boolean | no |  | Pickup. Whether the task is pickup. |
| `quantity` | number | no |  | Quantity. The number of units to be dropped off. |
| `serviceTime` | number | no |  | Service Time. The number of minutes to be spent by the worker on arrival at this task's destination. |

### `get_task`

**Get Task.** Fetch a single Onfleet task by its task ID. Read-only and idempotent. Use when you already have the task ID; use Get Tasks to search or list tasks over a time window. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task` | string | yes |  | Task ID. The ID of the task you want to delete. |

### `get_tasks`

**Get Tasks.** List Onfleet tasks within a required time window (from a start time, optionally to an end time), optionally filtered by state (unassigned, assigned, active, completed). Read-only and idempotent. Use to find or enumerate tasks; use Get Task when you already have a single task ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | ISO date-time string | yes |  | From. |
| `to` | ISO date-time string | no |  | To. |
| `state` | array | no |  | State. Values the product loads from the provider, such as ids; write an array of them. |

### `create_destination`

**Create Destination.** Creates a standalone Onfleet destination (an address) with optional notes, given either structured address fields or a single unparsed address string. Not idempotent: calling it repeatedly creates duplicate destinations. Useful for pre-building an address to reference on a task. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `destination` | object | yes |  | Destination. The task destination. An object whose fields depend on other inputs; the product shows them. |
| `unparsedDestination` | boolean | yes | `false` | Unparsed Destination. Check this box if the destination is a single unparsed string. |
| `notes` | string | no |  | Notes. |

### `get_destination`

**Get Destination.** Fetch a single Onfleet destination (a stored delivery address) by its destination ID. Read-only and idempotent. Use when you already have the destination ID and need its address details. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `destination` | string | yes |  | Destination ID. The ID of the destination you want to delete. |

### `get_hubs`

**Get Hubs.** Lists all hubs (physical depots/locations) in the Onfleet organization. Read-only and idempotent, taking no input. Use it to discover hub IDs before assigning a hub to a team or worker. Needs authentication.

Kind: safe to repeat.

No inputs.

### `create_hub`

**Create Hub.** Creates a new Onfleet hub (a physical depot/location) with a name and address, optionally assigned to teams. The address can be given as structured fields or as a single unparsed address string. Not idempotent: calling it repeatedly creates duplicate hubs. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the hub. |
| `destination` | object | yes |  | Destination. The task destination. An object whose fields depend on other inputs; the product shows them. |
| `unparsedDestination` | boolean | yes | `false` | Unparsed Destination. Check this box if the destination is a single unparsed string. |
| `teams` | array | no |  | Teams. Values the product loads from the provider, such as ids; write an array of them. |

### `update_hub`

**Update Hub.** Update an existing Onfleet hub (a physical location workers operate from) selected by hub, changing its name and/or assigned teams. Idempotent: it edits the same hub in place, so repeating with the same values has no further effect. Only the fields you supply are changed. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `hub` | string | yes |  | Hub. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. Name of the hub. |
| `teams` | array | no |  | Teams. Values the product loads from the provider, such as ids; write an array of them. |

### `get_organization`

**Get Organization.** Fetches details of your own Onfleet organization (the one owning the API key). Read-only and idempotent, taking no input. To read a connected/partner organization instead, use get-delegatee-details with its organization ID. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_delegatee_details`

**Get Delegatee Details.** Fetches details of a connected (delegatee) Onfleet organization by its organization ID. Read-only and idempotent. Use this for a partner/connected org you delegate to; to read your own organization use get-organization instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization` | string | yes |  | Organization ID. ID of the connected organization. |

### `create_admin`

**Create Administrator.** Creates a new Onfleet organization administrator from a name and email (optional phone and read-only flag). Not idempotent: each call adds another admin even with the same email. Use update-admin to modify an existing one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Full name. |
| `email` | string | yes |  | Email. |
| `phone` | string | no |  | Phone Number. |
| `isReadOnly` | boolean | no |  | Read Only. Whether this administrator can perform write operations. |

### `update_admin`

**Update Administrator.** Updates an existing Onfleet organization administrator by admin ID, currently only their full name. Not idempotent: it patches the live admin record. Requires a known admin ID; use create-admin to add a new administrator or delete-admin to remove one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `admin` | string | yes |  | Administrator. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. Full name. |

### `get_admins`

**Get Administrators.** Lists all administrators in the Onfleet organization. Read-only and idempotent, taking no input. Use it to discover admin IDs before calling update-admin or delete-admin. Needs authentication.

Kind: safe to repeat.

No inputs.

### `delete_admin`

**Delete Administrator.** Permanently removes an Onfleet administrator by admin ID. Destructive and not reversible; re-deleting an already-removed admin will error rather than be a no-op. Requires a known admin ID (use get-admins to find it). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `admin` | string | yes |  | Administrator. A value the product loads from the provider, such as an id; write the value itself. |

### `create_worker`

**Create Worker.** Creates a new Onfleet worker (driver) from a name and phone, assigned to one or more required teams, with optional capacity and display name. Not idempotent: calling it repeatedly creates duplicate workers. Use update-worker to modify an existing driver. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the worker. |
| `phone` | string | yes |  | Phone. |
| `teams` | array | yes |  | Teams. Values the product loads from the provider, such as ids; write an array of them. |
| `capacity` | number | no |  | Capacity. The maximum number of units this worker can carry. |
| `displayName` | string | no |  | Display Name. |

### `delete_worker`

**Delete Worker.** Permanently removes an Onfleet worker (driver) by worker ID. Destructive and not reversible; deleting an already-removed worker will error rather than be a no-op. Requires a known worker ID. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `worker` | string | yes |  | Worker. A value the product loads from the provider, such as an id; write the value itself. |

### `get_worker`

**Get Worker.** Fetches a single Onfleet worker (driver) by worker ID. Read-only and idempotent. Requires a known worker ID; there is no list-all-workers action in this set, so obtain the ID from another source first. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `worker` | string | yes |  | Worker. A value the product loads from the provider, such as an id; write the value itself. |

### `get_worker_schedule`

**Get Worker Schedule.** Retrieve a specific Onfleet worker's schedule, selected by worker. Read-only and idempotent. Use to check a worker's scheduled shifts/availability. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `worker` | string | yes |  | Worker. A value the product loads from the provider, such as an id; write the value itself. |

### `update_worker`

**Update Worker.** Updates an existing Onfleet worker (driver) by worker ID, changing fields such as name, team membership, capacity, or display name. Not idempotent: it patches the live worker and reassigning teams replaces the prior set. Use create-worker to add a new driver. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `worker` | string | yes |  | Worker. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. Name of the worker. |
| `teams` | array | no |  | Teams. Values the product loads from the provider, such as ids; write an array of them. |
| `capacity` | number | no |  | Capacity. The maximum number of units this worker can carry. |
| `displayName` | string | no |  | Display Name. |

### `create_team`

**Create Team.** Creates a new Onfleet team with a name and optional workers, managers, hub, and self-assignment setting. Not idempotent: calling it repeatedly creates duplicate teams. Use update-team to modify an existing team. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the team. |
| `workers` | array | yes |  | Workers. Values the product loads from the provider, such as ids; write an array of them. |
| `managers` | array | yes |  | Managers. Values the product loads from the provider, such as ids; write an array of them. |
| `hub` | string | no |  | Hub. A value the product loads from the provider, such as an id; write the value itself. |
| `enableSelfAssignment` | boolean | no |  | Enable Self Assignment. Allows Drivers to Self Assign Tasks that are in the Team unassigned container. |

### `delete_team`

**Delete Team.** Permanently delete an Onfleet team by its ID. Idempotent in effect: once removed the result is the same, though deleting an already-removed team may error. Destructive and irreversible, so confirm the team selection before calling. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team` | string | yes |  | Team. A value the product loads from the provider, such as an id; write the value itself. |

### `get_team`

**Get Team.** Fetches a single Onfleet team by team ID. Read-only and idempotent. Requires a known team ID; to list all teams and discover IDs use get-teams instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team` | string | yes |  | Team. A value the product loads from the provider, such as an id; write the value itself. |

### `get_teams`

**Get Teams.** Lists all teams in the Onfleet organization. Read-only and idempotent, taking no input. Use it to discover team IDs before assigning workers, hubs, or tasks; to fetch a single team by ID use get-team instead. Needs authentication.

Kind: safe to repeat.

No inputs.

### `update_team`

**Update Team.** Updates an existing Onfleet team by team ID, changing name, worker membership, hub, or self-assignment setting. Not idempotent: it patches the live team and reassigning workers replaces the prior set. Requires a known team ID; use create-team to add a new team. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team` | string | yes |  | Team. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. Name of the team. |
| `workers` | array | no |  | Workers. Values the product loads from the provider, such as ids; write an array of them. |
| `managers` | array | no |  | Managers. Values the product loads from the provider, such as ids; write an array of them. |
| `hub` | string | no |  | Hub. A value the product loads from the provider, such as an id; write the value itself. |
| `enableSelfAssignment` | boolean | no |  | Enable Self Assignment. Allows Drivers to Self Assign Tasks that are in the Team unassigned container. |

### `get_container`

**Get Container.** Fetch an Onfleet container (the ordered task queue) for a given owner, specifying both the container type (organization, team, or worker) and that owner ID. Read-only and idempotent. Use to inspect the current task ordering for an org, team, or worker. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `containerType` | string | yes |  | Container Type. A value the product loads from the provider, such as an id; write the value itself. |
| `containerId` | string | yes |  | Container ID. |

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
