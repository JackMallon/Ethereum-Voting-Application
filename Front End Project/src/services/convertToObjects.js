var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const HTTP = new XMLHttpRequest();

class Candidate {
  constructor(id, electionId, name, voteCount) {
    this.id = id;
    this.electionId = electionId;
    this.name = name;
    this.voteCount = voteCount;
  }
}

class Election {
  constructor(id, title, closingDate, epoch) {
    this.id = id;
    this.title = title;
    this.closingDate = closingDate;
    this.epoch = epoch;
  }
}

class pastElection {
  constructor(id, title, closingDate, epoch) {
    this.id = id;
    this.title = title;
    this.closingDate = closingDate;
    this.epoch = epoch;
  }
}

function candidates(json){
  var candidateObjects = [];

  Object.values(JSON.parse(json)).length

  var num = Object.values(JSON.parse(json)).length;

  for (i = 0; i < num; i++) {

    var id = Object.values(JSON.parse(json))[i].id;
    var electionId = Object.values(JSON.parse(json))[i].electionId;
    var name = Object.values(JSON.parse(json))[i].name;
    var voteCount = Object.values(JSON.parse(json))[i].voteCount;


    candidateObject = new Candidate(id, electionId, name, voteCount);
    candidateObjects.push(candidateObject);

  }

  return candidateObjects;
}

function elections(json){
  var electionObjects = [];

  num = (json.match(/{/g) || []).length - 2;


  for (i = 0; i <= num; i++) {

    var id = Object.values(JSON.parse(json))[0][i].id;
    var title = Object.values(JSON.parse(json))[0][i].title;
    var epoch = Object.values(JSON.parse(json))[0][i].closingDate;
    var d = new Date(Object.values(JSON.parse(json))[0][i].closingDate * 1000);
    var closingDate = d.toGMTString();

    if(epoch*1000 > Date.now()){
      electionObject = new Election(id, title, closingDate, epoch);
      electionObjects.push(electionObject);
    }
  }

  return electionObjects;
}

function pastElections(json){
  var electionObjects = [];

  var num = Object.values(JSON.parse(json)).length;
  num = num + 1

  for (i = 0; i <= num; i++) {

    var id = Object.values(JSON.parse(json))[0][i].id;
    var title = Object.values(JSON.parse(json))[0][i].title;
    var epoch = Object.values(JSON.parse(json))[0][i].closingDate;
    var d = new Date(Object.values(JSON.parse(json))[0][i].closingDate * 1000);
    var closingDate = d.toGMTString();

    if(epoch*1000 < Date.now()){
      electionObject = new pastElection(id, title, closingDate, epoch);
      electionObjects.push(electionObject);
    }
  }

  return electionObjects;
}


module.exports.candidates = candidates;
module.exports.elections = elections;
module.exports.pastElections = pastElections;
