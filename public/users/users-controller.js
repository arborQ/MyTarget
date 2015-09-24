/// <reference path="../app/setup.ts"/>
define(['app'], function (app) {
    arborApplication
        .$controllerProvider
        .register('usersController', ['$scope', '$mdBottomSheet', 'usersApi', function ($scope, $mdBottomSheet, usersApi) {
            $scope.users = usersApi.query();
            $scope.selectedUser = null;
            $scope.userOptions = function (user, $event) {
                $event.stopPropagation();
                $scope.selectedUser = user;
            };
        }
    ]);
});
