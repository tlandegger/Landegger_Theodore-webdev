(function() {
    angular
        .module("Project")
        .controller("matchListController", matchListController)

    function matchListController($routeParams, tournamentService, matchService) {
        var model = this;

        model.userId = $routeParams.uid;
        model.tournamentId = $routeParams.tid;

        function init() {
            tournamentService.findTournamentById(model.userId, model.tournamentId)
                .then(function(tournament) {
                    model.tournament = tournament.data;
                });
            matchService.findMatchesByTournament(model.tournamentId)
                .then(function(matches) {
                    model.matches = matches.data;
                });

        }
        init();
    }
})();