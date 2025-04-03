self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('magic-camera').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './heart3.png',
        './icon-192.png',
        './icon-512.png',
        './manifest.webmanifest'
      ])
    })
  )
})
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  )
})
