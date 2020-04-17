var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var contract = require("truffle-contract");

provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
web3 = new Web3(provider);
var myContractJSON = require('../../build/contracts/EthereumVoting.json');
var electionContract = contract(myContractJSON);
electionContract.setProvider(provider);

/* GET all candidates. */
router.get('/candidates', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  electionContract.deployed().then(function(i) { 
    app = i;
    
    //app.candidatesCount().then(function( count ) {
    //  console.log(count.toNumber());
    //});
  
    app.candidates(1).then(function(c) {
      candidate = c; 
      res.send(candidate.name)
    });
  });
  
  //res.end("JSON.stringify(obj)");

  /*var text = '{ "candidates" : [';
  
  text = text + '{ "firstName":"John" , "lastName":"Doe" },';
  text = text + '{ "firstName":"Anna" , "lastName":"Smith" },';
  text = text + '{ "firstName":"Peter" , "lastName":"Jones" }';
  
  text = text + ' ]}';
  
  var obj = JSON.parse(text);

  res.end(JSON.stringify(obj));*/
});

/* GET all candidates. */
router.get('/elections', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  electionContract.deployed().then(function(i) { 
    app = i;
    
    app.elections(1).then(function(e) {
      election = e; 
      res.send(election.title)
    });
  });
});

module.exports = router;
