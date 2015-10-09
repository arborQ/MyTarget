var app = angular.module('app', ['ui.router', 'toaster', 'ar-auth', 'ar-users'])
.run(($http : angular.IHttpService) =>{
  $http.defaults.headers.common.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1a2FzeiBXb2pjaWsiLCJhZG1pbiI6dHJ1ZX0.nU659L6z8ZrnrR39n0w1e3Yf_1BZiqOUuMcGi1LjH2g';

})
.config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider : angular.ui.IUrlRouterProvider, $httpProvider : angular.IHttpProvider) => {
  $httpProvider.interceptors.push('errorInterceptorFactory');
  $stateProvider.state({
    name: 'home', url: '/', template: '<div></div>'
  });
  $urlRouterProvider.otherwise('/');
})
