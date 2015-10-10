var app = angular.module('app', ['ui.router', 'toaster', 'ar-auth', 'ar-users'])
    .run(["$http", function ($http) {
    $http.defaults.headers.common.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1a2FzeiBXb2pjaWsiLCJhZG1pbiI6dHJ1ZX0.nU659L6z8ZrnrR39n0w1e3Yf_1BZiqOUuMcGi1LjH2g';
}])
    .config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('errorInterceptorFactory');
    $stateProvider.state({
        name: 'home', url: '/', template: '<div></div>'
    });
    $urlRouterProvider.otherwise('/');
}]);

app.factory('errorInterceptorFactory', ["$q", "toaster", function ($q, toaster) {
    return {
        // optional method
        //  'requestError': function(rejection) {
        //     // do something on error
        //     if (canRecover(rejection)) {
        //       return responseOrNewPromise
        //     }
        //     return $q.reject(rejection);
        //   },
        // optional method
        'responseError': function (rejection) {
            toaster.pop({
                type: 'error',
                title: 'Ajax',
                body: 'ajax error occured',
                showCloseButton: true
            });
            return $q.reject(rejection);
        }
    };
}]);

app.controller('applicationCtr', ["$scope", function ($scope) { }]);

app.service('menuService', ["$rootScope", function ($rootScope) {
    $rootScope.$menuItems = [];
    return {
        add: function (position) {
            $rootScope.$menuItems.push(position);
        },
        load: function () { return $rootScope.$menuItems; }
    };
}]);
