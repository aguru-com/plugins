# Amazon SES

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-amazon-ses'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessKeyId` | string | yes |  | Access Key ID. |
| `secretAccessKey` | string | yes |  | Secret Access Key. |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-1"`, `"us-east-2"`, `"us-west-1"`, `"us-west-2"`, `"af-south-1"`, `"ap-east-1"`, `"ap-south-1"`, `"ap-northeast-3"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ap-northeast-1"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-south-1"`, `"eu-west-3"`, `"eu-north-1"`, `"me-south-1"`, `"sa-east-1"`, `"eu-south-2"`, `"ap-south-2"`, `"ap-southeast-3"` and 5 more. |

## Actions

### `send_email`

**Send Email.** Sends a one-off email through Amazon SES from a verified sender, with HTML or plain-text body (HTML mode auto-generates a text fallback), plus optional CC/BCC, reply-to, return path, configuration set, and tags. Use to deliver ad-hoc messages where the content is supplied inline rather than from a stored template. The sender address must already be verified in SES, and the chosen body format requires its matching content field. Not idempotent: each call dispatches a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromEmailAddress` | string | yes |  | From Email. Verified sender email address. A value the product loads from the provider, such as an id; write the value itself. |
| `toAddresses` | array | yes |  | To. Recipient email addresses. |
| `ccAddresses` | array | no |  | CC. Carbon copy recipients. |
| `bccAddresses` | array | no |  | BCC. Blind carbon copy recipients. |
| `subject` | string | yes |  | Subject. Email subject line. |
| `bodyFormat` | string | yes | `"html"` | Email Format. Choose email format. One of `"html"`, `"text"`. |
| `htmlBody` | string | no |  | HTML Content. HTML email content (auto-generates text version) |
| `textBody` | string | no |  | Text Content. Plain text email content. |
| `replyToAddresses` | array | no |  | Reply To. Reply-to email addresses. |
| `returnPath` | string | no |  | Return Path. Email address for bounce notifications. |
| `configurationSetName` | string | no |  | Configuration Set. SES configuration set for tracking. A value the product loads from the provider, such as an id; write the value itself. |
| `emailTags` | object | no |  | Email Tags. Key-value pairs for email tracking and analytics. |
| `sourceArn` | string | no |  | Source ARN. ARN for sending authorization (advanced) |
| `returnPathArn` | string | no |  | Return Path ARN. ARN for return path authorization (advanced) |

### `create_email_template`

**Create Email Template.** Creates a reusable Amazon SES email template (HTML, plain text, or both) with {{variable}} placeholders that can later be sent via Send Templated Email. Use when setting up a named template for repeated sends rather than dispatching a message now. The template name must be unique; by default the action fails if a template with that name already exists. Not idempotent: it registers a new template and errors on a duplicate name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateName` | string | yes |  | Template Name. Unique template name (letters, numbers, underscores, hyphens only) |
| `templateFormat` | string | yes | `"html"` | Template Format. Choose template format. One of `"html"`, `"text"`, `"both"`. |
| `subjectPart` | string | yes |  | Subject. Email subject (use {{variable}} for dynamic content) |
| `htmlPart` | string | no |  | HTML Content. HTML email content with variables like {{firstName}}. |
| `textPart` | string | no |  | Text Content. Plain text email content with variables like {{firstName}}. |
| `checkExisting` | boolean | no | `true` | Check if Template Exists. Verify template name is unique before creating. |
| `sampleData` | object | no |  | Sample Variable Data. Test data for template variables (optional preview) |

### `send_templated_email`

**Send Templated Email.** Sends an email through Amazon SES rendered from an existing named template, substituting the supplied key-value template variables, with optional CC/BCC, reply-to, return path, configuration set, and tags. Use when the message body lives in a pre-created SES template rather than inline content. Requires a verified sender, a template that already exists, and at least one template variable. Not idempotent: each call dispatches a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromEmailAddress` | string | yes |  | From Email. Verified sender email address. A value the product loads from the provider, such as an id; write the value itself. |
| `templateName` | string | yes |  | Email Template. Select template to use for this email. A value the product loads from the provider, such as an id; write the value itself. |
| `templateData` | object | yes |  | Template Variables. Data to replace template variables (e.g., {"firstName": "John", "company": "Acme"}) |
| `toAddresses` | array | yes |  | To. Recipient email addresses. |
| `ccAddresses` | array | no |  | CC. Carbon copy recipients. |
| `bccAddresses` | array | no |  | BCC. Blind carbon copy recipients. |
| `replyToAddresses` | array | no |  | Reply To. Reply-to email addresses. |
| `returnPath` | string | no |  | Return Path. Email address for bounce notifications. |
| `configurationSetName` | string | no |  | Configuration Set. SES configuration set for tracking. A value the product loads from the provider, such as an id; write the value itself. |
| `emailTags` | object | no |  | Email Tags. Key-value pairs for email tracking and analytics. |
| `sourceArn` | string | no |  | Source ARN. ARN for sending authorization (advanced) |
| `returnPathArn` | string | no |  | Return Path ARN. ARN for return path authorization (advanced) |

### `update_email_template`

**Update Email Template.** Overwrites an existing Amazon SES email template, replacing its subject and HTML/text content; an optional preserve-unspecified mode keeps the current HTML or text when a field is left blank instead of clearing it. Use to edit a template that already exists, not to create one. Idempotent: repeating the call with the same input leaves the template in the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateName` | string | yes |  | Template to Update. Select template to modify. A value the product loads from the provider, such as an id; write the value itself. |
| `loadCurrentContent` | boolean | no | `true` | Load Current Content. Pre-fill fields with existing template content. |
| `templateFormat` | string | yes | `"html"` | Template Format. Choose template format. One of `"html"`, `"text"`, `"both"`. |
| `subjectPart` | string | yes |  | Subject. Email subject (use {{variable}} for dynamic content) |
| `htmlPart` | string | no |  | HTML Content. HTML email content with variables like {{firstName}}. |
| `textPart` | string | no |  | Text Content. Plain text email content with variables like {{firstName}}. |
| `preserveUnspecified` | boolean | no | `false` | Preserve Unspecified Content. Keep existing HTML/text content if not provided. |
| `sampleData` | object | no |  | Sample Variable Data. Test data for template variables (optional preview) |

### `create_custom_verification_email_template`

**Create Custom Verification Email Template.** Creates a custom Amazon SES verification email template — the message sent to recipients to confirm an email identity — with a verified from-address, subject, HTML content (should contain the verification link), and success/failure redirect URLs. Use when defining the verification email before calling Send Custom Verification Email. The template name must be unique; by default it fails if one already exists. Not idempotent: it registers a new template and errors on a duplicate name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateName` | string | yes |  | Template Name. Unique template name (letters, numbers, underscores, hyphens only) |
| `fromEmailAddress` | string | yes |  | From Email. Verified sender email address. A value the product loads from the provider, such as an id; write the value itself. |
| `templateSubject` | string | yes |  | Subject. Email subject for verification messages. |
| `templateContent` | string | yes |  | Email Content. HTML content for verification email (must include verification link) |
| `successRedirectionURL` | string | yes |  | Success Redirect URL. URL to redirect users after successful verification. |
| `failureRedirectionURL` | string | yes |  | Failure Redirect URL. URL to redirect users if verification fails. |
| `checkExisting` | boolean | no | `true` | Check if Template Exists. Verify template name is unique before creating. |
| `validateUrls` | boolean | no | `true` | Validate URLs. Check that redirect URLs are properly formatted. |

### `send_custom_verification_email`

**Send Custom Verification Email.** Sends a custom verification email via Amazon SES to a target address using an existing custom verification template, starting the flow that adds that address as a verified SES identity once the recipient clicks the link. Use to begin verifying a new sender/recipient identity. Requires a pre-created verification template and (outside SES sandbox) production access to verify arbitrary addresses. Not idempotent: each call sends another verification email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `emailAddress` | string | yes |  | Email Address. Email address to verify and add to identities. |
| `templateName` | string | yes |  | Verification Template. Select custom verification email template. A value the product loads from the provider, such as an id; write the value itself. |
| `configurationSetName` | string | no |  | Configuration Set. SES configuration set for tracking (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `validateEmailFormat` | boolean | no | `true` | Validate Email Format. Check email address format before sending. |
| `checkExistingIdentity` | boolean | no | `true` | Check if Already Verified. Warn if email is already a verified identity. |

### `update_custom_verification_email_template`

**Update Custom Verification Email Template.** Overwrites an existing Amazon SES custom verification email template, replacing its from-address, subject, content, and success/failure redirect URLs; an optional preserve-unspecified mode keeps the current values when fields are left blank. Use to edit a verification template that already exists, not to create one. Idempotent: repeating the call with the same input leaves the template in the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateName` | string | yes |  | Template to Update. Select custom verification template to modify. A value the product loads from the provider, such as an id; write the value itself. |
| `loadCurrentContent` | boolean | no | `true` | Load Current Content. Pre-fill fields with existing template content. |
| `fromEmailAddress` | string | yes |  | From Email. Verified sender email address. A value the product loads from the provider, such as an id; write the value itself. |
| `templateSubject` | string | yes |  | Subject. Email subject for verification messages. |
| `templateContent` | string | yes |  | Email Content. HTML content for verification email (must include verification link) |
| `successRedirectionURL` | string | yes |  | Success Redirect URL. URL to redirect users after successful verification. |
| `failureRedirectionURL` | string | yes |  | Failure Redirect URL. URL to redirect users if verification fails. |
| `preserveUnspecified` | boolean | no | `false` | Preserve Unspecified Fields. Keep existing values if fields are empty. |
| `validateUrls` | boolean | no | `true` | Validate URLs. Check that redirect URLs are properly formatted. |
