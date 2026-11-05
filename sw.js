const C='quiz-v5',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(u.origin!==location.origin&&!/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))return;
if(u.pathname.endsWith('/admin.html'))return;
if(u.pathname.endsWith('.json')){e.respondWith(caches.open(C).then(c=>Promise.race([fetch(r).then(x=>{if(x.ok)c.put(r,x.clone());return x}),new Promise((_,j)=>setTimeout(j,4000))]).catch(()=>c.match(r,{ignoreSearch:true})).then(x=>x||Response.error())));return}
e.respondWith(caches.open(C).then(c=>c.match(r,{ignoreSearch:true}).then(m=>{
const n=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))c.put(r,x.clone());return x}).catch(()=>m);
return m||n})))});
