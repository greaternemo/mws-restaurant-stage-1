(function() {
  
  function clog (msg) {
    return console.log(msg);
  }
  
  if ('serviceWorker' in navigator) {
    clog("client: Registering service worker!");
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function() {
        clog("client: Successfully registered service worker!");
      }, function() {
        clog("client: Failed to register service worker!");
      });
    });
  }
  else {
    clog("client: Service worker is not supported. Pobody's nerfect!");
  }
  
  
}());