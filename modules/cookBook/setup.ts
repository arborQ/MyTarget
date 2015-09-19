module cookBook {
  arborApplication.$stateStorage["cookBook"] = {
    url: '/cookBook',
    template: '<div>cookBook</div>',
    // controller: "usersController",
    // resolve: {
    //   loadusersController: ['$q', ($q) => {
    //     var deferred = $q.defer();
    //     require(["users/users-controller"], () => { deferred.resolve(); });
    //     return deferred.promise;
    //   }]
    // }
  };
}
