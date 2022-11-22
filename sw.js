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
  console.log(e.request)
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );

  if (self.location.hostname === e.request.hostname) {
    console.log('Update: ' + e.request)
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
