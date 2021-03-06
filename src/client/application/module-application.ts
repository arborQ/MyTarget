var console = console;
var app = angular.module('app', ['ui.router', 'toaster', 'ar-auth', 'ar-users', 'ar-settings'])
.run(($http : angular.IHttpService, $rootScope : ng.IScope, $state : ng.ui.IStateService) =>{
  $rootScope.$on('$stateChangeError', () => {
    $state.go('home.401');
  });
})
.config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider : angular.ui.IUrlRouterProvider, $httpProvider : angular.IHttpProvider) => {
  $httpProvider.interceptors.push('errorInterceptorFactory');
  $stateProvider.state({
    name: 'home', url: '/', template: '<div>home :)<div ui-view=""></div></div>'
  });

  $stateProvider.state({
    name: 'home.404', url: '404', template: '<div>404 - cant find this page.</div>'
  });

  $stateProvider.state({
    name: 'home.401', url: '401', template: '<div>401 - unauthenticated.</div>'
  });

  $urlRouterProvider.otherwise('/404');
})
