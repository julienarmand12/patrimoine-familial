const CACHE='patrimoine-familial-v13-network-first';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg?v=6','./sw.js?v=13'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==location.origin)return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(res=>{
   const copy=res.clone();
   caches.open(CACHE).then(cache=>cache.put('./index.html',copy));
   return res;
  }).catch(()=>caches.match('./index.html').then(hit=>hit||caches.match('./'))));
  return;
 }
 event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{
  const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));return res;
 }).catch(()=>caches.match('./index.html'))));
});