async function getTimerValues() {
    const response = await fetch('./test-config/times.json')
    if (response.ok) {
        const testSettings = await response.json()
        return testSettings
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
    let seconds = totalSeconds % 60
    let minutes = Math.floor(totalSeconds / 60)
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    return minutes + ':' + seconds
}

const SECONDS_TO_MS = 1000;
function startTimer(seconds, callback) {
    let countDown = seconds - 1;
    const interval = setInterval(() => {
        if (countDown <= 0) {
            callback(0);
            clearInterval(interval)
            return;
        }
        callback(countDown)
        countDown--
    }, SECONDS_TO_MS)

    callback(seconds) // callback immediately for the first second
    return interval
}