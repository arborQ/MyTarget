/// <reference path="../../typings/angular-material/angular-material.d.ts"/>
module application.controller {
  var app = angular.module('app');

  app.controller('appController', ($scope, locale) => {
    $scope.language = 'pl-PL';
    locale.ready('app').then(() => {
      document.title = locale.getString('app.appName');
    });
  });
}
