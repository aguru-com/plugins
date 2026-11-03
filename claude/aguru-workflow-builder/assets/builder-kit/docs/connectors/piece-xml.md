# XML

Extensible Markup Language for storing and transporting data

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-xml'
  version: '0.2.1'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `convert-json-to-xml`

**Convert JSON to XML.** Serializes a JSON object or array into an XML string, optionally prepending an XML declaration header and rendering the values under one designated key as tag attributes instead of child elements. Prefer Create XML for new work: this action merges list items into one element and does not read the "@_" attribute keys or "#text" that Convert XML to JSON returns. For the opposite direction use Convert XML to JSON. Requires valid JSON input, and attributes are only emitted for the nested key named by the attribute field (defaults to "attr"); deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `json` | JSON | yes |  | JSON. |
| `attributes_key` | string | no |  | Attribute field. Field to add your tag's attributes. |
| `header` | boolean | no |  | Header. Add XML header. |

### `convert-xml-to-json`

**Convert XML to JSON.** Parses an XML string into a JSON structure, in either of two modes: keep tag attributes (surfaced as "@_"-prefixed keys) or ignore attributes and keep element text only. Numeric-looking text is converted to numbers unless Keep Leading Zeros is on, in which case zero-prefixed values such as ZIP codes and IDs stay strings. Use it to make an XML payload from an HTTP response, webhook body, or RSS/SOAP feed addressable by later steps; for the opposite direction use Create XML, which accepts this output as-is. Requires a well-formed XML string passed as text, and the XML declaration is always dropped; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `xml` | string | yes |  | XML. The XML string to convert. |
| `ignoreAttributes` | boolean | no | `false` | Ignore Attributes. Ignore XML tag attributes during parsing. When unchecked, attributes are included in the output with a "@_" prefix (e.g. id="42" becomes {"@_id": "42"}). |
| `keepLeadingZeros` | boolean | no | `true` | Keep Leading Zeros. Keep numbers that start with a zero as text so values like ZIP codes, IDs and account numbers are not changed (e.g. "02134" stays "02134" instead of becoming 2134). Other numbers are still converted to numbers. |

### `create-xml`

**Create XML.** Builds a well-formed XML string from a JSON object or array: each key becomes an element, each array item becomes a repeated element with the same name, keys prefixed "@_" become attributes of their parent element (including namespace declarations such as "@_xmlns:soap"), "#text" sets the text of an element that also has attributes, and "#cdata" writes a CDATA section. This is the same JSON shape that Convert XML to JSON returns, so the two actions round-trip. Use it to produce a SOAP envelope, legacy API payload, RSS feed, sitemap or file body; prefer it over Convert JSON to XML, which merges list items into one element. A top-level array or several top-level keys are wrapped in one root element ("root" unless Root Element is set). Fails with the offending key and line number when a key is not a valid XML name, and fails when the JSON is nested more than 100 levels deep. Deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `json` | JSON | yes |  | JSON. Each key becomes an element and each list item becomes a repeated element. Keys starting with "@_" become attributes, "#text" sets the text of an element that has attributes, and "#cdata" writes a CDATA section. Example: {"book": {"@_id": "1", "title": "Dune", "tag": ["scifi", "classic"]}}. The out… |
| `rootElement` | string | no |  | Root Element. Wraps the output in one element with this name. Leave empty if your JSON already has a single top-level key. If the JSON is a list or has several top-level keys and this is empty, "root" is used. |
| `listItemElement` | string | no |  | List Item Element. Element name for each item when the JSON itself is a list. Defaults to "item". |
| `prettyPrint` | boolean | no | `false` | Pretty Print. Put each element on its own line; text content is never changed. |
| `includeDeclaration` | boolean | no | `false` | Include XML Declaration. Start the output with <?xml version="1.0" encoding="UTF-8"?>. To use a different declaration, add a "?xml" key to your JSON instead, e.g. {"?xml": {"@_version": "1.0", "@_standalone": "yes"}}. |
| `selfCloseEmptyElements` | boolean | no | `false` | Self-Close Empty Elements. Write empty values as <tag/> instead of <tag></tag>. |
| `attributePrefix` | string | no |  | Attribute Prefix. Keys starting with this prefix become attributes. Defaults to "@_", the prefix Convert XML to JSON uses. |
| `textKey` | string | no |  | Text Key. Key that holds the text of an element that also has attributes. Defaults to "#text". |
| `cdataKey` | string | no |  | CDATA Key. Key whose value is written as a CDATA section, so it is not escaped. Defaults to "#cdata". |
