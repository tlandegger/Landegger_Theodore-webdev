var mongoose = require("mongoose");
var matchSchema = require("./match.schema.server");
var db = require("../models.server");
var matchModel = mongoose.model("matchModel", matchSchema);
var tournamentModel = require("../tournament/tournament.model.server");

matchModel.createMatchForTournament = createMatchForTournament;
matchModel.updateMatch = updateMatch;
matchModel.deleteMatch = deleteMatch;
matchModel.findMatchById = findMatchById;
matchModel.findAllMatchesForTournament = findAllMatchesForTournament;



module.exports = matchModel;

function createMatchForTournament(tournamentId, match) {
    match._tournament = tournamentId;
    var matchTmp = null;
    return matchModel
        .create(match)
        .then(function (matchDoc) {
            matchTmp = matchDoc;
            tournamentModel.addMatch(tournamentId, matchDoc._id);
            return matchTmp;
        })
        .then(function (tournamentDoc) {
            return tournamentDoc;
        })
}

function updateMatch(matchId, match) {
    return matchModel.update({_id: matchId},
        {$set: match});
}

function deleteMatch(matchId) {
    return matchModel.delete(matchId);
}

function findMatchById(matchId) {
    return matchModel.findById(matchId);
}

function findAllMatchesForTournament(tournamentId) {
    return matchModel
        .find({_tournament: tournamentId})
        .populate('_tournament', 'name')
        .exec();
}