var express = require('express');
var router = express.Router();
var nconf = require('nconf');

nconf.env()
     .file({ file: 'config.json', search: true });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', production : nconf.get("NODE_ENV") });
});

module.exports = router;
