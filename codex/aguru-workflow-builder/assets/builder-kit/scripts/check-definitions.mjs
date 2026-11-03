import { readFileSync } from 'node:fs';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import { parse } from 'yaml';

const ROOT = path.resolve(import.meta.dirname, '..');
const SCHEMA_BY_KIND = {
  workflow: 'schema/workflow.schema.json',
  subflow: 'schema/subflow.schema.json',
  test: 'schema/workflow-test.schema.json',
};
const MAX_ERRORS = 8;
const CONNECTORS = JSON.parse(readFileSync(path.join(ROOT, 'schema/connectors.json'), 'utf8'));

const ajv = new Ajv2020({ allErrors: true, strict: false });
const schemas = Object.fromEntries(
  Object.entries(SCHEMA_BY_KIND).map(([kind, file]) => [
    kind,
    JSON.parse(readFileSync(path.join(ROOT, file), 'utf8')),
  ]),
);
const validators = Object.fromEntries(
  Object.entries(schemas).map(([kind, schema]) => [kind, ajv.compile(schema)]),
);
const blockValidators = compileBlockValidators(schemas.workflow);

const isHook = process.argv.includes('--hook');
const files = isHook ? [hookFilePath()] : process.argv.slice(2);
const problems = files.filter((file) => /\.ya?ml$/.test(file)).flatMap(checkFile);
if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exit(isHook ? 2 : 1);
}

function hookFilePath() {
  const input = JSON.parse(readFileSync(0, 'utf8'));
  return input.tool_input?.file_path ?? '';
}

function checkFile(file) {
  let doc;
  try {
    doc = parse(readFileSync(file, 'utf8'), { merge: false });
  } catch (error) {
    return [`${file}: not valid YAML: ${error.message}`];
  }
  const kind = definitionKind(file, doc);
  if (kind === null) return [];
  if (!Object.hasOwn(validators, kind)) {
    return [`${file}: kind must be workflow or subflow, got ${JSON.stringify(doc.kind)}`];
  }
  const validate = validators[kind];
  if (validate(doc)) {
    const connectorErrors = kind === 'test' ? [] : collectBlocks(doc).flatMap(checkConnector);
    if (connectorErrors.length === 0) return [];
    return [`${file} uses connectors wrongly:`, ...connectorErrors.slice(0, MAX_ERRORS)];
  }
  const blockErrors = kind === 'test' ? [] : collectBlocks(doc).flatMap(checkBlock);
  const details = blockErrors.length > 0 ? blockErrors : describeErrors(validate.errors, '');
  return [`${file} does not match ${SCHEMA_BY_KIND[kind]}:`, ...details.slice(0, MAX_ERRORS)];
}

function checkConnector(block) {
  if (block.type !== 'activepiece' || typeof block.with?.piece !== 'string') return [];
  const prefix = `  block ${block.id}`;
  const { piece, version, action, input = {} } = block.with;
  const connector = Object.hasOwn(CONNECTORS, piece) ? CONNECTORS[piece] : undefined;
  if (!connector) return [`${prefix}: ${piece} is not installed. See docs/connectors/README.md`];
  const problems = [];
  if (version !== connector.version) {
    problems.push(
      `${prefix}: ${piece} is installed at version ${connector.version}, not ${version}`,
    );
  }
  const spec = Object.hasOwn(connector.actions, action) ? connector.actions[action] : undefined;
  if (!spec)
    return [...problems, `${prefix}: ${piece} has no action "${action}". See ${connector.page}`];
  problems.push(...checkConnectorAuth(block, connector, spec, prefix));
  if (input === null || typeof input !== 'object' || Array.isArray(input)) return problems;
  for (const [name, required] of Object.entries(spec.inputs)) {
    if (required && !Object.hasOwn(input, name))
      problems.push(`${prefix}: input ${name} is required`);
  }
  for (const name of Object.keys(input)) {
    if (!Object.hasOwn(spec.inputs, name)) {
      problems.push(`${prefix}: ${action} has no input "${name}". See ${connector.page}`);
    }
  }
  return problems;
}

function definitionKind(file, doc) {
  if (/\.test\.ya?ml$/.test(file)) return 'test';
  const isRecord = doc !== null && typeof doc === 'object' && !Array.isArray(doc);
  if (!isRecord || doc.kind === 'project') return null;
  if (Object.hasOwn(validators, doc.kind)) return doc.kind;
  return Object.hasOwn(doc, 'ref') ? String(doc.kind) : null;
}

function compileBlockValidators(workflowSchema) {
  const resolve = (schema) =>
    schema.$ref ? resolve(workflowSchema.$defs[schema.$ref.replace('#/$defs/', '')]) : schema;
  const variants = resolve(workflowSchema.properties.blocks.items).anyOf.map(resolve);
  return new Map(
    variants.map((variant) => [
      resolve(variant.properties.type).const,
      ajv.compile({ ...variant, $defs: workflowSchema.$defs }),
    ]),
  );
}

function collectBlocks(node) {
  if (Array.isArray(node)) return node.flatMap(collectBlocks);
  if (node === null || typeof node !== 'object') return [];
  const own = typeof node.id === 'string' && typeof node.type === 'string' ? [node] : [];
  return [...own, ...Object.values(node).flatMap(collectBlocks)];
}

function checkBlock(block) {
  const validate = blockValidators.get(block.type);
  if (!validate) {
    const known = [...blockValidators.keys()].join(', ');
    return [`  block ${block.id}: unknown type "${block.type}". The engine accepts: ${known}`];
  }
  if (validate(block)) return [];
  return describeErrors(validate.errors, `block ${block.id}`);
}

function checkConnectorAuth(block, connector, spec, prefix) {
  const { action, credential, auth } = block.with;
  const authType = block.with['auth-type'];
  const problems = [];
  if (credential !== undefined && auth !== undefined) {
    problems.push(`${prefix}: give credential or auth, not both`);
  }
  if (authType !== undefined && !connector.auth.includes(authType)) {
    problems.push(`${prefix}: auth-type must be one of ${connector.auth.join(', ') || 'none'}`);
  }
  if (spec.auth && connector.auth.length > 0 && credential === undefined && auth === undefined) {
    problems.push(`${prefix}: ${action} needs authentication: add credential or auth`);
  }
  return problems;
}

function describeErrors(errors, prefix) {
  const specific = errors.filter((error) => !['anyOf', 'oneOf', 'const'].includes(error.keyword));
  const shown = specific.length > 0 ? specific : errors;
  const lines = shown.map((error) => `  ${prefix}${error.instancePath || '/'}: ${error.message}`);
  return [...new Set(lines)];
}
