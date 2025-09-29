const CACHE_NAME = 'agrovvale-os-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  // Ícones renomeados
  './agrovale192.png',
  './agrovale512.png',
  './manifest.json',
  './Logo-Site-Agrovale.png' // Mantendo o nome do logo do header
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache pre-preenchido');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('Falha na instalação/caching do Service Worker:', error);
        throw error; 
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
