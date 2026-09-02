const CACHE_NAME = 'edi-v3';
const urlsToCache = [
  './',
  './index.html',
  './ColeccionEDI1.html',
  './ColeccionEDI2.html',
  './ColeccionEDI3.html',
  './ColeccionEDI4.html',
  './ColeccionEDI5.html',
  './ColeccionEDI6.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalación: Guardamos los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación: Limpiamos cachés viejas si actualizas la versión
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch: Servimos desde caché si no hay internet o para velocidad
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, lo devuelve. Si no, lo busca en la red.
        return response || fetch(event.request);
      })
  );
});