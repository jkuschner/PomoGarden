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

function getVolume() {
    return localStorage.getItem('volume')
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
    } else if (volumeSlider.value <= 33) {
        volumeImage.src = './images/volume-level-1.svg'
    } else if (volumeSlider.value <= 66) {
        volumeImage.src = './images/volume-level-2.svg'
    } else {
        volumeImage.src = './images/volume-level-3.svg'
    }

    const value = ((volumeSlider.value - volumeSlider.min) / (volumeSlider.max - volumeSlider.min)) * 100
    volumeSlider.style.background =
        'linear-gradient(to right, var(--main-light-color) 0%, var(--main-light-color) ' + value + '%, #fff ' + value + '%, white 100%)'
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
const timerStart = document.getElementById('timerStart')

//this is a bit of a garbage solution but I'm creating a variable to check if starting pomo or break since the current check with id won't quite fit
let pomoOrBreak = 'pomo'

function startTimerVisual() {
    console.log(pomoOrBreak)
    innerCircle.disabled = true
    endButton.disabled = false

    if (pomoOrBreak == 'pomo') {
        startPomoTimer(workTime())
        endButton.innerHTML = 'Skip'
        title.innerHTML = 'Focus'
        pomoOrBreak = 'break'
    } else {
        if (count == NUM_POMOS) {
            startBreakTimer(longBreakTime())
        } else {
            startBreakTimer(breakTime())
        }

        endButton.innerHTML = 'Stop'
        title.innerHTML = 'Relax'
        pomoOrBreak = 'pomo'
    }
}

// Pomodoro Timer
let timer = undefined
let count = 0

const NUM_POMOS = 4
const pomo = document.forms['pomoDisplay'].elements['pomo']
const timeDisplay = document.getElementById('time')

const alarm = document.getElementById('alarm')

function startPomoTimer(seconds) {
    timeDisplay.style.visibility = 'visible'
    displayTime(seconds)

    /* global startTimer */
    timer = startTimer(seconds, secondsRemaining => {
        displayTime(secondsRemaining)

        if (secondsRemaining <= 0) {
            count++
            localStorage.setItem('count', count)

            alarm.play()
            updatePomo()
            endTimer()
        } else {
            draw(secondsRemaining, seconds, 1, false)
        }
    })
}

function startBreakTimer(seconds) {
    timeDisplay.style.visibility = 'visible'

    /* global startTimer */
    timer = startTimer(seconds, secondsRemaining => {
        displayTime(secondsRemaining)

        if (secondsRemaining <= 0) {
            if (count == NUM_POMOS) {
                count = 0
                localStorage.setItem('count', count)
                updatePomo()
            }

            alarm.play()
            endTimer()
        } else {
            draw(secondsRemaining, seconds, 1, true)
        }
    })
}

// Fruit animation
const MS_PER_SECOND = 1000, FPS = 60, DELAY = MS_PER_SECOND / FPS
let fruitAnimation = undefined

function draw(start, total, duration, reverse) {
    const frameCount = duration * FPS
    const dAlpha = 2 * Math.PI * DELAY / (total * MS_PER_SECOND)
    let frame = 1, alpha = 2 * Math.PI
    if (reverse) {
        alpha *= (start / total)
    } else {
        alpha *= (1 - start / total)
    }
    drawFrame(alpha) // draw first frame immediately

    const anim = setInterval(() => {
        if (frame >= frameCount) {
            clearInterval(anim)
        } else {
            if (reverse) {
                alpha -= dAlpha
            } else {
                alpha += dAlpha
            }
            drawFrame(alpha)
            frame++
        }
    }, DELAY)
    fruitAnimation = anim
}

const border = document.getElementById('border')
function drawFrame(alpha) {
    const x = Math.sin(alpha) * 125,
    y = Math.cos(alpha) * -125,
    mid = alpha > Math.PI ? 1 : 0,
    anim = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' + x + ' ' + y + ' z'

    border.setAttribute('d', anim)
}

//sets time element in html accordingly
function displayTime(time) {
    /* global formatTime */
    timeDisplay.innerHTML = formatTime(time)
}

function updatePomo() {
    // Fill in pomo based on count
    for (let i = 0; i < pomo.length; i++) {
        pomo[i].checked = i < count
    }
}

function endTimer() {
    clearInterval(fruitAnimation)
    clearInterval(timer)

    innerCircle.disabled = false
    endButton.disabled = true

    //another if else to deal with updated central button
    if (pomoOrBreak == 'break') {
        innerCircle.style.backgroundColor = 'var(--main-bg-color)'
        document.getElementById('title').innerHTML = 'Time For a Break'
        timerStart.innerHTML = 'Break'
    } else {
        innerCircle.style.backgroundColor = 'var(--main-light-color)'
        document.getElementById('title').innerHTML = 'Ready to Work?'
        timerStart.innerHTML = 'Start'
    }
    timeDisplay.style.visibility = 'hidden'
}

const skipPopup = document.getElementById('skip-popup')
const skipConfirm = document.getElementById('skip-confirm')
const skipCancel = document.getElementById('skip-cancel')

skipConfirm.addEventListener('click', () => {
    skipPopup.style.display = 'none'
    endTimer()
})

skipCancel.addEventListener('click', () => {
    skipPopup.style.display = 'none'
})

function skipOrStop() {
    if (endButton.innerHTML == 'Skip') {
        skipPopup.style.display = 'block'
    } else {
        endTimer()
    }
}
