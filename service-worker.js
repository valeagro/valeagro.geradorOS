const CACHE_NAME = 'agrovvale-os-cache-v1';
const urlsToCache = [
  './', // A URL raiz
  './index.html',
  // ÍCONES: O manifest espera PNGs
  './Agrovale-192.png', // Verifique se está nomeado exatamente assim
  './Agrovale-512.png', // Verifique se está nomeado exatamente assim
  './manifest.json',
  // LOGO USADO NO HEADER:
  './Logo-Site-Agrovale.png' // Verifique se está nomeado exatamente assim
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache pre-preenchido');
        // Se algum arquivo desta lista não for encontrado (404),
        // a instalação falhará, e a instalação do PWA será impedida.
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('Falha na instalação/caching do Service Worker:', error);
        // Exibe qual arquivo específico falhou
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
