
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);



function init(){
	AOS.init({
        easing: 'ease-in-out-sine'
    });
	
	const menuItems = document.querySelectorAll('.txt-head');
	menuItems.forEach(item => item.addEventListener('click', openWindow));
}

function goHome(){
	$('html, body').animate({
		scrollTop: $('#section1').offset().top
	}, 200);
}

function openWindow(e){
	
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
	
}

