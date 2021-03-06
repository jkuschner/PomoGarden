# Use npm for all components in CI pipeline

* Deciders: Chi Chow
* Date: 2021-02-09

## Context and Problem Statement

All components in the CI pipeline should be straightforward and easily testable on each developer's local machine.

## Decision Drivers
* Developers should be able to run the same tests as the CI pipeline does
* All operations that will be done by the CI pipeline can be previewed before running the workflow on GitHub actions

## Considered Options

* Jest (testing)
* JSDoc (documentation generation)
* ESLint (linting)

## Decision Outcome

Use npm with Jest, JSDoc, and ESLint, so that all components in the CI pipeline can be managed in the same place. Developers can run tasks like ```npm run test``` defined in ```package.json```, to preview the output of the CI pipeline workflow runs. This is easy and straightforward for all developers, and they can use this to perform different operations before making a pull request.