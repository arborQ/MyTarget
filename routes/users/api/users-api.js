/// <reference path="../../../typings/requirejs/require.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
var usersApi = (function () {
    function usersApi() {
        var express = require('express');
        var router = express.Router();
        var route = router.route('/token');
        route.get(function (req, res) {
            res.json({ message: 'hallo' });
        });
        return router;
    }
    return usersApi;
})();
module.exports = new usersApi();
