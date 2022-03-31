
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);

var option;

function init(){
	
	var li = window.location.href;
	var url = new URL(li);
	
	option = url.searchParams.get("option[]");
	option = JSON.parse(option);
	console.log(option);
	buttons();
	
}

function buttons(){
	var element = document.createElement('div'),
		element2 = document.createElement('div'),
		element3 = document.createElement('div');
	
	if(option[0] !== ''){
		element.classList.add('button');
		element.classList.add('shadow-dark-out');
	   	element.innerHTML = 'iOS icons / Android';
		document.getElementById('buttons-container').appendChild(element);
		element.onclick = () => {
			window.open(option[0], '_blank').focus();
			console.log(option[0]);
		};
	}
	
	if(option[1] !== ''){
		element2.classList.add('button');
		element2.classList.add('shadow-dark-out');
	   	element2.innerHTML = 'Jailbreak';
		document.getElementById('buttons-container').appendChild(element2);
		element2.onclick = () => {
			window.open(option[1], '_blank').focus();
		};
	}
	
	if(option.length > 2){
		element3.classList.add('button');
		element3.classList.add('shadow-dark-out');
	   	element3.innerHTML = 'Play Store';
		document.getElementById('buttons-container').appendChild(element3);
		element3.onclick = () => {
			window.open(option[2], '_blank').focus();
		};
	}
}


