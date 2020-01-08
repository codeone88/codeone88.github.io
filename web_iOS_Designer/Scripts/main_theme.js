
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);

var id;
var arrSetT = [];

function initTheme(){
	const urlParams = new URLSearchParams(window.location.search);
	id = urlParams.get('themevar');
	
	//console.log(id);
	loadTheme();
}


//--------------------- LOAD THEME ---------------------------

function loadTheme(){
	var data_url = "themes.json";
	var data_obj = JSON.parse(get_data_from_url(data_url));
	arrSetT = data_obj.data;
	
	for(var i=0; i<arrSetT.length; i++){
		if(arrSetT[i].package === id){
			document.title = 'iOS_Designer | ' + arrSetT[i].name;
			document.getElementById('desc').innerHTML = arrSetT[i].desciption;
			showSc(arrSetT[i].img);
			document.getElementById('txt').innerHTML = arrSetT[i].wNew;
			document.getElementById('ver').innerHTML = 'Version: ' + arrSetT[i].version;
			document.getElementById('pri').innerHTML = 'Price: ' + arrSetT[i].price;
			document.getElementById('ios').innerHTML = 'iOS Version: ' + arrSetT[i].miniosver + ' - ' + arrSetT[i].maxiosver;
			//document.getElementById('con').innerHTML = 'Contact: ';
		}
		/*var _box = document.createElement('div'),
			_name = document.createElement('div'),
			_mmver = document.createElement('div'),
			_price = document.createElement('div'),
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
		
		document.getElementById('set-cont').appendChild(_box);*/
	}
	
	/*const locItems = document.querySelectorAll('.set-item');
	const imItems = document.querySelectorAll('.im-set');
	locItems.forEach(item => item.addEventListener('click', openSetup));
	
	imItems.forEach(item => item.addEventListener('load', function(){
		this.style.opacity = 1;
	}));*/
}

function showSc(_src){
	for(var i=0; i<_src.length; i++){
		image = document.createElement('img')
		image.id = scPath + _src[i];
		image.classList.add('sc');
		image.src = scPath + _src[i];
		console.log(scPath + _src[i]);
		document.getElementById('scCont').appendChild(image);
	}
	
	const imItems = document.querySelectorAll('.sc');
	imItems.forEach(item => item.addEventListener('click', openImage));
}

function openImage(){
	var largeImage = document.getElementById(this.id);
   	largeImage.style.display = 'block';
   	largeImage.style.width = "200px";
   	var url = largeImage.getAttribute('src');
   	window.open(url,'Image','width=largeImage.stylewidth,resizable=1');

}


//--------------------------- JSON FUNCTION ------------------------------
function get_data_from_url(url){
    var http_req = new XMLHttpRequest();
    http_req.open("GET",url,false);
    http_req.send(null);
    return http_req.responseText;        
}
