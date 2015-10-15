class editBaseViewModel<T, K> extends baseViewModel<T>{
  public service : ng.resource.IResourceClass<T>;
  public originModel : T;
  getModel(params : K) : T{
    return this.service.get(params, this.onSuccessLoadData, this.onErrorLoadData);
  }

  loadData() : T {
    this.beforeLoadData();
    var model = this.getModel(this.params);
    this.originModel = angular.copy(model);
    return model;
  };
  constructor($scope:ng.IScope, $resource : ng.resource.IResourceService, servicePath : string, public params : K){
    super($scope);
    this.service = $resource<T>(servicePath);
  }
}
