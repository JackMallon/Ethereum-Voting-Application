function convert(candidateArray) {
  var string = '{ "candidates" : [';

  for (i = 0; i < candidateArray.length; i++) {
    string = string + '{ "id":"' + candidateArray[i].id + '" , "title":"' + candidateArray[i].title + '" , "closingDate":"' + candidateArray[i].closingDate + '" }';
    if(i != candidateArray.length - 1){
      string = string + ','
    }
  }
  string = string + ']}'

  var json = JSON.parse(string);

  return(candidateArray);
}

module.exports.convert = convert;
