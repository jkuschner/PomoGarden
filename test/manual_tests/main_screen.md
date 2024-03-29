# Main Screen Button Functionality Manual Testing

### Description:

The following are tests to check the current and future builds for the main button functionalities.

## Checklist

-   [ ] Clicking the 'Start' button starts the countdown of the focus session
-   [ ] The title changes after clicking 'Start' to indicate the focus session
-   [ ] The 'Skip' prompts a warning
    -   [ ] If approved - goes to break
    -   [ ] If denied - continues the countdown from where it stopped
-   If _not_ interruption, after the countdown has finished:
    -   [ ] Break button appears
    -   [ ] Title changes to indicate it's break time
    -   [ ] A single pomo is added (below the main button)
    -   [ ] The break timer doesn't start automatically
-   If interrupted the focus session:
    -   [ ] Jumps to break
    -   [ ] Doesn't add pomo to the pomo counts
-   [ ] Clicking on 'Break' starts the break session
-   [ ] Clicking on 'Break' changes the title to indicate the break session
-   [ ] In break session - 'Stop' button causes to jump to the beginning of a new focus session (without starting it)
-   [ ] After 4 full pomos, a longer break is given
-   Sound is provided when:
    -   [ ] End focus session
    -   [ ] End relax session
