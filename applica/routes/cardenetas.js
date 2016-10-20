var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Cardeneta = require('../models/Cardeneta.js');

router.get('/', function(req, res, next){
  Cardeneta.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  });
});

router.get('/:id', function(req, res, next){
  Cardeneta.findById(req.params.id, function(err, post){
    if (err) return next(err);
    res.json()
  });
});

router.post('/', function(req, res, next){
  Cardeneta.create(req.body, function(err, post){
      if(err) return next(err);
      res.json(post);
  });
});

router.put('/:id', function(req, res, next){
  Cardeneta.findByIdAndUpdate(req.params.id, req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  });
});

module.exports = router;
