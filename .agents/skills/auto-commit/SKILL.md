---
name: auto-commit
description: Inspect, plan, split, stage, commit, and optionally push local changes in the Any TDF repository using concise English Conventional Commit messages. Use when the user says auto commit, automatic commit, 自动提交, gcm, feat-gcm, fix-gcm, commit, commit and push, or asks to organize the current workspace into commits.
---

# Auto Commit

Create focused commits without rewriting or losing existing work. Write every commit subject in English.

## Inspect

1. Run `git status --short -uall`.
2. Inspect unstaged, staged, deleted, and untracked content with `git diff`, `git diff --cached`, and targeted file reads.
3. Treat the complete working tree as input, not only the current index.
4. Preserve unrelated changes and pre-existing staged content. Stop when commit boundaries cannot be separated safely.

## Plan

- Group files and hunks by one independent purpose. Keep source and its directly generated outputs together.
- Prefer fewer coherent commits over mechanical per-file splitting.
- Use repository-style prefixes:
  - `feat:` for new behavior or capability.
  - `fix:` for bug or regression fixes.
  - `doc:` for documentation or AI instruction changes.
  - `ci:` for CI, release, hook, build, or automation changes.
  - `chore:` for maintenance that fits none of the above.
- Use a concise imperative English subject, normally no more than 72 characters.
- Examples: `feat: align theme switching across framework sites`, `fix: preserve input state during reset`, `doc: add repository development skills`.

For a bare commit request, show the proposed commits and wait for one choice:

1. Commit without pushing.
2. Commit and push once after all commits succeed.
3. Cancel and preserve the workspace.

Skip confirmation only when the user explicitly says to commit directly, not ask again, or commit and push.

## Execute

1. Stage only the files or hunks for the current commit.
2. Inspect `git diff --cached --name-status` before committing.
3. Commit without `--no-verify`.
4. Repeat for each planned commit; never stage the whole workspace before a multi-commit sequence.
5. Do not run formatting, lint, tests, or generated-file commands unless the user requests them as part of the commit task.
6. Push once after every commit succeeds when push was selected.
7. Finish with `git status --short --branch`.

## Cancel or Fail Safely

- On cancellation, remove only staging added by this workflow and keep any staging that existed beforehand.
- On a hook or push failure, keep successful commits intact, report the exact failure, and do not bypass safeguards automatically.
- Report each commit hash, English subject, included scope, push result, and final workspace state.
