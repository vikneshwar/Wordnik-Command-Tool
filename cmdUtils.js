var request = require('request');
var config = require('./config.js');
var baseUrl = 'http://api.wordnik.com:80/v4/';
var utility = (function(){
	var fetchData = function(url,queryString){
		return new Promise((resolve,reject) => {
			var options = {
				url: url,
				method: 'GET',
				qs: {
					api_key: config.API_KEY
				}
			};
			if(queryString)
				Object.assign(options.qs,queryString);

			request(options,(err,response,body) => {
				var resp = JSON.parse(body);
				if(err)
					reject(err);
				else if( (Array.isArray(resp) && !resp.length) || (resp instanceof Object && !Object.keys(resp).length))
					reject("Seems there is no response from wordnik, please try again later");
				else
					resolve(body);
			});
		});
	};


	return {
		//returns a promise with definition for the given word
		getDefintion (word) {
			var url = `${baseUrl}word.json/${word}/definitions`;
			var options = {};
			options.limit = '5';
			return fetchData(url,null);
		},
		//returns a promise with synonym of the given word
		getSynonym (word) {
			var url  = `${baseUrl}word.json/${word}/relatedWords`;
			var options = {};
			options.relationshipTypes = 'synonym';
			return fetchData(url,options);
		},
		//returns a promise with antonym of the given word
		getAntonym (word) {
			var url  = `${baseUrl}word.json/${word}/relatedWords`;
			var options = {};
			options.relationshipTypes = 'antonym';
			return fetchData(url,options);
		},
		//returns a promise with example of the given word
		getExamples(word) {
			var url  = `${baseUrl}word.json/${word}/examples`;
			return fetchData(url,null);
		},
		//returns a promise with all the above information for the given word
		getFullDict(word){
			return new Promise((resolve,reject) => {
				Promise.all([
					this.getDefintion(word),
					this.getSynonym(word),
					this.getAntonym(word),
					this.getExamples(word)
				]).then(data => {
					resolve(data);
				}).catch(err => {
					reject(err);
				});	
			});
		},

		//return a promise with word of the day
		getWordOfTheDay: function(){
			var date = new Date();
			var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); 
			var url = `${baseUrl}word.json/wordOfTheDay`;
			var options = {};
			options.date = dateStr;
			return fetchData(url,null);
		},
		getWordOfTheDayFull: function(){
			
		}
	};
})();

module.exports = utility;