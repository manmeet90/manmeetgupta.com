// This will hold the current active cache name.
var CV_CACHE_NAME = "static-v1";
/**
 *  This will hold the old cache names which needed to be dumped when next time service worker activate event triggers.
 *  Update this array to add previous cache name whenerver any static resources like image , fonts changes in build.
 */
var cacheWhitelist = [];
// static resources to cache
// NOTE: Never cache root("/") or index.html.
var urlsToCache = [
    "bundle.js",
    "styles.css"
];

self.addEventListener("install", function (e) {
    // Cache all the static resources like images, scripts and fonts.
    e.waitUntil(caches.open(CV_CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache)
                .then(() => {
                    // If new service worker update activation waiting for old service worker context to expire.Skip and update immediately.
                    self.skipWaiting();
                    console.log("service worker installed");
                });
        }));
});

self.addEventListener('activate', function (event) {
    // If there are any old caches needed to be cleared, remove them
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) !== -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    console.log("service worker activated");
});

/**
 * Cache then network strategy.
 * Request will be looked into active cache.If present return response from cache,
 *  otherwise get response from network and save it to cache and return.
 */
self.addEventListener("fetch", function (e) {
    let imageAssetsRegex = /\w+\/images\/\w+(.jpg|.png|.JPEG|.PNG|.gif|.GIF)$/;
    let fontsAssetsRegex = /\w+\/fonts\/\w+(.eot|.svg|.ttf|.woff|woff2|.otf)$/;

    let url = new URL(e.request.url);
    let request = e.request;
    // Don't cache anything that is not on this origin.
    if (url.origin !== location.origin || request.method !== "GET") {
        return;
    }

    // For images and fonts once data in cache don't update the cache on each request as they are rarely going to change.
    if (imageAssetsRegex.test(request.url) || fontsAssetsRegex.test(request.url)) {
        e.respondWith(
            caches.open(CV_CACHE_NAME).then(cache => {
                return cache.match(request).then(response => {
                    if (response) {
                        return response;
                    } else {
                        return fetch(request).then(networkResponse => {
                            cache.put(request, networkResponse.clone());
                            return networkResponse;
                        });
                    }
                })
            })
        );
    } else {
        // If data is in cache return data from cache and update cahe with new network response.
        e.respondWith(
            caches.open(CV_CACHE_NAME).then(cache => {
                return cache.match(request).then(response => {
                    var ignoreCache = e.request.headers.has("Cache-Control") || false;
                    var fetchPromise = fetch(request).then(networkResponse => {
                        if (networkResponse.status >= 200 && networkResponse.status <= 299) {
                            cache.put(request, networkResponse.clone());
                        } else if (networkResponse.status === 408) {
                            cache.delete(request);
                        }
                        return networkResponse;
                    });
                    // if ignoreCache is set to true ignore cache response if present and return response from network.
                    if (ignoreCache) {
                        return fetchPromise;
                    } else {
                        // Return the response from cache or wait for network.
                        return response || fetchPromise;
                    }

                })
            })
        );
    }
});