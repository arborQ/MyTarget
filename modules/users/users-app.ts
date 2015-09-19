/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>

module users{
  var app = angular.module('ar-users', ['ui.router'])
  .config(($stateProvider : angular.ui.IStateProvider) => {
    $stateProvider
      .state("users", {
        url : '/users',
        templateUrl : 'users/views/index.html',
        controller : 'usersController',
        resolve: {
          loadusersController: ($q) => {
            var deferred = $q.defer();
            require(["usersController"], function() { deferred.resolve(); });
            return deferred.promise;
          },
        }
      });
  });
}
