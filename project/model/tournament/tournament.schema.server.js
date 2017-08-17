var mongoose = require("mongoose");
var tournamentSchema = mongoose.Schema({
    name: String,
    date: Date,
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "usersModel"},
    matches: [{type: mongoose.Schema.ObjectId, ref: "matchModel"}],
    public : Boolean
}, {collection: "tournament"});
module.exports = tournamentSchema;