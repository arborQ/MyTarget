abstract class baseViewModel<T>{
  public model : T;
  abstract loadData() : T;
  beforeLoadData(){ console.log('start loading ...'); };
  onSuccessLoadData(data : T){  console.log(data); };
  onErrorLoadData(){console.log('end loading ...');};
  constructor(private $rootScope : ng.IScope){
    this.model = this.loadData();
  }
}
