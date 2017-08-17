var mongoose = require("mongoose");
var matchSchema = require("./match.schema.server");
var db = require("../models.server");
var matchModel = mongoose.model("matchModel", matchSchema);


module.exports = matchModel;
