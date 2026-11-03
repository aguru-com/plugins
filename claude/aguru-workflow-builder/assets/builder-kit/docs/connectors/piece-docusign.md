# Docusign

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-docusign'
  version: '0.3.3'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Integration key / Client ID. This can be obtained in your developer account from the<https://admindemo.docusign.com/authenticate?goTo=appsAndKeys\|Apps and Keys> page. See the https://support.docusign.com/guides/ndse-admin-guide-api-and-keys\|Docusign eSignature Admin Guide> for more information. |
| `privateKey` | string | yes |  | RSA private key. This is for the integration key you obtained above and can also be created on the <https://admindemo.docusign.com/authenticate?goTo=appsAndKeys\|Apps and Keys> page. You only need the private key, and it can only be copied once. Make sure to retain it for your records. |
| `environment` | string | yes |  | Environment. One of `"demo"`, `"www"`, `"eu"`. |
| `impersonatedUserId` | string | yes |  | Impersonated user ID. This is a GUID identifying the Docusign user that you will be impersonating with the access token. Your own User ID can be found at the top of the<https://admindemo.docusign.com/authenticate?goTo=appsAndKeys\|Apps and Keys> page. |
| `scopes` | string | yes |  | scopes. Comma-separated list of scopes. These represent the OAuth scopes (permissions) that are being requested. For eSignature REST API methods, use the signature scope. The impersonation scope is implied by the JWT Grant operation and does not need to be included. If the access token will be used for oth… |

## Actions

### `listEnvelopes`

**Search Signing Requests.** Lists DocuSign envelopes (signing requests) for an account, auto-paginating through all results. Filters are optional: with no filters it returns all envelopes, otherwise it narrows by status, sender/received date range, or a search keyword. Use to find envelopes by criteria before acting on them; requires the account ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. |
| `fromDate` | ISO date-time string | no |  | From date. |
| `toDate` | ISO date-time string | no |  | To date. |
| `searchText` | string | no |  | Search text. |
| `status` | string | no |  | Status. |
| `include` | array | no |  | Include (e.g. recipients). |

### `getEnvelope`

**Get Signing Request Details.** Retrieves the full details of a single DocuSign envelope (signing request) by its envelope ID, including status, recipients, and dates. Use when you already know the envelope ID and need its current state; requires the account ID and envelope ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. |
| `envelopeId` | string | yes |  | Envelope ID. |

### `getDocument`

**Download Document from Signing Request.** Downloads a document from a DocuSign envelope (signing request) as a file, given the account, envelope, and document ID. The document ID accepts a specific document number or special keywords — combined (all documents as one PDF), archive (a ZIP of all PDFs plus the certificate), certificate (only the completion certificate), or portfolio. Use to fetch signed or in-progress document files. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. |
| `envelopeId` | string | yes |  | Envelope ID. |
| `documentId` | string | yes |  | Document ID. The ID of the document to retrieve. Alternatively, you can use one of the following special keywords: combined: Retrieves all of the documents as a single PDF file. When the query parameter certificate is true, the certificate of completion is included in the PDF file. When the query parameter cert… |

### `createAndSendEnvelope`

**Send Document for Signing.** Creates a new DocuSign envelope from one or more uploaded documents and a set of signers (plus optional carbon-copy recipients), then either sends it immediately for signing or saves it as a draft depending on the chosen action. Use to start a new signing request; requires the account ID, an email subject, at least one document, and at least one signer. Not idempotent — each call creates and (unless saved as draft) sends a new envelope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. |
| `emailSubject` | string | yes |  | Email Subject. Subject line of the email sent to all recipients. |
| `emailBlurb` | string | no |  | Email Message. Optional message body included in the signing request email. |
| `status` | string | yes | `"sent"` | Action. One of `"sent"`, `"created"`. |
| `documents` | array | yes |  | Documents. Documents to include in the envelope. Each item: { `file`, `name`, `fileExtension`? }. |
| `signers` | array | yes |  | Signers. Recipients who must sign the envelope. Each item: { `name`, `email`, `routingOrder`? }. |
| `carbonCopies` | array | no |  | Carbon Copies (CC). Recipients who receive a copy of the completed envelope but do not sign. Each item: { `name`, `email`, `routingOrder`? }. |

### `updateEnvelope`

**Update Signing Request.** Modifies an existing DocuSign envelope by its ID, performing one of several operations selected via the operation input: send a draft (status to sent), void/cancel an in-progress envelope (requires a void reason), resend the signing email to recipients, or update the email subject and message. Use to advance, cancel, or amend an envelope you already created; requires the account ID and envelope ID. Not idempotent — operations like resend and void mutate state or send new emails on each call. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. |
| `envelopeId` | string | yes |  | Envelope ID. |
| `operation` | string | yes |  | Operation. One of `"send"`, `"void"`, `"resend"`, `"updateEmail"`. |
| `voidedReason` | string | no |  | Void Reason. Required when operation is "Void Envelope". Explain why the envelope is being voided. |
| `emailSubject` | string | no |  | Email Subject. Required when operation is "Update Email Subject / Message". New subject line for the signing email. |
| `emailBlurb` | string | no |  | Email Message. Used when operation is "Update Email Subject / Message". New body text for the signing email. |

### `listTemplates`

**Find Templates by Name.** Searches an account for reusable DocuSign envelope templates whose name matches the given full or partial template name, auto-paginating through all matches. Use to discover a template ID or confirm a template exists before building an envelope from it; requires the account ID and a template name to search for. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. |
| `templateName` | string | yes |  | Template Name. Full or partial name of the template to search for. |

### `findEnvelopeRecipients`

**Get People on a Signing Request.** Retrieves the list of all recipients on a DocuSign envelope by its ID — signers, carbon copies, certified deliveries, and other roles — along with their status. Use when you need to know who is on a signing request and where each person stands; requires the account ID and envelope ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. |
| `envelopeId` | string | yes |  | Envelope ID. |

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
