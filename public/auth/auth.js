var auth = angular.module('ar-auth', ['ui.router', 'ngResource', 'angular-jwt'])
    .run(["menuService", function (menuService) { return menuService.add({ name: 'Login', state: 'login' }); }])
    .config(["$stateProvider", "$httpProvider", function ($stateProvider, $httpProvider) {
    $httpProvider.interceptors.push('jwtInterceptor');
    $stateProvider.state({
        name: 'login',
        url: '/login',
        templateUrl: 'auth/views/login.html',
        controller: 'logInCtr',
        controllerAs: 'ctr'
    });
}]);

var logInCtr = (function () {
    function logInCtr($resource, $rootScope, authService, $state) {
        this.save = function (model, form) {
            if (form.$valid) {
                $rootScope.$loading = true;
                $resource('/api/auth').save(model)
                    .$promise.then(function (res) {
                    if (res.token) {
                        authService.SetToken(res.token);
                        $state.go('users');
                    }
                    $rootScope.$loading = false;
                });
            }
        };
    }
    logInCtr.$inject = ["$resource", "$rootScope", "authService", "$state"];
    return logInCtr;
})();
auth.controller('logInCtr', logInCtr);

auth.factory('authJwtInterceptor', ["$q", "$rootScope", function ($q, $rootScope) {
    return {
        'responseError': function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthenticated', response);
            }
            return $q.reject(response);
        }
    };
}]);

var authService = (function () {
    function authService(jwtHelper) {
        this.jwtHelper = jwtHelper;
    }
    authService.prototype.tokenIsActive = function () {
        return this.token && !this.jwtHelper.isTokenExpired(this.token);
    };
    authService.prototype.SetToken = function (token) {
        this.token = token;
        return this.GetUserData();
    };
    authService.prototype.GetUserData = function () {
        return this.jwtHelper.decodeToken(this.token);
    };
    authService.prototype.HasAccess = function (role) {
        if (this.tokenIsActive()) {
            return this.GetUserData().roles.filter(function (r) { return r === role; }).length > 0;
        }
        else {
            return false;
        }
    };
    return authService;
})();
auth.service('authService', ["jwtHelper", function (jwtHelper) { return new authService(jwtHelper); }]);
