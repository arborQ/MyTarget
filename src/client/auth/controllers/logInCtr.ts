
class logInCtr {
  public save: (model: any, form: angular.IFormController) => void;
  constructor($resource : angular.resource.IResourceService, $rootScope : any) {
    this.save = (model: any, form: angular.IFormController) => {
      if (form.$valid) {
        $rootScope.$loading = true;
        $resource('/auth').save(model)
        .$promise.finally(() => {
          $rootScope.$loading = false;
        });
      }
    }
  }
}

auth.controller('logInCtr', logInCtr);
