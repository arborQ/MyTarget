class newBaseViewModel<T> extends baseViewModel<T>{
  newInstance() : T {
    return <T>{ };
  };
  loadData() : T {
    this.beforeLoadData();
    var instance = this.newInstance();
    this.onSuccessLoadData(instance);
    return instance;
  };
  constructor($scope : ng.IScope){
    super($scope);
  }
}
