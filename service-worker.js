const CACHE_NAME = 'agrovvale-os-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './Agrovale-512.png', // CORRIGIDO: Substituído Agrovale.png pelo arquivo real
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache pre-preenchido');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );

});




