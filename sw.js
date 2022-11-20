self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('pwa-assets').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/styles.css',
      '/index.js',
      '/src/app.js',
      '/sw.js',
      '/src/acceskeybuttons.js',
    ])),
  );
});

/* self.addEventListener('fetch', (e) => {

  console.log(e.request.url);
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request)
    })
    //caches.match(e.request).then((response) => response || fetch(e.request)),
  );
}); */


self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
        const networkFetch = fetch(event.request).then(response => {
          // update the cache with a clone of the network response
          caches.open("pwa-assets").then(cache => {
              cache.put(event.request, response.clone());
          });
        });
        // prioritize cached response over network
        return cachedResponse || networkFetch;
    }
  )
 )
});