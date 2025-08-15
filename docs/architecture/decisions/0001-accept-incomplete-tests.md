1 - Accept `unit-testing` branch even without finishing all the unit tests
==========================================================================

## Context
(...)

## Decision
The work done in the `unit-testing` branch should be merged with the rest of the project, even if we still have some source code that weren't covered with unit tests. This decision results in the following topics:
- The `unit-testing` branch should be integrated/merged into the primary branch (`main`);
- The project, now updated with the `unit-testing` branch current content, should be published again to the NPM registry as a new version;
- Any new code should be created with unit testing already in mind (preferably following TDD), since now the primary branch will have all the structure to do so, provided by the `vitest` dependency that came from the `unit-testing` branch;
- The `unit-testing` branch should still exist, with the purpose of implementing unit tests for the existing code that is marked (with placeholders in the testing spec files) to be tested;
- Because the `unit-testing` branch will still exist with the same purpose of providing unit testing coverage, the associated milestone in the roadmap will still be considered "In Progress", being marked as finished only when all code that was marked to be tested is finally tested.

## Status
* `ANALYSIS`

## Consequences
(...)

## Applicability
(...)

## Review Triggers
(...)
