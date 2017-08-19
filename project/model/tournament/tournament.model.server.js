var mongoose = require("mongoose");
var tournamentSchema = require("./tournament.schema.server");
var db = require("../models.server");
var tournamentModel = mongoose.model("tournamentModel", tournamentSchema);
var usersModel = require("../users/users.model.server");

tournamentModel.createTournamentForUser = createTournamentForUser;
tournamentModel.updateTournament = updateTournament;
tournamentModel.deleteTournament = deleteTournament;


module.exports = tournamentModel;

function createTournamentForUser(userId, tournament) {
    tournament._userId = userId;
    var tournamentTmp = null;
    return tournamentModel
        .create(match)
        .then(function (tournamentDoc) {
            matchTmp = tournamentDoc;
            return usersModel.addTournament(userId, tournamentDoc._id);
        })
        .then(function (userDoc) {
            return userDoc;
        })
}

function updateTournament(tournamentId, tournament) {
    return tournamentModel.update({_id: tournamentId},
        {$set: tournament});
}

function deleteTournament(tournamentId) {
    return tournamentModel.delete(tournamentId);
}