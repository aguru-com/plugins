# Date Helper

Manipulate, format, and extract time units for all your date and time needs.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-date-helper'
  version: '0.2.0'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `get_current_date`

**Get Current Date.** Reads the clock and returns the current date and time for a chosen IANA time zone, rendered with one of 15 preset patterns (including unix seconds via X). Use it to stamp a run with the current instant or to produce the base date that Format Date, Add/Subtract Time or Date Difference consume; it accepts no date input, so prefer Format Date when you already have a date string. Output format and time zone are both required; not idempotent, since every call reads the clock and returns a different value.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timeFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Output Format. Pick how the result should look. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `timeZone` | string | yes | `"UTC"` | Time Zone. Time zone the current date and time are reported in. One of `"Pacific/Midway"`, `"Pacific/Niue"`, `"Pacific/Pago_Pago"`, `"Pacific/Honolulu"`, `"Pacific/Rarotonga"`, `"Pacific/Tahiti"`, `"Pacific/Marquesas"`, `"America/Adak"`, `"Pacific/Gambier"`, `"America/Anchorage"`, `"America/Juneau"`, `"America/Metlakatla"`, `"America/Nome"`, `"America/Sitka"`, `"America/Yakutat"`, `"Pacific/Pitcairn"`, `"America/Creston"`, `"America/Dawson"`, `"America/Dawson_Creek"`, `"America/Fort_Nelson"`, `"America/Hermosillo"`, `"America/Los_Angeles"`, `"America/Mazatlan"`, `"America/Phoenix"`, `"America/Tijuana"` and 394 more. |

Output fields:

- `result`: Current Date

### `format_date`

**Format Date.** Converts a date string from one pattern and time zone into another in a single step. Pick this for a pure representation change; use Extract Date Units to pull components as data, Add/Subtract Time to move the date, and Date Difference to compare two dates. Requires the input date plus source and target format and zone; the source pattern is only a parsing hint (parsing falls back to lenient then native parsing) and the action throws if the value cannot be parsed at all, but is otherwise deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inputDate` | string | yes |  | Date. Usually a value from a previous step, in the format below. |
| `inputFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Format. Pick how your date is written. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `inputTimeZone` | string | yes | `"UTC"` | Time Zone. Time zone the date above is written in. One of `"Pacific/Midway"`, `"Pacific/Niue"`, `"Pacific/Pago_Pago"`, `"Pacific/Honolulu"`, `"Pacific/Rarotonga"`, `"Pacific/Tahiti"`, `"Pacific/Marquesas"`, `"America/Adak"`, `"Pacific/Gambier"`, `"America/Anchorage"`, `"America/Juneau"`, `"America/Metlakatla"`, `"America/Nome"`, `"America/Sitka"`, `"America/Yakutat"`, `"Pacific/Pitcairn"`, `"America/Creston"`, `"America/Dawson"`, `"America/Dawson_Creek"`, `"America/Fort_Nelson"`, `"America/Hermosillo"`, `"America/Los_Angeles"`, `"America/Mazatlan"`, `"America/Phoenix"`, `"America/Tijuana"` and 394 more. |
| `outputFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Format. Pick how the result should look. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `outputTimeZone` | string | yes | `"UTC"` | Time Zone. Time zone to convert the result to. One of `"Pacific/Midway"`, `"Pacific/Niue"`, `"Pacific/Pago_Pago"`, `"Pacific/Honolulu"`, `"Pacific/Rarotonga"`, `"Pacific/Tahiti"`, `"Pacific/Marquesas"`, `"America/Adak"`, `"Pacific/Gambier"`, `"America/Anchorage"`, `"America/Juneau"`, `"America/Metlakatla"`, `"America/Nome"`, `"America/Sitka"`, `"America/Yakutat"`, `"Pacific/Pitcairn"`, `"America/Creston"`, `"America/Dawson"`, `"America/Dawson_Creek"`, `"America/Fort_Nelson"`, `"America/Hermosillo"`, `"America/Los_Angeles"`, `"America/Mazatlan"`, `"America/Phoenix"`, `"America/Tijuana"` and 394 more. |

Output fields:

- `result`: Formatted Date

### `extract_date_parts`

**Extract Date Units.** Parses one date string and returns the selected calendar components as separate values, any combination in a single call, with month as a 1-12 number and the weekday and month names spelled out. Use it when downstream logic needs the parts as data, for example branching on the weekday name; prefer Format Date when you only need the whole date rendered differently. Requires the date and its input pattern, and each requested unit must come from that supported set or the action throws; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inputDate` | string | yes |  | Date. Usually a value from a previous step, in the format below. |
| `inputFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Date Format. Pick how your date is written. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `unitExtract` | array | yes | `["year","month","day"]` | Units. Each unit becomes its own output field. Month is 1 to 12. One of `"year"`, `"month"`, `"day"`, `"hour"`, `"minute"`, `"second"`, `"dayOfWeek"`, `"monthName"`. |

### `date_difference`

**Date Difference.** Measures the elapsed time between a start date and an end date, returning any combination of the requested units in one call. Use it to compare two known dates for age, SLA or gap checks; use Add/Subtract Time instead to shift a single date. Each date needs its own input pattern, and the units are decomposed duration components rather than totals - the day value is the remainder inside the month - and come back negative when the end date precedes the start; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `startDate` | string | yes |  | Date. Usually a value from a previous step, in the format below. |
| `startDateFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Format. Pick how your date is written. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `endDate` | string | yes |  | Date. Usually a value from a previous step, in the format below. |
| `endDateFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Format. Pick how your date is written. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `unitDifference` | array | yes | `["day"]` | Units. Each unit becomes its own output field, as remainders not totals. One of `"year"`, `"month"`, `"day"`, `"hour"`, `"minute"`, `"second"`. |

### `add_subtract_date`

**Add/Subtract Time.** Shifts an input date by a signed year/month/day/hour/minute/second expression, and can pin the resulting clock time to a fixed 24h value or the current time. Use Date Difference to compare two dates, Format Date for a format or zone change only, and Next Day of Week or Next Day of Year for the next calendar occurrence. The Set Time To (HH:mm) and Use Current Time options apply only when a Time Zone is also selected; idempotent except when Use Current Time ties the result to the clock.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inputDate` | string | yes |  | Date. Usually a value from a previous step, in the format below. |
| `inputDateFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Format. Pick how your date is written. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `expression` | string | yes |  | Expression. Use year, month, day, hour, minute, second with + or -. |
| `outputFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Format. Pick how the result should look. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `timeZone` | string | no |  | Time Zone. Needed for the two options below and for daylight-saving. One of `"Pacific/Midway"`, `"Pacific/Niue"`, `"Pacific/Pago_Pago"`, `"Pacific/Honolulu"`, `"Pacific/Rarotonga"`, `"Pacific/Tahiti"`, `"Pacific/Marquesas"`, `"America/Adak"`, `"Pacific/Gambier"`, `"America/Anchorage"`, `"America/Juneau"`, `"America/Metlakatla"`, `"America/Nome"`, `"America/Sitka"`, `"America/Yakutat"`, `"Pacific/Pitcairn"`, `"America/Creston"`, `"America/Dawson"`, `"America/Dawson_Creek"`, `"America/Fort_Nelson"`, `"America/Hermosillo"`, `"America/Los_Angeles"`, `"America/Mazatlan"`, `"America/Phoenix"`, `"America/Tijuana"` and 394 more. |
| `setTime` | string | no |  | Set Time. Pin the result to this time of day, HH:mm. Needs a Time Zone. |
| `useCurrentTime` | boolean | no | `false` | Use Current Time. Pin the result to the current time instead. Needs a Time Zone. |

Output fields:

- `result`: Resulting Date

### `next_day_of_week`

**Next Day of Week.** Returns the next occurrence of a given weekday in a chosen time zone, stamped with a fixed 24h time or the current time; when today is that weekday but the target time has already passed, it rolls forward a full week. Use Next Day of Year for a month-and-day anniversary and Add/Subtract Time to offset a date you already hold. The weekday is required and the time must be HH:mm; not idempotent, since the result derives from the current clock and identical inputs return different dates over time.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `weekday` | string | yes | `1` | Weekday. The next date on this weekday. Today counts if the time is ahead. One of `0`, `1`, `2`, `3`, `4`, `5`, `6`. |
| `timeFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Output Format. Pick how the result should look. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `timeZone` | string | yes | `"UTC"` | Time Zone. Time zone used to work out the date and to report the result. One of `"Pacific/Midway"`, `"Pacific/Niue"`, `"Pacific/Pago_Pago"`, `"Pacific/Honolulu"`, `"Pacific/Rarotonga"`, `"Pacific/Tahiti"`, `"Pacific/Marquesas"`, `"America/Adak"`, `"Pacific/Gambier"`, `"America/Anchorage"`, `"America/Juneau"`, `"America/Metlakatla"`, `"America/Nome"`, `"America/Sitka"`, `"America/Yakutat"`, `"Pacific/Pitcairn"`, `"America/Creston"`, `"America/Dawson"`, `"America/Dawson_Creek"`, `"America/Fort_Nelson"`, `"America/Hermosillo"`, `"America/Los_Angeles"`, `"America/Mazatlan"`, `"America/Phoenix"`, `"America/Tijuana"` and 394 more. |
| `time` | string | no | `"00:00"` | Time. 24-hour clock, HH:mm. |
| `currentTime` | boolean | no | `false` | Use Current Time. Ignore the Time field and use the current time of day. |

Output fields:

- `result`: Next Occurrence

### `next_day_of_year`

**Next Day of Year.** Returns the next occurrence of a fixed month and day of month relative to now in a chosen time zone, rolling into next year when that date has already passed, stamped with a fixed 24h time or the current time. Use it for anniversaries and renewals; prefer Next Day of Week for weekday-based recurrence. Month and day are required (a day missing from the chosen month rolls into the following month instead of erroring) and the time must be HH:mm; not idempotent, since the base is the current clock.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `month` | string | yes |  | Month. Month of the date to find. One of `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`. |
| `day` | number | yes | `1` | Day of Month. Rolls into the next month if the month is shorter. |
| `timeFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Output Format. Pick how the result should look. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `timeZone` | string | yes | `"UTC"` | Time Zone. Time zone used to work out the date and to report the result. One of `"Pacific/Midway"`, `"Pacific/Niue"`, `"Pacific/Pago_Pago"`, `"Pacific/Honolulu"`, `"Pacific/Rarotonga"`, `"Pacific/Tahiti"`, `"Pacific/Marquesas"`, `"America/Adak"`, `"Pacific/Gambier"`, `"America/Anchorage"`, `"America/Juneau"`, `"America/Metlakatla"`, `"America/Nome"`, `"America/Sitka"`, `"America/Yakutat"`, `"Pacific/Pitcairn"`, `"America/Creston"`, `"America/Dawson"`, `"America/Dawson_Creek"`, `"America/Fort_Nelson"`, `"America/Hermosillo"`, `"America/Los_Angeles"`, `"America/Mazatlan"`, `"America/Phoenix"`, `"America/Tijuana"` and 394 more. |
| `time` | string | no | `"00:00"` | Time. 24-hour clock, HH:mm. |
| `currentTime` | boolean | no | `false` | Use Current Time. Ignore the Time field and use the current time of day. |

Output fields:

- `result`: Next Occurrence

### `first_day_of_previous_month`

**First Day of Previous Month.** Returns the first calendar day of the month before the current month, stamped with midnight, a supplied 24h time, or the current time. Use it as the opening bound of a last-month reporting window, paired with Last Day of Previous Month; use Add/Subtract Time for an arbitrary offset from a specific date. Time zone and output format are required and the time must be HH:mm; not idempotent - the window is derived from the current clock and changes once the month rolls over.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timeFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Output Format. Pick how the result should look. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `timeZone` | string | yes | `"UTC"` | Time Zone. Time zone used to work out the date and to report the result. One of `"Pacific/Midway"`, `"Pacific/Niue"`, `"Pacific/Pago_Pago"`, `"Pacific/Honolulu"`, `"Pacific/Rarotonga"`, `"Pacific/Tahiti"`, `"Pacific/Marquesas"`, `"America/Adak"`, `"Pacific/Gambier"`, `"America/Anchorage"`, `"America/Juneau"`, `"America/Metlakatla"`, `"America/Nome"`, `"America/Sitka"`, `"America/Yakutat"`, `"Pacific/Pitcairn"`, `"America/Creston"`, `"America/Dawson"`, `"America/Dawson_Creek"`, `"America/Fort_Nelson"`, `"America/Hermosillo"`, `"America/Los_Angeles"`, `"America/Mazatlan"`, `"America/Phoenix"`, `"America/Tijuana"` and 394 more. |
| `time` | string | no | `"00:00"` | Time. 24-hour clock, HH:mm. |
| `currentTime` | boolean | no | `false` | Use Current Time. Ignore the Time field and use the current time of day. |

Output fields:

- `result`: First Day of Previous Month

### `last_day_of_previous_month`

**Last Day of Previous Month.** Returns the last calendar day of the month before the current month, stamped with midnight, a supplied 24h time, or the current time - the time is overwritten rather than set to end of day, so 23:59 must be asked for explicitly. Use it as the closing bound of a last-month reporting window whose start comes from First Day of Previous Month. Time zone and output format are required and the time must be HH:mm; not idempotent - derived from the current clock, changing once the month rolls over.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `timeFormat` | string | yes | `"DDD MMM DD YYYY HH:mm:ss"` | Output Format. Pick how the result should look. One of `"DDD MMM DD YYYY HH:mm:ss"`, `"DDD MMM DD HH:mm:ss YYYY"`, `"MMMM DD YYYY HH:mm:ss"`, `"MMMM DD YYYY"`, `"MMM DD YYYY"`, `"YYYY-MM-DDTHH:mm:ss"`, `"YYYY-MM-DD HH:mm:ss"`, `"YYYY-MM-DD"`, `"MM-DD-YYYY"`, `"MM/DD/YYYY"`, `"MM/DD/YY"`, `"DD-MM-YYYY"`, `"DD/MM/YYYY"`, `"DD/MM/YY"`, `"X"`. |
| `timeZone` | string | yes | `"UTC"` | Time Zone. Time zone used to work out the date and to report the result. One of `"Pacific/Midway"`, `"Pacific/Niue"`, `"Pacific/Pago_Pago"`, `"Pacific/Honolulu"`, `"Pacific/Rarotonga"`, `"Pacific/Tahiti"`, `"Pacific/Marquesas"`, `"America/Adak"`, `"Pacific/Gambier"`, `"America/Anchorage"`, `"America/Juneau"`, `"America/Metlakatla"`, `"America/Nome"`, `"America/Sitka"`, `"America/Yakutat"`, `"Pacific/Pitcairn"`, `"America/Creston"`, `"America/Dawson"`, `"America/Dawson_Creek"`, `"America/Fort_Nelson"`, `"America/Hermosillo"`, `"America/Los_Angeles"`, `"America/Mazatlan"`, `"America/Phoenix"`, `"America/Tijuana"` and 394 more. |
| `time` | string | no | `"00:00"` | Time. 24-hour clock, HH:mm. |
| `currentTime` | boolean | no | `false` | Use Current Time. Ignore the Time field and use the current time of day. |

Output fields:

- `result`: Last Day of Previous Month
