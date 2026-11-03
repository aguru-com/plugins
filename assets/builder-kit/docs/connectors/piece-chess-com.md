# Chess.com

Access Chess.com player data

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chess-com'
  version: '0.0.8'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `get_player_profile`

**Get Player Profile.** Looks up a Chess.com player's public profile by username, returning identity and account details (avatar, country, join date, followers, status). Use to resolve or enrich a known Chess.com username; for ratings and game records use Get Player Stats instead. Requires an exact username (3-25 chars, alphanumeric/underscore/hyphen); it is matched case-insensitively. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. The Chess.com username to look up. |

### `get_player_stats`

**Get Player Stats.** Looks up a Chess.com player's competitive statistics by username, returning per-time-control ratings and win/draw/loss records (rapid, blitz, bullet, chess960, and others). Use when you need a player's strength or results; for profile/identity details use Get Player Profile instead. Requires an exact username (3-25 chars, alphanumeric/underscore/hyphen), matched case-insensitively. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. The Chess.com username to look up. |

### `get_daily_puzzle`

**Get Daily Puzzle.** Fetches the current Chess.com daily puzzle (title, board position/FEN, PGN, and puzzle image). Takes no input and always returns the puzzle for the current day. Read-only and idempotent within a given day.

Kind: read, safe to repeat.

No inputs.
