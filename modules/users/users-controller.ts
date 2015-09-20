/// <reference path="../app/setup.ts"/>
define(['app'], function(app) {
  arborApplication
    .$controllerProvider
    .register('usersController', ['$scope', '$mdBottomSheet', ($scope, $mdBottomSheet) => {
    $scope.users = [{ id: 1, name: 'lukasz' }, { id: 2, name: 'ola' }, { id: 3, name: 'julka' }];


    $scope.userOptions = (user, $event) => {
      $mdBottomSheet.show({
        templateUrl: 'users/views/bottomMenu.html',
        controller: ['$scope', 'selectedUser', ($scope, selectedUser) => {
          $scope.selectedUser = selectedUser;
        }],
        locals: {
          selectedUser: user
        },
        targetEvent: $event
      });
    }
  }
  ]);
});
