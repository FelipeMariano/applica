var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET home page. */
router.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token){
    jwt.verify(token, req.app.get('secretToken'), function(err, decoded){
      if(err){
        return res.json({success: false, message: 'Failed to authentcate token.'});
      }else{
        req.decoded = decoded;
        next();
      }
    });
  }else{
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  };
});

module.exports = router;
