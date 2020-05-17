function convert(electionArray) {
  var string = '{ "elections" : [';

  for (i = 0; i < electionArray.length; i++) {
    string = string + '{ "id":"' + electionArray[i].id + '" , "title":"' + electionArray[i].title + '" , "closingDate":"' + electionArray[i].closingDate + '" }';
    if(i != electionArray.length - 1){
      string = string + ','
    }
  }
  string = string + ']}'

  var json = JSON.parse(string);

  return(json);
}

module.exports.convert = convert;
