# TypeScript Rules

- Use strict typing. No implicit `any`.
- Prefer `unknown` over `any` for untrusted input.
- Do not rely on TypeScript types as runtime guarantees.

## Runtime validation

- Validate all external input at system boundaries:
  - HTTP requests
  - env variables
  - queue/event payloads
  - third-party API responses
- Do not pass unvalidated data into domain logic.

## Type design

- Use precise types, not broad shapes.
- Prefer discriminated unions for state and domain modeling.
- Avoid unsafe type assertions unless strictly necessary and justified.
- Keep interfaces small and focused.

## Architecture

- Keep domain logic independent from frameworks.
- Separate:
  - domain logic
  - infrastructure (HTTP, DB, SDKs)
  - orchestration
- Prefer dependency injection over direct instantiation.

## Import-time safety

- Do not create side effects at module load time.
- Do not:
  - open DB connections
  - call APIs
  - read files
  - start jobs
- Export factories or functions instead.

## Async and errors

- Always handle async errors explicitly.
- No unhandled promises.
- Do not swallow errors or continue after failure.

## Testing

- Mock only external boundaries.
- Do not mock internal logic.
- Assert behavior, not implementation details.