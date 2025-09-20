const CACHE_NAME = "proofpass-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  // Add other assets you want to cache, e.g., CSS, JS, images
  // '/static/js/bundle.js',
  // '/static/css/main.css',
  // '/favicon.ico',
];

// DEV ONLY: Unregister service worker on localhost to avoid fetch errors
if (self.location.hostname === "localhost") {
  self.addEventListener("install", (event) => {
    self.registration.unregister();
  });
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
