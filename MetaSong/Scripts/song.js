
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);


var arr = [], alarr = [], cs = '', myAudio = document.getElementById("audio"), isAudio = false;
var option, id;
//var baseURL = 'https://metasong.000webhostapp.com/song.html?';
var baseURL = 'http://codeone88.github.io/MetaSong/song.html?';
var shareURL = '', imgURL = '';

var s_sp, s_de, s_yo, s_ym;

function init(){
	
	//var id = window.location.href.split('?').pop();
	
	var li = window.location.href;
	var url = new URL(li);
	option = url.searchParams.get("option[]");
	id = url.searchParams.get("id[]");
	//console.log(li);
	if(option === 'song'){
		getJson('https://api.deezer.com/track/' + id + '?output=jsonp', 'track');
	}else{
		getJson('https://api.deezer.com/artist/' + id + '?output=jsonp', 'artist');
	}
	
	document.getElementById("share-btn").addEventListener("click", async () => {
		  try {
			  if(shareURL !== ''){
				await navigator.share({ 
					title: document.title, 
					url: shareURL 
				});
				console.log("Data was shared successfully " + shareURL);
			  }
		  } catch (err) {
			console.log("Share failed:", err.message);
		  }
	});
}

function getJson(url, a){
	
	fetchJsonp(url)
	.then(function(response) {
    	return response.json();
  	})
  	.then(json => {
		if(a === 'track'){
			arr = json;
			placeItems();
		}else if(a === 'disc'){
			alarr = json.data;
			placeAlbums();
		}else if(a === 'album'){
			placeAlbumInfo(json);
		}else if(a === 'artist'){
			placeArtistInfo(json);
		}else if(a === 'artist-related'){
			placeRelatedInfo(json.data);
		}else if(a === 'artist-top'){
			placeTopInfo(json.data);
		}
	})
  	.catch(function(error) { console.log(error); });
}

function placeItems(){
	
	document.title = arr.title + ' | Songlet';
	document.getElementById('musicArt').src = arr.album.cover_xl;
	imgURL = arr.album.cover_medium;
	document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", imgURL);
	document.querySelector('meta[property="og:title"]').setAttribute("content", document.title);
				
	addOpenAnimation('musicArt');
	
	addSongInfo(arr.title, arr.album.title);
	getAlbumInfo(arr.album.id);
	getArtistInfo(arr.artist.id);
	addAlbums(arr.artist.id);
	
	shareURL = baseURL + 'id[]=' + arr.id + '&option[]=song';
	
	myAudio.src = arr.preview;
	
	s_sp = 'https://open.spotify.com/search/' + arr.title + ' ' + arr.artist.name;
	s_de = arr.album.link;
	s_yo = 'https://www.youtube.com/results?search_query=' + arr.title + ' ' + arr.artist.name;
	s_ym = 'https://api.music.apple.com/v1/catalog/us/search?term=' + arr.title + '+' + arr.artist.name + '&types=songs';
	
	addOpen('song');
	playPause();
}

function addSongInfo(title, album){
	document.getElementById('_title').innerHTML = title;
	document.getElementById('_album').innerHTML = album;
}


//--------------------------- ALBUM ---------------------------------------
function getAlbumInfo(id){
	getJson('https://api.deezer.com/album/' + id + '?output=jsonp', 'album');
}

function placeAlbumInfo(data){
	document.getElementById('album-title').innerHTML = data.title;
	
	var tracks = data.tracks.data;
	const drawerEntries = [];
	const idsArray = [];
	
	for(var i=0; i<tracks.length; i++){
		var _box = document.createElement('div'),
			_name = document.createElement('div');
			
		_box.className = 'song';
		
		_name.innerHTML = tracks[i].title;
		_name.className = 'song-name';
		_box.appendChild(_name);
		
		drawerEntries.push(_box);
	}
	
	var container = document.getElementById('songs-container');
	container.innerHTML = '';
	
	drawerEntries.forEach(function(element, index) {
		container.appendChild(element);
		
		element.addEventListener('mousedown', function(e){
			if(timer3 !== null) {
				clearTimeout(timer3);        
			}
			timer3 = setTimeout(function(){
				if(disable_click_flag){
					e.preventDefault();
				}else{
					timer = setTimeout(function(){
						longPress = true;
					}, 800);
				}
			}, 200);
		}, true);
		
		element.addEventListener('mouseup',function(e){
			if(disable_click_flag){
				e.preventDefault();
			}else{
				clearTimeout(timer);
				clearTimeout(timer3);
				if(!longPress){
					addSongInfo(tracks[index].title, data.title);
					
					document.title = tracks[index].title + ' | Songlet';
					
					s_sp = 'https://open.spotify.com/search/' + tracks[index].title + ' ' + tracks[index].artist.name;
					s_de = data.link;
					s_yo = 'https://www.youtube.com/results?search_query=' + tracks[index].title + ' ' + tracks[index].artist.name;
					s_ym = 'https://api.music.apple.com/v1/catalog/us/search?term=' + tracks[index].title + '+' + tracks[index].artist.name + '&types=songs';
					
					shareURL = baseURL + 'id[]=' + tracks[index].id + '&option[]=song';
					document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", imgURL);
					document.querySelector('meta[property="og:title"]').setAttribute("content", document.title);
					
					myAudio.src = tracks[index].preview;
					addOpen('song');
					myAudio.pause();
					isAudio = false;
					playPause();
				}
				longPress = false;
			}
		});
	});
}



//--------------------------- DISCOGRAPHY ---------------------------------------
function addAlbums(aid){
	getJson('https://api.deezer.com/artist/' + aid + '/albums?output=jsonp', 'disc');
}

function placeAlbums(){
	const drawerEntries = [];
	const idsArray = [];
	
	for(var i=0; i<alarr.length; i++){
		//console.log(alarr[i].title);
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_img = document.createElement('img');
			
		_box.className = 'box';
		
		_img.src = alarr[i].cover_medium;
		_box.appendChild(_img);
		
		_name.innerHTML = alarr[i].title;
		_name.className = 'box-name';
		_box.appendChild(_name);
		
		idsArray.push(alarr[i].id);
		
		drawerEntries.push(_box);
	}
	
	var container = document.getElementById('albums-container');
	container.innerHTML = '';
	
	drawerEntries.forEach(function(element, index) {
		container.appendChild(element);
		
		element.addEventListener('mousedown', function(e){
			if(timer3 !== null) {
				clearTimeout(timer3);        
			}
			timer3 = setTimeout(function(){
				if(disable_click_flag){
					e.preventDefault();
				}else{
					timer = setTimeout(function(){
						longPress = true;
						//showAlert(idsArray[index],'add');
					}, 800);
				}
			}, 200);
		}, true);
		
		element.addEventListener('mouseup',function(e){
			if(disable_click_flag){
				e.preventDefault();
			}else{
				clearTimeout(timer);
				clearTimeout(timer3);
				if(!longPress){
					document.getElementById('musicArt').src = alarr[index].cover_xl;
					imgURL = alarr[index].cover_medium;
					getAlbumInfo(idsArray[index]);
					addOpen('album');
				}
				longPress = false;
			}
		});
	});
}


//--------------------------- ARTIST ---------------------------------------
function getArtistInfo(id){
	getJson('https://api.deezer.com/artist/' + id + '?output=jsonp', 'artist');
}

function placeArtistInfo(data){
	document.getElementById('artist-title').innerHTML = data.name;
	document.getElementById('musicArtistArt').src = data.picture_xl;
	
	if(option === 'artist'){
		option = '';
		document.title = data.name + ' | Songlet';
		placeArtistItems(id);
		addOpen('artist');
	}
	
	getJson('https://api.deezer.com/artist/' + data.id + '/related?output=jsonp', 'artist-related');
	getJson('https://api.deezer.com/artist/' + data.id + '/top?output=jsonp&limit=20', 'artist-top');
}

function placeRelatedInfo(data){
	
	const drawerEntries = [];
	const idsArray = [];
	
	for(var i=0; i<data.length; i++){
		
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_img = document.createElement('img');
			
		idsArray.push(data[i].id);
		
		_box.className = 'box';
		_box.style.left = i * 120 + 'px';
		
		_img.src = data[i].picture_medium;
		_box.appendChild(_img);
		
		_name.innerHTML = data[i].name;
		_name.className = 'box-name';
		_box.appendChild(_name);
		
		drawerEntries.push(_box);
	}
	
	var container = document.getElementById('related-container');
	container.innerHTML = '';
	
	drawerEntries.forEach(function(element, index) {
		container.appendChild(element);
		
		element.addEventListener('mousedown', function(e){
			if(timer3 !== null) {
				clearTimeout(timer3);        
			}
			timer3 = setTimeout(function(){
				if(disable_click_flag){
					e.preventDefault();
				}else{
					timer = setTimeout(function(){
						longPress = true;
					}, 800);
				}
			}, 200);
		}, true);
		
		element.addEventListener('mouseup',function(e){
			if(disable_click_flag){
				e.preventDefault();
			}else{
				clearTimeout(timer);
				clearTimeout(timer3);
				if(!longPress){
					location.href = 'song.html?id[]=' + idsArray[index] + "&option[]=artist";
					//placeArtistItems(idsArray[index]);
					/*var params = new URLSearchParams();
					var song = [idsArray[index], 'song'];
					location.href = 'song.html?option[]=' + idsArray[index] + "&option[]=song";*/
				}
				longPress = false;
			}
		});
	});
}

function placeTopInfo(data){
	const drawerEntries = [];
	const idsArray = [];
	
	for(var i=0; i<data.length; i++){
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			//_artist = document.createElement('div'),
			_img = document.createElement('img');
			
		idsArray.push(data[i].id);
		
		_box.className = 'r-song';
		
		_img.src = data[i].album.cover_medium;
		_box.appendChild(_img);
		
		_name.innerHTML = data[i].title;
		_name.className = 'r-name';
		_box.appendChild(_name);
		
		/*_artist.innerHTML = data[i].artist.name;
		_artist.className = 'r-artist';
		_box.appendChild(_artist);*/
		
		drawerEntries.push(_box);
	}
	
	var container = document.getElementById('top-songs');
	container.innerHTML = '';
	
	drawerEntries.forEach(function(element, index) {
		container.appendChild(element);
		
		element.addEventListener('mousedown', function(e){
			if(timer3 !== null) {
				clearTimeout(timer3);        
			}
			timer3 = setTimeout(function(){
				if(disable_click_flag){
					e.preventDefault();
				}else{
					timer = setTimeout(function(){
						longPress = true;
					}, 800);
				}
			}, 200);
		}, true);
		
		element.addEventListener('mouseup',function(e){
			if(disable_click_flag){
				e.preventDefault();
			}else{
				clearTimeout(timer);
				clearTimeout(timer3);
				if(!longPress){
					location.href = 'song.html?id[]=' + idsArray[index] + "&option[]=song";
				}
				longPress = false;
			}
		});
	});
}

function placeArtistItems(id){
	document.getElementById('musicArt').src = '';
	getArtistInfo(id);
	addAlbums(id);
	
	document.getElementById('songs-container').innerHTML = '';
	document.getElementById('album-title').innerHTML = '';
	
	document.getElementById('_title').innerHTML = '';
	document.getElementById('_album').innerHTML = '';
	
	myAudio.src = '';
}


//---------------------------------- HELPER FUNCTIONS --------------------------------------
function addOpen(el){
	if(el !== cs && el !== 'openwith-container'){
		if(cs !== ''){
			removeOpen(cs);
		}
		
		if(el === 'song'){
			document.getElementById('song-btn').classList.add('selected');
			document.getElementById('album-btn').classList.remove('selected');
			document.getElementById('albums-btn').classList.remove('selected');
			document.getElementById('artist-btn').classList.remove('selected');
			
			addOpenAnimation('musicArt');
			removeOpen('musicArtistArt');
			
			document.getElementById('cover').classList.remove('addBlur');
			document.getElementById('head-container').classList.remove('addBlur');
		}else if(el === 'albums'){
			document.getElementById('song-btn').classList.remove('selected');
			document.getElementById('artist-btn').classList.remove('selected');
			document.getElementById('album-btn').classList.remove('selected');
			document.getElementById('albums-btn').classList.add('selected');
			
			addOpenAnimation('musicArt');
			removeOpen('musicArtistArt');
			
			document.getElementById('cover').classList.add('addBlur');
			document.getElementById('head-container').classList.add('addBlur');
		}else if(el === 'artist'){
			document.getElementById('song-btn').classList.remove('selected');
			document.getElementById('albums-btn').classList.remove('selected');
			document.getElementById('album-btn').classList.remove('selected');
			document.getElementById('artist-btn').classList.add('selected');
			
			addOpenAnimation('musicArtistArt');
			removeOpen('musicArt');
			
			document.getElementById('cover').classList.remove('addBlur');
			document.getElementById('head-container').classList.remove('addBlur');
		}else{
			document.getElementById('song-btn').classList.remove('selected');
			document.getElementById('artist-btn').classList.remove('selected');
			document.getElementById('albums-btn').classList.remove('selected');
			document.getElementById('album-btn').classList.add('selected');
			
			addOpenAnimation('musicArt');
			removeOpen('musicArtistArt');
			
			document.getElementById('cover').classList.remove('addBlur');
			document.getElementById('head-container').classList.remove('addBlur');
		}
	
		document.getElementById(el).style.display = 'block';
		setTimeout(function(){
			document.getElementById(el).classList.add('open');
			document.getElementById(el).classList.remove('closed');
			cs = el;
		}, 100);
	}
	
	if(el === 'openwith-container'){
		if(document.getElementById(el).classList.contains('closed')){
			addOpenAnimation(el);
			
			document.getElementById('arrow').classList.add('open');
		}else{
			document.getElementById('arrow').classList.remove('open');
			removeOpen(el);
		}
	}
}

function addOpenAnimation(el){
	document.getElementById(el).style.display = 'block';
	setTimeout(function(){
		document.getElementById(el).classList.add('open');
		document.getElementById(el).classList.remove('closed');
	}, 100);
}

function removeOpen(el){
	document.getElementById(el).classList.remove('open');
	document.getElementById(el).classList.add('closed');
	setTimeout(function(){
		document.getElementById(el).style.display = 'none';
	}, 300);
}


function playPause(){
	//if(myAudio.src !== ''){
		myAudio.addEventListener("ended", function() {
			document.getElementById('playPause').classList.remove("zeek-buttonpause");
			document.getElementById('playPause').classList.add("zeek-buttonplay");
			isAudio = false;
		});
		
		if(!isAudio){
			myAudio.play();
			document.getElementById('playPause').classList.remove("zeek-buttonplay");
			document.getElementById('playPause').classList.add("zeek-buttonpause");
			isAudio = true;
		}else{
			myAudio.pause();
			document.getElementById('playPause').classList.remove("zeek-buttonpause");
			document.getElementById('playPause').classList.add("zeek-buttonplay");
			isAudio = false;
		}
	//}
}

function openService(url, _new = true) {
	if(_new){
 		window.open(url, '_blank').focus();
	}else{
		location.href = url;
	}
}


//--------------------------- LIMITERS ---------------------------------------
var disable_click_flag = false, timer2, timer3, timer, longPress = false;
document.getElementById('albums-container').addEventListener('scroll', function(){
	if(timer2 !== null) {
		clearTimeout(timer2);        
	}
		
	disable_click_flag = true;
		
	timer2 = setTimeout(function() {
		disable_click_flag = false;
	}, 200);
},true);


