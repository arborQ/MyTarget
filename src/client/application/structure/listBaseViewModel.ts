class listBaseViewModel<T> extends baseViewModel<Array<T>> {
  public service : ng.resource.IResourceClass<T>;
  loadData() : Array<T>{
    this.beforeLoadData();
    return this.service.query(this.onSuccessLoadData, this.onErrorLoadData);
  };

  constructor($scope : ng.IScope, $resource : ng.resource.IResourceService, servicePath : string){
    this.service = $resource<T>(servicePath);
    super($scope);
  }
}
