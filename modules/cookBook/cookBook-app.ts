/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>

module cookBook{
  var app = angular.module('ar-cookBook', ['ui.router'])
  .config(($stateProvider : angular.ui.IStateProvider) => {
    $stateProvider
      .state("cookBook", {
        url : '/cookBook',
        template : '<div>ui router works cookBook</div>'
      });
  });
}
