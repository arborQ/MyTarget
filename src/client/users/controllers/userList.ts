class userList extends listBaseViewModel<users.IUser>{
  constructor($scope: ng.IScope, $resource: ng.resource.IResourceService) {
    super.loadData = (): Array<users.IUser> => {
      super.beforeLoadData();
      var fakeData = <Array<users.IUser>>[
        { id: 1, name: 'arbor1', email: 'arbor@o2.pl', isActive: true, created: new Date() },
        { id: 2, name: 'arbor2', email: 'arbor@o2.pl', isActive: true, created: new Date() },
        { id: 3, name: 'arbor3', email: 'arbor@o2.pl', isActive: true, created: new Date() },
        { id: 4, name: 'arbor4', email: 'arbor@o2.pl', isActive: true, created: new Date() },
      ];
      super.onSuccessLoadData(fakeData);
      return fakeData;
    };
    super($scope, $resource, 'api/users')
  }
}

usersModule.controller('userList', userList);
