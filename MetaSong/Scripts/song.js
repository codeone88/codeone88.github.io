
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);

//http://api.deezer.com/2.0/artist/2276/top?output=xml&limit=20
var arr = [], alarr = [], cs = '', myAudio = document.getElementById("audio"), isAudio = false;
var option, id;

var s_sp, s_de, s_yo, s_ym;

function init(){
	
	//var id = window.location.href.split('?').pop();
	
	var li = window.location.href;
	var url = new URL(li);
	option = url.searchParams.get("option[]");
	id = url.searchParams.get("id[]");
	console.log(li);
	if(option === 'song'){
		getJson('https://api.deezer.com/track/' + id + '?output=jsonp', 'track');
	}else{
		getJson('https://api.deezer.com/artist/' + id + '?output=jsonp', 'artist');
	}
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
		}
	})
  	.catch(function(error) { console.log(error); });
}

function placeItems(){
	document.getElementById('musicArt').src = arr.album.cover_xl;
	addOpenAnimation('musicArt');
	
	document.title = arr.title + ' | Songlet';
	
	addSongInfo(arr.title, arr.album.title);
	getAlbumInfo(arr.album.id);
	getArtistInfo(arr.artist.id);
	addAlbums(arr.artist.id);
	
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
					getAlbumInfo(idsArray[index]);
					document.getElementById('musicArt').src = alarr[index].cover_xl;
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




/*





function placeTop(arr){
	
	document.getElementById('top-items-container').innerHTML = '';
	
	for(var i=0; i<arr.length; i++){
		
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_img = document.createElement('img');
			
		_box.className = 'box';
		_box.style.left = i * 160 + 'px';
		
		_img.src = arr[i].album.cover_medium;
		_box.appendChild(_img);
		
		_name.innerHTML = arr[i].title;
		_name.className = 'box-name';
		_box.appendChild(_name);
		
		_box.addEventListener('mousedown', function(e){
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
		
		_box.addEventListener('mouseup',function(e){
			if(disable_click_flag){
				e.preventDefault();
			}else{
				clearTimeout(timer);
				clearTimeout(timer3);
				if(!longPress){
					//api.apps.launchApplication(idsArray[index]);
					location.href
				}
				longPress = false;
			}
		});
		
		document.getElementById('top-items-container').appendChild(_box); 
	}
}

function placeGenres(arr){
	document.getElementById('genres-items-container').innerHTML = '';
	
	for(var i=1; i<arr.length; i++){
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_img = document.createElement('img');
			
		_box.className = 'box';
		_box.style.left = (i - 1) * 160 + 'px';
		
		_img.src = arr[i].picture_medium;
		_box.appendChild(_img);
		
		_name.innerHTML = arr[i].name;
		_name.className = 'box-name';
		_box.appendChild(_name);
		
		document.getElementById('genres-items-container').appendChild(_box); 
	}
}


//--------------------------- LIMITERS ---------------------------------------
var disable_click_flag = false, timer2, timer3, timer, longPress = false;
document.getElementById('it-tc').addEventListener('scroll', function(){
	if(timer2 !== null) {
		clearTimeout(timer2);        
	}
		
	disable_click_flag = true;
		
	timer2 = setTimeout(function() {
		disable_click_flag = false;
	}, 200);
},true);

document.getElementById('it-gc').addEventListener('scroll', function(){
	if(timer2 !== null) {
		clearTimeout(timer2);        
	}
		
	disable_click_flag = true;
		
	timer2 = setTimeout(function() {
		disable_click_flag = false;
	}, 200);
},true);




/*
function goHome(){
	$('html, body').animate({
		scrollTop: $('#section1').offset().top
	}, 200);
}

function openWindow(e){
	
	if(this.id === 'repoBtn'){
		$('html, body').animate({
			scrollTop: $('#section2').offset().top
		}, 200);
	}
	
	if(this.id === 'widBtn'){
		$('html, body').animate({
			scrollTop: $('#section3').offset().top
		}, 200);
	}
	
	if(this.id === 'soBtn'){
		$('html, body').animate({
			scrollTop: $('#section4').offset().top
		}, 200);
	}
}


function loadWidgets(){
	var data_url = "widgets.json";
	var data_obj = JSON.parse(get_data_from_url(data_url));
	var arrWid = data_obj.data;
	
	for(var i=0; i<arrWid.length; i++){
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_img = document.createElement('img');
			
		_box.classList.add('wid-box');
		_box.classList.add('midX');
		
		_img.src = 'img/widgets/' + arrWid[i].img;
		_img.classList.add('im-wid');
		_box.appendChild(_img);
		
		_name.innerHTML = arrWid[i].name;
		_name.classList.add('midY');
		_name.classList.add('nameW');
		_box.appendChild(_name);
		
		_box.classList.add('wid-item');
		_box.setAttribute("id", arrWid[i].img);
		
		document.getElementById('wid-cont').appendChild(_box);
	}
	
	const locItems = document.querySelectorAll('.wid-item');
	const imItems = document.querySelectorAll('.im-wid');
	locItems.forEach(item => item.addEventListener('click', openWidget));
	
	imItems.forEach(item => item.addEventListener('load', function(){
		this.style.opacity = 1;
	}));
}


function openWidget(){
	document.getElementById('image-viewer').style.display = 'block';
	document.getElementById('full-wid').src = 'img/widgets/' + this.id;
}

function closeWindow(str){
	document.getElementById(str).style.display = 'none';
}


function openSubmit(){
	document.getElementById('submit-view').style.display = 'block';
}


//--------------------- LOAD SETUPS ---------------------------
var arrSet = [];
function loadSetups(){
	var data_url = "setups.json";
	var data_obj = JSON.parse(get_data_from_url(data_url));
	arrSet = data_obj.data;
	
	for(var i=0; i<arrSet.length; i++){
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_img = document.createElement('img');
			
		_box.classList.add('set-box');
		//_box.classList.add('midX');
		
		_img.src = 'img/setups/' + arrSet[i].img;
		_img.classList.add('im-set');
		_box.appendChild(_img);
		
		_name.innerHTML = arrSet[i].name;
		_name.classList.add('center');
		_name.classList.add('nameS');
		_box.appendChild(_name);
		
		_box.classList.add('set-item');
		_box.setAttribute("id", i);
		
		document.getElementById('set-cont').appendChild(_box);
	}
	
	const locItems = document.querySelectorAll('.set-item');
	const imItems = document.querySelectorAll('.im-set');
	locItems.forEach(item => item.addEventListener('click', openSetup));
	
	imItems.forEach(item => item.addEventListener('load', function(){
		this.style.opacity = 1;
	}));
}

function openSetup(){
	document.getElementById('setup-viewer').style.display = 'block';
	document.getElementById('full-set').src = 'img/setups/' + arrSet[this.id].img;
	document.getElementById('_desc').innerHTML = '<b>' + arrSet[this.id].name + '</b><br><br>' +
									arrSet[this.id].list + '<br><br>' +
									"by <a href='" + arrSet[this.id].user + "' target='_blank'>" + arrSet[this.id].username + '</a>';
}



function get_data_from_url(url){
    var http_req = new XMLHttpRequest();
    http_req.open("GET",url,false);
    http_req.send(null);
    return http_req.responseText;          
}

*/
