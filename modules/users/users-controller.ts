/// <reference path="../app/setup.ts"/>

define(['app'], function(app) {
  arborApplication
    .$controllerProvider
    .register('usersController', ['$scope', '$mdBottomSheet', 'usersApi', ($scope, $mdBottomSheet, usersApi) => {
      $scope.users = usersApi.query();

      $scope.selectedUser = null;
      $scope.userOptions = (user, $event : angular.IAngularEvent) => {
        $event.stopPropagation();

        $scope.selectedUser = user;
      }
    }
  ]);
});
