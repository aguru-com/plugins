# Intruder

Intruder is a powerful vulnerability management platform that helps businesses identify, assess, and remediate security risks across their digital assets. With its comprehensive scanning capabilities and user-friendly interface, Intruder enables organizations to stay ahead of potential threats and …

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-intruder'
  version: '0.1.0'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Intruder API Key

> API Key for Intruder. Get it from your Intruder account.

## Actions

### `addTarget`

**Add Target.** Registers a new scan target (a domain or IP address) in the Intruder account so it can be included in future vulnerability scans, optionally tagging it for organization. Use when an agent needs to onboard an asset before scanning it. Not idempotent: each call attempts to create another target for the given address. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `address` | string | yes |  | Target Address. The address or domain of the target (e.g., example.com, 192.168.1.1) |
| `tags` | array | no |  | Tags. Tags to organize and filter targets. |

### `startScan`

**Start Scan.** Launches a new vulnerability scan in Intruder. Operates in two modes: when target addresses and/or tag names are supplied it scans only the matching targets, and when both are left empty it scans all targets in the account. Use when an agent needs to actively assess assets for security issues. Not idempotent: each call kicks off a separate scan run. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target_addresses` | array | no |  | Target Addresses. Target addresses to scan (e.g., example.com, 192.168.1.1). Leave empty to scan all targets. |
| `tag_names` | array | no |  | Tag Names. Tag names to filter targets. Leave empty to scan all targets. |

### `searchForATarget`

**Search For a Target.** Looks up registered targets in the Intruder account that match a given address or domain. Use when an agent needs to find an existing target or confirm one is registered before scanning. The address is required. Idempotent: a read-only lookup that does not modify any data. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `address` | string | yes |  | Target Address. The address or domain to search for (e.g., example.com, 192.168.1.1) |

### `searchForAnIssue`

**Search For an Issue.** Lists vulnerability issues detected by Intruder, optionally narrowing by issue IDs, target addresses, tag names, severity, or snoozed state; with no filters it returns all issues. Use when an agent needs to review or triage discovered security findings. Idempotent: a read-only search that does not modify any data. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIds` | array | no |  | Issue IDs. Filter by specific issue IDs. |
| `targetAddresses` | array | no |  | Target Addresses. Filter by target addresses (e.g., example.com, 192.168.1.1) |
| `tagNames` | array | no |  | Tag Names. Filter by tag names. |
| `severity` | string | no |  | Severity. Filter by severity level. One of `"low"`, `"medium"`, `"high"`, `"critical"`. |
| `snoozed` | boolean | no |  | Snoozed. Filter for snoozed issues. |

### `searchForAnIssueOccurrence`

**Search For an Issue Occurrence.** Retrieves the individual occurrences of a specific Intruder issue, identified by its issue ID, with an optional filter for snoozed occurrences. Use when an agent needs to see where and how a known issue manifests across targets. Requires the issue ID. Idempotent: a read-only lookup that does not modify any data. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueId` | string | yes |  | Issue ID. The ID of the issue to search for occurrences. |
| `snoozed` | boolean | no |  | Snoozed. Filter for snoozed occurrences. |

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
