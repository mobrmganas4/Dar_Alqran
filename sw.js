const cacheName = 'dar-al-quran-v2';

const assets = [
  '/',
  '/index.html',
  '/logo512-v2.png',
  '/manifest.json'
];

// تثبيت السيرفس وركر
self.addEventListener('install', evt => {
  self.skipWaiting(); // مهم جدًا

  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل السيرفس وركر
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            return caches.delete(key); // يمسح القديم
          }
        })
      );
    })
  );

  clients.claim(); // يخلي الجديد يشتغل فورًا
});

// جلب البيانات
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
