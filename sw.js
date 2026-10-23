// 讓 App 沒網路也能打開。
// 更新筆記或程式後，把 VERSION 的數字加 1，手機才會抓到新版。
const VERSION = 'v51';
const FILES = ['./', 'index.html', 'style.css', 'app.js', 'data.js', 'data-extra.js', 'data-more.js', 'data-sentences.js', 'data-dialogs.js', 'cloud.js', 'manifest.json', 'icon-180.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});

// 有網路就抓最新的，沒網路就用存起來的
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
