var express = require('express');

class Election {
  constructor(id, title, closingDate) {
    this.id = id;
    this.title = title;
    this.closingDate = closingDate;
  }
}

function create(id, title, closingDate){
  election = new Election(id, title, closingDate);
  return election;
}

module.exports.create = create;
