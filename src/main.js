window.addEventListener('DOMContentLoaded', () => {
    // Store number of pomos on refresh
    // if (localStorage.getItem('count') == null) {
    //     count = 0
    // } else {
    //     count = localStorage.getItem('count')
    // }

    //updatePomo()

    // Store theme on refresh
    if (localStorage.getItem('theme') == null) {
        localStorage.setItem('theme', 'themeOrange')
        changeTheme('themeOrange')
    } else {
        changeTheme(localStorage.getItem('theme'))
    }

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

    // Store volume on refresh
    if (localStorage.getItem('volume') != null) {
        volumeSlider.value = localStorage.getItem('volume')
        changeVolume()
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

//this is a bit of a garbage solution but I'm creating a variable to check if starting pomo or break since the current check with id won't quite fit
var pomoOrBreak = 'pomo'

function startTimerVisual(id) {
    console.log(pomoOrBreak)
    if (!checkTimerStart) {
        innerCircle.style.backgroundColor = 'var(--main-bg-color)'
        innerCircle.style.cursor = 'auto'

        //originally was based on id, changed to this since we want the center button to both start pomos and breaks
        if (pomoOrBreak == 'pomo') {
            startTimer(workTime * 60 - 1, true)
            document.getElementById('end').innerHTML = 'Skip'
            document.getElementById('title').innerHTML = 'Focus'

            draw()

            pomoOrBreak = 'break'
        } else {
            if (count == 4) {
                startTimer(longBreakTime * 60 - 1, false)
                drawReverse(longBreakTime)
            } else {
                startTimer(breakTime * 60 - 1, false)
                drawReverse(breakTime)
            }


            document.getElementById('end').innerHTML = 'Stop'
            document.getElementById('title').innerHTML = 'Relax'
            pomoOrBreak = 'pomo'
        }

        document.getElementById('break').style.display = 'none'
        document.getElementById('end').style.display = 'block'
        checkTimerStart = true
    }
}

// Pomodoro Timer
var timer
var count = 0
var workTime = 0.1
var breakTime = 0.1
var longBreakTime = 0.3

var firstPomo = document.getElementById('first-pomo')
var secondPomo = document.getElementById('second-pomo')
var thirdPomo = document.getElementById('third-pomo')
var fourthPomo = document.getElementById('fourth-pomo')
var pomo = document.getElementsByClassName('pomo')
var timeDisplay = document.getElementById('time')
var fruitIcon = document.getElementById('fruitIcon')
var timerStart = document.getElementById('timerStart')

var alarm = document.getElementById('alarm')

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

            alarm.play()

            updatePomo()   

            endTimer()

            if (increment) {
                //break can effectively be deleted if the issue I'm working on is correct
                //document.getElementById('break').style.display = 'block'
                document.getElementById('end').style.display = 'none'
            } else {
                document.getElementById('break').style.display = 'none'
                document.getElementById('end').style.display = 'none'
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
    console.log('timer ending, pomoOrBreak = ' + pomoOrBreak)
    
    endFruitAnimation()
    clearInterval(timer)
    checkTimerStart = false

    innerCircle.style.backgroundColor = 'var(--main-light-color)'
    innerCircle.style.cursor = 'pointer'

    //another if else to deal with updated central button
    if (pomoOrBreak == 'break') {
        document.getElementById('title').innerHTML = 'Time For a Break'
        timerStart.innerHTML = 'Break'
    } else {
        document.getElementById('title').innerHTML = 'Ready to Work?'
        timerStart.innerHTML = 'Start'
    }
    timeDisplay.style.visibility = 'hidden'
    fruitIcon.style.visibility = 'hidden'
    timerStart.style.visibility = 'visible'
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
        fifteenElement.style.backgroundColor = 'var(--main-bg-color)'
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
        twentyElement.style.backgroundColor = 'var(--main-light-color)'
    }
}

function changeTheme(id) {
    document.documentElement.className = id

    var currentTheme = localStorage.getItem('theme')
    document.getElementById(currentTheme).style.backgroundColor =
        'var(--main-bg-color)'

    localStorage.setItem('theme', id)
    document.getElementById(id).style.backgroundColor =
        'var(--main-light-color)'
}

var volumeSlider = document.getElementById('volume-slider')
var volumeNumber = document.getElementById('volume-number')
var volumeImage = document.getElementById('volume-image')
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
}


/*setting t changes the time for the circle to fully draw*/
var loader = document.getElementById('loader')
  , border = document.getElementById('border')
  , α = 0
  , π = Math.PI 
  , αReverse = 0;
/*haven't gotten around to modifying code to correctly start/stop with timer*/
function draw() {
    let t = workTime * 60 * 1000/360
    α++;
    α %= 360;
    var r = ( α * π / 180 )
        , x = Math.sin( r ) * 125
        , y = Math.cos( r ) * - 125
        , mid = ( α > 180 ) ? 1 : 0
        , anim = 'M 0 0 v -125 A 125 125 1 ' 
            + mid + ' 1 ' 
            +  x  + ' ' 
            +  y  + ' z';
    //[x,y].forEach(function( d ){
    //  d = Math.round( d * 1e3 ) / 1e3;
    //});

    document.getElementById("animation").style.zIndex = 2
    
    loader.setAttribute( 'd', anim );
    border.setAttribute( 'd', anim );

    fruitAnimation = setTimeout(draw, t); // Redraw
}

function drawReverse(breakType) {
    let t = breakType * 60 * 1000/360
    α++;
    α %= 360;
    αReverse = 360 - α
    var r = ( αReverse * π / 180 )
        , x = Math.sin( r ) * 125
        , y = Math.cos( r ) * - 125
        , mid = ( αReverse > 180 ) ? 1 : 0
        , anim = 'M 0 0 v -125 A 125 125 1 ' 
            + mid + ' 1 ' 
            +  x  + ' ' 
            +  y  + ' z';
    //[x,y].forEach(function( d ){
    //  d = Math.round( d * 1e3 ) / 1e3;
    //});

    document.getElementById("animation").style.zIndex = 2
    
    loader.setAttribute( 'd', anim );
    border.setAttribute( 'd', anim );
  
    fruitAnimation = setTimeout(drawReverse, t, breakType); // Redraw
}

function endFruitAnimation() {
    document.getElementById("animation").style.zIndex = 0
    clearTimeout(fruitAnimation)
}
