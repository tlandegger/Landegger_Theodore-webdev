var mongoose = require("mongoose");
var usersSchema = require("./users.schema.server");
var db = require("../models.server");
var usersModel = mongoose.model("usersModel", usersSchema);


module.exports = usersModel;
