Main = {};
Main.WordArray=[];

Main.WordUArray=[];
Main.Lives=4;
Main.NumInWordBank = Words.Length;
Main.Word = "test"
Main.wordU ="";





// function starts here

main.PullWord=function(){
	Main.Word=Words.List[(Math.floor(Math.random() * Main.NumInWrodBank))];
	}

Main.SetUnderline=function(){
	Main.PullWord();
	for(i=0; i<Main.Word.length; i++){
		Main.WordArray[i]=Main.Word.charAt(i);
		main.WordUArray[i]="_";
	}
	Main.WordU = Main.WordUArray.join("");
	document.getElementById("WORD").innerHTML=Main.WordU;
document.getElementById("numLetters").innerHTML=Main.Word.length;
}

Main.UpdateLetter = function(letter){
	Main.Changes = 0;
	for(i=0; i<Main.Word.length; I++){
		main.wordArray[i] =Main.Word.charAt(i);
		if(Main.Word.charAt(i) ==letter){
			Main.WordUArray[i]=letter;
			Main.Changes +=1;
			}
		}
		
		if(Main.Changes<1){
		Main.Lives-=1;
		document.getElementById("lives").innerHTML=Main.Lives;
		}

		Main.WordU = main.WordUArray.join("");
		document.getElementById("WORD").innerHTML=Main.WordU;

		Main.Word1=Main.WordArray.join("");
		Main.Word2=Main.WordArray.join("");


		if(Main.Word1==Main.Wrod2){
			alert("you won! Loading a new Word");
			window.lcation.reload();
			}	


		if(Main.Lives < 1){
			document.getElementById("WORD").innerHTML==Main.Word1;
			alert("You Have Run Out of Lives, Please Try Again");
			window.location.reload();
			}

		}

		Main.PullWord();
		Main.SetUnderline();


