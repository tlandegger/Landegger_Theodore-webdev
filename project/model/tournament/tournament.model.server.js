var mongoose = require("mongoose");
var tournamentSchema = require("./tournament.schema.server");
var db = require("../models.server");
var tournamentModel = mongoose.model("tournamentModel", tournamentSchema);


module.exports = tournamentModel;
