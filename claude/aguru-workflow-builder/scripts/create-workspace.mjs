import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
} from 'node:fs';
import path from 'node:path';

const INVALID_DESTINATION = /^(?:-|$)/;
const PACKED_NAMES = path.join(import.meta.dirname, 'packed-names.json');

export function createWorkspace(destination) {
  const source = path.resolve(import.meta.dirname, '../assets/builder-kit');
  const target = path.resolve(destination);
  mkdirSync(path.dirname(target), { recursive: true });
  // Exclusive creation prevents setup from replacing a user's files, including on a retry.
  mkdirSync(target);
  // Copied entry by entry: errorOnExist rejects the just-created top-level directory itself.
  for (const entry of readdirSync(source)) {
    cpSync(path.join(source, entry), path.join(target, entry), {
      recursive: true,
      force: false,
      errorOnExist: true,
    });
  }
  const packedNames = existsSync(PACKED_NAMES)
    ? JSON.parse(readFileSync(PACKED_NAMES, 'utf8'))
    : {};
  for (const [packed, original] of Object.entries(packedNames)) {
    renameSync(path.join(target, packed), path.join(target, original));
  }
  return target;
}

export function runCreateWorkspace(args, usage) {
  if (args.length !== 1 || INVALID_DESTINATION.test(args[0])) {
    console.error(usage);
    process.exit(1);
  }
  const target = path.resolve(args[0]);
  try {
    createWorkspace(target);
    console.log(`Aguru workspace created at ${target}. Run pnpm install there.`);
  } catch (error) {
    console.error(`Could not create Aguru workspace at ${target}: ${error.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && realpathSync(process.argv[1]) === import.meta.filename) {
  runCreateWorkspace(
    process.argv.slice(2),
    'Usage: node create-workspace.mjs <new-workspace-directory>',
  );
}
