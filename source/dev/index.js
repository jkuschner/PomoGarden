var x = document.getElementById("break");
var timer;
var pomoVal = 25*60;

function startTimer(seconds, increment) {
    console.log("timer started");
    let time = seconds;

    document.getElementById("pomo").style.display = "none";
    document.getElementById("break").style.display = "none";
    document.getElementById("end").style.display = "block";

    document.getElementById("min").innerHTML = Math.floor(seconds/60);
    document.getElementById("sec").innerHTML = checkSecond(Math.round(time%60));
    
    timer = setInterval( function(){
        if( time <= 0) {

            if(increment === true) {
            document.getElementById("count").innerHTML = parseInt(document.getElementById("count").innerHTML) + 1;
            }
            document.getElementById("min").innerHTML = 25;
            document.getElementById("sec").innerHTML = checkSecond(0);

            clearInterval(timer);

            document.getElementById("pomo").style.display = "block";
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

    document.getElementById("min").innerHTML = 25;
    document.getElementById("sec").innerHTML = checkSecond(0);

    document.getElementById("pomo").style.display = "block";
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