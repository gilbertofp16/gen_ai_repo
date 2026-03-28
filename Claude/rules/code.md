# Core Engineering Rules

## Scope and enforcement

- These rules are mandatory unless the user explicitly overrides them.
- These rules take precedence over conversational suggestions.
- Work at the level of a senior software engineer in the target language and framework.

## Core behavior

- Do not assume missing context. Inspect the codebase first and ask when uncertainty could lead to a wrong change.
- Do not invent libraries, APIs, files, modules, functions, hooks, or components.
- Verify file paths, imports, exports, module names, and package names exist before referencing them.
- Reuse existing utilities, patterns, and abstractions before creating new ones.
- Keep changes minimal, focused, and aligned with the current architecture.
- When referring to paths, show the minimal relevant file or directory structure.

## Design principles

- Follow Clean Code principles:
  - meaningful names
  - small, focused functions
  - single responsibility
  - clear formatting
  - expressive tests
  - avoid duplication
- Follow SOLID principles:
  - Single Responsibility
  - Open/Closed
  - Liskov Substitution
  - Interface Segregation
  - Dependency Inversion

## Testing and validation

- For non-trivial changes, add or update unit tests.
- Mock data must match real data structures.
- Reuse shared fixtures or test helpers when possible.
- Validate inputs and outputs at system boundaries such as APIs, events, files, queues, and external services.
- Prefer outside-in tests and mock only true external boundaries such as HTTP, databases, queues, filesystem boundaries, and time.

## Dependencies and imports

- Verify dependency names, versions, and import paths before use.
- Required dependencies must be imported normally and not hidden behind defensive import fallbacks.
- Optional dependencies should be loaded only at the point of use and must fail with a precise error if unavailable.
- Do not silently continue after dependency or import failures.

## Error handling

- Define the error handling approach before coding when the task touches I/O, persistence, APIs, queues, auth, or external systems.
- Keep exception handling narrow. Catch only where you handle, translate, or add context.
- Fail fast with precise errors. Do not silently degrade required behavior.
- Do not swallow errors or continue with partial functionality.

## Performance awareness

- For algorithmic or throughput-sensitive code, state time complexity, space complexity, and any important performance tradeoffs.

## Security

- Never expose, log, hardcode, or commit secrets, API keys, tokens, credentials, private certificates, session cookies, or `.env` values.
- Never read from, parse, or suggest contents of ignored secret files such as `.env`, credential files, or other excluded configuration.
- Use environment-based injection or secure configuration providers for secrets.
- In tests, mock environment variables and secrets safely. Do not place real secret values in fixtures, snapshots, examples, or documentation.
- Do not return secrets in API responses, logs, thrown errors, debug output, browser console output, or client-visible state.
- Validate and sanitize untrusted input at all trust boundaries.
- Use least-privilege access for external services, credentials, and runtime permissions.
- Treat all external input as untrusted, including HTTP requests, headers, query params, form data, webhook payloads, queue messages, file uploads, and third-party API responses.
- Do not trust TypeScript types alone for security-critical boundaries. Use runtime validation where trust boundaries are crossed.