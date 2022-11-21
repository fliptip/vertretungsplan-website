const { response } = require("express");

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('pwa-assets').then((cache) => cache.addAll([
      '/',
      '/styles.css',
      '/index.js',
      '/src/app.js',
      '/sw.js',
      '/src/acceskeybuttons.js',
    ])),
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    }),
  );
});