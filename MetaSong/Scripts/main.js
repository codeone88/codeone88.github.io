
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);

//http://api.deezer.com/2.0/artist/2276/top?output=xml&limit=20

var input = document.getElementById("in");

function init(){
	
	getJson('https://api.deezer.com/chart/0?output=jsonp', 'top');
	getJson('https://api.deezer.com/radio?output=jsonp', 'radio');
	
	//getJson('https://api.deezer.com/search/autocomplete&q=eminem&output=jsonp', 'search');
	
	/*fetch("https://api.deezer.com/search?q=eminem", {
		"method": "GET",
		"mode": "no-cors",
		'headers': {
            'Access-Control-Allow-Origin': '*'
        }
	})
	.then(response => {
		console.log(response.json());
	})
	.then(function(data) {
		console.log(data);
    })
	.catch(err => {
		console.error(err);
	});*/
	
	
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			startSearch();
		}
	});
}

function getJson(url, t){
	
	fetchJsonp(url)
	.then(function(response) {
    	return response.json();
  	})
  	.then(json => {
		var arr; 
		if(t === 'top'){
			arr = json.tracks.data;
			placeTop(arr);
		}else if(t === 'radio'){
			arr = json.data;
			placeRadios(arr);
		}else if(t === 'search'){
			placeSearchItems(json);
		}
	})
  	.catch(function(error) { console.log(error); });
}



//--------------------------- SEARCH ---------------------------------------
function startSearch(){
	if(input.value.trim() !== ''){
		getJson('https://api.deezer.com/search/autocomplete&q=' + input.value + '&output=jsonp', 'search');
		addOpenAnimation('search-container');
	}
}

function placeSearchItems(data){
	
	placeArtistsItems(data);
	placeTracksItems(data);
	
}

function placeArtistsItems(data){
	var artists = data.artists.data;
	const drawerEntries = [];
	const idsArray = [];
	
	for(var i=0; i<artists.length; i++){
		
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_img = document.createElement('img');
			
		idsArray.push(artists[i].id);
		
		_box.className = 'box';
		_box.style.left = i * 120 + 'px';
		
		_img.src = artists[i].picture_medium;
		_box.appendChild(_img);
		
		_name.innerHTML = artists[i].name;
		_name.className = 'box-name';
		_box.appendChild(_name);
		
		drawerEntries.push(_box); 
	}
	
	var container = document.getElementById('sa-items-container');
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
				}
				longPress = false;
			}
		});
	});
}

function placeTracksItems(data){
	var tracks = data.tracks.data;
	const drawerEntries = [];
	const idsArray = [];
	
	for(var i=0; i<tracks.length; i++){
		
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_artist = document.createElement('div'),
			_img = document.createElement('img');
			
		idsArray.push(tracks[i].id);
		
		_box.className = 'r-song';
		
		_img.src = tracks[i].album.cover_medium;
		_box.appendChild(_img);
		
		_name.innerHTML = tracks[i].title;
		_name.className = 'r-name';
		_box.appendChild(_name);
		
		_artist.innerHTML = tracks[i].artist.name;
		_artist.className = 'r-artist';
		_box.appendChild(_artist);
		
		drawerEntries.push(_box); 
	}
	
	var container = document.getElementById('st-items-container');
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



//--------------------------- HOME ITEMS ---------------------------------------
function placeTop(arr){
	
	const drawerEntries = [];
	const idsArray = [];
	
	for(var i=0; i<arr.length; i++){
		
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_img = document.createElement('img');
			
		idsArray.push(arr[i].id);
		
		_box.className = 'box';
		_box.style.left = i * 160 + 'px';
		
		_img.src = arr[i].album.cover_medium;
		_box.appendChild(_img);
		
		_name.innerHTML = arr[i].title;
		_name.className = 'box-name';
		_box.appendChild(_name);
		
		drawerEntries.push(_box); 
	}
	
	var container = document.getElementById('top-items-container');
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
					//var params = new URLSearchParams();
					//var song = [idsArray[index], 'song'];
  					//params.append("id", idsArray[index]);
					//location.href = 'song.html?' + idsArray[index];
					location.href = 'song.html?id[]=' + idsArray[index] + "&option[]=song";
				}
				longPress = false;
			}
		});
	});
}

function placeRadios(arr){
	const drawerEntries = [];
	const trArray = [];
	
	for(var i=0; i<arr.length; i++){
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_img = document.createElement('img');
			
		_box.className = 'box';
		//_box.style.left = i * 160 + 'px';
		
		_img.src = arr[i].picture_medium;
		_box.appendChild(_img);
		
		_name.innerHTML = arr[i].title;
		_name.className = 'box-name';
		_box.appendChild(_name);
		
		trArray.push(arr[i].tracklist);
		
		drawerEntries.push(_box); 
	}
	
	var container = document.getElementById('genres-items-container');
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
					//location.href = 'song.html?id[]=' + idsArray[index] + "&option[]=song";
					location.href = 'radio.html?' + trArray[index];
				}
				longPress = false;
			}
		});
	});
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


