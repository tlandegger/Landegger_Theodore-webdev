(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService() {
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
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        // Searches for user, returns null if not found
        function findUserById(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    return users[u];
                }
            }
            return null;
        }

        // Searches for user, returns null if not found
        function findUserByUsername(username) {
            for (var u in users) {
                if (users[u].username === username) {
                    return users[u];
                }
            }
            return null;
        }

        // Searches for user, returns null if not found
        function findUserByCredentials(username, password) {
            for (var u in users) {
                if (users[u].username === username && users[u].password === password) {
                    return users[u];
                }
            }
            return null;
        }

        // updates userId to new user
        function updateUser(userId, user) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users[u] = user;
                    return;
                }
            }
            return null;
        }

        // Deletes user
        function deleteUser(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    var tempUser = users[u];
                    users.splice(u, 1);
                    return tempUser;
                }
            }
            return null;
        }
    }


})();