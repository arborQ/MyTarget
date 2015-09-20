/// <reference path="../app/typings.d.ts"/>
module users {
  arborApplication.$stateStorage["users"] = <arbor.IArborRoute>{
    url: '/users',
    templateUrl: 'users/views/userList.html',
    controller: "usersController",
    require : ["users/users-controller"]
  };

  arborApplication.$stateStorage["users.edit"] = <arbor.IArborRoute>{
    url: '/edit/:id',
    templateUrl: 'users/views/userEdit.html',
    controller: "usersEditController",
    require : ["users/usersEdit-controller"]
  };

}
