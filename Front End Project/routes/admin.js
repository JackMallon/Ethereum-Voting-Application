var express = require('express');
var router = express.Router();
var security = require('../src/services/security.js');
var convertToObjects = require('../src/services/convertToObjects.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const HTTP = new XMLHttpRequest();
const CandidatesHTTP = new XMLHttpRequest();

/* GET dashboard. */
router.get('/',  function(req, res, next) {
  if(security.adminAccess(req, res)){return}

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

              res.render('admin/adminDashboard', { title: 'Dashboard', elections: elections, candidates: candidates });
            }
          }
        }
      }
    }
  };
});

/* GET past elections. */
router.get('/past-elections',  function(req, res, next) {
  if(security.adminAccess(req, res)){return}

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

              res.render('admin/adminPastElections', { title: 'Dashboard', elections: elections, candidates: candidates });
            }
          }
        }
      }
    }
  };
});

/* GET new election page. */
router.get('/new',  function(req, res, next) {
  if(security.adminAccess(req, res)){return}

  res.render('admin/adminNew', { title: 'Dashboard', req: req });
});

/* GET new candidates page. */
router.get('/new-candidate', function(req, res) {
  if(security.adminAccess(req, res)){return}

  const electionUrl = 'http://localhost:3200/elections';
  const candidateUrl = 'http://localhost:3200/candidates';

  HTTP.open("GET", electionUrl);
  HTTP.send();

  HTTP.onreadystatechange = function(){
    if (HTTP.readyState == 4 && HTTP.status == 200){
      if (HTTP.responseText){
        electionJSON = HTTP.responseText;

        elections = convertToObjects.elections(electionJSON);

        res.render('admin/adminNewCandidate', { title: 'New Candidate', elections: elections });

      }
    }
  };
});

module.exports = router;
