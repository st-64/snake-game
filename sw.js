const CACHE_NAME = 'snake-pro-v1';

// Add all the files your game needs to run here
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './snake-logo.jpg',
    './Sounds/eat.mp3',
    './Sounds/dead.mp3',
    './Sounds/start.mp3',
    './Sounds/levelup.mp3',
    './Sounds/bgm.mp3'
];

// Install event: Downloads and caches all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Fetch event: Serves files from cache if offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached file if found, otherwise fetch from network
            return response || fetch(event.request);
        })
    );
});