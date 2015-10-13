var express = require('express');
var router = express.Router();
var nconf = require('nconf');

nconf.env()
     .file({ file: 'config.json', search: true });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My target', production : nconf.get("NODE_ENV") === 'production' });
});

module.exports = router;
