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
  
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
  
  if (window.location.hostname === e.request.hostname) {
    e.waitUntil(
        caches.match(e.request).then(() => {
          caches.open('pwa-assets').then((cache) => cache.add(e.request));
        })
    )
  }
});


/* self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    }),
  );
}); */
