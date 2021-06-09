workbox.core.setCacheNameDetails({ prefix: "forager" });

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  /^https:\/\/(a|b|c|d|source,(.*))/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "forager-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
        purgeOnQuotaError: true,
      }),
    ],
  }),
  "GET"
);
