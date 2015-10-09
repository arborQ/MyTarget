var auth = angular.module('ar-auth', ['ui.router', 'ngResource'])
    .config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state({
        name: 'login',
        url: '/login',
        templateUrl: 'auth/views/login.html',
        controller: 'logInCtr',
        controllerAs: 'ctr'
    });
}]);

var logInCtr = (function () {
    function logInCtr($log, $resource) {
        this.save = function (model, form) {
            if (form.$valid) {
                $log.info(model);
                $resource('/auth').save(model);
            }
        };
    }
    logInCtr.$inject = ["$log", "$resource"];
    return logInCtr;
})();
auth.controller('logInCtr', logInCtr);
