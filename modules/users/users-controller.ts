/// <reference path="../app/setup.ts"/>
define(['app'], function(app) {
  arborApplication
    .$controllerProvider
    .register('usersController', ['$scope', ($scope) => {
      $scope.users = [{ id : 1, name: 'lukasz' },{ id : 2,name: 'ola' },{ id : 3,name: 'julka' }];
    }]);
});
