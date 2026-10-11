const C='trail-targets-v3',LIB='leaflet-1.9.4';const F=['./','./index.html','./manifest.webmanifest','./rides-seed.json','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./favicon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==LIB).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);
if(u.hostname.endsWith('tile.openstreetmap.org'))return; // tiles: network only, browser HTTP cache
if(u.hostname==='unpkg.com'){e.respondWith(caches.open(LIB).then(c=>c.match(q).then(r=>r||fetch(q).then(n=>{c.put(q,n.clone());return n}))));return}
if(u.origin!==location.origin)return;
if(q.mode==='navigate'){e.respondWith(fetch(q).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put('./index.html',cp));return n}).catch(()=>caches.match('./index.html')));return}
e.respondWith(caches.match(q).then(r=>r||fetch(q).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(q,cp));return n})))});
