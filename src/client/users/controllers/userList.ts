class userList extends listBaseViewModel<users.IUser>{
  constructor($scope: ng.IScope, $resource: ng.resource.IResourceService) {
    super.loadData = (): Array<users.IUser> => {
      super.beforeLoadData();
      var fakeData = <Array<users.IUser>>[];
      for(var i =0;i< 20;i++){
        fakeData.push({ id: i, name: 'arbor' + i, email: `arbor${i}@o2.pl`, isActive: i % 3 === 0, created: new Date() })
      }
      super.onSuccessLoadData(fakeData);
      return fakeData;
    };
    super($scope, $resource, 'api/users')
  }
}

usersModule.controller('userList', userList);
