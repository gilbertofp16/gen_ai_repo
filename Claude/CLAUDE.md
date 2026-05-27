Follow all rules in `.claude/rules/`.

Language selection:
- Apply `python.md` for Python code.
- Apply `typescript-node.md` for TypeScript, JavaScript, and Node.js code.

Writing and communication:
- Write as an engineer explaining to a colleague.
- Be direct, concise, and specific.
- Use active voice and concrete examples.
- Avoid filler, marketing language, and unnecessary summaries.
- Do not use em dashes, en dashes, double dashes, or smart punctuation.
- Avoid overused phrases (comprehensive, robust, etc.).
- Use Australian English spelling.

Documentation:
- Keep high signal-to-noise ratio.
- Prefer configuration and examples over feature lists.
- Start with what it does, not why.
- Do not create new markdown files unless explicitly requested.
- Update existing files or respond in chat instead.
- Code comments explain why, not what.

Architecture and design:
- Favour simplicity first. Avoid unnecessary abstractions.
- Introduce abstractions only after repeated patterns (3+ times).
- Follow SOLID principles where appropriate.
- Prefer composition over inheritance.
- Reuse existing components and utilities.

Code quality:
- Functions max 50 lines.
- Files max 700 lines.
- Cyclomatic complexity under 10.
- Maintain consistency with the existing codebase.

Configuration:
- Use .env as single source of truth.
- Provide .env.example.
- Validate environment variables on startup.

Security:
- Never hardcode secrets or credentials.
- Validate and sanitise all inputs.
- Use parameterised queries only.
- Do not expose internal errors.

Error handling:
- Use structured logging (JSON) with correlation IDs.
- Use appropriate log levels.
- Fail gracefully.
- Retry transient failures with backoff.

Testing:
- Write tests for non-trivial logic.
- Use Arrange-Act-Assert.
- Cover edge cases and error paths.
- Avoid external dependencies.
- Tests must assert behaviour.

Language preferences:

Python:
- Use type hints everywhere.
- Use dataclasses for structured data.
- Prefer pathlib over os.path.
- Use f-strings.
- Use uv for environment management.

TypeScript:
- Strict mode always.
- Avoid any, prefer unknown.
- Use discriminated unions over enums.
- Use readonly where possible.
- Prefer async/await.
- Do not hardcode styles.

Bash:
- Use `#!/usr/bin/env bash` with `set -euo pipefail`.
- Quote all variables.
- Use [[ ]] for conditionals.

Tool usage:

CLI:
- Prefer simple commands over complex one-liners.
- Avoid chaining commands with pipes or redirections unless necessary.
- Always quote paths.
- Use run_silent when output is not required.

Code navigation:
- Prefer LSP tools over grep.
- Use goToDefinition, findReferences, etc.
- Check diagnostics after edits.

Execution behaviour:

Autonomy:
- Execute all steps within a phase without asking for confirmation.
- Do not ask "shall I proceed?" or similar.
- Do not ask for permission for safe, local actions:
  - reading files
  - writing project files
  - running non-destructive commands
- Only pause when:
  - action is destructive or irreversible
  - action affects external systems (production, payments, shared infra)

Execution style:
- Complete tasks fully before returning.
- Prefer direct edits over proposals when safe.
- Minimise back-and-forth.
- Break work into phases but complete each phase fully.

Constraints:
- Do not create files unless required.
- Edit only what is necessary.
- Do not add placeholder implementations.

Sub-agents:
- Define clear ownership per agent.
- Avoid overlapping file edits.
- Use parallel agents only when beneficial.

Self-review:
- Before completion:
  - lint passes
  - build succeeds
  - tests pass
  - no debug code remains
  - error handling is present

Hard rules:
- Never claim something is fixed without verification.
- Never hardcode secrets or identifiers.
- Never give time estimates.
- Never add process comments.
- Never implement mocked functionality unless requested.


Execution control:

- Execute all tasks inside a phase without stopping for confirmation or review.
- At the end of each phase: create a branch (if not already on one), commit the phase work, then pause for human review.
- After review approval: push and open a PR.
- Do not ask for confirmation during execution unless the action is destructive or irreversible.
- Treat development plans as executable instructions, not suggestions.

Stopping behaviour:

- If the instruction explicitly says "stop after phase X", then:
  - complete that phase fully
  - stop and wait for user input before continuing
- If no stop condition is specified, continue until the full task is complete.

Decision boundaries:

- Continue execution automatically for:
  - file edits within the project
  - refactoring
  - adding tests
  - running safe local commands

- Always pause and ask for confirmation before:
  - deleting files or large code sections
  - modifying external systems
  - running migrations
  - performing git push

---

Git workflow:

- Never commit directly to main or master.
- Always create a feature branch for changes.

Branching:
- Use descriptive branch names (e.g. feature/<context>, fix/<context>).

Commits:
- Keep commits small and scoped.
- Write clear commit messages describing intent.

Pull requests:
- Prefer PR workflow over direct commits.
- Group related changes into a single PR.

Push behaviour:
- Never push automatically without confirmation.
- Before any git push:
  - summarise changes
  - ask for explicit approval

Restrictions:
- Never push without explicit confirmation.
- Never commit directly to main or master.