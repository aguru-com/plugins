# Trust

Collect and manage video and text testimonials from your customers.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-trust'
  version: '0.1.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect your Trust account using your Workspace ID and API key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace ID. Your Trust workspace ID. Find it in your Trust dashboard URL: https://app.usetrust.io/workspace/{workspaceId}/... |
| `api_key` | string | yes |  | API Key. Go to your Trust dashboard > Settings > API to generate an API key. |

## Actions

### `create_testimonial`

**Create Testimonial.** Create a new testimonial in the Trust workspace with author details (name, email, job title, company), text and/or video content, a 1-5 star rating, plus published and consent flags. Pick this to add a fresh testimonial; media must already be hosted (pass URLs or embed HTML — upload files first via the upload actions). Each call creates a new testimonial, so retries produce duplicates (not idempotent). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstname` | string | no |  | First Name. |
| `lastname` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `title` | string | no |  | Job Title. The testimonial author's job title (e.g. CEO, Marketing Manager). |
| `subtitle` | string | no |  | Subtitle. |
| `company` | string | no |  | Company. |
| `testimonialText` | string | no |  | Testimonial Text. The written testimonial content. |
| `stars` | number | no |  | Star Rating. Rating from 1 to 5. |
| `imageUrl` | string | no |  | Profile Image URL. URL of the author profile image. |
| `videoUrl` | string | no |  | Video URL. URL of the testimonial video. |
| `externalVideoHtml` | string | no |  | External Video HTML. Embed HTML for an external video (e.g. YouTube or Vimeo embed code). |
| `published` | boolean | no | `false` | Published. Whether this testimonial is publicly visible. |
| `gaveConsent` | boolean | no | `false` | Gave Consent. Whether the author gave consent to publish this testimonial. |
| `consentDateTime` | ISO date-time string | no |  | Consent Date & Time. |

### `update_testimonial`

**Update Testimonial.** Update an existing Trust testimonial identified by its testimonial ID; the ID and the author email are required, while content fields (text, rating, media URLs, published and consent flags) are optional. Pick this to edit or publish/unpublish a known testimonial rather than Create Testimonial, which would add a duplicate. It overwrites via PUT with the supplied fields, so repeating the same call yields the same state (idempotent). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `testimonialId` | string | yes |  | Testimonial ID. The ID of the testimonial to update. |
| `firstname` | string | no |  | First Name. |
| `lastname` | string | no |  | Last Name. |
| `email` | string | yes |  | Email. Required by the Trust API to identify the testimonial. |
| `title` | string | no |  | Job Title. |
| `subtitle` | string | no |  | Subtitle. |
| `company` | string | no |  | Company. |
| `testimonialText` | string | no |  | Testimonial Text. |
| `stars` | number | no |  | Star Rating. Rating from 1 to 5. |
| `imageUrl` | string | no |  | Profile Image URL. |
| `videoUrl` | string | no |  | Video URL. |
| `externalVideoHtml` | string | no |  | External Video HTML. |
| `published` | boolean | no |  | Published. |
| `gaveConsent` | boolean | no |  | Gave Consent. |
| `consentDateTime` | ISO date-time string | no |  | Consent Date & Time. |

### `delete_testimonial`

**Delete Testimonial.** Permanently delete a Trust testimonial identified by its testimonial ID. Pick this only for outright removal; to merely hide a testimonial from public view, use Update Testimonial and set published to false instead. Deleting by a fixed ID is idempotent in effect — repeats leave the same end state, though a second attempt may error because the testimonial is already gone. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `testimonialId` | string | yes |  | Testimonial ID. The ID of the testimonial to delete. |

### `find_testimonial`

**Find Testimonial.** Fetch a single Trust testimonial by its testimonial ID. Pick this to inspect a known testimonial before updating or deleting it; it requires the exact ID and cannot search by author email or text. Read-only and safe to retry (idempotent). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `testimonialId` | string | yes |  | Testimonial ID. The ID of the testimonial to retrieve. |

### `create_contact`

**Create Contact.** Create a new contact in the Trust workspace, optionally with name, email, phone, and a profile image URL. Pick this to register a person before requesting or attaching testimonials; to modify someone who already exists, use Update Contact instead. All fields are optional, and every call creates a new contact record, so repeated calls produce duplicates (not idempotent). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstname` | string | no |  | First Name. |
| `lastname` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone Number. |
| `imageUrl` | string | no |  | Profile Image URL. URL of the contact profile image. |

### `update_contact`

**Update Contact.** Update an existing Trust contact identified by its contact ID; both the ID and the email are required by the API, while name, phone, and profile image URL are optional. Pick this to modify a known contact rather than Create Contact, which would add a duplicate. It overwrites via PUT with the supplied fields, so repeating the same call yields the same state (idempotent). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The ID of the contact to update. |
| `firstname` | string | no |  | First Name. |
| `lastname` | string | no |  | Last Name. |
| `email` | string | yes |  | Email. Required by the Trust API to identify the contact. |
| `phone` | string | no |  | Phone Number. |
| `imageUrl` | string | no |  | Profile Image URL. |

### `delete_contact`

**Delete Contact.** Permanently delete a Trust contact identified by its contact ID. Pick this only when the contact record should be removed entirely; this is destructive and cannot be undone via the API. Deleting by a fixed ID is idempotent in effect — repeating the call leaves the same end state, though a second attempt may return an error since the contact no longer exists. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The ID of the contact to delete. |

### `find_contact`

**Find Contact.** Look up a Trust contact either by its contact ID (direct fetch) or by email address (search) — provide at least one, and the ID takes priority when both are given. Pick this to resolve a contact ID before an update or delete, or to check whether a person already exists before creating them. Read-only and safe to retry (idempotent). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | no |  | Contact ID. The ID of the contact to find. Provide either Contact ID or Email — ID takes priority. |
| `email` | string | no |  | Email. Search for a contact by email address. Used only if Contact ID is not provided. |

### `upload_image`

**Upload Image.** Upload an image file (JPEG, PNG, GIF, etc.) to the Trust media library, typically to use as a profile image for a contact or testimonial. Pick this only when you have raw file data; if the image is already hosted at a URL, pass that URL directly to the contact or testimonial actions instead. Each call uploads a new copy, so retries create duplicate media (not idempotent). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Image File. The image file to upload (JPEG, PNG, GIF, etc.). Files are not supported; an action that needs one fails. |

### `upload_video`

**Upload Video.** Upload a video file (MP4, MOV, AVI, etc.) to the Trust media library for use in testimonials. Pick this for standard or longer videos; for brief clips under about 30 seconds, Upload Small Video uses a lighter endpoint, and already-hosted videos can be referenced by URL without uploading. Each call uploads a new copy, so retries create duplicate media (not idempotent). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Video File. The video file to upload (MP4, MOV, AVI, etc.). Files are not supported; an action that needs one fails. |

### `upload_small_video`

**Upload Small Video.** Upload a short video clip (best under 30 seconds) to the Trust media library via the dedicated small-video endpoint. Pick this for brief clips; for longer or larger video files use Upload Video instead, and skip uploading entirely if the video is already hosted at a URL. Each call uploads a new copy, so retries create duplicate media (not idempotent). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Video File. The short video file to upload. Best suited for brief clips under 30 seconds. Files are not supported; an action that needs one fails. |

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
