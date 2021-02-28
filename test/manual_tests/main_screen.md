# Main Screen Button Functionality Manual Testing 

### Description:
The following are tests to check the current and future builds for the main button functionalities.

## Checklist
### Functionality
- [ ] Clicking the 'Start' button starts the countdown of the focus session
- [ ] The title changes after clicking 'Start' to indicate the focus session
- [ ] The 'Skip' prompts a warning
  - [ ] If approved - goes to break
  - [ ] If denied - continues the countdown where it stopped
- If not interruption, after the countdown has finished:
  - [ ] Break button appears
  - [ ] Title changes to indicate it's break time
  - [ ] A single pomo is added (below the main button)
  - [ ] The break timer doesn't start automatically
- If interrupted the focus session:
  - [ ] Jumps to break 
  - [ ] Doesn't add pomo to the pomo counts
- [ ] Clicking on 'Break' starts the break session
- [ ] Clicking on 'Break' changes the title to indicate the break session
- [ ] In break session - 'Stop' button causes to jump to the beginning of a new focus session (without starting it)
- [ ] After 4 full pomos, a longer break is given
- Sound is provided when:
  - [ ] Start focus session
  - [ ] End focus session
  - [ ] Start relax session
  - [ ] End relax session 

### Appearance 
- [ ] 'Start' / 'Break' text is centered within the circle 
- [ ] 'Start' / 'Break' text is clear and visible (over the background) 
- [ ] Titles are clear and visible (over the background) 
- [ ] Changing the theme color changes the color of the inner, outer circles, and the 4 small circles