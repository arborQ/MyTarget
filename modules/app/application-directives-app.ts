/// <reference path="../../typings/angular-material/angular-material.d.ts"/>
module application.directives {
  var app = angular.module('app');

  app.directive('arLaguage', () => {
    return {
      restrict: 'EA',
      templateUrl: 'app/views/changeLaguage.html',
      controller: ($scope, $mdDialog, locale) => {
        $scope.selectedLanguage = locale.getLocale();

        $scope.tryChange = () => {
          $mdDialog.show({
            locals : { selectedLanguage : $scope.selectedLanguage },
            templateUrl: 'app/views/languageDialog.html',
            controller: ($scope, $mdDialog, selectedLanguage) => {
              $scope.selectedLanguage = selectedLanguage;
              $scope.originalLanguage = selectedLanguage;
              $scope.change = () => $mdDialog.hide($scope.selectedLanguage);
              $scope.cancel = () => $mdDialog.cancel();
            }
          }).then(function(newLocale) {
            locale.setLocale(newLocale);
            $scope.selectedLanguage = newLocale;
          });
        }
      }
    };
  });
}
