var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');

var token = jwt.sign({ id : 1, login : 'arbor', firstName : 'Lukasz', lastName : 'Wojcik', roles : [ 'users', 'settings', 'settings.account' ] }, config.seacret, {
      expiresIn: '1d'
    });

router.route('/auth')
.post(function(req, res, next) {
  if(req.body.login === 'arbor' && req.body.password === '123'){
    setTimeout(function(){
      res.json({ token : token });
    }, 1);
  }else{
    setTimeout(function(){
      res.json({ success : false });
    }, 2000);
  }
})
.get(function(req, res, next){
  if(jwt.verify(req.query.token, config.seacret)){
    return res.json({ token : req.query.token });
  }else{
    return  res.json(null);
  }
});

module.exports = router;
