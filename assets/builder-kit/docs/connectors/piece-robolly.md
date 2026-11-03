# Robolly

Robolly is the all‑in‑one service for personalized image, video & PDF generation with API

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-robolly'
  version: '0.3.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Log in to [Robolly](https://robolly.com/dashboard/).
> 2. Open your project and go to **API**.
> 3. Copy the API key and paste it here.

## Actions

### `generate_image`

**Generate Image.** Renders a personalized asset (JPG, PNG, or PDF, set via the format input) from a Robolly template by filling its template fields with the supplied values, plus any extra modifications. Use when an agent needs to produce a finished image/PDF from a design template; requires a template ID and the values for that template's accepted fields. Each call produces a new render and consumes a generation, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template. Select your template. (If you want to use Template ID. Click on the "(x)" above this field. Template ID can be found by opening a template and going to “Render”. Being there copy the template ID from the top right.) A value the product loads from the provider, such as an id; write the value itself. |
| `format` | string | yes | `"jpg"` | Format. The format of the image to generate. One of `"jpg"`, `"png"`, `"pdf"`. |
| `fields` | object | yes |  | Values. The values to apply to the fields in the template. An object whose fields depend on other inputs; the product shows them. |
| `modifications` | object | no |  | Extra Modifications. The extra modifications to apply to the image. See "Detailed dynamic modifications" in https://robolly.com/docs/api-reference/. |

Output fields:

- `status`: Status
- `url`: File URL (url)
- `fileName`: File Name
- `self`: Render Link (url)
- `createdAt`: Created At (datetime)

### `robolly_list_templates`

**List Templates.** Lists the templates in the Robolly account with their IDs and names. Use it to find the template ID that Render Template, Create Hidden Render Link, List Template Elements and Update Template need. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `templates`: Templates
- `templates[].id`: Template ID
- `templates[].name`: Name
- `templates[].path`: Folder Path
- `templates[].artboardWidth`: Width (number)
- `templates[].artboardHeight`: Height (number)
- `templates[].backgroundColor`: Background Color
- `templates[].renderFileName`: Render File Name
- `templates[].disallowNotSigned`: Require Signed Render Links (boolean)
- `templates[].previewUrl`: Preview (image)
- `templates[].previewState`: Preview State
- `templates[].previewUpdatedAt`: Preview Updated At (datetime)
- `templates[].transition`: Transition
- `templates[].createdAt`: Created At (datetime)
- `templates[].updatedAt`: Updated At (datetime)
- `count`: Count (number)

### `robolly_list_template_elements`

**List Template Elements.** Returns a template's element names with their types, the detailed modification keys each element accepts (e.g. title.textColor) and the value catalog for them. Call it before Render Template or Create Hidden Render Link to know which modification keys to send. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. The template ID, e.g. "6416bcbab241242aa0b22ecb". Use List Templates to find it. |

Output fields:

- `acceptedModifications`: Elements
- `acceptedModifications[].key`: Element Name
- `acceptedModifications[].elementType`: Element Type
- `acceptedModifications[].type`: Value Type
- `acceptedModifications[].detailedModificationKeys`: Detailed Modification Keys
- `scope`: Scope
- `baseModificationBehavior`: Base Modification Behavior (an object whose keys vary)
- `detailedModifications`: Detailed Modifications
- `detailedModifications.syntax`: Syntax
- `detailedModifications.note`: Note
- `detailedModifications.constraintsNote`: Constraints Note
- `detailedModifications.arrayIndexPlaceholder`: Array Index Placeholder
- `detailedModifications.keys`: Property Keys
- `detailedModifications.properties`: Properties (an object whose keys vary)
- `detailedModifications.examples`: Examples
- `detailedModifications.examples[].key`: Key
- `detailedModifications.examples[].value`: Value
- `detailedModifications.examples[].description`: Description

### `robolly_list_gallery_templates`

**List Gallery Templates.** Lists Robolly's pre-built gallery templates. These are designs offered by Robolly, not templates in the account; use List Templates for the account's own templates, which are the ones Render Template accepts. Pass paginationCursorNext from the previous page as the cursor to get the next page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cursor` | string | no |  | Cursor. paginationCursorNext from the previous page. |

Output fields:

- `templates`: Templates
- `templates[].id`: Template ID
- `templates[].name`: Name
- `templates[].tags`: Tags
- `templates[].artboardWidth`: Width (number)
- `templates[].artboardHeight`: Height (number)
- `templates[].backgroundColor`: Background Color
- `templates[].previewUrl`: Preview (image)
- `templates[].modificationsPresets`: Modification Presets
- `templates[].modificationsPresets[].name`: Name
- `templates[].modificationsPresets[].previewUrl`: Preview (image)
- `hasMore`: Has More (boolean)
- `paginationCursorNext`: Next Page Cursor

### `robolly_create_template`

**Create Template.** Creates a blank template (an empty canvas, no elements) in the Robolly account and returns it with its ID; elements are added in the Robolly editor. Each call creates another template, plans cap the number of templates, and the API offers no way to delete one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The template name. |
| `artboardWidth` | number | no |  | Width. Canvas width in pixels. |
| `artboardHeight` | number | no |  | Height. Canvas height in pixels. |
| `backgroundColor` | string | no |  | Background Color. Canvas background color as a CSS color, e.g. "rgb(27, 61, 166)" or "#1b3da6". |
| `path` | string | no |  | Folder Path. An existing folder in the Robolly dashboard to list the template under. Robolly rejects a folder that does not exist. |
| `renderFileName` | string | no |  | Render File Name. The file name given to rendered files. |
| `disallowNotSigned` | string | no |  | Require Signed Render Links. Yes rejects render links that have neither a signature nor an API key. Leave empty to keep the current setting. One of `true`, `false`. |

Output fields:

- `id`: Template ID
- `name`: Name
- `organizationId`: Organization ID
- `artboardWidth`: Width (number)
- `artboardHeight`: Height (number)
- `backgroundColor`: Background Color
- `renderFileName`: Render File Name
- `disallowNotSigned`: Require Signed Render Links (boolean)
- `nodes`: Elements
- `modificationsPresets`: Modification Presets
- `previewState`: Preview State
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `robolly_update_template`

**Update Template.** Updates a template's name and canvas settings in the Robolly account, changing only the fields sent, and returns the template ID. Get the template ID from List Templates or Create Template. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. The template ID, e.g. "6416bcbab241242aa0b22ecb". Use List Templates to find it. |
| `name` | string | no |  | Name. The new template name. |
| `artboardWidth` | number | no |  | Width. Canvas width in pixels. |
| `artboardHeight` | number | no |  | Height. Canvas height in pixels. |
| `backgroundColor` | string | no |  | Background Color. Canvas background color as a CSS color, e.g. "rgb(27, 61, 166)" or "#1b3da6". |
| `path` | string | no |  | Folder Path. An existing folder in the Robolly dashboard to list the template under. Robolly rejects a folder that does not exist. |
| `renderFileName` | string | no |  | Render File Name. The file name given to rendered files. |
| `disallowNotSigned` | string | no |  | Require Signed Render Links. Yes rejects render links that have neither a signature nor an API key. Leave empty to keep the current setting. One of `true`, `false`. |

Output fields:

- `success`: Success (boolean)
- `templateId`: Template ID

### `robolly_render_template`

**Render Template.** Renders a Robolly template with the given element values and returns the rendered file URL. Get the template ID from List Templates and the modification keys from List Template Elements. Each call uses render credits. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. The template ID, e.g. "6416bcbab241242aa0b22ecb". Use List Templates to find it. |
| `format` | string | yes | `"jpg"` | Format. The output format. MP4 only works for animated templates. One of `"jpg"`, `"png"`, `"pdf"`, `"mp4"`. |
| `modifications` | object | no |  | Modifications. Element values keyed by element name, e.g. {"title": "Hello", "image": "https://…/photo.jpg"}. Use "<element>.<property>" keys for detailed changes, e.g. {"title.textColor": "red"}. Use List Template Elements to get the keys. |
| `scale` | number | no |  | Scale. Output scale from 0.1 to 3. Defaults to 1. |
| `quality` | number | no |  | Quality. Compression quality from 10 to 100, JPG only. |
| `dpi` | number | no |  | DPI. DPI from 1 to 1200, JPG and PNG only. |
| `fps` | number | no |  | FPS. Frames per second for MP4: 24, 30, 50 or 60. |
| `duration` | number | no |  | Duration. Video length in milliseconds for MP4, up to 10000. |

Output fields:

- `status`: Status
- `url`: File URL (url)
- `fileName`: File Name
- `self`: Render Link (url)
- `createdAt`: Created At (datetime)

### `robolly_create_hidden_render_link`

**Create Hidden Render Link.** Builds a signed, static-looking render link for a template with the given element values, for embedding in public pages or emails. It sends no request; the template renders, and uses render credits, each time the link is opened. Use Render Template instead to render now and get the file URL. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. The template ID, e.g. "6416bcbab241242aa0b22ecb". Use List Templates to find it. |
| `format` | string | yes | `"jpg"` | Format. The output format. One of `"jpg"`, `"png"`, `"pdf"`. |
| `modifications` | object | no |  | Modifications. Element values keyed by element name, e.g. {"title": "Hello", "image": "https://…/photo.jpg"}. Use "<element>.<property>" keys for detailed changes, e.g. {"title.textColor": "red"}. Use List Template Elements to get the keys. |

Output fields:

- `url`: Hidden Render Link (url)

### `robolly_get_render`

**Get Render.** Gets one render by ID with its status, file URL and preview URL. Use it to check a past render found with List Renders. Fails when no render has that ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `renderId` | string | yes |  | Render ID. The render ID, from List Renders. |

Output fields:

- `id`: Render ID
- `status`: Status
- `file`: File URL (url)
- `preview`: Preview (image)
- `templateId`: Template ID
- `organizationId`: Organization ID
- `renderSource`: Render Source
- `cacheHash`: Cache Hash
- `modifications`: Modifications
- `modifications[].target`: Target
- `modifications[].value`: Value
- `formatType`: Format
- `fileName`: File Name
- `size`: Size (filesize)
- `width`: Width (number)
- `height`: Height (number)
- `assetsLoaded`: Assets Loaded
- `assetsLoaded[].name`: Name
- `assetsLoaded[].duration`: Load Time (duration)
- `assetsLoaded[].state`: State
- `hits`: Hits (number)
- `renderCost`: Render Cost (Credits) (number)
- `createdAt`: Created At (datetime)

### `robolly_list_renders`

**List Renders.** Lists past renders, newest first, up to 30 per page, optionally filtered by template, movie or cache hash. Pass paginationCursorNext from the previous page as the cursor to get the next page, with the same filters. Use Get Render for one render by ID. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | no |  | Template ID. Only renders of this template. Use List Templates to find it. |
| `movieId` | string | no |  | Movie ID. Only renders with this movie ID. |
| `cacheHash` | string | no |  | Cache Hash. Only the render with this cache hash. |
| `cursor` | string | no |  | Cursor. paginationCursorNext from the previous page. |

Output fields:

- `value`: Renders
- `value[].id`: Render ID
- `value[].status`: Status
- `value[].file`: File URL (url)
- `value[].preview`: Preview (image)
- `value[].templateId`: Template ID
- `value[].organizationId`: Organization ID
- `value[].renderSource`: Render Source
- `value[].cacheHash`: Cache Hash
- `value[].modifications`: Modifications
- `value[].modifications[].target`: Target
- `value[].modifications[].value`: Value
- `value[].formatType`: Format
- `value[].fileName`: File Name
- `value[].size`: Size (filesize)
- `value[].width`: Width (number)
- `value[].height`: Height (number)
- `value[].assetsLoaded`: Assets Loaded
- `value[].assetsLoaded[].name`: Name
- `value[].assetsLoaded[].duration`: Load Time (duration)
- `value[].assetsLoaded[].state`: State
- `value[].hits`: Hits (number)
- `value[].renderCost`: Render Cost (Credits) (number)
- `value[].createdAt`: Created At (datetime)
- `hasMore`: Has More (boolean)
- `paginationCursorNext`: Next Page Cursor
- `paginationCursorPrevious`: Previous Page Cursor

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
