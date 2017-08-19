var app = require("../../express.js");
var matchModel = require('../model/match/match.model.server');


app.put("/api/match/:matchId", updateMatch);


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
