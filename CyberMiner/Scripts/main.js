
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
	var data_url = cors + 'info.json';
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






