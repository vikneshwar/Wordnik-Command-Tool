#!/usr/bin/env node

var vorpal = require('vorpal')();
var chalk = require('chalk');
var figlet = require('figlet');
var clear = require('clear');
var cmdUtils = require('./lib/cmdUtils.js');
var chalkTitle = chalk.bold.yellow.underline;
var chalkValue = chalk.bold.green;
var chalkRed = chalk.bold.red;
var chalkWhite = chalk.white;
var chalkGreen = chalk.green;
var cliFormatter = require('./lib/cliFormatter');
var utility = require('./lib/utility.js');
// cliFormatter.log = vorpal.log;
//command action for definition of a word
vorpal
	.command('def <word>','displays the definition of the word')
	.action(function(args,cb){
		cmdUtils.getDefintion(args.word)
		.then(data => {
			cliFormatter.displayDefinition.call(this,JSON.parse(data));
			cb();
		})
		.catch(err => {
			this.log(err);
		});
	});

//command action for synonym of the word
vorpal
	.command('syn <word>','displays the synonym of the word')
	.action(function(args,cb){
		cmdUtils.getSynonym(args.word)
		.then(data => {
			cliFormatter.displaySynonym.call(this,JSON.parse(data));
			cb();
		})
		.catch(err => {
			this.log(err);
		});
	});

//command action for antonym of the word
vorpal
	.command('ant <word>','displays the antonym of the word')
	.action(function(args,cb){
		cmdUtils.getAntonym(args.word)
		.then(data => {
			cliFormatter.displayAntonym.call(this,JSON.parse(data));
			cb();
		})
		.catch(err => {
			this.log(chalkRed(err));
			cb();
		});
	});

//command action for displaying example of a word
vorpal
	.command('ex <word>','displays the example for the word')
	.action(function(args,cb){
		cmdUtils.getExamples(args.word)
		.then(data => {
			cliFormatter.displayExample.call(this,JSON.parse(data));
			cb();
		})
		.catch(err => {
			this.log(err);
			cb();
		});
	});

//command action to display all the above for a word
vorpal
	.command('dict <word>','displays definition, synonym, antonym, example for the given word')
	.action(function(args,cb){
		cmdUtils.getFullDict(args.word)
		.then(data => {
			/*var defData = JSON.parse(data[0]);
			var synData = JSON.parse(data[1]);
			var antData = JSON.parse(data[2]);
			var exaData = JSON.parse(data[3]);*/
			this.log(chalkRed("Definition"));
			cliFormatter.displayDefinition.call(this,JSON.parse(data[0]));
			this.log("\n");
			cliFormatter.displaySynonym.call(this,JSON.parse(data[1]));
			this.log("\n");
			cliFormatter.displayAntonym.call(this,JSON.parse(data[2]));
			this.log("\n");
			this.log(chalkRed("Example"));		
			cliFormatter.displayExample.call(this,JSON.parse(data[3]));

			cb();
		})
		.catch(err => {
			this.log(err);
			cb();
		});
	});


vorpal
	.command('dict today','displays definition, synonym, antonym, example for the word of the day')
	.action(function(args,cb){
		var word = "";
		var info;
		cmdUtils.getWordOfTheDay()
		.then(data => {
			info = JSON.parse(data);
			word = info.word;
			return Promise.all([cmdUtils.getSynonym(word),cmdUtils.getAntonym(word)]);
		})
		.then(data => {
			/*var synData = JSON.parse(data[0]);
			var antData = JSON.parse(data[1]);*/

			this.log(chalkRed.bgWhite(`Word of the Day: ${chalkWhite.bgRed(`${word}`)}`));
			this.log(chalkRed("Definition"));
			cliFormatter.displayDefinition.call(this,info.definitions);
			this.log(chalkRed("Synonym and Antonym"));
			cliFormatter.displaySynonym.call(this,JSON.parse(data[0]));
			cliFormatter.displayAntonym.call(this,JSON.parse(data[1]));
			this.log(chalkRed("\nExample"));
			cliFormatter.displayExample.call(this,info);
			cb();
		})
		.catch(err => {
			this.log(err);
		});
	});
//command action to clear the console
vorpal
	.command('clear', 'clears the console')
	.action(function(args,cb){
		clear();
		cb();
	});

vorpal
	.delimiter('dict$$')
	.show();

vorpal
	.log(
		chalk.cyan.bold(
			figlet.textSync('Wordnik')		
		)
	);
var answerObj;
var playing = false;
vorpal
	.mode('play','Enters into gaming mode')
	.delimiter('$play$')
	.init(function(args,cb){
		this.log("Welcome to play mode !! Let's have some fun");
		this.log(`${chalkRed.bgWhite('Here is how the game goes:')} 
			1)The program will display definition, antonym or synonym and you need to guess the correct word
			2)Synonym for the word is also accepted as right answer
			3)If you provide a wrong word, 3 options are provided a)Try again b)hint c)quit
			4)So, now start the game by typing start`);
		cb();
	})
	.action(function(command,cb){
		if(playing === true && command === "start") {
			this.log(chalkRed(`Seems like you are already playing a game, to start a new one , quit the current game by typing ${chalkWhite.bgRed(`quit`)}`));
			cb();
		}else if(playing === true && command === "quit") {
			this.log("You have quit the game");
			playing = false;
			cb();
		}
		else if(command === "start"){
			playing = true;
			cmdUtils.getRandomWord()
			.then(response => {
				// this.log(response);
				
				var data = {};
				data.definition = JSON.parse(response[0]);
				data.synonym = JSON.parse(response[1]);
				data.antonym = JSON.parse(response[2]);
				data.example = JSON.parse(response[3]); 
				answerObj = data;

				var displayData = utility.shuffleQuestion(data,answerObj);
				this.log(`${chalkTitle(displayData.key)} : ${displayData.value}`);
				cb();
			}).catch(err => {
				this.log(err);
			});
		}
		else if(playing === true && command !=='start') {
			// playing = true;
			var valideList;
			if(answerObj.synonym.length === 0)
			 	valideList = [answerObj.definition[0].word];
			 else
			 	valideList = answerObj.synonym[0].words.concat([answerObj.definition[0].word]);

			if(valideList.indexOf(command)!= -1){
				this.log("Whoo!! Great , that was a right one");
				playing = false;
				cb();
			} else {
				this.log("That's wrong !!");

				this.prompt([
					{
						type:'list',
						name: 'options',
						message: 'What do you want to do ?',
						choices: ['Try again','Hint','Quit']		
					}
				]).then(answer => {
					if(answer.options === "Try again"){
						this.log("Great !! Seems like you don't give up");
					} else if(answer.options === "Hint"){
						this.log("Good move , here is a hint");
						var hint = utility.getHint(answerObj);
						this.log(`${chalkTitle(hint.key)} : ${hint.value}`);
					} else {
						this.log("Oops ! Sometimes you have to !");
						this.log(`Word is: ${chalkRed.bgWhite(answerObj.definition[0].word)}`);
						this.log(chalkRed("Definition"));
						cliFormatter.displayDefinition.call(this,answerObj.definition);
						this.log(chalkRed("Synonym and Antonym"));
						cliFormatter.displaySynonym.call(this,answerObj.synonym);
						cliFormatter.displayAntonym.call(this,answerObj.antonym);
						playing = false;
					}
					cb();
				});
				
			}
		} else {
			this.log(`Start a game by typing ${chalkRed.bgWhite('start')}`);
			cb();
		}
	
	});