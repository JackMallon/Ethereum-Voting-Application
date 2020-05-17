var express = require('express');
var router = express.Router();
var security = require('../src/services/security.js');
var convertToObjects = require('../src/services/convertToObjects.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const HTTP = new XMLHttpRequest();
const CandidatesHTTP = new XMLHttpRequest();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(security.userAccess(req, res)){return}

  const electionUrl = 'http://localhost:3200/elections';
  const candidateUrl = 'http://localhost:3200/candidates';

  HTTP.open("GET", electionUrl);
  HTTP.send();
  CandidatesHTTP.open("GET", candidateUrl);
  CandidatesHTTP.send();


  HTTP.onreadystatechange = function(){
    if (HTTP.readyState == 4 && HTTP.status == 200){
      if (HTTP.responseText){
        electionJSON = HTTP.responseText;
        console.log(electionJSON);

        CandidatesHTTP.onreadystatechange = function(){
          if (CandidatesHTTP.readyState == 4 && CandidatesHTTP.status == 200){
            if (CandidatesHTTP.responseText){
              console.log("--------------------------------");
              candidateJSON = CandidatesHTTP.responseText;
              elections = convertToObjects.elections(electionJSON);
              candidates = convertToObjects.candidates(candidateJSON);

              console.log(elections);
              console.log(candidates);

              res.render('student/studentDashboard', { title: 'Dashboard', elections: elections, candidates: candidates, user: req.user });
            }
          }
        }
      }
    }
  };
});

/* GET votes page. */
router.get('/vote/:id', function(req, res) {
  if(security.userAccess(req, res)){return}

  electionId = req.params.id;

  const electionUrl = 'http://localhost:3200/elections';
  const candidateUrl = 'http://localhost:3200/candidates';

  HTTP.open("GET", electionUrl);
  HTTP.send();
  CandidatesHTTP.open("GET", candidateUrl);
  CandidatesHTTP.send();

  HTTP.onreadystatechange = function(){
    if (HTTP.readyState == 4 && HTTP.status == 200){
      if (HTTP.responseText){
        electionJSON = HTTP.responseText;

        CandidatesHTTP.onreadystatechange = function(){
          if (CandidatesHTTP.readyState == 4 && CandidatesHTTP.status == 200){
            if (CandidatesHTTP.responseText){

              candidateJSON = CandidatesHTTP.responseText;
              elections = convertToObjects.elections(electionJSON);
              candidates = convertToObjects.candidates(candidateJSON);

              thisCandidates = [];
              //electionId
              for (i = 0; i <= elections.length - 1; i++) {
                if(elections[i].id == electionId){
                  election = elections[i];
                }
              }

              for (x = 0; x <= candidates.length - 1; x++) {
                if(candidates[x].electionId == electionId){
                  thisCandidates.push(candidates[x]);
                }
              }

              res.render('student/vote', { title: 'Vote', election: election, candidates: thisCandidates, user: req.user, electionId: electionId });
            }
          }
        }
      }
    }
  };
});

//              res.render('student/studentPastElections', { title: 'Dashboard', elections: elections, candidates: candidates });

/* GET past elections. */
router.get('/past-elections',  function(req, res, next) {
  if(security.userAccess(req, res)){return}

  const electionUrl = 'http://localhost:3200/elections';
  const candidateUrl = 'http://localhost:3200/candidates';

  HTTP.open("GET", electionUrl);
  HTTP.send();
  CandidatesHTTP.open("GET", candidateUrl);
  CandidatesHTTP.send();

  HTTP.onreadystatechange = function(){
    if (HTTP.readyState == 4 && HTTP.status == 200){
      if (HTTP.responseText){
        electionJSON = HTTP.responseText;

        CandidatesHTTP.onreadystatechange = function(){
          if (CandidatesHTTP.readyState == 4 && CandidatesHTTP.status == 200){
            if (CandidatesHTTP.responseText){

              candidateJSON = CandidatesHTTP.responseText;
              elections = convertToObjects.pastElections(electionJSON);
              candidates = convertToObjects.candidates(candidateJSON);

              res.render('student/studentPastElections', { title: 'Dashboard', elections: elections, candidates: candidates, user: req.user });
            }
          }
        }
      }
    }
  };
});


module.exports = router;
