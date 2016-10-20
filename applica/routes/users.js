var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var jwt = require('jsonwebtoken');

var failed_to_login = function(res){
  res.json({success: false, message: 'Authentication failed. Wrong user or wrong password.'});
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  });
});

router.post('/', function(req, res, next){
  User.create(req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  });
});



module.exports = router;
