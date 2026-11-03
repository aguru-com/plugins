# Binance

Get public Binance spot market data: prices, 24h statistics, order book, recent trades, candles and trading pairs. No API key needed.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-binance'
  version: '0.5.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `fetch_crypto_pair_price`

**Fetch Pair Price.** Fetches the current spot price of a trading pair from the public Binance market data API by combining two coin symbols (e.g. first coin BTC + second coin USDT). Use to look up the live exchange rate of one crypto asset against another. No authentication required; the symbol must be a pair that exists on Binance or the request fails. Read-only lookup, idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_coin` | string | yes |  | First Coin Symbol. The currency to fetch the price for (e.g. 'BTC' in 'BTC/USDT') |
| `second_coin` | string | yes |  | Second Coin Symbol. The currency to fetch the price in (e.g. 'USDT' in 'BTC/USDT') |

### `binance_get_price`

**Get Price.** Gets the latest Binance spot trade price for one trading pair symbol such as BTCUSDT (base asset followed by quote asset). Use for a single live price; use Get Multiple Prices for up to 100 pairs in one call, or Get 24h Ticker Stats when you also need change and volume. The pair must be listed and currently trading on Binance (find symbols with List Trading Pairs); the price is an exact decimal string. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `symbol` | string | yes |  | Symbol. The trading pair: base asset followed by quote asset, for example BTCUSDT or ETHBTC. Spaces and '/' are removed and letters are upper-cased, so 'btc/usdt' also works. Use List Trading Pairs to find a symbol. |

Output fields:

- `symbol`: Symbol
- `price`: Price

### `get_multiple_prices`

**Get Multiple Prices.** Gets the latest Binance spot trade prices for up to 100 trading pair symbols (such as BTCUSDT, ETHUSDT) in one request. Use instead of calling Get Price repeatedly; use Get 24h Ticker Stats for change and volume. Every symbol must be listed on Binance or the whole call fails; listed pairs that are not trading right now are returned in notTrading instead of with a price. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `symbols` | array | yes |  | Symbols. Trading pairs to price, for example BTCUSDT and ETHUSDT (base asset followed by quote asset). Up to 100. Spaces and '/' are removed, letters are upper-cased and duplicates are dropped. A comma-separated list in one item also works. |

Output fields:

- `prices`: Prices
- `prices[].symbol`: Symbol
- `prices[].price`: Price
- `count`: Count (number)
- `notTrading`: Not Trading

### `get_24h_ticker`

**Get 24h Ticker Stats.** Gets rolling 24-hour statistics for one Binance spot pair such as BTCUSDT. The Full detail level (default) returns price change and percent, weighted average, previous close, best bid/ask, open/high/low/last price, volumes and trade count; Mini returns only open/high/low/last price, volumes and trade count. Use for a daily market summary; use Get Price Change (Rolling Window) for any other window from 1 minute to 7 days. Prices and volumes are exact decimal strings. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `symbol` | string | yes |  | Symbol. The trading pair: base asset followed by quote asset, for example BTCUSDT or ETHBTC. Spaces and '/' are removed and letters are upper-cased, so 'btc/usdt' also works. Use List Trading Pairs to find a symbol. |
| `type` | string | no | `"FULL"` | Detail Level. Full (default) adds price change and percent, weighted average price, previous close, last quantity and best bid/ask. Mini returns only open, high, low and last price, volumes and trade count. One of `"FULL"`, `"MINI"`. |

Output fields:

- `symbol`: Symbol
- `priceChange`: Price Change
- `priceChangePercent`: Price Change %
- `weightedAvgPrice`: Weighted Average Price
- `prevClosePrice`: Previous Close Price
- `lastQty`: Last Quantity
- `bidPrice`: Best Bid Price
- `bidQty`: Best Bid Quantity
- `askPrice`: Best Ask Price
- `askQty`: Best Ask Quantity
- `openPrice`: Open Price
- `highPrice`: High Price
- `lowPrice`: Low Price
- `lastPrice`: Last Price
- `volume`: Volume
- `quoteVolume`: Quote Volume
- `openTime`: Open Time
- `closeTime`: Close Time
- `firstId`: First Trade ID
- `lastId`: Last Trade ID
- `count`: Trade Count (number)

### `get_rolling_window_ticker`

**Get Price Change (Rolling Window).** Gets price change and percent, open/high/low/last price, volume and trade count for one Binance spot pair over a rolling window ending now, from 1m to 59m, 1h to 23h, or 1d to 7d (default 1h). Use to answer "how much did X move in the last N minutes/hours/days"; use Get 24h Ticker Stats for the 24-hour view with bid/ask, or Get Candles for a time series. Prices and volumes are exact decimal strings. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `symbol` | string | yes |  | Symbol. The trading pair: base asset followed by quote asset, for example BTCUSDT or ETHBTC. Spaces and '/' are removed and letters are upper-cased, so 'btc/usdt' also works. Use List Trading Pairs to find a symbol. |
| `window_size` | string | no | `"1h"` | Window Size. How far back the window reaches: a number and a unit, 1m to 59m (minutes), 1h to 23h (hours) or 1d to 7d (days), for example 15m, 4h or 7d. Units cannot be combined. Defaults to 1h. |

Output fields:

- `symbol`: Symbol
- `windowSize`: Window Size
- `priceChange`: Price Change
- `priceChangePercent`: Price Change %
- `weightedAvgPrice`: Weighted Average Price
- `openPrice`: Open Price
- `highPrice`: High Price
- `lowPrice`: Low Price
- `lastPrice`: Last Price
- `volume`: Volume
- `quoteVolume`: Quote Volume
- `openTime`: Open Time
- `closeTime`: Close Time
- `firstId`: First Trade ID
- `lastId`: Last Trade ID
- `count`: Trade Count (number)

### `get_average_price`

**Get Average Price.** Gets Binance's current average price for one spot pair such as BTCUSDT, computed over a short window (mins, usually 5 minutes). Use when a smoothed price is better than the last trade, for example for price-based order limits; use Get Price for the latest trade. The price is an exact decimal string. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `symbol` | string | yes |  | Symbol. The trading pair: base asset followed by quote asset, for example BTCUSDT or ETHBTC. Spaces and '/' are removed and letters are upper-cased, so 'btc/usdt' also works. Use List Trading Pairs to find a symbol. |

Output fields:

- `symbol`: Symbol
- `price`: Average Price
- `mins`: Window (Minutes) (number)
- `closeTime`: Last Trade Time

### `get_order_book`

**Get Order Book.** Gets the current order book for one Binance spot pair such as BTCUSDT: the best bid and ask price levels with their quantities, best first, up to the requested depth per side (1-5000, default 20). Use to judge liquidity, spread or the price a large order would fill at; use Get Price when only the last trade price is needed. Depths above 100 cost far more rate-limit weight, so keep it small. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `symbol` | string | yes |  | Symbol. The trading pair: base asset followed by quote asset, for example BTCUSDT or ETHBTC. Spaces and '/' are removed and letters are upper-cased, so 'btc/usdt' also works. Use List Trading Pairs to find a symbol. |
| `limit` | number | no | `20` | Depth. Price levels to return on each side, 1 to 5000. Defaults to 20. Binance rate-limit weight: 5 up to 100 levels, 25 up to 500, 50 up to 1000, 250 above that. |

Output fields:

- `symbol`: Symbol
- `lastUpdateId`: Last Update ID
- `bids`: Bids
- `bids[].price`: Price
- `bids[].quantity`: Quantity
- `asks`: Asks
- `asks[].price`: Price
- `asks[].quantity`: Quantity

### `get_recent_trades`

**Get Recent Trades.** Gets the most recent public trades for one Binance spot pair such as BTCUSDT (price, quantity, quote quantity, time, and whether the buyer was the maker), oldest first, up to the requested count (1-1000, default 50). Use to see live trading activity; use Get Candles for aggregated price history over time. Only the latest trades are available, not a time range. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `symbol` | string | yes |  | Symbol. The trading pair: base asset followed by quote asset, for example BTCUSDT or ETHBTC. Spaces and '/' are removed and letters are upper-cased, so 'btc/usdt' also works. Use List Trading Pairs to find a symbol. |
| `limit` | number | no | `50` | Number of Trades. How many of the most recent trades to return, 1 to 1000. Defaults to 50. |

Output fields:

- `symbol`: Symbol
- `trades`: Trades
- `trades[].id`: Trade ID
- `trades[].price`: Price
- `trades[].qty`: Quantity
- `trades[].quoteQty`: Quote Quantity
- `trades[].time`: Time
- `trades[].isBuyerMaker`: Buyer Is Maker (boolean)
- `trades[].isBestMatch`: Best Price Match (boolean)
- `count`: Count (number)

### `get_candles`

**Get Candles (Klines).** Gets OHLCV candlesticks (klines) for one Binance spot pair at an interval from 1s to 1M, either the most recent ones (optionally ending at an end time) or those from a start time onwards (optionally up to an end time). Use for price history, charts or indicators; use Get Price Change (Rolling Window) when only the change over one period is needed. At most 1000 candles per call; when a start time is given and more candles follow, hasMore is true and nextStartTime is where to continue. Prices and volumes are exact decimal strings. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `symbol` | string | yes |  | Symbol. The trading pair: base asset followed by quote asset, for example BTCUSDT or ETHBTC. Spaces and '/' are removed and letters are upper-cased, so 'btc/usdt' also works. Use List Trading Pairs to find a symbol. |
| `interval` | string | yes | `"1h"` | Interval. Length of each candle. 1m is one minute and 1M is one month. One of `"1s"`, `"1m"`, `"3m"`, `"5m"`, `"15m"`, `"30m"`, `"1h"`, `"2h"`, `"4h"`, `"6h"`, `"8h"`, `"12h"`, `"1d"`, `"3d"`, `"1w"`, `"1M"`. |
| `start_time` | ISO date-time string | no |  | Start Time. Optional. Return candles that open at or after this time (UTC), for example 2026-09-01T00:00:00Z. Leave empty to get the most recent candles. |
| `end_time` | ISO date-time string | no |  | End Time. Optional. Return candles that open at or before this time (UTC). Must not be earlier than the start time. |
| `time_zone` | string | no |  | Time Zone Offset. Optional. Offset from UTC used to align daily and longer candles, such as 8, -5 or 05:45 (from -12:00 to +14:00). Start and end times are always read as UTC. Defaults to UTC. |
| `limit` | number | no | `100` | Number of Candles. How many candles to return, 1 to 1000. Defaults to 100. |

Output fields:

- `symbol`: Symbol
- `interval`: Interval
- `candles`: Candles
- `candles[].openTime`: Open Time
- `candles[].open`: Open
- `candles[].high`: High
- `candles[].low`: Low
- `candles[].close`: Close
- `candles[].volume`: Volume
- `candles[].closeTime`: Close Time
- `candles[].quoteVolume`: Quote Volume
- `candles[].tradeCount`: Trade Count (number)
- `candles[].takerBuyBaseVolume`: Taker Buy Volume
- `candles[].takerBuyQuoteVolume`: Taker Buy Quote Volume
- `count`: Count (number)
- `hasMore`: Has More (boolean)
- `nextStartTime`: Next Start Time

### `list_trading_pairs`

**List Trading Pairs.** Lists Binance pairs that are open for spot trading right now (status TRADING and spot trading allowed; pairs only open for margin are left out), optionally only those with a given quote asset (such as USDT) and/or base asset (such as BTC). Use to find the exact symbol to pass to the price, ticker, order book, trade or candle actions; use Get Trading Pair Rules for one pair's tick size and minimum order. Returns at most the requested number of pairs (default 100, max 1500) plus the total match count and a truncated flag; narrow with the asset filters when truncated. Read-only and idempotent.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `quote_asset` | string | no |  | Quote Asset. Optional. Only pairs priced in this asset, for example USDT, BTC or EUR. Not case-sensitive. |
| `base_asset` | string | no |  | Base Asset. Optional. Only pairs that trade this asset, for example BTC or ETH. Not case-sensitive. |
| `limit` | number | no | `100` | Maximum Pairs. Most pairs to return, 1 to 1500. Defaults to 100. The output also says how many pairs matched in total. |

Output fields:

- `pairs`: Trading Pairs
- `pairs[].symbol`: Symbol
- `pairs[].status`: Status
- `pairs[].baseAsset`: Base Asset
- `pairs[].quoteAsset`: Quote Asset
- `pairs[].baseAssetPrecision`: Base Asset Precision (number)
- `pairs[].quoteAssetPrecision`: Quote Asset Precision (number)
- `pairs[].isSpotTradingAllowed`: Spot Trading Allowed (boolean)
- `pairs[].isMarginTradingAllowed`: Margin Trading Allowed (boolean)
- `pairs[].orderTypes`: Order Types
- `count`: Returned (number)
- `total`: Total Matches (number)
- `truncated`: Truncated (boolean)

### `get_trading_pair_rules`

**Get Trading Pair Rules.** Gets the trading rules for one Binance spot pair such as BTCUSDT: status, base and quote asset, precisions, allowed order types, and the price filter (tick size, min/max price), lot size (step size, min/max quantity) and notional limits (min/max order value), plus the raw filter list. Use before computing an order price or quantity; use List Trading Pairs to find pairs. A rule the pair does not define is null. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `symbol` | string | yes |  | Symbol. The trading pair: base asset followed by quote asset, for example BTCUSDT or ETHBTC. Spaces and '/' are removed and letters are upper-cased, so 'btc/usdt' also works. Use List Trading Pairs to find a symbol. |

Output fields:

- `symbol`: Symbol
- `status`: Status
- `baseAsset`: Base Asset
- `quoteAsset`: Quote Asset
- `baseAssetPrecision`: Base Asset Precision (number)
- `quoteAssetPrecision`: Quote Asset Precision (number)
- `isSpotTradingAllowed`: Spot Trading Allowed (boolean)
- `isMarginTradingAllowed`: Margin Trading Allowed (boolean)
- `orderTypes`: Order Types
- `tickSize`: Tick Size
- `minPrice`: Minimum Price
- `maxPrice`: Maximum Price
- `stepSize`: Quantity Step Size
- `minQty`: Minimum Quantity
- `maxQty`: Maximum Quantity
- `minNotional`: Minimum Order Value
- `maxNotional`: Maximum Order Value
- `filters`: All Filters
