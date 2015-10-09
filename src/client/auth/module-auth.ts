var auth = angular.module('ar-auth', ['ui.router' ,'ngResource'])
  .config(($stateProvider: angular.ui.IStateProvider) => {
  $stateProvider.state({
    name: 'login',
    url: '/login',
    templateUrl: 'auth/views/login.html',
    controller: 'logInCtr',
    controllerAs: 'ctr'
  });
})
