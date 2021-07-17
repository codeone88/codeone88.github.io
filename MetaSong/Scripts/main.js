
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);

//http://api.deezer.com/2.0/artist/2276/top?output=xml&limit=20

var input = document.getElementById("in");

function init(){
	
	getJson('https://api.deezer.com/chart/0?output=jsonp', 'top');
	getJson('https://api.deezer.com/radio?output=jsonp', 'radio');
	
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			startSearch();
		}
	});
}

function startSearch(){
	if(input.value.trim() !== ''){
		getJson('https://api.deezer.com/search?q=' + input.value, 'search');
	}
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
			console.log(json)
		}
	})
  	.catch(function(error) { console.log(error); });
}

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
