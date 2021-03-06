window.addEventListener('DOMContentLoaded', () => {
    // Store number of pomos on refresh
    // if (localStorage.getItem('count') == null) {
    //     count = 0
    // } else {
    //     count = localStorage.getItem('count')
    // }

    //updatePomo()

    // Store theme on refresh
    loadTheme()

    // Store long break time on refresh
    loadTimerValues()

    // Store volume on refresh
    loadVolume()
})

// load theme

/**
 * Load the selected theme from local storage, or default to 'themeOrange'
 * Theme name is saved when a theme option is clicked
 */
function loadTheme() {
    const currentTheme = setTheme(getTheme() || 'themeOrange', false)
    const themeRadios = document.forms['themeOptions'].elements['themeOption']
    for (let i = 0; i < themeRadios.length; i++) {
        const radio = themeRadios[i]
        if (radio.value == currentTheme) {
            radio.checked = true
        }
        radio.onclick = () => {
            setTheme(radio.value, true)
        }
    }
}

/**
 * Changes the theme of the entire timer
 * @param {String} theme CSS class name of the theme to set
 * @param {Boolean} save whether to save to local storage
 * @returns the new theme
 */
function setTheme(theme, save) {
    document.documentElement.className = theme
    if (save) {
        saveTheme(theme)
    }
    return theme
}

function getTheme() {
    return localStorage.getItem('theme')
}

function saveTheme(theme) {
    localStorage.setItem('theme', theme)
}

// load work, break, long break times

let timerVals = undefined
let longBreakType = 'break15'

/**
 * Load timer values (work time, break time...) to use later
 * Load the long break type selected, which is used to access the correct break time in the loaded timer values
 * Break type is saved when a new break type is selected
 */
async function loadTimerValues() {
    /* global getTimerValues */
    timerVals = await getTimerValues()
    longBreakType = getLongBreak() || longBreakType
    const longBreakRadios = document.forms['breakOptions'].elements['breakOption']
    for (let i = 0; i < longBreakRadios.length; i++) {
        const radio = longBreakRadios[i]
        if (radio.value == longBreakType) {
            radio.checked = true
        }
        radio.onclick = () => {
            longBreakType = radio.value
            saveLongBreak(longBreakType)
        }
    }
}

function getLongBreak() {
    return localStorage.getItem('longBreakType')
}

function saveLongBreak(longBreakType) {
    localStorage.setItem('longBreakType', longBreakType)
}

function getVolume(volume) {
    return localStorage.getItem('volume')
}

/**
 * Gets the long break time from the timerVals object
 * @returns long break time
 */
function longBreakTime() {
    return timerVals.longBreakTimes[longBreakType]
}

/**
 * Gets the break time from the timerVals object
 * @returns break time
 */
function breakTime() {
    return timerVals.breakTime
}

/**
 * Gets the work time from the timerVals object
 * @returns work time
 */
function workTime() {
    return timerVals.workTime
}

// load volume

function loadVolume() {
    /* global getVolume */
    const currentVolume = getVolume()
    if (currentVolume != null) {
        volumeSlider.value = currentVolume
        changeVolume()
    }
}

// Navigation Bar
const navBar = document.getElementById('navBar')

function showNav() {
    if (navBar.style.width < '19vw') {
        navBar.style.width = '19vw'
    } else {
        navBar.style.width = '0%'
    }
}

// User starts timer in inner circle
const innerCircle = document.getElementById('innerCircle')
const title = document.getElementById('title')
const endButton = document.getElementById('end')
const breakButton = document.getElementById('break')
let checkTimerStart = false

//this is a bit of a garbage solution but I'm creating a variable to check if starting pomo or break since the current check with id won't quite fit
let pomoOrBreak = 'pomo'

function startTimerVisual(id) {
    console.log(pomoOrBreak)
    if (!checkTimerStart) {
        //originally was based on id, changed to this since we want the center button to both start pomos and breaks
        if (pomoOrBreak == 'pomo') {
            startTimer(workTime() * 60, true)
            endButton.innerHTML = 'Skip'
            title.innerHTML = 'Focus'
            pomoOrBreak = 'break'
        } else {
            if (count == 4) {
                startTimer(longBreakTime() * 60, false)
            } else {
                startTimer(breakTime() * 60, false)
            }

            endButton.innerHTML = 'Stop'
            title.innerHTML = 'Relax'
            pomoOrBreak = 'pomo'
        }

        breakButton.disabled = true
        endButton.disabled = false
        checkTimerStart = true
    }
}

// Pomodoro Timer
let timer = undefined
let count = 0

const pomo = document.forms['pomoDisplay'].elements['pomo']
const timeDisplay = document.getElementById('time')
const fruitIcon = document.getElementById('fruitIcon')
const timerStart = document.getElementById('timerStart')

const alarm = document.getElementById('alarm')

function startTimer(seconds, increment) {
    let time = seconds

    timeDisplay.style.visibility = 'visible'
    fruitIcon.style.visibility = 'visible'
    timerStart.style.visibility = 'hidden'
    displayTime(time)

    // reset # of pomos if full
    if (count == 4) {
        count = 0
        localStorage.setItem('count', count)

        updatePomo()
    }

    timer = setInterval(function () {
        if (time <= 0) {
            if (increment) {
                count++
                localStorage.setItem('count', count)
            }

            alarm.play()

            updatePomo()

            endTimer()

            if (increment) {
                //break can effectively be deleted if the issue I'm working on is correct
                //document.getElementById('break').style.display = 'block'
                endButton.disabled = true
            } else {
                breakButton.disabled = true
                endButton.disabled = true
            }
        } else {
            time -= 1
            displayTime(time)
        }
    }, 1000)
}

//Takes in time value, converts into MM:SS format
//sets time element in html accordingly
function displayTime(time) {
    let seconds = time % 60
    let minutes = Math.floor(time / 60)
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    document.getElementById('time').innerHTML = minutes + ':' + seconds
}

function endPomo() {
    endTimer()
    endButton.disabled = true
}

function updatePomo() {
    // Fill in pomo based on count
    for (let i = 0; i < pomo.length; i++) {
        pomo[i].checked = i < count
    }
}

function endTimer() {
    console.log('timer ending, pomoOrBreak = ' + pomoOrBreak)
    clearInterval(timer)
    checkTimerStart = false

    //another if else to deal with updated central button
    if (pomoOrBreak == 'break') {
        title.innerHTML = 'Time For a Break'
        timerStart.innerHTML = 'Break'
    } else {
        title.innerHTML = 'Ready to Work?'
        timerStart.innerHTML = 'Start'
    }
    timeDisplay.style.visibility = 'hidden'
    fruitIcon.style.visibility = 'hidden'
    timerStart.style.visibility = 'visible'
}

const skipPopup = document.getElementById('skip-popup')
const skipConfirm = document.getElementById('skip-confirm')
const skipCancel = document.getElementById('skip-cancel')

skipConfirm.addEventListener('click', () => {
    skipPopup.style.display = 'none'
    endPomo()
})

skipCancel.addEventListener('click', () => {
    skipPopup.style.display = 'none'
})

function skipOrStop() {
    if (endButton.innerHTML == 'Skip') {
        skipPopup.style.display = 'block'
    } else {
        endPomo()
    }
}

const volumeSlider = document.getElementById('volume-slider')
const volumeNumber = document.getElementById('volume-number')
const volumeImage = document.getElementById('volume-image')

function changeVolume() {
    localStorage.setItem('volume', volumeSlider.value)

    volumeNumber.innerHTML = volumeSlider.value
    alarm.volume = volumeSlider.value / 100

    if (volumeSlider.value == 0) {
        volumeImage.src = './images/volume-level-0.svg'
    } else if (volumeSlider.value >= 1 && volumeSlider.value <= 33) {
        volumeImage.src = './images/volume-level-1.svg'
    } else if (volumeSlider.value >= 34 && volumeSlider.value <= 66) {
        volumeImage.src = './images/volume-level-2.svg'
    } else {
        volumeImage.src = './images/volume-level-3.svg'
    }

    const value = ((volumeSlider.value - volumeSlider.min) / (volumeSlider.max - volumeSlider.min)) * 100
    volumeSlider.style.background =
        'linear-gradient(to right, var(--main-light-color) 0%, var(--main-light-color) ' + value + '%, #fff ' + value + '%, white 100%)'
}
