# Python Rules

## Code quality

- Use clear names, small functions, and cohesive modules.
- Enforce type hints on all function signatures.
- Use PEP 257 docstrings on every public class or function. Include a "See also" section linking to related utilities or modules.
- Avoid code comments. Functions should be self-documenting with expressive names.
- One logical statement per line. No chained assignments or multiple expressions per line.
- Prefer a single exit point per function where practical.
- Limit method signatures to at most three parameters.
- Group related functions into modules rather than monolithic files.

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

- Keep executable logic inside functions or `if __name__ == "__main__":`.
- Provide a small `main()` and call it from the guard. Tests and CLIs must call functions, not run logic at import time.
- Do not trigger behavior on import.
- Do not call `asyncio.run` at import time or inside lambdas defined at import time. Provide small sync adapters inside functions or the main guard when bridging sync and async code.

## Dependencies

- Import required dependencies normally.
- Do not wrap required imports in try/except.
- Load optional dependencies only where needed and fail clearly if missing.

## Factories

- Create external clients (DB, APIs, SDKs, tools) via factory functions.
- Do not instantiate them at import time.
- Any CrewAI or LangChain tool or agent must be created by a factory function so creation side effects are explicit and testable.

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
  - uv
- Follow a Cookiecutter-style project layout: `src/`, `tests/`, `pyproject.toml`, `README.md`, `docs/`.