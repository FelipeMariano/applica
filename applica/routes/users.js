var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var Cardeneta = require('../models/Cardeneta.js');
var UserCard = require('../models/UserCard.js');

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

router.get('/:id/cardenetas', function(req, res, next){
 var obj;

});

router.post('/:id/cardenetas', function(req, res, next){
  Cardeneta.create(req.body, function(err, post){
    if(err) return next(err);
    UserCard.create({'id_user': req.params.id, 'id_card': post['_id']}, function(err_card, post_card){
      if (err_card) return new(err_card);
      res.json(post);
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
