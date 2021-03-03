# CI Pipeline general outline and workflow

* Deciders: Chi Chow
* Date: 2021-02-08

## Context and Problem Statement

The CI Pipeline should perform testing, linting, code formatting, documentation generation. Besides automated operations, how can code quality be ensured?

## Decision Drivers
* Developers should be able to review new completed features before using them in production
* Need a way to automatically perform the operations mentioned above, and also deploy the application

## Considered Options

* Testing, linting, code generation performed by GitHub actions
* Protected "main" branch, where code is automatically deployed
* Protected "dev" branch, which has the latest features that still require testing
* Feature branches perform pull requests and all merge into "dev", and only "dev" merges into "main"
* Coordinators review code in the "dev" branch and decide whether to deploy the application
* Separately forked repositories from the main repository, and perform cross-fork pull requests when some new code needs to be merged
* Code formatting in code editor vs. code formatting by GitHub actions

## Decision Outcome

* Testing, linting, code generation performed by GitHub Actions
* Code formatting happens on Github to accomodate developers using different IDEs
* Some CLI that can be used by both GitHub Actions and developers to format their code by some standard
* Protected "dev" and "main" branches, as stated above
* Pull requests are reviewed before merging