# Wordnik-Command-Tool
Command Line tool for dictionay tool using Wordnik REST API.

Steps to install 

 * git clone https://github.com/vikneshwar/Wordnik-Command-Tool
 * Install dependencies using ```npm install -g```
 * Now you can open the tool by typing ```dict```

### Usage

* Type ```help``` to know list of commands 
* To exit the application and return to your terminal mode type ```exit```
* Type ```def <word>``` to display definitions for the word
* Type ```syn <word>``` to display synonym
* Type ```ant <word>``` to display antonym
* Type ```ex <word>``` to display example for the word
* Type ```dict <word>``` to display all the above information
* Typing ```dict today``` displays same as previous command for the word of the day from wordnik
* Type ```clear``` to clean your console
* Typing ```play``` gets you into play mode .
	* Type ```start``` to start the game - which displays definition , antonym or synonym for the word 
	* Try to guess the word by typing the word directly
	* Synonym of the word is also accepted as a answer 
	* If you enter a incorrect word , you are provided with 3 options 
	  * ***Try again*** - will bring you back to play mode , so you can guess the word again
	  * ***Hint*** - will display a hint and bring you back to play mode , hint can be jumbled word or another definition , antonym or synonym 
	  * ***quit*** - will quit the game and display the answer 
	* Typing ```exit``` will quit the gaming mode and return to dictionary mode . 
	 