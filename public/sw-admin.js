const CACHE_NAME = 'amr-admin-shell-v2';
const SHELL_ASSETS = [
  '/admin',
  '/admin.html',
  '/admin-manifest.webmanifest',
  '/admin-icon-180.png',
  '/admin-icon-192.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  const type = event.data && event.data.type;
  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    );
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Never cache API calls, version checks, or cross-origin requests
  if (
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/api/') ||
    url.pathname === '/version.json'
  ) {
    return;
  }

  const isShellDocument =
    request.mode === 'navigate' ||
    url.pathname === '/admin' ||
    url.pathname === '/admin/' ||
    url.pathname === '/admin.html' ||
    url.pathname === '/admin-manifest.webmanifest';

  // Bypass Safari/HTTP disk cache for HTML shell documents so updates appear immediately
  const networkFetch = isShellDocument
    ? fetch(request, { cache: 'no-store' })
    : fetch(request);

  event.respondWith(
    networkFetch
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
