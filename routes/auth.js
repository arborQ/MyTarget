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
  console.log("jwt.verify(req.query.token, config.seacret)");
  console.log(jwt.verify(req.query.token, config.seacret));
  if(jwt.verify(req.query.token, config.seacret)){
    return  res.json({ token : req.query.token });
  }else{
    return  res.json(null);
  }
});

module.exports = router;
