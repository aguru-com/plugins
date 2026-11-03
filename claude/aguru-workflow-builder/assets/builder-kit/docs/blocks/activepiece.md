# `activepiece` block

Executes an action from an installed Activepieces package in a regular Temporal
activity. Use the installed catalog in Blockopedia to select the exact package
version and action; the worker rejects a missing version/action before reading
credentials.

```yaml
- id: parse-url
  type: activepiece
  with:
    piece: '@activepieces/piece-http'
    version: '0.13.0'
    action: parse_url
    input: { url: '${params.url}' }
  out: parsed-url
```

`with.input` contains the upstream action properties and supports templates.
For authenticated actions, `with.credential` names a saved API & HTTP credential
key or ID. For structured auth use `with.auth` with secret references; declare
only one of `credential` and `auth`. `with.auth-type` optionally selects one of
the piece's declared authentication methods. Credentials resolve in the activity,
under the run's installation org; browser-only credentials cannot be used.
The action's JSON result is written to `out`.

This block integrates actions, not triggers. Activepieces flow/waitpoint APIs,
file APIs and native-addon actions require additional adapters; unsupported
capabilities throw explicitly. Use native Aguru blocks for control flow and
file handling. Network access follows the worker's public-address policy and
retries can repeat provider side effects. Full compatibility and resource
limits: installed connectors.

## Output

The action's JSON result, exactly as the connector returns it. Its connector page lists the output fields when the connector declares them; otherwise check one real run before reading fields from it.

## On failure

An uninstalled version or unknown action, a missing credential on an action that needs one, an unsupported `auth-type`, invalid input, a blocked address or an unsupported capability (files, flows, waitpoints, native drivers) fails without retry. Other errors, provider errors included, are retried as an ordinary activity, so a provider can see a side effect twice. The process stops after 4 minutes or 8 MiB of output.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `piece` | string | yes |  |
| `version` | string | yes |  |
| `action` | string | yes |  |
| `input` | object \| string | no |  |
| `credential` | string | no |  |
| `auth-type` | string | no |  |
| `auth` | any | no |  |

## In wftest

It is **not guarded**: an unmocked block runs the real action. Let one that works offline (text, JSON, date helpers) run for real, and mock every action that reaches a provider. A credential never resolves in a test, so an unmocked action that needs one fails.

## Connectors

Every installed connector, with its exact version, actions, inputs and authentication, is in [the connector list](../connectors/README.md). The schema check validates `piece`, `version`, `action` and `input` against it.

## Used in

[07-connector-actions](../../templates/07-connector-actions/README.md), [08-connector-chain](../../templates/08-connector-chain/README.md)
