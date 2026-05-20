# Development Plan for [PROJECT_NAME]

## Project Purpose and Goals

[PROJECT_PURPOSE_AND_GOALS]

## Context and Background

[PROJECT_CONTEXT_AND_BACKGROUND]

## Hard Requirements

- [REQUIREMENT_1]
- [REQUIREMENT_2]
- [REQUIREMENT_3]

## Unknowns and Assumptions

### Unknowns

- [UNKNOWN_1]
- [UNKNOWN_2]

### Assumptions

- [ASSUMPTION_1]
- [ASSUMPTION_2]

## Architecture Considerations

- [ARCHITECTURE_CONSIDERATION_1]
- [ARCHITECTURE_CONSIDERATION_2]

## Development Phases

### Phase 1: Context Gathering and Project Review

- [ ] Read all relevant project files
- [ ] Review existing documentation, including `README.md`, `docs/`, setup guides, and architecture notes
- [ ] Analyse the codebase structure and dependencies
- [ ] Identify coding conventions and patterns already used
- [ ] Review existing tests and expected behaviour
- [ ] Identify integration points, external services, and environment requirements
- [ ] Confirm implementation scope, constraints, and risk level

### Phase 2: Requirements and Design Validation

- [ ] Confirm hard requirements
- [ ] Confirm user flows or system flows
- [ ] Identify edge cases and failure modes
- [ ] Identify data requirements and validation rules
- [ ] Identify security, privacy, and access-control considerations
- [ ] Confirm non-functional requirements such as performance, reliability, and maintainability

### Phase 3: Implementation Preparation

- [ ] Identify files or modules likely to change
- [ ] Define required new files, modules, components, services, or utilities
- [ ] Define required API, schema, configuration, or dependency changes
- [ ] Define test coverage required before implementation
- [ ] Confirm whether existing patterns should be reused or refactored

### Phase 4: Implementation Tasks

- [ ] Implement [FEATURE_OR_CHANGE]
  - [ ] [SUBTASK]
  - [ ] [SUBTASK]
- [ ] Update related interfaces, types, schemas, or contracts
- [ ] Handle expected error states and edge cases
- [ ] Ensure implementation follows existing project conventions

### Phase 5: Testing and Validation

- [ ] Add or update unit tests
- [ ] Add or update integration tests if required
- [ ] Add regression tests for known issues if relevant
- [ ] Run existing test suite
- [ ] Validate expected behaviour manually where needed
- [ ] Verify edge cases and failure states

### Phase 6: Documentation and Handoff

- [ ] Update documentation if required
- [ ] Document any new environment variables or configuration
- [ ] Document any migration, deployment, or rollback considerations
- [ ] Summarise implementation decisions for handoff

## Debugging Protocol

Use this protocol if issues appear during implementation:

- [ ] If tests fail, analyse the failure reason and fix the root cause
- [ ] If performance issues appear, profile and optimise critical paths
- [ ] If integration issues appear, check dependencies, interfaces, contracts, configuration, and data shape assumptions
- [ ] If behaviour is inconsistent, reproduce the issue before changing logic
- [ ] If the issue is intermittent, add logging or instrumentation before changing logic
- [ ] If the fix is risky, add regression tests before changing implementation

## QA Checklist

- [ ] All user instructions followed
- [ ] All requirements implemented and tested
- [ ] No critical code smell warnings
- [ ] Code follows project conventions and standards
- [ ] Documentation is updated and accurate if needed
- [ ] Security considerations addressed
- [ ] Performance requirements met
- [ ] Integration points verified
- [ ] Deployment readiness confirmed
- [ ] Unit tests added or updated where relevant
- [ ] Integration tests added or updated where relevant
- [ ] Regression tests added for known bugs where relevant
- [ ] Error states handled
- [ ] Edge cases covered
- [ ] Logging and observability reviewed if relevant
- [ ] Rollback path documented if relevant
- [ ] Backward compatibility verified if relevant
- [ ] Data migration validated if relevant
- [ ] Secrets and environment variables handled safely

## Out of Scope

- [OUT_OF_SCOPE_ITEM_1]
- [OUT_OF_SCOPE_ITEM_2]

## Stop Point

Stop after creating this plan and wait for user review before implementation.