# Sendr

Create personalized landing pages, dynamic audio, video, and manage campaigns with Sendr.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sendr'
  version: '0.1.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> **How to get your API key:**
> 1. Log in to your Sendr dashboard at https://app.sendr.io.
> 2. Go to **Settings > API Keys**.
> 3. Click **Create New Key**.
> 4. Copy the key and paste it below.
>
> Need help? Contact Sendr support at https://sendr.io/support

## Actions

### `get_user_info`

**Get Account Info.** Fetches the Sendr account/seat tied to the connected API key. Use it to verify the connection is valid or to read the current user identity before other Sendr calls. Read-only; takes no input. Needs authentication.

Kind: safe to repeat.

No inputs.

### `list_sheets`

**List Sheets.** Lists all contact lists (sheets) in the Sendr workspace, returning each sheet id and name. Use it to discover the sheet id needed by sheet-scoped actions like Get Sheet, Get Sheet Columns, or Add Row to Sheet. Read-only; takes no input. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_sheet`

**Get Sheet.** Fetches details of a single contact list (sheet) by its id. Use it after List Sheets to inspect a specific sheet. Read-only; requires the sheet id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sheet` | string | yes |  | Sheet. Select the contact list (sheet) to use. A value the product loads from the provider, such as an id; write the value itself. |

### `get_sheet_columns`

**Get Sheet Columns.** Lists the columns (fields) of a contact list (sheet), including each column type and enrichment status. Use it to discover the valid column names before building row data for Add Row to Sheet. Read-only; requires the sheet id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sheet` | string | yes |  | Sheet. Select the contact list (sheet) to use. A value the product loads from the provider, such as an id; write the value itself. |

### `add_row_to_sheet`

**Add Row to Sheet.** Appends a new contact/record row to a sheet. Provide the sheet id and a key-value object where keys match the sheet column names (call Get Sheet Columns first to learn them). Not idempotent: each call inserts another row. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sheet` | string | yes |  | Sheet. Select the contact list (sheet) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `rowData` | object | yes |  | Row Data. Key-value pairs representing the new row. Keys should match the sheet column names. Example: { "Email": "john@example.com", "First Name": "John" }. |

### `list_campaigns`

**List Campaigns.** Lists campaigns in the Sendr workspace (up to 50), optionally narrowed by status (Draft, Active, or Paused); leaving the status filter empty returns all campaigns. Use it to discover the campaign id needed by Get Campaign. Read-only. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no | `""` | Status Filter. Filter campaigns by their current status. One of `""`, `"DRAFT"`, `"ACTIVE"`, `"PAUSED"`. |

### `get_campaign`

**Get Campaign.** Fetches full details of a single campaign by its id. Use it after List Campaigns to inspect one campaign. Read-only; requires the campaign id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign` | string | yes |  | Campaign. Select the campaign. A value the product loads from the provider, such as an id; write the value itself. |

### `list_page_templates`

**List Page Templates.** Lists the Sendr Page templates available for building personalized landing pages, returning each template id and name. Use it to discover the template id needed by Generate Sendr Page or Get Page Template Variables. Read-only; takes no input. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_page_template_variables`

**Get Page Template Variables.** Lists the variables (placeholders) defined in a page template, such as first_name or company, with each variable name, type, and default value. Use it to learn which variable keys to supply when calling Generate Sendr Page. Read-only; requires the template id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | string | yes |  | Page Template. Select a Sendr Page template to generate content from. A value the product loads from the provider, such as an id; write the value itself. |

### `generate_sendr_page`

**Generate Sendr Page.** Creates a personalized Sendr landing page by rendering a template with supplied variable values; optionally screenshots a website background, renders an animated GIF, and posts status updates to a callback URL. Requires a template id and a key-value variables object (use Get Page Template Variables to find the keys). Not idempotent: each call generates a new page. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | string | yes |  | Page Template. Select a Sendr Page template to generate content from. A value the product loads from the provider, such as an id; write the value itself. |
| `websiteUrl` | string | no |  | Website to Screenshot URL. Optional. Provide a website URL if the template supports background screenshots. |
| `renderGif` | boolean | no | `false` | Render GIF. If enabled, Sendr will generate an animated GIF version of the page. |
| `attributes` | object | no |  | Page Attributes. Optional metadata attributes for the generated page (key-value pairs). |
| `webhookUrl` | string | no |  | Webhook URL. Optional callback URL to receive status updates (e.g. when GIF or audio is ready). |
| `variables` | object | yes |  | Template Variables. Key-value pairs matching the template variables. Example: { "first_name": "Anna", "company": "Acme Inc" }. |

### `queue_dynamic_audio`

**Queue Dynamic Audio Generation.** Queues an async job that produces personalized audio by replacing a target word in a base audio file with a replacement word, optionally using a specific ElevenLabs voice and language. Requires the base audio URL, target word, and replacement word; results are delivered later (optionally to a callback URL). Not idempotent: each call enqueues a new generation job. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audioUrl` | string | yes |  | Base Audio URL. Public URL of the base audio file to personalize. |
| `targetWord` | string | yes |  | Target Word. The word to find and replace in the audio (e.g. "first_name" or "[NAME]"). |
| `replacementWord` | string | yes |  | Replacement Word. The word to insert in place of the target word (e.g. "Anna"). |
| `elevenlabsId` | string | no |  | ElevenLabs Voice ID. Optional ElevenLabs voice ID for the generated audio. |
| `languageCode` | string | no | `"en-US"` | Language Code. Optional language code (e.g. "en-US", "de-DE"). |
| `webhookUrl` | string | no |  | Webhook URL. Optional callback URL to receive status updates when the audio job is done. |

### `queue_video_generation`

**Queue Video Generation.** Queues an async video-generation job in one of two modes: merge an audio track onto a base video, or produce a lipsync video. Requires the mode and audio URL (plus a video/Mux source as the mode needs); results are delivered later (optionally to a callback URL). Not idempotent: each call enqueues a new job. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mode` | string | yes | `"merge"` | Mode. Choose the video generation mode. One of `"merge"`, `"lipsync"`. |
| `audioUrl` | string | yes |  | Audio URL. Public URL of the audio track to use. |
| `videoUrl` | string | no |  | Video URL. Public URL of the base video to use. |
| `muxAssetId` | string | no |  | Mux Asset ID. Optional Mux asset ID for the video source. |
| `targetWord` | string | no |  | Target Word. Optional target word for personalization. |
| `replacementWord` | string | no |  | Replacement Word. Optional replacement word. |
| `pageSlug` | string | no |  | Page Slug. Optional Sendr Page slug to associate with this video. |
| `webhookUrl` | string | no |  | Webhook URL. Optional callback URL to receive status updates when the video job is done. |

### `list_webhooks`

**List Webhooks.** Lists all webhooks registered in the Sendr workspace, returning each webhook URL, name, subscribed events, and enabled state. Use it to discover the webhook URL (the identifier) needed by Update/Delete/Toggle Webhook or Reveal Webhook Secret. Read-only; takes no input. Needs authentication.

Kind: safe to repeat.

No inputs.

### `create_webhook`

**Create Webhook.** Registers a new webhook so Sendr posts event notifications to a target URL. Requires a name, the destination URL, and a list of event names to subscribe to (e.g. page_render:created, contact_page_engagement:created). Not idempotent: each call registers another webhook. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Webhook Name. A human-readable name for the webhook. |
| `url` | string | yes |  | Webhook URL. The endpoint URL that Sendr will call when events occur. |
| `events` | array | yes |  | Events. List of event names to subscribe to (e.g. page_render:created, contact_page_engagement:created). |
| `attributes` | object | no |  | Attributes. Optional metadata attributes for the webhook. |
| `resourceType` | string | no |  | Resource Type. Optional resource type filter for the webhook. |
| `resourceId` | string | no |  | Resource ID. Optional resource ID filter for the webhook. |

### `update_webhook`

**Update Webhook.** Updates an existing webhook, identified by its URL, replacing the supplied fields (name, subscribed events, attributes, or resource filters). Use List Webhooks to find the URL. Idempotent: repeating the same update keyed on that URL yields the same final state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook` | string | yes |  | Webhook. Select the webhook to manage. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Webhook Name. New name for the webhook. |
| `events` | array | no |  | Events. Updated list of event names to subscribe to. |
| `attributes` | object | no |  | Attributes. Updated metadata attributes. |
| `resourceType` | string | no |  | Resource Type. Updated resource type filter. |
| `resourceId` | string | no |  | Resource ID. Updated resource ID filter. |

### `delete_webhook`

**Delete Webhook.** Deletes a registered webhook identified by its URL. Use List Webhooks to find the URL. Idempotent: once removed, repeating the call leaves the webhook absent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook` | string | yes |  | Webhook. Select the webhook to manage. A value the product loads from the provider, such as an id; write the value itself. |

### `reveal_webhook_secret`

**Reveal Webhook Secret.** Returns the signing secret of a registered webhook, identified by its URL, so incoming webhook signatures can be verified. Use List Webhooks to find the URL. Read-only lookup; repeating the call returns the same secret. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook` | string | yes |  | Webhook. Select the webhook to manage. A value the product loads from the provider, such as an id; write the value itself. |

### `toggle_webhook`

**Toggle Webhook.** Enables or disables a registered webhook, identified by its URL, by setting its enabled flag. Use List Webhooks to find the URL. Idempotent: repeating the call with the same enabled value yields the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook` | string | yes |  | Webhook. Select the webhook to manage. A value the product loads from the provider, such as an id; write the value itself. |
| `enabled` | boolean | yes | `true` | Enabled. Check to enable the webhook, uncheck to disable it. |

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
