//
// this is just a stub for a function you need to implement
//


function getStats(txt) {

    return {
        nChars: getLength(txt),
        nWords: getWords(txt),
        nLines: getLines(txt),
        nNonEmptyLines: getNonEmptyLines(txt),
        averageWordLength: getAvgWordLength(txt),
        maxLineLength: getMaxLineLength(txt),
        palindromes: getPalindromes(txt),
        longestWords: getLongestWords(txt),
        mostFrequentWords: getMostFrequentWords(txt)
    };
    
    
}

function getLength(val) {
    return val.length;
}

function getWords(val) {
    if(val === "") {
        return 0;
    }
    else {
        return cleanArray(val.split(/[\W]+/)).length;
    }
    
}

function getLines(val) {
    if (val === "") {
        return 0;
    }
    else {
        return (val.split("\n").length);
    }
}

function getNonEmptyLines(val) {
    return cleanArray(val.replace(/\t/g,"").replace(/ /g,"").split("\n")).length;
}

function getMaxLineLength(val) {
    var currLen = 0;
   // var tempArr = val.split("\n").slice();
    for (let value of val.split("\n")) {
        if (value.length > currLen) {
            currLen = value.length;
        }
    }
    
    return currLen;
}

function getAvgWordLength(val) {
    let totalLength = 0;
    
    if(val === 0) {
        return 0;
    }
    else {
        for (let value of cleanArray(val.split(/[\W]+/))) {
            totalLength += value.length;
        }
        return totalLength/getWords(val);
    }
    
}



function getPalindromes(val) {
    let tempArr = new Array();
    for (let value of cleanArray(val.split(/[\W]+/))) {
        lowerCase = value.toLowerCase();
        if (value.length < 3) {
           //do nothing, it cant be a palindrome 
        }
        else {
            let isPalindrome = false;
            for(var i = 0; i < value.length/2 + 1; i++) {
                if (lowerCase.split("")[i] === lowerCase.split("")[value.length - (i + 1)]) {
                    isPalindrome = true;
                }
                else {
                    isPalindrome = false;
                    break;
                }
            }
            if(isPalindrome) {
                tempArr.push(lowerCase);
            }
        }
    }
    return tempArr;
}

function getLongestWords(val) {
    
    //first sort largest to smallest
    let sorted = cleanArray(val.split(/[\W]+/)).slice();
    sorted.sort(function(a, b) {
    return b.length - a.length || a.localeCompare(b)
        });
    
    //get rid of duplicates
    let unique = sorted.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) 
            a.push(b);
            return a;
        },[]);
    
    //get the top 10
    let final = new Array();
    for(var i = 0; i < 10; i++) {
        final.push(unique[i]);
    }
    return final;
}

function getMostFrequentWords(val) {
    //sort them, but keep all duplicates
    let sorted = cleanArray(val.split(/[\W]+/)).slice();
    sorted.sort(function(a, b) {
    return b.length - a.length || a.localeCompare(b)
        });
    
    let duplicates = new Array();
    let count = 1;
    for(var i = 0; i < sorted.length; i++) {
        if(sorted[i] === sorted[i+1]) {
            count++;
        } 
        else {
            duplicates.push(count + sorted[i] + "(" + count + ")");
            count = 1;
        }
    }
    //sort into most common at top using initial digit
    duplicates.sort(function(a, b) {
    return b.localeCompare(a)
        });;
    for(let i = 0; i < duplicates.length; i++) {
        let len = duplicates[i].length;
        duplicates[i] = duplicates[i].substring(1, len);
    }
    
    //take top 10
    let final = new Array();
    for(var i = 0; i < 10; i++) {
        final.push(duplicates[i]);
    }
    return final;
    
    
}

//Removes empty strings from arrays
function cleanArray(temp) {
  var tempArray = new Array();
  for (var i = 0; i < temp.length; i++) {
    if (temp[i]) {
      tempArray.push(temp[i]);
    }
  }
  return tempArray;
}