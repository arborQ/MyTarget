var auth = angular.module('ar-auth', ['ui.router', 'ngResource', 'angular-jwt', 'LocalStorageModule'])
  .run((menuService: application.IMenuService) => menuService.add({ name: 'Login', state: 'login' }))
  .config(($stateProvider: angular.ui.IStateProvider, $httpProvider: angular.IHttpProvider, localStorageServiceProvider: any) => {
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
})
