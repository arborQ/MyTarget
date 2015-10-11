var auth = angular.module('ar-auth', ['ui.router', 'ngResource', 'angular-jwt', 'LocalStorageModule'])
    .run(["menuService", function (menuService) { return menuService.add({ name: 'Login', state: 'login' }); }])
    .config(["$stateProvider", "$httpProvider", "localStorageServiceProvider", function ($stateProvider, $httpProvider, localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('ar')
        .setStorageType('localStorage')
        .setNotify(true, true);
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

var console = console;
var authService = (function () {
    function authService(jwtHelper, $q, $http, $resource, localStorageService) {
        var _this = this;
        this.jwtHelper = jwtHelper;
        this.$q = $q;
        this.$http = $http;
        this.localStorageService = localStorageService;
        this.storageKey = "token_id";
        this.validationPromise = $q.defer();
        var savedToken = localStorageService.get(this.storageKey);
        if (savedToken) {
            $resource('/api/auth').get({ token: savedToken }).$promise.then(function (token) {
                localStorageService.set(_this.storageKey, token.token);
                _this.token = token.token;
                _this.validationPromise.resolve(token.token);
            });
        }
        else {
            this.validationPromise.reject(null);
        }
    }
    authService.$inject = ["jwtHelper", "$q", "$http", "$resource", "localStorageService"];
    authService.prototype.tokenIsActive = function () {
        return this.token && !this.jwtHelper.isTokenExpired(this.token);
    };
    authService.prototype.SetToken = function (token) {
        this.token = token;
        this.localStorageService.set(this.storageKey, token);
        this.$http.defaults.headers.common.Authorization = token;
        return this.GetUserData();
    };
    authService.prototype.GetUserData = function () {
        return this.jwtHelper.decodeToken(this.token);
    };
    authService.prototype.HasAccess = function (role) {
        var _this = this;
        var accessPromise = this.$q.defer();
        this.validationPromise.promise.then(function (token) {
            if (_this.tokenIsActive() && _this.GetUserData().roles.indexOf(role) !== -1) {
                accessPromise.resolve(true);
            }
            else {
                accessPromise.reject(false);
            }
        });
        return accessPromise.promise;
    };
    return authService;
})();
auth.service('authService', authService);
