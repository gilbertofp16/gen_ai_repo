# React Rules

## Components

- Keep components small, focused, and single-purpose.
- Do not mix rendering, data fetching, and business logic in one component.
- Extract reusable logic into custom hooks or services.

## State

- Keep state minimal and local.
- Do not duplicate derived state.
- Distinguish:
  - UI state
  - server state
  - derived state

## Hooks

- Follow rules of hooks strictly.
- Keep custom hooks focused on one responsibility.
- Do not hide critical logic inside unclear hooks.

## Effects

- Do not use `useEffect` for pure computations.
- Avoid chained or implicit effects.
- Keep side effects explicit and controlled.
- Always clean up subscriptions, timers, and listeners.

## Props and typing

- Type props explicitly.
- Keep prop contracts narrow and intentional.
- Avoid overly flexible or optional-heavy interfaces.

## Rendering and performance

- Avoid premature optimization.
- Use memoization only when it improves real behavior.
- Avoid unnecessary re-renders caused by unstable references.

## Data handling

- Model loading, empty, success, and error states explicitly.
- Do not assume data is always available.

## Accessibility

- Use semantic HTML by default.
- Ensure keyboard navigation and focus handling.
- Do not introduce inaccessible custom components when native elements suffice.

## Testing

- Test user-visible behavior.
- Do not test implementation details.