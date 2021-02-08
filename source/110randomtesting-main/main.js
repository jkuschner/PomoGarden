var navBar = document.getElementById("navBar");
var firstPomo = document.getElementById("first-pomo");
var secondPomo = document.getElementById("second-pomo")
var thirdPomo = document.getElementById("third-pomo");
var fourthPomo = document.getElementById("fourth-pomo");
var rectangle = document.getElementsByClassName("rectangle");

var twoPomoOption = document.getElementById("two-pomo-option");
var threePomoOption = document.getElementById("three-pomo-option");
var fourPomoOption = document.getElementById("four-pomo-option");

function showNav() {
    if (navBar.style.width < "20%") {
        navBar.style.width = "20%";
    } else {
        navBar.style.width = "0%";
    }
}

function changeNumPomo(x) {
    
    if (x.id == "two-pomo-option") {
        document.cookie = "2";
        thirdPomo.style.visibility = "hidden";
        fourthPomo.style.visibility = "hidden";
        
        threePomoOption.style.backgroundColor = "white";
        fourPomoOption.style.backgroundColor = "white";
    } else if (x.id == "three-pomo-option") {
        document.cookie = "3";
        thirdPomo.style.visibility = "visible";
        fourthPomo.style.visibility = "hidden";
        
        twoPomoOption.style.backgroundColor = "white";
        fourPomoOption.style.backgroundColor = "white";
    } else {
        document.cookie = "4";
        thirdPomo.style.visibility = "visible";
        fourthPomo.style.visibility = "visible";

        twoPomoOption.style.backgroundColor = "white";
        threePomoOption.style.backgroundColor = "white";
    }
    alert(document.cookie);
    x.style.backgroundColor = "orange";
}

var innerCircle = document.getElementById("innerCircle"); 
var checkTimerStart = false;
function startTimerVisual(id) {
    innerCircle.style.backgroundColor = "white";
    if (!checkTimerStart) {
        if (id == "innerCircle") {
            startTimer(0.1*60, true)
        } else {
            console.log('hi');
            startTimer(0.1*60, false)
        }
        
        checkTimerStart = true;
    }
}


// Timer Code Below

var x = document.getElementById("break");
var timer;
var pomoVal = 25*60;
var count = 0;



function startTimer(seconds, increment) {
    console.log("timer started");
    let time = seconds;

    //document.getElementById("pomo").style.display = "none";
    document.getElementById("break").style.display = "none";
    document.getElementById("end").style.display = "block";
    document.getElementById("end").innerHTML = "Stop";

    document.getElementById("min").innerHTML = Math.floor(seconds/60);
    document.getElementById("sec").innerHTML = checkSecond(Math.round(time%60));
    
    timer = setInterval( function(){
        if( time <= 0) {

            if(increment === true) {
                count++;
                // document.getElementById("count").innerHTML = count;

                if (count == 1) {
                    firstPomo.style.backgroundColor = "orange";
                } else if (count == 2) {
                    secondPomo.style.backgroundColor = "orange";
                } else if (count == 3) {
                    thirdPomo.style.backgroundColor = "orange";
                } else {
                    fourthPomo.style.backgroundColor = "orange";
                }

                innerCircle.style.backgroundColor = "orange";
                checkTimerStart = false;
            }

            document.getElementById("min").innerHTML = 25;
            document.getElementById("sec").innerHTML = checkSecond(0);

            clearInterval(timer);

            //document.getElementById("pomo").style.display = "block";
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

    //document.getElementById("pomo").style.display = "block";
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

var cookievar = parseInt(document.cookie,10);
alert(cookievar);
if(cookievar == 2){
    changeNumPomo(twoPomoOption);
}
else if(cookievar == 3){
    changeNumPomo(threePomoOption);
}
else{
    changeNumPomo(fourPomoOption);
}
