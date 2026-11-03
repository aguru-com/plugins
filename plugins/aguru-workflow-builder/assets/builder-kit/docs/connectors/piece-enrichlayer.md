# Enrich Layer

Professional network data enrichment API — company profiles, person data, work emails, and more.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-enrichlayer'
  version: '0.1.2'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key from [Dashboard Settings](https://enrichlayer.com/dashboard/api-key/).

## Actions

### `get_company_profile`

**Get Company Profile.** Retrieve a full structured company profile from a known professional-network company URL; read-only and safe to retry. Use this when you already have the company's profile URL. If you only have a name or domain, call Look Up Company first to resolve the URL. Optional add-ons (funding, acquisitions, categories, extra Crunchbase data) cost extra credits. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Company URL. Professional network company URL to enrich (e.g., https://www.linkedin.com/company/google/) |
| `categories` | string | no |  | Include Categories. Append category data for this company (+1 credit) One of `"exclude"`, `"include"`. |
| `funding_data` | string | no |  | Include Funding Data. Return a list of funding rounds (+1 credit) One of `"exclude"`, `"include"`. |
| `exit_data` | string | no |  | Include Exit Data. Return investment portfolio exits (+1 credit) One of `"exclude"`, `"include"`. |
| `acquisitions` | string | no |  | Include Acquisitions. Return enriched acquisition data (+1 credit) One of `"exclude"`, `"include"`. |
| `extra` | string | no |  | Include Extra Data. Enrich with Crunchbase ranking, contact info, social accounts, funding details, IPO status (+1 credit) One of `"exclude"`, `"include"`. |
| `use_cache` | string | no |  | Cache Strategy. Control how cached data is used. One of `"if-present"`, `"if-recent"`. |
| `fallback_to_cache` | string | no |  | Fallback to Cache. Fallback behavior if fetching a fresh profile fails. One of `"on-error"`, `"never"`. |

### `get_person_profile`

**Get Person Profile.** Retrieve a full structured person profile from a known professional-network, Twitter/X, or Facebook URL (supply exactly one); read-only and safe to retry. Use when you already have the profile URL. If you only have a name and company, call Look Up Person first to resolve the URL. Optional enrichments (contact numbers, personal emails, social IDs, Live Fetch) add credits. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `profile_url` | string | no |  | Profile URL. Professional network profile URL (e.g., https://linkedin.com/in/johnrmarty/). Provide only one of Profile URL, Twitter URL, or Facebook URL. |
| `twitter_profile_url` | string | no |  | Twitter/X Profile URL. Twitter/X profile URL (e.g., https://x.com/johnrmarty/). Provide only one of Profile URL, Twitter URL, or Facebook URL. |
| `facebook_profile_url` | string | no |  | Facebook Profile URL. Facebook profile URL (e.g., https://facebook.com/johnrmarty/). Provide only one of Profile URL, Twitter URL, or Facebook URL. |
| `extra` | string | no |  | Include Extra Data. Enrich with gender, birth date, industry, and interests (+1 credit) One of `"exclude"`, `"include"`. |
| `github_profile_id` | string | no |  | Include GitHub Profile ID. Enrich with GitHub ID (+1 credit) One of `"exclude"`, `"include"`. |
| `facebook_profile_id` | string | no |  | Include Facebook Profile ID. Enrich with Facebook ID (+1 credit) One of `"exclude"`, `"include"`. |
| `twitter_profile_id` | string | no |  | Include Twitter Profile ID. Enrich with Twitter ID (+1 credit) One of `"exclude"`, `"include"`. |
| `personal_contact_number` | string | no |  | Include Personal Contact Numbers. Enrich with personal numbers (+1 credit per number) One of `"exclude"`, `"include"`. |
| `personal_email` | string | no |  | Include Personal Emails. Enrich with personal emails (+1 credit per email) One of `"exclude"`, `"include"`. |
| `skills` | string | no |  | Include Skills. Include skills data (no extra credit) One of `"exclude"`, `"include"`. |
| `inferred_salary` | string | no |  | Include Inferred Salary (Deprecated). Include inferred salary range (+1 credit) One of `"exclude"`, `"include"`. |
| `use_cache` | string | no |  | Cache Strategy. Control how cached data is used. One of `"if-present"`, `"if-recent"`. |
| `fallback_to_cache` | string | no |  | Fallback to Cache. Fallback behavior if fetching a fresh profile fails. One of `"on-error"`, `"never"`. |
| `live_fetch` | string | no |  | Live Fetch. Force a fresh profile fetch (+9 credits) One of `"default"`, `"force"`. |

### `get_school_profile`

**Get School Profile.** Enrich a single school or university into structured profile data given its professional-network school URL. Pick this when you already have the school URL and need its details; read-only and idempotent. Use Live Fetch to force a fresh fetch instead of cached data at a higher credit cost. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | School URL. Professional network school URL to enrich (e.g., https://www.linkedin.com/school/national-university-of-singapore) |
| `use_cache` | string | no |  | Cache Strategy. Control how cached data is used. One of `"if-present"`, `"if-recent"`. |
| `live_fetch` | string | no |  | Live Fetch. Force a fresh profile fetch (+9 credits) One of `"default"`, `"force"`. |

### `get_company_lookup`

**Look Up Company.** Resolve a single company's professional-network URL/profile from its name or domain (one of the two is required), optionally narrowed by country. Read-only and safe to retry. Use this as the entry point when you only know a company name or domain; to find many companies by attributes use Search Companies, and to enrich an already-known URL use Get Company Profile. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_name` | string | no |  | Company Name. Name of the company. Requires either Company Name or Company Domain. |
| `company_domain` | string | no |  | Company Domain. Company website or domain (e.g., accenture.com). Requires either Company Name or Company Domain. |
| `company_location` | string | no |  | Company Location. ISO 3166-1 alpha-2 country code (e.g., sg, us) |
| `enrich_profile` | string | no |  | Enrich Profile. Enrich the result with cached company profile data (+1 credit) One of `"skip"`, `"enrich"`. |

### `get_company_id_lookup`

**Look Up Company by Numeric ID.** Resolve a company's vanity (public) identifier from its internal immutable numeric ID. Read-only, free, and safe to retry. Use only when you have the numeric company ID and need the vanity URL slug; to find a company by name or domain use Look Up Company instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Numeric Company ID. The company's internal, immutable numeric ID (e.g., 1441 for Google) |

### `get_person_lookup`

**Look Up Person.** Resolve a single person's professional-network profile from their first name plus a company name or domain (both required), optionally refined by last name, title, or location. Read-only and safe to retry. Use this as the entry point when you have a name and employer but no profile URL; once you have the URL use Get Person Profile to enrich. Similarity checks consume credits even when no match is found. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. First name of the person (e.g., Bill) |
| `company_domain` | string | yes |  | Company Name or Domain. Company name or domain (e.g., gatesfoundation.org) |
| `last_name` | string | no |  | Last Name. Last name of the person (e.g., Gates) |
| `title` | string | no |  | Title. Title the person holds at their current job (e.g., Co-chair) |
| `location` | string | no |  | Location. Country, city, or state name (e.g., Seattle) |
| `enrich_profile` | string | no |  | Enrich Profile. Enrich the result with cached profile data (+1 credit) One of `"skip"`, `"enrich"`. |
| `similarity_checks` | string | no |  | Similarity Checks. Perform similarity checks to eliminate false positives. Credits are deducted even if null is returned. One of `"include"`, `"skip"`. |

### `get_role_lookup`

**Look Up Role at Company.** Find the single person who best matches a given role (e.g. "ceo", "vp of engineering") at a named company. Read-only and safe to retry. Use when you need the one person holding a role; to get many people by job-title keyword use Search Company Employees. Profile enrichment adds a credit. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_name` | string | yes |  | Company Name. Name of the company (e.g., enrichlayer) |
| `role` | string | yes |  | Role. Role to look up (e.g., ceo, cto, vp of engineering) |
| `enrich_profile` | string | no |  | Enrich Profile. Enrich the result with cached profile data (+1 credit) One of `"skip"`, `"enrich"`. |

### `get_employee_listing`

**List Company Employees.** List a company's employees from its professional-network URL, filterable by employment status (current/past/all), country, and sortable by tenure. Read-only and safe to retry. Use this for a broad roster; to target a specific job title use Search Company Employees, and for just a head count use Get Employee Count. Boolean role filtering, sorting, and profile enrichment add credits. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Company URL. Professional network company URL (e.g., https://www.linkedin.com/company/microsoft) |
| `page_size` | string | no |  | Page Size. Maximum results per call (1-9999, default: 10) |
| `employment_status` | string | no |  | Employment Status. Filter by current, past, or all employees. One of `"current"`, `"past"`, `"all"`. |
| `enrich_profiles` | string | no |  | Enrich Profiles. Return full profiles instead of just URLs (+1 credit each) One of `"skip"`, `"enrich"`. |
| `boolean_role_search` | string | no |  | Boolean Role Search. Filter employees by title using boolean expression (e.g., "founder" OR "co-founder"). Base cost: 10 credits + 3 per match. |
| `role_search` | string | no |  | Role Search (Deprecated). Filter employees by title using regex. Prefer Boolean Role Search instead. |
| `country` | string | no |  | Country. Filter by country (ISO 3166-1 alpha-2 code, e.g., us). +3 credits per result. |
| `sort_by` | string | no |  | Sort By. Sort employees (+50 credits base + 10 per employee returned) One of `"none"`, `"recently-joined"`, `"recently-left"`, `"oldest"`. |
| `coy_name_match` | string | no |  | Company Name Match. Include profiles that match the company name in addition to URL. One of `"include"`, `"exclude"`. |
| `resolve_numeric_id` | string | no |  | Resolve Numeric ID. Enable support for company URLs with numerical IDs (+2 credits) One of `"false"`, `"true"`. |
| `use_cache` | string | no |  | Cache Strategy. Control how cached data is used. One of `"if-present"`, `"if-recent"`. |

### `get_employee_count`

**Get Employee Count.** Return only the total employee head count for a company from its professional-network URL, with optional current/past/all status and an as-of date. Read-only and safe to retry. Use when you need a size metric, not the people; to retrieve the actual employee roster use List Company Employees. Estimated-count and historical date options add credits. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Company URL. Professional network company URL (e.g., https://www.linkedin.com/company/apple/) |
| `employment_status` | string | no |  | Employment Status. Count current, past, or all employees. One of `"current"`, `"past"`, `"all"`. |
| `coy_name_match` | string | no |  | Company Name Match. Include profiles that match the company name in addition to URL. One of `"include"`, `"exclude"`. |
| `estimated_employee_count` | string | no |  | Include Estimated Count. Include estimated employee count from the company profile (+1 credit) One of `"exclude"`, `"include"`. |
| `at_date` | string | no |  | At Date. Get employee count at a specific date (YYYY-MM-DD format). +1-5 credits. |
| `use_cache` | string | no |  | Cache Strategy. Control how cached data is used. One of `"if-present"`, `"if-recent"`. |

### `get_employee_search`

**Search Company Employees.** Find employees of a company whose job title matches a boolean (or legacy regex) keyword, given the company URL. Read-only and safe to retry. Use this when you need people in specific roles (e.g. "ceo OR cto"); to list all employees without a title filter use List Company Employees. Carries a base cost plus per-match credits, and country filtering or profile enrichment add more. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_profile_url` | string | yes |  | Company Profile URL. Professional network company URL (e.g., https://www.linkedin.com/company/microsoft/) |
| `keyword_boolean` | string | yes |  | Keyword (Boolean). Job title keyword in boolean search syntax (e.g., "ceo OR cto"). Max 255 characters. Takes precedence over regex. |
| `keyword_regex` | string | no |  | Keyword (Regex, Deprecated). Job title keyword in regex format (e.g., ceo\|cto). Prefer Boolean keyword instead. |
| `page_size` | string | no |  | Page Size. Maximum results per call (1-9999, default: 10) |
| `country` | string | no |  | Country. Filter by country (ISO 3166-1 alpha-2, e.g., us). +3 credits per result. |
| `enrich_profiles` | string | no |  | Enrich Profiles. Return full profiles instead of just URLs (+1 credit each) One of `"skip"`, `"enrich"`. |
| `resolve_numeric_id` | string | no |  | Resolve Numeric ID. Enable support for company URLs with numerical IDs (+2 credits) One of `"false"`, `"true"`. |

### `get_student_listing`

**List School Students.** List students/alumni of a school from its professional-network school URL, filterable by status (current/past/all), major (boolean keyword), and country, and sortable by matriculation or graduation. Read-only and safe to retry. Use for school rosters; the company equivalent is List Company Employees. Boolean major search, sorting, and profile enrichment add credits. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `school_url` | string | yes |  | School URL. Professional network school URL (e.g., https://www.linkedin.com/school/stanford-university) |
| `page_size` | string | no |  | Page Size. Maximum results per call (1-9999, default: 10) |
| `student_status` | string | no |  | Student Status. Filter by current, past, or all students. One of `"current"`, `"past"`, `"all"`. |
| `enrich_profiles` | string | no |  | Enrich Profiles. Return full profiles instead of just URLs (+1 credit each) One of `"skip"`, `"enrich"`. |
| `boolean_search_keyword` | string | no |  | Boolean Search Keyword. Filter students by major using boolean expression (e.g., "computer OR cs"). Base: 10 credits + 6 per student. |
| `country` | string | no |  | Country. Filter by country (ISO 3166-1 alpha-2, e.g., us). +3 credits per result. |
| `sort_by` | string | no |  | Sort By. Sort students (+50 credits base + 10 per student returned) One of `"none"`, `"recently-matriculated"`, `"recently-graduated"`. |
| `resolve_numeric_id` | string | no |  | Resolve Numeric ID. Enable support for school URLs with numerical IDs (+2 credits) One of `"false"`, `"true"`. |

### `get_work_email_lookup`

**Look Up Work Email.** Find a person's work (business) email address from their professional-network profile URL, with a 95%+ deliverability guarantee. Read-only and safe to retry. Use for B2B/work contact; for personal emails use Look Up Personal Email, and to go from an email back to profiles use Reverse Email Lookup. Processing may be asynchronous, so an optional callback URL can be supplied for completion notification. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `profile_url` | string | yes |  | Profile URL. Professional network profile URL (e.g., https://sg.linkedin.com/in/williamhgates) |
| `callback_url` | string | no |  | Callback URL. Webhook URL to notify when the request finishes processing (optional) |

### `get_reverse_email_lookup`

**Reverse Email Lookup.** Find social/professional-network profiles associated with an email address (personal or work). Read-only and safe to retry. Use to go from a known email back to a person's profiles; the reverse direction (profile to emails) is Look Up Personal Email or Look Up Work Email. Superficial lookup depth charges no credits when there are no results; Deep charges regardless. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. Email address to look up (e.g., johndoe@enrichlayer.com) |
| `lookup_depth` | string | no |  | Lookup Depth. Superficial: no credits if no results. Deep: credits used regardless. One of `"deep"`, `"superficial"`. |
| `enrich_profile` | string | no |  | Enrich Profile. Enrich the result with cached profile data (+1 credit) One of `"skip"`, `"enrich"`. |

### `get_reverse_phone_lookup`

**Reverse Phone Lookup.** Look up the social media profiles associated with a phone number supplied in E.164 format. Pick this when a phone number is your only identifier and you want to resolve it to people/profiles; read-only and idempotent, billed per call. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number` | string | yes |  | Phone Number. E.164 formatted phone number (e.g., +14155552671) |

### `get_personal_contact`

**Look Up Personal Contact Numbers.** Find a person's personal phone numbers from one social profile URL (professional-network, Twitter/X, or Facebook — supply exactly one). Read-only and safe to retry. Use when you have a profile link and need phone contact details; the email counterpart is Look Up Personal Email. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `profile_url` | string | no |  | Profile URL. Professional network profile URL. Provide only one of Profile URL, Twitter URL, or Facebook URL. |
| `twitter_profile_url` | string | no |  | Twitter/X Profile URL. Twitter/X profile URL (e.g., https://x.com/enrichlayer). Provide only one of Profile URL, Twitter URL, or Facebook URL. |
| `facebook_profile_url` | string | no |  | Facebook Profile URL. Facebook profile URL (e.g., https://www.facebook.com/zuck). Provide only one of Profile URL, Twitter URL, or Facebook URL. |
| `page_size` | string | no |  | Page Size. Maximum numbers returned (0 = no limit, default: 0) |

### `get_personal_email`

**Look Up Personal Email.** Find a person's personal (non-work) email addresses given one social profile URL (professional-network, Twitter/X, or Facebook — supply exactly one). Read-only and safe to retry. Use when you have a profile link and need personal contact emails; for work emails use Look Up Work Email, and to go from email back to profiles use Reverse Email Lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `profile_url` | string | no |  | Profile URL. Professional network profile URL. Provide only one of Profile URL, Twitter URL, or Facebook URL. |
| `twitter_profile_url` | string | no |  | Twitter/X Profile URL. Twitter/X profile URL (e.g., https://x.com/enrichlayer). Provide only one of Profile URL, Twitter URL, or Facebook URL. |
| `facebook_profile_url` | string | no |  | Facebook Profile URL. Facebook profile URL (e.g., https://www.facebook.com/zuck). Provide only one of Profile URL, Twitter URL, or Facebook URL. |
| `email_validation` | string | no |  | Email Validation. How to validate each email found. One of `"none"`, `"fast"`, `"precise"`. |
| `page_size` | string | no |  | Page Size. Maximum emails returned (0 = no limit, default: 0) |

### `get_disposable_email_check`

**Check Disposable Email.** Check whether an email address belongs to a disposable/temporary email provider. Read-only, free, and safe to retry. Use to validate or filter sign-up and lead emails before further enrichment; this only flags disposability and does not return profile data. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. Email address to check (e.g., johndoe@enrichlayer.com) |

### `get_company_picture`

**Get Company Profile Picture.** Retrieve a company's profile picture URL from its professional-network company page URL. Pick this when you only need the logo/avatar image link and not the full company record; it reads from cached profiles, costs no credits, and is read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_profile_url` | string | yes |  | Company Profile URL. Professional network company URL (e.g., https://www.linkedin.com/company/apple/) |

### `get_person_picture`

**Get Person Profile Picture.** Return the profile picture URL for a person from a known professional-network profile URL, served from cached profiles. Read-only, free, and safe to retry. Use only when you need the avatar image link; for full profile data use Get Person Profile. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `person_profile_url` | string | yes |  | Person Profile URL. Professional network person URL (e.g., https://www.linkedin.com/in/williamhgates/) |

### `get_job_profile`

**Get Job Profile.** Retrieve full structured data for a single job posting from its professional-network job URL. Read-only and safe to retry. Use when you have a specific job URL; to discover job postings for a company use Search Company Jobs first. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Job URL. Professional network job URL (e.g., https://www.linkedin.com/jobs/view/4222036951/) |

### `get_job_search`

**Search Company Jobs.** List job postings from a company, filterable by keyword, job type, experience level, recency, and work flexibility. Read-only and safe to retry. Use when you need the actual job listings; to get only the matching count without the listings use Get Job Count. Requires the company search_id obtained from a company profile lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_id` | string | no |  | Company Search ID. The search_id of the company (from Company Profile API) |
| `keyword` | string | no |  | Keyword. Keyword to search for (e.g., engineer) |
| `job_type` | string | no |  | Job Type. Filter by job type. One of `"anything"`, `"full-time"`, `"part-time"`, `"contract"`, `"internship"`, `"temporary"`, `"volunteer"`. |
| `experience_level` | string | no |  | Experience Level. Filter by experience level. One of `"anything"`, `"internship"`, `"entry_level"`, `"associate"`, `"mid_senior_level"`, `"director"`. |
| `when` | string | no |  | When Posted. Filter by when the job was posted. One of `"anytime"`, `"yesterday"`, `"past-week"`, `"past-month"`. |
| `flexibility` | string | no |  | Flexibility. Filter by work flexibility. One of `"anything"`, `"remote"`, `"on-site"`, `"hybrid"`. |
| `geo_id` | string | no |  | Geo ID. Geographic location ID (e.g., 92000000 for worldwide) |

### `get_job_count`

**Get Job Count.** Return only the number of job postings from a company matching optional filters (keyword, job type, experience level, recency, flexibility), not the listings themselves. Read-only and safe to retry. Use when you need a hiring-volume metric; to retrieve the actual postings use Search Company Jobs. Requires the company search_id from a company profile lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_id` | string | no |  | Company Search ID. The search_id of the company (from Company Profile API) |
| `keyword` | string | no |  | Keyword. Keyword to search for (e.g., engineer) |
| `job_type` | string | no |  | Job Type. Filter by job type. One of `"anything"`, `"full-time"`, `"part-time"`, `"contract"`, `"internship"`, `"temporary"`, `"volunteer"`. |
| `experience_level` | string | no |  | Experience Level. Filter by experience level. One of `"anything"`, `"internship"`, `"entry_level"`, `"associate"`, `"mid_senior_level"`, `"director"`. |
| `when` | string | no |  | When Posted. Filter by when the job was posted. One of `"anytime"`, `"yesterday"`, `"past-week"`, `"past-month"`. |
| `flexibility` | string | no |  | Flexibility. Filter by work flexibility. One of `"anything"`, `"remote"`, `"on-site"`, `"hybrid"`. |
| `geo_id` | string | no |  | Geo ID. Geographic location ID (e.g., 92000000 for worldwide) |

### `get_company_search`

**Search Companies.** Discover companies matching filters such as industry, location, size, founding year, or funding across the full dataset, returning matching company URLs. Read-only and safe to retry. Use when you do not know a specific company and need to find candidates by attributes; to resolve one known company use Look Up Company instead. Enriching profiles inline costs extra credits per result. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Company Name. Filter by company name (boolean search syntax, e.g., "circle \|\| amelex") |
| `country` | string | no |  | Country. Filter by country (ISO 3166-1 alpha-2, e.g., US) |
| `region` | string | no |  | Region. Filter by state/province (e.g., Maryland OR "New York") |
| `city` | string | no |  | City. Filter by city (e.g., "Los Angeles") |
| `industry` | string | no |  | Industry. Filter by industry (boolean search, e.g., "technology \|\| manufacturing") |
| `primary_industry` | string | no |  | Primary Industry. Filter by primary industry only. |
| `type` | string | no |  | Company Type. Filter by company type. One of `"EDUCATIONAL"`, `"GOVERNMENT_AGENCY"`, `"NON_PROFIT"`, `"PARTNERSHIP"`, `"PRIVATELY_HELD"`, `"PUBLIC_COMPANY"`, `"SELF_EMPLOYED"`, `"SELF_OWNED"`. |
| `employee_count_category` | string | no |  | Employee Count Category. Filter by employee count category (takes precedence over min/max) One of `"custom"`, `"startup"`, `"small"`, `"medium"`, `"large"`, `"enterprise"`. |
| `employee_count_min` | string | no |  | Employee Count Min. Minimum number of employees. |
| `employee_count_max` | string | no |  | Employee Count Max. Maximum number of employees. |
| `follower_count_min` | string | no |  | Follower Count Min. Minimum follower count. |
| `follower_count_max` | string | no |  | Follower Count Max. Maximum follower count. |
| `description` | string | no |  | Description. Filter by company description (boolean search) |
| `specialities` | string | no |  | Specialities. Filter by speciality (boolean search) |
| `founded_after_year` | string | no |  | Founded After Year. Filter companies founded after this year. |
| `founded_before_year` | string | no |  | Founded Before Year. Filter companies founded before this year. |
| `funding_amount_min` | string | no |  | Funding Amount Min (USD). Minimum funding raised. |
| `funding_amount_max` | string | no |  | Funding Amount Max (USD). Maximum funding raised. |
| `funding_raised_after` | string | no |  | Funding Raised After. Filter companies that raised funding after this date (YYYY-MM-DD) |
| `funding_raised_before` | string | no |  | Funding Raised Before. Filter companies that raised funding before this date (YYYY-MM-DD) |
| `domain_name` | string | no |  | Domain Name. Filter by domain name (e.g., pfizer.com) |
| `public_identifier_in_list` | string | no |  | Public Identifier In List. Comma-separated list of public identifiers the company must be in. |
| `public_identifier_not_in_list` | string | no |  | Public Identifier Not In List. Comma-separated list of public identifiers the company must not be in. |
| `page_size` | string | no |  | Page Size. Maximum results per call (1-100, default: 100) |
| `enrich_profiles` | string | no |  | Enrich Profiles. Return full profiles instead of just URLs (+1 credit each) One of `"skip"`, `"enrich"`. |
| `use_cache` | string | no |  | Cache Strategy. Control how cached data is used. One of `"if-present"`, `"if-recent"`. |

### `get_person_search`

**Search People.** Find people by querying a large professional dataset on attributes like name, location, current/past role and company, education, skills, languages, and follower counts. Pick this for discovery when you do not already have a specific profile URL; read-only and idempotent, but billed per result so narrow filters before running. Set Enrich Profiles to return full profile records instead of just URLs (costs extra credits each). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `country` | string | no |  | Country. Filter by country (ISO 3166-1 alpha-2, e.g., US) |
| `region` | string | no |  | Region. Filter by state/province (e.g., California or Washington) |
| `city` | string | no |  | City. Filter by city (e.g., Seattle OR "Palo Alto") |
| `first_name` | string | no |  | First Name. Filter by first name (e.g., Bill OR Mark) |
| `last_name` | string | no |  | Last Name. Filter by last name (e.g., Gates or Zuckerberg) |
| `headline` | string | no |  | Headline. Filter by headline (boolean search) |
| `summary` | string | no |  | Summary. Filter by summary (boolean search) |
| `current_role_title` | string | no |  | Current Role Title. Filter by current job title (e.g., CEO \|\| Founder) |
| `past_role_title` | string | no |  | Past Role Title. Filter by past job title (boolean search) |
| `current_role_before` | string | no |  | Current Role Before. People who started current role before this date (YYYY-MM-DD) |
| `current_role_after` | string | no |  | Current Role After. People who started current role after this date (YYYY-MM-DD) |
| `current_company_profile_url` | string | no |  | Current Company Profile URL. Filter by current company profile URL. |
| `past_company_profile_url` | string | no |  | Past Company Profile URL. Filter by past company profile URL. |
| `current_company_name` | string | no |  | Current Company Name. Filter by current company name (e.g., Stripe OR Apple) |
| `past_company_name` | string | no |  | Past Company Name. Filter by past company name (e.g., Stripe OR Apple) |
| `current_job_description` | string | no |  | Current Job Description. Filter by current job description (boolean search) |
| `past_job_description` | string | no |  | Past Job Description. Filter by past job description (boolean search) |
| `current_company_country` | string | no |  | Current Company Country. Filter by current company country (ISO alpha-2) |
| `current_company_region` | string | no |  | Current Company Region. Filter by current company region. |
| `current_company_city` | string | no |  | Current Company City. Filter by current company city. |
| `current_company_type` | string | no |  | Current Company Type. Filter by current company type. One of `"EDUCATIONAL"`, `"GOVERNMENT_AGENCY"`, `"NON_PROFIT"`, `"PARTNERSHIP"`, `"PRIVATELY_HELD"`, `"PUBLIC_COMPANY"`, `"SELF_EMPLOYED"`, `"SELF_OWNED"`. |
| `current_company_industry` | string | no |  | Current Company Industry. Filter by current company industry (boolean search) |
| `current_company_primary_industry` | string | no |  | Current Company Primary Industry. Filter by current company primary industry. |
| `current_company_specialities` | string | no |  | Current Company Specialities. Filter by current company speciality (boolean search) |
| `current_company_employee_count_category` | string | no |  | Current Company Employee Count Category. Filter by current company size category. One of `"custom"`, `"startup"`, `"small"`, `"medium"`, `"large"`, `"enterprise"`. |
| `current_company_employee_count_min` | string | no |  | Current Company Min Employees. Minimum employees at current company. |
| `current_company_employee_count_max` | string | no |  | Current Company Max Employees. Maximum employees at current company. |
| `current_company_follower_count_min` | string | no |  | Current Company Min Followers. Minimum follower count at current company. |
| `current_company_follower_count_max` | string | no |  | Current Company Max Followers. Maximum follower count at current company. |
| `current_company_description` | string | no |  | Current Company Description. Filter by current company description (boolean search) |
| `current_company_founded_after_year` | string | no |  | Current Company Founded After Year. Filter by current company founded after this year. |
| `current_company_founded_before_year` | string | no |  | Current Company Founded Before Year. Filter by current company founded before this year. |
| `current_company_funding_amount_min` | string | no |  | Current Company Funding Min (USD). Minimum funding raised by current company. |
| `current_company_funding_amount_max` | string | no |  | Current Company Funding Max (USD). Maximum funding raised by current company. |
| `current_company_funding_raised_after` | string | no |  | Current Company Funding Raised After. Current company raised funding after this date (YYYY-MM-DD) |
| `current_company_funding_raised_before` | string | no |  | Current Company Funding Raised Before. Current company raised funding before this date (YYYY-MM-DD) |
| `current_company_domain_name` | string | no |  | Current Company Domain Name. Filter by current company domain (e.g., pfizer.com) |
| `education_field_of_study` | string | no |  | Education Field of Study. Filter by field of study (e.g., computer science) |
| `education_degree_name` | string | no |  | Education Degree Name. Filter by degree name (e.g., MBA) |
| `education_school_name` | string | no |  | Education School Name. Filter by school name (e.g., "Harvard University") |
| `education_school_profile_url` | string | no |  | Education School Profile URL. Filter by school profile URL. |
| `industries` | string | no |  | Industries. Filter by person's inferred industry (boolean search) |
| `interests` | string | no |  | Interests. Filter by interests (boolean search) |
| `skills` | string | no |  | Skills. Filter by skills (boolean search) |
| `skills_all_in_list` | string | no |  | Skills (All in List). Filter by all skills in a comma-separated list (e.g., rust,mongodb). Cannot combine with Skills. |
| `languages` | string | no |  | Languages. Filter by language (e.g., Mandarin OR Chinese) |
| `groups` | string | no |  | Groups. Filter by group membership (boolean search) |
| `follower_count_min` | string | no |  | Follower Count Min. Minimum follower count. |
| `follower_count_max` | string | no |  | Follower Count Max. Maximum follower count. |
| `public_identifier_in_list` | string | no |  | Public Identifier In List. Comma-separated list of public identifiers person must be in. |
| `public_identifier_not_in_list` | string | no |  | Public Identifier Not In List. Comma-separated list of public identifiers person must not be in. |
| `page_size` | string | no |  | Page Size. Maximum results per call (1-100, default: 100) |
| `enrich_profiles` | string | no |  | Enrich Profiles. Return full profiles instead of just URLs (+1 credit each) One of `"skip"`, `"enrich"`. |
| `use_cache` | string | no |  | Cache Strategy. Control how cached data is used. One of `"if-present"`, `"if-recent"`. |

### `get_credit_balance`

**Get Credit Balance.** Read the remaining credit balance on the connected Enrich Layer API account. Pick this to check available quota before running billed enrichment or search actions; takes no input, costs no credits, and is read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

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
