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
    function logInCtr($resource, $rootScope) {
        this.save = function (model, form) {
            if (form.$valid) {
                $rootScope.$loading = true;
                $resource('/api/auth').save(model)
                    .$promise.finally(function () {
                    $rootScope.$loading = false;
                });
            }
        };
    }
    logInCtr.$inject = ["$resource", "$rootScope"];
    return logInCtr;
})();
auth.controller('logInCtr', logInCtr);
