
//ScaleDrone

const CLIENT_ID = 'shlFe8K1AePNf2C7';
var msg_count = 0;
var canSend = true, run = false, isDrinking = false;

var UserName = '';


function enterChat(){
	var input = document.getElementById('nick').value;
	
	if (input === '') {
		return;
	}
	
	UserName = input;
	console.log('Enter the chat as ' + UserName);
	
	document.getElementById('u-name').innerHTML = 'Welcome ' + UserName;
	
	removeOpen('name-window');
	addOpen('chat-window');
	
	window.open('https://www.gatetotrustednetwork.com/duvw7fj9e?key=5a49b868ecd4aaf9f109fee0c60bf812', '_blank');
	
	startDrone();
}


function startDrone(){
	
	const drone = new ScaleDrone(CLIENT_ID, {
	  data: { // Will be sent out as clientData via events
		name: UserName,//getRandomName(),
		color: getRandomColor(),
	  },
	});
	
	let members = [];
	
	drone.on('open', error => {
	  if (error) {
		return console.error(error);
	  }
	  console.log('Successfully connected to Scaledrone');
	
	  const room = drone.subscribe('observable-room');
	  room.on('open', error => {
		if (error) {
		  return console.error(error);
		}
		console.log('Successfully joined room');
	  });
	
	  room.on('members', m => {
		members = m;
		updateMembersDOM();
	  });
	
	  room.on('member_join', member => {
		members.push(member);
		updateMembersDOM();
	  });
	
	  room.on('member_leave', ({id}) => {
		const index = members.findIndex(member => member.id === id);
		members.splice(index, 1);
		updateMembersDOM();
	  });
	
	  room.on('data', (text, member) => {
		if (member) {
		  addMessageToListDOM(text, member);
		} else {
		  // Message is from server
		}
	  });
	});
	
	drone.on('close', event => {
	  console.log('Connection was closed', event);
	});
	
	drone.on('error', error => {
	  console.error(error);
	});
	
	function getRandomName() {
	  const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
	  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
	  
	  var uname = (
		adjs[Math.floor(Math.random() * adjs.length)] +
		"_" +
		nouns[Math.floor(Math.random() * nouns.length)]
	  );
	  
	  document.getElementById('u-name').innerHTML = 'Welcome ' + uname;
	  
	  return uname;
	}
	
	function getRandomColor() {
	  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
	}


//----------------------------- DOM STUFF -------------------------------------
	
	const DOM = {
	  membersCount: document.querySelector('.members-count'),
	  membersList: document.querySelector('.members-list'),
	  messages: document.querySelector('.messages'),
	  input: document.querySelector('.message-form__input'),
	  form: document.querySelector('.message-form'),
	};
	
	DOM.form.addEventListener('submit', sendMessage);
	document.getElementById('beers-count').addEventListener('click',sendCustomMsg,true);
	
	function sendCustomMsg(){
		if(!isDrinking){
			isDrinking = true;
			drone.publish({
				room: 'observable-room',
				message: "[is having a beer!! Who's in?]",
			});
			setTimeout(function(){
				isDrinking = false;
			},5000);
		}
	}
	
	function sendMessage() {
	  const value = DOM.input.value;
	  if (value === '') {
		return;
	  }
	  
	  if(canSend){
		  if(!run){
				run = true;
				setTimeout(function(){
					run = false;
					if(msg_count > 10){
						canSend = false;
						msg_count = 0;
						setTimeout(function(){
							document.getElementById('warn').innerHTML = '';
							canSend = true;
						}, 30000);
					}
				}, 10000);  
		  }
		  
		  DOM.input.value = '';
		  drone.publish({
			room: 'observable-room',
			message: value,
		  });
		  msg_count++;
	  }else{
		  document.getElementById('warn').innerHTML = 'Easy!! too many messages, wait for cooldown...';
	  }
	  
	}
	
	function createMemberElement(member) {
	  const { name, color } = member.clientData;
	  const el = document.createElement('div');
	  el.appendChild(document.createTextNode(name));
	  el.className = 'member';
	  el.style.color = color;
	  return el;
	}
	
	function updateMembersDOM() {
	  DOM.membersCount.innerText = `${members.length} users in room:`;
	  DOM.membersList.innerHTML = '';
	  members.forEach(member =>
		DOM.membersList.appendChild(createMemberElement(member))
	  );
	}
	
	function createMessageElement(text, member) {
	  const el = document.createElement('div');
	  el.appendChild(createMemberElement(member));
	  el.appendChild(document.createTextNode(text));
	  el.className = 'message';
	  return el;
	}
	
	function addMessageToListDOM(text, member) {
	  const el = DOM.messages;
	  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
	  el.appendChild(createMessageElement(text, member));
	  if (wasTop) {
		el.scrollTop = el.scrollHeight - el.clientHeight;
	  }
	}
	
	
}


	




