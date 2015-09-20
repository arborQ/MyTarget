/// <reference path="../app/setup.ts"/>
define(['app'], function(app) {
  arborApplication
    .$controllerProvider
    .register('usersEditController', ['$scope', ($scope) => {
      $scope.details = { id : 1, name: 'lukasz', login : 'arbor' };
      $scope.originalDetails = { id : 1, name: 'lukasz', login : 'arbor' };
    }]);
});
