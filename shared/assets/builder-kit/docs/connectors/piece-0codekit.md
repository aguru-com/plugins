# 0CodeKit

Ready-made utilities for automations: dates and calendar weeks, conversions, validation, PDF and QR tools, file storage, AI text and image analysis, code execution, crypto and short links.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-0codekit'
  version: '0.1.2'
```

Categories: DEVELOPER_TOOLS, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Log in to your [0CodeKit](https://0codekit.com) account.
> 2. Open the **Account** tab. Your API key is shown there.
> 3. Copy the key and paste it here.

## Actions

### `current_month`

**Current Month.** Return the number of days, first and last day, last workday, and the lists of workdays, Saturdays and Sundays for the month that is current right now. Use Specific Month and Year for any other month. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `outputFormat` | string | no |  | Output Date Format. How dates in the result are written, using tokens such as `DD` (day), `MM` (month), `YYYY` (year), `HH:mm` (time). Leave empty to use the 0CodeKit default. |
| `returnTimestamps` | boolean | no | `false` | Return Unix Timestamps. Return every date as a Unix timestamp (seconds) instead of formatted text. |

Output fields:

- `days_in_month`: Days in Month (number)
- `first_day_of_month`: First Day of Month
- `last_day_of_month`: Last Day of Month
- `last_workday_of_month`: Last Workday of Month
- `workday_count`: Workday Count (number)
- `workdays`: Workdays
- `workdays_reversed`: Workdays (Latest First)
- `saturdays`: Saturdays
- `sundays`: Sundays

### `specific_month_and_year`

**Specific Month and Year.** Return the number of days, first and last day, last workday, and the lists of workdays, Saturdays and Sundays for a given month and year. Use Current Month when you only need the month that is current now. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `month` | string | yes |  | Month. The month to describe. One of `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`. |
| `year` | number | yes |  | Year. The four-digit year, for example 2025. |
| `outputFormat` | string | no |  | Output Date Format. How dates in the result are written, using tokens such as `DD` (day), `MM` (month), `YYYY` (year), `HH:mm` (time). Leave empty to use the 0CodeKit default. |
| `returnTimestamps` | boolean | no | `false` | Return Unix Timestamps. Return every date as a Unix timestamp (seconds) instead of formatted text. |

Output fields:

- `days_in_month`: Days in Month (number)
- `first_day_of_month`: First Day of Month
- `last_day_of_month`: Last Day of Month
- `last_workday_of_month`: Last Workday of Month
- `workday_count`: Workday Count (number)
- `workdays`: Workdays
- `workdays_reversed`: Workdays (Latest First)
- `saturdays`: Saturdays
- `sundays`: Sundays

### `current_week`

**Current Week.** Return the calendar week number of today plus the first and last day of this week. Use the "Current Week from Date" or "from Unix Timestamp" actions for another day. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `outputFormat` | string | no |  | Output Date Format. How dates in the result are written, using tokens such as `DD` (day), `MM` (month), `YYYY` (year), `HH:mm` (time). Leave empty to use the 0CodeKit default. |

Output fields:

- `week_number`: Week Number (number)
- `working_date`: Working Date
- `first_day_of_week`: First Day of Week
- `last_day_of_week`: Last Day of Week

### `current_week_from_date`

**Current Week from Date.** Return the calendar week number of a date written as text, plus the first and last day of that week. The Date Format must describe how the date is written. Use "Current Week from Unix Timestamp" for numeric timestamps. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `date` | string | yes |  | Date. The date to look up, written in the format below. |
| `dateFormat` | string | yes |  | Date Format. How the date above is written, using tokens such as `DD` (day), `MM` (month) and `YYYY` (year). For example `DD.MM.YYYY` for 20.01.2025 or `YYYY-MM-DD` for 2025-01-20. |
| `outputFormat` | string | no |  | Output Date Format. How dates in the result are written, using tokens such as `DD` (day), `MM` (month), `YYYY` (year), `HH:mm` (time). Leave empty to use the 0CodeKit default. |

Output fields:

- `week_number`: Week Number (number)
- `working_date`: Working Date
- `first_day_of_week`: First Day of Week
- `last_day_of_week`: Last Day of Week

### `current_week_from_unix_timestamp`

**Current Week from Unix Timestamp.** Return the calendar week number of a Unix timestamp in seconds, plus the first and last day of that week. Use "Current Week from Date" when the date is text. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `unixTimestamp` | number | yes |  | Unix Timestamp. The moment to look up, in seconds since 1 January 1970. |
| `outputFormat` | string | no |  | Output Date Format. How dates in the result are written, using tokens such as `DD` (day), `MM` (month), `YYYY` (year), `HH:mm` (time). Leave empty to use the 0CodeKit default. |

Output fields:

- `week_number`: Week Number (number)
- `working_date`: Working Date
- `first_day_of_week`: First Day of Week
- `last_day_of_week`: Last Day of Week

### `current_week_with_week_number`

**Current Week only with Week Number.** Return the first and last day of a calendar week number in the current year. Use "Current Week with Week Number and Year" to pick a different year. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `weekNumber` | number | yes |  | Week Number. The calendar week number, from 1 to 53. |
| `outputFormat` | string | no |  | Output Date Format. How dates in the result are written, using tokens such as `DD` (day), `MM` (month), `YYYY` (year), `HH:mm` (time). Leave empty to use the 0CodeKit default. |

Output fields:

- `week_number`: Week Number (number)
- `working_date`: Working Date
- `first_day_of_week`: First Day of Week
- `last_day_of_week`: Last Day of Week

### `current_week_with_week_number_and_year`

**Current Week with Week Number and Year.** Return the first and last day of a calendar week number in a given year. Use "Current Week only with Week Number" when the year is the current one. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `weekNumber` | number | yes |  | Week Number. The calendar week number, from 1 to 53. |
| `year` | number | yes |  | Year. The four-digit year, for example 2025. |
| `outputFormat` | string | no |  | Output Date Format. How dates in the result are written, using tokens such as `DD` (day), `MM` (month), `YYYY` (year), `HH:mm` (time). Leave empty to use the 0CodeKit default. |

Output fields:

- `week_number`: Week Number (number)
- `working_date`: Working Date
- `first_day_of_week`: First Day of Week
- `last_day_of_week`: Last Day of Week

### `is_weekend`

**Is Given Date is Weekend.** Check whether a date is on a weekend and return its weekday name and number. Pass the date in a standard form such as 2025-01-20; use "Is Given Date is Weekend, with Format" when the date is written in a custom format. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `date` | string | yes |  | Date. The date to check, for example 2025-01-20. |
| `timeZone` | string | no |  | Time Zone. The time zone the date belongs to. Leave empty to use the 0CodeKit default. One of `"UTC"`, `"Africa/Abidjan"`, `"Africa/Accra"`, `"Africa/Addis_Ababa"`, `"Africa/Algiers"`, `"Africa/Asmera"`, `"Africa/Bamako"`, `"Africa/Bangui"`, `"Africa/Banjul"`, `"Africa/Bissau"`, `"Africa/Blantyre"`, `"Africa/Brazzaville"`, `"Africa/Bujumbura"`, `"Africa/Cairo"`, `"Africa/Casablanca"`, `"Africa/Ceuta"`, `"Africa/Conakry"`, `"Africa/Dakar"`, `"Africa/Dar_es_Salaam"`, `"Africa/Djibouti"`, `"Africa/Douala"`, `"Africa/El_Aaiun"`, `"Africa/Freetown"`, `"Africa/Gaborone"`, `"Africa/Harare"` and 394 more. |

Output fields:

- `is_weekend`: Is Weekend (boolean)
- `weekday`: Weekday
- `day_number`: Day Number (number)

### `is_weekend_with_format`

**Is Given Date is Weekend, with Format.** Check whether a date is on a weekend and return its weekday name and number, parsing the date with the given Date Format (for example DD.MM.YYYY). Use "Is Given Date is Weekend" for standard ISO dates. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `date` | string | yes |  | Date. The date to check, written in the format below. |
| `dateFormat` | string | yes |  | Date Format. How the date above is written, using `YYYY` or `YY` (year), `MM` or `M` (month) and `DD` or `D` (day), with any separators. For example `DD.MM.YYYY` for 20.01.2025. |
| `timeZone` | string | no |  | Time Zone. The time zone the date belongs to. Leave empty to use the 0CodeKit default. One of `"UTC"`, `"Africa/Abidjan"`, `"Africa/Accra"`, `"Africa/Addis_Ababa"`, `"Africa/Algiers"`, `"Africa/Asmera"`, `"Africa/Bamako"`, `"Africa/Bangui"`, `"Africa/Banjul"`, `"Africa/Bissau"`, `"Africa/Blantyre"`, `"Africa/Brazzaville"`, `"Africa/Bujumbura"`, `"Africa/Cairo"`, `"Africa/Casablanca"`, `"Africa/Ceuta"`, `"Africa/Conakry"`, `"Africa/Dakar"`, `"Africa/Dar_es_Salaam"`, `"Africa/Djibouti"`, `"Africa/Douala"`, `"Africa/El_Aaiun"`, `"Africa/Freetown"`, `"Africa/Gaborone"`, `"Africa/Harare"` and 394 more. |

Output fields:

- `is_weekend`: Is Weekend (boolean)
- `weekday`: Weekday
- `day_number`: Day Number (number)

### `get_holidays`

**Holidays in Specific Country and Year.** List public holidays for a country (ISO 3166-1 alpha-2 code) and year, optionally narrowed to a state or region. Returns one row per holiday. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `countryCode` | string | yes |  | Country Code. The two-letter ISO country code of the country. |
| `year` | number | yes |  | Year. The four-digit year, for example 2025. |
| `state` | string | no |  | State. A state or region code to add regional holidays. Empty: national only. |

Output fields:

- `[].name`: Name
- `[].date`: Date (date)
- `[].type`: Type
- `[].start`: Start (datetime)
- `[].end`: End (datetime)
- `[].rule`: Rule

### `convert_timezone_with_date`

**Convert Between Timezones with Date.** Convert a date and time written as text from a source time zone to a destination time zone, optionally reformatting it. Use "Convert Between Timezones with Unix Timestamp" when the input is a numeric timestamp. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inputTime` | string | yes |  | Date and Time. The date and time to convert, for example `2025-01-20 14:30`. |
| `inputTimeZone` | string | yes |  | From Time Zone. The time zone the date and time above is in. One of `"UTC"`, `"Africa/Abidjan"`, `"Africa/Accra"`, `"Africa/Addis_Ababa"`, `"Africa/Algiers"`, `"Africa/Asmera"`, `"Africa/Bamako"`, `"Africa/Bangui"`, `"Africa/Banjul"`, `"Africa/Bissau"`, `"Africa/Blantyre"`, `"Africa/Brazzaville"`, `"Africa/Bujumbura"`, `"Africa/Cairo"`, `"Africa/Casablanca"`, `"Africa/Ceuta"`, `"Africa/Conakry"`, `"Africa/Dakar"`, `"Africa/Dar_es_Salaam"`, `"Africa/Djibouti"`, `"Africa/Douala"`, `"Africa/El_Aaiun"`, `"Africa/Freetown"`, `"Africa/Gaborone"`, `"Africa/Harare"` and 394 more. |
| `destinationTimeZone` | string | yes |  | To Time Zone. The time zone to convert to. One of `"UTC"`, `"Africa/Abidjan"`, `"Africa/Accra"`, `"Africa/Addis_Ababa"`, `"Africa/Algiers"`, `"Africa/Asmera"`, `"Africa/Bamako"`, `"Africa/Bangui"`, `"Africa/Banjul"`, `"Africa/Bissau"`, `"Africa/Blantyre"`, `"Africa/Brazzaville"`, `"Africa/Bujumbura"`, `"Africa/Cairo"`, `"Africa/Casablanca"`, `"Africa/Ceuta"`, `"Africa/Conakry"`, `"Africa/Dakar"`, `"Africa/Dar_es_Salaam"`, `"Africa/Djibouti"`, `"Africa/Douala"`, `"Africa/El_Aaiun"`, `"Africa/Freetown"`, `"Africa/Gaborone"`, `"Africa/Harare"` and 394 more. |
| `formatPattern` | string | no |  | Output Format. How the converted time is written, using tokens such as `DD.MM.YYYY HH:mm`. Leave empty to use the 0CodeKit default. |

Output fields:

- `converted_time`: Converted Time
- `time_zone`: Time Zone

### `convert_timezone_with_unix_timestamp`

**Convert Between Timezones with Unix Timestamp.** Convert a Unix timestamp in seconds into a formatted date and time in the destination time zone. Use "Convert Between Timezones with Date" when the input is a date written as text. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inputTime` | number | yes |  | Unix Timestamp. The moment to convert, in seconds since 1 January 1970. |
| `inputTimeZone` | string | no |  | From Time Zone. The time zone of the timestamp. Unix timestamps are normally UTC. One of `"UTC"`, `"Africa/Abidjan"`, `"Africa/Accra"`, `"Africa/Addis_Ababa"`, `"Africa/Algiers"`, `"Africa/Asmera"`, `"Africa/Bamako"`, `"Africa/Bangui"`, `"Africa/Banjul"`, `"Africa/Bissau"`, `"Africa/Blantyre"`, `"Africa/Brazzaville"`, `"Africa/Bujumbura"`, `"Africa/Cairo"`, `"Africa/Casablanca"`, `"Africa/Ceuta"`, `"Africa/Conakry"`, `"Africa/Dakar"`, `"Africa/Dar_es_Salaam"`, `"Africa/Djibouti"`, `"Africa/Douala"`, `"Africa/El_Aaiun"`, `"Africa/Freetown"`, `"Africa/Gaborone"`, `"Africa/Harare"` and 394 more. |
| `destinationTimeZone` | string | yes |  | To Time Zone. The time zone to convert to. One of `"UTC"`, `"Africa/Abidjan"`, `"Africa/Accra"`, `"Africa/Addis_Ababa"`, `"Africa/Algiers"`, `"Africa/Asmera"`, `"Africa/Bamako"`, `"Africa/Bangui"`, `"Africa/Banjul"`, `"Africa/Bissau"`, `"Africa/Blantyre"`, `"Africa/Brazzaville"`, `"Africa/Bujumbura"`, `"Africa/Cairo"`, `"Africa/Casablanca"`, `"Africa/Ceuta"`, `"Africa/Conakry"`, `"Africa/Dakar"`, `"Africa/Dar_es_Salaam"`, `"Africa/Djibouti"`, `"Africa/Douala"`, `"Africa/El_Aaiun"`, `"Africa/Freetown"`, `"Africa/Gaborone"`, `"Africa/Harare"` and 394 more. |
| `formatPattern` | string | no |  | Output Format. How the converted time is written, using tokens such as `DD.MM.YYYY HH:mm`. Leave empty to use the 0CodeKit default. |

Output fields:

- `converted_time`: Converted Time
- `time_zone`: Time Zone

### `convert_csv_to_json`

**Convert CSV to JSON.** Parse CSV text into a list of JSON objects, one per row, keyed by the header row unless the first row is data. Pass the CSV content itself, not a file or URL. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `csv` | string | yes |  | CSV. The CSV content to convert, including the header row. |
| `delimiter` | string | yes | `"auto"` | Delimiter. The character that separates columns. One of `"auto"`, `","`, `";"`, `"\t"`, `"\|"`. |
| `noHeader` | boolean | no | `false` | First Row Is Data. Turn on when the CSV has no header row; columns become field1, field2. |
| `trim` | boolean | no | `true` | Trim Spaces. Remove spaces around each value. |
| `ignoreEmpty` | boolean | no | `false` | Skip Empty Values. Leave empty cells out of each row instead of returning empty text. |

### `convert_currency`

**Convert Currency.** Convert an amount between two currencies given as ISO 4217 codes (USD, EUR, GBP) using the most recent exchange rate 0CodeKit has, and return the date of that rate. Read-only and safe to retry, though the rate can change between calls. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount. The amount to convert. |
| `sourceCurrency` | string | yes |  | From Currency. The three-letter currency code of the amount, for example `USD`. |
| `targetCurrency` | string | yes |  | To Currency. The three-letter currency code to convert to, for example `EUR`. |
| `dateFormat` | string | no |  | Rate Date Format. How the rate date is written, using `DD`, `MM` and `YYYY` tokens. |

Output fields:

- `converted_amount`: Converted Amount (number)
- `converted_currency`: Converted Currency
- `original_amount`: Original Amount (number)
- `original_currency`: Original Currency
- `rate_date`: Rate Date

### `convert_ip_to_geo`

**Convert IP to Geo.** Geolocate a public IPv4 or IPv6 address and return its country, region, city, postal code, latitude/longitude, time zone and internet provider. Private or local addresses cannot be located. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ip` | string | yes |  | IP Address. The public IP address to look up. |

Output fields:

- `ip`: IP Address
- `country`: Country
- `country_code`: Country Code
- `region_code`: Region Code
- `region_name`: Region Name
- `city`: City
- `zip`: Postal Code
- `latitude`: Latitude (number)
- `longitude`: Longitude (number)
- `time_zone`: Time Zone
- `isp`: Internet Provider
- `organization`: Organization
- `autonomous_system`: Autonomous System

### `convert_iso_to_nation`

**Convert ISO to Nation.** Return the English country name for an ISO country code such as DE. Use "Convert Nation to ISO" for the reverse direction. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `iso` | string | yes |  | ISO Country Code. The ISO country code, for example `DE`. |

Output fields:

- `iso_code`: ISO Country Code
- `nation`: Country Name

### `convert_nation_to_iso`

**Convert Nation to ISO.** Return the ISO country code for a country name written in English, such as Germany. Use "Convert ISO to Nation" for the reverse direction. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `nation` | string | yes |  | Country Name. The country name in English, for example `Germany`. |

Output fields:

- `iso_code`: ISO Country Code
- `nation`: Country Name

### `calculate_bmi`

**Calculate BMI.** Calculate BMI and its classification from weight in kilograms and height in centimetres, plus desirable body weight, daily calories and daily carbohydrate, protein and fat in grams. Convert pounds or inches first. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `weight` | number | yes |  | Weight (kg). Body weight in kilograms. |
| `height` | number | yes |  | Height (cm). Body height in centimetres. |

Output fields:

- `bmi`: BMI (number)
- `classification`: Classification
- `desirable_body_weight_kg`: Desirable Body Weight (kg) (number)
- `daily_calories_kcal`: Daily Calories (kcal) (number)
- `daily_carbohydrates_g`: Daily Carbohydrates (g) (number)
- `daily_protein_g`: Daily Protein (g) (number)
- `daily_fat_g`: Daily Fat (g) (number)

### `calculate_geo_distance`

**Calculate Geo Distance.** Return the route distance in kilometres and the estimated travel time between two addresses or places for a travel mode (driving, walking, bicycling, transit). This is a route distance, not a straight line. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `startPoint` | string | yes |  | Start Address. Where the trip starts. An address, city or place name. |
| `endPoint` | string | yes |  | End Address. Where the trip ends. An address, city or place name. |
| `mode` | string | yes | `"driving"` | Travel Mode. How the trip is made. This changes the route and the travel time. One of `"driving"`, `"walking"`, `"bicycling"`, `"transit"`. |

Output fields:

- `distance_km`: Distance (km) (number)
- `duration_hours`: Duration Hours (number)
- `duration_minutes`: Duration Minutes (number)

### `validate_bic`

**Validate a bic.** Check whether a BIC / SWIFT bank identifier code (8 or 11 characters) is valid. Returns only a true/false result. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bic` | string | yes |  | BIC. The BIC or SWIFT code to check. |

Output fields:

- `valid`: Valid (boolean)

### `validate_email`

**Validates an email and correct it.** Check whether an email address is valid and return a corrected address when a typo can be fixed (for example gmial.com to gmail.com). Does not send any email. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address to check. |

Output fields:

- `valid`: Valid (boolean)
- `corrected_email`: Corrected Email (email)

### `validate_iban`

**Validate an IBAN.** Check whether an IBAN (International Bank Account Number) is valid. Returns only a true/false result. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `iban` | string | yes |  | IBAN. The IBAN to check. |

Output fields:

- `valid`: Valid (boolean)

### `validate_vat_with_country_code`

**Validate vat with Countrycode and plain ID.** Validate an EU VAT number against the VIES service when the country code and the number part are separate values, and return the registered company name and address when available. Use "Checks validity of a VAT ID" when you have the full ID with its country prefix. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `countryCode` | string | yes |  | Country. The EU member state that issued the VAT ID. One of `"AT"`, `"BE"`, `"BG"`, `"HR"`, `"CY"`, `"CZ"`, `"DK"`, `"EE"`, `"FI"`, `"FR"`, `"DE"`, `"EL"`, `"HU"`, `"IE"`, `"IT"`, `"LV"`, `"LT"`, `"LU"`, `"MT"`, `"NL"`, `"PL"`, `"PT"`, `"RO"`, `"SK"`, `"SI"` and 3 more. |
| `id` | string | yes |  | VAT Number. The VAT number without the country prefix, for example `07643520567`. |

Output fields:

- `valid`: Valid (boolean)
- `country_code`: Country Code
- `vat_number`: VAT Number
- `company_name`: Company Name
- `company_address`: Company Address
- `request_date`: Request Date (date)

### `validate_vat_id`

**Checks validity of a VAT ID.** Validate a full EU VAT ID that starts with its two-letter country prefix (for example DE123456789) against the VIES service, and return the registered company name and address when available. Use "Validate vat with Countrycode and plain ID" when the country and number are separate. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vatId` | string | yes |  | VAT ID. The full VAT ID, starting with the two-letter country code. |

Output fields:

- `valid`: Valid (boolean)
- `country_code`: Country Code
- `vat_number`: VAT Number
- `company_name`: Company Name
- `company_address`: Company Address
- `request_date`: Request Date (date)

### `lookup_vat_rates`

**Lookup VAT Rates.** Return the standard, reduced, super-reduced and parking VAT rates (in percent) of an EU member state. Rates a country does not have are returned as null. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `countryCode` | string | yes |  | Country. The EU member state to look up. One of `"AT"`, `"BE"`, `"BG"`, `"HR"`, `"CY"`, `"CZ"`, `"DK"`, `"EE"`, `"FI"`, `"FR"`, `"DE"`, `"GR"`, `"HU"`, `"IE"`, `"IT"`, `"LV"`, `"LT"`, `"LU"`, `"MT"`, `"NL"`, `"PL"`, `"PT"`, `"RO"`, `"SK"`, `"SI"` and 2 more. |

Output fields:

- `country`: Country
- `vat_name`: VAT Name
- `vat_abbreviation`: VAT Abbreviation
- `standard_rate`: Standard Rate (%) (number)
- `reduced_rate`: Reduced Rate (%) (number)
- `reduced_rate_alternative`: Alternative Reduced Rate (%) (number)
- `super_reduced_rate`: Super Reduced Rate (%) (number)
- `parking_rate`: Parking Rate (%) (number)

### `verify_domain`

**Verify a Domain.** Check whether a domain or website URL is valid by requesting it, and return the main domain without subdomains. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. The domain or website to check, for example `https://www.example.com`. |

Output fields:

- `is_valid`: Is Valid (boolean)
- `main_domain`: Main Domain

### `detect_gender`

**Detect Gender.** Guess the gender (male, female or unisex) most associated with a first name. Accepts a first name or a full name; when both are given the first name wins. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | no |  | First Name. The first name to check. Fill this or Full Name. |
| `fullName` | string | no |  | Full Name. Used when First Name is empty; its first word is the first name. |

Output fields:

- `gender`: Gender
- `first_name`: First Name
- `last_name`: Last Name

### `split_name`

**Split Name.** Split a full name into first name(s) and last name. Turn on Last Name First for names written family name first, such as many Chinese names. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Full Name. The full name to split. |
| `reversed` | boolean | no | `false` | Last Name First. Turn on when the name is written with the last name first. |

Output fields:

- `first_name`: First Name
- `last_name`: Last Name

### `text_contains`

**Text Contains.** Search a text for one or more keywords and report, per keyword, whether it was found and at which character positions, plus whether any or all keywords matched. Optionally case-sensitive or whole-word only. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to search in. |
| `keywords` | array | yes |  | Keywords. The words or phrases to look for. |
| `caseSensitive` | boolean | no | `false` | Case Sensitive. Turn on to treat "Apple" and "apple" as different words. |
| `onlyCompleteWords` | boolean | no | `false` | Whole Words Only. Turn on so that "cat" does not match inside "category". |

Output fields:

- `contains_any`: Contains Any Keyword (boolean)
- `contains_all`: Contains All Keywords (boolean)
- `findings`: Findings
- `findings[].keyword`: Keyword
- `findings[].contains`: Contains (boolean)
- `findings[].match_count`: Match Count (number)
- `findings[].found_positions`: Found Positions

### `get_random_city`

**Get a Random City.** Generate a random fictional city name with a country, for mock or test data. Each call returns a different value and has no side effects. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `city`: City
- `country`: Country

### `get_random_name`

**Get Random Name.** Generate a random first, middle and last name for mock or test data. Use "Get Random Name with Gender" to force a male or female name. Each call returns a different value and has no side effects. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `first_name`: First Name
- `middle_name`: Middle Name
- `last_name`: Last Name
- `full_name`: Full Name
- `full_name_with_middle_name`: Full Name with Middle Name

### `get_random_name_with_gender`

**Get Random Name with Gender.** Generate a random first, middle and last name of the chosen gender for mock or test data. Use "Get Random Name" when gender does not matter. Each call returns a different value and has no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `gender` | string | yes | `"female"` | Gender. The gender of the generated name. One of `"female"`, `"male"`. |

Output fields:

- `first_name`: First Name
- `middle_name`: Middle Name
- `last_name`: Last Name
- `full_name`: Full Name
- `full_name_with_middle_name`: Full Name with Middle Name

### `get_a_number`

**Get a Number.** Generate a random whole or decimal number between a minimum and a maximum, with a chosen number of decimal places for decimals. Each call returns a different value and has no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `min` | number | yes | `1` | Minimum. The smallest number that can be returned. |
| `max` | number | yes | `100` | Maximum. The largest number that can be returned. |
| `type` | string | yes | `"integer"` | Number Type. Whether to return a whole number or a decimal number. One of `"integer"`, `"decimal"`. |
| `round` | number | no | `2` | Decimal Places. Digits after the decimal point. Only used for decimal numbers. |

Output fields:

- `number`: Number (number)

### `get_pdf_page_count`

**Gets PDF page count.** Return the number of pages in a PDF. Pass the PDF as a file from an earlier step or as a public URL to the file. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pdf` | file | yes |  | PDF. The PDF file to count, from an earlier step or a public URL. Files are not supported; an action that needs one fails. |

Output fields:

- `page_count`: Page Count (number)

### `create_pdf_from_html`

**Creates a PDF from HTML.** Render an HTML document (inline CSS and absolute image URLs supported) into a PDF and return it as a file. Pass the HTML source itself, not a web address; use "Creates a PDF file from URL" for live pages. Creates a new file on every call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `html` | string | yes |  | HTML. The HTML to render. Use inline styles and absolute image URLs. |
| `fileName` | string | no |  | File Name. Name of the PDF file to create. Defaults to `document.pdf`. |
| `format` | string | no | `"A4"` | Page Size. The paper size of the PDF pages. One of `"A0"`, `"A1"`, `"A2"`, `"A3"`, `"A4"`, `"A5"`, `"A6"`, `"Letter"`, `"Legal"`, `"Tabloid"`, `"Ledger"`. |
| `landscape` | boolean | no | `false` | Landscape. Lay the pages out horizontally instead of vertically. |
| `printBackground` | boolean | no | `true` | Print Background. Include background colors and images from the page. |
| `margin` | string | no |  | Margin. Space around the content on every side, with a unit such as `1cm`, `10mm`, `0.5in` or `20px`. Leave empty for no margin. |
| `scale` | number | no |  | Scale. Zoom level of the rendered page, between 0.1 and 2. Leave empty for 1 (actual size). |
| `pageRanges` | string | no |  | Page Ranges. Only keep these pages, for example `1-3,5`. Leave empty to keep all pages. |
| `displayHeaderFooter` | boolean | no | `false` | Show Header and Footer. Print the default browser header and footer (date, title, page numbers) on every page. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `size_bytes`: File Size (filesize)

### `create_pdf_from_url`

**Creates a PDF file from URL.** Open a public web page in a browser and print it to a PDF file. Pass the full page address including https://. Pages behind a login cannot be captured. Creates a new file on every call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Web Page URL. The full address of a public web page, including `https://`. |
| `fileName` | string | no |  | File Name. Name of the PDF file to create. Defaults to `webpage.pdf`. |
| `format` | string | no | `"A4"` | Page Size. The paper size of the PDF pages. One of `"A0"`, `"A1"`, `"A2"`, `"A3"`, `"A4"`, `"A5"`, `"A6"`, `"Letter"`, `"Legal"`, `"Tabloid"`, `"Ledger"`. |
| `landscape` | boolean | no | `false` | Landscape. Lay the pages out horizontally instead of vertically. |
| `printBackground` | boolean | no | `true` | Print Background. Include background colors and images from the page. |
| `margin` | string | no |  | Margin. Space around the content on every side, with a unit such as `1cm`, `10mm`, `0.5in` or `20px`. Leave empty for no margin. |
| `scale` | number | no |  | Scale. Zoom level of the rendered page, between 0.1 and 2. Leave empty for 1 (actual size). |
| `pageRanges` | string | no |  | Page Ranges. Only keep these pages, for example `1-3,5`. Leave empty to keep all pages. |
| `displayHeaderFooter` | boolean | no | `false` | Show Header and Footer. Print the default browser header and footer (date, title, page numbers) on every page. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `size_bytes`: File Size (filesize)

### `merge_pdfs`

**Merges multiple PDFs.** Combine two or more PDFs into a single PDF file, in list order. Each entry takes a PDF file or public URL and optional page ranges such as "1-3,5" (^1 means the last page). Creates a new file on every call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pdfs` | array | yes |  | PDFs. The PDFs to combine, in the order they should appear. Each item: { `file`, `pages`? }. |
| `fileName` | string | no |  | File Name. Name of the merged PDF file. Defaults to `merged.pdf`. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `size_bytes`: File Size (filesize)
- `merged_count`: PDFs Merged (number)

### `split_pdf`

**Splits a PDF.** Split one PDF into several PDF files, either every N pages or by explicit page ranges (one range per output file, such as "1-3" or "4,6"; ^1 means the last page). Returns a list of files, one per part. Creates new files on every call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pdf` | file | yes |  | PDF. The PDF file to split, from an earlier step or a public URL. Files are not supported; an action that needs one fails. |
| `mode` | string | yes | `"interval"` | Split By. How to divide the PDF. One of `"interval"`, `"pages"`. |
| `interval` | number | no | `1` | Pages per File. Used with **Every N pages**. For example `1` gives one file per page. |
| `pageRanges` | array | no |  | Page Ranges. One entry per output file (Page ranges mode). `^1` is the last page. |
| `fileName` | string | no |  | File Name. Name prefix for the new files. Parts are named `<prefix>-1.pdf`, `<prefix>-2.pdf`, and so on. Defaults to `part`. |

Output fields:

- `[].file`: File (url)
- `[].file_name`: File Name
- `[].size_bytes`: File Size (filesize)

### `generate_qr_code`

**Generate a QRCode.** Generate a styled QR code PNG image that encodes the given text or URL. Optional settings control size, margin, colors, dot and corner styles, error correction and a logo placed in the middle. Returns a file reference to the PNG that later steps can attach or upload. Creates nothing in any external account and is safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `data` | string | yes |  | Content. The text or link to encode in the QR code. |
| `fileName` | string | no | `"qr-code.png"` | File Name. The name of the generated image file. ".png" is added when missing. |
| `width` | number | no |  | Width (px). The width of the image in pixels. Default is 500. |
| `height` | number | no |  | Height (px). The height of the image in pixels. Default is 500. |
| `margin` | number | no |  | Margin (px). Empty space around the QR code, in pixels. Default is 15. |
| `errorCorrectionLevel` | string | no |  | Error Correction Level. How much of the code can be covered and still read. Default is Q. One of `"L"`, `"M"`, `"Q"`, `"H"`. |
| `dotsType` | string | no |  | Dot Style. The shape of the dots that make up the code. Default is square. One of `"square"`, `"dots"`, `"rounded"`, `"extra-rounded"`, `"classy"`, `"classy-rounded"`. |
| `dotsColor` | string | no |  | Dot Color. The color of the dots as a hex code. Default is black. |
| `cornersSquareType` | string | no |  | Corner Square Style. The shape of the three large corner squares. Default is square. One of `"square"`, `"extra-rounded"`, `"dot"`. |
| `cornersSquareColor` | string | no |  | Corner Square Color. The color of the corner squares as a hex code. Default is black. |
| `cornersDotType` | string | no |  | Corner Dot Style. The shape of the dot inside each corner square. Default is square. One of `"square"`, `"dot"`. |
| `cornersDotColor` | string | no |  | Corner Dot Color. The color of the corner dots as a hex code. Default is black. |
| `image` | string | no |  | Logo URL. A public image link shown in the middle; use a high error correction. |
| `hideBackgroundDots` | boolean | no | `true` | Hide Dots Behind Logo. Remove dots behind the logo (default on); needs a Logo URL. |
| `imageMargin` | number | no |  | Logo Margin (px). Space around the logo in pixels (default 0); needs a Logo URL. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `size_bytes`: File Size (filesize)
- `image_url`: Hosted Image URL (image)

### `decode_qr_code`

**Decode a QRCode.** Decode a QR code image and return the text it contains (often a URL). Provide the image either as a file from an earlier step or as a public image URL; if both are given the file is used. Supported formats: JPG, PNG, BMP, TIFF, GIF. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | no |  | Image File. The QR code image (JPG, PNG, BMP, TIFF or GIF). Use this or Image URL. Files are not supported; an action that needs one fails. |
| `url` | string | no |  | Image URL. A public link to the QR code image. Used only when no Image File is provided. |

Output fields:

- `data`: Decoded Data

### `image_exif`

**Image Exif.** Extract the EXIF metadata embedded in an image (camera make and model, capture date, exposure, GPS coordinates, and so on). Provide the image as a file from an earlier step or as a public image URL; if both are given the file is used. Returns the EXIF tags as an object, empty when the image has none. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | no |  | Image File. The image to inspect, usually a JPG photo. Use this or Image URL. Files are not supported; an action that needs one fails. |
| `url` | string | no |  | Image URL. A public link to the image. Used only when no Image File is provided. |

Output fields:

- `exif_data`: EXIF Data

### `add_temporary_file`

**Add a Temporary File and Recieve a URL.** Upload a file to 0CodeKit temporary storage and return a public download URL. Anyone with the URL can download the file, and it is deleted automatically after 24 hours. Each call uploads a new copy and returns a new URL, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload. Files are not supported; an action that needs one fails. |
| `fileName` | string | no |  | File Name. The uploaded file name, with extension. Empty keeps the original. |

Output fields:

- `url`: Temporary File URL (url)
- `file_name`: File Name

### `add_a_global_variable`

**Add a Global Variable.** Create a global variable stored in the connected 0CodeKit account and return its name and value. If no name is given, 0CodeKit generates one; use the returned variable_name to read or delete it later. Values are stored as text. Creates a new record on each call, so do not retry blindly. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `variableName` | string | no |  | Variable Name. The name to store the value under. Empty: 0CodeKit picks one. |
| `variableValue` | string | yes |  | Variable Value. The value to store. It is saved as text. |

Output fields:

- `variable_name`: Variable Name
- `variable_value`: Variable Value

### `get_a_global_variable`

**Get a Global Variable.** Return the name and current text value of one global variable, identified by its name, from the connected 0CodeKit account. Only variables created with this account are visible. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `variableName` | string | yes |  | Variable Name. The global variable to read. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `variable_name`: Variable Name
- `variable_value`: Variable Value

### `delete_a_global_variable`

**Delete a Global Variable.** Permanently delete a global variable, identified by its name, from the connected 0CodeKit account. The value cannot be recovered. Only variables created with this account can be deleted. Fails if the variable no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `variableName` | string | yes |  | Variable Name. The global variable to delete. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `deleted`: Deleted (boolean)
- `variable_name`: Variable Name
- `message`: Message

### `list_global_variables`

**List Global Variables.** List all global variables in the connected 0CodeKit account, each with its name and text value, plus the total count. Takes no input. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: Variable Count (number)
- `variables`: Variables
- `variables[].variable_name`: Variable Name
- `variables[].variable_value`: Variable Value

### `add_a_perm_file`

**Add a Perm File.** Upload a file to permanent storage in the connected 0CodeKit account, either from a file or from a public URL, and return its file_id and a permanent download url. Provide exactly one of File or File URL. Each call stores a new copy and uses storage quota, so do not retry blindly. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | no |  | File. The file to upload. Leave empty if you use File URL instead. Files are not supported; an action that needs one fails. |
| `fileUrl` | string | no |  | File URL. A public link to the file to upload. Used only when File is empty. |
| `uploadName` | string | no |  | File Name. The download name, with extension. Empty keeps the original name. |

Output fields:

- `file_id`: File ID
- `url`: File URL (url)
- `file_name`: File Name

### `get_a_perm_file`

**Get a Perm File.** Fetch a file, identified by its file_id, from permanent storage in the connected 0CodeKit account. Returns its download url and, unless Link Only is on, also downloads the file and returns a file reference usable by later steps. Read-only and safe to retry. The vendor marks this endpoint as deprecated in favour of the url returned when the file was added. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File. The perm file to get. A value the product loads from the provider, such as an id; write the value itself. |
| `linkOnly` | boolean | no | `false` | Link Only. Turn on to return only the download link without downloading the file. |

Output fields:

- `file_id`: File ID
- `url`: File URL (url)
- `file`: File (url)
- `file_name`: File Name
- `size_bytes`: File Size (filesize)

### `delete_a_perm_file`

**Delete a Perm File.** Permanently delete a file, identified by its file_id, from permanent storage in the connected 0CodeKit account. Its download link stops working and the file cannot be recovered. Fails if the file no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File. The perm file to delete. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `deleted`: Deleted (boolean)
- `file_id`: File ID
- `message`: Message

### `list_perm_files`

**List Perm Files.** List all files in permanent storage for the connected 0CodeKit account, each with file_id, file_name, download url and size in KiB, plus the remaining storage in KiB and the total count. Takes no input. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: File Count (number)
- `available_storage_kib`: Available Storage (KiB) (number)
- `files`: Files
- `files[].file_id`: File ID
- `files[].file_name`: File Name
- `files[].url`: File URL (url)
- `files[].size_kib`: Size (KiB) (number)

### `entity_detection`

**Entity Detection.** Run named-entity recognition on a text and return every entity found (for example a person, location, organization, date, quantity, email or URL) with its category, optional sub-category, character offset, length and a confidence score between 0 and 1. Nothing is stored; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to scan for entities. |

Output fields:

- `entity_count`: Entity Count (number)
- `entities`: Entities
- `entities[].text`: Text
- `entities[].category`: Category
- `entities[].sub_category`: Sub-Category
- `entities[].offset`: Offset (number)
- `entities[].length`: Length (number)
- `entities[].confidence_score`: Confidence Score (number)

### `language_detection`

**Language Detection.** Detect the main language of a text and return its English name, its two-letter ISO 639-1 code (for example `en`, `de`) and a confidence score between 0 and 1. Nothing is stored; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text whose language you want to detect. |

Output fields:

- `language_name`: Language Name
- `language_code`: Language Code
- `confidence_score`: Confidence Score (number)

### `mood_detection`

**Mood Detection.** Run sentiment analysis on a text. Returns the overall mood (typically `positive`, `neutral`, `negative` or `mixed`), a score between 0 and 1 for each of positive, neutral and negative, and the mood of every sentence. Nothing is stored; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to analyze, such as a review, email or message. |

Output fields:

- `mood`: Overall Mood
- `positive_score`: Positive Score (number)
- `neutral_score`: Neutral Score (number)
- `negative_score`: Negative Score (number)
- `sentences`: Sentences
- `sentences[].text`: Text
- `sentences[].mood`: Mood

### `picture_object_recognition`

**Picture Object Recognition.** Look at an image reachable by a public URL and return a list of short labels describing the objects, scenes and concepts it shows (for example `dog`, `beach`, `sunset`). The image must be a publicly accessible link; files from earlier steps are not accepted by this endpoint. Nothing is stored; safe to retry, though labels can vary slightly between calls. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `imageUrl` | string | yes |  | Image URL. A public link to the image to analyze (JPG, PNG, GIF or WEBP). |

Output fields:

- `label_count`: Label Count (number)
- `labels`: Labels

### `picture_text_recognition`

**Picture Text Recognition.** Run optical character recognition on an image reachable by a public URL and return every line of text found, both as a list and joined into one text with line breaks. The image must be a publicly accessible link; files from earlier steps are not accepted by this endpoint. Nothing is stored; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `imageUrl` | string | yes |  | Image URL. A public link to the image to read text from (JPG, PNG, BMP, TIFF or GIF). |

Output fields:

- `text`: Text
- `line_count`: Line Count (number)
- `lines`: Lines

### `translate_text`

**Translate Text.** Translate a text into the chosen target language, given as a two-letter ISO 639-1 code (for example `es` for Spanish, `de` for German). The source language is detected automatically. Returns only the translated text. Nothing is stored; safe to retry, though wording can vary slightly between calls. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to translate. Any source language is detected automatically. |
| `resultLang` | string | yes |  | Target Language. The language to translate the text into. One of `"ar"`, `"bg"`, `"zh"`, `"hr"`, `"cs"`, `"da"`, `"nl"`, `"en"`, `"et"`, `"fi"`, `"fr"`, `"de"`, `"el"`, `"he"`, `"hi"`, `"hu"`, `"id"`, `"it"`, `"ja"`, `"ko"`, `"lv"`, `"lt"`, `"no"`, `"fa"`, `"pl"` and 13 more. |

Output fields:

- `translation`: Translation
- `target_language`: Target Language

### `run_javascript_code`

**Run Javascript Code.** Execute JavaScript on the 0CodeKit Bun sandbox. Returns `{ result }`, where `result` is the value produced by a top-level `return` or the global `result` variable (null when nothing is returned). npm packages load through `require` and install automatically. Use for computations or libraries you cannot do directly; each call costs 50 credits, runs for at most 180 seconds, and repeats any side effects the code has. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `code` | string | yes |  | Code. The JavaScript to run. Return the value you want to use later. |
| `inputs` | JSON | no |  | Inputs. Data to pass into your code. It is available in the code as the `inputs` variable. Map values from earlier steps here instead of pasting them into the code. |
| `dependencies` | array | no |  | System Packages. Alpine Linux (apk) packages your code needs, such as `ffmpeg`. Leave empty if you only use language libraries. |

Output fields:

- `result`: Result

### `run_python_code`

**Run Python Code.** Execute Python (CPython) on the 0CodeKit sandbox. Returns `{ result }`, where `result` is the value assigned to the global `result` variable (null when nothing is assigned). List PyPI packages in Libraries so they are installed before the run. Use for computations or libraries you cannot do directly; each call costs 50 credits, runs for at most 180 seconds, and repeats any side effects the code has. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `code` | string | yes |  | Code. The Python to run. Assign the value you want back to `result`. |
| `inputs` | JSON | no |  | Inputs. Data to pass into your code. It is available in the code as the `inputs` variable. Map values from earlier steps here instead of pasting them into the code. |
| `requirements` | array | no |  | Libraries. Every PyPI package your code imports; auto-detection is unreliable. |
| `dependencies` | array | no |  | System Packages. Alpine Linux (apk) packages your code needs, such as `ffmpeg`. Leave empty if you only use language libraries. |

Output fields:

- `result`: Result

### `crypto_decrypt`

**Crypto Decrypt.** Decrypt ciphertext produced by Crypto Encrypt (or any CryptoJS-compatible passphrase cipher) back to plain text. The algorithm and secret key must match the ones used to encrypt; a wrong key yields empty or garbled text. Pure transform with no side effects, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cryptoType` | string | yes | `"AES"` | Algorithm. The cipher to use. Decrypt with the same algorithm and secret key that encrypted the text. One of `"AES"`, `"DES"`, `"TripleDES"`, `"Rabbit"`, `"RC4"`, `"RC4Drop"`. |
| `ciphertext` | string | yes |  | Encrypted Text. The encrypted text to decrypt, such as the Crypto Encrypt output. |
| `secretKey` | string | yes |  | Secret Key. The key (passphrase) that was used to encrypt the text. |

Output fields:

- `decrypted_text`: Decrypted Text

### `crypto_encrypt`

**Crypto Encrypt.** Encrypt plaintext with a symmetric cipher (AES by default) and a secret key, returning the ciphertext as text. Pair with Crypto Decrypt using the same algorithm and key; for one-way fingerprints use Crypto Hash instead. Pure transform with no side effects, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cryptoType` | string | yes | `"AES"` | Algorithm. The cipher to use. Decrypt with the same algorithm and secret key that encrypted the text. One of `"AES"`, `"DES"`, `"TripleDES"`, `"Rabbit"`, `"RC4"`, `"RC4Drop"`. |
| `message` | string | yes |  | Text. The plain text to encrypt. |
| `secretKey` | string | yes |  | Secret Key. The key (passphrase) used to encrypt. Keep it safe: you need the same key to decrypt. |

Output fields:

- `encrypted_text`: Encrypted Text

### `crypto_hash`

**Crypto Hash.** Compute a one-way hash (MD5, SHA-1/2/3, RIPEMD-160) of a text, or an HMAC signature when an HMAC algorithm and secret key are given, for example to verify webhook signatures. Use Crypto Encrypt instead when the text must be recoverable. Pure transform, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `hashType` | string | yes | `"SHA256"` | Algorithm. The hash algorithm. HMAC algorithms also need a secret key. One of `"MD5"`, `"SHA1"`, `"SHA224"`, `"SHA256"`, `"SHA3"`, `"SHA384"`, `"SHA512"`, `"RIPEMD160"`, `"HmacMD5"`, `"HmacSHA1"`, `"HmacSHA224"`, `"HmacSHA256"`, `"HmacSHA3"`, `"HmacSHA384"`, `"HmacSHA512"`, `"HmacRIPEMD160"`. |
| `message` | string | yes |  | Text. The text to hash. |
| `secretKey` | string | no |  | Secret Key. The key used to sign the text. Required for HMAC algorithms, ignored otherwise. |

Output fields:

- `hashed_text`: Hash
- `algorithm`: Algorithm

### `create_a_scheduler`

**Create a Scheduler.** Create a 0CodeKit scheduler task that POSTs the given JSON data to a webhook URL on a schedule: once, at a list of dates, by cron expression, or every n periods. Returns the task_id needed to delete it later. Each call creates a new task, so retries create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sendToWebhook` | string | yes |  | Webhook URL. The URL 0CodeKit calls on every run, such as a Catch Webhook URL. |
| `data` | JSON | no | `{}` | Data. The JSON data sent to the webhook on every run. |
| `intervalType` | string | yes | `"1"` | Schedule Type. How often the webhook is called. It sets the Schedule format. One of `"1"`, `"2"`, `"3"`, `"4"`. |
| `schedule` | string | yes |  | Schedule. When to run, in the format shown above for the Schedule Type. |
| `endDate` | ISO date-time string | no |  | End Date. The last date the scheduler runs. Leave empty to keep it running. |

Output fields:

- `task_id`: Scheduler ID
- `next_execution`: Next Run (datetime)
- `end_date`: End Date (datetime)

### `delete_a_scheduler`

**Delete a Scheduler.** Delete a scheduler task, identified by its task_id from Create a Scheduler or List Schedulers, so its webhook is no longer called. Cannot be undone. Fails if the task no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Scheduler. The scheduler to delete. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `deleted`: Deleted (boolean)
- `task_id`: Scheduler ID
- `message`: Message

### `list_schedulers`

**List Schedulers.** List all active scheduler tasks in the connected 0CodeKit account, each with its task_id, webhook URL, next run time and data, plus the total count. Takes no input. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: Count (number)
- `schedulers`: Schedulers
- `schedulers[].task_id`: Scheduler ID
- `schedulers[].webhook`: Webhook (url)
- `schedulers[].next_execution`: Next Run (datetime)
- `schedulers[].data`: Data

### `advanced_switch_with_url`

**Advanced Switch with URL.** Load a JSON object of key-value pairs from a public URL and return the values stored under the given keys, like a lookup table or switch statement. Values are returned in the same order as the keys. Does not change anything; safe to retry, though results change if the hosted file changes. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jsonUrl` | string | yes |  | JSON URL. A public link to a JSON file of key-value pairs. |
| `keys` | array | yes |  | Keys. The keys to look up in the JSON file. |

Output fields:

- `found`: Found (boolean)
- `count`: Count (number)
- `first_value`: First Value
- `values`: Values

### `create_custom_shortened_url`

**Create Custom Shortened Url.** Create a new shortened URL on lyl.ai with a chosen identifier (the part after lyl.ai/) that redirects to the given destination URL. The identifier must be globally unique across all 0CodeKit users, so the call fails if it is already taken. Returns the identifier, the full short URL and the destination. Not safe to retry blindly. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `destination` | string | yes |  | Destination URL. The full URL the short link should redirect to, including `https://`. |
| `custom` | string | yes |  | Custom Ending. The text after `lyl.ai/`. It must not already be taken. |

Output fields:

- `identifier`: Identifier
- `short_url`: Short URL (url)
- `destination`: Destination (url)

### `create_shortened_url`

**Create Shortened Url.** Create a new shortened URL on lyl.ai that redirects to the given destination URL, with a random 8-letter identifier. Returns the identifier, the full short URL and the destination. Use the identifier to get, update or delete the link later. Creates a new link on each call, so do not retry blindly. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `destination` | string | yes |  | Destination URL. The full URL the short link should redirect to, including `https://`. |

Output fields:

- `identifier`: Identifier
- `short_url`: Short URL (url)
- `destination`: Destination (url)

### `delete_shortened_url`

**Delete Shortened Url.** Permanently delete a shortened URL, identified by its identifier, from the connected 0CodeKit account. The short link stops redirecting and cannot be recovered. Only links created with this account can be deleted. Fails if the link no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Shortened URL. The short link to delete. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `deleted`: Deleted (boolean)
- `identifier`: Identifier
- `short_url`: Short URL (url)
- `message`: Message

### `get_a_shortened_url`

**Get a Shortened Url.** Return the destination URL of one shortened URL, identified by its identifier, from the connected 0CodeKit account, together with the full short URL. Only links created with this account are visible. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Shortened URL. The short link to look up. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `identifier`: Identifier
- `short_url`: Short URL (url)
- `destination`: Destination (url)

### `list_shortened_urls`

**List Shortened Urls.** List all shortened URLs in the connected 0CodeKit account, each with its identifier, full short URL, destination URL and creation date, plus the total count. Takes no input. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: Count (number)
- `shortened_urls`: Shortened URLs
- `shortened_urls[].identifier`: Identifier
- `shortened_urls[].short_url`: Short URL (url)
- `shortened_urls[].destination`: Destination (url)
- `shortened_urls[].created_at`: Created At (datetime)

### `update_shortened_url`

**Update Shortened Url.** Point an existing shortened URL, identified by its identifier, at a new destination URL. The short link itself does not change. Only links created with this account can be updated. Setting the same destination again has the same result, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Shortened URL. The short link to change. A value the product loads from the provider, such as an id; write the value itself. |
| `destination` | string | yes |  | New Destination URL. The full URL the short link redirects to from now on. |

Output fields:

- `identifier`: Identifier
- `short_url`: Short URL (url)
- `destination`: Destination (url)

### `url_expander`

**URL Expander.** Follow a shortened URL from any URL shortener (bit.ly, lyl.ai, t.co and similar) and return the full URL it redirects to. Does not change anything. Safe to retry, though the result can change if the short link is re-pointed. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Short URL. The shortened URL to expand, for example `https://bit.ly/abc123`. |

Output fields:

- `short_url`: Short URL (url)
- `expanded_url`: Expanded URL (url)

### `utm_build`

**UTM Build.** Build a campaign tracking link by adding UTM parameters (utm_source, utm_medium, utm_campaign, utm_content, utm_term) to a base URL, and return the resulting URL. Empty parameters are left out. Pure transformation with no side effects; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The page the link should open. |
| `utmSource` | string | yes |  | Source (utm_source). Where the traffic comes from, for example `newsletter` or `google`. |
| `utmMedium` | string | no |  | Medium (utm_medium). The marketing channel, for example `email` or `cpc`. |
| `utmCampaign` | string | no |  | Campaign (utm_campaign). The campaign name, for example `spring_sale`. |
| `utmContent` | string | no |  | Content (utm_content). Tells apart links in the same campaign, for example `header_button`. |
| `utmTerm` | string | no |  | Term (utm_term). The paid search keyword, if any. |

Output fields:

- `url`: URL (url)

### `utm_parse`

**UTM Parse.** Extract the UTM parameters (utm_source, utm_medium, utm_campaign, utm_content, utm_term) from a URL. Parameters missing from the URL come back as null. Pure transformation with no side effects; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The link with UTM parameters to read. |

Output fields:

- `utm_source`: UTM Source
- `utm_medium`: UTM Medium
- `utm_campaign`: UTM Campaign
- `utm_content`: UTM Content
- `utm_term`: UTM Term

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
