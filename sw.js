self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open("magic-camera").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./script.js",
        "./heart3.png",
        "./icon-192.png",
        "./icon-512.png",
        "./manifest.webmanifest"
      ]);
    })
  );
});

self.addEventListener("activate", (e) => {
  clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
