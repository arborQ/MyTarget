var usersModule = angular.module('ar-users', ['ui.router' ,'ngResource'])
   .run((menuService : application.IMenuService) => menuService.add({name : 'Users', state : 'users' }))
  .config(($stateProvider: angular.ui.IStateProvider) => {
  $stateProvider.state({
    name: 'users',
    url: '/users',
    template: '<div>users :)</div>'
  });
})
