(function () {
    angular
        .module("Project")
        .controller("tournamentEditController", tournamentEditController);

    function tournamentEditController($location, $routeParams, tournamentService) {
        var model = this;

        model.updateTournament = updateTournament;
        model.deleteTournament = deleteTournament;

        model.userId = $routeParams.uid;
        model.tournamentId = $routeParams.tid;

        function init() {
            tournamentService.findTournamentById(model.userId, model.tournamentId)
                .then(function(tournament) {
                    model.tournament = tournament.data;
                });
        }
        init();

        function updateTournament(tournament) {
            tournamentService.updateTournament(model.tournamentId, tournament);
            $location.url("/user/"+model.userId+"/tournament");
        }

        function deleteTournament(tournamentId) {
            tournamentService.deleteTournament(tournamentId);
            $location.url("/user/"+model.userId+"/tournament");
        }
    }
})();