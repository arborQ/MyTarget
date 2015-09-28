/// <reference path="../app/typings.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>

module arborApplication {
  export var $controllerProvider = null;
  export var $stateStorage = <arbor.IStateStorage>{};
  var app = angular.module('app', ['ngMaterial', 'ui.router', 'ngResource', 'ngLocalize', 'ngLocalize.Config'])
    .run(($rootScope, $state, $stateParams, $mdBottomSheet, $q, $mdSidenav) => {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$toggleList = () => {
      var pending = $mdBottomSheet.hide() || $q.when(true);
      pending.then(() => {
        $mdSidenav('left').toggle();
      });
    }

    $rootScope.$on('$locationChangeSuccess', () => { $mdSidenav('left').close(); $mdBottomSheet.hide(); });

  }
    ).config(($urlRouterProvider, $stateProvider: angular.ui.IStateProvider, $controllerProvider) => {
    arborApplication.$controllerProvider = $controllerProvider;

    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state("home", {
      url: '/',
      template: '<div>home</div>'
    });

    /*angular.forEach(arborApplication.$stateStorage, (state: arbor.IArborRoute, stateName: string) => {
      if(!state.locals){
        state.locals = {};
      }

      state.locals.loadController = ['$q', ($q) => {
        var deferred = $q.defer();
        require(state.require, () => { deferred.resolve(); });
        return deferred.promise;
      }];
      console.log(state.locals);
      var newState = <angular.ui.IState>{
        url: state.url,
        controller: state.controller,
        template: state.template,
        templateUrl: state.templateUrl,
        resolve: state.locals
      };

      $stateProvider.state(stateName, newState);
    })*/

  }).value('localeConf', {
    basePath: 'languages',
    defaultLocale: 'pl-PL',
    sharedDictionary: 'app',
    fileExtension: '.lang.json',
    persistSelection: true,
    cookieName: 'COOKIE_LOCALE_LANG',
    observableAttrs: new RegExp('^data-(?!ng-|i18n)'),
    delimiter: '::'
  }).value('localeSupported', [
    'en-US',
    'pl-PL',
  ]);
}
