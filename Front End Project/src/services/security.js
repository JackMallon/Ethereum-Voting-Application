var express = require('express');

function adminAccess(req, res){
  if(req.user) {
    if(req.user.role === "ROLE_ADMIN") {
      return false;
    } else {
      res.redirect(302, '/student');
      return true;
    }
  } else {
    res.redirect('/login');
    return true;
  }
}

function userAccess(req, res){
  if(req.user) {
    if(req.user.role === "ROLE_USER") {
      return false;
    } else {
      res.redirect(302, '/admin');
      return true;
    }
  } else {
    res.redirect('/login');
    return true;
  }
}

module.exports.adminAccess = adminAccess;
module.exports.userAccess = userAccess;
