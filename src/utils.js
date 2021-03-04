async function getTimerValues() {
    const response = await fetch('./test-config/times.json')
    if (response.ok) {
        const testSettings = await response.json()
        return testSettings
    } else {
        return {
            workTime: 25,
            breakTime: 5,
            longBreakTimes: {
                break10: 10,
                break15: 15,
                break20: 2,
            },
        }
    }
}

function getTheme() {
    return localStorage.getItem('theme')
}

function saveTheme(theme) {
    localStorage.setItem('theme', theme)
}

function getLongBreak() {
    return localStorage.getItem('longBreakType')
}

function saveLongBreak(longBreakType) {
    localStorage.setItem('longBreakType', longBreakType)
}

function getVolume(volume) {
    return localStorage.getItem('volume')
}
