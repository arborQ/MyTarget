var console = console;
var usersModule = angular.module('ar-users', ['ui.router', 'ngResource', 'ar-auth'])
    .config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state({
        name: 'users',
        url: '/users',
        template: '<div>users :)</div>',
        data: { access: { roles: ['users'] } },
        resolve: {
            restricted: ["$q", "authService", "$state", function ($q, authService, $state) {
                return authService.HasAccess('users');
            }]
        }
    });
}]);
