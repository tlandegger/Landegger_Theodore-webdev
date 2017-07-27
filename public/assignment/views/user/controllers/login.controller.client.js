(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)

    function LoginController($location, userService) {
        var model = this;

        model.login = login;

        function init() {

        }
        init();

        function login(user) {
            if (!user) {
                model.errorMessage = "User not found";
                return;
            }
            user = userService.findUserByCredentials(user.username, user.password);
            if (!user) {
                model.errorMessage = "User not found";
            } else {
                $location.url("profile/" + user._id);
            }
        }

    }
})();