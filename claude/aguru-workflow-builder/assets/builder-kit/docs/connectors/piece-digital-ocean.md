# DigitalOcean

Cloud infrastructure provider for developers.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-digital-ocean'
  version: '0.1.1'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your DigitalOcean account using OAuth2.

### `SECRET_TEXT`: Personal Access Token

> Generate a Personal Access Token from DigitalOcean Control Panel under API > Personal access tokens.

## Actions

### `list_domains`

**List All Domains.** Lists all DNS domains managed under the authenticated DigitalOcean account, paginated. Use to discover available domains or look one up by name before acting on it. Read-only and idempotent; supports per-page and page controls. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `20` | Results Per Page. Number of domains to return per page (1-200). |
| `page` | number | no | `1` | Page. Which page of results to return. |

### `create_domain`

**Create Domain.** Registers a new DNS domain on the authenticated DigitalOcean account; optionally creates an apex A record when an IP address is supplied. Use when onboarding a domain to DigitalOcean DNS. Not idempotent — re-running with an existing domain name fails, and each successful call mutates account state. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Domain Name. The domain name (e.g., example.com). |
| `ip_address` | string | no |  | IP Address. Optional IP address to create an A record pointing to the apex domain. |

### `get_domain`

**Get Domain.** Fetches details for a single DNS domain on the DigitalOcean account, identified by its exact domain name. Use when you already know the domain name and need its TTL or zone file. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_name` | string | yes |  | Domain Name. The domain name to retrieve (e.g., example.com). |

### `delete_domain`

**Delete Domain.** Permanently deletes a DNS domain (and its records) from the DigitalOcean account, identified by exact domain name. Use to tear down DNS for a domain you no longer manage. Destructive; effectively idempotent on the end state but the first call removes the domain and later calls on a missing domain fail. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_name` | string | yes |  | Domain Name. The domain name to delete (e.g., example.com). |

### `list_droplets`

**List All Droplets.** Lists Droplets (virtual machines) on the authenticated DigitalOcean account, paginated. Returns all Droplets by default, or filters to a single tag, an exact name, or a Droplet type (standard vs. GPU); tag filtering cannot be combined with name or type. Use to discover Droplets or resolve a Droplet id before acting on it. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `20` | Results Per Page. Number of Droplets to return per page (1-200). |
| `page` | number | no | `1` | Page. Which page of results to return. |
| `tag_name` | string | no |  | Tag Name. Filter Droplets by a specific tag. Cannot be combined with Name or Type. |
| `name` | string | no |  | Name. Filter by exact Droplet name (case-insensitive). Cannot be combined with Tag Name. |
| `type` | string | no |  | Type. Filter by Droplet type. Cannot be combined with Tag Name. One of `"droplets"`, `"gpus"`. |

### `get_droplet`

**Get Droplet.** Fetches full details (status, region, size, networks, tags) for a single Droplet on the DigitalOcean account, identified by its numeric Droplet id. Use when you have a Droplet id and need its current state. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `droplet_id` | string | yes |  | Droplet. Select the Droplet to retrieve. A value the product loads from the provider, such as an id; write the value itself. |

### `create_droplet`

**Create Droplet.** Provisions one or more new Droplets (virtual machines) on the DigitalOcean account. The creation mode switches between a single Droplet (uses the single name) and a batch of up to 10 (uses the names list); size and image are required. Use to spin up compute. Not idempotent — each call launches new billable Droplets. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `creation_mode` | string | yes | `"single"` | Creation Mode. Create a single Droplet or multiple Droplets at once. One of `"single"`, `"multiple"`. |
| `name` | string | yes |  | Droplet Name. Name for the Droplet (e.g., example.com). |
| `names` | array | yes |  | Droplet Names. Names for multiple Droplets (up to 10). |
| `region` | string | no |  | Region. Region to deploy the Droplet. A value the product loads from the provider, such as an id; write the value itself. |
| `size` | string | yes |  | Size. Droplet size (CPU, RAM, disk). A value the product loads from the provider, such as an id; write the value itself. |
| `image` | string | yes |  | Image. Base image for the Droplet. A value the product loads from the provider, such as an id; write the value itself. |
| `ssh_keys` | array | no |  | SSH Keys. SSH keys to embed in the Droplet. Values the product loads from the provider, such as ids; write an array of them. |
| `vpc_uuid` | string | no |  | VPC. VPC network for the Droplet. A value the product loads from the provider, such as an id; write the value itself. |
| `backups` | boolean | no | `false` | Enable Backups. Enable automated backups. |
| `ipv6` | boolean | no | `false` | Enable IPv6. Enable IPv6 networking. |
| `monitoring` | boolean | no | `false` | Enable Monitoring. Install the DigitalOcean monitoring agent. |
| `tags` | array | no |  | Tags. Tags to apply to the Droplet. |
| `user_data` | string | no |  | User Data. Cloud-init script or user data (max 64 KiB). |
| `with_droplet_agent` | boolean | no | `true` | Install Droplet Agent. Install agent for web console access. |

### `delete_droplet`

**Delete Droplet.** Permanently destroys a single Droplet (virtual machine) on the DigitalOcean account, identified by its numeric Droplet id. Use to tear down compute you no longer need. Destructive; the first call removes the Droplet and later calls on a missing id fail. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `droplet_id` | string | yes |  | Droplet. Select the Droplet to delete. A value the product loads from the provider, such as an id; write the value itself. |

### `list_database_clusters`

**List Database Clusters.** Lists managed database clusters on the authenticated DigitalOcean account, optionally filtered to a single tag (empty tag returns all). Use to discover clusters or resolve a cluster id before acting on it. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_name` | string | no |  | Tag Name. Filter database clusters by a specific tag. |

### `list_database_events`

**List Database Events.** Retrieves the event log (configuration changes, maintenance, scaling) for one managed database cluster on the DigitalOcean account, identified by its cluster UUID. Use to audit or inspect recent activity on a specific cluster. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_cluster_uuid` | string | yes |  | Database Cluster. Select the database cluster. A value the product loads from the provider, such as an id; write the value itself. |

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
