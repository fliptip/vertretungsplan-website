const { response } = require("express");

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
  e.respondWith(
    fetch(e.request)
    .catch(function() {
      return caches.match(e.request)
    })
  );
}); */

/* self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
    .then(
      (response) => {
        caches.open("pwa-assets").then(
          cache => { 
            cache.put(e.request, response.clone())
          }
        )
      },
      () => {
        return caches.match(e.request)
      }
    )
  );
}); */

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function (cache) {
      return fetch(event.request).then(function (response) {
        cache.put(event.request, response.clone());
        return response;
      });
    }),
  );
});



/* self.addEventListener("fetch", event => {
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
}); */

/* self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request).then(response => { 
        caches.open("pwa-assets").then(cache => { 
          cache.put(e.request, response.clone())
        }
      });
    })
  );
}); */



/* self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(
      (value) => { console.log(value) },
      () => { return fetch(e.request) },
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
      caches.match(e.request).then( response => {
        //if (response) { return response }
        return fetch(e.request).then(
          (response) => { caches.open('pwa-assets').then((cache) => cache.put(e.request, response.clone())) },
          () => { alert('Anscheinend bist du nicht mit dem Internet verbunden.'); },
        )
      })
  )
}) */
