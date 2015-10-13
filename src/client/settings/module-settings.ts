var moduleSettings = angular.module('ar-settings', ['ui.router', 'ngResource', 'angular-jwt', 'LocalStorageModule'])
  .config((
    $stateProvider: angular.ui.IStateProvider,
    $httpProvider: angular.IHttpProvider,
    localStorageServiceProvider: any) => {

  $stateProvider.state('settings', {
    url: '/settings',
    abstract : true,
    resolve : { restricted : (authService : application.auth.IAuthService) => { return authService.HasAccess('settings') || authService.HasAccess('settings.account');} },
    template: '<div>settings<div ui-view></div></div>'
  });

  $stateProvider.state('settings.account', {
    url: '/account',
     resolve : { restricted : (authService : application.auth.IAuthService) => { return authService.HasAccess('settings.account');} },
    template: '<div>my account :)</div>'
  });
})
