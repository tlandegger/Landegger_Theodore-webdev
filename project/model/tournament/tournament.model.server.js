var mongoose = require("mongoose");
var tournamentSchema = require("./tournament.schema.server");
var db = require("../models.server");
var tournamentModel = mongoose.model("tournamentModel", tournamentSchema);
var usersModel = require("../users/users.model.server");

tournamentModel.createTournamentForUser = createTournamentForUser;
tournamentModel.updateTournament = updateTournament;
tournamentModel.deleteTournament = deleteTournament;
tournamentModel.findAllTournamentsForUser = findAllTournamentsForUser;
tournamentModel.findTournamentById = findTournamentById;


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
    return tournamentModel.delete(tournamentId)
        .then(function (status) {
            return usersModel.removeTournament(userId, tournamentId)
    });
}


function findAllTournamentsForUser(userId) {
    return tournamentModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function findTournamentById(tournamentId) {
    return tournamentModel.findById(tournamentId);
}