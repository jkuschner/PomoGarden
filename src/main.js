window.addEventListener('DOMContentLoaded', () => {
    // Store number of pomos on refresh
    if (localStorage.getItem('count') == null) {
        count = 0
    } else {
        count = localStorage.getItem('count')
    }

    updatePomo()

    // Store long break time on refresh
    if (localStorage.getItem('longBreakTime') == null) {
        changeLongBreak('longBreakFifteen')
    } else {
        if (localStorage.getItem('longBreakTime') == 0.2) {
            changeLongBreak('longBreakTen')
        } else if (localStorage.getItem('longBreakTime') == 0.3) {
            changeLongBreak('longBreakFifteen')
        } else {
            changeLongBreak('longBreakTwenty')
        }
    }
})

// Navigation Bar
var navBar = document.getElementById('navBar')
function showNav() {
    if (navBar.style.width < '19vw') {
        navBar.style.width = '19vw'
    } else {
        navBar.style.width = '0%'
    }
}

// User starts timer in inner circle
var innerCircle = document.getElementById('innerCircle')
var checkTimerStart = false

function startTimerVisual(id) {
    if (!checkTimerStart) {
        innerCircle.style.backgroundColor = 'var(--main-bg-color)';
        innerCircle.style.cursor = 'auto'

        if (id == 'innerCircle') {
            startTimer(workTime * 60, true)

            document.getElementById('end').innerHTML = 'Skip'
            document.getElementById('title').innerHTML = 'Focus'
        } else {
            if (count == 4) {
                startTimer(longBreakTime * 60, false)
            } else {
                startTimer(breakTime * 60, false)
            }

            document.getElementById('end').innerHTML = 'Stop'
            document.getElementById('title').innerHTML = 'Relax'
        }

        document.getElementById('break').style.display = 'none'
        document.getElementById('end').style.display = 'block'
        checkTimerStart = true
    }
}

// Pomodoro Timer
var timer
var count
var workTime = 0.1
var breakTime = 0.1
var longBreakTime = 0.3

var firstPomo = document.getElementById('first-pomo')
var secondPomo = document.getElementById('second-pomo')
var thirdPomo = document.getElementById('third-pomo')
var fourthPomo = document.getElementById('fourth-pomo')
var pomo = document.getElementsByClassName('pomo')

function startTimer(seconds, increment) {
    let time = seconds
    
    displayTime(time)

    // reset # of pomos if full
    if (count == 4) {
        count = 0
        localStorage.setItem('count', count)

        firstPomo.style.backgroundColor = 'var(--main-bg-color)'
        secondPomo.style.backgroundColor = 'var(--main-bg-color)'
        thirdPomo.style.backgroundColor = 'var(--main-bg-color)'
        fourthPomo.style.backgroundColor = 'var(--main-bg-color)'
    }

    timer = setInterval(function () {
        if (time <= 0) {
            if (increment) {
                count++
                localStorage.setItem('count', count)
            }

            updatePomo()

            endTimer()

            if (increment) {
                document.getElementById('break').style.display = 'block'
                document.getElementById('end').style.display = 'none'
            } else {
                document.getElementById('break').style.display = 'none'
                document.getElementById('end').style.display = 'none'
            }
        } else {
            time -= 1
            displayTime(time);
        }
    }, 1000)
}

//Takes in time value, converts into MM:SS format
//sets time element in html accordingly
function displayTime(time){
    let seconds = time % 60
    let minutes = Math.floor(time / 60)
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    document.getElementById('time').innerHTML = minutes + ":" + seconds
}

function endPomo() {
    if (document.getElementById('end').innerHTML == 'Skip') {
        if (!confirmSkip()) {
            return
        }
    }

    endTimer()

    document.getElementById('end').style.display = 'none'
}

function updatePomo() {
    // Fill in pomo based on count
    if (count == 1) {
        firstPomo.style.backgroundColor = 'var(--main-light-color)'
    } else if (count == 2) {
        firstPomo.style.backgroundColor = 'var(--main-light-color)'
        secondPomo.style.backgroundColor = 'var(--main-light-color)'
    } else if (count == 3) {
        firstPomo.style.backgroundColor = 'var(--main-light-color)'
        secondPomo.style.backgroundColor = 'var(--main-light-color)'
        thirdPomo.style.backgroundColor = 'var(--main-light-color)'
    } else if (count == 4) {
        firstPomo.style.backgroundColor = 'var(--main-light-color)'
        secondPomo.style.backgroundColor = 'var(--main-light-color)'
        thirdPomo.style.backgroundColor = 'var(--main-light-color)'
        fourthPomo.style.backgroundColor = 'var(--main-light-color)'
        // document.getElementById("break").innerHTML = "Long Break"
    }
}

function endTimer() {
    clearInterval(timer)
    checkTimerStart = false

    innerCircle.style.backgroundColor = 'var(--main-bg-color)'
    innerCircle.style.cursor = 'pointer'

    document.getElementById('title').innerHTML = 'Ready to Work?'

    document.getElementById('time').innerHTML = 'Start'
}

function toggleBreak() {
    if (document.getElementById('break').style.display === 'none') {
        document.getElementById('break').style.display = 'block'
    } else {
        document.getElementById('break').style.display = 'none'
    }
}

function toggleEnd() {
    if (document.getElementById('end').style.display === 'none') {
        document.getElementById('end').style.display = 'block'
    } else {
        document.getElementById('end').style.display = 'none'
    }
}

function confirmSkip() {
    var decision = confirm('Are you sure you want to break this work session?')
    return decision
}

function changeLongBreak(id) {
    let tenElement = document.getElementById('longBreakTen')
    let fifteenElement = document.getElementById('longBreakFifteen')
    let twentyElement = document.getElementById('longBreakTwenty')
    if (id == 'longBreakTen') {
        longBreakTime = 0.2
        localStorage.setItem('longBreakTime', longBreakTime)

        tenElement.style.backgroundColor = 'var(--main-light-color)'
        fifteenElement.style.backgroundColor ='var(--main-bg-color)'
        twentyElement.style.backgroundColor = 'var(--main-bg-color)'
    } else if (id == 'longBreakFifteen') {
        longBreakTime = 0.3
        localStorage.setItem('longBreakTime', longBreakTime)

        tenElement.style.backgroundColor = 'var(--main-bg-color)'
        fifteenElement.style.backgroundColor = 'var(--main-light-color)'
        twentyElement.style.backgroundColor = 'var(--main-bg-color)'
    } else {
        longBreakTime = 0.4
        localStorage.setItem('longBreakTime', longBreakTime)

        tenElement.style.backgroundColor = 'var(--main-bg-color)'
        fifteenElement.style.backgroundColor = 'var(--main-bg-color)'
        twentyElement.style.backgroundColor ='var(--main-light-color)'
    }
}

function changeTheme(id) {
    document.documentElement.className = id
    document.getElementById(id).backgroundColor = 'var(--main-bg-color)'
}
