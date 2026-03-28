# Python Rules

## Code quality

- Use clear names, small functions, and cohesive modules.
- Enforce type hints on all function signatures.
- Use concise docstrings for public functions and classes when useful.

## Validation

- Validate inputs at function boundaries.
- Raise precise exceptions (ValueError, TypeError, or domain-specific).
- Do not allow invalid state to propagate.

## Architecture

- Prefer pure functions.
- Isolate I/O, network, and side effects into explicit adapters or services.
- Use dependency injection over global state.

## Import-time safety

- Do not perform at import time:
  - I/O
  - network calls
  - file reads
  - heavy computation
  - client construction
- Only allow:
  - imports
  - constants
  - type definitions
  - lightweight config

## Execution

- Keep executable logic inside functions or:
  if __name__ == "__main__":
- Do not trigger behavior on import.

## Dependencies

- Import required dependencies normally.
- Do not wrap required imports in try/except.
- Load optional dependencies only where needed and fail clearly if missing.

## Factories

- Create external clients (DB, APIs, SDKs, tools) via factory functions.
- Do not instantiate them at import time.

## Error handling

- Keep exception scope minimal.
- Catch only where you handle or add context.
- Re-raise with useful context.

## Testing

- Use pytest.
- Mock only external boundaries.
- Keep reusable fixtures in shared helpers.
- Ensure mocks reflect real data structures.

## Tooling

- Follow existing project tooling.
- If none exists, prefer:
  - pytest
  - Ruff
  - Uv