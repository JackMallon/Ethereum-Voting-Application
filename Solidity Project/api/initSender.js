var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var contract = require("truffle-contract");
const dotenv = require('dotenv');

provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
web3 = new Web3(provider);
var myContractJSON = require('../build/contracts/EthereumVoting.json');
var electionContract = contract(myContractJSON);
electionContract.setProvider(provider);

var accounts = web3.eth.getAccounts();

dotenv.config();

const accountNumber = process.env.ACCOUNT;

console.log(accountNumber);

electionContract.deployed().then(function(i) {
  app = i;
  app.initSender({ from: accountNumber }).then(function(x) {
    app.sender().then(function( c ) {
      console.log(c);
    });
  });
});
