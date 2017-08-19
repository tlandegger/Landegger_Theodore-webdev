var mongoose = require("mongoose");
var usersSchema = require("./users.schema.server");
var db = require("../models.server");
var usersModel = mongoose.model("usersModel", usersSchema);

usersModel.createUser = createUser;
usersModel.findUserById = findUserById;
usersModel.updateUser = updateUser;
usersModel.findUserByCredentials = findUserByCredentials;
usersModel.deleteUser = deleteUser;
usersModel.addTournament = addTournament;
usersModel.removeTournament = removeTournament;
usersModel.follow = follow;
usersModel.unFollow = unFollow;

module.exports = usersModel;
function removeTournament(userId, tournamentId) {
    return usersModels
        .findById(userId)
        .then(function (user) {
            var index = user.tournaments.indexOf(tournamentId);
            user.tournaments.splice(index, 1);
            return user.save();
        })
}

function addTournament(userId, tournamentId) {
    return usersModels
        .findById(userId)
        .then(function (user) {
            user.tournaments.push(tournamentId);
            return user.save();
        });
}

function unFollow(userId, followId) {
    return usersModels
        .findById(userId)
        .then(function (user) {
            var index = user.following.indexOf(followId);
            user.following.splice(index, 1);
            return user.save();
        })
}

function follow(userId, followId) {
    return usersModels
        .findById(userId)
        .then(function (user) {
            user.following.push(followId);
            return user.save();
        });
}

function findUserByCredentials(username, password) {
    return usersModels.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return usersModels.update({_id: userId},
        {$set: user});
}

function createUser(user) {
    return usersModels.create(user);
}

function findUserById(userId) {
    return usersModels.findById(userId);
}

function deleteUser(userId) {
    return usersModels.delete(userId);
}