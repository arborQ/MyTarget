var console = console;
var app = angular.module('app', ['ui.router', 'toaster', 'ar-auth', 'ar-users'])
    .run(["$http", "$rootScope", "$state", function ($http, $rootScope, $state) {
    $rootScope.$on('$stateChangeError', function () {
        $state.go('home.404');
    });
}])
    .config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('errorInterceptorFactory');
    $stateProvider.state({
        name: 'home', url: '/', template: '<div>home :)<div ui-view=""></div></div>'
    });
    $stateProvider.state({
        name: 'home.404', url: '404', template: '<div>404 - cant find this page.</div>'
    });
    $urlRouterProvider.otherwise('/404');
}]);

var console = console;
var applicationCtr = (function () {
    function applicationCtr($scope, $state, authService) {
        var _this = this;
        this.listOfAllStates = $state.get();
        this.listOfMenuPositons = ['login', 'users'];
        $scope.$on("newUserData", function ($event, userData) {
            _this.userData = userData;
        });
        this.logOut = function ($event) {
            $event.stopPropagation();
            $event.preventDefault();
            authService.LogOut();
            $state.go('home');
        };
    }
    applicationCtr.$inject = ["$scope", "$state", "authService"];
    return applicationCtr;
})();
app.controller('applicationCtr', applicationCtr);

app.factory('errorInterceptorFactory', ["$q", "toaster", function ($q, toaster) {
    return {
        'responseError': function (rejection) {
            if (rejection.status !== 401) {
                toaster.pop({
                    type: 'error',
                    title: 'Ajax',
                    body: 'ajax error occured',
                    showCloseButton: true
                });
            }
            return $q.reject(rejection);
        }
    };
}]);

var console = console;
var availableStates = (function () {
    function availableStates() {
        return function (userData, listOfMenuPositons, listOfAllStates) {
            var filterResult = [];
            var authorized = !!userData;
            listOfMenuPositons.forEach(function (item) {
                var stateRelated = listOfAllStates.filter(function (state) { return state.name === item; })[0];
                if (stateRelated) {
                    var access = stateRelated.data.access;
                    if (access) {
                        if (access.onlyAnonymous && !authorized) {
                            filterResult.push(item);
                        }
                        else if (access.roles && authorized) {
                            filterResult.push(item);
                        }
                    }
                    else {
                        filterResult.push(item);
                    }
                }
            });
            return filterResult;
        };
    }
    return availableStates;
})();
app.filter('availableStates', availableStates);
