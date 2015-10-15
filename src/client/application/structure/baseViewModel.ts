abstract class baseViewModel<T>{
  public model : T;
  abstract loadData() : T;
  beforeLoadData(){};
  onSuccessLoadData(data : T){};
  onErrorLoadData(){};
  constructor(private $rootScope : ng.IScope){
    this.model = this.loadData();
  }
}
