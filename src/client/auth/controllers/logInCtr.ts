
class logInCtr {
  public save: (model: any, form: angular.IFormController) => void;
  constructor($log: angular.ILogService, $resource : angular.resource.IResourceService) {
    this.save = (model: any, form: angular.IFormController) => {
      if (form.$valid) {
        $log.info(model);
        $resource('/auth').save(model);
      }
    }
  }
}

auth.controller('logInCtr', logInCtr);
