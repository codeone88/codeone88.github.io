
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);

//http://api.deezer.com/2.0/artist/2276/top?output=xml&limit=20
var arr = [], alarr = [], cs = '', myAudio, isAudio = false;

function init(){
	
	var id = window.location.href.split('?').pop();
	
	getJson('https://api.deezer.com/track/' + id + '?output=jsonp');
}

function getJson(url, a = 'track'){
	
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
		}else{
			placeAlbumInfo(json);
		}
	})
  	.catch(function(error) { console.log(error); });
}

function placeItems(){
	document.getElementById('musicArt').src = arr.album.cover_xl;
	
	addSongInfo(arr.title, arr.album.title);
	getAlbumInfo(arr.album.id);
	addAlbums();
	
	myAudio = document.getElementById("audio");
	myAudio.src = arr.preview;
	currSong = arr.preview;
	
	addOpen('song');
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
					myAudio.src = tracks[index].preview;
					addOpen('song');
					playPause();
					playPause();
				}
				longPress = false;
			}
		});
	});
}



//--------------------------- DISCOGRAPHY ---------------------------------------
function addAlbums(){
	var aid = arr.artist.id;
	
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




//---------------------------------- HELPER FUNCTIONS --------------------------------------
function addOpen(el){
	if(el !== cs){
		if(cs !== ''){
			removeOpen(cs);
		}
		
		if(el === 'song'){
			document.getElementById('song-btn').classList.add('selected');
			document.getElementById('album-btn').classList.remove('selected');
			document.getElementById('albums-btn').classList.remove('selected');
			
			document.getElementById('cover').classList.remove('addBlur');
			document.getElementById('head-container').classList.remove('addBlur');
		}else if(el === 'albums'){
			document.getElementById('song-btn').classList.remove('selected');
			document.getElementById('album-btn').classList.remove('selected');
			document.getElementById('albums-btn').classList.add('selected');
			
			document.getElementById('cover').classList.add('addBlur');
			document.getElementById('head-container').classList.add('addBlur');
		}else{
			document.getElementById('song-btn').classList.remove('selected');
			document.getElementById('albums-btn').classList.remove('selected');
			document.getElementById('album-btn').classList.add('selected');
			
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
}

function removeOpen(el){
	document.getElementById(el).classList.remove('open');
	document.getElementById(el).classList.add('closed');
	setTimeout(function(){
		document.getElementById(el).style.display = 'none';
	}, 300);
}


function playPause(){
	
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
}




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