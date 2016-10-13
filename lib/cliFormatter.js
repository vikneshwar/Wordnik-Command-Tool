module.exports = (function(){
	var chalk = require('chalk');
	var chalkTitle = chalk.bold.yellow.underline;
	var chalkValue = chalk.bold.green;
	var chalkRed = chalk.bold.red;

	return  {
		displayDefinition(data){
			//this.log(data);
			// var info = JSON.parse(data);
			if(!data.length){
				this.log(`${chalkTitle('Definition')} : ${chalkRed('No definition available')}`);
				return;
			}
			data.forEach((item,index) => {
				this.log(`${index+1}) ${chalkTitle(`Source`)}       : ${chalkValue(item.sourceDictionary || item.source)}`);
				this.log(`${chalkTitle('Definition')}      : ${item.text}`);
				this.log(`${chalkTitle('Parts of Speech')} : ${chalk.bold.magenta(item.partOfSpeech)}`);
				this.log("\n");
			});
		},
		displaySynonym(data){
			// this.log(data);
			// var info = JSON.parse(data);
			if(data.length) {
				var synonyms = data[0].words.join(", ");
				this.log(`${chalkTitle('Synonym')} : ${synonyms}`);
			} else {
				this.log(`${chalkTitle('Synonyms')} : ${chalkRed('No synonyms available')}`);
			}
		},
		displayAntonym(data){
			// var info = JSON.parse(data);
			if(data.length){
				var antonyms = data[0].words.join(", ");
				this.log(`${chalkTitle('Antonyms')} : ${antonyms}`);
			} else {
				this.log(`${chalkTitle('Antonyms')} : ${chalkRed('No antonyms available')}`);
			}
		},
		displayExample(data){
			// this.log(data);
			// var info = JSON.parse(data);
			if(!Object.keys(data).length){
				this.log(`${chalkTitle('Example')} : ${chalkRed('No example available')}`);
				return;
			}
			data.examples.forEach((item,index) => {
				// this.log(`${index+1}) ${chalkTitle(`Provider`)} : ${chalkValue(item.provider.name|| item.contentProvider.name)}`);
				this.log(`${chalkTitle(`Source`)}      : ${chalkValue(item.title)}`);
				this.log(`${chalkTitle(`Example`)}     : ${item.text}`);
			});
		}
	};
})();