/// <reference path="../../../typings/angularjs/angular.d.ts"/>
module application.filters {
  var app = angular.module('app');

  app.filter('hasChange', () => {
    return (item : Object, originalItem : Object) =>{
      return JSON.stringify(item) !== JSON.stringify(originalItem);
    };
  });
}
