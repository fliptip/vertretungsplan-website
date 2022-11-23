self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('pwa-assets').then((cache) => cache.addAll([
      '/',
      '/styles.css',
      '/src/light.css',
      '/src/dark.css',
      '/index.js',
      '/src/app.js',
      '/src/acceskeybuttons.js',
    ])),
  );
});

self.addEventListener("fetch", event => {
  //console.log(`${ event.request.url.includes(self.location.hostname) } ${ event.request.url }`);
  event.respondWith(caches.open('pwa-assets').then(cache => {
    return cache.match(event.request).then(cachedResponse => {
      const fetchedResponse = fetch(event.request).then(networkResponse => {
        if (event.request.url.includes(self.location.hostname)) {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      });

      return cachedResponse || fetchedResponse;
    });
  }));
});
