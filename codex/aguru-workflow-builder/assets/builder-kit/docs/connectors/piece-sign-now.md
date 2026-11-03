# SignNow

eSignature platform for sending, signing, and managing documents.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sign-now'
  version: '0.0.8'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Sign in with SignNow

> Connect your SignNow account using OAuth2. You will be redirected to SignNow to authorize access.

### `CUSTOM_AUTH`: API Key

> Authenticate using an API key from the SignNow dashboard.
>
> 1. Log in to the [SignNow API dashboard](https://app.signnow.com/webapp/developer-experience).
> 2. Go to **Apps and Keys** and select your application.
> 3. On the **API Keys** tab, copy your API key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Your SignNow API key. |

## Actions

### `cancel_invite`

**Cancel Invite to Sign.** Cancels the pending field invite on a SignNow document, halting the signing request and notifying recipients. Use to recall or stop a signing flow already sent out. Requires the document ID and a cancellation reason; it mutates the document state, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document ID. The ID of the document whose invite you want to cancel. |
| `reason` | string | yes |  | Cancellation Reason. The reason for cancelling the invite. |

### `upload_document`

**Upload Document.** Uploads a file (PDF, Word, PowerPoint, Excel, image, and more, up to 50 MB) into SignNow as a new document and returns its document ID for later signing or invite steps. Optionally parse simple text tags in the file into fillable fields. Use this as the first step before sending an invite on an ad-hoc file. Each call creates a separate document, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload. Accepted formats: .pdf, .doc, .docx, .odt, .rtf, .png, .jpg, .jpeg, .gif, .bmp, .xml, .xls, .xlsx, .ppt, .pptx, .ps, .eps. Maximum size: 50 MB. Files are not supported; an action that needs one fails. |
| `check_fields` | boolean | no | `false` | Parse Text Tags. Enable if your document contains simple text tags that should be converted to fillable fields. |

### `upload_document_and_extract_fields`

**Upload Document & Extract Fields.** Uploads a file (up to 50 MB) into SignNow as a new document and always parses its embedded text tags (e.g. {{t:s;r:y;...}}) into fillable fields, returning the document ID. Choose this over plain Upload Document when the file already contains SignNow text tags that should become signature/data fields. Each call creates a separate document, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload. Text tags in the document (e.g. {{t:s;r:y;o:"Signer 1";}}) will be converted to fillable fields. Accepted formats: .pdf, .doc, .docx, .odt, .rtf, .png, .jpg, .jpeg, .gif, .bmp, .xml, .xls, .xlsx, .ppt, .pptx, .ps, .eps. Maximum size: 50 MB. Files are not supported; an action that needs one fails. |

### `send_invite`

**Invite to Sign.** Sends a role-based field invite for an existing SignNow document, emailing each named signer to sign. Use when you already have an uploaded document with defined roles and want recipients to sign. Requires the document ID, the sender email tied to the SignNow account, and one signer entry per role (email, role name, signing order); signers sharing an order sign in parallel. Each call dispatches new invite emails, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document ID. The ID of the document to send for signing. |
| `from` | string | yes |  | Sender's Email. Must be the email address associated with your SignNow account. |
| `signers` | array | yes |  | Signers. One entry per signer role. Each signer needs an email, role name, and signing order. Each item: { `email`, `role`, `order`, `subject`?, `message`?, `redirect_uri`?, `language`?, `expiration_days`? }. |
| `subject` | string | no |  | Email Subject (All Signers). Default email subject for all signers. Overridden by per-signer subject if set. |
| `message` | string | no |  | Email Message (All Signers). Default email body for all signers. Overridden by per-signer message if set. |
| `cc` | array | no |  | CC Recipients. Email addresses to CC on the invite. |
| `cc_subject` | string | no |  | CC Email Subject. Subject line for CC recipient emails. |
| `cc_message` | string | no |  | CC Email Message. Body message for CC recipient emails. |

### `create_document_from_template_and_send_invite`

**Create Document From Template & Send Free Form Invite.** Copies a SignNow template into a new document and sends a free-form (no predefined roles) signing invite to a single signer, returning the new document ID. Use for templates where the signer fills fields freely rather than by assigned role; for role-based templates use the role-based invite action instead. Requires the template ID, the signer email, and the sender email tied to the SignNow account. Each call creates a new document and dispatches an invite, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template ID. The ID of the template to create the document from. |
| `document_name` | string | no |  | Document Name. Name for the new document. Defaults to the template name if not provided. |
| `to` | string | yes |  | Signer's Email. Email address of the signer. A free form invite can be sent to the sender's own email address. |
| `from` | string | yes |  | Sender's Email. Must be the email address associated with your SignNow account. |
| `subject` | string | no |  | Email Subject. Subject line of the invite email sent to the signer. |
| `message` | string | no |  | Email Message. Body message of the invite email sent to the signer. |
| `cc` | array | no |  | CC Recipients. Email addresses to CC on the invite. |
| `cc_subject` | string | no |  | CC Email Subject. Subject line of the email sent to CC recipients. |
| `cc_message` | string | no |  | CC Email Message. Body message of the email sent to CC recipients. |
| `language` | string | no |  | Language. Language for the signing session and notification emails. One of `"en"`, `"es"`, `"fr"`. |
| `redirect_uri` | string | no |  | Redirect URL. URL the signer is redirected to after signing. |
| `close_redirect_uri` | string | no |  | Close Redirect URL. URL that opens when the signer clicks the Close button. |
| `redirect_target` | string | no |  | Redirect Target. Whether to open the redirect URL in a new tab or the same tab. One of `"blank"`, `"self"`. |

### `create_document_from_template_and_send_role_based_invite`

**Create Document From Template & Send Role-Based Invite.** Copies a SignNow template into a new document and sends a role-based field invite to one or more signers matched to the template roles, returning the new document ID. Use for templates with predefined roles/fields where each signer is assigned by role name; for free-form signing use the free-form invite action instead. Requires the template ID, the sender email tied to the SignNow account, and one signer entry per role (email, role name, signing order); signers sharing an order sign in parallel. Each call creates a new document and dispatches invites, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template ID. The ID of the template to create the document from. |
| `document_name` | string | no |  | Document Name. Name for the new document. Defaults to the template name if not provided. |
| `from` | string | yes |  | Sender's Email. Must be the email address associated with your SignNow account. |
| `signers` | array | yes |  | Signers. One entry per signer role defined in the template. Each signer must have an email and a role name (e.g. "Signer 1"). Each item: { `email`, `role`, `order`, `subject`?, `message`?, `redirect_uri`? }. |
| `subject` | string | no |  | Email Subject (All Signers). Default email subject sent to all signers. Overridden by per-signer subject if set. |
| `message` | string | no |  | Email Message (All Signers). Default email body sent to all signers. Overridden by per-signer message if set. |
| `cc` | array | no |  | CC Recipients. Email addresses to CC on the invite. |
| `cc_subject` | string | no |  | CC Email Subject. Subject line for CC recipient emails. |
| `cc_message` | string | no |  | CC Email Message. Body message for CC recipient emails. |
| `expiration_days` | number | no |  | Expiration Days. Number of days before the invite expires (1-180). Defaults to 30. |
| `language` | string | no |  | Language. Language for the signing session and notification emails. One of `"en"`, `"es"`, `"fr"`. |

### `create_document_group_from_template_and_send_invite`

**Create Document Group From Template Group & Send Invite.** Creates a new SignNow document group from a document-group template and sends a multi-step group invite to its signers, returning the group ID and per-document IDs. Use when several documents must be signed together as a package; for a single document use the document-template invite actions instead. Requires the document-group template ID, a group name, and one signer entry per recipient (email, role name, permitted action of sign/approve/view, and signing step); signers sharing a step act in parallel and each may target a specific document or all of them. Each call creates a new group and dispatches invites, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Document Group Template ID. The unique ID of the document group template. |
| `group_name` | string | yes |  | Document Group Name. Name for the new document group. |
| `signers` | array | yes |  | Signers. One entry per signer. Each signer needs an email, role name, and the document they are signing within the group. Signing order determines the step sequence. Each item: { `email`, `role_name`, `document_id`?, `action`, `order`, `subject`?, `message`?, `language`?, `redirect_uri`? }. |
| `cc` | array | no |  | CC Recipients. Email addresses to CC on the invite. |

### `custom_api_call`

**Custom API Call.** Make a custom authenticated request to any SignNow API endpoint. Needs authentication.

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
