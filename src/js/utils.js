function isLocalHost() {
    return location.hostname === 'localhost' || location.hostname === '127.0.0.1'
}

function getTimerValues() {
    if (isLocalHost()) {
        return {
            workTime: 10,
            breakTime: 5,
            longBreakTimes: {
                break10: 10,
                break15: 15,
                break20: 20,
            },
        }
    } else {
        return {
            workTime: 1500,
            breakTime: 300,
            longBreakTimes: {
                break10: 600,
                break15: 900,
                break20: 1200,
            },
        }
    }
}

//Takes in time value, converts into MM:SS format
function formatTime(totalSeconds) {
    let seconds = Math.floor(totalSeconds) % 60
    let minutes = Math.floor(totalSeconds / 60)
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    return minutes + ':' + seconds
}
