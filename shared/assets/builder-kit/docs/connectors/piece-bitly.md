# Bitly

URL shortening and link management platform with analytics.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bitly'
  version: '0.2.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To get your Access Token:
> 1. Log in to your Bitly account.
> 2. Click your profile icon in the top right corner.
> 3. Go to **Profile Settings**.
> 4. Navigate to the **Developer settings** section.
> 5. Click on **API**.
> 6. Click the **Generate token** button and enter your password to get your access token.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessToken` | string | yes |  | Access Token. |

## Actions

### `archive_bitlink`

**Archive Bitlink.** Archives an existing Bitlink so it stops redirecting, identified by its Bitlink ID (e.g. bit.ly/xyz123). Use to retire or disable a short link. Idempotent: re-archiving an already-archived link leaves it archived with no additional effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_guid` | string | yes |  | Group. The group where the item will be managed. A value the product loads from the provider, such as an id; write the value itself. |
| `bitlink` | string | yes |  | Bitlink. Select the Bitlink to modify. A value the product loads from the provider, such as an id; write the value itself. |

### `create_bitlink`

**Create Bitlink.** Shortens a long URL into a Bitlink, optionally setting title, tags, custom branded domain, and mobile app deeplinks. Use to create a trackable short link from a destination URL (must start with http:// or https://). Not idempotent: each call creates a link, though Bitly may return an existing Bitlink for the same URL unless Force New Link is enabled. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `long_url` | string | yes |  | Long URL. The URL to shorten (must include http:// or https://). |
| `group_guid` | string | yes |  | Group. The group where the item will be managed. A value the product loads from the provider, such as an id; write the value itself. |
| `domain` | string | no | `"bit.ly"` | Domain. Domain to use for the Bitlink. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. Custom title for the Bitlink. |
| `tags` | array | no |  | Tags. Tags to apply to the Bitlink. |
| `force_new_link` | boolean | no | `false` | Force New Link. Create new link even if one exists for this URL. |
| `app_id` | string | no |  | Mobile App ID. Mobile app identifier (e.g., com.yourapp.name). |
| `app_uri_path` | string | no |  | App URI Path. Path within the mobile app (e.g., /product/123). |
| `install_url` | string | no |  | App Install URL. URL where users can install the mobile app. |
| `install_type` | string | no |  | Install Type. How to handle app installation. One of `"no_install"`, `"auto_install"`, `"promote_install"`. |

### `create_qr_code`

**Create QR Code.** Creates a styled QR code that points either to a raw long URL or to an existing Bitlink (selected via the destination type), with extensive optional customization of colors, dot patterns, corners, gradients, frames, branding, and error correction. Use to generate a scannable QR for a destination. Not idempotent: each call creates a new QR code. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_guid` | string | yes |  | Group. The group where the item will be managed. A value the product loads from the provider, such as an id; write the value itself. |
| `destination_type` | string | yes | `"long_url"` | Destination Type. One of `"long_url"`, `"bitlink_id"`. |
| `destination` | object | yes |  | Destination. An object whose fields depend on other inputs; the product shows them. |
| `title` | string | no |  | Title. Internal title for the QR Code. |
| `archived` | boolean | no |  | Archive on Create. Archive the QR code upon creation. |
| `background_color` | string | no |  | Style: Background Color. Hex code (e.g., #FFFFFF) |
| `dot_pattern_color` | string | no |  | Style: Dot Pattern Color. Hex code (e.g., #000000) |
| `dot_pattern_type` | string | no |  | Style: Dot Pattern Type. One of `"standard"`, `"circle"`, `"block"`, `"blob"`, `"rounded"`, `"vertical"`, `"horizontal"`, `"triangle"`, `"heart"`, `"star"`, `"diamond"`. |
| `corner_1_shape` | string | no |  | Corner 1 (Top-Left): Shape. One of `"standard"`, `"slightly_round"`, `"rounded"`, `"extra_round"`, `"leaf"`, `"leaf_inner"`, `"leaf_outer"`, `"target"`, `"concave"`. |
| `corner_1_inner_color` | string | no |  | Corner 1 (Top-Left): Inner Color. |
| `corner_1_outer_color` | string | no |  | Corner 1 (Top-Left): Outer Color. |
| `corner_2_shape` | string | no |  | Corner 2 (Top-Right): Shape. One of `"standard"`, `"slightly_round"`, `"rounded"`, `"extra_round"`, `"leaf"`, `"leaf_inner"`, `"leaf_outer"`, `"target"`, `"concave"`. |
| `corner_2_inner_color` | string | no |  | Corner 2 (Top-Right): Inner Color. |
| `corner_2_outer_color` | string | no |  | Corner 2 (Top-Right): Outer Color. |
| `corner_3_shape` | string | no |  | Corner 3 (Bottom-Right): Shape. One of `"standard"`, `"slightly_round"`, `"rounded"`, `"extra_round"`, `"leaf"`, `"leaf_inner"`, `"leaf_outer"`, `"target"`, `"concave"`. |
| `corner_3_inner_color` | string | no |  | Corner 3 (Bottom-Right): Inner Color. |
| `corner_3_outer_color` | string | no |  | Corner 3 (Bottom-Right): Outer Color. |
| `gradient_style` | string | no |  | Gradient: Style. One of `"no_gradient"`, `"linear"`, `"radial"`. |
| `gradient_color_1` | string | no |  | Gradient: Color 1. First gradient color (hex code) |
| `gradient_color_2` | string | no |  | Gradient: Color 2. Second gradient color (hex code) |
| `gradient_angle` | number | no |  | Gradient: Angle (for Linear). |
| `gradient_exclude_corners` | boolean | no |  | Gradient: Exclude Corners. |
| `frame_id` | string | no |  | Frame: Type. One of `"none"`, `"border_only"`, `"text_bottom"`, `"tooltip_bottom"`, `"arrow"`, `"text_top"`, `"text_bottom_in_frame"`, `"script"`, `"text_top_and_bottom"`, `"url"`, `"instagram"`. |
| `frame_primary_color` | string | no |  | Frame: Primary Color. |
| `frame_secondary_color` | string | no |  | Frame: Secondary Color. |
| `frame_background_color` | string | no |  | Frame: Background Color. |
| `frame_text` | string | no |  | Frame: Text. Primary text for frames that support it. |
| `logo_image_guid` | string | no |  | Branding: Logo Image GUID. A GUID for a logo image previously uploaded to Bitly. |
| `bitly_brand` | boolean | no | `true` | Branding: Show Bitly Logo. Show the Bitly logo in the bottom right corner. |
| `error_correction` | string | no |  | Specs: Error Correction. One of `1`, `2`, `3`, `4`. |

### `get_bitlink_details`

**Get Bitlink Details.** Retrieves metadata for a single Bitlink (title, long URL, tags, archive status, timestamps) identified by its Bitlink ID. Use to look up the current state of a known short link. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_guid` | string | yes |  | Group. The group where the item will be managed. A value the product loads from the provider, such as an id; write the value itself. |
| `bitlink` | string | yes |  | Bitlink. Select the Bitlink to modify. A value the product loads from the provider, such as an id; write the value itself. |

### `update_bitlink`

**Update Bitlink.** Updates properties of an existing Bitlink identified by its Bitlink ID, including title, archive status, tags (overwrites existing), and mobile app deeplinks. Use to edit or re-tag a known short link; at least one field must be provided. Idempotent: applying the same values repeatedly yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_guid` | string | yes |  | Group. The group where the item will be managed. A value the product loads from the provider, such as an id; write the value itself. |
| `bitlink` | string | yes |  | Bitlink. Select the Bitlink to modify. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. New title for the Bitlink. |
| `archived` | boolean | no |  | Archived. Archive or unarchive the Bitlink. |
| `tags` | array | no |  | Tags. Tags to apply (overwrites existing tags). |
| `app_uri_path` | string | no |  | App URI Path. Path within the mobile app (e.g., /product/123). |
| `install_url` | string | no |  | App Install URL. URL where users can install the mobile app. |
| `os` | string | no |  | Mobile OS. Target mobile operating system. One of `"ios"`, `"android"`. |
| `install_type` | string | no |  | Install Type. How to handle app installation. One of `"no_install"`, `"auto_install"`, `"promote_install"`. |

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
