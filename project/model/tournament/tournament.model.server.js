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
tournamentModel.addMatch = addMatch;
tournamentModel.removeMatch = removeMatch;


module.exports = tournamentModel;

function createTournamentForUser(userId, tournament) {
    tournament._user = userId;
    var tournamentTmp = null;
    return tournamentModel
        .create(tournament)
        .then(function (tournamentDoc) {
            matchTmp = tournamentDoc;
            usersModel.addTournament(userId, tournamentDoc._id);
            return matchTmp;
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
    return tournamentModel.remove(tournamentId)
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

function removeMatch(tournamentId, matchId) {
    return tournamentModel
        .findById(tournamentId)
        .then(function (tournament) {
            var index = tournament.matches.indexOf(matchId);
            tournament.matches.splice(index, 1);
            return tournament.save();
        })
}

function addMatch(tournamentId, matchId) {
    var t = tournamentModel.findById(tournamentId);
    return tournamentModel
        .findById(tournamentId)
        .then(function (tournament) {
            tournament.matches.push(matchId);
            return tournament.save();
        });
}