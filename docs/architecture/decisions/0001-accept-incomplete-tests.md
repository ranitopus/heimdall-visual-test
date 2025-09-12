1 - Accept `unit-testing` branch even without finishing all the unit tests
==========================================================================

## Context
Originally, the `unit-testing` branch would only serve to introduce tests for the already existing code. But, during the progress of this milestone, many improvements in the code structure and project documentation were started in this branch. Also, the progress of the unit testing coverage has been very stagnant, very slow, in a way that we couldn't even work on new milestones. If we wanted to start developing other milestones for this project, they wouldn't even have access to a testing suite, nor to other improvements, because it's contained to the `unit-testing` branch. So, it appears to be more beneficial if all the things that until now were exclusive to the `unit-testing` branch could be available to the primary branch (`main`), and also to the consumers of this project as a dependency (but without abandoning the objective of finishing test coverage for the already targeted code).

## Decision
The work done in the `unit-testing` branch should be merged with the rest of the project, even if we still have some source code that weren't covered with unit tests. This decision results in the following topics:
- The `unit-testing` branch should be integrated/merged into the primary branch (`main`);
- The project, now updated with the `unit-testing` branch current content, should be published again to the NPM registry as a new version;
- Any new code should be created with unit testing already in mind (preferably following TDD), since now the primary branch will have all the structure to do so, provided by the `vitest` dependency that came from the `unit-testing` branch;
- The `unit-testing` branch should still exist, with the purpose of implementing unit tests for the previously existing code that is marked (with placeholders in the testing spec files) to be tested;
- Because the `unit-testing` branch will still exist with the same purpose of providing unit testing coverage, the associated milestone in the roadmap will still be considered "In Progress", being marked as finished only when all code that was marked to be tested is finally tested.

## Status
* `ANALYSIS`

## Consequences
- Possibility of starting and progressing on new milestones simultaneously, which can even enable other people to join in on completing the roadmap, but also compromises the original sequential plan;
- Providing the already existing improvements to the main code and to the consumers;
- Keeping alive the task of completing test coverage for the existing code, which also comes with the negative possibility of progressing on other matters while forgetting to finish this one;
- Introducing an unfinished milestone to the main code, which compromises the original sequential roadmap (the milestone isn't considered finished as-is, it's still progressing);
- The milestone had one scope, but we're letting it introduce things unrelated to it's original scope;
- Since we've changed the source code to use ES Modules syntax, for this new version we will need some specific steps to be respected in the consumer side in case they intend to use our Cypress functionalities (or in case they import any of our content to be used inside CommonJS Modules).

## Applicability
- This decision shouldn't be repeated too much over time (in case we think about merging other unfinished milestones in the future): We should care more to comply to the original roadmap, and to only merge new things if they're finished;
- If some circumstances demand change, we should try first to rethink the scope of the milestone, instead of opting for integrating an unfinished one;
- We should not mix improvements out of the original milestone scope in the same branch: So, before we think about taking a similar decision in the future, we should first think if it wouldn't be better to break the original milestone into different, smaller milestones/scopes, and separating different milestones/scopes into different branches;
- A similar decision should only be considered under very few scenarios; Some of them:
  - Delayed or stagnant progress, to the point of not being able to progress other milestones;
  - Introduction of improvements that come from the partial progress of the milestone;
  - Introduction of improvements that were not part of the original milestone but were made on it's branch.

## Review Triggers
Once the `unit-testing` branch current content is merged into the main code and a new version is available to the NPM registry, it should only be reverted/overwritten/republished in the single situation of compromising the overall provided functionality (if it stops working no matter what you do), or exposing the consumer to any danger/vulnerabilities.
