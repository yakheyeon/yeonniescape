const CACHE_NAME="escape-v2";

const FILES=[
"./",
"./index.html",
"./manifest.json"
];

self.addEventListener("install",event=>{
event.waitUntil(
caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES))
);
self.skipWaiting();
});

self.addEventListener("activate",event=>{
event.waitUntil(
caches.keys().then(keys=>{
return Promise.all(
keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
);
})
);
self.clients.claim();
});

self.addEventListener("fetch",event=>{
event.respondWith(
caches.match(event.request).then(res=>res||fetch(event.request))
);
});
