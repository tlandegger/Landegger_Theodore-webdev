(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, userService, $rootScope) {
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
  /*          if (userService.findUserByUsername(user.username)) {
                model.errorMessage = "Username taken";
            } else if (user.password != user.verify) {
                model.errorMessage = "passwords do not match";
            }
            */
            delete user.verify;
            var promise = userService.createUser(user);
            promise
                .then(function (response) {
                    var user = response.data;
                    $rootScope.currentUser = user;
                    $location.url("profile/"+user._id);
            })
    /*        else {
                delete user.verify;
                userService.createUser(user);
                $location.url("/profile/" + user._id)
            } */
        }

    }
})();