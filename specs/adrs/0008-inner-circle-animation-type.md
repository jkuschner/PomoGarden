# Type of the inner circle's animation

* Deciders: All
* Date: 2021-02-23


## Context and Problem Statement

In our Figma design wireframe, there are two types of inner circle animation. The first one is that the inner circle disappear/appears clockwise and counterclockwise. The second one is that it drains from top to bottom and refills from bottom to top. 

## Decision Drivers

* The draining animation is harder to implement
* Keep the app as simple as possible

## Considered Options

* Two different animations for different kinds of fruit
* Use clock-like animation
* Use drain/refill animation

## Decision Outcome

Chosen option: "Use clock-like animation" because our app is essentially a timer. The clock-like animation allows the user to feel the timer more intuitively. Also, because the drain/refill animation is harder to implement.

### Positive Consequences

* Intuitive
* Uniform animation
* Easier to implement

### Negative Consequences

* Such animations do not fit with the nature of certain fruit themes. For example, we would not drink coconut juice in a clockwise direction.
