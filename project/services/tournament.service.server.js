var app = require("../../express.js");
var tournamentModel = require('../model/tournament/tournament.model.server');
var matchModel = require("../model/match/match.model.server");
var challonge = require("./challonge.service.server");

app.get ("/api/user/:userId/tournament", findTournamentsForUser);
app.get ("/api/user/:userId/tournament/:tournamentId", findTournamentById);
app.post("/api/user/:userId/tournament", createTournament);
app.put("/api/tournament/:tournamentId", updateTournament);
app.delete("/api/tournament/:tournamentId", deleteTournament);

function createTournament(req, res) {

    var userId = req.params.userId;
    var tournament = req.body;
    var bracketId = tournament.name;
    var tag = tournament.tag;
    var matches = challonge.getMatches(bracketId, tag);
    tournamentModel.createTournamentForUser(userId, tournament)
        .then(function (tournamentDoc) {
            for (var m in matches) {
                matchModel.createMatchForTournament(tournamentDoc._id, m);
            }
            res.json(tournamentDoc);
        }, function (err) {
            res.statusCode(500).send(err);
        })
}

function findTournamentById(req, res) {
    tournamentModel
        .findTournamentById(req.params.tournamentId)
        .then(function (tournamentDoc) {
            res.json(tournamentDoc);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findTournamentsForUser(req, res) {
    var userId = req.params.userId;

    tournamentModel
        .findAllTournamentsForUser(userId)
        .then(function (tournaments) {
            res.json(tournaments);
        });
}

// updates userId to new user
function updateTournament(req, res) {
    var tournamentId = req.params.tournamentId;
    var tournament = req.body;

    tournamentModel
        .updateTournament(tournamentId, tournament)
        .then(function (status) {
            res.json(status);
        });
}

// Deletes tournament
function deleteTournament(req, res) {
    var tournamentId = req.params.tournamentId;
    var userId = req.params.userId;
    tournamentModel
        .deleteTournament(userId, tournamentId)
        .then(function (status) {
            res.json(status);
        });
}
