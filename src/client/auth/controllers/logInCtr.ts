
class logInCtr {
  public save: (model: any, form: angular.IFormController) => void;
  constructor($resource : angular.resource.IResourceService) {
    this.save = (model: any, form: angular.IFormController) => {
      if (form.$valid) {
        $resource('/auth').save(model);
      }
    }
  }
}

auth.controller('logInCtr', logInCtr);
