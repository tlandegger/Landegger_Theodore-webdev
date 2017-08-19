(function () {
    angular
        .module("Project")
        .factory("tournamentService", tournamentService);

    function tournamentService($http) {

        var api = {
            "createTournament" : createTournament,
            "findTournamentsByUser" : findTournamentsByUser,
            "findTournamentById" : findTournamentById,
            "updateTournament" : updateTournament,
            "deleteTournament" : deleteTournament
        };

        return api;


        function createTournament(userId, tournament) {
            var url = "/api/user/" + userId + "/tournament";
            return $http.post(url, tournament)
        }

        function findTournamentsByUser(userId) {
            var url = "/api/user/" + userId + "/tournament";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findTournamentById(userId, tournamentId) {
            var url = "/api/user/" + userId + "/tournament/" + tournamentId
            return $http.get(url);
        }


        function updateTournament(tournamentId, tournament) {
            var url = "/api/tournament/" + tournamentId;
            return $http.put(url, tournament);
        }

        function deleteTournament(tournamentId) {
            var url = "/api/tournament/" + tournamentId;
            return $http.delete(url);
        }
    }


})();