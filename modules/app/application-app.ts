module application {
  var app = angular.module('app', ['ngMaterial', 'ui.router', 'ngLocalize', 'ngLocalize.Config', 'ar-users', 'ar-cookBook'])
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
    ).config(($urlRouterProvider, $stateProvider: angular.ui.IStateProvider) => {


    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state("home", {
      url: '/',
      template: '<div>home</div>'
    });
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
