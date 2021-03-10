// PWA service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pomo-sw.js')
}

window.addEventListener('DOMContentLoaded', () => {
    // Store number of pomos on refresh
    // if (localStorage.getItem('count') == null) {
    //     count = 0
    // } else {
    //     count = localStorage.getItem('count')
    // }

    // Store theme on refresh
    loadTheme()

    // Store long break time on refresh
    loadTimerValues()

    // Store volume on refresh
    loadVolume()

    // set mode to Pomo on start
    setPomoMode(true)
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
    setFavicon(theme.substr(5))
    return theme
}

/**
 * Changes the favicon
 * @param {String} fruitName name of fruit to set the favicon to
 */
function setFavicon(fruitName) {
    document.getElementById('favicon').href = '../images/favicon/' + fruitName + '_favicon.png'
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
        volumeImage.src = '../images/volume-level-0.svg'
    } else if (volumeSlider.value <= 33) {
        volumeImage.src = '../images/volume-level-1.svg'
    } else if (volumeSlider.value <= 66) {
        volumeImage.src = '../images/volume-level-2.svg'
    } else {
        volumeImage.src = '../images/volume-level-3.svg'
    }

    const value = ((volumeSlider.value - volumeSlider.min) / (volumeSlider.max - volumeSlider.min)) * 100
    volumeSlider.style.background =
        'linear-gradient(to right, var(--main-light-color) 0%, var(--main-light-color) ' + value + '%, #fff ' + value + '%, white 100%)'
}

// Navigation Bar
const navBar = document.getElementById('navBar')
function showNav() {
    if (navBar.style.right < '1vh') {
        navBar.style.right = '1vh'
    } else {
        navBar.style.right = '-36vh'
    }
}

// User starts timer in inner circle
const innerCircle = document.getElementById('innerCircle')
const title = document.getElementById('title')
const skipButton = document.getElementById('skip')
const resetButton = document.getElementById('reset')
const timerStart = document.getElementById('timerStart')
const modalText = document.getElementById('modal-text')

let timerFunc = undefined,
    stopFunc = undefined
function setPomoMode(isPomo) {
    if (isPomo) {
        innerCircle.style.backgroundColor = 'var(--main-light-color)'
        title.innerHTML = 'Ready to Work?'
        timerStart.innerHTML = 'Start'
        modalText.innerHTML = 'Are you sure you want to break this work session?'
        timerFunc = () => {
            startPomoTimer(workTime())
        }
        stopFunc = skipPomo
    } else {
        innerCircle.style.backgroundColor = 'inherit'
        title.innerHTML = 'Time For a Break'
        timerStart.innerHTML = 'Break'
        modalText.innerHTML = 'Are you sure you want to reset the entire Pomo?'
        timerFunc = () => {
            const bt = count == NUM_POMOS ? longBreakTime() : breakTime()
            startBreakTimer(bt)
        }
        stopFunc = resetPomo
    }
}

function startTimerVisual() {
    innerCircle.disabled = true
    innerCircle.style.backgroundColor = 'inherit'
    timerFunc()
}

// Pomodoro Timer
let timer = undefined
let count = 0

const NUM_POMOS = 4
const pomo = document.forms['pomoDisplay'].elements['pomo']
const timeDisplay = document.getElementById('time')
const pulseCircle = document.getElementsByClassName('pulseCircle')
const alarm = document.getElementById('alarm')

function startPomoTimer(seconds) {
    title.innerHTML = 'Focus'
    timeDisplay.style.visibility = 'visible'
    skipButton.disabled = false
    displayTime(seconds)

    // pulseCircle[0].style.visibility = 'hidden'
    // pulseCircle[1].style.visibility = 'hidden'
    // pulseCircle[2].style.visibility = 'hidden'
    // pulseCircle[3].style.visibility = 'hidden'

    /* global startTimer */
    timer = startTimer(seconds, (secondsRemaining) => {
        displayTime(secondsRemaining)

        if (secondsRemaining <= 0) {
            setCount(count + 1)

            alarm.play()
            endTimer()
            setPomoMode(false)
            skipButton.disabled = true
        }
    })
    drawCircle(seconds, false)
}

function startBreakTimer(seconds) {
    title.innerHTML = 'Relax'
    timeDisplay.style.visibility = 'visible'
    resetButton.disabled = false
    displayTime(seconds)

    timer = startTimer(seconds, (secondsRemaining) => {
        displayTime(secondsRemaining)

        if (secondsRemaining <= 0) {
            if (count == NUM_POMOS) {
                setCount(0)
            }

            alarm.play()
            endTimer()
            setPomoMode(true)
            resetButton.disabled = true
        }
    })
    drawCircle(seconds, true)
}

function setCount(newCount) {
    count = newCount
    updatePomo()
    localStorage.setItem('count', count)
}

// Fruit animation
const MS_PER_SECOND = 1000
let fruitAnimation = undefined

function drawCircle(seconds, reverse) {
    const durationMS = seconds * MS_PER_SECOND
    let start = undefined

    function draw(timestamp) {
        if (start == undefined) {
            start = timestamp
        }
        const elapsed = timestamp - start
        if (elapsed >= durationMS) {
            return
        }

        if (reverse) {
            drawFrame(2 * Math.PI * (1 - elapsed / durationMS))
        } else {
            drawFrame(2 * Math.PI * (elapsed / durationMS))
        }

        fruitAnimation = window.requestAnimationFrame(draw)
    }

    fruitAnimation = window.requestAnimationFrame(draw)
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
    window.cancelAnimationFrame(fruitAnimation)
    clearInterval(timer)

    innerCircle.disabled = false
    skipButton.disabled = true
    resetButton.disabled = true
    timeDisplay.style.visibility = 'hidden'
    modalPopup.style.display = 'none'

    // pulseCircle[0].style.visibility = 'visible'
    // pulseCircle[1].style.visibility = 'visible'
    // pulseCircle[2].style.visibility = 'visible'
    // pulseCircle[3].style.visibility = 'visible'
}

const modalPopup = document.getElementById('modal-popup')
const modalConfirm = document.getElementById('modal-confirm')
const modalCancel = document.getElementById('modal-cancel')

modalConfirm.addEventListener('click', () => {
    modalPopup.style.display = 'none'
    stopFunc()
})

modalCancel.addEventListener('click', () => {
    modalPopup.style.display = 'none'
})

function skipPomo() {
    setPomoMode(false)
    endTimer()
}

function resetPomo() {
    setCount(0)
    setPomoMode(true)
    endTimer()
}

function skipOrReset() {
    modalPopup.style.display = 'block'
}
