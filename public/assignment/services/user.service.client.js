(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http) {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        return api;

        // adds a user to the users array
        function createUser(user) {
            var url = "/api/user";

            return $http.post(url, user);
        }

        // Searches for user, returns null if not found
        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        // Searches for user, returns null if not found
        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        // Searches for user, returns null if not found
        function findUserByCredentials(username, password) {

            var url = "/api/user?username="+username+"&password="+password;
            // /user?username=alice&password=alice

            return $http.get(url);
        }

        // updates userId to new user
        function updateUser(userId, user) {
            var url = "/api/user/" + userId
            return $http.put(url, user);
        }

        // Deletes user
        function deleteUser(userId) {
            var url = "/api/user/" + userID
            return $http.delete(url);
        }
    }


})();