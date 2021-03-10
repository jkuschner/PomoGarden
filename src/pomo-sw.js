const cacheName = 'pomo-garden-v1'
const appShellFiles = [
    './',
    './index.html',
    './js/main.js',
    './js/utils.js',
    './css/main.css',
    './images/favicon/Coconut_favicon.png',
    './images/favicon/Grape_favicon.png',
    './images/favicon/Kiwi_favicon.png',
    './images/favicon/Lemon_favicon.png',
    './images/favicon/Onion_favicon.png',
    './images/favicon/Orange_favicon.png',
    './images/favicon/Tomato_favicon.png',
    './images/favicon/Watermelon_favicon.png',
    './images/Coconut.svg',
    './images/Grape.svg',
    './images/Kiwi.svg',
    './images/Lemon.svg',
    './images/Onion.svg',
    './images/Orange.svg',
    './images/Tomato.svg',
    './images/Watermelon.svg',
    './images/icons/icon-16.png',
    './images/icons/icon-32.png',
    './images/icons/icon-192.png',
    './images/icons/icon-512.png',
    './audio/alarm_break_finished.mp3',
    './audio/alarm_focus_finished.mp3',
    './audio/alarm.mp3',
    './images/volume-level-0.svg',
    './images/volume-level-1.svg',
    './images/volume-level-2.svg',
    './images/volume-level-3.svg',
    'https://fonts.googleapis.com/css2?family=Montserrat&display=swap',
    'https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2',
]

self.addEventListener('install', (e) => {
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName)
            console.log('[Service Worker] Caching app shell')
            await cache.addAll(appShellFiles)
        })()
    )
})

self.addEventListener('activate', (e) => {
    e.waitUntil(
        (async () => {
            const keys = await caches.keys()
            await Promise.all(keys.filter((key) => key !== cacheName).map((key) => caches.delete(key)))
        })()
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        (async () => {
            try {
                const networkRes = await fetch(e.request)
                const cache = await caches.open(cacheName)
                cache.put(e.request, networkRes.clone())
                return networkRes
            } catch (error) {
                const cachedRes = await caches.match(e.request)
                return cachedRes
            }
        })()
    )
})
