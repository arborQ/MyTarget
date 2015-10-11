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
                return authService.HasAccess('users');
            }]
        }
    });
}]);
