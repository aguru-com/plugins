# Google Slides

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-slides'
  version: '0.4.2'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

### `CUSTOM_AUTH`: Service Account (Advanced)

> Authenticate via service account from https://console.cloud.google.com/ > IAM & Admin > Service Accounts > Create Service Account > Keys > Add key.  <br> <br> You can optionally use domain-wide delegation (https://support.google.com/a/answer/162106?hl=en#zippy=%2Cset-up-domain-wide-delegation-for-a-client) to access presentations without adding the service account to each one. <br> <br> **Note:** Without a user email, the service account only has access to files/folders you explicitly share with it. A service account also has no Drive storage of its own, so Generate from Template, which copies the template into a new file, fails unless domain-wide delegation is configured.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serviceAccount` | string | yes |  | Service Account JSON Key. |
| `userEmail` | string | no |  | User Email. Email address of the user to impersonate for domain-wide delegation. |

## Actions

### `get_presentation`

**Get Presentation.** Fetch the raw Google Slides presentation resource (title, page size, slides with every page element, layouts, masters). Use it when you need element-level detail such as transforms, styles or table structure; for slide text, speaker notes and object IDs prefer Get Presentation Outline, which is far smaller. An optional Google field mask (e.g. "presentationId,title,slides(objectId)") trims the response. Accepts the presentation ID or URL. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation ID. The presentation ID (between /d/ and /edit in its URL), or the full URL. |
| `fields` | string | no |  | Fields. Optional Google field mask to return only part of the presentation, e.g. presentationId,title,slides(objectId). Leave empty for the full presentation. |

Output fields:

- `presentationId`: Presentation ID
- `title`: Title
- `locale`: Locale
- `revisionId`: Revision ID
- `pageSize`: Page Size
- `pageSize.width`: Width
- `pageSize.width.magnitude`: Size (number)
- `pageSize.width.unit`: Unit
- `pageSize.height`: Height
- `pageSize.height.magnitude`: Size (number)
- `pageSize.height.unit`: Unit
- `slides`: Slides
- `slides[].objectId`: Slide Object ID
- `slides[].slideProperties`: Slide Properties
- `slides[].slideProperties.layoutObjectId`: Layout Object ID
- `slides[].slideProperties.masterObjectId`: Master Object ID
- `slides[].pageElements`: Elements
- `slides[].pageElements[].objectId`: Object ID
- `slides[].pageElements[].size`: Size
- `slides[].pageElements[].size.width`: Width
- `slides[].pageElements[].size.width.magnitude`: Size (number)
- `slides[].pageElements[].size.width.unit`: Unit
- `slides[].pageElements[].size.height`: Height
- `slides[].pageElements[].size.height.magnitude`: Size (number)
- `slides[].pageElements[].size.height.unit`: Unit
- `slides[].pageElements[].transform`: Transform
- `slides[].pageElements[].shape`: Shape
- `slides[].pageElements[].table`: Table
- `slides[].pageElements[].image`: Image
- `slides[].pageElements[].elementGroup`: Group
- `layouts`: Layouts
- `layouts[].objectId`: Layout Object ID
- `layouts[].layoutProperties`: Layout Properties
- `layouts[].layoutProperties.name`: Name
- `layouts[].layoutProperties.displayName`: Display Name
- `masters`: Masters
- `masters[].objectId`: Master Object ID

### `refresh_sheets_charts`

**Refresh Sheets Charts.** Re-sync every embedded Google Sheets chart in a presentation (including charts inside groups) to its source spreadsheet's current data, in a single batch update. Use this after the underlying Sheets data changes to bring the slide charts up to date. Not idempotent: each call issues a fresh refresh against live spreadsheet data, so repeated calls can pull different chart contents. Accepts the presentation ID or URL; returns success false (not an error) when the deck has no linked charts. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation ID. The presentation ID (between /d/ and /edit in its URL), or the full URL. |

Output fields:

- `success`: Charts Refreshed (boolean)
- `message`: Message
- `result`: Result
- `result.presentationId`: Presentation ID
- `result.writeControl`: Write Control
- `result.writeControl.requiredRevisionId`: Revision ID

### `generate_from_template`

**Generate from template.** Create a new Google Slides presentation by copying a template presentation, then substituting its placeholder tokens with supplied values. Use this for mail-merge style document generation from a reusable deck; to copy without replacing text use Copy Presentation. The template's placeholder syntax must be selected (curly braces {{}} or square brackets [[]]); placeholders are discovered in slide text, grouped shapes, table cells and speaker notes, and matching is case-sensitive. The Presentation Title value also fills a {{title}} placeholder. A service account needs a Shared Drive folder to write the copy into. Not idempotent: each call copies the template into a brand-new presentation file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_presentation_id` | string | yes |  | Template presentation ID. The template presentation ID (between /d/ and /edit in its URL), or the full URL. |
| `placeholder_format` | string | yes | `"{{}}"` | Placeholder Format. Choose the format of placeholders in your template. One of `"{{}}"`, `"[[]]"`. |
| `table_data` | object | yes |  | Table Data. An object whose fields depend on other inputs; the product shows them. |
| `folder_id` | string | no |  | Folder. Optional Drive folder for the new presentation: its ID or URL (https://drive.google.com/drive/folders/<id>). Leave empty to use the default location. A service account needs a folder in a Shared Drive here. |

Output fields:

- `presentationId`: Presentation ID
- `presentationUrl`: Presentation URL (url)

### `create_presentation`

**Create Presentation.** Create a new, empty Google Slides presentation with the given title, in My Drive or in a chosen Drive folder. Use it to start a deck from scratch, then add content with Add Slide, Insert Image and Replace Text; to start from an existing deck use Copy Presentation or Generate from Template instead. A service account has no Drive storage of its own, so it needs a folder in a Shared Drive. Not idempotent: each call creates another presentation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Name of the new presentation, e.g. "Q3 Business Review". |
| `folder_id` | string | no |  | Folder. Optional Drive folder: its ID or URL (https://drive.google.com/drive/folders/<id>). Leave empty for My Drive. A service account needs a folder in a Shared Drive here. |

Output fields:

- `presentationId`: Presentation ID
- `title`: Title
- `presentationUrl`: Presentation URL (url)
- `folderId`: Folder ID
- `createdTime`: Created Time (datetime)

### `copy_presentation`

**Copy Presentation.** Duplicate an existing Google Slides presentation as a new file, with an optional new name and Drive folder; the content is copied unchanged. Use it to work on a copy of a deck (then Replace Text, Add Slide, etc. on the copy); for one-step copy-and-fill of {{placeholders}} use Generate from Template. A service account needs a Shared Drive folder. Not idempotent: each call creates another file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation to Copy. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `name` | string | no |  | New Name. Name of the copy. Leave empty for Google's default ("Copy of <name>"). |
| `folder_id` | string | no |  | Folder. Optional Drive folder for the copy: its ID or URL (https://drive.google.com/drive/folders/<id>). Leave empty to use the default location. A service account needs a folder in a Shared Drive here. |

Output fields:

- `presentationId`: Presentation ID
- `title`: Title
- `presentationUrl`: Presentation URL (url)
- `folderId`: Folder ID
- `createdTime`: Created Time (datetime)
- `sourcePresentationId`: Source Presentation ID

### `find_presentations`

**Find Presentations.** Search Google Drive for Google Slides presentations whose name contains some text and/or that sit in a given folder, most recently modified first. Use it to turn a deck name into a presentation ID before calling the other Slides actions. Returns at most Limit results; when hasMore is true pass nextPageToken as Page Token to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name_contains` | string | no |  | Name Contains. Return presentations whose name contains this text (case-insensitive). Leave empty to list all. |
| `folder_id` | string | no |  | Folder. Only presentations directly in this Drive folder: its ID or URL (https://drive.google.com/drive/folders/<id>). Leave empty to search all of Drive. |
| `limit` | number | no | `50` | Limit. Maximum number of presentations to return (1-1000). Default 50. |
| `page_token` | string | no |  | Page Token. The nextPageToken of a previous call, to get the next results. Leave empty for the first page. |

Output fields:

- `presentations`: Presentations
- `presentations[].id`: Presentation ID
- `presentations[].name`: Name
- `presentations[].webViewLink`: Presentation URL (url)
- `presentations[].createdTime`: Created Time (datetime)
- `presentations[].modifiedTime`: Modified Time (datetime)
- `presentations[].ownerName`: Owner Name
- `presentations[].ownerEmail`: Owner Email (email)
- `presentations[].folderId`: Folder ID
- `count`: Count (number)
- `hasMore`: Has More (boolean)
- `nextPageToken`: Next Page Token

### `get_presentation_outline`

**Get Presentation Outline.** Read a compact outline of a Google Slides presentation: for every slide its number, object ID, layout, title, all text (including grouped shapes and table cells), speaker notes, and the object IDs of its elements. Pick this to summarise a deck or to find the slide and element object IDs other Slides actions need; use List Slide Elements for positions and sizes, and Get Presentation only when you need raw element detail. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |

Output fields:

- `presentationId`: Presentation ID
- `title`: Title
- `presentationUrl`: Presentation URL (url)
- `revisionId`: Revision ID
- `slideCount`: Slide Count (number)
- `slides`: Slides
- `slides[].slideNumber`: Slide Number (number)
- `slides[].objectId`: Slide Object ID
- `slides[].slideUrl`: Slide URL (url)
- `slides[].title`: Title
- `slides[].text`: Text
- `slides[].speakerNotes`: Speaker Notes
- `slides[].layoutName`: Layout
- `slides[].layoutObjectId`: Layout Object ID
- `slides[].isSkipped`: Skipped in Presentation (boolean)
- `slides[].elements`: Elements
- `slides[].elements[].objectId`: Object ID
- `slides[].elements[].type`: Type
- `slides[].elements[].placeholderType`: Placeholder Type
- `slides[].elements[].text`: Text

### `get_slide`

**Get Slide.** Fetch the raw Page resource of one slide (its page elements with sizes, transforms, text and styles, plus slide properties), chosen by slide number or slide object ID. Use it to inspect one slide in detail without loading the whole deck; for text only use Get Presentation Outline, and for positions and sizes in points use List Slide Elements. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |

Output fields:

- `objectId`: Slide Object ID
- `revisionId`: Revision ID
- `slideProperties`: Slide Properties
- `slideProperties.layoutObjectId`: Layout Object ID
- `slideProperties.masterObjectId`: Master Object ID
- `pageElements`: Elements
- `pageElements[].objectId`: Object ID
- `pageElements[].size`: Size
- `pageElements[].size.width`: Width
- `pageElements[].size.width.magnitude`: Size (number)
- `pageElements[].size.width.unit`: Unit
- `pageElements[].size.height`: Height
- `pageElements[].size.height.magnitude`: Size (number)
- `pageElements[].size.height.unit`: Unit
- `pageElements[].transform`: Transform
- `pageElements[].shape`: Shape
- `pageElements[].table`: Table
- `pageElements[].image`: Image
- `pageElements[].elementGroup`: Group

### `get_slide_thumbnail`

**Get Slide Thumbnail.** Render one slide as a PNG thumbnail (LARGE 1600 px, MEDIUM 800 px or SMALL 200 px wide), chosen by slide number or object ID, and return its image link; turn on Save as File to also get a file that does not expire. The link expires after about 30 minutes, so save the file when a later step needs the image. Google counts this as an expensive read for quota. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |
| `size` | string | no | `"LARGE"` | Size. Width of the image. One of `"LARGE"`, `"MEDIUM"`, `"SMALL"`. |
| `save_as_file` | boolean | no | `false` | Save as File. Also download the image and return it as a file (the image link expires after about 30 minutes). |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `contentUrl`: Image (link expires in 30 minutes) (image)
- `width`: Width (px) (number)
- `height`: Height (px) (number)
- `file`: Image File (url)

### `add_slide`

**Add Slide.** Insert a new slide using one of the theme's standard layouts (e.g. TITLE_AND_BODY, TITLE, SECTION_HEADER, BLANK) at a 1-based position or at the end, optionally writing a title and body into the layout's placeholders (the TITLE layout uses its subtitle as the body). Use it to build or extend a deck; to reuse an existing slide's design use Duplicate Slide. Fails without changes if the theme lacks the layout or a needed placeholder. Not idempotent: each call adds another slide. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `layout` | string | yes | `"TITLE_AND_BODY"` | Layout. Layout of the new slide, from the presentation's theme. One of `"TITLE_AND_BODY"`, `"TITLE"`, `"TITLE_ONLY"`, `"TITLE_AND_TWO_COLUMNS"`, `"SECTION_HEADER"`, `"SECTION_TITLE_AND_DESCRIPTION"`, `"ONE_COLUMN_TEXT"`, `"MAIN_POINT"`, `"BIG_NUMBER"`, `"CAPTION_ONLY"`, `"BLANK"`. |
| `position` | number | no |  | Position. Where to put the slide, starting at 1 for the first slide. Leave empty to add it at the end. |
| `title` | string | no |  | Title. Text for the slide title. Leave empty to keep the placeholder empty. |
| `body` | string | no |  | Body. Text for the body (or the subtitle, on the Title slide layout). New lines start new paragraphs. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `slideNumber`: Slide Number (number)
- `slideUrl`: Slide URL (url)
- `titleObjectId`: Title Object ID
- `bodyObjectId`: Body Object ID

### `duplicate_slide`

**Duplicate Slide.** Duplicate one slide (by number or object ID) inside the same presentation, with all its elements; the copy goes right after the original or at a chosen 1-based position. Use it to reuse a designed slide, then change the copy's text with Replace Text limited to the new slide ID. Not idempotent: each call adds another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |
| `position` | number | no |  | Position of the Copy. Where to put the copy, starting at 1. Leave empty to place it right after the original. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: New Slide Object ID
- `slideNumber`: New Slide Number (number)
- `slideUrl`: Slide URL (url)
- `sourceSlideObjectId`: Original Slide Object ID

### `move_slide`

**Move Slide.** Move one slide (by number or object ID) so it ends up at the given 1-based position. Use it to reorder a deck. Not idempotent when the slide is chosen by number (after the first move that number points at another slide); by object ID a repeat to the same position changes nothing, so prefer the object ID. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |
| `position` | number | yes |  | New Position. Position the slide should end up at, starting at 1 for the first slide. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `slideNumber`: New Slide Number (number)
- `previousSlideNumber`: Previous Slide Number (number)
- `moved`: Moved (boolean)

### `delete_slide`

**Delete Slide.** Delete one slide, chosen by slide number or slide object ID (only slides, never other elements). Use it to remove a slide from a deck; it can only be undone from the version history in Google Slides. Not idempotent: a repeat by object ID fails because the slide is gone, and a repeat by slide number deletes the next slide, so prefer the object ID. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |

Output fields:

- `presentationId`: Presentation ID
- `deletedSlideObjectId`: Deleted Slide Object ID
- `deletedSlideNumber`: Deleted Slide Number (number)
- `remainingSlideCount`: Remaining Slides (number)

### `replace_text`

**Replace Text.** Replace every occurrence of a text (for example a {{placeholder}}) in the shapes and tables of a Google Slides presentation, optionally only on chosen slides, and report how many were changed. Use it to fill or fix text in an existing deck; to copy a template and fill all its placeholders in one step use Generate from Template. An empty replacement deletes the matched text. Idempotent: a repeat finds nothing left to replace, unless the replacement itself contains the search text. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `find` | string | yes |  | Find. Text to search for, e.g. [[customer_name]]. Activepieces reads {{...}} typed into a field as a reference to earlier step data, so search for [[name]]-style tokens or map the text from a previous step. |
| `replace_with` | string | no |  | Replace With. Replacement text. Leave empty to delete every match. |
| `match_case` | boolean | no | `true` | Match Case. When on, "Name" does not match "name". |
| `slide_object_ids` | array | no |  | Only on These Slides. Optional list of slide object IDs (or slide URLs) to limit the change to. Leave empty for every slide. Speaker notes pages cannot be listed here. |

Output fields:

- `presentationId`: Presentation ID
- `occurrencesChanged`: Occurrences Replaced (number)

### `replace_shapes_with_image`

**Replace Shapes with Image.** Replace every shape whose text contains the search text (e.g. a {{logo}} placeholder box) with an image from a public URL, fitted to the shape's size, optionally only on chosen slides. Use it for the image part of mail-merge decks after Generate from Template or Copy Presentation; to add an image at fixed coordinates use Insert Image. The URL must be public, PNG/JPEG/GIF, under 50 MB and 25 megapixels. Idempotent: replaced shapes are gone, so a repeat changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `find` | string | yes |  | Shape Text. Shapes containing this text are replaced, e.g. [[logo]]. Activepieces reads {{...}} typed into a field as a reference to earlier step data, so search for [[name]]-style tokens or map the text from a previous step. |
| `image_url` | string | yes |  | Image URL. Public link to a PNG, JPEG or GIF image (under 50 MB), e.g. https://example.com/logo.png. |
| `replace_method` | string | no | `"CENTER_INSIDE"` | Fit. How the image fills the shape. One of `"CENTER_INSIDE"`, `"CENTER_CROP"`. |
| `match_case` | boolean | no | `true` | Match Case. When on, "Name" does not match "name". |
| `slide_object_ids` | array | no |  | Only on These Slides. Optional list of slide object IDs (or slide URLs) to limit the change to. Leave empty for every slide. Speaker notes pages cannot be listed here. |

Output fields:

- `presentationId`: Presentation ID
- `occurrencesChanged`: Shapes Replaced (number)

### `insert_image`

**Insert Image.** Place an image from a public URL on one slide (by number or object ID), optionally at an X/Y position and Width/Height in points (a standard 16:9 slide is 720 x 405 pt; the aspect ratio is kept). Use it to add a picture to a slide; to swap {{placeholder}} boxes for images use Replace Shapes with Image. The URL must be public, PNG/JPEG/GIF, under 50 MB. Not idempotent: each call adds another image. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |
| `image_url` | string | yes |  | Image URL. Public link to a PNG, JPEG or GIF image (under 50 MB), e.g. https://example.com/chart.png. |
| `x` | number | no |  | X (pt). Distance from the left edge of the slide, in points. Set together with Y. |
| `y` | number | no |  | Y (pt). Distance from the top edge of the slide, in points. Set together with X. |
| `width` | number | no |  | Width (pt). Width of the image box, in points. Set together with Height. Leave both empty for the image's own size. |
| `height` | number | no |  | Height (pt). Height of the image box, in points. Set together with Width. |

Output fields:

- `presentationId`: Presentation ID
- `imageObjectId`: Image Object ID
- `slideObjectId`: Slide Object ID

### `set_speaker_notes`

**Set Speaker Notes.** Set the speaker notes of one slide (by number or object ID) to the given text, replacing whatever notes it had; to remove the notes turn on Clear Notes instead of passing text. Use it to write talk tracks or presenter instructions; read the current notes with Get Presentation Outline. Idempotent: the notes end up as the given text no matter how often it runs. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |
| `notes` | string | no |  | Notes. The new speaker notes. They replace the current notes. |
| `clear_notes` | boolean | no | `false` | Clear Notes. Turn on to remove the slide's speaker notes. Leave Notes empty when using this. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `speakerNotes`: Speaker Notes
- `speakerNotesObjectId`: Speaker Notes Object ID
- `changed`: Changed (boolean)

### `export_presentation`

**Export Presentation.** Export a Google Slides presentation through Google Drive as a PDF, PowerPoint (.pptx), OpenDocument (.odp) or plain-text file and return it as a file for later steps (email attachment, upload). Use it to share or archive a deck outside Google; to read slide text for reasoning prefer Get Presentation Outline. Drive refuses exports above 10 MB. Read-only and idempotent: repeating the call exports the same content. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `format` | string | yes | `"pdf"` | Format. File format of the export. One of `"pdf"`, `"pptx"`, `"odp"`, `"txt"`. |
| `file_name` | string | no |  | File Name. Name of the exported file without extension. Leave empty to use the presentation name. |

Output fields:

- `file`: File (url)
- `fileName`: File Name
- `mimeType`: MIME Type
- `sizeBytes`: Size (filesize)
- `presentationId`: Presentation ID

### `batch_update`

**Batch Update (Advanced).** Advanced escape hatch that sends a raw array of Google Slides API batchUpdate Request objects (createShape, insertText, updateTextStyle, createTable, groupObjects, etc.) to one presentation; all requests apply atomically or none do. Only use it for edits no dedicated Slides action covers (grouping, merged cells, lines, table borders, column widths): prefer Create Shape or Text Box, Insert Text, Set Element Text, Update Text Style, Update Paragraph Style, Create Table, Move or Resize Element, Add Slide, Replace Text and the others, which validate input and return the IDs you need. Get object IDs from Get Presentation Outline; new object IDs must be 5-50 characters of [a-zA-Z0-9_-:]. Optionally pass Required Revision ID to fail if the deck changed. Not idempotent in general. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `requests` | JSON | yes |  | Requests. JSON array of Slides API Request objects, e.g. [{"createShape":{"objectId":"box_001","shapeType":"TEXT_BOX","elementProperties":{"pageObjectId":"p"}}}]. |
| `required_revision_id` | string | no |  | Required Revision ID. Optional revisionId (from Get Presentation Outline); the update fails if the presentation changed since. |

Output fields:

- `presentationId`: Presentation ID
- `appliedRequests`: Requests Applied (number)
- `replies`: Replies
- `writeControl`: Write Control
- `writeControl.requiredRevisionId`: Revision ID

### `list_slide_elements`

**List Slide Elements.** List every element on one slide (including those inside groups) with its object ID, type, position and size in points, rotation, text, table size and cell texts, and parent group, plus the slide size. Pick this before placing, moving, resizing or styling elements, so you know where things are and which object IDs to pass; Get Presentation Outline is enough when you only need text and IDs across the whole deck. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `slideNumber`: Slide Number (number)
- `slideWidth`: Slide Width (pt) (number)
- `slideHeight`: Slide Height (pt) (number)
- `elementCount`: Elements (number)
- `elements`: Elements
- `elements[].objectId`: Element Object ID
- `elements[].type`: Type
- `elements[].shapeType`: Shape Type
- `elements[].placeholderType`: Placeholder Type
- `elements[].parentGroupId`: Parent Group ID
- `elements[].x`: X (pt) (number)
- `elements[].y`: Y (pt) (number)
- `elements[].width`: Width (pt) (number)
- `elements[].height`: Height (pt) (number)
- `elements[].rotationDegrees`: Rotation (degrees) (number)
- `elements[].text`: Text
- `elements[].tableRows`: Table Rows (number)
- `elements[].tableColumns`: Table Columns (number)
- `elements[].tableCells`: Table Cells

### `create_shape`

**Create Shape or Text Box.** Add a text box (default) or another shape (rectangle, ellipse, arrow, callout…) to one slide at X/Y with Width/Height in points (a standard 16:9 slide is 720 x 405 pt; List Slide Elements gives the exact size and what is already there), optionally with its text and fill colour in the same call. Use it to put new text or boxes on a slide; to fill an existing placeholder use Set Element Text, and for pictures use Insert Image. Returns the new objectId for styling calls (Update Text Style, Update Shape Properties). Not idempotent: each call adds another shape. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |
| `shape_type` | string | no |  | Shape Type. TEXT_BOX (default) has no fill or outline; the others are filled shapes. One of `"TEXT_BOX"`, `"RECTANGLE"`, `"ROUND_RECTANGLE"`, `"ELLIPSE"`, `"TRIANGLE"`, `"RIGHT_TRIANGLE"`, `"DIAMOND"`, `"PENTAGON"`, `"HEXAGON"`, `"OCTAGON"`, `"PARALLELOGRAM"`, `"TRAPEZOID"`, `"CHEVRON"`, `"HOME_PLATE"`, `"RIGHT_ARROW"`, `"LEFT_ARROW"`, `"UP_ARROW"`, `"DOWN_ARROW"`, `"LEFT_RIGHT_ARROW"`, `"STAR_5"`, `"HEART"`, `"CLOUD"`, `"PLUS"`, `"DONUT"`, `"WEDGE_RECTANGLE_CALLOUT"` and 4 more. |
| `x` | number | yes |  | X (pt). Distance from the left edge of the slide, in points. |
| `y` | number | yes |  | Y (pt). Distance from the top edge of the slide, in points. |
| `width` | number | yes |  | Width (pt). Width in points, greater than 0. |
| `height` | number | yes |  | Height (pt). Height in points, greater than 0. |
| `text` | string | no |  | Text. Optional text to put in the shape. Use \n for a new paragraph. |
| `fill_color` | string | no |  | Fill Color. Optional hex colour for the background, e.g. #1A73E8, or "transparent". |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `objectId`: Element Object ID
- `shapeType`: Shape Type
- `x`: X (pt) (number)
- `y`: Y (pt) (number)
- `width`: Width (pt) (number)
- `height`: Height (pt) (number)
- `text`: Text

### `insert_text`

**Insert Text.** Insert text into one shape, text box, placeholder or table cell (set Row and Column for a cell), at the end by default or at a 0-based character index. Use it to add to existing text; to replace the whole text use Set Element Text, and to change words across the deck use Replace Text. The element objectId comes from List Slide Elements, Get Presentation Outline or Create Shape. Not idempotent: each call inserts the text again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `object_id` | string | yes |  | Element Object ID. Object ID of the shape, text box, placeholder or table, e.g. "g2c8d1e5a7f_0_3". Get it from List Slide Elements, Get Presentation Outline (elements[].objectId), or the output of Create Shape / Create Table. For a table also set Row and Column. |
| `row` | number | no |  | Row. Table cells only: row number, starting at 1. Leave empty for shapes and text boxes. |
| `column` | number | no |  | Column. Table cells only: column number, starting at 1. Leave empty for shapes and text boxes. |
| `text` | string | yes |  | Text. The text to insert. Start it with \n to begin a new paragraph after the existing text. |
| `insertion_index` | number | no |  | Insertion Index. Optional 0-based character position (0 = start). Leave empty to append at the end. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `objectId`: Element Object ID
- `row`: Row (number)
- `column`: Column (number)
- `insertedAt`: Inserted At Index (number)
- `text`: Text After Insert

### `set_element_text`

**Set Element Text.** Replace the whole text of one shape, text box, placeholder (e.g. a slide title) or table cell (set Row and Column) with new text, or empty it with Clear Text. Pick it to rewrite one element; use Insert Text to add to existing text and Replace Text to swap a phrase everywhere. Character styling of the old text is not kept: re-apply with Update Text Style. The objectId comes from List Slide Elements or Get Presentation Outline. Idempotent: sends nothing when the text already matches. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `object_id` | string | yes |  | Element Object ID. Object ID of the shape, text box, placeholder or table, e.g. "g2c8d1e5a7f_0_3". Get it from List Slide Elements, Get Presentation Outline (elements[].objectId), or the output of Create Shape / Create Table. For a table also set Row and Column. |
| `row` | number | no |  | Row. Table cells only: row number, starting at 1. Leave empty for shapes and text boxes. |
| `column` | number | no |  | Column. Table cells only: column number, starting at 1. Leave empty for shapes and text boxes. |
| `text` | string | no |  | Text. The new text. Use \n for a new paragraph. Leave empty only together with Clear Text. |
| `clear_text` | boolean | no |  | Clear Text. Turn on to remove all text from the element. Leave Text empty when using this. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `objectId`: Element Object ID
- `row`: Row (number)
- `column`: Column (number)
- `text`: Text
- `changed`: Changed (boolean)

### `update_text_style`

**Update Text Style.** Change character formatting (bold, italic, underline, strikethrough, font family, font size in pt, text colour, highlight, link) of the text in one shape, text box, placeholder or table cell, in one call. Applies to all its text, to every occurrence of Match Text, or to a Start/End Index range; only the styles you set change. Use Update Paragraph Style for alignment, spacing and bullets. The element must already have text; its objectId comes from List Slide Elements or Create Shape. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `object_id` | string | yes |  | Element Object ID. Object ID of the shape, text box, placeholder or table, e.g. "g2c8d1e5a7f_0_3". Get it from List Slide Elements, Get Presentation Outline (elements[].objectId), or the output of Create Shape / Create Table. For a table also set Row and Column. |
| `row` | number | no |  | Row. Table cells only: row number, starting at 1. Leave empty for shapes and text boxes. |
| `column` | number | no |  | Column. Table cells only: column number, starting at 1. Leave empty for shapes and text boxes. |
| `match_text` | string | no |  | Match Text. Optional: only change every occurrence of this exact text (case-sensitive) inside the element. Leave empty (and Start/End Index empty) for all of its text. |
| `start_index` | number | no |  | Start Index. Optional 0-based start of a character range (instead of Match Text). |
| `end_index` | number | no |  | End Index. Optional 0-based end of the range, exclusive (instead of Match Text). |
| `bold` | boolean | no |  | Bold. true or false; leave unset to keep. |
| `italic` | boolean | no |  | Italic. true or false; leave unset to keep. |
| `underline` | boolean | no |  | Underline. true or false; leave unset to keep. |
| `strikethrough` | boolean | no |  | Strikethrough. true or false; leave unset to keep. |
| `font_family` | string | no |  | Font Family. Google Fonts family name, e.g. "Roboto" or "Montserrat". |
| `font_size` | number | no |  | Font Size (pt). Font size in points, e.g. 24. |
| `text_color` | string | no |  | Text Color. Hex colour, e.g. #202124. |
| `highlight_color` | string | no |  | Highlight Color. Hex background colour behind the text, or "none" to remove the highlight. |
| `link_url` | string | no |  | Link URL. Make the text a link to this http(s) URL, or "none" to remove an existing link. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `objectId`: Element Object ID
- `rangesStyled`: Ranges Styled (number)
- `updatedFields`: Updated Styles

### `update_paragraph_style`

**Update Paragraph Style.** Format the paragraphs of one shape, text box, placeholder or table cell: horizontal alignment, line spacing (percent, 100 = single), space above/below in pt, and bullets or numbering (Bullets = NONE removes them). Applies to every paragraph touched by all the text, by Match Text or by a Start/End Index range. Use Update Text Style for bold, font, size and colour; use Update Shape Properties for vertical alignment. The element must already have text. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `object_id` | string | yes |  | Element Object ID. Object ID of the shape, text box, placeholder or table, e.g. "g2c8d1e5a7f_0_3". Get it from List Slide Elements, Get Presentation Outline (elements[].objectId), or the output of Create Shape / Create Table. For a table also set Row and Column. |
| `row` | number | no |  | Row. Table cells only: row number, starting at 1. Leave empty for shapes and text boxes. |
| `column` | number | no |  | Column. Table cells only: column number, starting at 1. Leave empty for shapes and text boxes. |
| `match_text` | string | no |  | Match Text. Optional: only change every occurrence of this exact text (case-sensitive) inside the element. Leave empty (and Start/End Index empty) for all of its text. |
| `start_index` | number | no |  | Start Index. Optional 0-based start of a character range (instead of Match Text). |
| `end_index` | number | no |  | End Index. Optional 0-based end of the range, exclusive (instead of Match Text). |
| `alignment` | string | no |  | Alignment. START (left in left-to-right text), CENTER, END or JUSTIFIED. One of `"START"`, `"CENTER"`, `"END"`, `"JUSTIFIED"`. |
| `line_spacing` | number | no |  | Line Spacing (%). Line spacing as a percentage of normal: 100 = single, 150 = one and a half. |
| `space_above` | number | no |  | Space Above (pt). Space before each paragraph, in points. |
| `space_below` | number | no |  | Space Below (pt). Space after each paragraph, in points. |
| `bullets` | string | no |  | Bullets. Bullet or numbering preset for the paragraphs, or NONE to remove bullets. One of `"BULLET_DISC_CIRCLE_SQUARE"`, `"BULLET_ARROW_DIAMOND_DISC"`, `"BULLET_CHECKBOX"`, `"BULLET_STAR_CIRCLE_SQUARE"`, `"NUMBERED_DIGIT_ALPHA_ROMAN"`, `"NUMBERED_DIGIT_ALPHA_ROMAN_PARENS"`, `"NUMBERED_DIGIT_NESTED"`, `"NUMBERED_UPPERALPHA_ALPHA_ROMAN"`, `"NUMBERED_UPPERROMAN_UPPERALPHA_DIGIT"`, `"NONE"`. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `objectId`: Element Object ID
- `rangesStyled`: Ranges Styled (number)
- `alignment`: Alignment
- `bullets`: Bullets

### `update_shape_properties`

**Update Shape Properties.** Change how one shape or text box looks: fill colour (or "transparent"), outline colour (or "none"), outline weight in pt and dash style, and vertical alignment of its text (TOP, MIDDLE, BOTTOM). Only the properties you set change. Use Update Text Style for the text itself and Move or Resize Element for position and size; it does not work on images, tables or groups. The objectId comes from List Slide Elements or Create Shape. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `object_id` | string | yes |  | Shape Object ID. Object ID of the shape or text box (from List Slide Elements, Get Presentation Outline or Create Shape). |
| `fill_color` | string | no |  | Fill Color. Hex colour, e.g. #E8F0FE, or "transparent". |
| `outline_color` | string | no |  | Outline Color. Hex colour, e.g. #1A73E8, or "none" to hide the outline. |
| `outline_weight` | number | no |  | Outline Weight (pt). Outline thickness in points. |
| `outline_dash` | string | no |  | Outline Dash. Outline dash style. One of `"SOLID"`, `"DOT"`, `"DASH"`, `"DASH_DOT"`, `"LONG_DASH"`, `"LONG_DASH_DOT"`. |
| `content_alignment` | string | no |  | Vertical Alignment. Where the text sits inside the shape. One of `"TOP"`, `"MIDDLE"`, `"BOTTOM"`. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `objectId`: Element Object ID
- `updatedFields`: Updated Properties

### `move_resize_element`

**Move or Resize Element.** Move and/or resize one element (shape, text box, image, table, video, line or group) by setting X, Y, Width and/or Height in points; unset values stay as they are, and if only one of Width/Height is set the aspect ratio is kept. Get current positions and the slide size from List Slide Elements. Groups (x/y = the box around their elements), tables and rotated elements can only be moved, not resized; an element inside a group is moved through its group. Idempotent: the same values give the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `object_id` | string | yes |  | Element Object ID. Object ID of the element to move or resize (from List Slide Elements or Get Presentation Outline). |
| `x` | number | no |  | X (pt). New distance from the left edge of the slide, in points. |
| `y` | number | no |  | Y (pt). New distance from the top edge of the slide, in points. |
| `width` | number | no |  | Width (pt). New width in points. |
| `height` | number | no |  | Height (pt). New height in points. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `objectId`: Element Object ID
- `x`: X (pt) (number)
- `y`: Y (pt) (number)
- `width`: Width (pt) (number)
- `height`: Height (pt) (number)
- `rotationDegrees`: Rotation (degrees) (number)

### `delete_elements`

**Delete Elements.** Permanently delete one or more page elements (shapes, text boxes, images, tables, videos, lines, groups) by object ID, all in one atomic change: if any ID is wrong nothing is deleted. Deleting a group deletes its children. Use Delete Slide to remove a whole slide and Set Element Text with Clear Text to only empty a box. Get IDs from List Slide Elements or Get Presentation Outline. Not idempotent: a repeat fails because the elements are gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `object_ids` | array | yes |  | Element Object IDs. Object IDs of the elements to delete, e.g. ["g2c8d1e5a7f_0_3"]. |

Output fields:

- `presentationId`: Presentation ID
- `deletedObjectIds`: Deleted Object IDs
- `deletedCount`: Deleted (number)
- `slideObjectIds`: Slide Object IDs

### `create_table`

**Create Table.** Add a table to one slide and fill it in the same call from Data, a JSON array of rows (e.g. [["Region","Q1"],["EMEA","12"]]); Rows/Columns default to the size of Data. Optionally bold and colour the first (header) row, and place it with X/Y and Width/Height in points (both pairs optional). Use Set Element Text with Row/Column to change one cell later, and Insert/Delete Table Rows or Columns to change its size. Returns the tableObjectId. Not idempotent: each call adds another table. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |
| `data` | JSON | no |  | Data. Optional JSON array of rows, each an array of cell values, e.g. [["Name","Score"],["Ann",9]]. |
| `rows` | number | no |  | Rows. Number of rows. Leave empty to use the number of rows in Data. |
| `columns` | number | no |  | Columns. Number of columns. Leave empty to use the longest row in Data. |
| `header_bold` | boolean | no |  | Bold Header Row. Make the text of the first row bold. |
| `header_fill_color` | string | no |  | Header Fill Color. Optional hex background colour for the first row, e.g. #E8F0FE. |
| `x` | number | no |  | X (pt). Distance from the left edge, in points. Set together with Y. |
| `y` | number | no |  | Y (pt). Distance from the top edge, in points. Set together with X. |
| `width` | number | no |  | Width (pt). Table width in points. Set together with Height. |
| `height` | number | no |  | Height (pt). Table height in points. Set together with Width. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `tableObjectId`: Table Object ID
- `rows`: Rows (number)
- `columns`: Columns (number)
- `filledCells`: Cells Filled (number)

### `insert_table_rows_or_columns`

**Insert Table Rows or Columns.** Add 1-20 empty rows (Dimension ROW) or columns (COLUMN) to an existing table so that the first new one sits at Position (1-based; leave empty to add at the end), and optionally fill a single new row/column from Values in the same call. Use it to append a data row ("add EMEA, 12, 15"); use Set Element Text to change existing cells. The table objectId comes from Create Table or List Slide Elements. Not idempotent: each call adds more rows or columns. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `table_object_id` | string | yes |  | Table Object ID. Object ID of the table (from Create Table, List Slide Elements or Get Presentation Outline). |
| `dimension` | string | yes |  | Dimension. ROW or COLUMN. One of `"ROW"`, `"COLUMN"`. |
| `position` | number | no |  | Position. Where the first new row/column goes, starting at 1 (1 = before the first). Leave empty to add at the end. |
| `count` | number | no |  | Count. How many to add, 1-20. Default 1. |
| `values` | array | no |  | Values. Optional cell texts for the new row (left to right) or column (top to bottom). Only with Count 1. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `tableObjectId`: Table Object ID
- `dimension`: Dimension
- `position`: Position (number)
- `count`: Count (number)
- `rows`: Rows Now (number)
- `columns`: Columns Now (number)

### `delete_table_rows_or_columns`

**Delete Table Rows or Columns.** Delete Count neighbouring rows (Dimension ROW) or columns (COLUMN) of a table starting at Position (1-based), with their content. It refuses to delete every row or column; use Delete Elements to remove the whole table. Check the row/column numbers with List Slide Elements (tableCells) first. Not idempotent: a repeat deletes the next rows or columns. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `table_object_id` | string | yes |  | Table Object ID. Object ID of the table (from Create Table, List Slide Elements or Get Presentation Outline). |
| `dimension` | string | yes |  | Dimension. ROW or COLUMN. One of `"ROW"`, `"COLUMN"`. |
| `position` | number | yes |  | Position. First row/column to delete, starting at 1. |
| `count` | number | no |  | Count. How many neighbouring rows/columns to delete. Default 1. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `tableObjectId`: Table Object ID
- `dimension`: Dimension
- `position`: Position (number)
- `count`: Count (number)
- `rows`: Rows Now (number)
- `columns`: Columns Now (number)

### `set_slide_background`

**Set Slide Background.** Set the background of one slide (by number or object ID) or of every slide (All Slides) to a solid hex colour or to a public image URL stretched to fill the slide. Use it for slide backgrounds; to add a picture on top of the slide use Insert Image. Set exactly one of Color or Image URL. Idempotent: the same values give the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |
| `all_slides` | boolean | no |  | All Slides. Turn on to change every slide. Leave Slide Number and Slide Object ID empty when using this. |
| `color` | string | no |  | Color. Hex colour, e.g. #0B1F3A. |
| `image_url` | string | no |  | Image URL. Public PNG, JPEG or GIF URL to stretch over the slide, e.g. https://example.com/bg.png. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectIds`: Slide Object IDs
- `slideCount`: Slides Changed (number)
- `backgroundType`: Background Type
- `color`: Color
- `imageUrl`: Image URL (url)

### `insert_video`

**Insert Video.** Embed a YouTube video or a Google Drive video file on one slide, from its URL (youtube.com/watch?v=…, youtu.be/…, drive.google.com/file/d/…) or its ID, optionally at X/Y with Width/Height in points. A Drive video must be viewable by the connected account. Not idempotent: each call adds another video. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `slide_number` | number | no |  | Slide Number. Position of the slide in the deck, starting at 1 for the first slide. Set this or Slide Object ID, not both. |
| `slide_object_id` | string | no |  | Slide Object ID. The slide object ID (e.g. "g2c8d1e5a7f_0_12", from Get Presentation Outline), or the slide URL copied from the browser while the slide is selected (it ends in #slide=id.<objectId>). Set this or Slide Number, not both. |
| `video` | string | yes |  | Video. YouTube or Google Drive video URL, or the video ID. |
| `source` | string | no |  | Source. Only needed for a bare Drive file ID: DRIVE. YouTube IDs and URLs are detected. One of `"YOUTUBE"`, `"DRIVE"`. |
| `x` | number | no |  | X (pt). Distance from the left edge, in points. Set together with Y. |
| `y` | number | no |  | Y (pt). Distance from the top edge, in points. Set together with X. |
| `width` | number | no |  | Width (pt). Width in points. Set together with Height. |
| `height` | number | no |  | Height (pt). Height in points. Set together with Width. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `videoObjectId`: Video Object ID
- `source`: Source
- `videoId`: Video ID

### `replace_image`

**Replace Image.** Replace one existing image (by its object ID) with a new image from a public URL; the frame keeps its position and size, and the new picture is fitted (CENTER_INSIDE, default) or cropped to fill (CENTER_CROP). Use it to refresh a logo, chart picture or photo; use Insert Image to add a new image and Replace Shapes with Image to swap {{tag}} text boxes. The image objectId comes from List Slide Elements (type IMAGE). Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation_id` | string | yes |  | Presentation. The presentation ID or its full URL, e.g. https://docs.google.com/presentation/d/1AbC...xyz/edit or just 1AbC...xyz. |
| `image_object_id` | string | yes |  | Image Object ID. Object ID of the image to replace (type IMAGE in List Slide Elements, or from Insert Image). |
| `image_url` | string | yes |  | Image URL. Public link to a PNG, JPEG or GIF image (under 50 MB). |
| `replace_method` | string | no |  | Fit. CENTER_INSIDE (default) fits the whole image in the frame; CENTER_CROP fills the frame and crops. One of `"CENTER_INSIDE"`, `"CENTER_CROP"`. |

Output fields:

- `presentationId`: Presentation ID
- `slideObjectId`: Slide Object ID
- `imageObjectId`: Image Object ID
- `imageUrl`: Image URL (url)
- `fit`: Fit

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
