
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);



function init(){
	//setTimeout(() => {
		//show('main-title');
		//setTimeout(() => {
			//close('main-title');
			show('social-cont');
			show('logo');
			//show('large-title');
			loadItems();
		//}, 3000);
	//},500);
}

function loadItems(){
	show('land-container');
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



let slideIndex = 0;
let timer;

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  clearTimeout(timer);
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  clearTimeout(timer);
  showSlides(slideIndex = n);
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1} 
  slides[slideIndex-1].style.display = "block"; 
  timer = setTimeout(showSlides, 6000); // Change image every 2 seconds
}



