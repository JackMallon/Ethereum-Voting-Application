var express = require("express");
var router = express.Router();
var Web3 = require("web3");
var contract = require("truffle-contract");

provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
web3 = new Web3(provider);
var myContractJSON = require("../../build/contracts/EthereumVoting.json");
var electionContract = contract(myContractJSON);
electionContract.setProvider(provider);

var accounts = web3.eth.getAccounts();

/* CREATE election. */
router.post("/election", function(req, res) {
  var title = req.body.title;
  var date = req.body.date;
  var time = req.body.time;
  console.log(req.body);
  console.log(title);
  console.log(date);
  console.log(time);
  var dateString = "" + date + " " + time;
  var newDate = new Date(dateString);
  var epoch = newDate.getTime() / 1000;

  electionContract.deployed().then(function(i) {
    app = i;
    app
      .addElection(title, epoch, {
        from: "0x3E946BdfDC3815b5e83E0a99C18865AF5e1f5E63"
      })
      .then(function(x) {
        console.log(x);
        res.status(200);
      });
  });
});

/* CREATE vote. */
router.post("/vote", function(req, res) {
  var candidateId = req.body.candidateId;
  var userHash = req.body.userHash;
  electionContract.deployed().then(function(i) {
    app = i;
    app
      .addElectionVote(candidateId, userHash, {
        from: "0x3E946BdfDC3815b5e83E0a99C18865AF5e1f5E63"
      })
      .then(function(x) {
        console.log(x);
        res.send(200);
      });
  });
});

/* CREATE vote. */
router.post("/candidate", function(req, res) {
  var electionId = req.body.electionId;
  var name = req.body.name;
  electionContract.deployed().then(function(i) {
    app = i;
    app
      .addCandidate(electionId, name, {
        from: "0x3E946BdfDC3815b5e83E0a99C18865AF5e1f5E63"
      })
      .then(function(x) {
        console.log(x);
        res.send(200);
      });
  });
});

module.exports = router;
