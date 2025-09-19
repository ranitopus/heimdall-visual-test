Architecture Decision Record (ADR) Template
===========================================
> Based on the model proposed in the article [*Documenting Architecture Decisions* - from **Michael Nygard**](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).
>
> - **You don't have to create an ADR for every single choice**: Be criterious with what would be considered a relevant/important Architecture Decision, and register only those; Don't bother creating a document like this for eveything, or else they miss their purpose, and making them will become unbearable.
> - You can **ask yourself some questions to help you assert if a decision should be registered or not**, and what you should register about it: "When the path changes in the future, how can anyone know why the project have been walking in the previous path, and why did the path change?" "How many parts are affected by this decision?" "Why is this process the one we follow?" "Why is this structure the one we use to organize the code and the project?" "Why is this the delivery cycle?" "Why is this the architecture of choice?".
> - **Don't be too fixated on writing everything on extensive detail** if you don't have to or don't want to, and don't feel obligated to fill every single topic of the ADR, but at the very least fill the 3 first ones: Context, Decision and Status.
>
> Copy the following content below as a template to a new file (name it in the format `0000-four-words-descriptive-name.md`, for example) and modify/fill it according to what is needed.

0 - Title
=========

## Context
What conditions and what moment created the need for this decision? What made we choose this?

## Decision
A full description of the decision: what is being proposed, the steps and modifications needed for it, etc.

## Status
There goes a list of some suggested statuses, but you should fit in more (or different ones) according to the project needs:
* `ANALYSIS` or `WAITING` (For when it's still being evaluated, not approved nor implemented yet)
* `IMPLEMENTED` or `APPLIED` (For when it's accepted and put into practice)
* `DEPRECATED` (For when it's not needed anymore or doesn't apply to the project anymore)
* `SUPERSEDED` or `REVERTED` (For when it's actively undone for any reason)
* `REJECTED` (For when it was evaluated but not accepted, and therefore not applied)

## Consequences
This decision leads to what side-effects (positive and negative ones)? What are the costs and gains of applying it?

## Applicability
Is this a one case scenario, or can it be used for multiple instances of similar problems? Could this decision be used in other places or other situations?

## Review Triggers
What could make we change the modifications that this decision brought to the project? What situations could make we opt for a different decision, or revert this one?
