# 01 HTTP basics

Reads one job from the Acme Jobs API. Start here for any workflow that calls
your own API.

- `acme-fetch-job.yaml` is a `kind: subflow`: one `http` GET with the token
  passed as a secret reference, and a `return` projection that is the only
  thing a caller sees. The API serves numeric ids; the projection converts
  them with `String(...)`, because subflow params are strings.
- `acme-show-job.yaml` is the workflow you start. It calls the subflow and
  logs the result.

**Change first:** the URL and the fields in `return`. Keep the projection
small: return what callers read, not the whole response.

**Tests**

| Test           | Proves                                                         |
| -------------- | -------------------------------------------------------------- |
| `get-job` unit | The URL, and that the token is a secret reference, not a value |
| subflow e2e    | The projection's shape and the id conversion                   |
| workflow e2e   | The caller reads the subflow's `return`, through a nested mock |

A secret reference never resolves in a test. In `expect-in` it reads as
`{ __secretRef: true, parts: [...] }`.
