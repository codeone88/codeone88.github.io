
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);


var radio = new Audio();
var source = ['http://stream.zeno.fm/db5hy4tr7k8uv', 
			'http://stream.zeno.fm/hfpsf54p8k8uv', 
			'', 
			'http://stream.zeno.fm/uudyz6aq8k8uv', 
			'http://stream.syntheticfm.com:8040/live'];
			
var names = ['Prog-Rock[CO88]','Alternative One','','Lo-Fi-U','Synthetic FM'];

var btnPlayPause = document.getElementById('playPause');

var currSt = 0;
var timer;
var SW;


function init(){
	
	setWave();
	playAudio();
	
	timer = setInterval(function(){
		document.getElementById('bg-im').src = 'https://source.unsplash.com/1600x900/?radio,music';
	}, 60000);
	
}

function playSt(num){
	currSt = num;
	document.getElementById('_title').innerHTML = names[num];
	playAudio();
	radio.play();
}

//----------------------------------- AUDIO ------------------------------------
function playAudio(){
	radio.src = source[currSt];
	radio.volume = 1;
	//radio.play();
	
	radio.addEventListener('play', function() {
	  	document.getElementById('playPause').classList.remove("zeek-buttonplay");
		document.getElementById('playPause').classList.add("zeek-buttonpause");
		SW.start();
		/*timer = setInterval(function(){
			SW.setSpeed(Math.random()*0.3);
			SW.setAmplitude(Math.random()*1);
			//NowPlaying();
		}, 60000);*/
	}, false);
	  
	radio.addEventListener('pause', function() {
	  	// Change the button to be a play button
	  	document.getElementById('playPause').classList.remove("zeek-buttonpause");
		document.getElementById('playPause').classList.add("zeek-buttonplay");
		//timer.clearInterval();
		SW.stop();
	}, false);
}


/*function NowPlaying(){
    $.ajax({
        url: source, 
        type: "GET",
        success: function(result) {
            $("#playing").html(result);
			document.getElementById('song-title').innerHTML = result;
			console.log(result);
        }
    });
}*/


function playPauseAudio() {
  	if (radio.src) {
		if (radio.paused || radio.ended) {
			radio.play();
		}
		else {
			radio.pause();
		}
  	}
}

//----------------------------------- WAVE ------------------------------------
function setWave(){
	document.getElementById('waveCont').style.width = window.innerWidth + 'px';
	
	SW = new SiriWave({
		style: 'ios',
		speed: 0.05,
		amplitude: 0.3,
		speedInterpolationSpeed: 0,
		container: document.getElementById('waveCont'),
		color:'#FFFFFF',
		autostart: false,
	});
}



/*function goHome(){
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
}*/
