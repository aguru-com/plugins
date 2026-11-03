# LinkedIn

Post to LinkedIn profiles and Company Pages

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-linkedin'
  version: '0.5.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Sign in with the LinkedIn account that should publish the posts. To post on a Company Page, that account must be one of its admins.

## Actions

### `create_share_update`

**Create Share Update.** Publishes a new post to the authenticated user's personal LinkedIn profile, with optional image, link preview, and visibility setting. Use this to share content as an individual member (not a company page — use Create Company Update for that). Not idempotent: each call creates a separate post, so calling it again with the same text produces a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. Up to 3,000 characters of plain text; an @ does not tag anyone. |
| `visibility` | string | yes |  | Visibility. Who can see the post. A value the product loads from the provider, such as an id; write the value itself. |
| `imageUrl` | file | no |  | Image. With a Link URL, the image becomes the link's thumbnail. Files are not supported; an action that needs one fails. |
| `link` | string | no |  | Link URL. |
| `linkTitle` | string | no |  | Link Title. |
| `linkDescription` | string | no |  | Link Description. |

Output fields:

- `success`: Success (boolean)
- `post_urn`: Post URN

### `create_company_update`

**Create Company Update.** Publishes a new post to a LinkedIn organization (company) page, with optional image and link preview; posts are always public. Use this to share content on behalf of a company rather than a personal profile, and requires the target organization id plus admin access to that page. Not idempotent: each call creates a separate post, so repeating it with the same text produces a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company` | string | yes |  | Company Page. Only pages where your account can post are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text. Up to 3,000 characters of plain text; an @ does not tag anyone. |
| `imageUrl` | file | no |  | Image. With a Link URL, the image becomes the link's thumbnail. Files are not supported; an action that needs one fails. |
| `link` | string | no |  | Link URL. |
| `linkTitle` | string | no |  | Link Title. |
| `linkDescription` | string | no |  | Link Description. |

Output fields:

- `success`: Success (boolean)
- `post_urn`: Post URN

### `get_current_member_profile`

**Get Current Member Profile.** Reads the OpenID profile of the LinkedIn member that authorized the connection, including the member URN needed as the author of a post or an image upload. Call this first whenever another action asks for an author URN. Safe to retry; it never changes anything. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `sub`: Member ID
- `member_urn`: Member URN
- `name`: Full Name
- `given_name`: First Name
- `family_name`: Last Name
- `email`: Email (email)
- `email_verified`: Email Verified (boolean)
- `picture`: Profile Picture (image)
- `locale`: Locale

### `list_managed_organizations`

**List Managed Organizations.** Lists every LinkedIn company page on which the connected member holds an approved administrator role, with each page's organization id, URN, vanity name, website and the member's role on it. Use it to discover or audit which company pages an account manages; no other action in this piece consumes the organization id yet. Safe to retry; read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `organizations`: Organizations
- `organizations[].organization_urn`: Organization URN
- `organizations[].organization_id`: Organization ID
- `organizations[].name`: Name
- `organizations[].vanity_name`: Vanity Name
- `organizations[].website`: Website (url)
- `organizations[].role`: Role
- `organizations[].state`: State
- `count`: Count (number)

### `create_member_post`

**Create Member Post.** Publishes a post to the connected LinkedIn member's own profile and returns the created post URN. This is the only way to publish from this piece: posts always appear as the member who authorized the connection, and publishing as a company page is not available. Not idempotent — every call creates a new post, so a retry publishes a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. Body of the post. |
| `visibility` | string | yes | `"PUBLIC"` | Visibility. Who can see the post. One of `"PUBLIC"`, `"CONNECTIONS"`. |
| `link` | string | no |  | Link URL. Optional URL to attach as an article preview. |
| `link_title` | string | no |  | Link Title. |
| `link_description` | string | no |  | Link Description. |
| `image` | file | no |  | Image. Files are not supported; an action that needs one fails. |
| `image_urn` | string | no |  | Image URN. URN of an image already uploaded to LinkedIn, for example urn:li:image:D4E10AQ.... Obtain it from Create Image Upload URL and PUT the bytes to that upload URL before posting. |

Output fields:

- `success`: Success (boolean)
- `post_urn`: Post URN

### `update_post_commentary`

**Update Post Commentary.** Edits an already published LinkedIn post in place, changing only the fields you supply. Use this to correct a post rather than Delete Post followed by a fresh Create Member Post, which would throw away the existing engagement. At least one field is required, fields left empty keep their current value, and applying the same values again is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_urn` | string | yes |  | Post URN. URN of the post to edit, for example urn:li:share:7212345678901234567. |
| `commentary` | string | no |  | Commentary. New body text. Leave empty to keep the current text. |
| `content_call_to_action_label` | string | no |  | Call To Action Label. New call-to-action button label. Leave empty to keep the current one. One of `"APPLY"`, `"DOWNLOAD"`, `"VIEW_QUOTE"`, `"LEARN_MORE"`, `"SIGN_UP"`, `"SUBSCRIBE"`, `"REGISTER"`, `"JOIN"`, `"ATTEND"`, `"REQUEST_DEMO"`, `"SEE_MORE"`. |
| `content_landing_page` | string | no |  | Landing Page URL. New destination for the call-to-action button. Leave empty to keep the current one. |

Output fields:

- `success`: Success (boolean)
- `post_urn`: Post URN
- `updated_fields`: Updated Fields
- `updated_field_count`: Updated Field Count (number)

### `delete_post`

**Delete Post.** Permanently deletes a LinkedIn post, together with its comments, reactions and statistics. This cannot be undone and the post cannot be recovered, so confirm the URN is the intended post before calling; to fix wording instead, use Update Post Commentary. Safe to retry: deleting an already deleted post reports success without changing anything. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_urn` | string | yes |  | Post URN. URN of the post to delete, for example urn:li:share:7212345678901234567. |

Output fields:

- `deleted`: Deleted (boolean)
- `post_urn`: Post URN
- `already_deleted`: Already Deleted (boolean)

### `create_image_upload_url`

**Create Image Upload URL.** Registers a new LinkedIn image and reserves a short-lived URL to upload its bytes to. This is step one of two: PUT the raw image bytes to the returned upload URL, then pass the returned image URN as the Image URN of Create Member Post. The URL expires, so reserve it immediately before uploading, and note it is not idempotent because each call reserves a new image. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner_urn` | string | no |  | Owner URN. Who will own the image. Defaults to the connected member. |

Output fields:

- `owner_urn`: Owner URN
- `image_urn`: Image URN
- `upload_url`: Upload URL (url)
- `upload_url_expires_at`: Upload URL Expires At (datetime)

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
