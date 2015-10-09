var app = angular.module('app', ['ui.router','ar-auth'])
.config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider : angular.ui.IUrlRouterProvider) => {
  $stateProvider.state({
    name: 'home', url: '/', template: '<div></div>'
  });
  $urlRouterProvider.otherwise('/');
})
