(function () {
    angular
        .module("Project")
        .factory("matchService", matchService);

    function matchService($http) {


        var api = {
            "updateMatch" : updateMatch,
        };

        return api;

        function updateMatch(matchId, match) {
            var url = "/api/match/" + matchId;
            return $http.put(url, match);
        }

    }


})();