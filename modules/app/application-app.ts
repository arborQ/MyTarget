module application{
  var app = angular.module('app', ['ngMaterial', 'ui.router', 'ar-users', 'ar-cookBook'])
  .run(($rootScope,   $state,   $stateParams, $mdBottomSheet, $q, $mdSidenav) => {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      $rootScope.$toggleList = () => {
        var pending = $mdBottomSheet.hide() || $q.when(true);
        pending.then(() =>{
          $mdSidenav('left').toggle();
        });
      }

      $rootScope.$on('$locationChangeSuccess', () => { $mdSidenav('left').close(); $mdBottomSheet.hide(); });

  }
  ).config(($urlRouterProvider, $stateProvider : angular.ui.IStateProvider) => {


    $urlRouterProvider
        .otherwise('/');

    $stateProvider
      .state("home", {
        url : '/',
        template : '<div>home</div>'
      });
  })
}
