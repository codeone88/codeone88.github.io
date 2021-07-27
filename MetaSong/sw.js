

const cacheName = 'app-shell-rsrs-v1';
/*const dynamicCacheName = 'dynamic-cache-v1';
const assets = [
	'./',
	'./index.html',
	'./radio.html',
	'./song.html',
	'./Scripts/app.js',
	'./Scripts/main.js',
	'./Scripts/radio.js',
	'./Scripts/song.js',
	'./Styles/radio.css',
	'./Styles/song.css',
	'./Styles/style.css',
	'https://cdnjs.cloudflare.com/ajax/libs/fetch-jsonp/1.1.1/fetch-jsonp.js',
	'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap',
	'https://fonts.gstatic.com/s/ubuntu/v15/4iCv6KVjbNBYlgoCjC3jsGyNPYZvgw.woff2 ',
	'https://fonts.gstatic.com/s/ubuntu/v15/4iCs6KVjbNBYlgoKfw72nU6AFw.woff2',
	'./img/deezer.png',
	'./img/spotify.png',
	'./img/twitter.png',
	'./img/you.png',
	'./img/logo.png',
	'./Fonts/music.ttf',
	'./manifest.json'
];*/

const limitCacheSize = (name, size) => {
	caches.open(name).then(cache => {
		cache.keys().then(keys => {
			if(keys.length > size){
				cache.delete(keys[0]).then(limitCacheSize(name,size));
			}
		});
	});
};

self.addEventListener('install', evt => {
	
	console.log('service worker has been installed.');
	
	/*evt.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll(assets);
		})
	);*/
});

self.addEventListener('activate', evt => {
	console.log('service worker has been activated.');
	
	/*evt.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key !== cacheName)
				.map(key => caches.delete())
			)
		})
	);*/
});

self.addEventListener('fetch', evt => {
	/*console.log(evt);
	
	evt.respondWith(
		caches.match(evt.request).then(cacheRes => {
			return cacheRes || fetch(evt.request).then(fetchRes => {
				return caches.open(dynamicCacheName).then(cache => {
					cache.put(evt.request.url, fetchRes.clone());
					limitCacheSize(dynamicCacheName, 15);
					return fetchRes;
				});
			});
		}).catch(() => {
			if(evt.request.url.indexOf('.html') > -1){
				return caches.match('index.html');//or return defaul html
			}
		})
	);*/
});
