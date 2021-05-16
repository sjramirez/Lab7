// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests
let CACHE_ENTRIES = 'my-site-cache-v1';
let urlsToCache = [
    '/',
    'scripts/script.js',
    'scripts/router.js',
    '/index.html',
    '/style.css',
    'https://cse110lab6.herokuapp.com/entries'
];


self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_ENTRIES)
            .then(function(cache){
                console.log('opened cache');
                return cache.addAll(urlsToCache);
            })
    );

});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                //Cache hit return response
                if(response){
                    console.log("had it");
                    return response;
                }
                return fetch(event.request).then(
                    function(response) {
                        //check if valid response
                        if(!response || response.status !== 200 || response.type !== "basic"){
                            console.log('bad response');
                            return response;
                        }
                        let responseToCache = response.clone();

                        caches.open(CACHE_ENTRIES)
                            .then(function(cache){
                                console.log(responseToCache);
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});


self.addEventListener('activate', event => {
    console.log("claimed");
    event.waitUntil(clients.claim());
});

