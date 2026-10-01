# Updating This Skill

This is a GitHub-distributed Agent Skills directory, not an npm package. Its private workspace manifest only supports repository maintenance. The library version in [the guide index](guides.md) identifies the documentation baseline, not a Skill update protocol.

## Installation And Updates

For a managed installation, use the [skills CLI](https://github.com/vercel-labs/skills) with the exact GitHub directory:

```sh
npx skills add https://github.com/any-tdf/any-tdf/tree/main/packages/skills/stdf-skill/stdf -a codex
npx skills update stdf -p
```

For a global installation, add `-g` to installation and use `npx skills update stdf -g`. Choose the agent flag for the user's actual client. The CLI is distributed through npm; this Skill is fetched from GitHub. Do not install `stdf-skill` as an application dependency.

The CLI records the source and Skill path in its lock metadata and compares the entire Skill folder's hash, including references and scripts. Preserve that metadata. A symlink installed by the CLI points to its local canonical copy, not to the remote GitHub directory. It still requires an update operation.

A manually copied Skill or a `$skill-installer` download is a local snapshot. It has no automatic GitHub synchronization and may not be tracked by the skills CLI. Refresh it from the same GitHub directory, preserve local edits, and replace the complete Skill directory so removed files are not left behind. Do not assume rerunning an installer can overwrite an existing destination.

For a direct symlink to a maintained local clone, updating that clone changes the referenced files; no second copy is needed.

## Agent Loading

[Codex detects local Skill changes automatically](https://learn.chatgpt.com/docs/build-skills). If the update does not appear, restart Codex. Other clients have their own discovery directories and refresh behavior. An already-read instruction can remain in an active conversation; reread the changed Skill or start a new task when verifying updated guidance.

[Agent Skills metadata](https://agentskills.io/specification) supports custom values but defines no automatic remote update protocol. A version field alone neither fetches files nor invalidates an agent's conversation context. Only check for remote updates when requested or when a demonstrated documentation mismatch requires it; obtain authorization before replacing an installed Skill outside the current task's scope.
