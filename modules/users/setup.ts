module users {
  arborApplication.$stateStorage["users"] = {
    url: '/users',
    templateUrl: 'users/views/userList.html',
    controller: "usersController",
    resolve: {
      loadusersController: ['$q', ($q) => {
        var deferred = $q.defer();
        require(["users/users-controller"], () => { deferred.resolve(); });
        return deferred.promise;
      }]
    }
  };
}
