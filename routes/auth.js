var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');

var token = jwt.sign({ id : 1, name : 'arbor', roles : [ 'users' ] }, config.seacret, {
      expiresIn: '1d'
    });

router.route('/auth')
.post(function(req, res, next) {
  if(req.body.login === 'arbor' && req.body.password === '123'){
    res.json({ token : token });
  }else{
    res.json({ success : false });
  }
})
.get(function(req, res, next){
  res.send(token);
});

module.exports = router;
