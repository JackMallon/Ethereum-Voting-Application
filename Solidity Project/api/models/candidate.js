var express = require('express');

class Candidate {
  constructor(id, electionId, name, voteCount) {
    this.id = id;
    this.electionId = electionId;
    this.name = name;
    this.voteCount = voteCount;
  }
}

function create(id, electionId, name, voteCount){
  candidate = new Candidate(id, electionId, name, voteCount);
  return candidate;
}

module.exports.create = create;
