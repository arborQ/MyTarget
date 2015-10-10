var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');

router.route('/auth')
.post(function(req, res, next) {
  if(req.body.login === 'arbor' && req.body.password === '123'){
    var token = jwt.sign({ id : 1, name : 'arbor', isAdmin : true }, config.seacret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });
        return res.json({ token : token });
  }
  return res.json({ success : false });
});

module.exports = router;
