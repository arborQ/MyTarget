var console = console;
var usersModule = angular.module('ar-users', ['ui.router', 'ngResource', 'ar-auth'])
  .run((menuService: application.IMenuService) => menuService.add({ name: 'Users', state: 'users' }))
  .config(($stateProvider: angular.ui.IStateProvider) => {
  $stateProvider.state({
    name: 'users',
    url: '/users',
    template: '<div>users :)</div>',
    resolve: {
      restricted: ($q: ng.IQService, authService: application.auth.IAuthService, $state : ng.ui.IStateService) => {
        var def = $q.defer();
        if (authService.HasAccess('users')) {
          console.log('has access');
          def.resolve(true);
        } else {
          console.log('has no access');
          def.reject(false);
          $state.go('login');
        }

        return def.promise;
      }
    }
  });
})
