var console = console;
var usersModule = angular.module('ar-users', ['ui.router', 'ngResource', 'ar-auth'])
  .config(($stateProvider: angular.ui.IStateProvider) => {
  $stateProvider.state({
    name: 'users',
    url: '/users',
    template: '<div><pre> {{ctr.model | json}} </pre></div>',
    controllerAs : 'ctr',
    controller : 'userList',
    data : { access : { roles : [ 'users' ] }, icon : 'fa-users' },
    resolve: {
      restricted: ($q: ng.IQService, authService: application.auth.IAuthService, $state : ng.ui.IStateService) => {
        return authService.HasAccess('users');
      }
    }
  });
})
