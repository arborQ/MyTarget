/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/angular-material/angular-material.d.ts"/>
define(['app'], (app) => {
  console.log(arborApplication);
    arborApplication.$controllerProvider.register('usersController', ['$scope', '$mdBottomSheet',($scope, $mdBottomSheet) => {
      $scope.users = [{ id: 1, name: 'arbor' }, { id: 2, name: 'ola' }, { id: 3, name: 'julka' }];
      $scope.userOptions = (user, $event) => {
        $mdBottomSheet.show(<angular.material.IBottomSheetOptions>{
          templateUrl: 'users/views/bottomMenu.html',
          controller: 'usersBottomController',
          targetEvent: $event,
          locals: {
            selectedUser: user
          }
        });
      };
    }]);
    arborApplication.$controllerProvider.register('usersBottomController', ($scope, selectedUser) => {
      $scope.selectedUser = selectedUser;
      console.log($scope.selectedUser);
      $scope.items = [
        { name: 'edit', icon: 'edit' },
        { name: 'delete', icon: 'delete' },
        { name: 'copy', icon: 'copy' },
      ];
    });
});
