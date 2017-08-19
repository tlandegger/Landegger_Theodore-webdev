var app = require("../../express");
var userModel = require("../model/users/users.model.server");

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", isAdmin: true  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

// http handlers
app.get("/api/userss", getAllUsers);
app.get("/api/users/:userId", getUserById);
app.get("/api/users", findUser);
app.post("/api/users", registerUser);
app.put("/api/users/:userId", updateUser);
app.delete("/api/users/:userId", deleteUser);


function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function registerUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        })
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;


    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            })
        return;
    } else if(username) {
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
    }
    res.send("0");
}

function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(req, response) {
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            response.json(user);
        });
}

function deleteUser(req, response) {
    userModel
        .deleteUser(req.params.userId)
        .then(function (user) {
            response.json(user);
        });
}