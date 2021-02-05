var navBar = document.getElementById("navBar");

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
        thirdPomo.style.visibility = "hidden";
        fourthPomo.style.visibility = "hidden";

        threePomoOption.style.backgroundColor = "white";
        fourPomoOption.style.backgroundColor = "white";
    } else if (x.id == "three-pomo-option") {
        thirdPomo.style.visibility = "visible";
        fourthPomo.style.visibility = "hidden";

        twoPomoOption.style.backgroundColor = "white";
        fourPomoOption.style.backgroundColor = "white";
    } else {
        thirdPomo.style.visibility = "visible";
        fourthPomo.style.visibility = "visible";

        twoPomoOption.style.backgroundColor = "white";
        threePomoOption.style.backgroundColor = "white";
    }

    x.style.backgroundColor = "orange";
}


var innerCircle = document.getElementById("innerCircle"); 

function startTimer() {
    innerCircle.style.backgroundColor = "white";
    innerCircle.textContent = "25:00";
}