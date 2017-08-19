(function () {
    angular
        .module("Project")
        .controller("tournamentNewController", tournamentNewController);

    function tournamentNewController($location, $routeParams, tournamentService) {
        var model = this;

        model.createTournament = createTournament;

        model.tournament = {};

        model.userId = $routeParams.uid;

        function init() {

        }
        init();

        function createTournament(tournament) {
            console.log(tournament);
            tournamentService.createTournament(model.userId, tournament);
            $location.url("/user/"+model.userId+"/tournament");
        }
    }
})();