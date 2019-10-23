        /*
What words or phrases appear more frequently in questions that students tend to do poorly on, and what appear more frequently in questions that students do well on?
We think this exercise should take about one hour. Please do not spend more than three hours working on it. Include a brief write-up of your solution and results in the body of your reply. You may respond to this email with questions.
 
It's acceptable to define "questions students did poorly/well on" as questions with percent correct values of less than 50% or greater than 50%, respectively. There may be other approaches or cutoff values that yield different results.
Consider how many appearances of a word there needs to be in order to say something about it. There may be words that should be excluded or sanitized.
        */
        // TODO
        // 2. general clean up put into functions
        // 3. write up rely -- tie
        // 4. remove package.json, unsure if I need it
        // 5. make sure you can spin up en
        v

const fs = require('fs');
const studentData = JSON.parse(fs.readFileSync('student-data.json', 'utf8'));

//Variable declarations
var dictionaryWords = {}, 
    dictionaryPhrases = {};

var tempPhrase = [],
    sortedDictionaryPhrases = [],
    sortedDictionaryWords = [],
    sanitizedWords = [],
    filteredScores = [];

var phraseCounter = 1;
var k = 0;

var word, 
    phraseWord, 
    i,
    j, 
    scores, 
    blockquotePosition,
    mostFrequentWord, 
    mostFrequentPhrase;



    //students who scored less than 50% on tests
    filteredScores[0] = studentData.filter(failingScores => failingScores.percent_correct < .5);

    //students who scored greater than 50% on tests
    filteredScores[1] = studentData.filter(passingScores => passingScores.percent_correct > .5);
    console.log(filteredScores)
for(var x = 0; x < studentData.length; x++){

    //santize words
for (var i = 0; i < filteredPoorScores.length; i++) { 
    //text exist before a question
    if(filteredPoorScores[i].text.includes("</blockquote>")){
        blockquotePosition = filteredPoorScores[i].text.lastIndexOf("</blockquote>");
        sanitizedWords[i] = filteredPoorScores[i].text
            .slice(blockquotePosition, filteredPoorScores[i].text.length)
            .toLowerCase()
            .replace( /(<([^>]+)>)/ig, '') //removes blockquotes
            .replace(/[\.,-?\/#!$%\^&\*;:{}=\-_`~()""]/g,"")
            .split(" ");  
    } else {
    sanitizedWords[i] = filteredPoorScores[i].text
        .toLowerCase()
        .replace( /(<([^>]+)>)/ig, '') //removes blockquotes
        .replace(/[\.,-?\/#!$%\^&\*;:{}=\-_`~()""]/g,"")
        .split(" ");  
    }  
}

for(i in sanitizedWords) {
   const sentence = sanitizedWords[i]
   //counts every word
    for (j in sentence) {
            word = sentence[j] 
            dictionaryWords[word] = dictionaryWords[word] || 0; 
            dictionaryWords[word]++;         
    }
    
    for(k in sentence) {
        phraseCounter = k;
        //counts phrases starting from index 0
        for(phraseCounter; phraseCounter < sentence.length; phraseCounter++) {
            phraseWord = sentence[phraseCounter]
            tempPhrase.push(phraseWord)
            //omits from storing first word in dictionaryPhrases
            if(tempPhrase.length !== 1){ 
                dictionaryPhrases[tempPhrase] = dictionaryPhrases[tempPhrase] || 0;
                dictionaryPhrases[tempPhrase]++ 
            }
        }
        tempPhrase = [];
    }   
} 
// console.log(dictionaryWords)
// console.log(dictionaryPhrases)

//covert obj back to arr and sort
sortedDictionaryPhrases = Object.keys(dictionaryPhrases)
    .map(key => {return [(key), dictionaryPhrases[key]]})
    .sort((a, b) => {return b[1] - a[1]});

// console.log(sortedDictionaryPhrases)

sortedDictionaryWords = Object.keys(dictionaryWords)
    .map(key => {return [(key), dictionaryWords[key]]})
    .sort((a, b) => {return b[1] - a[1]});

console.log(sortedDictionaryWords)

//omitting articles and less important words
 switch(sortedDictionaryWords[0][0]){
    case 'a':
         sortedDictionaryWords.shift();
    case 'an':
        sortedDictionaryWords.shift();
    case 'the': 
        sortedDictionaryWords.shift();
    case 'is': 
        sortedDictionaryWords.shift();
    case 'of': 
        sortedDictionaryWords.shift();                 
 }

mostFrequentPhrase = sortedDictionaryPhrases[0][0];
mostFrequentWord = sortedDictionaryWords[0][0];
     
console.log(`The most frequent word used on poor scores ${mostFrequentWord}`)
console.log(`The most frequent phrase used on poor scores ${mostFrequentPhrase}`)

console.log(`The most frequent word used on passing scores ${mostFrequentWord}`)
console.log(`The most frequent phrase used on passing scores ${mostFrequentPhrase}`)
}
