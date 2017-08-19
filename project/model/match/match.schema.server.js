var mongoose = require("mongoose");
var matchSchema = mongoose.Schema({
    player1: String,
    player2: String,
    score: String,
    notes: String,
    _tournament: {type: mongoose.Schema.Types.ObjectId, ref: "tournamentModel"},
}, {collection: "match"});
module.exports = matchSchema;