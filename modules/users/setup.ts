/// <reference path="../app/typings.d.ts"/>
/// <reference path="../app/setup.ts"/>
module users {
  arborApplication.$stateStorage["users"] = <arbor.IArborRoute>{
    url: '/users',
    templateUrl: 'users/views/userList.html',
    controller: "usersController",
    require : ["users/users-controller"],
    locals : {
      usersApi : ['$resource',($resource) => {
        return $resource('/api/users');
      }]
    }
  };

  arborApplication.$stateStorage["users.edit"] = <arbor.IArborRoute>{
    url: '/edit/:id',
    templateUrl: 'users/views/userEdit.html',
    controller: "usersEditController",
    require : ["users/usersEdit-controller"],
    locals : {
      usersApi : ['$resource',($resource) => {
        return $resource('/api/users/:id');
      }]
    }
  };

}
