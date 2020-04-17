var Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "loud nice report slot curve reward seat loyal mention laugh blind enhance"
var contract = require("truffle-contract");

provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
web3 = new Web3(provider);

var myContractJSON = require('../../build/contracts/Election.json');
var electionContract = contract(myContractJSON);
electionContract.setProvider(provider);

electionContract.deployed().then(function(i) { 
  app = i;
  
  //app.candidatesCount().then(function( count ) {
  //  console.log(count.toNumber());
  //});

  app.candidates(1).then(function(c) {
    candidate = c; 
    console.log(candidate.name)
  });
});

//console.log(JSON.stringify(myContractJSON));  
