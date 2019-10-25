const fs = require('fs');
const studentData = JSON.parse(fs.readFileSync('student-data.json', 'utf8'));

console.log(studentData)

//Variable declarations
var dictionaryWords = {}, 
    dictionaryPhrases = {};


var tempPhrase = [],
    sortedDictionaryPhrases = [],
    sortedDictionaryWords = [],
    sanitizedWords = [],
    scores = [], 
    filteredScores = [];


var phraseCounter = 1;
var k = 0;


var word, 
    phraseWord, 
    i,
    j,
    blockquotePosition,
    mostFrequentPassingWord, 
    mostFrequentPassingPhrase,
    mostFrequentFailingWord, 
    mostFrequentFailingPhrase;
    
    const filterStudentData = () => {
        //students who scored less than 50% on tests
        scores[0] = studentData.filter(failingScores => failingScores.percent_correct < .5);
        //students who scored greater than 50% on tests
        scores[1] = studentData.filter(passingScores => passingScores.percent_correct > .5);
    }
    filterStudentData()


   //loops through each indexs of scores 
   const iterateOverScores = () => { 
        for (let x = 0; x < scores.length; x++) {
            filteredScores = scores[x];


            const clearVariables = () => {
                sanitizedWords = [];
                sortedDictionaryPhrases = [];
                sortedDictionaryWords = [];
                dictionaryPhrases = [];
                dictionaryWords = [];
            };
            clearVariables();


    //santize words        
    const sanitizeWords = () => {
        for (i = 0; i < filteredScores.length; i++) { 
                let endquotetag = "</blockquote>"
                //removes text before question and sanizes words
                if(filteredScores[i].text.includes(endquotetag)){
                    blockquotePosition = filteredScores[i].text.lastIndexOf(endquotetag) + endquotetag.length;
                    sanitizedWords[i] = filteredScores[i].text
                        .slice(blockquotePosition, filteredScores[i].text.length)
                        .toLowerCase()
                        .replace(/[\.,-?\/#!$%\^&\*;:{}=\-_`~()""]/g,"")
                        .trim()
                        .split(" ");  
                } else {
                    sanitizedWords[i] = filteredScores[i].text
                        .toLowerCase()
                        .replace(/[\.,-?\/#!$%\^&\*;:{}=\-_`~()""'']/g,"")
                        .trim()
                        .split(" ");  
                } 
        }
    }
    sanitizeWords();
 
    const iterateOverSantizedWords = () =>  {
        for(i in sanitizedWords) {
            const sentence = sanitizedWords[i]
        
            //counts every word
            const countAllWords = () => {
                for (j in sentence) {
                    word = sentence[j] 
                    dictionaryWords[word] = dictionaryWords[word] || 0; 
                    dictionaryWords[word]++;         
                }
            } 
            countAllWords();


        //counter for sentence
        const countSentence = () => {
            for(k in sentence) {
                phraseCounter = k;
                //counts phrases starting from index 0
                const countPhrases = () => {
                    for(phraseCounter; phraseCounter < sentence.length; phraseCounter++) {
                        phraseWord = sentence[phraseCounter]
                        tempPhrase.push(phraseWord)
                            //omits from storing first word in dictionaryPhrases
                            if(tempPhrase.length !== 1){ 
                                dictionaryPhrases[tempPhrase] = dictionaryPhrases[tempPhrase] || 0;
                                dictionaryPhrases[tempPhrase]++ 
                            }
                    }
                }
                countPhrases();
                tempPhrase = [];
            } 
        }
        countSentence();
    }};
    iterateOverSantizedWords()



        sortedDictionaryPhrases = Object.keys(dictionaryPhrases)
            .map(key => {return [(key), dictionaryPhrases[key]]})
            .sort((a, b) => {return b[1] - a[1]});


        sortedDictionaryWords = Object.keys(dictionaryWords)
            .map(key => {return [(key), dictionaryWords[key]]})
            .sort((a, b) => {return b[1] - a[1]});
  


    const omittArticles = () => {
        //omitting articles and less important words
        switch(sortedDictionaryWords[0][0]){
            case 'a':
                sortedDictionaryWords.shift();
            case 'an':
                sortedDictionaryWords.shift();
            case 'the': 
                sortedDictionaryWords.shift();
            case 'is': 
                sortedDictionaryWords.shift();
            case 'of': 
                sortedDictionaryWords.shift();                 
        }
    }
   omittArticles()


   const printFinalDictionary = () => {
         //if scores are failing
         if(x == 0){
            mostFrequentFailingPhrase = sortedDictionaryPhrases[0][0];
            mostFrequentFailingWord = sortedDictionaryWords[0][0];
            console.log(`The most frequent word used on poor scores ${mostFrequentFailingWord}`)
            console.log(`The most frequent phrase used on poor scores ${mostFrequentFailingPhrase}`)
        }


        //if scores are passing
        if(x == 1) {
            mostFrequentPassingPhrase = sortedDictionaryPhrases[0][0];
            mostFrequentPassingWord = sortedDictionaryWords[0][0];
            console.log(`The most frequent word used on passing scores ${mostFrequentPassingWord}`)
            console.log(`The most frequent phrase used on passing scores ${mostFrequentPassingPhrase}`)
        }
   }
   printFinalDictionary();
        
}};


iterateOverScores();

