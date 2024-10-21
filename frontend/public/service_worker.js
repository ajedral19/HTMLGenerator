const cacheName = "from-service-worker";

// call install event
self.addEventListener("install", (event) => {
	// console.log("Service Worker: Installed");
});

// call activate event
self.addEventListener("activate", (event) => {
	// console.log("Service Worker: Activated");

	// remove unwanted caches
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== cacheName) {
						// console.log("Service Worker: Clearing old cache");
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// call fetch event
self.addEventListener("fetch", (event) => {
	// console.log("Service Worker: Fetching");
	event.respondWith(
		fetch(event.request)
			.then((response) => {
				// Make a clone of response
				const responseClone = response.clone();
				
				// Open cache
				caches.open(cacheName).then((cache) => {
					// add response to the cache
					cache.put(event.request, responseClone);
					// console.log("caching here hehe");
				});
				return response;
			})
			.catch(() => caches.match(event.request).then((res) => res))
	);
});
