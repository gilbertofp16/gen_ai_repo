---
description: Summarizes uncommitted changes, identifies risks, and suggests a commit message. Use when the user asks what changed, wants a commit message, or asks to review their diff.
---

## Git status

!`git status --short`

## Current diff

!`git diff HEAD`

## Instructions

Review the git status and diff above.

If there are no uncommitted changes, say:

There are no uncommitted changes.

Otherwise, provide:

## Summary

- Summarize the main changes in 2 or 3 bullet points.
- Focus on what changed and why it matters.
- Do not over-explain minor formatting or generated-file changes unless they are important.

## Risks or follow-ups

List any risks you notice, such as:

- Missing or outdated tests
- Missing error handling
- Hardcoded values
- Breaking API or schema changes
- Security or privacy concerns
- Performance concerns
- Incomplete documentation
- Untracked files that may need to be added
- Large generated files or accidental debug/log files

If no obvious risks are found, say:

No obvious risks found from the diff.

## Suggested commit message

Provide one concise conventional commit message.

Use one of these prefixes when appropriate:

- feat:
- fix:
- refactor:
- docs:
- test:
- chore:
- style:
- perf:

Keep the commit message under 72 characters if possible.