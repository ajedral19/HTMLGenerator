const cacheName = "v1";

const cacheAssets = ["/", "documentation", "templates/", "templates/fiddle"];

// call install event
self.addEventListener("install", (event) => {
	console.log("Service Worker: Installed");

	event.waitUntil(
		caches
			.open(cacheName)
			.then((cache) => {
				console.log("Service Worker: Caching files");
				cache.addAll(cacheAssets);
			})
			.then(() => {
				self.skipWaiting();
			})
	);
});

// call activate event
self.addEventListener("activate", (event) => {
	console.log("Service Worker: Activated");

	// remove unwanted caches
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== cacheName) {
						console.log("Service Worker: Clearing old cache");
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// call fetch event
self.addEventListener("fetch", (event) => {
	console.log("Service Worker: Fetching");
	event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
