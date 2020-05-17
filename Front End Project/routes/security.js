var express = require('express');
var router = express.Router();
var auth = require('../auth.js');

/* Logout function. */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/* Login post */
router.post('/login', auth.authenticate('login', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
