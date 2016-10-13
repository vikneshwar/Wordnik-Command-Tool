var _ = require('lodash');

module.exports = (function(){

	return {
		shuffleQuestion (data, answerObj) {
			var word = data.definition[0].word;
			var questArr = ["definition","synonym","antonym"];
			var category = _.sample(questArr);
			answerObj.category = category;
			var returnValue= "";

			var returnObj = {};
			returnObj.key = category;
			if(data[category].length === 0)
				return this.shuffleQuestion(data,answerObj);
			if(category == "definition") {
				returnObj.value = data[category][0].text;
			}
			else if(category === "synonym" || category === "antonym"){
				returnObj.value = data[category][0].words[0];
			}
			return returnObj;
		},
		getHint (answerObj){
			var hintOptions = ['jumble',answerObj.category];
			var randomHintType = _.sample(hintOptions);
			if(randomHintType !='jumble' && answerObj[randomHintType].length === 0)
				return this.getHint(answerObj);
			var returnObj = {};
			returnObj.key  = randomHintType;
			if(randomHintType === "jumble")
				returnObj.value = answerObj.definition[0].word.shuffle();
			else if(randomHintType === "definition"){
				var defArr = answerObj.definition;
				returnObj.value = defArr[Math.floor(Math.random() * defArr.length)].text;
			}
			
			else if(randomHintType === "synonym" || randomHintType === "antonym"){
				var wordArr = answerObj[randomHintType][0].words;
				returnObj.value = wordArr[Math.floor(Math.random() * wordArr.length)];
			}
			return returnObj;
		}
	};
})();

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
};