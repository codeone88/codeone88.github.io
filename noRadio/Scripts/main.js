
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);


var radio = new Audio();
var source = ['http://stream.zeno.fm/db5hy4tr7k8uv', 
			'http://stream.zeno.fm/hfpsf54p8k8uv', 
			'http://stream.zeno.fm/p4b7mfuh9k8uv', 
			'http://stream.zeno.fm/uudyz6aq8k8uv', 
			'http://stream.syntheticfm.com:8040/live'];
			
var names = ['Prog-Rock[CO88]','Alternative One','Chill-Hill','Lo-Fi-U','Synthetic FM'];

var btnPlayPause = document.getElementById('playPause');

var currSt = 0;
var timer, tim;
var SW;
var waveStarted = false, drunk = false;

var beers = 1, myBeers = 0, adCount = 0;



function init(){
	
	//setWave();
	playAudio();
	
	timer = setInterval(function(){
		document.getElementById('bg-im').src = 'https://source.unsplash.com/1600x900/?radio,music,wallpaper,background';
	}, 60000);
	
	addOpen('name-window');
	
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
	  	btnPlayPause.classList.remove("zeek-buttonplay");
		btnPlayPause.classList.add("zeek-buttonpause");
		if(!waveStarted){
			waveStarted = true;
			SW.start();
		}
		/*timer = setInterval(function(){
			//NowPlaying();
		}, 60000);*/
	}, false);
	  
	radio.addEventListener('pause', function() {
	  	// Change the button to be a play button
	  	btnPlayPause.classList.remove("zeek-buttonpause");
		btnPlayPause.classList.add("zeek-buttonplay");
		//timer.clearInterval();
		SW.stop();
		waveStarted = false;
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


//----------------------------------- HELPER FUNCTIONS ------------------------------------
function move(){
	if(document.getElementById('chat').classList.contains('closed')){
		document.getElementById('chat').classList.remove('closed');
		document.getElementById('chat').classList.add('open');
		
		return;
	}else{
		document.getElementById('chat').classList.add('closed');
		document.getElementById('chat').classList.remove('open');
		
		return;
	}
}


function addOpen(el){
	document.getElementById(el).style.display = 'block';
	setTimeout(function(){
		document.getElementById(el).classList.add('open');
	}, 100);
}

function removeOpen(el){
	document.getElementById(el).classList.remove('open');
	setTimeout(function(){
		document.getElementById(el).style.display = 'none';
	}, 300);
}


//------------------------------ BEERS -----------------------------------------
function beerMe(){
	
	if(beers > 0){
		if(myBeers < 50){
			beers--;
			document.getElementById('bc').innerHTML = beers;
			
			myBeers++;
			updateMybeers();
		}else{
			return;
		}
	}
	
}

function updateMybeers(){
	document.getElementById('lvl-mask').style.height = myBeers * 100 / 50 + '%';
	
	if(myBeers > 25){	
		var bl = myBeers * 2 / 50;
		document.documentElement.style.setProperty('--bl', bl + 'px');
		if(!drunk){
			drunk = true;
			tim = setInterval(function(){
				myBeers--;
				updateMybeers();
			},10000);
		}
	}else{
		drunk = false;
		clearInterval(tim);
		document.documentElement.style.setProperty('--bl', '0px');
	}
}

function getBeers(){
	beers += 5;
	document.getElementById('bc').innerHTML = beers;
	adCount++;
	if(adCount > 2){
		adCount = 0;
		window.open('https://www.gatetotrustednetwork.com/duvw7fj9e?key=5a49b868ecd4aaf9f109fee0c60bf812', '_blank');
	}
}


