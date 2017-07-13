var words = ["Elvis Presley", "Michael Jackson", "Mariah Carey", "Madonna", "Prince", "John Lennon", "Freddie Mercury", "Whitney Houston", "Bob Dylan", 
			"James Brown", "Beyonce", "Elton John", "Bono", "Frank Sinatra", "Eminem", "David Bowie", "Lady Gaga"];
// var words = ["red red", "blue"];
var letters = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var info = [
	'Was an American singer and actor. Regarded as one of the most significant cultural icons of the 20th century, he is often referred to as the "King of Rock and Roll", or simply "the King".',
	'Was an American singer, songwriter, record producer, dancer, actor, and philanthropist. Called the "King of Pop", his contributions to music, dance, and fashion along with his publicized personal life made him a global figure in popular culture for over four decades.',
	'Is an American singer, songwriter, record producer, and actress.',
	'Is an American singer, songwriter, actress, and businesswoman. She achieved popularity by pushing the boundaries of lyrical content in mainstream popular music and imagery in her music videos, which became a fixture on MTV.',
	'Was an American singer-songwriter, multi-instrumentalist, and record producer. He was a musical innovator who was known for his eclectic work, flamboyant stage presence, extravagant dress and makeup, and wide vocal range.',
	'Was an English singer and songwriter who co-founded the Beatles, the most commercially successful band in the history of popular music.',
	'Was a British singer, songwriter and record producer, known as the lead vocalist and co-principal songwriter of the rock band Queen.',
	'Was an American singer, actress, producer, and model. In 2009, Guinness World Records cited her as the most awarded female act of all time.',
	'Is an American songwriter, singer, artist, and writer. He has been influential in popular music and culture for more than five decades. Much of his most celebrated work dates from the 1960s.',
	'Was an American singer, songwriter, record producer, dancer and bandleader. The creator of funk music and a major figure of 20th century popular music and dance.',
	'Is an American singer, songwriter and actress. Born and raised in Houston, Texas, she performed in various singing and dancing competitions as a child and rose to fame in the late 1990s as lead singer of R&B girl-group Destiny\'s Child.',
	'Is an English singer, pianist, and composer. He has worked with lyricist Bernie Taupin as his songwriting partner since 1967; they have collaborated on more than 30 albums to date.',
	'Known by his stage name ****, is an Irish singer-songwriter, musician, venture capitalist, businessman, and philanthropist.',
	'Was an American singer, actor, and producer who was one of the most popular and influential musical artists of the 20th century. He is one of the best-selling music artists of all time, having sold more than 150 million records worldwide.',
	'Is an American rapper, record producer, and actor. Is the best-selling artist of the 2000s in the United States.',
	'Was an English singer, songwriter and actor. He was a figure in popular music for over five decades, regarded by critics and musicians as an innovator, particularly for his work in the 1970s.',
	'Is an American singer, songwriter, and actress.',

];
var lastIndex = -1;
var attempt = 0;
/*
artists = {
	metallica: "bye",
	greenDay: "hi"
}*/

player = {
	lives:10,
	score:0,
	gWord:"",
	guessChar: 0,
	usedChar:[],

	checkSpelling:function(key){
		if (this.gWord.includes(" ")) {
			this.gWord = this.gWord.replace(" ","1");
			this.guessChar++;
		}else if (this.gWord.includes("-")) {
			this.gWord = this.gWord.replace("-","1");
			this.guessChar++;
		}
		for (var i = this.gWord.length - 1; i >= 0; i--) {
			if (this.gWord[i] === key) {
				this.guessChar++;
			}
		}
		return this.gWord.includes(key);
	}
}

/*--------------------------------------*/
function logic(key){
	if (player.checkSpelling(key)) {
		player.score +=10;
		var allBlocks = document.getElementsByClassName(key+"Let");
		for (var i = 0; i < allBlocks.length; i++) {
			allBlocks[i].classList.add(key);
		}
		document.getElementById("score").innerHTML = player.score;
		if (player.guessChar === player.gWord.length) {
			clenUpGamingBoard();
			continueGame();
		}
	}else{
		if(key !== 0){
			player.lives--;
			if (player.lives === 0) {
				document.getElementById("restart").classList.remove("no-display");
				updateStatBoard();
				clenUpGamingBoard();
			}
			document.getElementById("lives").innerHTML = player.lives;
		}
	}
}


function start(button){
	document.body.removeAttribute("onclick");
	if (player.gWord === "") {
		player.gWord = getWord().toLowerCase();
		console.log("this is the word: "+ player.gWord);
	}
	if (button != 0) {
		document.getElementsByClassName(button)[0].classList.add("hiden");
	}
	logic(button);
}

function getWord(){
	var rand = getRandom();
	document.getElementById("answer").innerHTML = words[rand];
	document.getElementById("picture").innerHTML = '<img class="img-thumbnail" alt="artist photo" id="photo" src="assets/images/artists/'+rand+'.jpg">';
	setInfoPanel(rand);
	var word = words[rand];
	buildWordLine(word);
	if (attempt === 0) {
		document.getElementById("press_and_remove").classList.add("no-display");
	}
	printAlfabet();
	return word;
}

function getRandom(){
	var random = Math.floor((Math.random() * words.length) + 0);
	while(lastIndex == random){
		random = Math.floor((Math.random() * words.length) + 0);
	}
	lastIndex = random;
	return random;
}

function setInfoPanel(index){
	document.getElementById("info").innerHTML = info[index];
}

function buildWordLine(word){
	for (var i = 0; i < word.length; i++) {
		var div = document.getElementById('word-line');
		if(word[i] ===" "){
			div.innerHTML = div.innerHTML + '<div class="space block underLetter"></div>';
		}else if(word[i] === "-"){
			div.innerHTML = div.innerHTML + '<div class="dush block underLetter"></div>';
		}else{
			div.innerHTML = div.innerHTML + '<div class="'+word[i].toLowerCase()+'Let block underLetter"></div>';
		}
	}
}

function printAlfabet(){
	for (var i = 0; i < letters.length/2; i++) {
		var div = document.getElementById('alphabetFirst');
		div.innerHTML = div.innerHTML + '<div class="'+letters[i]+' block" onclick=" start(\''+letters[i]+'\')"></div>';
	}
	for (var i = letters.length/2; i < 26; i++) {
		var div = document.getElementById('alphabetSecond');
		div.innerHTML = div.innerHTML + '<div class="'+letters[i]+' block" onclick=" start(\''+letters[i]+'\')"></div>';
	}
}

function clenUpGamingBoard(){
	document.getElementById("alphabetFirst").innerHTML = " ";
	document.getElementById("alphabetSecond").innerHTML = " ";
	document.getElementById("word-line").innerHTML = " ";
}

function updateStatBoard(){
	document.getElementById("score").innerHTML = player.score;
	document.getElementById("lives").innerHTML = player.lives;
}

function restart(){
	attempt++;
	player.lives = 10;
	player.gWord = "";
	player.score = 0;
	player.guessChar = 0;
	player.usedChar = [];
	updateStatBoard();
	document.getElementById("restart").classList.add("no-display");
	start(0);
}

function continueGame(){
	attempt++;
	player.guessChar = 0;
	player.gWord = "";
	player.usedChar = [];
	updateStatBoard();
	start(0);
	document.getElementById("restart").classList.add("no-display");
}

document.onkeyup = function(event){
	var char = event.key;
	if (letters.includes(char)) {
		if (!player.usedChar.includes(char)) {
			player.usedChar.push(char);
			start(event.key);
		}
	}

}

function save(){
	var myJSON = JSON.stringify(player);
	window.location = "text.txt" + myJSON;
}