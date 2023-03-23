
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);

//http://api.deezer.com/2.0/artist/2276/top?output=xml&limit=20

var options = ["TABLET", "20% DESC", "LIBRETA", "SMARTPHONE", "SIN PREMIO", "ORDENADOR", "20% DESC", "LIBRETA", "SMARTPHONE", "SIN PREMIO", "20% DESC", "LIBRETA"];
var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout;

var spinArcStart = 10;
var spinAngleStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

function init(){
	
	drawRouletteWheel();
	
	
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
}

function iniciar(){
    //document.getElementById('ruleta')!.classList.add('animar');
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 2000;
    rotateWheel();
  }

function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }

function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
  }

function getColor(item, maxitem) {
    var phase = 0;
    var center = 128;
    var width = 127;
    var frequency = Math.PI*2/maxitem;
    
    var red   = Math.sin(frequency*item+2+phase) * width + center;
    var green = Math.sin(frequency*item+0+phase) * width + center;
    var blue  = Math.sin(frequency*item+4+phase) * width + center;
    
    return RGB2Color(red,green,blue);
  }

function drawRouletteWheel() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var outsideRadius = 200;
      var textRadius = 120;
      var insideRadius = 25;
  
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,500,500);
  
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
  
      ctx.font = 'bold 12px Helvetica, Arial';
  
      for(var i = 0; i < options.length; i++) {
        var angle = startAngle + i * arc;
        //ctx.fillStyle = colors[i];
        ctx.fillStyle = getColor(i, options.length);
  
        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();
  
        ctx.save();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur    = 0;
        ctx.shadowColor   = "rgb(220,220,220)";
        ctx.fillStyle = "black";
        ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                      250 + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2);// + arc / 2 + Math.PI / 2
        var text = options[i];
        ctx.fillText(text, - ctx.measureText(text).width / 2, 0);
        ctx.restore();
      } 
  
      //Arrow
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      /*ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));*/
      ctx.fill();
    }
  }

function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout(() => rotateWheel(), 30);
  }

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    /*ctx.font = 'bold 30px Helvetica, Arial';
    var text = options[index]
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();*/
  }

function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b + c * (tc + (-3*ts) + 3*t);
  }


/*
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
		}else if(t === 'genre'){
			arr = json.data;
			placeGenres(arr);
		}else if(t === 'genre-artist'){
			arr = json.data;
			getRandomArtist(arr);
		}else if(t === 'artist-song'){
			arr = json.data;
			getRandomSong(arr);
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
		document.getElementById('it-sa').scrollLeft;
		document.getElementById('it-st').scrollTop;
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



//--------------------------- HELPERS ---------------------------------------
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
		_box.style.left = i * 150 + 'px';
		
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


function placeGenres(arr){
	const drawerEntries = [];
	const idsArray = [];
	
	for(var i=0; i<arr.length; i++){
		var _box = document.createElement('div'),
			_name = document.createElement('div');
			
		_box.className = 'box';
		_box.style.left = i * 160 + 'px';
		
		_name.innerHTML = arr[i].name;
		_name.className = 'box-name';
		_box.appendChild(_name);
		
		idsArray.push(arr[i].id);
		
		drawerEntries.push(_box); 
	}
	
	var container = document.getElementById('ra-items-container');
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
					getJson('https://api.deezer.com/genre/' + idsArray[index] + '/artists?output=jsonp', 'genre-artist');
					//location.href = 'song.html?id[]=' + idsArray[index] + "&option[]=song";
					//location.href = 'radio.html?' + trArray[index];
				}
				longPress = false;
			}
		});
	});
}

function getRandomArtist(arr){
	var ran = Math.floor(Math.random() * arr.length);
	//console.log(arr.length, ran);
	for(var i=0; i<arr.length; i++){
		if(i === ran){
			getJson('https://api.deezer.com/artist/' + arr[i].id + '/top?output=jsonp&limit=200', 'artist-song');
		}
	}
}

function getRandomSong(arr){
	var ran = Math.floor(Math.random() * arr.length);
	console.log(arr.length, ran);
	for(var i=0; i<arr.length; i++){
		if(i === ran){
			location.href = 'song.html?id[]=' + arr[i].id + "&option[]=song";
		}
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



function openURL(url) {
	window.open(url, '_blank').focus();
}
*/

