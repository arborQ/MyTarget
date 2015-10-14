var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


router.route('/settings/account')
.post(function(req, res, next) {
  res.json({ success : false });
})
.get(function(req, res, next){
  res.json({ id : 1, login : 'arbor', firstName : 'Lukasz', lastName : 'Wojcik', roles : [ 'users', 'settings', 'settings.account' ] });
});
