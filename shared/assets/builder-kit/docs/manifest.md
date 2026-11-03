# The project manifest

Every project has one `manifest.yaml` at its root. It names the project,
declares the configuration its workflows read as `config.<field>`, and the
setup wizard that collects it and starts the project's schedule. It holds no workflow logic, and
never credentials or connectors: those live in each org.

```yaml
ref: acme-scheduled-sweep # kebab-case, unique in your org
kind: project
label: Acme Visit Reminders # shown as the project name; at most 100 characters
description: Reminds site contacts the day before a visit.
config:
  env: [{ title: ..., fields: { ... } }]
  install: [{ title: ..., fields: { ... } }]
  setup: { activates: ..., schedule: { ... }, steps: [{ title: ..., fields: { ... } }] }
```

Every key is checked strictly at the top level: a misspelled key there fails
the import. **Inside a field definition an unknown key is dropped silently**,
so a typo there loses that setting without an error.

All the workflow YAML files under the manifest's folder are imported with it.
The folder is the project root.

## Configuration tiers

| Tier      | Who sets it                                 | Use for                                             |
| --------- | ------------------------------------------- | --------------------------------------------------- |
| `env`     | You, in the project's settings              | Values every installation shares                    |
| `install` | Whoever installs the project on an org      | Base URLs, account references, admin-only settings  |
| `setup`   | The installed org, in its configuration tab | Anything its users choose: names, timings, contacts |

A run reads the three folded into one `config`. A field name is declared once,
in one tier. A field nobody has set reads its `defaultValue`.

Each tier is a list of steps. A step has a `title`, an optional `description`
and `warning`, and `fields`; the order of steps and of the fields in each is
the order they are shown in.

## Fields

```yaml
steps:
  - title: Email
    fields:
      contactTimeout:
        type: SHORT_TEXT
        displayName: Give Up After # required
        description: A duration such as 10d or 2w.
        required: false
        defaultValue: 10d
```

- **The key is the name workflows read**: `config.contactTimeout`. It must
  not contain `.`, `[` or `]`, and cannot be a number.
- **Common types:** `SHORT_TEXT`, `LONG_TEXT`, `NUMBER`, `CHECKBOX`,
  `STATIC_DROPDOWN` (with `options: [{ label, value }]`), `DATE`,
  `EMAIL_TEMPLATE`, `EMAIL_FOOTER`, `OBJECT` (with `properties`),
  `KEY_VALUE_TABLE` and `LLM_MODEL` (an `llm` block's `model`, read whole as
  `model: '${config.<field>}'`; declare it in `env`). `SECRET_TEXT` exists, but secrets belong in the org's
  credential store, read with `{{ secret("name") }}`.
- **An unset field reads as `""` or `undefined`.** Convert with the default
  first: `Number(config.days || 3)`, never `Number(config.days) || 3`, so a
  configured `0` stays `0`.
- **`OBJECT` is one flat object**, read as `config.footer.companyName`.
  `KEY_VALUE_TABLE` stores rows keyed by row, one level deeper; do not declare
  a flat object as a table.
- **Changing a `defaultValue` does not reach orgs that already saved the
  field.** Their value wins on every re-import.

## The setup wizard

```yaml
setup:
  activates: acme-visit-reminders # started once when setup concludes, no params
  steps:
    - title: Email
      description: The sender name on reminders.
      wizard: true
      fields: { ... }
  terms: # optional; each must be accepted to finish the wizard
    termsAndConditions: { url: https://acme.example/terms, linkText: Acme Terms }
```

A setup step is a wizard page only with `wizard: true`; every setup step also
shows in the org's configuration tab. A project with at least one wizard page
waits for the installed org to finish the wizard; one without is ready on
install.

**Concluding setup starts `activates` once, with no params** (and an empty
trigger). So point it only at a workflow that needs no params, such as a
sweep. A project whose workflows are started per record, with params, declares
no `activates`: its fields go in `install`.

## Schedules

A schedule is declared on `setup` and created for each org when it concludes
setup:

```yaml
setup:
  activates: acme-visit-reminders
  schedule:
    every: 24h # an interval; a time of day or weekday is not available
    onlyIf: { field: remindersOn, equals: 'yes' } # optional
```

- It runs `activates` every `every`, starting from setup completion. A
  malformed `every` falls back to `24h`.
- `onlyIf` creates it only when that setup field holds that value.

## MCP servers

`mcp.servers` declares the MCP servers the project's `llm` blocks may name
(`with: { mcp: { crm: {} } }`):

```yaml
mcp:
  servers:
    crm:
      url: '${config.crmMcpUrl}' # static, or env-tier fields only
      credential: crm-mcp-token # credential name, never a value
      context: # optional defaults, any tier
        accountRef: '${config.accountRef}'
```

- Templates are only `${config.<path>}`.
- Import replaces the project's servers and clears their cached tool lists.

## Importing it

`pnpm exec aguru project deploy <folder>` commits the manifest together with every
workflow under its folder to the project's repository and imports that
version, in one request; the API key needs `projects:write`
and `workflows:write`. The project must exist first (`pnpm exec aguru project create
<folder>`). See [deploy.md](deploy.md).
