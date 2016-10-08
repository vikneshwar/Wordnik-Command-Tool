#!/usr/bin/env node

var vorpal = require('vorpal')();
var chalk = require('chalk');
var figlet = require('figlet');
var clear = require('clear');
var cmdUtils = require('./cmdUtils.js');
var chalkTitle = chalk.bold.yellow.underline;
var chalkValue = chalk.bold.green;

//command action for definition of a word
vorpal
	.command('def <word>','displays the definition of the word')
	.action(function(args,cb){
		cmdUtils.getDefintion(args.word)
		.then(data => {
			//this.log(data);
			var info = JSON.parse(data);
			info.forEach((item,index) => {
				this.log(`${index+1}) ${chalkTitle(`Source`)}       : ${chalkValue(item.sourceDictionary)}`);
				this.log(`${chalkTitle('Definition')}      : ${item.text}`);
				this.log(`${chalkTitle('Parts of Speech')} : ${chalk.bold.magenta(item.partOfSpeech)}`);
				this.log("\n");
			});
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
			// this.log(data);
			var info = JSON.parse(data);
			var synonyms = info[0].words.join(", ");
			this.log(`${chalkTitle('Synonym')} : ${synonyms}`);
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
			var info = JSON.parse(data);
			var antonyms = info[0].words.join(", ");
			this.log(`${chalkTitle('Antonyms')} : ${antonyms}`);
			cb();
		})
		.catch(err => {
			this.log(chalk.bold.red(err));
			cb();
		});
	});

//command action for displaying example of a word
vorpal
	.command('ex <word>','displays the example for the word')
	.action(function(args,cb){
		cmdUtils.getExamples(args.word)
		.then(data => {
			// this.log(data);
			var info = JSON.parse(data);
			info.examples.forEach((item,index) => {
				this.log(`${index+1}) ${chalkTitle(`Provider`)} : ${chalkValue(item.provider.name)}`);
				this.log(`${chalkTitle(`Source`)}      : ${chalkValue(item.title)}`);
				this.log(`${chalkTitle(`Example`)}     : ${item.text}`);
			});
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
			var info = JSON.parse(data);

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