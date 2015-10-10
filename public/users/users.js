var console = console;
var usersModule = angular.module('ar-users', ['ui.router', 'ngResource', 'ar-auth'])
    .run(["menuService", function (menuService) { return menuService.add({ name: 'Users', state: 'users' }); }])
    .config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state({
        name: 'users',
        url: '/users',
        template: '<div>users :)</div>',
        resolve: {
            restricted: ["$q", "authService", "$state", function ($q, authService, $state) {
                var def = $q.defer();
                if (authService.HasAccess('users')) {
                    console.log('has access');
                    def.resolve(true);
                }
                else {
                    console.log('has no access');
                    def.reject(false);
                    $state.go('login');
                }
                return def.promise;
            }]
        }
    });
}]);
