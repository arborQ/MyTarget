/// <reference path="../app/setup.ts"/>
/// <reference path="../../typings/requirejs/require.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
define(['app'], function (app) {
    arborApplication
        .$controllerProvider
        .register('usersEditController', ['$scope', '$stateParams', 'usersApi', function ($scope, $stateParams, usersApi) {
            $scope.details = usersApi.get({ id: $stateParams.id });
            $scope.originalDetails = angular.copy($scope.details);
        }]);
});
