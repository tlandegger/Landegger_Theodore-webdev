(function () {
    angular
        .module("Project")
        .factory("matchService", matchService);

    function matchService($http) {


        var api = {
            "findMatchesByTournament" : findMatchesByTournament,
            "findMatchById" : findMatchById,
            "updateMatch" : updateMatch
        };

        return api;

        function updateMatch(matchId, match) {
            var url = "/api/match/" + matchId;
            return $http.put(url, match);
        }

        function findMatchesByTournament(tournamentId) {
            var url = "/api/tournament/" + tournamentId + "/match"
            return $http.get(url);
        }

        function findMatchById(matchId) {
            var url = "/api/match/" + matchId;
            return $http.get(url);
        }

    }


})();