const CACHE_NAME = 'agrovvale-os-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  // Inclusão dos ícones .png que o manifest espera
  './Agrovale-192.png',
  './Agrovale-512.png',
  './manifest.json', // Adicionado o prefixo './' para garantir o caminho correto.
  './Logo-Site-Agrovale.png' // Incluindo o logo do header, que também é um asset crítico.
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
