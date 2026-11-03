# SimplyPrint

3D printer fleet management: monitor printers, manage the print queue, track filament, and automate print jobs.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-simplyprint'
  version: '0.6.7'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Click **Connect** below to authorize Activepieces to access your SimplyPrint account. The connection refreshes automatically. Revoke any time from **SimplyPrint → Panel → Settings → Connected apps**.

## Actions

### `list_printers`

**List Printers.** Read-only listing of printers in the account with current status. By default it walks all pages and returns every printer; pass a page number to fetch just that single page instead. Pick this to discover printer IDs and live state (e.g. to find idle printers before starting a job); it never modifies anything. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no |  | Page (optional). Specific page number (1-based). Leave empty to walk all pages and return every printer. |
| `pageSize` | number | no |  | Page size (optional). Items per page (max 100). Defaults to 100 when paging is requested. |

### `get_farm_overview`

**Get Farm Overview.** Returns a single fleet-wide snapshot: total printer count plus per-state buckets (online/offline, printing/paused, awaiting bed clear, in maintenance, requires-attention, AI failure detections, etc.) each listing the printers in it. Prefer this over paginating "List Printers" when you only need counts or which printers are in a given state. Takes no input; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_printer`

**Get Printer.** Fetches the full record for a single printer by its numeric printer ID (state, settings, current job, etc.). Use to inspect or look up one known printer before acting on it; for a fleet-wide snapshot or counts use "Get Farm Overview" or "List Printers" instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerId` | number | yes |  | Printer ID. Numeric printer ID. Typically piped in from an upstream step. |

### `pause_print`

**Pause Print.** Pause the current print on a printer. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerId` | number | yes |  | Printer ID. Numeric printer ID. Typically piped in from an upstream step. |

### `resume_print`

**Resume Print.** Resume a paused print on a printer. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerId` | number | yes |  | Printer ID. Numeric printer ID. Typically piped in from an upstream step. |

### `cancel_print`

**Cancel Print.** Cancel the current print on a printer. This is destructive — the job cannot be resumed. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerId` | number | yes |  | Printer ID. Numeric printer ID. Typically piped in from an upstream step. |

### `cancel_pending_print`

**Cancel Pending Print.** Cancels prints that are staged/queued on one or more printers but have not started yet (status print_pending), given numeric printer IDs. Pick this for not-yet-running prints; use the separate "Cancel Print" action for the currently active print. Idempotent: once a printer has no pending print the call converges to the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerIds` | array | yes |  | Printer IDs. Numeric printer IDs whose pending prints should be cancelled. |

### `clear_printer_bed`

**Clear Printer Bed.** Mark the bed of one or more printers as cleared after a finished print, optionally recording success/failure, a 1-4 star print rating, and an AutoPrint clear-count reset. Pick it as the post-print confirmation step in AutoPrint flows so the next queued job can start. Not idempotent — each call records a clear event and advances AutoPrint state. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerIds` | array | yes |  | Printer IDs. Numeric printer IDs to clear. |
| `success` | boolean | no | `true` | Cleared successfully?. Was the bed actually cleared (true) or did it fail (false)? Drives AutoPrint clear-count logic. |
| `rating` | string | no |  | Print rating (optional). Optional 1-4 star rating for the just-finished print. One of `1`, `2`, `3`, `4`. |
| `autoPrintResetClearCount` | boolean | no | `false` | Reset AutoPrint clear count. When checked, resets the AutoPrint cleared-bed counter on the printer. |

### `skip_print_objects`

**Skip Print Objects.** Skips individual model objects on the print currently running on one printer, by their slicer/printer object indices. Use mid-print to abandon failed or unwanted objects while letting the rest finish; the target printer must be actively PRINTING/PAUSED/PAUSING/CANCELLING/RESUMING and only one printer is allowed per call. Not idempotent: each call instructs the firmware to abandon more objects on the live print. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerId` | number | yes |  | Printer ID. Numeric printer ID of the active print. |
| `objectIds` | array | yes |  | Object indices. Numeric indices of the objects to skip (as exposed by the slicer / printer's object list). |

### `set_printer_out_of_order`

**Set Printer Out of Order.** Sets or clears the out-of-order flag on one or more printers by numeric ID; a boolean toggles between marking them out-of-order and clearing it. Use to take printers in/out of service in the fleet. Requires the Out-of-Order feature enabled on the account. Idempotent: it sets a flag to a fixed value rather than accumulating changes. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerIds` | array | yes |  | Printer IDs. Numeric printer IDs. |
| `outOfOrder` | boolean | yes | `true` | Out of order?. True = mark as out-of-order. False = clear the flag. |

### `send_gcode`

**Send G-code.** Send raw G-code commands (one per line, up to 200 lines) to an operational printer by ID. Pick this for low-level printer control — homing, temperature, movement, custom macros — when no higher-level action exists. Not idempotent: commands execute on the physical printer each time, so re-running repeats the motion/heating. Requires the Print Farm plan. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerId` | number | yes |  | Printer ID. Numeric printer ID. Typically piped in from an upstream step. |
| `gcode` | string | yes |  | G-code. One G-code command per line, e.g. "G28" then "M104 S200". Up to 200 lines per request. |

### `start_print`

**Start Print.** Start a print job on one or more selected printers from an existing reference — choose the file source mode: an uploaded API file (hash), an existing user file (UID), or a pending queue item ID. Pick this to physically begin printing; it is the main "go" action and supports per-job custom fields, start options, and multi-material slot maps. Not idempotent — each call launches new jobs, so re-running starts additional prints. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerIds` | array | yes |  | Printers. Pick one or more printers from your account. Values the product loads from the provider, such as ids; write an array of them. |
| `fileSource` | string | yes | `"apiFile"` | File source. Which kind of existing reference to start from. One of `"apiFile"`, `"userFile"`, `"queueItem"`. |
| `apiFileId` | string | no |  | API file ID. Required when source is "API file". Hex hash returned by Upload File. |
| `userFileUid` | string | no |  | User file UID. Required when source is "User file". The UserFile.uid string. |
| `queueItemId` | number | no |  | Queue item ID. Required when source is "Queue item". |
| `sharedCustomFields` | object | no |  | Shared custom fields. Custom-field values applied to every started job (PRINT_JOB). Keyed by custom-field UUID (fieldId) → value. |
| `individualCustomFields` | string | no |  | Individual custom fields (JSON). Optional. JSON array `[{"id": <queueItemId>, "value": {"<fieldId>": <value>}}]`. Per-item PRINT_JOB custom fields when starting a multi-queue job. |
| `startOptions` | object | no |  | Start options. Optional slicer/print-time metadata (nozzle, filament_material, print_speed, layer_height, infill, quality). Arbitrary keys allowed. |
| `mmsMap` | string | no |  | MMS map (JSON). Optional. JSON object mapping printer id → multi-material slot configuration. Leave empty for single-material printers. |

### `get_printer_notifications`

**Get Printer Notifications.** Fetch the open notifications/events for one or more printers by their numeric IDs. Read-only; pick it to discover notification IDs (and which need attention) before calling the resolve-notification tool. Idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerIds` | array | yes |  | Printer IDs. Numeric printer IDs to query. |

### `resolve_printer_notification`

**Resolve Printer Notification.** Resolve or dismiss one printer notification by its event ID. For multi-action notifications, pick a specific action key, or force-resolve to clear it without choosing; set dismiss to mark it dismissed instead of resolved. Idempotent: resolving an already-handled notification has no further effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerId` | number | yes |  | Printer ID. Numeric printer ID the notification belongs to. |
| `notificationId` | number | yes |  | Notification ID. Numeric notification event ID. Use "Get Printer Notifications" to look it up. |
| `action` | string | no |  | Action key (optional). For multi-action notifications, the action key to invoke. Leave empty for single-action or dismiss-only notifications. |
| `force` | boolean | no | `false` | Force resolve. Resolve immediately even if multiple actions are available (skips picking one). |
| `dismiss` | boolean | no | `false` | Dismiss. Mark as dismissed rather than resolved. |

### `list_queue`

**List Queue Items.** Read-only, paginated listing of items in the active print queue, optionally filtered to a single queue group ID. Enable "Include completed items" to also return done items (this switches to the legacy path and ignores paging). Pick this for the main print queue; use List Pending Queue Items for the approval workflow instead. Never modifies anything. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | number | no |  | Queue group ID (optional). Numeric queue group ID to filter by. Leave empty for the whole queue. |
| `includeDone` | boolean | no | `false` | Include completed items. |
| `page` | number | no |  | Page (optional). Page number (1-based). Only applies to the active-queue path; ignored when "Include completed items" is on. |
| `pageSize` | number | no |  | Page size (optional). Items per page (max 100). Defaults to 100. |

### `get_queue_item`

**Get Queue Item.** Fetch a single print-queue item by its numeric ID. Read-only; pick it to inspect one known item (file, assignments, custom fields) rather than to browse or schedule the queue. Idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueItemId` | number | yes |  | Queue item ID. Numeric queue item ID. Typically piped in from an upstream step. |

### `get_next_queue_items`

**Get Next Queue Items.** Resolve which queue items should print next on the given printer IDs using the account's match criteria, with built-in deduplication so the same item is not handed to two printers. Pick this to drive automatic dispatch of pending work to free printers; optionally exclude busy printer IDs from matching. It is a lookup (no items are started), but match results can shift between calls as the queue changes. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerIds` | array | yes |  | Printer IDs. Numeric printer IDs (one or many). |
| `deselectPrinterIds` | array | no |  | Exclude printer IDs. Optional. Printer IDs to skip when matching (e.g. printers currently busy). |

### `get_next_queue_items_for_printers`

**Preview Next Queue Items per Printer.** Preview, per printer, which queue item each would pick next — with no deduplication or offline checks — returning the matched item or the issues blocking a match. Read-only and does not reserve anything; pick the separate dedup-aware scheduling tool ("Get Next Queue Items") when actually assigning work. Idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerIds` | array | yes |  | Printer IDs. Numeric printer IDs (one or many). |

### `list_queue_groups`

**List Queue Groups.** Read-only listing of every queue group on the account. Pick this to discover available queue groups and their IDs (e.g. to feed a group ID into List Queue Items or Save Queue Group); it takes no inputs and never modifies anything. Needs authentication.

Kind: safe to repeat.

No inputs.

### `save_queue_group`

**Save Queue Group.** Create a new queue group or update an existing one (pass a group ID to edit, omit it to create), configuring its name, accepted file extensions, printer/model/group restrictions, visibility, and approval rules. When editing by ID it overwrites the group with the supplied settings, so re-running with the same ID is idempotent; omitting the ID always creates a new group. Requires the Queue Groups account feature. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | number | no |  | Group ID (edit existing). Numeric ID of the group to edit. Omit to create a new group. |
| `name` | string | yes |  | Group name. Display name for the group (max 64 chars). |
| `acceptedExtensions` | array | no |  | Accepted file extensions. File extensions allowed in this group (without the dot, e.g. `gcode`, `bgcode`). Leave empty for "any". |
| `virtualOnly` | boolean | yes | `false` | Virtual only. When true, no real queue items can be added — used for placeholder/grouping-only groups. |
| `forPrinters` | array | no |  | For printers (IDs). Optional. Restrict this group to specific printers. |
| `forModels` | array | no |  | For printer models (IDs). Optional. Restrict this group to specific printer models. |
| `forGroups` | array | no |  | For printer groups (IDs). Optional. Restrict this group to specific printer groups. |
| `visibilityUserRanks` | array | no |  | Visibility user rank IDs. Optional. Limit who can see the group based on user rank IDs. |
| `approvalRequiredRanks` | array | no |  | Approval-required user rank IDs. Optional. User ranks whose submissions need approval. |
| `approvalExemptRanks` | array | no |  | Approval-exempt user rank IDs. Optional. User ranks whose submissions skip approval. |
| `requiresApproval` | boolean | no |  | Requires approval. Master toggle for approval workflow on this group. |

### `delete_queue_group`

**Delete Queue Group.** Deletes a queue group by its numeric ID and re-homes its items: to an optional "move to" target group if given, otherwise the first remaining group, or ungrouped if it was the last group. Use to remove a grouping while keeping its queue items. Idempotent in effect: the end state is the same once the group no longer exists. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | number | yes |  | Group ID. Numeric ID of the queue group to delete. |
| `moveTo` | number | no |  | Move items to (optional). Optional target group ID for orphaned items. If omitted, items go to the first remaining group (or become ungrouped if this is the last). |

### `add_to_queue`

**Add File to Queue.** Queue an already-uploaded file for printing — choose the source (an API file hex ID from an upload step, or an existing user-file UID) plus quantity, target group, printers/models, tags, and custom fields. Use this when the file already exists on SimplyPrint; to upload and queue together use the upload-and-queue tool. Not idempotent — each call adds a new queue item. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileSource` | string | yes | `"apiFile"` | File source. One of `"apiFile"`, `"userFile"`. |
| `apiFileId` | string | no |  | API file ID. Hex id returned by Upload File. Required when source is "API file". |
| `userFileUid` | string | no |  | User file UID. UID of an existing user-file (from "List Files"). Required when source is "User file". Accepts only the single file UID string. |
| `groupId` | string | no |  | Queue group. Which queue group to add the item to. Required if your account has queue groups configured. Leave empty only if no queue groups exist. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | no | `1` | Quantity. Number of copies to queue (defaults to 1). |
| `position` | string | no | `"bottom"` | Insert at. Where in the queue to place the new item. One of `"bottom"`, `"top"`, `"specific"`. |
| `positionNumber` | number | no |  | Position number. Only used when "Insert at" is "Specific position". 1-based index (1 = very top). Requires queue-reorder permission. |
| `forPrinters` | array | no |  | Target printers. Restrict this queue item to one or more specific printers. Leave empty to allow any eligible printer. Values the product loads from the provider, such as ids; write an array of them. |
| `forModels` | array | no |  | Target printer models. Restrict to printers of specific models. Leave empty to auto-tag from the gcode file (if applicable). Built from the models your printers are using. Values the product loads from the provider, such as ids; write an array of them. |
| `customTags` | array | no |  | Tags: Custom tags. Custom tags to apply. Leave empty to auto-tag from the gcode file (if applicable). Values the product loads from the provider, such as ids; write an array of them. |
| `nozzleSize` | number | no |  | Tags: Nozzle size (mm). Target nozzle diameter, e.g. `0.4`. Leave empty to auto-tag from the gcode file. |
| `nozzleType` | string | no |  | Tags: Nozzle type. Nozzle material. Leave empty to auto-tag from the gcode file. One of `"standard"`, `"plated_brass"`, `"hardened_steel"`, `"stainless_steel"`, `"tungsten_carbide"`, `"ruby_tipped"`, `"hemispherical"`. |
| `nozzleVolumeType` | string | no |  | Tags: Nozzle volume type. Nozzle flow category. Leave empty to auto-tag from the gcode file. One of `"standard"`, `"high_flow"`. |
| `bedType` | string | no |  | Tags: Bed type. Printer bed surface. Leave empty to auto-tag from the gcode file. A value the product loads from the provider, such as an id; write the value itself. |
| `customFields` | object | no |  | Custom fields. Optional. Object keyed by custom-field UUID (fieldId) → value. PRINT_QUEUE category is auto-applied. |

### `update_queue_item`

**Update Queue Item.** Updates editable fields (quantity, note) on an existing queue item identified by its numeric ID. Use to adjust a known queue entry in place; only the fields you pass are changed. Idempotent: applying the same values keyed to the same item ID converges to the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueItemId` | number | yes |  | Queue item ID. Numeric queue item ID. Typically piped in from an upstream step. |
| `amount` | number | no |  | Quantity. |
| `note` | string | no |  | Note. |

### `set_queue_item_printers`

**Set Queue Item Printer Assignments.** Sets which printers, printer models, and/or printer groups each given queue item may be assigned to, fully replacing the item's current assignments. Pass empty arrays for a dimension to clear that set of assignments. Requires numeric queue-item IDs; idempotent because it overwrites assignments to a fixed target state rather than appending. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueItemIds` | array | yes |  | Queue item IDs. Numeric queue item IDs to update. |
| `printerIds` | array | no |  | Printer IDs. Numeric printer IDs to assign to. Leave empty to clear printer assignments. |
| `modelIds` | array | no |  | Printer model IDs. Numeric printer model IDs. Leave empty to clear model assignments. |
| `groupIds` | array | no |  | Printer group IDs. Numeric printer group IDs. Leave empty to clear group assignments. |

### `move_queue_item`

**Move Queue Item.** Reassign one existing print-queue item to a different queue group by its numeric ID. Pick it to reorganize the queue across groups rather than to add or remove items. Idempotent: moving an item already in the target group leaves it there. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueItemId` | number | yes |  | Queue item ID. Numeric queue item ID. Typically piped in from an upstream step. |
| `targetGroupId` | number | yes |  | Target queue group ID. Numeric ID of the destination queue group. |

### `remove_from_queue`

**Remove Queue Item.** Permanently delete a single item from the print queue by its numeric ID. This is destructive — the item is gone (use Archive Print Jobs for completed jobs you only want out of the active view). Deleting an already-removed item simply finds nothing to delete, so the end state is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueItemId` | number | yes |  | Queue item ID. Numeric queue item ID. Typically piped in from an upstream step. |

### `revive_queue_item`

**Revive Queue Item.** Move a previously-completed queue item back into the active print queue by its numeric ID. Pick this to re-print or re-process a job that was already marked done; it changes queue state, so re-running it after the item is already active has no further effect. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueItemId` | number | yes |  | Queue item ID. Numeric queue item ID. Typically piped in from an upstream step. |

### `empty_queue`

**Empty Queue.** Bulk-delete print-queue items, optionally scoped to a single queue group and/or restricted to only completed items. Destructive and irreversible — prefer the single-item delete/move tools unless a full clear is intended. Idempotent in effect: re-running on an already-empty queue is a no-op. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | no |  | Queue group. Which queue group to add the item to. Required if your account has queue groups configured. Leave empty only if no queue groups exist. A value the product loads from the provider, such as an id; write the value itself. |
| `doneOnly` | boolean | no | `false` | Only remove completed items. When checked, only done items are removed. Pending / printing / failed items stay. |

### `list_pending_queue_items`

**List Pending Queue Items.** Read-only, paginated listing of queue items in the approval workflow — pending, denied, or sent back for revision. Pick this to review submissions needing a moderation decision; filter to a single approval status or list all three. Use the general queue listing instead for items already in the active print queue. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no | `"all"` | Status filter. Restrict to a single approval status. Defaults to all (pending + denied + revision). One of `"all"`, `"pending"`, `"denied"`, `"revision"`. |
| `page` | number | no |  | Page (optional). Page number (1-based). Defaults to 1. |
| `perPage` | number | no |  | Per page (optional). Items per page (max 100). Defaults to 50 (backend default). |

### `approve_queue_item`

**Approve Queue Item.** Approve one or more pending print-queue items by their numeric IDs, with an optional comment, so they can proceed to printing. Pick it to clear an approval gate on queued jobs. Idempotent: approving an already-approved item leaves it approved. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueItemIds` | array | yes |  | Queue item IDs. Numeric IDs of pending queue items to approve. |
| `comment` | string | no |  | Comment. |

### `deny_queue_item`

**Deny Queue Item.** Denies a pending queue item awaiting approval, attaching a required comment shown to the submitter. A "request revision" toggle picks the mode: when set, the item stays as DENIED so the submitter can edit and resubmit; otherwise the item is removed. Use to reject a submission rather than approve it. Idempotent: it drives the item to a fixed denied/removed state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueItemId` | number | yes |  | Queue item ID. |
| `comment` | string | yes |  | Comment. Explain why the item is being denied. Shown to the submitter. |
| `requestRevision` | boolean | no | `false` | Request revision. When checked, the submitter can edit and resubmit. Otherwise the item is removed. |

### `list_files`

**List Files.** Browse the SimplyPrint file system, optionally scoped to a folder ID and/or filtered by a filename search term (with an option to search across all folders). Read-only; pick it to discover user-file UIDs and folder IDs needed by upload-to-folder or add-to-queue. Idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | number | no |  | Folder ID. Leave empty (or 0) to list root-level files. Use -1 for the "all files" flat view. |
| `search` | string | no |  | Search. Optional filter by filename (substring match). |
| `globalSearch` | boolean | no | `true` | Search all folders. When a search term is provided, search across every folder instead of just the current one. |

### `upload_file`

**Upload File.** Upload a print file (G-code, STL, 3MF) to SimplyPrint, supplied either as a File input or as an HTTPS URL to stream from; the filename extension must be correct since the backend infers type from it. Use this when you only need the file staged for later; to queue or print in one step use the dedicated upload-and-queue or upload-to-folder tools. Not idempotent — each call creates a new uploaded file. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | no |  | File. File data (G-code, STL, 3MF). Used if "File URL" is empty. AP materializes the whole file into RAM before this action runs — for very large files prefer the File URL input below. Files are not supported; an action that needs one fails. |
| `fileUrl` | string | no |  | File URL. Alternative to File — an HTTPS URL the piece will stream directly to SimplyPrint without buffering the whole file in memory. Recommended for files over ~500 MB. The URL must return a Content-Length header (S3 pre-signed URLs, Dropbox raw links, signed Google Drive download URLs, etc.). If set, the … |
| `filename` | string | no |  | Filename. Name to store the file under on SimplyPrint. MUST include the correct extension (e.g. .gcode, .stl, .3mf) — the backend picks the file type from the extension, not the contents. Required when using File URL unless the URL path ends in a filename with an extension. Optional with File (defaults to so… |

### `upload_and_queue`

**Upload File & Add to Queue.** Upload a print file (File input or HTTPS URL) and add it to the print queue in a single step, with quantity, group, target printers/models, tags, and custom fields; returns the new file ID and queue item ID. Pick this when the file is not yet on SimplyPrint; use add-to-queue if it already exists, and chain a start-print action to begin printing. Not idempotent — each call uploads and queues anew. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | no |  | File. File data (G-code, STL, 3MF). Used if "File URL" is empty. AP materializes the whole file into RAM before this action runs — for very large files prefer the File URL input below. Files are not supported; an action that needs one fails. |
| `fileUrl` | string | no |  | File URL. Alternative to File — an HTTPS URL the piece will stream directly to SimplyPrint without buffering the whole file in memory. Recommended for files over ~500 MB. The URL must return a Content-Length header (S3 pre-signed URLs, Dropbox raw links, etc.). If set, the File input is ignored. |
| `filename` | string | no |  | Filename. Name to store the file under on SimplyPrint. MUST include the correct extension (e.g. .gcode, .stl, .3mf) — the backend picks the file type from the extension, not the contents. Required when using File URL unless the URL path ends in a filename with an extension. Optional with File (defaults to so… |
| `groupId` | string | no |  | Queue group. Which queue group to add the item to. Required if your account has queue groups configured. Leave empty only if no queue groups exist. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | no | `1` | Quantity. Number of copies to queue (defaults to 1). |
| `position` | string | no | `"bottom"` | Insert at. Where in the queue to place the new item. One of `"bottom"`, `"top"`, `"specific"`. |
| `positionNumber` | number | no |  | Position number. Only used when "Insert at" is "Specific position". 1-based index (1 = very top). Requires queue-reorder permission. |
| `forPrinters` | array | no |  | Target printers. Restrict this queue item to one or more specific printers. Leave empty to allow any eligible printer. Values the product loads from the provider, such as ids; write an array of them. |
| `forModels` | array | no |  | Target printer models. Restrict to printers of specific models. Leave empty to auto-tag from the gcode file (if applicable). Built from the models your printers are using. Values the product loads from the provider, such as ids; write an array of them. |
| `customTags` | array | no |  | Tags: Custom tags. Custom tags to apply. Leave empty to auto-tag from the gcode file (if applicable). Values the product loads from the provider, such as ids; write an array of them. |
| `nozzleSize` | number | no |  | Tags: Nozzle size (mm). Target nozzle diameter, e.g. `0.4`. Leave empty to auto-tag from the gcode file. |
| `nozzleType` | string | no |  | Tags: Nozzle type. Nozzle material. Leave empty to auto-tag from the gcode file. One of `"standard"`, `"plated_brass"`, `"hardened_steel"`, `"stainless_steel"`, `"tungsten_carbide"`, `"ruby_tipped"`, `"hemispherical"`. |
| `nozzleVolumeType` | string | no |  | Tags: Nozzle volume type. Nozzle flow category. Leave empty to auto-tag from the gcode file. One of `"standard"`, `"high_flow"`. |
| `bedType` | string | no |  | Tags: Bed type. Printer bed surface. Leave empty to auto-tag from the gcode file. A value the product loads from the provider, such as an id; write the value itself. |
| `customFields` | object | no |  | Custom fields. Optional. Object keyed by custom-field UUID (fieldId) → value. PRINT_QUEUE category is auto-applied. |

### `upload_to_folder`

**Upload File to Folder.** Upload a print file (File input or HTTPS URL) and save it as a persistent user-file inside a chosen folder of the SimplyPrint file system, returning a user-file UID. Pick this over plain upload-file when the file should live in the library/folders; pick upload-and-queue instead when the goal is to print it. Not idempotent — each call creates a new user-file. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | no |  | File. File data (G-code, STL, 3MF). Used if "File URL" is empty. AP materializes the whole file into RAM before this action runs — for very large files prefer the File URL input below. Files are not supported; an action that needs one fails. |
| `fileUrl` | string | no |  | File URL. Alternative to File — an HTTPS URL the piece will stream directly to SimplyPrint without buffering the whole file in memory. Recommended for files over ~500 MB. The URL must return a Content-Length header (S3 pre-signed URLs, Dropbox raw links, etc.). If set, the File input is ignored. |
| `filename` | string | no |  | Filename. Name to store the file under on SimplyPrint. MUST include the correct extension (e.g. .gcode, .stl, .3mf) — the backend picks the file type from the extension, not the contents. Required when using File URL unless the URL path ends in a filename with an extension. Optional with File (defaults to so… |
| `folderId` | number | no | `0` | Folder ID. Numeric ID of the destination folder. Use 0 (or leave empty) to save to the root of the user file system. Look up folder IDs with the "List Files" action. |
| `customFields` | object | no |  | Custom fields. Optional. Object keyed by custom-field UUID (fieldId) → value. PRINT category / USER_FILE sub-category is auto-applied. |

### `move_file`

**Move File.** Moves one or more user files into a target folder, identified by user-file UID(s) (comma-separate to move several at once) and a destination folder ID (0 for root). Look up UIDs via "List Files". Idempotent: moving files already in the target folder leaves them in the same place. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileUids` | string | yes |  | File UID(s). User-file UID string. Comma-separate to move several files at once. Use "List Files" to look up UIDs. |
| `targetFolderId` | number | yes |  | Target folder ID. Destination folder. Use 0 for the root folder. |

### `create_folder`

**Create or Update Folder.** Creates a folder in the user file system, or edits an existing one when a folder ID is supplied (the mode is chosen by whether that ID is present). Can mark it a shared "organization" folder with per-rank view/upload/modify permissions (requires the Shared Folders feature). Requires a name and parent folder ID (0 for root). Not idempotent in create mode: each call without a folder ID makes a new folder; edit mode keyed on a folder ID is idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | number | no |  | Folder ID (edit existing). Numeric ID of the folder to edit. Omit to create a new folder. |
| `name` | string | yes |  | Folder name. Display name (max 128 chars). |
| `parentFolder` | number | yes | `0` | Parent folder ID. Numeric ID of the parent folder. Use 0 for root. |
| `org` | boolean | no | `false` | Shared (organization) folder. When true, the folder is shared across the company per the rank-based permissions below. Requires the Shared Folders feature. |
| `viewRanks` | array | no |  | View — user rank IDs. Only used when "Shared folder" is true. Numeric user rank IDs allowed to view the folder. |
| `uploadRanks` | array | no |  | Upload — user rank IDs. Only used when "Shared folder" is true. Numeric user rank IDs allowed to upload to the folder. |
| `modifyRanks` | array | no |  | Modify — user rank IDs. Only used when "Shared folder" is true. Numeric user rank IDs allowed to modify / delete contents. |

### `delete_files`

**Delete Files.** Permanently delete one or more SimplyPrint files by their UID, identifying them via the file UID strings (look these up with List Files first). Use when the caller wants to remove files from the account; deletion is destructive and not idempotent — re-running with an already-deleted UID surfaces that UID under the partial-success error report rather than succeeding. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileUids` | array | yes |  | File UIDs. UID strings of the files to delete. Look up via "List Files". |

### `delete_folders`

**Delete Folders.** Permanently deletes one or more user-file folders and all of their contents, given numeric folder IDs. The call is all-or-nothing: it fails entirely if any listed folder is not modifiable by the caller. Idempotent in effect: re-deleting an already-gone folder converges to the same end state, but verify IDs first since this destroys files. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderIds` | array | yes |  | Folder IDs. Numeric folder IDs to delete. |

### `update_file`

**Update File.** Update an existing user file (identified by its UID): rename it and/or set which printers or printer models it is allowed to print on, and optionally remove its stored thumbnail. Pick this to edit file metadata in place; passing empty printer/model arrays clears those restrictions. It sets fields to the supplied values (upsert-by-UID), so repeating the same update is idempotent; at least one field must be provided. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileUid` | string | yes |  | File UID. UID string of the file to update (10-36 chars). Look up via "List Files". |
| `name` | string | no |  | New name. New display name (max 256 chars). Keep the existing extension — backend infers file type from it. |
| `printerIds` | array | no |  | Restrict to printer IDs. Numeric printer IDs the file is allowed to print on. Leave empty to clear printer-restriction. |
| `printerModelIds` | array | no |  | Restrict to printer model IDs. Numeric model IDs the file is allowed to print on. Leave empty to clear model-restriction. |
| `removeThumbnail` | boolean | no | `false` | Remove existing thumbnail. When true, deletes any thumbnail currently stored on the file. |

### `download_file`

**Download File.** Downloads a file from SimplyPrint and returns it as a reusable file reference for downstream steps. A "source" mode selects which kind of file the identifier refers to: user-file UID, numeric queue-item ID, or print-job UID. Use after locating the item via "List Files" / "List Queue Items" / "List Print History"; the identifier format must match the chosen source. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source` | string | yes | `"userFile"` | Source. Which kind of file to fetch. One of `"userFile"`, `"queueItem"`, `"printJob"`. |
| `identifier` | string | yes |  | Identifier. UID for "User file" / "Print job", numeric ID for "Queue item". Look these up via "List Files" / "List Print History" / "List Queue Items". |
| `filename` | string | no |  | Filename override (optional). Name to store the downloaded file under in AP. Defaults to the Content-Disposition value or the identifier. |

### `list_filaments`

**List Filaments.** Lists filament spools in the account, with optional filters (material type, brand, color, assigned/unassigned, empty/non-empty, assigned printer) and sort. Use to find spools or check stock before assigning filament or starting a print; leave all filters empty to return every spool. This endpoint has no offset paging, so "limit" (1-100) is the only cap. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `materialType` | string | no |  | Material type filter. Substring match against material type, e.g. `PLA`, `PETG`. Leave empty for no filter. |
| `brand` | string | no |  | Brand filter. Substring match against brand name. Leave empty for no filter. |
| `color` | string | no |  | Color filter. Substring match against color name, hex, or group. Leave empty for no filter. |
| `assigned` | string | no | `"any"` | Assignment filter. Whether to include only assigned spools, only unassigned, or both. One of `"any"`, `"true"`, `"false"`. |
| `empty` | string | no | `"any"` | Empty filter. Filter by empty / non-empty status. "Empty" means filament left ≤ 0 or marked as emptied. One of `"any"`, `"true"`, `"false"`. |
| `printerId` | number | no |  | Printer ID filter. Only return spools currently assigned to this printer (numeric ID). |
| `sortBy` | string | no |  | Sort by. Field to sort the result list by. Leave empty to use backend default ordering. One of `"created"`, `"last_used"`, `"left"`, `"brand"`, `"color"`. |
| `sortDir` | string | no | `"desc"` | Sort direction. Only applied when "Sort by" is set. One of `"desc"`, `"asc"`. |
| `limit` | number | no |  | Max results (limit). Cap on returned spools (1–100). Leave empty for no cap. Backend has no offset-pagination on this endpoint, so this is the only cap available. |

### `get_filament`

**Get Filament.** Read-only lookup of a single filament spool's full details by numeric spool ID or 4-char short ID (uid). Pick this when you already have one spool reference and need its current attributes (material, color, remaining amount, etc.); to enumerate spools instead, use the list action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filamentId` | string | yes |  | Filament. Numeric spool ID, OR the 4-character short ID (`uid`) printed on the QR sticker / NFC tag. In automation flows this typically comes from a previous step (trigger payload, MCP response, etc.). |

### `create_filament`

**Create Filament.** Create one or more new filament spool records in inventory, supplying brand/color/diameter and total length-or-weight, optionally via catalog SKU IDs instead of free-text. Use the "Number of spools" field to create N identical spools at once (capped at 500). Not idempotent — each call adds new spools, so re-running creates duplicates; either a material type ID or a catalog filament-ID chain is required. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brand` | string | yes |  | Brand. Free-text brand name (always required, even when catalog ids are set). |
| `colorName` | string | yes |  | Color name. |
| `colorHex` | string | yes |  | Color hex. Hex color (e.g. `#FF8800`). For multi-color spools, comma-separate (e.g. `#FF8800,#0044CC`). |
| `width` | string | yes | `"1.75"` | Filament diameter (mm). One of `"1.75"`, `"2.85"`, `"3.00"`. |
| `totalLength` | number | yes |  | Total length / weight. Spool size — interpretation depends on "Length type" below. Required when creating a new spool. |
| `totalLengthType` | string | yes | `"g"` | Length type. Unit for "Total length / weight" and "Length used". One of `"g"`, `"kg"`, `"m"`, `"mm"`. |
| `lengthRemaining` | number | no |  | Length remaining. Amount of filament still on the spool. For a brand-new untouched spool, set this equal to "Total length / weight". For a partially-used spool, set this lower. Same unit as "Length type". (Backend's `length_used` POST param is, despite its name, semantically "remaining" — see Create.php math.) |
| `amount` | number | no | `1` | Number of spools. Create N identical spools at once (capped at 500). Defaults to 1. |
| `filamentType` | number | no |  | Material type ID. Numeric id of the material type / profile (look up via "List Filaments" results — `type.id` on each spool — or via your filament management page). EITHER this OR a "Catalog filament ID" (+ optional "Catalog variant ID") pair is required when creating a new spool — the backend uses the catalog chain… |
| `cost` | number | no |  | Cost (per spool). Optional. Spool cost in account currency (cents/whole-units depending on your currency). |
| `locationId` | number | no |  | Location ID. Optional. Numeric id of the storage location. |
| `nfcId` | string | no |  | NFC ID. Optional. NFC tag identifier for app tracking. |
| `qrId` | string | no |  | QR ID (short ID). Optional. 4-character short id printed on the spool QR sticker. Auto-generated if omitted. |
| `brandId` | number | no |  | Catalog brand ID. |
| `brandFilamentId` | number | no |  | Catalog filament ID. |
| `brandColorId` | number | no |  | Catalog color ID. |
| `brandVariantId` | number | no |  | Catalog variant ID. |

### `adjust_filament_weight`

**Adjust Filament Weight.** Set the remaining filament on a spool, identified by numeric ID or the 4-character QR/NFC short ID, by supplying exactly one of grams remaining, percent remaining, or weighed gross (with optional empty-spool-weight handling). Pick it to correct or record spool inventory. Idempotent: the call sets the spool to an absolute value rather than incrementing. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filamentId` | string | yes |  | Filament. Numeric spool ID, OR the 4-character short ID (`uid`) printed on the QR sticker / NFC tag. |
| `gramsRemaining` | number | no |  | Grams remaining. Net grams of filament left on the spool. |
| `percentRemaining` | number | no |  | Percent remaining (0-100). Alternative to grams — share of the spool still on the reel. |
| `weighedGross` | number | no |  | Weighed gross (grams). Total weight including the empty spool. Combine with "subtract empty spool" to compute net. |
| `emptySpoolWeight` | number | no |  | Empty spool weight (g). Override the empty spool weight used for the gross calculation. |
| `subtractEmptySpool` | boolean | no | `true` | Subtract empty spool from gross. |
| `saveEmptySpoolWeight` | boolean | no | `false` | Persist empty spool weight on spool record. |

### `mark_filament_dried`

**Mark Filament as Dried.** Record a drying event for one or more spools (by numeric ID or 4-char short ID), setting each spool's last-dried timestamp to the given time or now. Pick this after running spools through a dryer to keep moisture tracking current; it overwrites the last-dried timestamp, so re-running it advances the recorded time rather than stacking. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filamentIds` | array | yes |  | Filaments. Spool IDs (numeric) or 4-character short IDs (uid) — comma-separated short IDs are resolved one-by-one. Pure numeric values skip the lookup round-trip. |
| `driedAt` | string | no |  | Dried at (ISO 8601). When drying completed. Defaults to now if omitted (e.g. `2026-04-26T12:34:00Z`). |

### `get_filament_history`

**Get Filament History.** Read-only, paginated history of events for a single filament spool (by numeric ID or 4-char short ID) — print jobs, weight adjustments, drying cycles, and similar. Pick this to audit how a specific spool has been used over time; use Get Filament for the spool's current state rather than its event log. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filamentId` | string | yes |  | Filament. Numeric spool ID, OR the 4-character short ID (`uid`) printed on the QR sticker / NFC tag. |
| `page` | number | no |  | Page (optional). Page number (1-based). Defaults to 1. |
| `perPage` | number | no |  | Per page (optional). Items per page (max 100). Defaults to backend default. |

### `assign_filament`

**Assign Filament to Printer.** Load a filament spool (by numeric ID or 4-char short ID) onto a printer at a given nozzle/extruder slot, defaulting to nozzle 0 / extruder 0. Pick this to record which spool is mounted before a print; set the nozzle/extruder indices for multi-nozzle or multi-material printers. Assigning the same spool to the same slot again is effectively idempotent (it sets the slot to that spool); the backend rejects out-of-range nozzle/extruder indices. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerId` | number | yes |  | Printer ID. Numeric printer ID. In automation flows this typically flows in from a trigger or upstream step. |
| `filamentId` | string | yes |  | Filament. Numeric spool ID, OR the 4-character short ID (`uid`) printed on the QR sticker / NFC tag. |
| `nozzleIndex` | number | no | `0` | Nozzle index. Which nozzle on the printer (0-based). Use 0 for single-nozzle printers. Multi-nozzle printers (IDEX, toolchanger) use 1+ for the additional nozzles. Backend rejects with "Nozzle out of range" if the printer doesn't have this many nozzles. |
| `extruderIndex` | number | no | `0` | Extruder index. Which extruder on the chosen nozzle (0-based). Use 0 for single-extruder nozzles. Multi-material setups (MMS, MMU, AMS) use 1+ for the additional extruders feeding the same nozzle. Backend rejects with "Extruder out of range" if the nozzle doesn't have this many extruders. |

### `unassign_filament`

**Unassign Filament.** Detach a filament spool (by numeric ID or 4-char short ID) from whatever printer/slot it is currently mounted on; the backend infers the printer from the spool's current assignment, so you only supply the spool. Pick this to free a spool before moving or replacing it; unassigning an already-unassigned spool has no further effect, so the result state is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filamentId` | string | yes |  | Filament. Numeric spool ID, OR the 4-character short ID (`uid`) printed on the QR sticker / NFC tag. |

### `list_print_history`

**List Print History.** Lists completed print jobs page by page, optionally restricted to a single printer ID. Use to browse or search print history and obtain job UIDs before calling "Get Print Job" or "Download File"; leave the printer filter empty to span all printers. Supports page/limit paging (default 25, max 100 per page). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `printerId` | number | no |  | Printer ID (optional). Restrict to jobs from a specific printer. Leave empty for all printers. |
| `page` | number | no |  | Page (optional). Page number (1-based). Defaults to 1. |
| `limit` | number | no | `25` | Limit. Maximum number of jobs to return per page (default 25, max 100). |

### `get_print_job`

**Get Print Job.** Fetches one completed print job's full detail record by its print-job UID. Use to drill into a specific job after finding it via "List Print History" or a webhook; an optional flag also returns the custom-field schema alongside values. Requires the UID string (not a numeric ID). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobUid` | string | yes |  | Job UID. Print job UID string (typically 10+ characters). Comes from "List Print History" results or webhook payloads. |
| `includeCustomFieldDefinitions` | boolean | no | `false` | Include custom field definitions. When true, also returns the schema for the custom fields attached to the job (vs just values). |

### `archive_print_jobs`

**Archive Print Jobs.** Archive one or more completed print jobs by ID, removing them from the active history view, with an optional reason note. Use this to clean up finished jobs from the working history; archiving an already-archived job has no further effect, so the state change is idempotent per job. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobIds` | array | yes |  | Job IDs. Numeric print-job IDs to archive. |
| `reason` | string | no |  | Reason (optional). Optional note explaining why the jobs were archived (max 500 chars). |

### `unarchive_print_jobs`

**Unarchive Print Jobs.** Restore previously archived print jobs back into the active print-history view, given their numeric job IDs. Pick it to reverse an archive action; the inverse archive operation is a separate tool. Re-running with the same IDs is safe (already-active jobs stay active), so the effect is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobIds` | array | yes |  | Job IDs. Numeric print-job IDs to unarchive. |

### `list_tags`

**List Tags.** Lists every custom tag configured on the account. Use to discover tag IDs/names before filtering or attaching tags, or to delete one via "Delete Tag". Takes no input; returns an empty list when the account has no custom tags. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

### `create_tag`

**Create or Update Tag.** Create a custom tag with a name and badge color, or edit an existing one by passing its tag ID. Pick it to manage the tag catalog itself, not to attach/remove tags from entities (use the attach/detach tools for that). Create mode is not idempotent (a repeat call makes another tag); edit mode by stable ID is idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tagId` | number | no |  | Tag ID (edit existing). Numeric tag ID to edit. Omit to create a new tag. |
| `name` | string | yes |  | Tag name. Display name (max 32 chars). |
| `badge` | string | yes | `"primary"` | Badge style. Bootstrap badge color used to render the tag. One of `"primary"`, `"secondary"`, `"success"`, `"danger"`, `"warning"`, `"info"`, `"light"`, `"dark"`. |

### `assign_tag`

**Assign Custom Tag.** Attach one or more existing custom tags (by tag ID) to printers, printer groups, files, or queue items, selected via the subject type. By default it merges the tags into the subject's current set, so re-applying the same tags is harmless; enable "Replace existing tags" to overwrite the subject's tags instead, which is a destructive mode. The tags must already exist (create them first); this does not auto-create tags. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subjectType` | string | yes |  | Subject type. What kind of entity to tag. One of `1`, `2`, `3`, `4`. |
| `subjectIds` | array | yes |  | Subject IDs. Numeric IDs (or UID strings for files) of the entities to tag. Provide one or many. |
| `tagIds` | array | yes |  | Custom tag IDs. Numeric custom tag IDs to attach. From "List Tags" or "Create or Update Tag". |
| `override` | boolean | no | `false` | Replace existing tags. When true, replaces the subject's current custom tags. When false (default), merges with existing tags. |

### `detach_tag`

**Detach Tag.** Detach one custom tag (by tag ID) from a single entity — choose the subject type (printer, printer group, file, or queue item) and give its ID. Pick it to untag an entity, not to delete the tag definition itself. Idempotent: detaching a tag not present is a no-op. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subjectType` | string | yes |  | Subject type. One of `1`, `2`, `3`, `4`. |
| `subjectId` | string | yes |  | Subject ID. Numeric ID (or UID string for files) of the entity to detach the tag from. |
| `tagId` | number | yes |  | Tag ID. Numeric custom tag ID to remove. |

### `delete_tag`

**Delete Tag.** Deletes a custom tag from the account by its numeric tag ID, detaching it from every printer, file, and queue item it was attached to. Look up the ID via "List Tags" first. Idempotent in effect: the end state is the same whether or not the tag still existed. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tagId` | number | yes |  | Tag ID. Numeric custom tag ID to delete. |

### `get_current_user`

**Get Current User.** Look up the SimplyPrint account, company, and user identity behind the current connection. Read-only; pick it to resolve who the flow is acting as or to discover the account/company ID needed by other steps. Takes no inputs. Needs authentication.

Kind: safe to repeat.

No inputs.

### `list_custom_fields`

**List Custom Fields.** List the custom-field definitions on the account, optionally filtered by entity (e.g. PRINT_QUEUE, FILE, USER). Read-only; pick it to discover field UUIDs before submitting custom-field values on queue/upload actions. By default walks every page; pass an explicit page for single-page mode. Idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity` | string | no |  | Entity filter. Optional — e.g. PRINT_QUEUE, FILE, USER. Leave empty to list all. |
| `page` | number | no |  | Page (optional). Specific page number (1-based). Leave empty to walk all pages and return every field. |
| `pageSize` | number | no |  | Page size (optional). Items per page (max 100). Defaults to 100 when paging is requested. |

### `set_custom_field_values`

**Set Custom Field Values.** Writes custom-field values onto one or more entities selected by a category (print, printer, filament, user file, user) and, for the "print" category, a sub-category that pins the exact entity type. Values are an object keyed by custom-field UUID. Use to populate or overwrite metadata on known entity IDs; idempotent because it sets each field to the supplied value rather than appending. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `category` | string | yes |  | Category. Entity category the fields belong to. One of `"print"`, `"printer"`, `"filament"`, `"user_file"`, `"user"`. |
| `subCategory` | string | no |  | Sub-category. Only applicable for the "print" category. Pick the specific entity type the fields belong to. One of `"print_queue"`, `"print_job"`, `"user_file"`. |
| `entityIds` | array | yes |  | Entity IDs. Numeric IDs of the target entities. |
| `values` | object | yes |  | Values. Object keyed by custom-field UUID (fieldId) → value. Converted to the backend submission array automatically. |

### `get_statistics`

**Get Account Statistics.** Read-only fetch of lifetime account-level printing statistics (total prints, materials used, total hours, etc.) in the panel's general/overview mode. Pick this for a high-level summary of account usage; it takes no inputs and never modifies anything. Needs authentication.

Kind: safe to repeat.

No inputs.

### `custom_api_call`

**Custom API Call.** Makes an arbitrary authenticated HTTP request to any SimplyPrint REST endpoint, choosing the method, path, query params, and JSON body. Use as an escape hatch for endpoints this piece does not wrap with a dedicated action. Not idempotent — the effect depends on the method and endpoint called. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PUT"`, `"PATCH"`, `"DELETE"`. |
| `path` | string | yes |  | Path. Endpoint path relative to the account, e.g. "printers/Get" or "queue/AddItem". Do not include the host or the account ID segment. |
| `queryParams` | object | no |  | Query params. |
| `body` | JSON | no |  | JSON body. Only used for POST/PUT/PATCH. |
| `timeoutMs` | number | no |  | Timeout (ms). Optional request timeout in milliseconds. |
| `includeResponseHeaders` | boolean | no | `false` | Include response headers. Return `{ body, headers, status }` instead of just the body. |
