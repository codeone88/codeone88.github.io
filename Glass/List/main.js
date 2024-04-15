
window.addEventListener("load", function() { 
   document.body.style.width='100%';
   document.body.style.height='100%';
}, false);



let appsIcons = [
	{
		name: 'Neon',
		alt: false
	},
	{
		name: '9Gag',
		alt: false
	},
	{
		name: 'Call of Duty Mobile',
		alt: false
	},
	{
		name: 'Adidas',
		alt: false
	},
	{
		name: 'Airbnb',
		alt: false
	},
	{
		name: 'TuneIn',
		alt: false
	},
	{
		name: 'Aliexpress',
		alt: false
	},
	{
		name: 'Alipay',
		alt: false
	},
	{
		name: 'Amazon',
		alt: false
	},
	{
		name: 'Apple Feedback',
		alt: false
	},
	{
		name: 'App Store',
		alt: false
	},
	{
		name: 'Watch App',
		alt: false
	},
	{
		name: 'Calculator',
		alt: false
	},
	{
		name: 'Camera',
		alt: false
	},
	{
		name: 'Compass',
		alt: false
	},
	{
		name: 'Files App',
		alt: false
	},
	{
		name: 'Facetime',
		alt: false
	},
	{
		name: 'Find My',
		alt: false
	},
	{
		name: 'Fitness',
		alt: false
	},
	{
		name: 'Health',
		alt: false
	},
	{
		name: 'Home',
		alt: false
	},
	{
		name: 'Books',
		alt: false
	},
	{
		name: 'iMovie',
		alt: false
	},
	{
		name: 'Maps',
		alt: false
	},
	{
		name: 'Measure',
		alt: false
	},
	{
		name: 'Contacts',
		alt: false
	},
	{
		name: 'Calendar',
		alt: true
	},
	{
		name: 'Garage Band',
		alt: false
	},
	{
		name: 'Mail',
		alt: false
	},
	{
		name: 'Notes',
		alt: false
	},
	{
		name: 'Phone',
		alt: true
	},
	{
		name: 'Photos',
		alt: false
	},
	{
		name: 'Messages',
		alt: true
	},
	{
		name: 'iTunes Store',
		alt: false
	},
	{
		name: 'Apple Music',
		alt: false
	},
	{
		name: 'News',
		alt: false
	},
	{
		name: 'Pages',
		alt: false
	},
	{
		name: 'Wallet',
		alt: false
	},
	{
		name: 'Podcasts',
		alt: false
	},
	{
		name: 'Settings',
		alt: true
	},
	{
		name: 'Reminders',
		alt: false
	},
	{
		name: 'Shortcuts',
		alt: false
	},
	{
		name: 'Stocks',
		alt: false
	},
	{
		name: 'Apple Store',
		alt: false
	},
	{
		name: 'Test Flight',
		alt: false
	},
	{
		name: 'Tips',
		alt: false
	},
	{
		name: 'Translate',
		alt: false
	},
	{
		name: 'Apple TV',
		alt: false
	},
	{
		name: 'TV Remote',
		alt: false
	},
	{
		name: 'Voice Memos',
		alt: false
	},
	{
		name: 'Weather',
		alt: false
	},
	{
		name: 'X (Twitter)',
		alt: true
	},
	{
		name: 'Authy',
		alt: false
	},
	{
		name: 'Bandcamp',
		alt: false
	},
	{
		name: 'Best Buy',
		alt: false
	},
	{
		name: 'Battle.net',
		alt: false
	},
	{
		name: 'Brave Browser',
		alt: false
	},
	{
		name: 'Instagram',
		alt: false
	},
	{
		name: 'Cnn',
		alt: false
	},
	{
		name: 'Crunchyroll',
		alt: false
	},
	{
		name: 'Deezer',
		alt: false
	},
	{
		name: 'Dominos',
		alt: false
	},
	{
		name: 'Duolingo',
		alt: false
	},
	{
		name: 'Ebay',
		alt: false
	},
	{
		name: 'ESPN',
		alt: false
	},
	{
		name: 'Evernote',
		alt: false
	},
	{
		name: 'Facebook',
		alt: false
	},
	{
		name: 'Messenger',
		alt: false
	},
	{
		name: 'Dropbox',
		alt: false
	},
	{
		name: 'Chrome',
		alt: true
	},
	{
		name: 'Google Drive',
		alt: false
	},
	{
		name: 'Gmail',
		alt: false
	},
	{
		name: 'Google',
		alt: false
	},
	{
		name: 'YouTube',
		alt: true
	},
	{
		name: 'YouTube Music',
		alt: false
	},
	{
		name: 'Google Photos',
		alt: false
	},
	{
		name: 'Google Translate',
		alt: false
	},
	{
		name: 'Discord',
		alt: false
	},
	{
		name: 'Netflix',
		alt: false
	},
	{
		name: 'Nike',
		alt: false
	},
	{
		name: 'Nike SNKRS',
		alt: false
	},
	{
		name: 'Playstation',
		alt: false
	},
	{
		name: 'SMPro',
		alt: false
	},
	{
		name: 'Reddit',
		alt: false
	},
	{
		name: 'Shazam',
		alt: false
	},
	{
		name: 'Spotify',
		alt: true
	},
	{
		name: 'CashApp',
		alt: false
	},
	{
		name: 'Clash Royale',
		alt: false
	},
	{
		name: 'Filza',
		alt: false
	},
	{
		name: 'Steam',
		alt: false
	},
	{
		name: 'Waze',
		alt: false
	},
	{
		name: 'Paypal',
		alt: true
	},
	{
		name: 'Box',
		alt: false
	},
	{
		name: 'Whatsapp',
		alt: true
	},
	{
		name: 'VLC',
		alt: false
	},
	{
		name: 'Telegram',
		alt: false
	},
	{
		name: 'Pinterest',
		alt: true
	},
	{
		name: 'Twitch',
		alt: false
	}
];


function init(){
	setTimeout(() => {
		show('main-title');
		setTimeout(() => {
			close('main-title');
			show('social-cont');
			show('logo');
			show('large-title');
			loadItems();
		}, 3000);
	},500);
}

function loadItems(){
	appsIcons.sort((a,b) => a.name.localeCompare(b.name));
	
	for(var i=0; i<appsIcons.length; i++){
		document.getElementById('apps-container').appendChild(appItem(appsIcons[i]));
	}
	
	show('apps-container', 500);
}

function appItem(data){
	let cont = document.createElement('div'),
		//icon = document.createElement('img'),
		name = document.createElement('div'),
		desc = document.createElement('p');
		//imcont = document.createElement('div'),
		//iconAp = document.createElement('img'),
		//iconAn = document.createElement('img');
	
	cont.classList.add('app-cont');
	
	name.classList.add('app-name');
	name.innerHTML = data.name;
	cont.appendChild(name);
	
	if(data.alt){
		desc.classList.add('app-desc');
		desc.innerHTML = 'Includes Alt Version';
		cont.appendChild(desc);	
	}
	
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

