
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);


function init(){
	
	var tr = window.location.href.split('?').pop();
	
	getJson(tr + '?output=jsonp');
}

function getJson(url){
	
	fetchJsonp(url)
	.then(function(response) {
    	return response.json();
  	})
  	.then(json => {
		placeRadioTracks(json.data);
	})
  	.catch(function(error) { console.log(error); });
}

function placeRadioTracks(arr){
	
	const drawerEntries = [];
	const idsArray = [];
	
	for(var i=0; i<arr.length; i++){
		
		var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_artist = document.createElement('div'),
			_img = document.createElement('img');
			
		idsArray.push(arr[i].id);
		
		_box.className = 'r-song';
		//_box.style.left = i * 160 + 'px';
		
		_img.src = arr[i].album.cover_medium;
		_box.appendChild(_img);
		
		_name.innerHTML = arr[i].title;
		_name.className = 'r-name';
		_box.appendChild(_name);
		
		_artist.innerHTML = arr[i].artist.name;
		_artist.className = 'r-artist';
		_box.appendChild(_artist);
		
		drawerEntries.push(_box); 
	}
	
	var container = document.getElementById('radio-songs-container');
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


//--------------------------- LIMITERS ---------------------------------------
var disable_click_flag = false, timer2, timer3, timer, longPress = false;
document.getElementById('radio-songs-container').addEventListener('scroll', function(){
	if(timer2 !== null) {
		clearTimeout(timer2);        
	}
		
	disable_click_flag = true;
		
	timer2 = setTimeout(function() {
		disable_click_flag = false;
	}, 200);
},true);

