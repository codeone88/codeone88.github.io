
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);



function initThemes(){
	AOS.init({
        easing: 'ease-in-out-sine'
    });
	
	const menuItems = document.querySelectorAll('.txt-head');
	menuItems.forEach(item => item.addEventListener('click', openWindow));
	
	loadThemes();
}

function goHome(){
	$('html, body').animate({
		scrollTop: $('#section1').offset().top
	}, 200);
}

/*function openWindow(e){
	
	$('input[name=menu-btn]').attr('checked', false);
	
	if(this.id === 'home'){
		$('html, body').animate({
			scrollTop: $('#section1').offset().top
		}, 200);
	}
	
	if(this.id === 'repo'){
		$('html, body').animate({
			scrollTop: $('#section2').offset().top
		}, 200);
	}
	
	
	if(this.id === 'social'){
		$('html, body').animate({
			scrollTop: $('#section4').offset().top
		}, 200);
	}
	
}*/


//--------------------- LOAD THEMES ---------------------------
var arrSet = [];
function loadThemes(){
	var data_url = "themes.json";
	var data_obj = JSON.parse(get_data_from_url(data_url));
	arrSet = data_obj.data;
	
	themeMaker.makeTheme({
        holder: document.getElementById('section2T'),
		color: '#484848',
        dayCount: arrSet.length, //number of days
        dayWidth: 300, //holder width can also be used as spacing
        dayHeight: 250, //holder height
        imgWidth: 300, //image size
        font: 'reg',
        dayTop: 210, //day vertical position from top
        tempBottom: 0, //temp vertical position from bottom
        fontSize: 20, //day text and temp size
        iconURL: 'img/themes/', //url to icon
        iconsName: 'weatherIcons', //id for weather icons (increments)
        daysName: 'weatherDays', //id for days (increments)
        tempsName: 'weatherTemps', //id for temps (increments)
    });
	
	var icon, i;
    for (i = 0; i < fcastObj.dayCount; i++) { 
        document.getElementById(fcastObj.icon + i).src = fcastObj.iconURL +  arrSet[i].img[0];
        document.getElementById(fcastObj.day + i).innerHTML = arrSet[i].name;
        document.getElementById(fcastObj.temp + i).innerHTML = arrSet[i].price;
        document.getElementById(fcastObj.mmv + i).innerHTML = 'iOS ' + arrSet[i].miniosver + ' - ' + arrSet[i].maxiosver;
    }
	
	/*for(var i=0; i<arrSet.length; i++){
		var _box = document.createElement('div'),
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
		
		document.getElementById('set-cont').appendChild(_box);
	}
	
	/*const locItems = document.querySelectorAll('.set-item');
	const imItems = document.querySelectorAll('.im-set');
	locItems.forEach(item => item.addEventListener('click', openSetup));
	
	imItems.forEach(item => item.addEventListener('load', function(){
		this.style.opacity = 1;
	}));*/
}

/*function openSetup(){
	document.getElementById('setup-viewer').style.display = 'block';
	document.getElementById('full-set').src = 'img/setups/' + arrSet[this.id].img;
	document.getElementById('_desc').innerHTML = '<b>' + arrSet[this.id].name + '</b><br><br>' +
									arrSet[this.id].list + '<br><br>' +
									"by <a href='" + arrSet[this.id].user + "' target='_blank'>" + arrSet[this.id].username + '</a>';
}*/


//--------------------------- JSON FUNCTION ------------------------------
function get_data_from_url(url){
    var http_req = new XMLHttpRequest();
    http_req.open("GET",url,false);
    http_req.send(null);
    return http_req.responseText;        
}


/*function loadWidgets(){
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


*/
