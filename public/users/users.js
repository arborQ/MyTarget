var usersModule = angular.module('ar-users', ['ui.router', 'ngResource'])
    .run(["menuService", function (menuService) { return menuService.add({ name: 'Users', state: 'users' }); }])
    .config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state({
        name: 'users',
        url: '/users',
        template: '<div>users :)</div>'
    });
}]);
