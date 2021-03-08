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