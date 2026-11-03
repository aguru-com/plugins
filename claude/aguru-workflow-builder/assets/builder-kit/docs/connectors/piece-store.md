# Storage

Store or retrieve data from key/value database

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-store'
  version: '0.6.20'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `get`

**Get.** Reads the value stored under a key in the key/value store, falling back to an optional default value when the key is missing. Use it to load state persisted by an earlier step, run, or flow; pair it with Put, which writes the value. Requires the key (max 128 characters) and the matching Store Scope, because a key written in one scope is invisible to the others; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | Key. |
| `defaultValue` | string | no |  | Default Value. |
| `store_scope` | string | yes | `"COLLECTION"` | Store Scope. The storage scope of the value. One of `"COLLECTION"`, `"FLOW"`, `"RUN"`. |

### `put`

**Put.** Writes a value under a key in the key/value store, overwriting whatever was there before. Use it to persist state across steps, runs, or flows; prefer Append to concatenate onto an existing string, or Add To List to push onto a stored array, since Put replaces the entire value. Requires the key (max 128 characters), the value, and the Store Scope the reader will use, caps the stored value at 512 KB, and is idempotent.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | Key. |
| `value` | string | yes |  | Value. |
| `store_scope` | string | yes | `"COLLECTION"` | Store Scope. The storage scope of the value. One of `"COLLECTION"`, `"FLOW"`, `"RUN"`. |

### `append`

**Append.** Concatenates text onto the string already stored under a key, optionally inserting a separator between the old and new text. Use it to accumulate a growing log across runs; prefer Put to replace the value outright, or Add To List when the stored value is an array rather than a string. Requires the key (max 128 characters), the value, and the Store Scope, fails if the existing value is not a string, caps the stored value at 512 KB, and is not idempotent since each call appends again.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | Key. |
| `value` | string | yes |  | Value. |
| `separator` | string | no |  | Separator. Separator between added values, use \n for newlines. |
| `store_scope` | string | yes | `"COLLECTION"` | Store Scope. The storage scope of the value. One of `"COLLECTION"`, `"FLOW"`, `"RUN"`. |

### `remove_value`

**Remove.** Deletes a key and its value from the key/value store within the given scope. Use it to clear persisted state once it has been consumed or to reset a counter; use Remove from List instead to drop a single element while keeping the rest of a stored array. Requires the key (max 128 characters) and the Store Scope the value was written under; removing a key that does not exist is not an error, and the delete is idempotent.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | Key. |
| `store_scope` | string | yes | `"COLLECTION"` | Store Scope. The storage scope of the value. One of `"COLLECTION"`, `"FLOW"`, `"RUN"`. |

### `add_to_list`

**Add To List.** Pushes items onto the array stored under a key, creating the list when the key is empty; an optional ignore-if-exists mode skips items already present, matched by deep equality. Use it to accumulate records across runs; prefer Put to replace the whole array, or Append when the stored value is a string. Requires the key (max 128 characters), a list of values, and the Store Scope, fails if the existing value is not an array, caps the stored list at 512 KB, and is not idempotent unless ignore-if-exists is on.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | Key. |
| `value` | array | yes |  | Value. |
| `ignore_if_exists` | boolean | no |  | Ignore if value exists. |
| `store_scope` | string | yes | `"COLLECTION"` | Store Scope. The storage scope of the value. One of `"COLLECTION"`, `"FLOW"`, `"RUN"`. |

### `remove_from_list`

**Remove from List.** Removes a matching item from the array stored under a key and writes the shortened list back; the value is matched as text, so items stored as objects cannot be targeted. Use it to drop one element while keeping the rest; use Remove to delete the whole key, or Put to overwrite the array. Requires the key (max 128 characters), the value, and the Store Scope; fails if the stored value is not an array, removes only the first match per call, and is idempotent.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | Key. |
| `value` | string | yes |  | Value. |
| `store_scope` | string | yes | `"COLLECTION"` | Store Scope. The storage scope of the value. One of `"COLLECTION"`, `"FLOW"`, `"RUN"`. |
