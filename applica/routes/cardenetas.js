var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Cardeneta = require('../models/Cardeneta.js');
var Aplicacao = require('../models/Aplicacao.js');

router.get('/', function(req, res, next){
  Cardeneta.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  });
});

router.get('/:id', function(req, res, next){
  Cardeneta.findById(req.params.id, function(err, post){
    if (err) return next(err);
    res.json(post);
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


router.get('/:id/aplicacoes', function(req, res, next){
  Cardeneta.findById(req.params.id, function(err, card){
    Aplicacao.find({_id: {$in: card['aplicacoes']}}).exec(function(err, post){
      res.json(post);
    });
  });
});

router.post('/:id/aplicacoes', function(req, res, next){
  Cardeneta.findById(req.params.id, function(err, card){
    Aplicacao.create(req.body, function(err, new_aplic){
      card.aplicacoes.push(new_aplic);
      card.save(function(err, post){
        res.json(post);
      });
    });
  });
});

module.exports = router;
