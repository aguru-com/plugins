# Text Helper

Tools for text processing

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-text-helper'
  version: '0.6.6'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `concat`

**Concatenate.** Joins a list of text values into a single string, optionally inserting a separator between each item. Use it to assemble one string from many parts (lines, CSV cells, name fragments); use Split for the reverse. Requires a Texts array - with no separator supplied the values are joined with no gap; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `texts` | array | yes |  | Texts. |
| `separator` | string | no |  | Separator. The text that separates the texts you want to concatenate. |

### `replace`

**Replace.** Substitutes matches of a search pattern inside a text with a replacement value, either every occurrence (default) or only the first match. Use it to rewrite or delete substrings - prefer Find or Find All when you only need to locate matches, and Split when you want the surrounding segments. The search value is always compiled as a regular expression, so regex metacharacters must be escaped, and an empty replacement deletes the matches; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. |
| `searchValue` | string | yes |  | Search Value. Can be plain text or a regex expression. |
| `replaceValue` | string | no |  | Replace Value. Leave empty to delete found results. |
| `replaceOnlyFirst` | boolean | no |  | Replace Only First Match. Only replaces the first instance of the search value. |

### `split`

**Split.** Breaks a text into an array of parts at every occurrence of a delimiter. Use it when you need the segments of a string (lines, CSV fields, the halves of a key/value pair); use Concatenate to rejoin them, or Find All when you want the matches themselves rather than the segments between them. The delimiter is required and matched as a literal string, not as a regex; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. |
| `delimiter` | string | yes |  | Delimiter. |

### `find`

**Find.** Matches a regex or plain-text pattern against a text and returns the first match along with its capture groups, with an optional case-insensitive mode. Pick it to test whether a pattern occurs or to pull one value out via a capture group; use Find All for every occurrence, or Replace to change the matched text. The pattern is compiled as a regular expression and an invalid one throws; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. |
| `expression` | string | yes |  | Expression. Regex or text to search for. Returns the first match and its capture groups. |
| `ignoreCase` | boolean | no | `false` | Ignore Case. When enabled, matching is case-insensitive. |

### `find_all`

**Find All.** Returns every substring of a text that matches a regex or plain-text pattern, with an optional case-insensitive mode. Use it when you need all occurrences; prefer Find when one match is enough or when you need capture groups, since this action returns only the whole-match text. The pattern is compiled as a regular expression and an invalid one throws; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. |
| `expression` | string | yes |  | Expression. Regex or text to search for. Returns every occurrence. |
| `ignoreCase` | boolean | no | `false` | Ignore Case. When enabled, matching is case-insensitive. |

### `markdown_to_html`

**Markdown to HTML.** Renders a Markdown string as HTML, with a selectable Markdown flavor (GitHub, original, or vanilla). Use it when producing HTML for an email body or web output; use HTML to Markdown for the reverse direction. Minimum header level must be between 1 and 6 or the action fails input validation; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `markdown` | string | yes |  | Markdown Content. The markdown to convert to HTML. |
| `flavor` | string | yes | `"github"` | Flavor of Markdown. The flavor of markdown use during conversion. One of `"vanilla"`, `"original"`, `"github"`. |
| `headerLevelStart` | number | yes | `1` | Minimum Header Level. The minimum header level to use during conversion. |
| `tables` | boolean | yes | `true` | Support Tables. Whether to support tables during conversion. |
| `noHeaderId` | boolean | yes | `false` | No Header ID. Whether to add an ID to headers during conversion. |
| `simpleLineBreaks` | boolean | yes | `false` | Simple Line Breaks. Parses line breaks as &lt;br&gt;, without needing 2 spaces at the end of the line. |
| `openLinksInNewWindow` | boolean | yes | `false` | Open Links in New Window. |

### `html_to_markdown`

**HTML to Markdown.** Converts an HTML string into Markdown, optionally with GitHub Flavored Markdown extensions (tables, strikethrough, task lists) enabled. Use it when you want compact readable markup preserving structure; prefer Remove HTML Tags for bare text with no markup, Extract from HTML to pull specific elements, or Markdown to HTML for the reverse. Requires the HTML content and script elements are dropped; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `html` | string | yes |  | HTML Content. The HTML to convert to markdown. |
| `gfm` | boolean | no | `true` | GitHub Flavored Markdown. Enable GFM extensions (tables, strikethrough, task lists, etc.) |

### `stripHtml`

**Remove HTML Tags.** Strips all HTML tags from a string and returns only the plain text content. Use it when you need readable text from markup (an email body to summarise, a notification line); prefer HTML to Markdown when structure should survive as markup, or Extract from HTML when you want specific elements or attributes instead of the whole document. Requires the HTML content and offers no options; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `html` | string | yes |  | HTML content. |

### `slugify`

**Slugify.** Turns a text into a slug by transliterating non-ASCII characters to ASCII, stripping characters outside a small allowed set, and collapsing whitespace runs into hyphens. Use it to derive a path segment or stable identifier from a title; it exposes no options, so use Replace for arbitrary custom character substitution. Case is preserved and some punctuation survives, so the output is not guaranteed to be URL- or filename-safe; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. |

### `defaultValue`

**Use Default Value if Input is Empty.** Returns the supplied value unless it is empty (empty text, empty list, null or undefined), in which case it returns the fallback default instead. Use it as a coalesce step to guarantee a non-empty value downstream rather than adding a branch. The default value is required while the input value is optional; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `value` | string | no |  | Enter value. Enter value. |
| `defaultString` | string | yes |  | Default Value. |

### `json_to_ascii_table`

**List to Text Table.** Renders an array of objects as a fixed-width ASCII table, using the union of all object keys as columns and sizing each column to its widest value. Use it when a list must be shown as human-readable plain text in a chat message, email, or log rather than as JSON. The input must be a JSON array or the action throws, and an empty array returns an empty string; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `data` | JSON | yes |  | List. List of items to convert to a text table. |

### `extract_from_html`

**Extract from HTML.** Parses an HTML string and extracts elements selected either by a preset target (page title, links, images, headings, paragraphs) or by a custom CSS selector, returning text content, inner HTML, outer HTML, or a named attribute for just the first match or for all matches. Use it to scrape specific values out of fetched HTML; prefer Remove HTML Tags or HTML to Markdown when you want the whole document as text. A custom target requires the selector and attribute extraction requires an attribute name, otherwise it throws; parsing runs with scripts disabled, and it is deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `html` | string | yes |  | HTML Content. The raw HTML string to extract data from. |
| `target` | string | yes | `"title"` | Extraction Target. What do you want to extract from the page? One of `"title"`, `"links"`, `"images"`, `"headings"`, `"paragraphs"`, `"custom"`. |
| `selector` | string | no |  | Custom CSS Selector. ONLY required if "Extraction Target" is set to "Custom CSS Selector". (e.g., .price, #main-title) |
| `extractionType` | string | yes | `"textContent"` | Extraction Type. What part of the element do you want to extract? One of `"textContent"`, `"innerHtml"`, `"outerHtml"`, `"attribute"`. |
| `attributeName` | string | no |  | Attribute Name. ONLY required if "Extraction Type" is set to "Attribute". (e.g., href, src, data-id) |
| `returnMultiple` | boolean | yes | `false` | Return Multiple Elements. If checked, returns a list of all matching elements. If unchecked, returns only the first match. |
