# Shared plugin resources

Both clients install the repository root and use this single workspace snapshot. Keep shared resources inside that root: marketplace installers copy the bundle into their cache and cannot rely on a sibling checkout.

The shared generator creates a new workspace exclusively. Its optional exclusions filter changes which bundled files are copied, never an existing destination: Claude excludes `.claude/skills` because those skills come from its installed plugin; Codex includes them for handoff to standalone Claude Code. Docs, schemas, templates and validation tools are otherwise identical.

The deploy skill is shared because its instructions are identical for both clients. Client-specific skills stay in the corresponding client folder and are selected explicitly by each root manifest.

Workspace content comes from the Aguru builder-kit build; update its source and follow the [release checklist](../MAINTAINING.md) instead of maintaining two copies here.
