# Pushover

Simple push notification service

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pushover'
  version: '0.2.10'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To obtain the api token:
>
> 1. Log in to Pushover.
> 2. Click on your Application or on Create an Application/API Token
> 3. Copy the API Token/Key.
>
> To obtain the user key:
> 1. Log in to Pushover
> 2. Copy your Your User Key
>
> Note if you want to send the message to your group, you should specify a group key instead of the user key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_token` | string | yes |  | Api Token. Pushover Api Token. |
| `user_key` | string | yes |  | User Key. Pushover User Key. |

## Actions

### `send_notification`

**Send Notification.** Sends a push notification through Pushover to the device(s) tied to the configured user/group key. Use to alert a person or group on their phone/desktop. The message body is required; optional priority (-2 to 2) controls urgency, and emergency priority (2) additionally requires retry and expire values. Not idempotent: each call delivers a new notification. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | no |  | Title. The title of the notification. |
| `message` | string | yes |  | Message. The message to send. |
| `html` | boolean | no |  | Enable HTML. To enable HTML parsing. |
| `priority` | number | no |  | Priority. The priority of the notification (-2 to 2). -2 is lowest priority. If set to 2, you should also specify Retry and Expire. |
| `retry` | number | no |  | Retry. Works only if priority is set to 2. Specifies how often (in seconds) the Pushover servers will send the same notification to the user. |
| `expire` | number | no |  | Expire. Works only if priority is set to 2. Specifies how many seconds your notification will continue to be retried for (every retry seconds). |
| `url` | string | no |  | URL. A supplementary URL to show with your message. |
| `url_title` | string | no |  | URL Title. A title for the URL specified as the url input parameter, otherwise just the URL is shown. |
| `timestamp` | string | no |  | Timestamp. a Unix timestamp of a time to display instead of when our API received it. |
| `device` | string | no |  | Device. The name of one of your devices to send just to that device instead of all devices. |

Output fields:

- `body.status`: Status (number)
- `body.request`: Request ID
- `body.receipt`: Receipt

### `send_push_message`

**Send Push Message.** Send a push notification to the user or group key on the connection, exposing every Pushover message parameter (sound, ttl, tags, attachment, monospace, callback). Emergency priority 2 requires both retry (>= 30 seconds) and expire (<= 10800 seconds), is capped at 50 total retries regardless of expire (retry=30 with expire=10800 therefore stops after about 25 minutes), ignores ttl, and is the only priority that returns a receipt for Get Emergency Receipt Status and the cancel actions. Not idempotent: every call delivers a new notification. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message` | string | yes |  | Message. Body of the notification. Required. |
| `title` | string | no |  | Title. Title shown above the message. Defaults to the application name when omitted. |
| `priority` | string | no |  | Priority. Delivery urgency. 2 (emergency) additionally requires Retry and Expire, ignores Time To Live, and returns a receipt. One of `-2`, `-1`, `0`, `1`, `2`. |
| `retry` | number | no |  | Retry. Emergency priority only. Seconds between repeat deliveries, minimum 30. Pushover stops after 50 retries even if Expire has not elapsed. |
| `expire` | number | no |  | Expire. Emergency priority only. Seconds to keep retrying for, maximum 10800. |
| `ttl` | number | no |  | Time To Live. Seconds after which the notification is auto-deleted from the device. Ignored at emergency priority (2). |
| `sound` | string | no |  | Sound. Notification sound. Leave on the default option to omit the parameter so the recipient device sound applies. A value the product loads from the provider, such as an id; write the value itself. |
| `url` | string | no |  | URL. Supplementary URL shown with the message, for example 'https://status.example.com/incident/42'. |
| `url_title` | string | no |  | URL Title. Link text for the supplementary URL. The raw URL is shown when omitted. |
| `device` | string | no |  | Device. Deliver only to this device name, for example 'iphone'. All devices receive it when omitted. |
| `timestamp` | string | no |  | Timestamp. Unix timestamp to display instead of the receive time, for example '1767225600'. |
| `html` | boolean | no |  | Enable HTML. Parse a limited HTML subset in the message. Cannot be combined with Monospace. |
| `monospace` | boolean | no |  | Monospace. Render the message in a monospace font. Cannot be combined with Enable HTML. |
| `tags` | string | no |  | Tags. Comma-separated tags stored with an emergency notification, for example 'deploy,prod'. Required upfront if you intend to use Cancel Emergency Retries by Tag. |
| `callback` | string | no |  | Callback URL. Emergency priority only. Pushover POSTs to this URL once the notification is acknowledged. |
| `attachment_base64` | string | no |  | Attachment (Base64). Base64-encoded image to attach, maximum 5242880 bytes decoded. Requires Attachment Type. |
| `attachment_type` | string | no |  | Attachment Type. MIME type of the attachment, for example 'image/jpeg'. Required when an attachment is supplied. |

Output fields:

- `status`: Status (number)
- `request`: Request ID
- `receipt`: Receipt

### `get_receipt_status`

**Get Emergency Receipt Status.** Read whether an emergency (priority 2) notification has been acknowledged, and whether its retries have expired. The receipt comes from Send Push Message sent at priority 2; no other priority produces one. This is a single read, not a wait loop: re-call it at most once every 5 seconds until acknowledged is 1 or expired is 1. Receipts stay valid for up to one week and older ids return an error. Safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `receipt` | string | yes |  | Receipt. Receipt id returned by Send Push Message at emergency priority, for example rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX. |

Output fields:

- `status`: Status (number)
- `acknowledged`: Acknowledged (number)
- `acknowledged_at`: Acknowledged At (number)
- `acknowledged_by`: Acknowledged By
- `acknowledged_by_device`: Acknowledged By Device
- `last_delivered_at`: Last Delivered At (number)
- `expired`: Expired (number)
- `expires_at`: Expires At (number)
- `called_back`: Called Back (number)
- `called_back_at`: Called Back At (number)
- `request`: Request ID

### `cancel_emergency_retries`

**Cancel Emergency Retries.** Stop Pushover from resending one emergency (priority 2) notification, identified by the receipt returned by Send Push Message. Use it once the underlying incident is resolved so the recipient stops being re-alerted; it deletes nothing and already-delivered notifications stay. To stop many notifications at once use Cancel Emergency Retries by Tag. Safe to retry: cancelling an already-cancelled receipt is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `receipt` | string | yes |  | Receipt. Receipt id returned by Send Push Message at emergency priority (2). |

Output fields:

- `status`: Status (number)
- `request`: Request ID

### `cancel_emergency_retries_by_tag`

**Cancel Emergency Retries by Tag.** Stop the retries of every still-active emergency (priority 2) notification sent with this tag. The tag must have been supplied in the Tags parameter of Send Push Message at send time; tags cannot be attached afterwards. Use Cancel Emergency Retries when you hold a single receipt instead. Safe to retry: it is a no-op once nothing with the tag is retrying. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag` | string | yes |  | Tag. A single tag that was supplied in the Tags parameter at send time, for example deploy. One tag only, with no spaces or slashes. |

Output fields:

- `status`: Status (number)
- `canceled`: Canceled Count (number)
- `request`: Request ID

### `validate_user_key`

**Validate User or Group Key.** Check before sending whether a user or group key exists, is not disabled, and has at least one active device, returning its device names and licenses. Use it to validate a key handed to you by someone else; leave the key blank to check the key stored on the connection. Read-only despite being a POST: nothing is delivered and nothing changes. Safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | no |  | User or Group Key. The 30-character user or group key to validate. Defaults to the key stored on the connection when left blank. |
| `device` | string | no |  | Device. Optional device name to validate alongside the key, for example iphone. |

Output fields:

- `status`: Status (number)
- `group`: Is Group (number)
- `devices`: Devices
- `licenses`: Licenses
- `request`: Request ID

### `get_app_limits`

**Get Monthly Message Limits.** Read the monthly message allowance of the application, how many messages remain, and the Unix timestamp when the counter resets. Use it before a bulk send, or to explain a 429 from Send Push Message, which means the monthly quota is exhausted rather than transient throttling. Takes no input. Safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `limit`: Monthly Limit (number)
- `remaining`: Remaining (number)
- `reset`: Quota Reset (number)
- `status`: Status (number)
- `request`: Request ID

### `update_glance`

**Update Glance Widget.** Silently update the Pushover glance widget on the recipient devices without sending a notification. Use it for a continuously refreshed status number or line of text, and use Send Push Message when the person should actually be alerted. At least one of title, text, subtext, count or percent is required. Fields persist between calls: omit a field to leave its current value alone. This action only sets field values and cannot clear a field once it has one. A registered widget is required and the Apple Watch is the only supported widget, so a success response on an account without one proves the call shape only. Safe to retry: the same values converge on the same widget state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | no |  | Title. Short description of the data, maximum 100 characters. Omit to leave unchanged. Values cannot be cleared once set. |
| `text` | string | no |  | Text. Main line of text, maximum 100 characters. Omit to leave unchanged. Values cannot be cleared once set. |
| `subtext` | string | no |  | Subtext. Second line of text, maximum 100 characters. Omit to leave unchanged. Values cannot be cleared once set. |
| `count` | number | no |  | Count. Integer shown on the widget, may be negative. Omit to leave unchanged. |
| `percent` | number | no |  | Percent. Integer from 0 to 100 rendered as a progress bar. Omit to leave unchanged. |
| `device` | string | no |  | Device. Update only this device name. All devices are updated when omitted. |

### `list_delivery_groups`

**List Delivery Groups.** List every delivery group on the account with its group key and name. This is the id resolver for every other group action: call it first to turn a group name into the group key that Get Delivery Group, Add User to Delivery Group and the rest require. Only groups owned by the same account as the application token are visible. Takes no input. Safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `groups`: Groups
- `groups[].group`: Group Key
- `groups[].name`: Name
- `count`: Count (number)
- `status`: Status (number)
- `request`: Request ID

### `get_delivery_group`

**Get Delivery Group.** Read one delivery group: its name and every member, including each member device, memo and whether the member is currently disabled. Use it to check membership before adding, removing, disabling or enabling a user. Resolve the group key with List Delivery Groups first. Safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_key` | string | yes |  | Group Key. The 30-character delivery group key. Resolve it with List Delivery Groups; this is not the user key stored on the connection. |

Output fields:

- `name`: Name
- `users`: Members
- `users[].user`: User Key
- `users[].device`: Device
- `users[].memo`: Memo
- `users[].disabled`: Disabled (boolean)
- `users[].valid`: Valid (boolean)
- `status`: Status (number)
- `request`: Request ID

### `create_delivery_group`

**Create Delivery Group.** Get or create a delivery group by name and return its group key. Pushover allows only one group per name on an account, so this action lists the existing groups first and returns the case-insensitive match with created=false instead of failing; it only creates when the name is unused, returning created=true. Safe to retry: a second call with the same name returns the same group key. Add members afterwards with Add User to Delivery Group. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the delivery group, for example On-Call Engineers. Matching against existing groups ignores case, and the name is returned exactly as Pushover stores it. |

Output fields:

- `group`: Group Key
- `name`: Name
- `created`: Created (boolean)

### `rename_delivery_group`

**Rename Delivery Group.** Rename one delivery group. The group key never changes, so existing flows keep delivering. Only one group per name may exist on an account, so renaming onto a name already in use fails: check with List Delivery Groups first. Safe to retry: renaming to the name it already has converges on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_key` | string | yes |  | Group Key. The 30-character delivery group key. Resolve it with List Delivery Groups. |
| `name` | string | yes |  | New Name. The new group name, for example Weekend On-Call. |

Output fields:

- `status`: Status (number)
- `request`: Request ID

### `add_user_to_group`

**Add User to Delivery Group.** Add one user key to a delivery group so the group key also delivers to them. Resolve the group key with List Delivery Groups and validate the user key with Validate User or Group Key first. Not idempotent: adding a user who is already a member fails, so check the members with Get Delivery Group before retrying. To restore a suspended member use Enable Group User instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_key` | string | yes |  | Group Key. The 30-character delivery group key. Resolve it with List Delivery Groups. |
| `user` | string | yes |  | User Key. The 30-character user key of the person to add. |
| `device` | string | no |  | Device. Limit group deliveries to this one device of the user. All of their devices receive them when omitted. |
| `memo` | string | no |  | Memo. Note stored with the membership, maximum 200 characters, for example Primary on-call. |

Output fields:

- `status`: Status (number)
- `request`: Request ID

### `remove_user_from_group`

**Remove User from Delivery Group.** Permanently remove a user key from a delivery group, discarding their device and memo settings. Prefer Disable Group User when the person should stop receiving messages only temporarily, since that is reversible with Enable Group User and this is not. Not idempotent: a repeat call for a user who is no longer a member fails with "user is not a member of this group", so confirm membership with Get Delivery Group before retrying. Re-adding afterwards is a fresh membership, not an undo. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_key` | string | yes |  | Group Key. The 30-character delivery group key. Resolve it with List Delivery Groups. |
| `user` | string | yes |  | User Key. The 30-character user key of the member to remove. Confirm membership with Get Delivery Group first. |

Output fields:

- `status`: Status (number)
- `request`: Request ID

### `disable_group_user`

**Disable Group User.** Suspend one member of a delivery group so group messages skip them while their membership, device and memo are kept. This is the reversible alternative to Remove User from Delivery Group: undo it with Enable Group User. Safe to retry: disabling an already-disabled member converges on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_key` | string | yes |  | Group Key. The 30-character delivery group key. Resolve it with List Delivery Groups. |
| `user` | string | yes |  | User Key. The 30-character user key of the member to suspend. Confirm membership with Get Delivery Group first. |

Output fields:

- `status`: Status (number)
- `request`: Request ID

### `enable_group_user`

**Enable Group User.** Re-enable a member of a delivery group who was suspended with Disable Group User, so group messages reach them again. It only works on someone who is still a member: a user removed with Remove User from Delivery Group has to be re-added with Add User to Delivery Group. Safe to retry: enabling an already-enabled member converges on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_key` | string | yes |  | Group Key. The 30-character delivery group key. Resolve it with List Delivery Groups. |
| `user` | string | yes |  | User Key. The 30-character user key of the suspended member. Confirm membership with Get Delivery Group first. |

Output fields:

- `status`: Status (number)
- `request`: Request ID

### `get_license_credits`

**Get License Credits.** Read how many prepaid Pushover license credits the application still holds. Call it before Assign License, which spends one credit irreversibly. Takes no input. Safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `credits`: Credits (number)
- `status`: Status (number)
- `request`: Request ID

### `assign_license`

**Assign License.** Assign a Pushover license to one user, identified by either their user key or their account email. This spends one prepaid credit, costs real money and cannot be revoked: there is no unassign endpoint. Check the balance with Get License Credits first and only call it when a human has explicitly asked for this person to be licensed. Not idempotent: a repeat call spends another credit. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | no |  | User Key. The 30-character user key to license. Supply either this or Email, not both. |
| `email` | string | no |  | Email. Pushover account email of the person to license, used when their user key is unknown. Supply either this or User Key, not both. |
| `os` | string | no |  | Operating System. Restrict the license to one platform. Any platform may be used when omitted. One of `"Android"`, `"iOS"`, `"Desktop"`. |

### `list_notification_sounds`

**List Notification Sounds.** List every sound identifier Pushover accepts, each with its human-readable name. Call it to resolve a sound before setting the Sound parameter of Send Push Message instead of guessing an identifier; omit the sound entirely to leave the recipient device default in place. Takes no input. Safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `sounds`: Sounds
- `sounds[].id`: Sound ID
- `sounds[].name`: Name
- `count`: Count (number)
- `status`: Status (number)
- `request`: Request ID

### `migrate_user_to_subscription`

**Migrate User to Subscription.** Convert a user key that already authorised this application into a subscription-specific user key, returning subscribed_user_key. Only meaningful for an application owner running a Pushover subscription, and it needs the subscription code from the subscription page; there is no programmatic way to subscribe someone who has not gone through the subscription URL. Send future messages to the returned key. Not idempotent: call it once per user and store the result. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription` | string | yes |  | Subscription Code. The subscription code shown on the Pushover subscription page, for example sABCDEFGHIJKLMNOPQRSTUVWXYZ. |
| `user` | string | no |  | User Key. The existing 30-character user key to migrate. Defaults to the key stored on the connection when left blank. |
| `device_name` | string | no |  | Device Name. Migrate only this one device of the user instead of the whole account. |
| `sound` | string | no |  | Sound. Default sound to set on the migrated subscription. Resolve an identifier with List Notification Sounds. |
