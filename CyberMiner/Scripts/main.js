
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);

const cors = '';//'https://cors-anywhere.herokuapp.com/';


function init(){
	/*const menuItems = document.querySelectorAll('.txt-head');
	menuItems.forEach(item => item.addEventListener('click', openWindow));
	
	loadWidgets();*/
	
	startHackAn();
	
	loadCoinInfo();
	
}

function loadCoinInfo(){
	var data_url = cors + 'https://pastebin.com/raw/iVFanYFQ';
	var data_obj = JSON.parse(get_data_from_url(data_url));
	var coin_price = data_obj.cvalue;
	
	var data_url_bi = 'https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT';
	var data_obj_bi = JSON.parse(get_data_from_url(data_url_bi));
	var doge_price = data_obj_bi.price;
	
	document.getElementById('current-price').innerHTML = 
		'#CASTOR = $' + coin_price + 
		'<br>#DOGE = $' + doge_price;
}

function get_data_from_url(url){
    var http_req = new XMLHttpRequest();
    http_req.open("GET",url,false);
    http_req.send(null);
    return http_req.responseText;          
}


function startHackAn(){
	let cont = document.getElementById('hack-window');
    let hacker = document.getElementById('hacker');
    const w = (hacker.width = cont.offsetWidth);
    const h = (hacker.height = cont.offsetHeight);
    const ctx = hacker.getContext("2d");
    const p = Array(Math.floor(w / 10) + 1).fill(0);
    const random = (items) => items[Math.floor(Math.random() * items.length)];
    const hex = "0123456789ABCDEFG".split("");
	
	setInterval(() => {
    	ctx.fillStyle = "rgba(0, 0, 0, .05)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "green";
        p.map((v, i) => {
        	ctx.fillText(random(hex), i * 10, v);
            p[i] = v >= h || v > 50 + 10000 * Math.random() ? 0 : v + 10;
        });
    }, 50);
}




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


