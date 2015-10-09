var app = angular.module('app', ['ui.router', 'ar-auth'])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'home', url: '/', template: '<div></div>'
    });
    $urlRouterProvider.otherwise('/');
}]);

app.controller('applicationCtr', ["$scope", function ($scope) { }]);
