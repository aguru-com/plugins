import { runCreateWorkspace } from "../../shared/scripts/create-workspace.mjs";

runCreateWorkspace(
  process.argv.slice(2),
  "Usage: node create-workspace.mjs <new-workspace-directory>",
  new Set([".claude/skills"]),
);
