// My first service worker.
// God help me.

console.log('worker: Firing up a worker!');

// Utility functions, the usual

const vers = 'v002-';

const dnow = function() {
  return Date.now();
};

const vtag = function() {
  return '' + vers + dnow();
};

// immediately invoking this so we have a default cache name
const curtag = vtag();

const clog = function(msg) {
  console.log(msg);
};

const resources = [
    '/',
    '/index.html',
    /*
    '/restaurant.html?id=1',
    '/restaurant.html?id=2',
    '/restaurant.html?id=3',
    '/restaurant.html?id=4',
    '/restaurant.html?id=5',
    '/restaurant.html?id=6',
    '/restaurant.html?id=7',
    '/restaurant.html?id=8',
    '/restaurant.html?id=9',
    '/restaurant.html?id=10',
    */
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    //'//normalize-css.googlecode.com/svn/trunk/normalize.css',
];

// Ok let's try this.

// First we want to get this bugger installed and we want to...
// start a new cache if there isn't one already.
self.addEventListener('install', function(event) {
  clog('worker: Install in progress');

  event.waitUntil(
    caches.open(vers + 'resources').then(function(cache) {
    cache.addAll(resources).then(function() {
      clog('worker: Install completed!');
    });
  }));
});

self.addEventListener('fetch', function(event) {
  console.log('worker: Fetch in progress');
  //console.log(event);
  //fetch(event.request);
  
  if (event.request.method !== 'GET') {
    clog('worker: Not a GET request, ignoring');
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      // just get this right out of the way if we have it
      if (cached) {
        clog('worker: Found cached page!');
        return cached;
      }
      
      function nailedFetch (response) {
        let copy = response.clone();
        caches.open(curtag).then(function(cache) {
          cache.put(event.request, copy);
        })
        .then(function() {
          clog('worker: Stored nailed fetch response in cache');
        });
        return response;
      }
      
      function failedFetch () {
        clog('worker: Returning 503, no cache or fetch response.');
        return new Response('<h1>Service Unavailable</h1>', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/html'
          })
        });
      }
      
      let fetched = fetch(event.request)
      .then(nailedFetch, failedFetch)
      .catch(failedFetch);
      
      // if we make it all the way down here,
      // we'll either have a good response or a valid error response.
      // either way we should never not return a response object.
      return fetched;
    })
  );
});

// iirc the activate event handler is where we want to dump
// any expired cache data.
self.addEventListener('activate', function(event) {
  clog('worker: Activate in progress');
  event.waitUntil(
    caches.keys().then(function(keys) {
    //clog(keys);
    return new Promise(function(resolve) {
      resolve(keys);
    })
    .then(function(keys) {
      while (keys.length) {
        let aKey = keys.pop();
        if (aKey.startsWith(vers)) {
          // we good
        } else {
          clog('worker: Found outdated cache, clearing it out!');
          caches.delete(aKey);
        }
      }
    })
    .catch (function() {
      clog('worker: No keys to check');
    });
  }));
});


/*
 *
 *
 * Courtesy Spaces
 *
 *
 */