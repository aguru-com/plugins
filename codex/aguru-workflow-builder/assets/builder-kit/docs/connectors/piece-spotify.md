# Spotify

Music for everyone

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-spotify'
  version: '0.6.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> To obtain a client ID and client secret for Spotify, follow these simple steps:
>
> 1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/).
> 2. **Log in** to your Spotify account.
> 3. Click on the **"Create an App"** button.
> 4. Fill in the required information, such as the **App Name** and **App Description**.
> 5. Once your app is created, you will see the **client ID** and **client secret** on the app's dashboard.
> 6. **Copy** the client ID and client secret and **paste** them below.

## Actions

### `search`

**Search.** Searches the Spotify catalog by keyword and returns matching items, scoped to the object types you select (tracks, artists, albums, playlists). Use it to resolve a name or phrase into Spotify URIs/IDs before playing or adding to a playlist. Read-only and repeatable; supports limit/offset paging. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_text` | string | yes |  | Search Text. The word or phrase you are searching for. |
| `types` | array | yes |  | Object Types. One of `""`, `"artist"`, `"playlist"`, `"track"`. |
| `limit` | number | no |  | Limit. |
| `offset` | number | no |  | Offset. |

### `get_playback_state`

**Get Playback State.** Reads the current user's active playback state, including the playing/paused status, current track, device, volume, and progress. Use it to inspect what is playing before issuing playback commands. Read-only and repeatable; returns empty when no device is active. Needs authentication.

Kind: read, safe to repeat.

No inputs.

### `play`

**Play / Resume.** Starts or resumes playback on the active (or a specified) Spotify device, optionally for a given context URI (album, artist, playlist) or an explicit list of track URIs, and an optional start position. Use it to begin playing something; requires an active device. Not idempotent: each call re-issues the playback command and can restart or re-seek the player. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `device_id` | string | no |  | Device. A value the product loads from the provider, such as an id; write the value itself. |
| `context_uri` | string | no |  | Context URI. Spotify URI of the context to play (album, artist, playlist) |
| `tracks` | array | no |  | Tracks. List of spotify track uris to play. |
| `position_ms` | number | no |  | Position. Position in milliseconds. |

### `pause`

**Pause.** Pauses playback on the active (or a specified) Spotify device. Use it to stop the currently playing track; requires an active device. Idempotent in effect: pausing an already-paused player leaves the same paused state with no further side effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `device_id` | string | no |  | Device. A value the product loads from the provider, such as an id; write the value itself. |

### `set_volume`

**Set Volume.** Sets the playback volume on the active (or a specified) Spotify device to an absolute level from 0 to 100. Use it to adjust loudness; requires an active device. Idempotent: setting the same level repeatedly yields the same volume with no extra side effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `volume` | number | yes |  | Volume. Volume from 0 to 100. |
| `device_id` | string | no |  | Device. A value the product loads from the provider, such as an id; write the value itself. |

### `get_playlists`

**Get Playlists.** Lists the current user's own and followed playlists. Use it to discover a playlist's id before reading, updating, or modifying it. By default returns one paged page (limit/offset); enable the All option to auto-page through and return every playlist in one call. Read-only and repeatable. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `offset` | number | no |  | Offset. |
| `limit` | number | no |  | Limit. |
| `all` | boolean | no |  | All. Fetches all playlists in a single request. |

### `get_playlist_info`

**Get Playlist Info.** Retrieves the details of a single playlist (name, description, owner, track count, etc.) by its playlist id. Use it to inspect playlist metadata once you have the id. Read-only and repeatable. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlist_id` | string | yes |  | Playlist. A value the product loads from the provider, such as an id; write the value itself. |

### `get_playlist_items`

**Get Playlist Items.** Lists the tracks/episodes contained in a playlist, identified by its playlist id. By default returns one paged page (limit/offset); enable the All option to auto-page through and return every item in one call. Use it to read a playlist's contents. Read-only and repeatable. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlist_id` | string | yes |  | Playlist. A value the product loads from the provider, such as an id; write the value itself. |
| `offset` | number | no |  | Offset. |
| `limit` | number | no |  | Limit. |
| `all` | boolean | no |  | All. Fetches all items in a single request. |

### `get_saved_tracks`

**Get Saved Tracks.** Lists the tracks in the current user's Liked Songs library. By default returns one paged page (limit/offset); enable the All option to auto-page through and return every saved track in one call. Read-only and repeatable. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `offset` | number | no |  | Offset. |
| `limit` | number | no |  | Limit. |
| `all` | boolean | no |  | All. Fetches all items in a single request. |

### `create_playlist`

**Create Playlist.** Creates a new empty playlist owned by the current user with the given name and optional description, public, and collaborative flags. Use it to set up a playlist before adding items. Not idempotent: each call creates a separate playlist even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `public` | boolean | no |  | Public. |
| `collaborative` | boolean | no |  | Collaborative. |

### `update_playlist`

**Update Playlist.** Updates a playlist's metadata (name, description, public, collaborative) for the playlist identified by its id; only the fields you provide are changed. Use it to rename or re-describe an existing playlist. Idempotent: applying the same values repeatedly leaves the playlist in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlist_id` | string | yes |  | Playlist. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `public` | boolean | no |  | Public. |
| `collaborative` | boolean | no |  | Collaborative. |

### `add_playlist_items`

**Add items to playlist.** Adds tracks or episodes (by their Spotify URIs) to the playlist identified by its id, optionally at a given position. Use it to append items to an existing playlist. Not idempotent: repeating the call adds the items again, creating duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlist_id` | string | yes |  | Playlist. A value the product loads from the provider, such as an id; write the value itself. |
| `items` | array | yes |  | Items. URI's of the items to add. |
| `position` | number | no |  | Position. |

### `remove_playlist_items`

**Remove items from playlist.** Removes tracks or episodes (by their Spotify URIs) from the playlist identified by its id. Use it to delete specific items from an existing playlist. Idempotent in effect: removing items already absent is a no-op and leaves the same playlist contents. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlist_id` | string | yes |  | Playlist. A value the product loads from the provider, such as an id; write the value itself. |
| `items` | array | yes |  | Items. URI's of the items to remove. |

### `reorder_playlist`

**Reorder playlist.** Moves a block of items within the playlist identified by its id, taking the given number of items from a starting position and inserting them before a target position. Use it to rearrange playlist order. Not idempotent: positions shift after each move, so repeating the call reorders items differently. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlist_id` | string | yes |  | Playlist. A value the product loads from the provider, such as an id; write the value itself. |
| `from_position` | number | yes |  | From Position. |
| `to_position` | number | yes |  | To Position. |
| `amount` | number | no |  | Amount of Items. |

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
