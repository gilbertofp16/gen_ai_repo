# Node.js and Express.js Rules

## Architecture

- Keep business logic out of route handlers and middleware.
- Use clear layering:
  - routes
  - handlers/controllers
  - services
  - repositories/clients

## Handlers

- Handlers should:
  - validate input
  - call services
  - map results to responses
- Do not embed domain logic in handlers.

## Validation

- Validate all:
  - params
  - query
  - body
  - headers
  - env variables
  - external payloads
- Do not trust incoming data.

## Error handling

- Centralize HTTP error handling.
- Do not duplicate error mapping across handlers.
- Let services throw meaningful errors.
- Map errors once at the boundary.

## Middleware

- Use middleware only for cross-cutting concerns:
  - auth
  - logging
  - validation
  - tracing
- Do not hide business logic in middleware.

## Import-time safety

- Do not:
  - start servers
  - connect to DB
  - subscribe to queues
  - run jobs
  at import time
- Keep startup in explicit entrypoints.

## Dependencies

- Use dependency injection or factories for:
  - DB clients
  - SDKs
  - services
- Avoid hidden global singletons unless intentional.

## Async and reliability

- Handle async errors explicitly.
- Define:
  - retry strategy
  - timeouts
  - idempotency
  - failure behavior
for external interactions.

## Logging

- Log useful context only.
- Never log secrets or sensitive data.

## Testing

- Test services independently from HTTP layer.
- Mock only external systems.