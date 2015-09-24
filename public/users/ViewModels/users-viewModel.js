var users;
(function (users) {
    var UserListViewModel = (function () {
        function UserListViewModel(a) {
            this.a = a;
        }
        return UserListViewModel;
    })();
    users.UserListViewModel = UserListViewModel;
})(users || (users = {}));
