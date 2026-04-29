const APP_SHELL_VERSION = "2026.04.29.4";
const APP_SHELL_CACHE = `the-review-shell-${APP_SHELL_VERSION}`;

// Only cache the app shell. Problem data and store items are intentionally fetched live
// so adding those records does not create an app update dialog.
const APP_SHELL_URLS = [
  "./",
  "./index.html",
  "./login.html",
  "./manager.html",
  "./app.css?v=20260429-4",
  "./app.js?v=20260429-4",
  "./pwa.js?v=20260429-4",
  "./Loaders.css?v=20260326-1",
  "./auth0-config.js?v=20260426-1",
  "./manifest.webmanifest?v=20260429-4",
  "./assets/favicon/favicon.png?v=20260326-1",
  "./assets/logos/original.png?v=20260326-1",
  "./assets/logos/manager.png?v=20260326-1",
  "./assets/icons/coin.png?v=20260326-1",
  "./assets/avater/らーん1-1.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL_URLS))
      .catch(() => undefined)
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("the-review-shell-") && key !== APP_SHELL_CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isLiveData =
    url.pathname.includes("/data/") ||
    url.pathname.includes("/api/") ||
    url.hostname === "api.the-review.net";

  if (!isSameOrigin || isLiveData) {
    event.respondWith(fetch(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("./index.html")));
    return;
  }

  event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
});
