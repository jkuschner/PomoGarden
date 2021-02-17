window.addEventListener('DOMContentLoaded', ()=> {
    // Store number of pomos on refresh
    if (localStorage.getItem("count") == null) {
        count = 0;
    } else {
        count = localStorage.getItem("count");
    }

    updatePomo();

    // Store long break time on refresh
    if (localStorage.getItem("longBreakTime") == null) {
        changeLongBreak("longBreakFifteen");
    } else {
        if (localStorage.getItem("longBreakTime") == 0.2) {
            changeLongBreak("longBreakTen");
        } else if (localStorage.getItem("longBreakTime") == 0.3) {
            changeLongBreak("longBreakFifteen");
        } else  {
            changeLongBreak("longBreakTwenty");
        }
    }
})

// Navigation Bar
var navBar = document.getElementById("navBar");
function showNav() {
    if (navBar.style.width < "19vw") {
        navBar.style.width = "19vw";
    } else {
        navBar.style.width = "0%";
    }
}

// User starts timer in inner circle 
var innerCircle = document.getElementById("innerCircle"); 
var checkTimerStart = false;

function startTimerVisual(id) {
    if (!checkTimerStart) {
        innerCircle.style.backgroundColor = "white";
        innerCircle.style.cursor = "auto";
        document.getElementById("sep").innerHTML = ":";

        if (id == "innerCircle") {
            startTimer(workTime*60, true)

            document.getElementById("end").innerHTML = "Skip";
            document.getElementById("title").innerHTML = "Focus";
        } else {     
            if (count == 4) {
                startTimer(longBreakTime*60, false)
            } else {
                startTimer(breakTime*60, false)
            }

            document.getElementById("end").innerHTML = "Stop";
            document.getElementById("title").innerHTML = "Relax";
        }
        
        document.getElementById("break").style.display = "none";
        document.getElementById("end").style.display = "block";
        checkTimerStart = true;
    }
}

// Pomodoro Timer 
var timer;
var count;
var workTime = 0.1;
var breakTime = 0.1;
var longBreakTime = 0.3;

var firstPomo = document.getElementById("first-pomo");
var secondPomo = document.getElementById("second-pomo")
var thirdPomo = document.getElementById("third-pomo");
var fourthPomo = document.getElementById("fourth-pomo");
var pomo = document.getElementsByClassName("pomo")

function startTimer(seconds, increment) {
    let time = seconds;

    if (Math.floor(seconds/60) < 10) {
        document.getElementById("min").innerHTML = "0" + Math.floor(seconds/60);
    } else {
        document.getElementById("min").innerHTML = Math.floor(seconds/60);
    }
    document.getElementById("sec").innerHTML = checkSecond(Math.round(time%60));

    // reset # of pomos if full
    if (count == 4) {
        count = 0;
        localStorage.setItem("count", count);

        firstPomo.style.backgroundColor = "white";
        secondPomo.style.backgroundColor = "white";
        thirdPomo.style.backgroundColor = "white";
        fourthPomo.style.backgroundColor = "white";
    }
    
    timer = setInterval( function(){
        if( time <= 0) {

            if(increment) {
                count++;
                localStorage.setItem("count", count);
            } 

            updatePomo();

            endTimer();
      
            if (increment) {
                document.getElementById("break").style.display = "block";
                document.getElementById("end").style.display = "none";
            } else {
                document.getElementById("break").style.display = "none";
                document.getElementById("end").style.display = "none";
            }
           
        } else {
            time -= 1;

            if (Math.floor(seconds/60) < 10) {
                document.getElementById("min").innerHTML = "0" + Math.floor(seconds/60);
            } else {
                document.getElementById("min").innerHTML = Math.floor(seconds/60);
            }
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
    if (document.getElementById("end").innerHTML == "Skip") {
        if (!confirmSkip()) {
            return;
        }
    }

    endTimer();

    document.getElementById("end").style.display = "none";
}

function updatePomo() {
    // Fill in pomo based on count
    if (count == 1) {
        firstPomo.style.backgroundColor = "orange";
    } else if (count == 2) {
        firstPomo.style.backgroundColor = "orange";
        secondPomo.style.backgroundColor = "orange";
    } else if (count == 3) {
        firstPomo.style.backgroundColor = "orange";
        secondPomo.style.backgroundColor = "orange";
        thirdPomo.style.backgroundColor = "orange";
    } else if (count == 4) {
        firstPomo.style.backgroundColor = "orange";
        secondPomo.style.backgroundColor = "orange";
        thirdPomo.style.backgroundColor = "orange";
        fourthPomo.style.backgroundColor = "orange";
        // document.getElementById("break").innerHTML = "Long Break"
    } 
}

function endTimer() {
    clearInterval(timer);
    checkTimerStart = false;

    innerCircle.style.backgroundColor = "orange";
    innerCircle.style.cursor = "pointer";

    document.getElementById("title").innerHTML = "Ready to Work?";

    document.getElementById("min").innerHTML = "Start";
    document.getElementById("sep").innerHTML = "";
    document.getElementById("sec").innerHTML = "";

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

function confirmSkip() {
    var decision = confirm("Are you sure you want to break this work session?");
    return decision;
}

function changeLongBreak(id) {
    if (id == "longBreakTen") {
        longBreakTime = 0.2;
        localStorage.setItem("longBreakTime", longBreakTime);

        document.getElementById("longBreakTen").style.backgroundColor = "orange";
        document.getElementById("longBreakFifteen").style.backgroundColor = "white";
        document.getElementById("longBreakTwenty").style.backgroundColor = "white";
    } else if (id == "longBreakFifteen") {
        longBreakTime = 0.3;
        localStorage.setItem("longBreakTime", longBreakTime);

        document.getElementById("longBreakFifteen").style.backgroundColor = "orange";
        document.getElementById("longBreakTen").style.backgroundColor = "white";
        document.getElementById("longBreakTwenty").style.backgroundColor = "white";
    } else {
        longBreakTime = 0.4;
        localStorage.setItem("longBreakTime", longBreakTime);

        document.getElementById("longBreakTwenty").style.backgroundColor = "orange";
        document.getElementById("longBreakTen").style.backgroundColor = "white";
        document.getElementById("longBreakFifteen").style.backgroundColor = "white";
    }
}

function changeTheme(id) {

}
