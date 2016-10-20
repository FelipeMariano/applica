var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var Cardeneta = require('../models/Cardeneta.js');

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

router.get('/:id', function(req, res, next){
  User.findById(req.params.id, function(err, post){
    if(err) next(err);
    res.json(post);
  })
});

router.post('/:id/cardenetas', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    Cardeneta.create(req.body, function(err, new_card){
      user.cardenetas.push(new_card);
      user.save(function(err, post){
        res.json(post);
      });
    });
  });
});

router.post('/', function(req, res, next){
  User.create(req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  });
});



module.exports = router;
