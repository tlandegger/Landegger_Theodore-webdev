(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, userService) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }
        init();

        function registerUser(user) {
            if (!user) {
                model.errorMessage = "Please fill out the required fields";
                return;
            }
            if (userService.findUserByUsername(user.username)) {
                model.errorMessage = "Username taken";
            } else if (user.password != user.verify) {
                model.errorMessage = "passwords do not match";
            }
            else {
                delete user.verify;
                userService.createUser(user);
                $location.url("/profile/" + user._id)
            }
        }

    }
})();