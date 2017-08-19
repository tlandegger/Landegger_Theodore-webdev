var app = require("../../express.js");
var matchModel = require('../model/match/match.model.server');


app.put("/api/match/:matchId", updateMatch);
app.get ("/api/tournament/:tournamentId/match", findMatchesForTournament);
app.get ("/api/match/:matchId", findMatchById);



// updates websiteId to new website
function updateMatch(req, res) {
    var matchId = req.params.matchId;
    var match = req.body;

    matchModel
        .updateMatch(matchId, match)
        .then(function (status) {
            res.json(status);
        });
}

function findMatchesForTournament(req, res) {
    var tournamentId = req.params.tournamentId;

    matchModel
        .findAllMatchesForTournament(tournamentId)
        .then(function (matches) {
            res.json(matches);
        });
}

function findMatchById(req, res) {
    matchModel
        .findMatchById(req.params.matchId)
        .then(function (matchDoc) {
            res.json(matchDoc);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}