var express = require('express');

class ElectionVote {
  constructor(id, candidateId, electionTitle, candidateName, userHash, timestamp) {
    this.id = id;
    this.candidateId = candidateId;
    this.electionTitle = electionTitle;
    this.candidateName = candidateName;
    this.userHash = userHash;
    this.timestamp = timestamp;
  }
}

function create(id, candidateId, electionTitle, candidateName, userHash, timestamp){
  election = new ElectionVote(id, candidateId, electionTitle, candidateName, userHash, timestamp);
  return election;
}

module.exports.create = create;
