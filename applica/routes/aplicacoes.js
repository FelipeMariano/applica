var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Aplicacao = require('../models/Aplicacao');

router.get('/', function(req, res, next){
  Aplicacao.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  })
});

module.exports = router;
