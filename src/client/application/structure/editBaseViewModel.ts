class editBaseViewModel<T, K> extends baseViewModel<T>{
  public service : ng.resource.IResourceClass<T>;

  loadData() : T {
    this.beforeLoadData();
    return this.service.get(this.getParams, this.onSuccessLoadData, this.onErrorLoadData);
  };
  constructor($scope:ng.IScope, $resource : ng.resource.IResourceService, servicePath : string, public getParams : K){
    super($scope);
    this.service = $resource<T>(servicePath);
  }
}
