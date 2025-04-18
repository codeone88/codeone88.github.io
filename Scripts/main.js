
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);



let appsIcons = [
	{
		img:'wallers',
		name: 'Wallers - Gallery',
		description: 'Need a good wallpaper? You will find the best creators with hundreds of images.',
		ios: 'https://apps.apple.com/us/app/wallers-gallery/id1587422624',
		android: 'https://play.google.com/store/apps/details?id=air.Enter.wallers&hl=en_US&gl=EC'
	},
	{
		img:'dabloons',
		name: 'D. Bank',
		description: 'Keep record and store your Dabloons. Use our chat to meet new people.',
		ios: 'https://apps.apple.com/us/app/d-bank-store-your-dabloons/id1658163549',
		android: 'https://play.google.com/store/apps/details?id=air.enter.dabloonsbank'
	},
	{
		img:'pods',
		name: 'Pods - Minimal RSS News Reader',
		description: 'Stay in touch with the latest news with our AI powered app.',
		ios: 'https://apps.apple.com/us/app/pods-minimal-rss-news-reader/id6478560203',
		android: 'https://play.google.com/store/apps/details?id=air.enter.pods'
	},
	{
		img:'coin',
		name: 'CoinKeeper',
		description: 'Keep track of your money.',
		ios: 'https://apps.apple.com/us/app/coinkeeper-track-your-money/id6448895132',
		android: 'https://play.google.com/store/apps/details?id=air.enter.coinkeeper'
	},
	{
		img:'walltastik',
		name: 'WalltastiK',
		description: 'Collections of free wallpapers for you.',
		ios: 'https://apps.apple.com/us/app/walltastik/id6470945073',
		android: 'https://play.google.com/store/apps/details?id=air.enter.walltastik'
	},
	{
		img:'lofi',
		name: 'Lo-Fi-U',
		description: 'Music to chill, relax and study.',
		ios: 'https://apps.apple.com/us/app/lo-fi-u/id1451719398',
		android: 'https://play.google.com/store/apps/details?id=air.enter.LouPhai2&hl=en_US&gl=EC'
	},
	{
		img:'reader',
		name: 'The.Reader',
		description: 'Interesting stories from around the globe.',
		ios: 'https://apps.apple.com/us/app/the-reader/id6444778523',
		android: 'https://play.google.com/store/apps/details?id=air.enter.story'
	},
	{
		img:'soft',
		name: 'Soft',
		description: 'Relax and meditate.',
		ios: 'https://apps.apple.com/us/app/soft-meditate-and-relax/id1624303770',
		android: 'https://play.google.com/store/apps/details?id=air.Enter.Soft'
	}
];


function init(){
	setTimeout(() => {
		show('main-title');
		setTimeout(() => {
			close('main-title');
			show('social-cont');
			show('logo');
			loadItems();
		}, 3000);
	},500);
}

function loadItems(){
	for(var i=0; i<appsIcons.length; i++){
		document.getElementById('apps-container').appendChild(appItem(appsIcons[i]));
	}
	
	show('apps-container', 500);
}

function appItem(data){
	let cont = document.createElement('div'),
		name = document.createElement('div'),
		icon = document.createElement('img'),
		incont = document.createElement('div'),
		desc = document.createElement('p'),
		incont2 = document.createElement('div'),
		iconAp = document.createElement('img'),
		iconAn = document.createElement('img');
	
	cont.classList.add('app-cont');
	
	name.classList.add('app-name');
	name.innerHTML = data.name;
	cont.appendChild(name);
	
	incont.classList.add('app-incont');
	
	icon.classList.add('shadow-dark-out');
	icon.src = 'img/app_icons/icon-' + data.img + '.png';
	incont.appendChild(icon);
	
	desc.classList.add('app-desc');
	desc.innerHTML = data.description;
	incont.appendChild(desc);
	
	cont.appendChild(incont);
	
	incont2.classList.add('app-incont');
	
	iconAp.classList.add('img');
	iconAp.src = 'img/apple.png';
	iconAp.onclick = () => {window.open(data.ios, '_blank');}
	incont2.appendChild(iconAp);
	
	iconAn.classList.add('img');
	iconAn.src = 'img/android.png';
	iconAn.onclick = () => {window.open(data.android, '_blank');}
	incont2.appendChild(iconAn);
	
	cont.appendChild(incont2);
	
	return cont;
}






function show(el, delay = 100){
	document.getElementById(el).style.display = 'block';
	setTimeout(()=>{
		document.getElementById(el).classList.remove('close');
		document.getElementById(el).classList.add('show');
	}, delay);
} 

function close(el){
	document.getElementById(el).classList.add('close');
	document.getElementById(el).classList.remove('show');
	setTimeout(()=>{
		document.getElementById(el).style.display = 'none';
	}, 400);
}

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
