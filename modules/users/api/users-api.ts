/// <reference path="../../../typings/requirejs/require.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
class usersApi {
  constructor() {
    var express = require('express');
    var router = express.Router();
    var list = router.route('/users');
    var details = router.route('/users/:id');
    var data = [ { id : 1, name : 'lukasz'} ];
    list.get((req, res) => {
      res.json(data);
    });
    details.get((req, res) => {
      res.json(data.filter((item) => item.id == req.params.id; )[0]);
    });
    return router;
  }
}

module.exports = new usersApi();
