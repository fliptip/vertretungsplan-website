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

self.addEventListener("fetch", event => {
  //console.log(event.request.url.includes(self.location.hostname) + " " + event.request.url);
  if (event.request.url.includes(self.location.hostname)) {
    event.respondWith(caches.open('pwa-assets').then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchedResponse = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });

        return cachedResponse || fetchedResponse;
      });
    }));
  } else {
    return;
  }
});