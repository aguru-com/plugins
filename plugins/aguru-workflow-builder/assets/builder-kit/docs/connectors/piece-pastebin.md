# Pastebin

Simple and secure text sharing

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pastebin'
  version: '0.2.8'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Here are the simple steps to get your credentials:
>
> 1. Make an account, If you don't have one yet.
> 2. Go to **https://pastebin.com/doc_api**.
> 3. Copy your unique Developer API Key and paste it.
> 4. Provide your username and password if you want to create **private pastes** under your account.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token` | string | yes |  | Developer Key. |
| `username` | string | no |  | Username. |
| `password` | string | no |  | Password. |

## Actions

### `create_paste`

**Create Paste.** Creates a new Pastebin paste from the given text content, returning its id and URL. Use to publish or share a snippet; optionally set a syntax format, name, expiry, privacy (public/unlisted/private), and folder. Not idempotent — each call creates a separate paste even with identical content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Content. |
| `format` | string | no |  | Format. One of `"4cs"`, `"6502acme"`, `"6502kickass"`, `"6502tasm"`, `"abap"`, `"actionscript"`, `"actionscript3"`, `"ada"`, `"aimms"`, `"algol68"`, `"apache"`, `"applescript"`, `"apt_sources"`, `"arduino"`, `"arm"`, `"asm"`, `"asp"`, `"asymptote"`, `"autoconf"`, `"autohotkey"`, `"autoit"`, `"avisynth"`, `"awk"`, `"bascomavr"`, `"bash"` and 241 more. |
| `name` | string | no |  | Name. |
| `privacy` | string | no |  | Privacy. One of `"0"`, `"1"`, `"2"`. |
| `expiry` | string | no |  | Expiry. One of `"N"`, `"10M"`, `"1H"`, `"1D"`, `"1W"`, `"2W"`, `"1M"`, `"6M"`, `"1Y"`. |
| `folder` | string | no |  | Folder. |

### `get_paste_content`

**Get Paste Content.** Fetches the raw text content of an existing Pastebin paste by its paste ID. Use to read back a snippet you have the ID for; private pastes require account credentials on the connection. Idempotent — a read-only lookup with no side effect. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paste_id` | string | yes |  | Paste ID. |
