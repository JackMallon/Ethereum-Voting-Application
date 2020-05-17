var express = require('express');
var router = express.Router();
var security = require('../src/services/security.js');
var convertToObjects = require('../src/services/convertToObjects.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const HTTP = new XMLHttpRequest();
const CandidatesHTTP = new XMLHttpRequest();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('public/index', { title: 'TUD E-Voting' });
});

/* GET log in page. */
router.get('/login', function(req, res, next) {
  res.render('public/login', { title: 'Sign In', req: req });
});

module.exports = router;
