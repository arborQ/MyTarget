/// <reference path="../app/setup.ts"/>
define(['app'], function(app) {
  arborApplication
    .$controllerProvider
    .register('usersController', ['$scope', '$mdBottomSheet', ($scope, $mdBottomSheet) => {
    $scope.users = [{ id: 1, name: 'lukasz' }, { id: 2, name: 'ola' }, { id: 3, name: 'julka' }];

    for(var i= 0; i < 50; i++){
      $scope.users.push({ id: i+ 3, name: 'test'+i });
    }

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
