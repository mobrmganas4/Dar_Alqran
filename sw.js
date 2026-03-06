const cacheName = 'dar-al-quran-v1';
const assets = [
  '/',
  '/index.html',
  '/logo512.png',
  '/manifest.json'
];

// تثبيت السيرفس وركر
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching shell assets');
      cache.addAll(assets);
    })
  );
});

// تفعيل السيرفس وركر
self.addEventListener('activate', evt => {
  console.log('Service Worker activated');
});

// جلب البيانات (ضروري عشان الـ Install Prompt يظهر)
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
