(function() {
    angular
        .module("Project")
        .controller("tournamentListController", tournamentListController)

    function tournamentListController($routeParams, tournamentService, userService) {
        var model = this;

        model.userId = $routeParams.uid;

        function init() {
            tournamentService.findTournamentsByUser(model.userId)
                .then(function(tournaments) {
                    model.tournaments = tournaments;
                });
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                })
        }
        init();
        
    }
})();