(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, userService) {
        var model = this;
        var userId = $routeParams["uid"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            userService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                })
            ;
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user);
        }

        function unregister() {

        }
    }
})();