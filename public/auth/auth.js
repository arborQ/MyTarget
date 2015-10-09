var auth = angular.module('ar-auth', ['ui.router', 'ngResource'])
    .run(["menuService", function (menuService) { return menuService.add({ name: 'Login', state: 'login' }); }])
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
    function logInCtr($resource) {
        this.save = function (model, form) {
            if (form.$valid) {
                $resource('/auth').save(model);
            }
        };
    }
    logInCtr.$inject = ["$resource"];
    return logInCtr;
})();
auth.controller('logInCtr', logInCtr);
