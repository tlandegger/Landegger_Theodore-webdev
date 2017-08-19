(function () {
    angular
        .module("Project")
        .controller("matchEditController", matchEditController);

    function matchEditController($location, $routeParams, matchService) {
        var model = this;

        model.updateMatch = updateMatch;

        model.userId = $routeParams.uid;
        model.tournamentId = $routeParams.tid;
        model.matchId = $routeParams.mid;

        function init() {
            matchService.findMatchById(model.matchId)
                .then(function(match) {
                    model.match = match.data;
                });
        }
        init();

        function updateMatch(match) {
            matchService.updateMatch(model.matchId, match);
            $location.url("/user/"+model.userId+"/tournament/"+model.tournamentId+"/match");
        }

    }
})();