// Navigation Bar
var navBar = document.getElementById("navBar");
function showNav() {
    if (navBar.style.width < "20%") {
        navBar.style.width = "20%";
    } else {
        navBar.style.width = "0%";
    }
}

// User starts timer in inner circle 
var innerCircle = document.getElementById("innerCircle"); 
var checkTimerStart = false;
function startTimerVisual(id) {
    innerCircle.style.backgroundColor = "white";
    if (!checkTimerStart) {
        if (id == "innerCircle") {
            startTimer(workTime*60, true)
        } else {
            startTimer(breakTime*60, false)
        }
        
        checkTimerStart = true;
    }
}

// Pomodoro Timer 
var timer;
var count = 0;
var workTime = 0.1;
var breakTime = 0.1;

var firstPomo = document.getElementById("first-pomo");
var secondPomo = document.getElementById("second-pomo")
var thirdPomo = document.getElementById("third-pomo");
var fourthPomo = document.getElementById("fourth-pomo");
var pomo = document.getElementsByClassName("pomo")

function startTimer(seconds, increment) {
    let time = seconds;

    document.getElementById("break").style.display = "none";
    document.getElementById("end").style.display = "block";
    document.getElementById("end").innerHTML = "Stop";

    document.getElementById("min").innerHTML = Math.floor(seconds/60);
    document.getElementById("sec").innerHTML = checkSecond(Math.round(time%60));

    // reset # of pomos if full
    if (count == 4) {
        count = 0;
        firstPomo.style.backgroundColor = "white";
        secondPomo.style.backgroundColor = "white";
        thirdPomo.style.backgroundColor = "white";
        fourthPomo.style.backgroundColor = "white";
        // document.getElementById("break").innerHTML = "Break"
    }
    
    timer = setInterval( function(){
        if( time <= 0) {

            if(increment === true) {
                count++;
            } 

            // Fill in pomo based on count
            if (count == 1) {
                firstPomo.style.backgroundColor = "orange";
            } else if (count == 2) {
                secondPomo.style.backgroundColor = "orange";
            } else if (count == 3) {
                thirdPomo.style.backgroundColor = "orange";
            } else if (count == 4) {
                fourthPomo.style.backgroundColor = "orange";
                // document.getElementById("break").innerHTML = "Long Break"
                breakTime = 0.2;
            } 

            innerCircle.style.backgroundColor = "orange";
            checkTimerStart = false;

            document.getElementById("min").innerHTML = 25;
            document.getElementById("sec").innerHTML = checkSecond(0);

            clearInterval(timer);

            document.getElementById("break").style.display = "block";
            document.getElementById("end").style.display = "none";
        } else {
            time -= 1;

            document.getElementById("min").innerHTML = Math.floor(time/60);
            document.getElementById("sec").innerHTML = checkSecond(Math.round(time%60));
        }
    }, 1000)
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
}

function endPomo() {
    clearInterval(timer);

    innerCircle.style.backgroundColor = "orange";
    checkTimerStart = false;

    document.getElementById("min").innerHTML = 25;
    document.getElementById("sec").innerHTML = checkSecond(0);

    document.getElementById("end").style.display = "none";
}

function togglePomo() {
    if (document.getElementById("pomo").style.display === "none") {
        document.getElementById("pomo").style.display = "block";
    } else {
        document.getElementById("pomo").style.display = "none";
    }
}

function toggleBreak() {
    if (document.getElementById("break").style.display === "none") {
        document.getElementById("break").style.display = "block";
    } else {
        document.getElementById("break").style.display = "none";
    }
}

function toggleEnd() {
    if (document.getElementById("end").style.display === "none") {
        document.getElementById("end").style.display = "block";
    } else {
        document.getElementById("end").style.display = "none";
    }
}