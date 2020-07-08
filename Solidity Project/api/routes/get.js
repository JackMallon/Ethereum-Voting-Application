var express = require("express");
var router = express.Router();
var contract = require("truffle-contract");
var electionModel = require("../models/election.js");
var candidateModel = require("../models/candidate.js");
var electionVoteModel = require("../models/electionVote.js");
var electionJSON = require("../jsonFunctions/convertElection.js");
var candidateJSON = require("../jsonFunctions/convertCandidate.js");
var Web3 = require("web3");
provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
web3 = new Web3(provider);
var myContractJSON = require("../../build/contracts/EthereumVoting.json");
var electionContract = contract(myContractJSON);
electionContract.setProvider(provider);

var electionArray = [];
var candidateArray = [];
var voteArray = [];

/* GET all . */
router.get("/candidates", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  candidateArray = [];

  electionContract.deployed().then(function(i) {
    app = i;

    app.candidatesCount().then(function(c) {
      count = c.toNumber();
      var i = 0;

      var promises = [];

      for (i = 1; i < count + 1; i++) {
        const promise = app.candidates(i).then(function(c) {
          candidate = c;
          candidateObject = candidateModel.create(
            candidate.id,
            candidate.electionId,
            candidate.name,
            candidate.voteCount
          );
          candidateArray.push(candidateObject);
        });
        promises.push(promise);
      }

      Promise.all(promises)
        .then(() => {
          json = candidateJSON.convert(candidateArray);
          res.send(json);
        })
        .catch(e => {
          console.log("There has been an error. \n" + e);
        });
    });
  });
});

/* GET all elections. */
router.get("/elections", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  electionArray = [];

  electionContract.deployed().then(function(i) {
    app = i;

    app.electionsCount().then(function(c) {
      count = c.toNumber();
      var i = 0;

      var promises = [];

      for (i = 1; i < count + 1; i++) {
        const promise = app.elections(i).then(function(e) {
          election = e;
          electionObject = electionModel.create(
            election.id,
            election.title,
            election.closingDate
          );
          electionArray.push(electionObject);
        });
        promises.push(promise);
      }

      Promise.all(promises)
        .then(() => {
          json = electionJSON.convert(electionArray);
          res.send(json);
        })
        .catch(e => {
          console.log("There has been an error. \n" + e);
        });
    });
  });
});

/* GET all elections. */
router.get("/votes", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  voteArray = [];

  electionContract.deployed().then(function(i) {
    app = i;

    app.electionVotesCount().then(function(c) {
      count = c.toNumber();
      var i = 0;

      console.log(count);

      var promises = [];

      for (i = 1; i < count + 1; i++) {
        const promise = app.electionVotesById(i).then(function(e) {
          electionVote = e;
          electionObject = electionVoteModel.create(
            electionVote.id,
            electionVote.candidateId,
            electionVote.electionTitle,
            electionVote.candidateName,
            electionVote.userHash,
            electionVote.timestamp
          );
          voteArray.push(electionObject);
        });
        promises.push(promise);
      }

      Promise.all(promises)
        .then(() => {
          //json = electionJSON.convert(electionArray);
          res.send(voteArray);
        })
        .catch(e => {
          console.log("There has been an error. \n" + e);
        });
    });
  });
});

module.exports = router;
