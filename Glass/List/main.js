
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
		alt: true
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
		alt: true
	},
	{
		name: 'Home',
		alt: true
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
		alt: true
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
		alt: true
	},
	{
		name: 'Netflix',
		alt: true
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
	},
	{
		name: 'Unsplash',
		alt: false
	},
	{
		name: 'Uber',
		alt: false
	},
	{
		name: 'Google Maps',
		alt: false
	},
	{
		name: 'AVPlayer',
		alt: false
	},
	{
		name: '3nder',
		alt: false
	},
	{
		name: 'Wunderlist',
		alt: false
	},
	{
		name: 'Bitwarden',
		alt: false
	},
	{
		name: '115netdisk',
		alt: false
	},
	{
		name: 'Adguard',
		alt: false
	},
	{
		name: 'Adguard Pro',
		alt: false
	},
	{
		name: 'Adobe Reader',
		alt: false
	},
	{
		name: 'MLB',
		alt: false
	},
	{
		name: 'Chase Bank',
		alt: false
	},
	{
		name: '1Password',
		alt: false
	},
	{
		name: 'XVPN',
		alt: false
	},
	{
		name: 'Boomerang Mail',
		alt: false
	},
	{
		name: 'Spark Mail',
		alt: false
	},
	{
		name: 'Bible',
		alt: false
	},
	{
		name: 'Clock',
		alt: true
	},
	{
		name: 'Amazon Music',
		alt: false
	},
	{
		name: 'Google Calendar',
		alt: false
	},
	{
		name: 'One Drive',
		alt: false
	},
	{
		name: 'Prime Video',
		alt: false
	},
	{
		name: 'CBS Radio',
		alt: false
	},
	{
		name: 'Slack',
		alt: false
	},
	{
		name: 'Zalo',
		alt: false
	},
	{
		name: 'Pixelmator',
		alt: false
	},
	{
		name: 'Myk+',
		alt: false
	},
	{
		name: 'BankPlus',
		alt: false
	},
	{
		name: '24H',
		alt: false
	},
	{
		name: 'csn',
		alt: false
	},
	{
		name: '1.1.1.1',
		alt: false
	},
	{
		name: 'Kinemaster',
		alt: false
	},
	{
		name: 'My Viettel',
		alt: false
	},
	{
		name: 'Threads',
		alt: false
	},
	{
		name: 'Widgy',
		alt: false
	},
	{
		name: 'Remini',
		alt: false
	},
	{
		name: 'Snapchat',
		alt: false
	},
	{
		name: 'TikTok',
		alt: false
	},
	{
		name: 'Chat GPT',
		alt: false
	},
	{
		name: 'Leonardo Ai',
		alt: false
	},
	{
		name: 'Among Us',
		alt: false
	},
	{
		name: 'Fire Tv',
		alt: false
	},
	{
		name: 'Installer 5',
		alt: true
	},
	{
		name: 'UCBankMN',
		alt: false
	},
	{
		name: 'Sony Headphones Connect',
		alt: false
	},
	{
		name: 'Photomath',
		alt: false
	},
	{
		name: 'Moonlight Game Streaming',
		alt: false
	},
	{
		name: 'Google Wifi',
		alt: true
	},
	{
		name: 'Oculus',
		alt: false
	},
	{
		name: 'Dollar Shave Club',
		alt: false
	},
	{
		name: 'Tesla',
		alt: true
	},
	{
		name: 'AltStore',
		alt: false
	},
	{
		name: 'Google Meet',
		alt: false
	},
	{
		name: 'Documents',
		alt: false
	},
	{
		name: 'CapCut',
		alt: false
	},
	{
		name: 'GoPro',
		alt: false
	},
	{
		name: 'My Digio',
		alt: false
	},
	{
		name: 'Sony Music Center',
		alt: false
	},
	{
		name: 'VLLO, My First Video Editor',
		alt: false
	},
	{
		name: 'PS Messages',
		alt: false
	},
	{
		name: 'Microsoft Outlook',
		alt: false
	},
	{
		name: 'Xbox',
		alt: true
	},
	{
		name: 'Microsoft Authenticator',
		alt: false
	},
	{
		name: 'Poket: Stay Informed',
		alt: false
	},
	{
		name: 'Yelp',
		alt: false
	},
	{
		name: 'Nicegram',
		alt: false
	},
	{
		name: 'PUBG',
		alt: false
	},
	{
		name: 'Pokemon GO',
		alt: false
	},
	{
		name: 'IPTVizion',
		alt: false
	},
	{
		name: 'atresplayer',
		alt: false
	},
	{
		name: 'WiFiPasswords',
		alt: false
	},
	{
		name: 'Microsoft Translator',
		alt: false
	},
	{
		name: 'Zoom',
		alt: false
	},
	{
		name: 'Watched',
		alt: false
	},
	{
		name: 'Microsoft Edge',
		alt: false
	},
	{
		name: 'Super Mario Run',
		alt: false
	},
	{
		name: 'Asphalt 9',
		alt: false
	},
	{
		name: 'Fotmob',
		alt: false
	},
	{
		name: 'WeChat',
		alt: false
	},
	{
		name: 'Line',
		alt: false
	},
	{
		name: 'Skype',
		alt: false
	},
	{
		name: 'BlueSG',
		alt: false
	},
	{
		name: 'Grab',
		alt: false
	},
	{
		name: 'Ivory',
		alt: false
	},
	{
		name: 'Food Panda',
		alt: false
	},
	{
		name: 'Starbucks',
		alt: false
	},
	{
		name: 'Deco',
		alt: false
	},
	{
		name: 'Man Utd',
		alt: false
	},
	{
		name: 'Wikipedia',
		alt: false
	},
	{
		name: 'Xe Currency',
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

