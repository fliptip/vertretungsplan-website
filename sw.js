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

self.addEventListener('fetch', (e) => {

  console.log(e.request.url);
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request)
    })
    //caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
