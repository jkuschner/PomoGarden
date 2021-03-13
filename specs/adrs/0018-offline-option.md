# Offline Option

* Deciders: All
* Date: 2021-03-05


## Context and Problem Statement
In case the user wants to disconnect from the internet to avoid distractions or is located in an area with an unstable connection, the user couldn't use our app.

## Considered Options
* Enable offline option (using cache).
* Don't support offline functionality.
* Create a downloadable app.

## Decision Outcome
Chosen option: Enable the offline option
* The focus of the class wasn't on creating a fully working app. Going in that route will be a deviation of our task and very time-consuming.
* It would be ideal for supporting people online, especially when possible, without too much preparation on their side (download, etc.)
* Once visiting our website, the cache will get all the necessary files to support the pomo app. Then while the cache is still there, the user can go offline but still enjoy our app.
* If the user visits your website frequently, it's likely that the cache will still hold the necessary files for later use (without an internet connection).
