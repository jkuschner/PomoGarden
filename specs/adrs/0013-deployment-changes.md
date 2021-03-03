# Deployment and documentation generation changes

* Deciders: Chi Chow
* Date: 2021-02-17

## Context and Problem Statement

So far documentation is generated every time code is pushed to the "main" branch. This proved to be a problem because:
* Merge conflicts happen frequently when updating code from the "main" branch, due to the generated documentation
* There is no way to view the documentation anyway

The "main" and "dev" branches concept is not very effective, beacuse we may want to modify the source code in deployment, e.g. different times in the Pomodoro timer in production vs. development.

## Considered Options

* Use a task to bundle source code with other files for deployment
* Host documentation along with the deployed application

## Decision Outcome

Using the ```gh-pages``` package in npm allows us to solve these two problems simultaneously. Deployment is no longer done when new code is pushed to "main", but must be deployed manually:
*  Run ```npm run build``` to generated a ```build/``` directory that bundles the source code and documentation
*  Run ```npm run deploy``` to deploy push the build to GitHub Pages

The deployed code is in the ```gh-pages``` branch. It only has the source code necessary for the application, along with the documentation that can be accessed via another link. This system allows us to perform more complicated builds if necessary in the future.